package com.ceylonmango.service;

import com.ceylonmango.dto.ProductDto;
import com.ceylonmango.dto.ProductRequest;
import com.ceylonmango.model.Product;
import com.ceylonmango.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<ProductDto> getAllProducts() {
        return productRepository.findAll().stream()
                .map(ProductDto::fromEntity)
                .toList();
    }

    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        return ProductDto.fromEntity(product);
    }

    public List<ProductDto> getProductsByCategory(String category) {
        if ("all".equalsIgnoreCase(category)) {
            return getAllProducts();
        }
        return productRepository.findByCategory(category).stream()
                .map(ProductDto::fromEntity)
                .toList();
    }

    public List<ProductDto> getFeaturedProducts() {
        return productRepository.findByFeaturedTrue().stream()
                .map(ProductDto::fromEntity)
                .toList();
    }

    public List<ProductDto> searchProducts(String query) {
        return productRepository.findByNameContainingIgnoreCase(query).stream()
                .map(ProductDto::fromEntity)
                .toList();
    }

    public ProductDto createProduct(ProductRequest request) {
        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(BigDecimal.valueOf(request.getPrice()))
                .originalPrice(request.getOriginalPrice() != null
                        ? BigDecimal.valueOf(request.getOriginalPrice()) : null)
                .imageUrl(request.getImage())
                .images(request.getImages() != null ? request.getImages() : List.of())
                .category(request.getCategory())
                .weight(request.getWeight())
                .stock(request.getStock() != null ? request.getStock() : 0)
                .inStock(request.getInStock() != null ? request.getInStock() : true)
                .featured(request.getFeatured() != null ? request.getFeatured() : false)
                .build();

        Product saved = productRepository.save(product);
        return ProductDto.fromEntity(saved);
    }

    public ProductDto updateProduct(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(BigDecimal.valueOf(request.getPrice()));
        product.setOriginalPrice(request.getOriginalPrice() != null
                ? BigDecimal.valueOf(request.getOriginalPrice()) : null);
        product.setImageUrl(request.getImage());
        if (request.getImages() != null) {
            product.setImages(request.getImages());
        }
        product.setCategory(request.getCategory());
        product.setWeight(request.getWeight());
        if (request.getStock() != null) product.setStock(request.getStock());
        if (request.getInStock() != null) product.setInStock(request.getInStock());
        if (request.getFeatured() != null) product.setFeatured(request.getFeatured());

        Product saved = productRepository.save(product);
        return ProductDto.fromEntity(saved);
    }

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }
}
