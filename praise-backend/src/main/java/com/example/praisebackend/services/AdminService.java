package com.example.praisebackend.services;

import org.springframework.stereotype.Service;

import com.example.praisebackend.auth.jwt.JwtTokenService;
import com.example.praisebackend.dtos.complaints.ComplaintResponseDTO;
import com.example.praisebackend.dtos.complaints.GetComplaintsResponseDTO;
import com.example.praisebackend.dtos.complaints.GetResolvedComplaintsResponseDTO;
import com.example.praisebackend.dtos.complaints.ResolveComplaintRequestDTO;
import com.example.praisebackend.dtos.complaints.ResolveComplaintResponseDTO;
import com.example.praisebackend.dtos.complaints.UpdateComplaintRequestDTO;
import com.example.praisebackend.dtos.products.GetProductsResponseDTO;
import com.example.praisebackend.dtos.products.ProductResponseDTO;
import com.example.praisebackend.dtos.products.SuspendProductRequestDTO;
import com.example.praisebackend.dtos.sellers.GetSellersResponseDTO;
import com.example.praisebackend.dtos.users.BanUserRequestDTO;
import com.example.praisebackend.dtos.users.ExtendedUserResponseDTO;
import com.example.praisebackend.dtos.users.GetUsersResponseDTO;
import com.example.praisebackend.dtos.users.UnbanUserRequestDTO;
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

    public void suspendProduct(SuspendProductRequestDTO suspendProductRequestDTO, String authHeader) throws Exception {
        try {
            suspendProductRequestDTO.setAdminId(jwtTokenService.getUserIDFromHeaderToken(authHeader));
            productService.suspendProduct(suspendProductRequestDTO);
        } catch (Exception e) {
            throw new Exception("Error on product suspending: " + e.getMessage());
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

    public void banUser(BanUserRequestDTO banUserRequestDTO, String authHeader) throws Exception {
        try {
            banUserRequestDTO.setAdminId(jwtTokenService.getUserIDFromHeaderToken(authHeader));
            userService.banUser(banUserRequestDTO);
        } catch (Exception e) {
            throw new Exception("Error banning user: " + e.getMessage());
        }
    }

    public void unbanUser(UnbanUserRequestDTO unbanUserRequestDTO, String authHeader) throws Exception {
        try {
            unbanUserRequestDTO.setAdminId(jwtTokenService.getUserIDFromHeaderToken(authHeader));
            userService.unbanUser(unbanUserRequestDTO);
        } catch (Exception e) {
            throw new Exception("Error unbanning user: " + e.getMessage());
        }

    }

    public GetComplaintsResponseDTO getAvailableComplaints() throws Exception {
        try {
            return complaintService.getAvailableComplaints();
        } catch (Exception e) {
            throw new Exception("Error fetching available complaints: " + e.getMessage());
        }

    }

    public GetResolvedComplaintsResponseDTO getResolvedComplaints() throws Exception {
        try {
            return complaintService.getResolvedComplaints();
        } catch (Exception e) {
            throw new Exception("Error fetching resolved complaints: " + e.getMessage());
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

    public ResolveComplaintResponseDTO resolveComplaint(ResolveComplaintRequestDTO resolveComplaintRequestDTO,
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
