package com.ceylonmango.dto;

import com.ceylonmango.model.CartItem;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CartItemDto {
    private Long id;
    private ProductDto product;
    private Integer quantity;

    public static CartItemDto fromEntity(CartItem cartItem) {
        return CartItemDto.builder()
                .id(cartItem.getId())
                .product(ProductDto.fromEntity(cartItem.getProduct()))
                .quantity(cartItem.getQuantity())
                .build();
    }
}
