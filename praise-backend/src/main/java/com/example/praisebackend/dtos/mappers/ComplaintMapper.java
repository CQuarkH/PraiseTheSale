package com.example.praisebackend.dtos.mappers;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.praisebackend.dtos.complaints.ComplaintRequestDTO;
import com.example.praisebackend.dtos.complaints.ComplaintResponseDTO;
import com.example.praisebackend.dtos.complaints.ResolveComplaintResponseDTO;
import com.example.praisebackend.models.complaint.Complaint;
import com.example.praisebackend.models.complaint.ComplaintStatus;

@Mapper(componentModel = "spring")
public class ComplaintMapper {

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private UserMapper userMapper;

    public Complaint complaintRequestDTOToComplaint(ComplaintRequestDTO complaintRequestDTO) {
        Complaint complaint = new Complaint();
        complaint.setContext(complaintRequestDTO.getContext());
        complaint.setDateTime(LocalDateTime.now());
        complaint.setProduct(productMapper.idToProduct(complaintRequestDTO.getProductID()));
        complaint.setUser(userMapper.idToUser(complaintRequestDTO.getUserID()));
        complaint.setTargetUser(userMapper.idToUser(complaintRequestDTO.getTargetUserID()));
        complaint.setSubject(complaintRequestDTO.getSubject());
        complaint.setStatus(ComplaintStatus.PENDING);
        return complaint;
    }

    public ComplaintResponseDTO complaintToComplaintResponseDTO(Complaint complaint) {
        return ComplaintResponseDTO.builder()
                .id(complaint.getId())
                .subject(complaint.getSubject())
                .context(complaint.getContext())
                .dateTime(complaint.getDateTime())
                .complaintStatus(complaint.getStatus())
                .product(productMapper.productToProductOnlyResponseDTO(complaint.getProduct()))
                .targetUser(userMapper.userToUserDTO(complaint.getTargetUser()))
                .user(userMapper.userToUserDTO(complaint.getUser()))
                .build();
    }

    public ResolveComplaintResponseDTO complaintToResolveComplaintResponseDTO(Complaint complaint) {
        return ResolveComplaintResponseDTO.builder()
                .complaint(complaintToComplaintResponseDTO(complaint))
                .resolutionDetails(complaint.getResolutionDetails()).build();
    }

    public List<ComplaintResponseDTO> complaintsToComplaintResponseDTOs(List<Complaint> complaints) {
        return complaints.stream()
                .map(this::complaintToComplaintResponseDTO)
                .collect(Collectors.toList());
    }

    public List<ResolveComplaintResponseDTO> complaintsToResolveComplaintResponseDTOs(List<Complaint> complaints) {
        return complaints.stream().map(this::complaintToResolveComplaintResponseDTO).collect(Collectors.toList());
    }
}
