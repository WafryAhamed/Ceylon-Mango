package com.ceylonmango.service;

import com.ceylonmango.dto.OrderDto;
import com.ceylonmango.dto.OrderRequest;
import com.ceylonmango.model.*;
import com.ceylonmango.repository.CartItemRepository;
import com.ceylonmango.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartItemRepository cartItemRepository;
    private final AuthService authService;
    private final EmailService emailService;

    @Transactional
    public OrderDto createOrder(OrderRequest request) {
        User user = authService.getCurrentUser();
        log.info("Creating order for user #{} ({})", user.getId(), user.getEmail());
        List<CartItem> cartItems = cartItemRepository.findByUserId(user.getId());

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        // Calculate total
        BigDecimal totalPrice = cartItems.stream()
                .map(item -> item.getProduct().getPrice()
                        .multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Create order
        Order order = Order.builder()
                .user(user)
                .totalPrice(totalPrice)
                .status(Order.OrderStatus.PENDING)
                .shippingAddress(request.getShippingAddress())
                .paymentMethod(request.getPaymentMethod())
                .build();

        // Create order items from cart
        List<OrderItem> orderItems = cartItems.stream().map(cartItem -> {
            Product product = cartItem.getProduct();
            return OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantity(cartItem.getQuantity())
                    .price(product.getPrice())
                    .productName(product.getName())
                    .productImage(product.getImageUrl())
                    .build();
        }).toList();

        order.setItems(orderItems);
        Order savedOrder = orderRepository.save(order);
        log.info("Order #{} saved to DB — total: {}, items: {}", savedOrder.getId(), savedOrder.getTotalPrice(), savedOrder.getItems().size());

        // Clear cart after order
        cartItemRepository.deleteByUserId(user.getId());

        // Send order confirmation email
        try {
            emailService.sendOrderConfirmationEmail(
                user.getEmail(),
                user.getName(),
                savedOrder.getId(),
                savedOrder.getTotalPrice().toString(),
                savedOrder.getShippingAddress()
            );
            log.info("Order confirmation email sent for order #{}", savedOrder.getId());
        } catch (Exception e) {
            log.error("Failed to send order confirmation email: {}", e.getMessage());
            // Don't fail the order creation if email fails
        }

        return OrderDto.fromEntity(savedOrder);
    }

    @Transactional(readOnly = true)
    public List<OrderDto> getUserOrders() {
        User user = authService.getCurrentUser();
        log.info("Fetching orders for user #{} ({})", user.getId(), user.getEmail());
        List<OrderDto> orders = orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId()).stream()
                .map(OrderDto::fromEntity)
                .toList();
        log.info("Found {} orders for user #{}", orders.size(), user.getId());
        return orders;
    }

    @Transactional(readOnly = true)
    public List<OrderDto> getAllOrders() {
        log.info("Admin fetching all orders");
        List<OrderDto> orders = orderRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(OrderDto::fromEntity)
                .toList();
        log.info("Returning {} total orders", orders.size());
        return orders;
    }

    @Transactional
    public OrderDto updateOrderStatus(Long orderId, String status) {
        log.info("Updating order #{} status to '{}'", orderId, status);
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        try {
            Order.OrderStatus newStatus = Order.OrderStatus.valueOf(status.toUpperCase());
            order.setStatus(newStatus);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid order status: " + status);
        }

        Order saved = orderRepository.save(order);
        log.info("Order #{} status updated to '{}'", orderId, saved.getStatus());
        return OrderDto.fromEntity(saved);
    }
}
