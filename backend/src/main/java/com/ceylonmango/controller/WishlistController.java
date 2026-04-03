package com.ceylonmango.controller;

import com.ceylonmango.dto.ApiResponse;
import com.ceylonmango.dto.WishlistDto;
import com.ceylonmango.dto.WishlistRequest;
import com.ceylonmango.service.WishlistService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;

    @GetMapping
    public ResponseEntity<List<WishlistDto>> getWishlist() {
        return ResponseEntity.ok(wishlistService.getWishlist());
    }

    @PostMapping("/add")
    public ResponseEntity<WishlistDto> addToWishlist(@Valid @RequestBody WishlistRequest request) {
        return ResponseEntity.ok(wishlistService.addToWishlist(request.getProductId()));
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<ApiResponse> removeFromWishlist(@PathVariable Long productId) {
        wishlistService.removeFromWishlist(productId);
        return ResponseEntity.ok(ApiResponse.success("Removed from wishlist"));
    }
}
