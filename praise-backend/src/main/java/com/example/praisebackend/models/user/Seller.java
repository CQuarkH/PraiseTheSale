package com.example.praisebackend.models.user;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@PrimaryKeyJoinColumn(name = "id")
@ToString(callSuper = true)
@DiscriminatorValue("SELLER")
public class Seller extends User {
    private String contactEmail;
    private String contactPhone;
    private double rating;

}