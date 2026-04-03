package com.ceylonmango.dto;

import com.ceylonmango.model.WishlistItem;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class WishlistDto {
    private Long id;
    private ProductDto product;

    public static WishlistDto fromEntity(WishlistItem item) {
        return WishlistDto.builder()
                .id(item.getId())
                .product(ProductDto.fromEntity(item.getProduct()))
                .build();
    }
}
