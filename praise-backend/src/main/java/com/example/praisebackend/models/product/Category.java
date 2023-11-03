package com.example.praisebackend.models.product;

public enum Category {
    BOOKS("Various types of books from fiction to academic."),
    TOYS("Toys for kids of all ages."),
    SPORTS("Sports equipment and accessories."),
    VEHICLES("Cars, bikes, and other modes of transportation."),
    ELECTRONICS("Gadgets, devices, and more."),
    FASHION("Clothing, shoes, and other fashion items."),
    FURNITURE("Chairs, tables, and other home furnishings."),
    FOOD("All kinds of food items."),
    MUSIC("Musical instruments, albums, and more.");

    private final String description;

    Category(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}