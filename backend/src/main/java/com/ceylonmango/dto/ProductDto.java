package com.ceylonmango.dto;

import com.ceylonmango.model.Product;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ProductDto {
    private String id;
    private String name;
    private String description;
    private Double price;
    private Double originalPrice;
    private String image;
    private List<String> images;
    private String category;
    private String weight;
    private Integer stock;
    private Boolean inStock;
    private Boolean featured;
    private Double rating;
    private Integer reviews;
    private Integer sales;

    public static ProductDto fromEntity(Product product) {
        // Explicitly materialize the images collection to avoid lazy loading outside transaction
        List<String> imagesList = new ArrayList<>();
        if (product.getImages() != null) {
            imagesList.addAll(product.getImages());
        }
        
        return ProductDto.builder()
                .id(String.valueOf(product.getId()))
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice() != null ? product.getPrice().doubleValue() : 0.0)
                .originalPrice(product.getOriginalPrice() != null ? product.getOriginalPrice().doubleValue() : null)
                .image(product.getImageUrl())
                .images(imagesList)
                .category(product.getCategory())
                .weight(product.getWeight())
                .stock(product.getStock())
                .inStock(product.getInStock())
                .featured(product.getFeatured())
                .rating(product.getRating())
                .reviews(product.getReviews())
                .sales(product.getSales())
                .build();
    }
}
