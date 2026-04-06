package com.ceylonmango.repository;

import com.ceylonmango.model.Order;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @EntityGraph(attributePaths = {"items", "items.product", "user"})
    List<Order> findByUserIdOrderByCreatedAtDesc(Long userId);

    @EntityGraph(attributePaths = {"items", "items.product", "user"})
    List<Order> findAllByOrderByCreatedAtDesc();

    @Query("SELECT COUNT(o) FROM Order o WHERE o.user.id = :userId")
    int countByUserId(Long userId);

    @Query("SELECT COALESCE(SUM(o.totalPrice), 0) FROM Order o WHERE o.user.id = :userId")
    double sumTotalPriceByUserId(Long userId);
}
