# 🚀 Ceylon Mango - Quick Reference Card

## ⚡ 30-Second Startup

```powershell
# Terminal 1: Backend
cd backend
./mvnw.cmd spring-boot:run

# Terminal 2: Frontend  
cd frontend
npm run dev

# Then open: http://localhost:5173
```

---

## 🔐 Login Credentials

| Role | Email | Password |
|------|-------|----------|
| 👑 Admin | admin@ceylonmango.lk | admin123 |
| 👤 Customer | john@example.com | password123 |

---

## 🌐 URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:8080 |
| API | http://localhost:8080/api |
| Database | localhost:5432 |

---

## 🔧 Database Credentials

| Setting | Value |
|---------|-------|
| Username | postgres |
| Password | 2001 |
| Database | ceylon_mango |
| Host | localhost |
| Port | 5432 |

---

## 📁 Important Files

```
backend/src/main/resources/application.properties
  ↳ Database configuration & server settings

frontend/src/api/axios.js
  ↳ Frontend API configuration

backend/src/main/java/com/ceylonmango/config/
  ├─ DatabaseInitializer.java (auto DB setup)
  ├─ DataSeeder.java (auto data seeding)
  ├─ CorsConfig.java (cross-origin handling)
  ├─ SecurityConfig.java (authentication/authorization)
  └─ GlobalExceptionHandler.java (error handling)
```

---

## 📊 Key Configurations

### Backend (Spring Boot)
```properties
server.port=8080
spring.datasource.url=jdbc:postgresql://localhost:5432/ceylon_mango
spring.datasource.username=postgres
spring.datasource.password=2001
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### Frontend (React + Vite)
```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

---

## ✨ Features

### Customer
- 🛍️ Browse products
- 🔍 Search & filter
- ❤️ Wishlist
- 🛒 Shopping cart
- 📦 Place orders
- 📋 Order history

### Admin
- 📝 Manage products
- 👥 Manage users
- 📊 View all orders
- ⚙️ Update order status
- 📈 Dashboard

---

## 🆠 API Endpoints (Sample)

```bash
# Auth
POST   /api/auth/login
POST   /api/auth/register
GET    /api/auth/me

# Products
GET    /api/products
GET    /api/products/{id}
POST   /api/products (Admin)
PUT    /api/products/{id} (Admin)
DELETE /api/products/{id} (Admin)

# Cart
GET    /api/cart
POST   /api/cart/add
DELETE /api/cart/remove/{id}

# Orders
POST   /api/orders
GET    /api/orders/user
GET    /api/orders (Admin)
PUT    /api/orders/{id}/status (Admin)
```

---

## 🐛 Troubleshooting

### Backend won't start
```powershell
# Check if PostgreSQL is running
# Update password in backend/src/main/resources/application.properties
# Try: ./mvnw.cmd clean install
```

### Frontend can't connect
```bash
# Verify backend is running on :8080
# Check browser console for errors
# Verify: frontend/src/api/axios.js has correct API_BASE_URL
```

### Products not loading
```bash
# Check backend logs for seeding errors
# Restart: ./mvnw.cmd spring-boot:run
```

### Port already in use
```powershell
# Kill port 8080: netstat -ano | findstr :8080, then taskkill /PID {PID} /F
# Kill port 5173: netstat -ano | findstr :5173, then taskkill /PID {PID} /F
```

---

## 📚 Documentation Files

- **SETUP_GUIDE.md** - Complete setup & troubleshooting
- **CONFIGURATION_SUMMARY.md** - Detailed changes & architecture
- **START.ps1** - Automated startup script
- **README.md** - Project overview

---

## 🎯 Default Setup (No Configuration Needed)

✅ Database auto-created
✅ Tables auto-created
✅ Data auto-seeded
✅ CORS configured
✅ JWT configured
✅ All services ready

**Just run and enjoy!** 🥭

---

## 👨‍💻 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18 + Vite + Tailwind CSS |
| **Backend** | Spring Boot 3.5.0 + Java 25 |
| **Database** | PostgreSQL 14+ |
| **Authentication** | JWT + BCrypt |
| **API** | RESTful with Axios |
| **Styling** | Tailwind CSS + Framer Motion |

---

## 📞 Quick Help

**Q: How do I reset the database?**
A: Delete the database in pgAdmin and restart backend

**Q: How do I add more test data?**
A: Edit DataSeeder.java in backend/src/main/java/com/ceylonmango/config/

**Q: How do I change the JWT secret?**
A: Update app.jwt.secret in application.properties

**Q: Can I run frontend on different port?**
A: Edit vite.config.js and update CORS in backend

---

✨ **You're all set! Happy coding!** ✨

