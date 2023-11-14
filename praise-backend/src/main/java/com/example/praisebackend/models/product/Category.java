package com.example.praisebackend.models.product;

public enum Category {
    BOOKS("Various types of books from fiction to academic.",
            "https://firebasestorage.googleapis.com/v0/b/praisethesale-c921f.appspot.com/o/categories%2FBOOKS.webp?alt=media&token=4c299d35-665c-4547-a4f7-8b13030926a3"),
    TOYS("Toys for kids of all ages.",
            "https://firebasestorage.googleapis.com/v0/b/praisethesale-c921f.appspot.com/o/categories%2FTOYS.jpeg?alt=media&token=8e5b5490-de84-4850-a871-7d99483e8446"),
    SPORTS("Sports equipment and accessories.",
            "https://firebasestorage.googleapis.com/v0/b/praisethesale-c921f.appspot.com/o/categories%2FSPORTS.jpg?alt=media&token=65cc7280-f607-4696-985e-696cf581f8af"),
    VEHICLES("Cars, bikes, and other modes of transportation.",
            "https://firebasestorage.googleapis.com/v0/b/praisethesale-c921f.appspot.com/o/categories%2FVEHICLES.jpeg?alt=media&token=ad6c4cb9-aa32-442e-9c32-2a525c3532c4"),
    ELECTRONICS("Gadgets, devices, and more.",
            "https://firebasestorage.googleapis.com/v0/b/praisethesale-c921f.appspot.com/o/categories%2FELECTRONICS.jpeg?alt=media&token=f7e6b146-71da-4f69-ba26-e3035302f5ba"),
    FASHION("Clothing, shoes, and other fashion items.",
            "https://firebasestorage.googleapis.com/v0/b/praisethesale-c921f.appspot.com/o/categories%2FFASHION.webp?alt=media&token=2c5b91ca-d882-4c77-be81-3996f4d7b067"),
    FURNITURE("Chairs, tables, and other home furnishings.",
            "https://firebasestorage.googleapis.com/v0/b/praisethesale-c921f.appspot.com/o/categories%2FFURNITURE.jpeg?alt=media&token=a1292ab7-cb2d-4746-a080-f48996a2b3bf"),
    FOOD("All kinds of food items.",
            "https://firebasestorage.googleapis.com/v0/b/praisethesale-c921f.appspot.com/o/categories%2FFOOD.jpeg?alt=media&token=10bd58b3-e098-4190-93ee-303ebd318031"),
    MUSIC("Musical instruments, albums, and more.",
            "https://firebasestorage.googleapis.com/v0/b/praisethesale-c921f.appspot.com/o/categories%2FMUSIC.webp?alt=media&token=3bb295db-fe4c-42a0-b419-513f685e3a72");

    private final String description;
    private final String imageLink;

    Category(String description, String imageLink) {
        this.description = description;
        this.imageLink = imageLink;

    }

    public String getDescription() {
        return description;
    }

    public String getImageLink() {
        return imageLink;
    }
}