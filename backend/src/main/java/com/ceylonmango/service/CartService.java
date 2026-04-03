package com.ceylonmango.service;

import com.ceylonmango.dto.CartItemDto;
import com.ceylonmango.model.CartItem;
import com.ceylonmango.model.Product;
import com.ceylonmango.model.User;
import com.ceylonmango.repository.CartItemRepository;
import com.ceylonmango.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final AuthService authService;

    public List<CartItemDto> getCartItems() {
        User user = authService.getCurrentUser();
        return cartItemRepository.findByUserId(user.getId()).stream()
                .map(CartItemDto::fromEntity)
                .toList();
    }

    public CartItemDto addToCart(Long productId, int quantity) {
        User user = authService.getCurrentUser();
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Optional<CartItem> existing = cartItemRepository.findByUserIdAndProductId(
                user.getId(), productId);

        CartItem cartItem;
        if (existing.isPresent()) {
            cartItem = existing.get();
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        } else {
            cartItem = CartItem.builder()
                    .user(user)
                    .product(product)
                    .quantity(quantity)
                    .build();
        }

        CartItem saved = cartItemRepository.save(cartItem);
        return CartItemDto.fromEntity(saved);
    }

    public CartItemDto updateCartItem(Long productId, int quantity) {
        User user = authService.getCurrentUser();
        CartItem cartItem = cartItemRepository.findByUserIdAndProductId(
                        user.getId(), productId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (quantity <= 0) {
            cartItemRepository.delete(cartItem);
            return null;
        }

        cartItem.setQuantity(quantity);
        CartItem saved = cartItemRepository.save(cartItem);
        return CartItemDto.fromEntity(saved);
    }

    @Transactional
    public void removeFromCart(Long productId) {
        User user = authService.getCurrentUser();
        cartItemRepository.deleteByUserIdAndProductId(user.getId(), productId);
    }

    @Transactional
    public void clearCart() {
        User user = authService.getCurrentUser();
        cartItemRepository.deleteByUserId(user.getId());
    }
}
