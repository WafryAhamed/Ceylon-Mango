package com.ceylonmango.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "wishlist", indexes = {
    @Index(name = "idx_wishlist_user", columnList = "user_id"),
    @Index(name = "idx_wishlist_user_product", columnList = "user_id, product_id", unique = true)
})
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class WishlistItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
}
