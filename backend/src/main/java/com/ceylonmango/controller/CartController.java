package com.ceylonmango.controller;

import com.ceylonmango.dto.ApiResponse;
import com.ceylonmango.dto.CartItemDto;
import com.ceylonmango.dto.CartRequest;
import com.ceylonmango.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<List<CartItemDto>> getCart() {
        return ResponseEntity.ok(cartService.getCartItems());
    }

    @PostMapping("/add")
    public ResponseEntity<CartItemDto> addToCart(@Valid @RequestBody CartRequest request) {
        return ResponseEntity.ok(
                cartService.addToCart(request.getProductId(), request.getQuantity()));
    }

    @PutMapping("/update")
    public ResponseEntity<CartItemDto> updateCartItem(@Valid @RequestBody CartRequest request) {
        CartItemDto updated = cartService.updateCartItem(
                request.getProductId(), request.getQuantity());
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<ApiResponse> removeFromCart(@PathVariable Long productId) {
        cartService.removeFromCart(productId);
        return ResponseEntity.ok(ApiResponse.success("Item removed from cart"));
    }

    @DeleteMapping("/clear")
    public ResponseEntity<ApiResponse> clearCart() {
        cartService.clearCart();
        return ResponseEntity.ok(ApiResponse.success("Cart cleared"));
    }
}
