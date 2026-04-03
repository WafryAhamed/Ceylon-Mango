package com.ceylonmango.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class WishlistRequest {

    @NotNull(message = "Product ID is required")
    private Long productId;
}
