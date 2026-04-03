# 🥭 Ceylon Mango - Comprehensive Testing Guide

Welcome to the Ceylon Mango QA Testing suite! This guide walks through all testing methodologies, tools, and procedures to validate your full-stack e-commerce application.

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Testing Tools Available](#testing-tools-available)
3. [Pre-Test System Check](#pre-test-system-check)
4. [Backend API Testing](#backend-api-testing)
5. [Frontend UI Testing](#frontend-ui-testing)
6. [Integration Testing](#integration-testing)
7. [Test Results & Reporting](#test-results--reporting)
8. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### Option 1: Automated Full Test Suite (Recommended)

```powershell
# Windows - Run comprehensive QA test
.\run-full-test.ps1
```

This will:
- ✅ Verify system prerequisites (Node.js, Java, PostgreSQL)
- ✅ Build backend with Maven
- ✅ Validate project structure
- ✅ Check configuration files
- ✅ Verify port availability
- ✅ Provide startup instructions

### Option 2: Manual Testing with Interactive Console

1. Start your backend and frontend servers (see below)
2. Open `api-test-console.html` in your browser
3. Test endpoints interactively with the UI

### Option 3: Programmatic API Testing

```bash
# Requires Node.js and axios
node api-test.js
```

---

## 🛠️ Testing Tools Available

### 1. **run-full-test.ps1** - PowerShell QA Suite
**Purpose**: Complete system validation and pre-test check
**Usage**: `.\run-full-test.ps1`
**Tests**:
- System prerequisites (Node.js, Java, PostgreSQL)
- Maven compilation
- Project structure/
- Configuration files
- Port availability

**Output**: Console report with pass/fail status

---

### 2. **api-test.js** - Automated API Test Script
**Purpose**: Comprehensive API endpoint testing
**Usage**: `node api-test.js`
**Tests**:
- Authentication (login, admin login, error handling)
- Product APIs (all products, featured, by ID, filtering)
- Cart operations (add, update, retrieve)
- Order management
- Admin endpoints (authorization checks)

**Output**: Colored console output with test summary

---

### 3. **api-test-console.html** - Interactive Web-Based Tester
**Purpose**: Manual API testing with user-friendly UI
**Usage**: Open in any browser
**Features**:
- Real-time backend connection status
- Interactive login forms
- Quick test buttons
- Visual result display
- Test result summary

---

## ✅ Pre-Test System Check

Before running any tests, verify:

```bash
# 1. Check Node.js version
node --version
# Expected: v18.0.0 or higher

# 2. Check Java version
java -version
# Expected: Java 21 or higher

# 3. Check Maven is accessible
mvn --version
# Expected: Maven version 3.9.9+

# 4. Check PostgreSQL is running
# Windows: Services should show PostgreSQL running
# Check pgAdmin4 via browser: http://localhost:5050

# 5. Verify ports are available
# 8080 - Backend
# 5173 - Frontend
# 5432 - PostgreSQL
```

---

## 🔧 Backend API Testing

### Step 1: Start PostgreSQL

```bash
# Windows - PostgreSQL should auto-start as service
# Verify in Services: postgresql-x64-14

# If needed, access pgAdmin4:
# Browser: http://localhost:5050
# Username: admin@pgadmin.org
# Password: admin
```

### Step 2: Start Backend Server

```bash
cd backend
.\mvnw.cmd spring-boot:run
```

Expected output:
```
✅ DATABASE CONNECTION SUCCESSFUL!
✅ DATABASE INITIALIZATION COMPLETED
✅ DATA SEEDING COMPLETED
Started CeylonMangoApplication in X seconds (JVM running for Y.XYZ)
```

### Step 3: Verify Backend Health

```bash
# Test if backend is responding
curl http://localhost:8080/api/products

# Expected response: JSON array of products
```

### Database Testing

```bash
# Connect via PostgreSQL command line
psql -U postgres -h localhost -d ceylon_mango

# Verify tables
\dt

# Check data
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM products;
SELECT COUNT(*) FROM orders;
```

---

## 🎨 Frontend UI Testing

### Step 1: Install Dependencies

```bash
cd frontend
npm install
```

### Step 2: Start Development Server

```bash
npm run dev
```

Expected output:
```
VITE v8.0.3  ready in XXX ms

➜  Local:   http://localhost:5173/
```

### Step 3: Manual UI Testing Checklist

#### Home Page
- [ ] Hero section loads with image
- [ ] Featured products display correctly
- [ ] Category cards are clickable
- [ ] Navbar items are accessible
- [ ] Footer loads properly

#### Product Browsing
- [ ] Shop page loads all products
- [ ] Category filters work
- [ ] Search functionality works
- [ ] Product cards display images and price
- [ ] Product details page loads on click

#### Authentication
- [ ] Login page is accessible
- [ ] Customer login works (john@example.com / password123)
- [ ] Invalid credentials show error
- [ ] Logged-in user can logout
- [ ] Admin login works (admin@ceylonmango.lk / admin123)

#### Shopping Cart
- [ ] Add product to cart
- [ ] Cart count increments
- [ ] Cart page shows items
- [ ] Update quantity works
- [ ] Remove item works
- [ ] Clear cart works

#### Wishlist
- [ ] Add product to wishlist
- [ ] Wishlist page displays items
- [ ] Remove from wishlist works

#### Order Management
- [ ] Place order from cart
- [ ] Order history shows placed orders
- [ ] Order details are accurate
- [ ] Admin can view all orders

#### Admin Dashboard (admin@ceylonmango.lk / admin123)
- [ ] Admin can access dashboard
- [ ] Product management works
- [ ] Can add new product
- [ ] Can edit product
- [ ] Can delete product
- [ ] Can manage orders
- [ ] Can view all users
- [ ] Can manage user accounts

---

## 🔗 Integration Testing

### API ↔ Frontend Integration

#### Authentication Flow
```javascript
// Test sequence:
1. POST /api/auth/login → Get JWT token
2. Store token in localStorage
3. Subsequent requests include Authorization header
4. Verify token is sent in all authenticated requests
```

#### Product Flow
```javascript
// Test sequence:
1. GET /api/products → Fetch all products
2. GET /api/products/1 → View product details
3. POST /api/cart/add → Add to cart (requires auth)
4. GET /api/cart → Retrieve cart items
```

#### Order Flow
```javascript
// Test sequence:
1. POST /api/orders → Create order from cart
2. GET /api/orders/user → Retrieve user's orders
3. Verify order status changes
4. Admin: GET /api/orders → See all orders
5. Admin: POST /api/orders/{id}/status → Update status
```

### CORS Testing

Verify backend accepts requests from frontend origin:

```javascript
// Browser console (while on http://localhost:5173)
fetch('http://localhost:8080/api/products')
  .then(r => r.json())
  .then(data => console.log('✅ CORS OK', data))
  .catch(e => console.error('❌ CORS Error', e));
```

Expected: Request succeeds with proper CORS headers

---

## 📊 Test Results & Reporting

### Automated Test Report

```powershell
# Run full test suite
.\run-full-test.ps1

# Creates console output with:
# - ✅ All system checks passed
# - ✅ Backend builds successfully
# - ✅ Configuration files present
# - ✅ Ports available
# - Summary with percentage success rate
```

### API Test Report

```bash
# Run API tests
node api-test.js

# Outputs:
# ✅ Authentication Tests: 3/3 passed
# ✅ Product Tests: 4/4 passed
# ✅ Cart Tests: 3/3 passed
# ✅ Order Tests: 2/2 passed
# ✅ Admin Tests: 2/2 passed
# Summary: 14/14 tests PASSED (100%)
```

### Manual Test Checklist

Create a test report document:

```markdown
# QA Test Report - Ceylon Mango
Date: YYYY-MM-DD
Tester: [Name]

## Test Environment
- OS: Windows 11
- Browser: Chrome 120
- Node: v18.x
- Java: 21
- PostgreSQL: 14
- Backend Port: 8080
- Frontend Port: 5173

## Test Results

### Backend API Testing
- [x] Backend starts successfully
- [x] Database initializes correctly
- [x] Data seeding completes
- [x] API responds to requests

### Frontend Testing
- [x] Frontend starts on port 5173
- [x] All pages load correctly
- [x] Navigation works
- [x] No console errors

### Integration Testing
- [x] Frontend connects to backend
- [x] Authentication flow works
- [x] Data displays correctly
- [x] Operations (CRUD) work

### Overall Status: ✅ PASS

## Issues Found
[Any issues encountered]

## Recommendations
[Any improvements or fixes]
```

---

## 🔍 Troubleshooting

### Issue: Backend won't start

**Check 1: PostgreSQL not running**
```powershell
# Verify PostgreSQL is running
Get-Service postgresql*

# Expected: Running
```

**Check 2: Port 8080 already in use**
```powershell
# Find what's using port 8080
netstat -ano | findstr :8080

# Kill the process
taskkill /PID [PID] /F
```

**Check 3: Database connection fails**
```
Error: psql: error: could not connect to server

Solution:
1. Check PostgreSQL is running
2. Verify password is 2001 in application.properties
3. Ensure ceylon_mango database exists
4. Check pg_hba.conf for trust authentication
```

---

### Issue: Frontend won't start

**Check 1: Node modules not installed**
```bash
npm install
npm run dev
```

**Check 2: Port 5173 already in use**
```powershell
# Find and kill process on 5173
netstat -ano | findstr :5173
taskkill /PID [PID] /F
```

**Check 3: Vite build error**
```bash
# Clear cache and reinstall
rm -r node_modules package-lock.json
npm install
npm run dev
```

---

### Issue: API requests fail with CORS error

**Solution: Backend must allow frontend origin**

Verify `CorsConfig.java`:
```java
// Should include http://localhost:5173
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
```

---

### Issue: Tests pass but features don't work

**Debug steps**:
1. Check browser console for JavaScript errors
2. Check backend logs for API errors
3. Verify database has data (pgAdmin4)
4. Check network tab in developer tools
5. Verify JWT token is present in requests

---

### Issue: JWT token issues

**Check token is being stored**:
```javascript
// Browser console
localStorage.getItem('authToken')
// Should return a long JWT string
```

**Check token is being sent**:
```javascript
// Browser DevTools → Network tab
// Open any API request → Headers
// Look for: Authorization: Bearer eyJ0...
```

---

## 📞 Getting Help

### Test Results Interpretation

| Status | Meaning | Action |
|--------|---------|--------|
| ✅ PASS | Test succeeded | No action needed |
| ⚠️ WARN | Warning, may need attention | Review and assess |
| ❌ FAIL | Test failed | Fix issue before proceeding |

### Key Log Files

- **Backend logs**: Console output when running `mvn spring-boot:run`
- **Database logs**: Check PostgreSQL service logs
- **Frontend logs**: Browser DevTools Console tab
- **Network requests**: Browser DevTools Network tab

---

## 🎯 Testing Completion Checklist

- [ ] Run `.\run-full-test.ps1` - All items pass
- [ ] Backend starts successfully
- [ ] Frontend starts successfully
- [ ] Can login as customer
- [ ] Can login as admin
- [ ] Can browse products
- [ ] Can add to cart
- [ ] Can place order
- [ ] Can view order history
- [ ] Admin dashboard works
- [ ] No console errors
- [ ] No API errors
- [ ] Database operations work
- [ ] Logout works
- [ ] CORS properly configured

---

## 📝 Test Summary Template

Use this template to document your test run:

```
TEST RUN: Ceylon Mango Full-Stack Application
Date: [DATE]
Tester: [NAME]
Environment: [WINDOWS/MAC/LINUX]

BACKEND API TESTS: [PASSED/FAILED] ([X]/[Y] tests)
FRONTEND UI TESTS: [PASSED/FAILED] ([X]/[Y] tests)
INTEGRATION TESTS: [PASSED/FAILED] ([X]/[Y] tests)

OVERALL STATUS: ✅ PRODUCTION READY / ⚠️ NEEDS FIXES

Issues Found:
1. [Issue description]
2. [Issue description]

Recommendations:
1. [Recommendation]
2. [Recommendation]

Sign-off: [Approved by QA Engineer]
```

---

## 🚀 Next Steps After Testing

When all tests pass:

1. ✅ Commit test results to git
2. ✅ Update documentation with findings
3. ✅ Deploy to staging environment
4. ✅ Perform user acceptance testing (UAT)
5. ✅ Deploy to production

---

## 📚 Additional Resources

- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Project setup instructions
- [CONFIGURATION_SUMMARY.md](CONFIGURATION_SUMMARY.md) - Technical configuration details
- [QA_TEST_PLAN.md](QA_TEST_PLAN.md) - Detailed test specifications
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Quick lookup guide

---

**Happy Testing! 🚀**

For issues or questions, refer to the troubleshooting section above or check the project documentation.
