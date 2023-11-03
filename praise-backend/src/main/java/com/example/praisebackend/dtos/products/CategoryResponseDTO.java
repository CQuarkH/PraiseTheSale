package com.example.praisebackend.dtos.products;

import com.example.praisebackend.models.product.Category;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CategoryResponseDTO {
    private Category category;
    private String categoryDescription;
    private int productLength;

    public void setCategory(Category category) {
        this.category = category;
        this.categoryDescription = category.getDescription();
    }

}
