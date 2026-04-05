package com.ceylonmango.repository;

import com.ceylonmango.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    @EntityGraph(attributePaths = {"images"})
    List<Product> findByCategory(String category);
    
    @EntityGraph(attributePaths = {"images"})
    List<Product> findByFeaturedTrue();
    
    @EntityGraph(attributePaths = {"images"})
    List<Product> findByNameContainingIgnoreCase(String name);
}
