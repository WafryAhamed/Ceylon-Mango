#!/usr/bin/env node

/**
 * Ceylon Mango - Automated API Testing Script
 * Test all endpoints and validate responses
 * Run: node api-test.js
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:8080/api';
let authToken = null;
let customerToken = null;
let adminToken = null;

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  test: (msg) => console.log(`${colors.cyan}🧪 ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  section: (msg) => console.log(`\n${colors.cyan}${'='.repeat(50)}${colors.reset}\n${msg}\n${colors.cyan}${'='.repeat(50)}${colors.reset}\n`)
};

// API Test Helper
const testAPI = async (method, endpoint, data = null, token = null) => {
  try {
    const config = {
      method,
      url: `${BASE_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (data) {
      config.data = data;
    }

    const response = await axios(config);
    return { status: response.status, data: response.data };
  } catch (error) {
    return {
      status: error.response?.status || 500,
      data: error.response?.data || { error: error.message }
    };
  }
};

const runTests = async () => {
  log.section('🥭 CEYLON MANGO - AUTOMATED API TEST');

  let totalTests = 0;
  let passedTests = 0;

  // ===== AUTH TESTS =====
  log.section('1️⃣  TESTING AUTHENTICATION ENDPOINTS');

  // Test login
  log.test('Testing customer login (john@example.com)');
  totalTests++;
  let response = await testAPI('POST', '/auth/login', {
    email: 'john@example.com',
    password: 'password123'
  });

  if (response.status === 200 && response.data.token) {
    log.success('Customer login successful');
    customerToken = response.data.token;
    passedTests++;
  } else {
    log.error(`Customer login failed (Status: ${response.status})`);
  }

  // Test admin login
  log.test('Testing admin login (admin@ceylonmango.lk)');
  totalTests++;
  response = await testAPI('POST', '/auth/admin/login', {
    email: 'admin@ceylonmango.lk',
    password: 'admin123'
  });

  if (response.status === 200 && response.data.token) {
    log.success('Admin login successful');
    adminToken = response.data.token;
    passedTests++;
  } else {
    log.error(`Admin login failed (Status: ${response.status})`);
  }

  // Test invalid login
  log.test('Testing invalid login');
  totalTests++;
  response = await testAPI('POST', '/auth/login', {
    email: 'invalid@test.com',
    password: 'wrongpassword'
  });

  if (response.status === 401) {
    log.success('Invalid login properly returns 401');
    passedTests++;
  } else {
    log.error(`Expected 401, got ${response.status}`);
  }

  // ===== PRODUCT TESTS =====
  log.section('2️⃣  TESTING PRODUCT ENDPOINTS');

  // Get all products
  log.test('Fetching all products');
  totalTests++;
  response = await testAPI('GET', '/products');

  if (response.status === 200 && Array.isArray(response.data)) {
    log.success(`Got ${response.data.length} products`);
    passedTests++;
  } else {
    log.error(`Failed to fetch products (Status: ${response.status})`);
  }

  // Get featured products
  log.test('Fetching featured products');
  totalTests++;
  response = await testAPI('GET', '/products/featured');

  if (response.status === 200 && Array.isArray(response.data)) {
    log.success(`Got ${response.data.length} featured products`);
    passedTests++;
  } else {
    log.error(`Failed to fetch featured products (Status: ${response.status})`);
  }

  // Get product by ID
  log.test('Fetching product by ID (1)');
  totalTests++;
  response = await testAPI('GET', '/products/1');

  if (response.status === 200 && response.data.id) {
    log.success(`Got product: ${response.data.name}`);
    passedTests++;
  } else {
    log.error(`Failed to fetch product (Status: ${response.status})`);
  }

  // Filter by category
  log.test('Filtering products by category (fresh)');
  totalTests++;
  response = await testAPI('GET', '/products?category=fresh');

  if (response.status === 200 && Array.isArray(response.data)) {
    log.success(`Got ${response.data.length} fresh products`);
    passedTests++;
  } else {
    log.error(`Failed to filter products (Status: ${response.status})`);
  }

  // ===== CART TESTS =====
  if (customerToken) {
    log.section('3️⃣  TESTING CART ENDPOINTS');

    // Get cart
    log.test('Getting cart items');
    totalTests++;
    response = await testAPI('GET', '/cart', null, customerToken);

    if (response.status === 200 && Array.isArray(response.data)) {
      log.success(`Cart has ${response.data.length} items`);
      passedTests++;
    } else {
      log.error(`Failed to get cart (Status: ${response.status})`);
    }

    // Add to cart
    log.test('Adding product to cart');
    totalTests++;
    response = await testAPI('POST', '/cart/add', {
      productId: 1,
      quantity: 2
    }, customerToken);

    if (response.status === 200) {
      log.success('Product added to cart');
      passedTests++;
    } else {
      log.error(`Failed to add to cart (Status: ${response.status})`);
    }

    // Update cart
    log.test('Updating cart quantity');
    totalTests++;
    response = await testAPI('PUT', '/cart/update', {
      productId: 1,
      quantity: 3
    }, customerToken);

    if (response.status === 200) {
      log.success('Cart updated');
      passedTests++;
    } else {
      log.error(`Failed to update cart (Status: ${response.status})`);
    }
  }

  // ===== ORDER TESTS =====
  if (customerToken) {
    log.section('4️⃣  TESTING ORDER ENDPOINTS');

    // Get user orders
    log.test('Fetching user orders');
    totalTests++;
    response = await testAPI('GET', '/orders/user', null, customerToken);

    if (response.status === 200 && Array.isArray(response.data)) {
      log.success(`User has ${response.data.length} orders`);
      passedTests++;
    } else {
      log.error(`Failed to fetch user orders (Status: ${response.status})`);
    }
  }

  // ===== ADMIN TESTS =====
  if (adminToken) {
    log.section('5️⃣  TESTING ADMIN ENDPOINTS');

    // Get all orders (admin only)
    log.test('Admin: Fetching all orders');
    totalTests++;
    response = await testAPI('GET', '/orders', null, adminToken);

    if (response.status === 200 && Array.isArray(response.data)) {
      log.success(`Admin can see ${response.data.length} total orders`);
      passedTests++;
    } else {
      log.error(`Admin failed to fetch orders (Status: ${response.status})`);
    }

    // Test unauthorized access for customer
    log.test('Customer: Attempting to fetch all orders (should be denied)');
    totalTests++;
    response = await testAPI('GET', '/orders', null, customerToken);

    if (response.status === 403) {
      log.success('Customer properly denied access (403)');
      passedTests++;
    } else {
      log.error(`Expected 403, got ${response.status}`);
    }
  }

  // ===== SUMMARY =====
  log.section('📊 TEST SUMMARY');

  const percentage = ((passedTests / totalTests) * 100).toFixed(1);
  console.log(`Total Tests: ${totalTests}`);
  console.log(`Passed: ${passedTests} ✅`);
  console.log(`Failed: ${totalTests - passedTests} ❌`);
  console.log(`Success Rate: ${percentage}%`);

  if (percentage === '100') {
    log.success('ALL TESTS PASSED! 🎉');
  } else if (percentage >= '90') {
    log.warning(`SUCCESS! (${percentage}% pass rate)`);
  } else {
    log.error(`FAILURES DETECTED (${percentage}% pass rate)`);
  }
};

// Run tests
runTests().catch(error => {
  log.error('Fatal error during testing:');
  console.error(error);
  process.exit(1);
});
