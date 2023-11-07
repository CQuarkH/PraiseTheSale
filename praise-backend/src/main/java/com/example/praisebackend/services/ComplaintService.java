package com.example.praisebackend.services;

import org.springframework.stereotype.Service;

import com.example.praisebackend.auth.jwt.JwtTokenService;
import com.example.praisebackend.dtos.complaints.ComplaintRequestDTO;
import com.example.praisebackend.dtos.complaints.ComplaintResponseDTO;
import com.example.praisebackend.dtos.complaints.GetComplaintsResponseDTO;
import com.example.praisebackend.dtos.complaints.GetResolvedComplaintsResponseDTO;
import com.example.praisebackend.dtos.complaints.ResolveComplaintRequestDTO;
import com.example.praisebackend.dtos.complaints.ResolveComplaintResponseDTO;
import com.example.praisebackend.dtos.complaints.UpdateComplaintRequestDTO;
import com.example.praisebackend.dtos.mappers.ComplaintMapper;
import com.example.praisebackend.models.complaint.Complaint;
import com.example.praisebackend.models.complaint.ComplaintStatus;
import com.example.praisebackend.repositories.ComplaintRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ComplaintService {

    private final ComplaintMapper complaintMapper;
    private final ComplaintRepository complaintRepository;
    private final JwtTokenService jwtTokenService;
    private final AuditLogService auditLogService;

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
            throw new Exception("Error fetching user's complaints: " + e.getMessage());

        }
    }

    public GetComplaintsResponseDTO getAvailableComplaints() throws Exception {
        try {
            return GetComplaintsResponseDTO.builder()
                    .complaints(complaintMapper.complaintsToComplaintResponseDTOs(
                            complaintRepository.findAllExceptStatus(ComplaintStatus.RESOLVED)))
                    .build();
        } catch (Exception e) {
            throw new Exception("Error fetching available complaints: " + e.getMessage());

        }
    }

    public GetResolvedComplaintsResponseDTO getResolvedComplaints() throws Exception {
        try {
            return GetResolvedComplaintsResponseDTO.builder()
                    .resolvedComplaints(complaintMapper.complaintsToResolveComplaintResponseDTOs(
                            complaintRepository.findByStatus(ComplaintStatus.RESOLVED)))
                    .build();
        } catch (Exception e) {
            throw new Exception("Error fetching resolved complaints: " + e.getMessage());

        }
    }

    public ComplaintResponseDTO getComplaintByID(Long complaintID) throws Exception {
        try {
            return complaintMapper.complaintToComplaintResponseDTO(
                    findComplaintByID(complaintID));

        } catch (Exception e) {
            throw new Exception("Error fetching complaint: " + e.getMessage());

        }
    }

    public ComplaintResponseDTO updateComplaint(UpdateComplaintRequestDTO updateComplaintRequestDTO) throws Exception {
        try {
            Complaint updatedComplaint = updateComplaintStatus(updateComplaintRequestDTO.getComplaintId(),
                    updateComplaintRequestDTO.getComplaintStatus(), null);

            auditLogService.logUpdateComplaint(updateComplaintRequestDTO.getAdminId(),
                    updateComplaintRequestDTO.getComplaintId());

            return complaintMapper.complaintToComplaintResponseDTO(updatedComplaint);
        } catch (Exception e) {
            throw new Exception("Error updating complaint: " + e.getMessage());
        }
    }

    public ResolveComplaintResponseDTO resolveComplaint(ResolveComplaintRequestDTO resolveComplaintRequestDTO)
            throws Exception {
        try {
            Complaint complaint = updateComplaintStatus(resolveComplaintRequestDTO.getComplaintId(),
                    ComplaintStatus.RESOLVED, resolveComplaintRequestDTO.getResolutionDetails());

            auditLogService.logResolveComplaint(resolveComplaintRequestDTO.getAdminId(),
                    resolveComplaintRequestDTO.getComplaintId(), resolveComplaintRequestDTO.getResolutionDetails());

            return complaintMapper.complaintToResolveComplaintResponseDTO(complaint);
        } catch (Exception e) {
            throw new Exception("Error resolving complaint: " + e.getMessage());
        }
    }

    private Complaint updateComplaintStatus(Long complaintId, ComplaintStatus status, String resolutionDetails)
            throws Exception {
        try {
            Complaint complaint = findComplaintByID(complaintId);
            complaint.setStatus(status);

            if (resolutionDetails != null) {
                complaint.setResolutionDetails(resolutionDetails);
            }
            return complaintRepository.save(complaint);
        } catch (Exception e) {
            throw new Exception("Error updating complaint status: " + e.getMessage());
        }
    }

    private Complaint findComplaintByID(Long complaintID) throws Exception {
        return complaintRepository.findById(complaintID)
                .orElseThrow(() -> new Exception("Complaint not found with ID: " + complaintID));
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
