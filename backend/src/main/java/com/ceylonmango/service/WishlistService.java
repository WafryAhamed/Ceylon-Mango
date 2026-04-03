package com.ceylonmango.service;

import com.ceylonmango.dto.WishlistDto;
import com.ceylonmango.model.Product;
import com.ceylonmango.model.User;
import com.ceylonmango.model.WishlistItem;
import com.ceylonmango.repository.ProductRepository;
import com.ceylonmango.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final ProductRepository productRepository;
    private final AuthService authService;

    public List<WishlistDto> getWishlist() {
        User user = authService.getCurrentUser();
        return wishlistRepository.findByUserId(user.getId()).stream()
                .map(WishlistDto::fromEntity)
                .toList();
    }

    public WishlistDto addToWishlist(Long productId) {
        User user = authService.getCurrentUser();

        if (wishlistRepository.existsByUserIdAndProductId(user.getId(), productId)) {
            throw new RuntimeException("Product already in wishlist");
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        WishlistItem item = WishlistItem.builder()
                .user(user)
                .product(product)
                .build();

        WishlistItem saved = wishlistRepository.save(item);
        return WishlistDto.fromEntity(saved);
    }

    @Transactional
    public void removeFromWishlist(Long productId) {
        User user = authService.getCurrentUser();
        wishlistRepository.deleteByUserIdAndProductId(user.getId(), productId);
    }
}
