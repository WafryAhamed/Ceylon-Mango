package com.ceylonmango.dto;

import com.ceylonmango.model.Order;
import com.ceylonmango.model.OrderItem;
import lombok.*;

import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class OrderDto {
    private String id;
    private String date;
    private String status;
    private List<OrderItemDto> items;
    private Double total;
    private String shippingAddress;
    private String paymentMethod;

    // Admin fields
    private String customerName;
    private String customerEmail;

    public static OrderDto fromEntity(Order order) {
        String orderId = String.format("ORD-%03d", order.getId());

        return OrderDto.builder()
                .id(orderId)
                .date(order.getCreatedAt() != null ? order.getCreatedAt().toLocalDate().toString() : null)
                .status(order.getStatus().name().toLowerCase())
                .items(order.getItems().stream().map(OrderItemDto::fromEntity).toList())
                .total(order.getTotalPrice() != null ? order.getTotalPrice().doubleValue() : 0.0)
                .shippingAddress(order.getShippingAddress())
                .paymentMethod(order.getPaymentMethod())
                .customerName(order.getUser() != null ? order.getUser().getName() : null)
                .customerEmail(order.getUser() != null ? order.getUser().getEmail() : null)
                .build();
    }

    @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
    public static class OrderItemDto {
        private String productId;
        private String name;
        private Double price;
        private Integer quantity;
        private String image;

        public static OrderItemDto fromEntity(OrderItem item) {
            return OrderItemDto.builder()
                    .productId(String.valueOf(item.getProduct().getId()))
                    .name(item.getProductName())
                    .price(item.getPrice() != null ? item.getPrice().doubleValue() : 0.0)
                    .quantity(item.getQuantity())
                    .image(item.getProductImage())
                    .build();
        }
    }
}
