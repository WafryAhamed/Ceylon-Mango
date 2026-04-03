# Ceylon Mango E-commerce Platform - Complete Setup Guide

## 🎯 Project Overview

- **Frontend**: React 18 + Vite (Port: 5173)
- **Backend**: Spring Boot 3.5.0 + Java 25 (Port: 8080)
- **Database**: PostgreSQL (Port: 5432)

---

## 📋 Prerequisites

### Windows System Requirements
- PostgreSQL 14+ installed and running
- pgAdmin 4 (for database management)
- Node.js 16+ and npm
- Java 25 (JDK)
- Maven (included via mvnw wrapper)

### Database Credentials
```
PostgreSQL Username: postgres
PostgreSQL Password: 2001
Database Name: ceylon_mango
```

---

## 🚀 Quick Start (3 Simple Steps)

### Step 1: Verify PostgreSQL is Running

**Option A: Using pgAdmin 4**
1. Open pgAdmin 4 (usually http://localhost:5050)
2. Connect to localhost server
3. Verify it's running

**Option B: Using Command Line**
```powershell
# Test PostgreSQL connection
psql -U postgres -h localhost
# Type password: 2001
# If connected, type: \q to exit
```

---

### Step 2: Start Backend (Terminal 1)

```powershell
# Navigate to backend directory
cd backend

# Run Spring Boot application
./mvnw.cmd spring-boot:run
```

**Expected Output:**
```
✅ DATABASE CONNECTION SUCCESSFUL!
Started CeylonMangoApplication on http://localhost:8080
```

**Wait for these messages:**
- ✅ Database initialization complete
- ✅ Data seeding complete
- "Started CeylonMangoApplication in X seconds"

---

### Step 3: Start Frontend (Terminal 2)

```powershell
# Navigate to frontend directory
cd frontend

# Install dependencies (first time only)
npm install

# Run development server
npm run dev
```

**Expected Output:**
```
  VITE v5.4.21  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

---

## ✅ Verification Checklist

After both servers are running, verify:

- [ ] Backend running on http://localhost:8080
- [ ] Frontend running on http://localhost:5173
- [ ] Can view products on homepage
- [ ] Can log in with:
  - Admin: `admin@ceylonmango.lk` / `admin123`
  - Customer: `john@example.com` / `password123`
- [ ] Can add products to cart
- [ ] Admin dashboard accessible at `/admin`
- [ ] No errors in browser console or terminal

---

## 🔧 Configuration Files

### Backend Configuration
**File**: `backend/src/main/resources/application.properties`

```properties
# Server
server.port=8080

# PostgreSQL Database
spring.datasource.url=jdbc:postgresql://localhost:5432/ceylon_mango
spring.datasource.username=postgres
spring.datasource.password=2001
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA / Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.open-in-view=false

# JWT Configuration
app.jwt.secret=CeylonMangoSuperSecretKeyForJWTTokenGeneration2026MustBeAtLeast256BitsLong!!
app.jwt.expiration-ms=86400000

# File upload limits
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
```

### Frontend Configuration
**File**: `frontend/src/api/axios.js`

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// JWT token interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
```

### CORS Configuration
**File**: `backend/src/main/java/com/ceylonmango/config/CorsConfig.java`

- ✅ Allows: `http://localhost:5173`
- ✅ Allows: `http://localhost:3000` (alternative)
- ✅ Allows: All HTTP methods (GET, POST, PUT, DELETE, PATCH)
- ✅ Allows: Authorization headers

---

## 🗄️ Database Auto-Setup

The backend automatically:
1. ✅ Creates database `ceylon_mango` if not exists
2. ✅ Creates all tables using Hibernate ORM
3. ✅ Seeds default users and products
4. ✅ Establishes connection pooling via HikariCP

**No manual SQL execution required!**

---

## 👥 Default User Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@ceylonmango.lk | admin123 |
| Customer | john@example.com | password123 |
| Customer | amal@example.com | password123 |
| Customer | nisha@example.com | password123 |

---

## 🛠️ Troubleshooting

### ❌ Backend won't start - "password authentication failed"

**Solution:**
1. Verify PostgreSQL password in pgAdmin 4
2. Update `application.properties` with correct password
3. Restart backend

```powershell
# If PostgreSQL password is different, update in pgAdmin:
# Tools > Query Tool > ALTER USER postgres WITH PASSWORD '2001';
```

### ❌ Frontend can't connect to backend

**Solution:**
1. Verify backend is running on port 8080
2. Check browser console for CORS errors
3. Verify `frontend/src/api/axios.js` has correct base URL

```javascript
const API_BASE_URL = 'http://localhost:8080/api'; // Must be correct
```

### ❌ Products not loading

**Solution:**
1. Check backend logs for DataSeeder errors
2. Verify database connection succeeded
3. Restart backend: `./mvnw.cmd spring-boot:run`

### ❌ Port already in use

**Solution:**
```powershell
# Kill process on port 8080
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Kill process on port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

---

## 📊 API Endpoints

### Authentication
```
POST   /api/auth/login          - User login
POST   /api/auth/admin/login    - Admin login
POST   /api/auth/register       - Register new user
GET    /api/auth/me             - Get current user
PUT    /api/auth/profile        - Update profile
```

### Products
```
GET    /api/products            - List all products
GET    /api/products/{id}       - Get product details
GET    /api/products/featured   - Get featured products
POST   /api/products            - Create product (Admin)
PUT    /api/products/{id}       - Update product (Admin)
DELETE /api/products/{id}       - Delete product (Admin)
```

### Cart
```
GET    /api/cart                - Get cart items
POST   /api/cart/add            - Add to cart
PUT    /api/cart/update         - Update quantity
DELETE /api/cart/remove/{id}    - Remove from cart
DELETE /api/cart/clear          - Clear entire cart
```

### Orders
```
POST   /api/orders              - Place order
GET    /api/orders/user         - Get user's orders
GET    /api/orders              - Get all orders (Admin)
PUT    /api/orders/{id}/status  - Update status (Admin)
```

### Wishlist
```
GET    /api/wishlist            - Get wishlist
POST   /api/wishlist/add        - Add to wishlist
DELETE /api/wishlist/remove/{id} - Remove from wishlist
```

---

## 📝 Build & Package

### Build Backend JAR
```powershell
cd backend
./mvnw.cmd clean package
# Creates: backend/target/ceylon-mango-backend-1.0.0.jar
```

### Build Frontend (Production)
```powershell
cd frontend
npm run build
# Creates: frontend/dist/ (ready for deployment)
```

---

## 🔐 Security Features

✅ JWT-based authentication
✅ Password encryption (BCrypt)
✅ Role-based access control (Admin/User)
✅ CORS protection
✅ CSRF disabled (stateless JWT auth)
✅ Authorization headers in API calls

---

## 📱 Features

### Customer Features
- ✅ Browse products by category
- ✅ Search products
- ✅ Add/remove from wishlist
- ✅ Add/remove from cart
- ✅ Place orders
- ✅ View order history
- ✅ User profile management

### Admin Features
- ✅ Create/edit/delete products
- ✅ Manage user accounts
- ✅ View all orders
- ✅ Update order status
- ✅ Dashboard with analytics

---

## 📚 Project Structure

```
e:\mango/
├── backend/                              # Spring Boot backend
│   ├── src/main/java/com/ceylonmango/
│   │   ├── config/                       # Configuration classes
│   │   │   ├── CorsConfig.java
│   │   │   ├── DatabaseInitializer.java  # Auto DB setup
│   │   │   ├── DataSeeder.java           # Auto data seeding
│   │   │   ├── SecurityConfig.java
│   │   ├── controller/                   # REST controllers
│   │   ├── service/                      # Business logic
│   │   ├── model/                        # JPA entities
│   │   ├── repository/                   # Data access layer
│   │   └── CeylonMangoApplication.java
│   ├── src/main/resources/
│   │   └── application.properties        # Configuration
│   ├── pom.xml                          # Maven dependencies
│   └── mvnw.cmd                         # Maven wrapper
│
├── frontend/                             # React frontend
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.js                 # API configuration
│   │   │   ├── authApi.js
│   │   │   ├── productApi.js
│   │   │   ├── cartApi.js
│   │   │   └── orderApi.js
│   │   ├── pages/                       # Page components
│   │   ├── admin/                       # Admin components
│   │   ├── components/                  # Reusable components
│   │   ├── context/                     # React context (Auth, Cart)
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── SETUP_GUIDE.md (this file)
```

---

## ✨ Recent Fixes & Improvements

✅ **Password Configuration**: Updated to use correct PostgreSQL password (2001)
✅ **Database Auto-Setup**: DatabaseInitializer now creates database automatically
✅ **Error Handling**: Enhanced error messages and logging in all layers
✅ **Data Seeding**: Improved logging during user and product seeding
✅ **CORS Configuration**: Proper origin and header configuration
✅ **JWT Interceptor**: Frontend properly sends tokens in Authorization header
✅ **Hibernate Dialect**: Auto-detection enabled, deprecated config removed
✅ **Connection Pooling**: HikariCP for efficient database connections

---

## 🎉 You're All Set!

Follow the **Quick Start** section to get your application running. Enjoy building with Ceylon Mango! 🥭

For more help, check the logs in your terminal. All error messages are detailed and actionable.

