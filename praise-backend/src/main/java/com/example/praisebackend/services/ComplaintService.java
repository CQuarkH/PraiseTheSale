package com.example.praisebackend.services;

import org.springframework.stereotype.Service;

import com.example.praisebackend.auth.jwt.JwtTokenService;
import com.example.praisebackend.dtos.complaints.ComplaintRequestDTO;
import com.example.praisebackend.dtos.complaints.GetComplaintsResponseDTO;
import com.example.praisebackend.dtos.mappers.ComplaintMapper;
import com.example.praisebackend.models.complaint.Complaint;
import com.example.praisebackend.repositories.ComplaintRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ComplaintService {

    private final ComplaintMapper complaintMapper;
    private final ComplaintRepository complaintRepository;
    private final JwtTokenService jwtTokenService;

    public void createComplaint(ComplaintRequestDTO complaintRequestDTO, String authHeader) throws Exception {
        try {
            complaintRequestDTO.setUserID(jwtTokenService.getUserIDFromHeaderToken(authHeader));
            complaintRepository.save(
                    complaintMapper.complaintRequestDTOToComplaint(complaintRequestDTO));

        } catch (Exception e) {
            throw new Exception("Error on creating complaint: " + e.getMessage());
        }
    }

    public void deleteComplaint(Long complaintID, String authHeader) throws Exception {
        if (userHasComplaint(complaintID, jwtTokenService.getUserIDFromHeaderToken(authHeader))) {
            complaintRepository.deleteById(complaintID);
        } else {
            throw new Exception("You're not allowed to do this operation!");
        }
    }

    public GetComplaintsResponseDTO getComplaintsByUserId(String authHeader) throws Exception {
        try {
            return GetComplaintsResponseDTO.builder()
                    .complaints(complaintMapper.complaintsToComplaintResponseDTOs(
                            complaintRepository.findByUserId(jwtTokenService.getUserIDFromHeaderToken(authHeader))))
                    .build();
        } catch (Exception e) {
            throw new Exception("Error fetching complaints: " + e.getMessage());

        }
    }

    private boolean userHasComplaint(Long complaintID, Long userID) {
        Complaint complaint = complaintRepository.findById(complaintID).orElse(null);

        if (complaint == null) {
            return false;
        }

        if (complaint.getUser() == null) {
            return false;
        }

        return complaint.getUser().getId().equals(userID);
    }

}
