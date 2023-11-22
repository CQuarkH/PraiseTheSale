package com.example.praisebackend.services;

import org.springframework.stereotype.Service;

import com.example.praisebackend.auth.jwt.JwtTokenService;
import com.example.praisebackend.dtos.complaints.ComplaintResponseDTO;
import com.example.praisebackend.dtos.complaints.GetComplaintsResponseDTO;
import com.example.praisebackend.dtos.complaints.ResolveComplaintRequestDTO;
import com.example.praisebackend.dtos.complaints.UpdateComplaintRequestDTO;
import com.example.praisebackend.dtos.products.GetProductsOnlyResponseDTO;
import com.example.praisebackend.dtos.products.GetProductsResponseDTO;
import com.example.praisebackend.dtos.products.ProductResponseDTO;
import com.example.praisebackend.dtos.products.ProductStatusChangeRequestDTO;
import com.example.praisebackend.dtos.sellers.GetSellersResponseDTO;
import com.example.praisebackend.dtos.users.ExtendedUserResponseDTO;
import com.example.praisebackend.dtos.users.GetUsersResponseDTO;
import com.example.praisebackend.dtos.users.UserStatusChangeRequestDTO;
import com.example.praisebackend.models.Role;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final ProductService productService;
    private final UserService userService;
    private final SellerService sellerService;
    private final JwtTokenService jwtTokenService;
    private final ComplaintService complaintService;
    private final EmailService emailService;

    public GetProductsResponseDTO getAllProducts() throws Exception {
        try {
            return productService.getAllProducts();
        } catch (Exception e) {
            throw new Exception("Error on products fetching: " + e.getMessage());
        }

    }

    public ProductResponseDTO getProduct(Long productID) throws Exception {
        try {
            return productService.getProductDTOByID(productID);
        } catch (Exception e) {
            throw new Exception("Error on product (ID: " + productID + ") fetching: " + e.getMessage());
        }
    }

    public GetProductsOnlyResponseDTO getProductsBySeller(Long sellerId) throws Exception {
        try {
            return productService.getAvailableProductsBySeller(sellerId);
        } catch (Exception e) {
            throw new Exception("Error on seller's products fetching: " + e.getMessage());
        }
    }

    public void updateProductSuspensionStatus(ProductStatusChangeRequestDTO suspendProductRequestDTO, String authHeader)
            throws Exception {
        try {
            suspendProductRequestDTO.setAdminId(jwtTokenService.getUserIDFromHeaderToken(authHeader));

            productService.updateProductSuspensionStatus(suspendProductRequestDTO);

            if (suspendProductRequestDTO.isSuspend()) {
                emailService.sendProductSuspensionEmail(suspendProductRequestDTO.getSellerEmail(),
                        productService.getProductByID(suspendProductRequestDTO.getProductId()),
                        suspendProductRequestDTO.getReason());
            } else {
                emailService.sendProductReactivationEmail(suspendProductRequestDTO.getSellerEmail(),
                        productService.getProductByID(suspendProductRequestDTO.getProductId()),
                        suspendProductRequestDTO.getReason());
            }

        } catch (Exception e) {
            throw new Exception("Error on product suspension update: " + e.getMessage());
        }
    }

    public GetProductsResponseDTO getWeeklyProducts() throws Exception {
        try {
            return productService.getWeeklyProducts();
        } catch (Exception e) {
            throw new Exception(
                    "Error on weekly products fetching: " + e.getMessage());
        }
    }

    public GetUsersResponseDTO getWeelkyUsers() throws Exception {
        try {
            return userService.weeklyUsers();
        } catch (Exception e) {
            throw new Exception("Error on weekly users fetching: " + e.getMessage());
        }
    }

    public GetSellersResponseDTO getAllSellers() throws Exception {
        try {
            return sellerService.getSellers();
        } catch (Exception e) {
            throw new Exception("Error on sellers fetching: " + e.getMessage());
        }
    }

    public GetUsersResponseDTO getAllBuyers() throws Exception {
        try {
            return userService.getUsersByRole(Role.BUYER);
        } catch (Exception e) {
            throw new Exception("Error on buyers fetching: " + e.getMessage());
        }
    }

    public ExtendedUserResponseDTO getExtendedUser(Long userID) throws Exception {
        try {
            return userService.getExtendedUser(userID);

        } catch (Exception e) {
            throw new Exception("Error on extended user fetching: " + e.getMessage());
        }

    }

    public void updateUserBanStatus(UserStatusChangeRequestDTO banUserRequestDTO, String authHeader) throws Exception {
        try {
            banUserRequestDTO.setAdminId(jwtTokenService.getUserIDFromHeaderToken(authHeader));
            userService.updateUserBanStatus(banUserRequestDTO);
            emailService.sendUserStatusChangeEmail(banUserRequestDTO.getUserEmail(), banUserRequestDTO.getUserId(),
                    banUserRequestDTO.getReason(), banUserRequestDTO.isBan());

        } catch (Exception e) {
            throw new Exception("Error updating user status: " + e.getMessage());
        }
    }

    public GetComplaintsResponseDTO getComplaints() throws Exception {
        try {
            return complaintService.getComplaints();
        } catch (Exception e) {
            throw new Exception("Error fetching available complaints: " + e.getMessage());
        }

    }

    public ComplaintResponseDTO getComplaintByID(Long complaintID) throws Exception {
        try {
            return complaintService.getComplaintByID(complaintID);
        } catch (Exception e) {
            throw new Exception("Error fetching complaint: " + e.getMessage());
        }
    }

    public ComplaintResponseDTO updateComplaint(UpdateComplaintRequestDTO updateComplaintRequestDTO, String authHeader)
            throws Exception {
        try {
            updateComplaintRequestDTO.setAdminId(jwtTokenService.getUserIDFromHeaderToken(authHeader));
            return complaintService.updateComplaint(updateComplaintRequestDTO);
        } catch (Exception e) {
            throw new Exception("Error updating complaint: " + e.getMessage());
        }

    }

    public ComplaintResponseDTO resolveComplaint(ResolveComplaintRequestDTO resolveComplaintRequestDTO,
            String authHeader)
            throws Exception {
        try {
            resolveComplaintRequestDTO.setAdminId(jwtTokenService.getUserIDFromHeaderToken(authHeader));
            return complaintService.resolveComplaint(resolveComplaintRequestDTO);
        } catch (Exception e) {
            throw new Exception("Error resolving complaint: " + e.getMessage());
        }

    }

}
