package com.example.praisebackend.services;

import org.springframework.stereotype.Service;

import com.example.praisebackend.auth.jwt.JwtTokenService;
import com.example.praisebackend.dtos.mappers.SalesHistoryMapper;
import com.example.praisebackend.dtos.mappers.SellerMapper;
import com.example.praisebackend.dtos.products.ProductRequestDTO;
import com.example.praisebackend.dtos.products.GetProductsOnlyResponseDTO;
import com.example.praisebackend.dtos.products.ProductOnlyResponseDTO;
import com.example.praisebackend.dtos.products.ProductResponseDTO;
import com.example.praisebackend.dtos.sellers.GetSalesHistoryResponse;
import com.example.praisebackend.dtos.sellers.GetSellersFromBuyerResponseDTO;
import com.example.praisebackend.dtos.sellers.GetSellersResponseDTO;
import com.example.praisebackend.dtos.sellers.MarkProductAsSoldRequestDTO;
import com.example.praisebackend.dtos.sellers.SellerProfileUpdateRequestDTO;
import com.example.praisebackend.dtos.sellers.SellerResponseDTO;
import com.example.praisebackend.models.user.SalesHistory;
import com.example.praisebackend.models.user.Seller;
import com.example.praisebackend.models.user.User;
import com.example.praisebackend.repositories.SalesHistoryRepository;
import com.example.praisebackend.repositories.SellerRepository;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class SellerService {

    private final ProductService productService;
    private final JwtTokenService jwtTokenService;
    private final AuditLogService auditLogService;
    private final UserService userService;
    private final RateSellerService rateSellerService;

    private final SalesHistoryRepository salesHistoryRepository;
    private final SellerRepository sellerRepository;

    private final SalesHistoryMapper salesHistoryMapper;
    private final SellerMapper sellerMapper;

    public SellerResponseDTO getSellerProfile(String authHeader) throws Exception {
        try {
            Seller seller = getSellerByID(jwtTokenService.getUserIDFromHeaderToken(authHeader));
            return sellerMapper.sellerToSellerResponseDTO(seller);

        } catch (Exception e) {
            throw new Exception("Error fetching seller's profile: " + e.getMessage());
        }
    }

    public SellerResponseDTO updateSellerProfile(SellerProfileUpdateRequestDTO sellerProfileUpdateRequestDTO,
            String authHeader) throws Exception {
        try {
            Seller seller = getSellerByID(jwtTokenService.getUserIDFromHeaderToken(authHeader));
            seller.setDescription(sellerProfileUpdateRequestDTO.getDescription());
            seller.setContactPhone(sellerProfileUpdateRequestDTO.getContactPhone());
            seller.setImageLink(sellerProfileUpdateRequestDTO.getImageLink());
            seller.setName(sellerProfileUpdateRequestDTO.getName());

            return sellerMapper.sellerToSellerResponseDTO(sellerRepository.save(seller));

        } catch (Exception e) {
            throw new Exception("Error updating seller's profile: " + e.getMessage());
        }
    }

    public ProductOnlyResponseDTO registerProduct(ProductRequestDTO createProductRequest, String authHeader)
            throws Exception {
        try {
            createProductRequest.setSellerID(jwtTokenService.getUserIDFromHeaderToken(authHeader));
            return productService.createProduct(createProductRequest);
        } catch (Exception e) {
            throw new Exception("Error on product saving: " + e.getMessage());
        }

    }

    public GetProductsOnlyResponseDTO getOwnProducts(String authHeader) throws Exception {
        try {
            return productService.getAvailableProductsBySeller(jwtTokenService.getUserIDFromHeaderToken(authHeader));
        } catch (Exception e) {
            throw new Exception("Error on fetching Seller's products: " + e.getMessage());
        }
    }

    public ProductResponseDTO getOwnProduct(Long productID, String authHeader) throws Exception {
        try {
            return productService.productToSeller(productID, jwtTokenService.getUserIDFromHeaderToken(authHeader));
        } catch (Exception e) {
            throw new Exception("Error fetching seller's product: " + e.getMessage());
        }
    }

    public ProductOnlyResponseDTO updateProduct(ProductRequestDTO updateProductRequest, String authHeader)
            throws Exception {
        try {
            updateProductRequest.setSellerID(jwtTokenService.getUserIDFromHeaderToken(authHeader));
            return productService.updateProduct(updateProductRequest);
        } catch (Exception e) {
            throw new Exception("Error on product updating: " + e.getMessage());
        }
    }

    @Transactional
    public void deleteProduct(Long productID, String authHeader) throws Exception {
        try {
            if (salesHistoryRepository.existsByProductId(productID)) {
                salesHistoryRepository.deleteByProductId(productID);
            }
            productService.deleteProduct(productID, jwtTokenService.getUserIDFromHeaderToken(authHeader));
        } catch (Exception e) {
            throw new Exception("Error on product deleting: " + e.getMessage());
        }

    }

    @Transactional(rollbackFor = Exception.class)
    public void markProductAsSold(MarkProductAsSoldRequestDTO markProductAsSoldRequestDTO, String authHeader)
            throws Exception {
        Long sellerId = jwtTokenService.getUserIDFromHeaderToken(authHeader);

        markProductAsSoldRequestDTO.setSellerId(sellerId);
        productService.markProductAsSold(markProductAsSoldRequestDTO.getProductId(),
                sellerId);
        salesHistoryRepository.save(
                createSalesHistory(markProductAsSoldRequestDTO.getProductId(),
                        sellerId));
        sendRatingEmailHandler(markProductAsSoldRequestDTO);
    }

    @Transactional
    public void unMarkProductAsSold(Long productID, String authHeader) throws Exception {
        try {
            productService.unMarkProductAsSold(productID, jwtTokenService.getUserIDFromHeaderToken(authHeader));
            salesHistoryRepository.deleteByProductId(productID);
        } catch (Exception e) {
            throw new Exception("Error unmarking product as sold: " + e.getMessage());
        }
    }

    public GetSalesHistoryResponse getSellerSalesHistory(String authHeader) throws Exception {
        try {
            return GetSalesHistoryResponse.builder().salesHistory(
                    salesHistoryMapper.salesHistoriesToDTOs(
                            salesHistoryRepository.findBySellerId(
                                    jwtTokenService.getUserIDFromHeaderToken(authHeader)))

            ).build();

        } catch (Exception e) {
            throw new Exception("Error on fetching Seller's Sales History: " + e.getMessage());
        }

    }

    public GetSellersFromBuyerResponseDTO getSellersToBuyer() throws Exception {
        try {
            return GetSellersFromBuyerResponseDTO.builder()
                    .sellers(
                            sellerMapper.sellersToBuyerResponseDTOs(
                                    sellerRepository.findAll()))
                    .build();
        } catch (Exception e) {
            throw new Exception("Error fetching sellers: " + e.getMessage());
        }
    }

    public GetSellersResponseDTO getSellers() throws Exception {
        try {
            return GetSellersResponseDTO.builder()
                    .sellers(sellerMapper.sellersToSellerResponseDTOs(
                            sellerRepository.findAll()))
                    .build();
        } catch (Exception e) {
            throw new Exception("Error fetching sellers: " + e.getMessage());
        }
    }

    private void sendRatingEmailHandler(MarkProductAsSoldRequestDTO markProductAsSoldRequestDTO) throws Exception {
        try {
            User buyer = userService.getUserByEmail(markProductAsSoldRequestDTO.getUserEmail());
            if (auditLogService.hasBuyerRequestedSellerData(buyer.getId(), markProductAsSoldRequestDTO.getSellerId(),
                    markProductAsSoldRequestDTO.getProductId())) {
                rateSellerService.createAndSendRatingToken(buyer.getId(), markProductAsSoldRequestDTO.getUserEmail(),
                        markProductAsSoldRequestDTO.getSellerId(),
                        markProductAsSoldRequestDTO.getProductId());
            } else {
                throw new Exception("This user hasn't required your data!");
            }
        } catch (Exception e) {
            throw new Exception("Error sending rating email: " + e.getMessage());
        }
    }

    private SalesHistory createSalesHistory(Long productID, Long sellerID) throws Exception {
        try {
            return salesHistoryMapper.sellerProductToSalesHistory(
                    sellerRepository.findById(sellerID).orElse(null),
                    productService.getProductByID(productID),
                    LocalDateTime.now());
        } catch (Exception e) {
            throw new Exception("Error creating Sale History : " + e.getMessage());
        }

    }

    private Seller getSellerByID(Long id) throws Exception {
        return sellerRepository.findById(id)
                .orElseThrow(() -> new Exception("Seller not found with ID: " + id));
    }

}
