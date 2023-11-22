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
    private String contactPhone;
    private double totalRatingSum = 0;
    private int ratingCount = 0;

    public void addRating(double rating) {
        this.totalRatingSum += rating;
        this.ratingCount++;
    }

    public double getAverageRating() {
        return (ratingCount > 0) ? totalRatingSum / ratingCount : 0;
    }

}