# Ceylon Mango Backend

## Prerequisites

- **Java 17+** (JDK)
- **PostgreSQL 14+**
- **Maven 3.8+** (or use the included wrapper)

## Database Setup

1. Install and start PostgreSQL
2. Create the database:
   ```sql
   CREATE DATABASE ceylon_mango;
   ```
3. Update credentials in `src/main/resources/application.properties` if needed:
   ```properties
   spring.datasource.username=postgres
   spring.datasource.password=postgres
   ```

## Running the Backend

```bash
cd backend

# Using Maven wrapper (recommended)
./mvnw spring-boot:run

# Or with Maven installed globally
mvn spring-boot:run
```

The server starts on **http://localhost:8080**.

Hibernate will auto-create tables on first run. The `DataSeeder` populates products and users automatically.

## Default Accounts

| Role     | Email                  | Password     |
|----------|------------------------|--------------|
| Admin    | admin@ceylonmango.lk   | admin123     |
| Customer | john@example.com       | password123  |

## API Endpoints

### Authentication
| Method | Endpoint               | Description         | Auth   |
|--------|------------------------|---------------------|--------|
| POST   | /api/auth/register     | Register new user   | Public |
| POST   | /api/auth/login        | User login          | Public |
| POST   | /api/auth/admin/login  | Admin login         | Public |
| GET    | /api/auth/me           | Get current user    | JWT    |
| PUT    | /api/auth/profile      | Update profile      | JWT    |

### Products
| Method | Endpoint                         | Description          | Auth   |
|--------|----------------------------------|----------------------|--------|
| GET    | /api/products                    | List all products    | Public |
| GET    | /api/products?category=fresh     | Filter by category   | Public |
| GET    | /api/products?search=mango       | Search products      | Public |
| GET    | /api/products/featured           | Featured products    | Public |
| GET    | /api/products/{id}               | Get product by ID    | Public |
| POST   | /api/products                    | Create product       | Admin  |
| PUT    | /api/products/{id}               | Update product       | Admin  |
| DELETE | /api/products/{id}               | Delete product       | Admin  |

### Cart
| Method | Endpoint                | Description           | Auth |
|--------|-------------------------|-----------------------|------|
| GET    | /api/cart               | Get cart items        | JWT  |
| POST   | /api/cart/add           | Add to cart           | JWT  |
| PUT    | /api/cart/update        | Update cart quantity   | JWT  |
| DELETE | /api/cart/remove/{pid}  | Remove from cart      | JWT  |
| DELETE | /api/cart/clear         | Clear entire cart     | JWT  |

### Orders
| Method | Endpoint                        | Description            | Auth  |
|--------|---------------------------------|------------------------|-------|
| POST   | /api/orders                     | Place order            | JWT   |
| GET    | /api/orders/user                | Get user's orders      | JWT   |
| GET    | /api/orders                     | Get all orders         | Admin |
| PUT    | /api/orders/{id}/status?status= | Update order status    | Admin |

### Wishlist
| Method | Endpoint                     | Description            | Auth |
|--------|------------------------------|------------------------|------|
| GET    | /api/wishlist                | Get wishlist           | JWT  |
| POST   | /api/wishlist/add            | Add to wishlist        | JWT  |
| DELETE | /api/wishlist/remove/{pid}   | Remove from wishlist   | JWT  |

### Users (Admin)
| Method | Endpoint          | Description     | Auth  |
|--------|-------------------|-----------------|-------|
| GET    | /api/users        | List all users  | Admin |
| DELETE | /api/users/{id}   | Delete user     | Admin |

## Connecting Frontend

The backend has CORS configured for `http://localhost:5173` (Vite default).

### Auth Flow
1. Call `/api/auth/login` or `/api/auth/register`
2. Store the returned JWT token
3. Include in all subsequent requests:
   ```
   Authorization: Bearer <token>
   ```

### Example API Call (Fetch)
```javascript
const response = await fetch('http://localhost:8080/api/products', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
const products = await response.json();
```

## Project Structure

```
backend/
├── pom.xml
└── src/main/
    ├── java/com/ceylonmango/
    │   ├── CeylonMangoApplication.java
    │   ├── config/
    │   │   ├── CorsConfig.java
    │   │   ├── DataSeeder.java
    │   │   ├── GlobalExceptionHandler.java
    │   │   └── SecurityConfig.java
    │   ├── controller/
    │   │   ├── AuthController.java
    │   │   ├── CartController.java
    │   │   ├── OrderController.java
    │   │   ├── ProductController.java
    │   │   ├── UserController.java
    │   │   └── WishlistController.java
    │   ├── dto/
    │   │   ├── ApiResponse.java
    │   │   ├── AuthRequest.java
    │   │   ├── AuthResponse.java
    │   │   ├── CartItemDto.java
    │   │   ├── CartRequest.java
    │   │   ├── OrderDto.java
    │   │   ├── OrderRequest.java
    │   │   ├── ProductDto.java
    │   │   ├── ProductRequest.java
    │   │   ├── RegisterRequest.java
    │   │   ├── UpdateProfileRequest.java
    │   │   ├── UserDto.java
    │   │   ├── WishlistDto.java
    │   │   └── WishlistRequest.java
    │   ├── model/
    │   │   ├── CartItem.java
    │   │   ├── Order.java
    │   │   ├── OrderItem.java
    │   │   ├── Product.java
    │   │   ├── User.java
    │   │   └── WishlistItem.java
    │   ├── repository/
    │   │   ├── CartItemRepository.java
    │   │   ├── OrderItemRepository.java
    │   │   ├── OrderRepository.java
    │   │   ├── ProductRepository.java
    │   │   ├── UserRepository.java
    │   │   └── WishlistRepository.java
    │   ├── security/
    │   │   ├── CustomUserDetailsService.java
    │   │   ├── JwtAuthEntryPoint.java
    │   │   ├── JwtAuthenticationFilter.java
    │   │   └── JwtTokenProvider.java
    │   └── service/
    │       ├── AuthService.java
    │       ├── CartService.java
    │       ├── OrderService.java
    │       ├── ProductService.java
    │       ├── UserService.java
    │       └── WishlistService.java
    └── resources/
        ├── application.properties
        └── schema.sql
```
