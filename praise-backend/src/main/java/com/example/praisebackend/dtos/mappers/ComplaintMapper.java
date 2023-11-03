package com.example.praisebackend.dtos.mappers;

import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.praisebackend.dtos.complaints.ComplaintRequestDTO;
import com.example.praisebackend.dtos.complaints.ComplaintResponseDTO;
import com.example.praisebackend.models.complaint.Complaint;

@Mapper(componentModel = "spring")
public class ComplaintMapper {

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private UserMapper userMapper;

    public Complaint complaintRequestDTOToComplaint(ComplaintRequestDTO complaintRequestDTO) {
        Complaint complaint = new Complaint();
        complaint.setContext(complaintRequestDTO.getContext());
        complaint.setDateTime(complaintRequestDTO.getDateTime());
        complaint.setProduct(productMapper.idToProduct(complaintRequestDTO.getProductID()));
        complaint.setUser(userMapper.idToUser(complaintRequestDTO.getUserID()));
        complaint.setTargetUser(userMapper.idToUser(complaintRequestDTO.getTargetUserID()));
        complaint.setSubject(complaintRequestDTO.getSubject());
        return complaint;
    }

    public ComplaintResponseDTO complaintToComplaintResponseDTO(Complaint complaint) {
        return ComplaintResponseDTO.builder()
                .id(complaint.getId())
                .subject(complaint.getSubject())
                .context(complaint.getContext())
                .dateTime(complaint.getDateTime())
                .complaintStatus(complaint.getStatus())
                .product(productMapper.productToProductResponseDTO(complaint.getProduct()))
                .targetUser(userMapper.userToUserDTO(complaint.getTargetUser()))
                .build();
    }

    public List<ComplaintResponseDTO> complaintsToComplaintResponseDTOs(List<Complaint> complaints) {
        return complaints.stream()
                .map(this::complaintToComplaintResponseDTO)
                .collect(Collectors.toList());
    }

}
