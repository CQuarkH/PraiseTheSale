package com.example.praisebackend.dtos.products;

import com.example.praisebackend.models.product.Category;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CategoryResponseDTO {
    private Category name;
    private String categoryDescription;
    private int productLength;
    private String imageLink;

    public void setCategory(Category category) {
        this.name = category;
        this.categoryDescription = category.getDescription();
        this.imageLink = category.getImageLink();
    }

}
