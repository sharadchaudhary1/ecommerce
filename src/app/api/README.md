
# API Directory Documentation

## Overview

The `src/app/api` directory contains all backend API routes following Next.js 15 Route Handlers pattern. These endpoints handle authentication, data mutations, and business logic.

---

## Directory Structure

```
src/app/api/
├── auth/
│   └── [...nextauth]/
│       └── route.ts          # NextAuth handler
├── cart/
│   ├── delete/
│   │   └── route.ts          # Remove item from cart
│   ├── merge/
│   │   └── route.ts          # Merge guest cart to DB
│   ├── savelater/
│   │   └── route.ts          # Move item to save-for-later
│   ├── update/
│   │   └── route.ts          # Update cart item quantity
│   └── route.ts              # Get/Add cart items
├── savelater/
│   ├── merge/
│   │   └── route.ts          # Merge guest saves to DB
│   ├── movetocart/
│   │   └── route.ts          # Move save back to cart
│   └── route.ts              # Get/Add saved items
├── products/
│   ├── [id]/
│   │   └── route.ts          # Get single product
│   └── route.ts              # Get all/Create product
├── edit-product/
│   └── [id]/
│       └── route.ts          # Get/Update product
├── search/
│   └── route.ts              # Search products
├── selectproducts/
│   └── route.ts              # Filter by category
├── similarproducts/
│   └── route.ts              # Get similar products
├── addcompany/
│   └── route.ts              # Register company
├── allsalesproduct/
│   └── route.ts              # Get company products
├── signup/
│   └── route.ts              # User registration
├── login/
│   └── route.ts              # User authentication
└── logout/
    └── route.ts              # Clear session
```

---

## Authentication Endpoints

### 1. NextAuth Handler (`auth/[...nextauth]/route.ts`)

**Route**: `/api/auth/*`

**Purpose**: Handles all NextAuth.js authentication flows

```typescript
import { handlers } from "../../../../../auth";

export const { GET, POST } = handlers;
```

**Functionality**:
- Google OAuth callback handling
- Session management
- CSRF protection
- Authentication state

**Related Routes**:
- `/api/auth/signin`
- `/api/auth/signout`
- `/api/auth/callback/google`
- `/api/auth/session`

---

### 2. User Signup (`signup/route.ts`)

**Route**: `POST /api/signup`

**Purpose**: Register new user accounts

**Request Body**:
```typescript
{
  email: string;
  username: string;
  password: string;
  usecase: "personal" | "business";
  provider: "google" | "credentials";
}
```

**Logic Flow**:

1. **Google OAuth Users**:
```typescript
if (user.provider == "google") {
  const saveduser = await prismaClient.user.create({
    data: user
  });
  return NextResponse.json({ success: true });
}
```

2. **Credentials Users**:
```typescript
const saveduser = await prismaClient.user.create({
  data: user
});

const token = generateToken({ email: user?.email });

const res = NextResponse.json({ success: true });
res.cookies.set("user", token);
return res;
```

**Database Operation**:
- Creates user record in database
- Sets provider field for tracking auth method

**Response**:
```typescript
// Success
{ success: true }

// Error
{ 
  success: false, 
  message: "error details"
}
```

---

### 3. User Login (`login/route.ts`)

**Route**: `POST /api/login`

**Purpose**: Authenticate existing users

**Request Body**:
```typescript
{
  usercred: string;  // email or username
  password: string;
}
```

**Logic**:

```typescript
// Find user by email OR username
const user = await prismaClient.user.findFirst({
  where: {
    OR: [
      { email: usercred },
      { username: usercred }
    ]
  }
});

// Verify password
if (user?.password == password) {
  const token = generateToken({ email: user?.email });
  

}
```

**Cookie Configuration**:
- Name: `user`
- Value: JWT token
- HTTP-only: Implicit (Next.js default)

**Response**:
```typescript
// Success
{ 
  success: true,
  user: { ...userDataWithoutPassword }
}

// Failure
{
  success: false,
  message: "invalid credentials"
}
```

---

### 4. User Logout (`logout/route.ts`)

**Route**: `POST /api/logout`

**Purpose**: Clear user session

**Logic**:
```typescript
const cookie = cookies();
cookie.set("user", "", { maxAge: 0 });

return NextResponse.json({ success: true });
```

**Process**:
- Overwrites JWT cookie with empty string
- Sets maxAge to 0 (immediate expiration)
- Client-side: User state reset, redirect to home

---

## Cart Management Endpoints

### 1. Get/Add Cart Items (`cart/route.ts`)

#### GET `/api/cart`

**Purpose**: Retrieve authenticated user's cart

**Authentication**: Requires logged-in user

**Logic**:
```typescript
const user = await getCurrentUserFromCookies();

if (!user) {
  return NextResponse.json({
    success: false,
    message: "User not logged in",
  });
}

const cartitems = await prismaClient.cartdata.findMany({
  where: { userId: user.id },
  include: { product: true },
});

return NextResponse.json({
  success: true,
  items: cartitems,
});
```

**Response**:
```typescript
{
  success: true,
  items: [
    {
      id: string,
      userId: string,
      productId: string,
      quantity: number,
      product: {
        id: string,
        title: string,
        price: number,
        thumbnail: string,
        // ... other product fields
      }
    }
  ]
}
```

---

#### POST `/api/cart`

**Purpose**: Add item to cart (authenticated users)

**Request Body**:
```typescript
{
  userId: string;
  productId: string;
  quantity: number;
}
```

**Logic**:

```typescript
// Check if item already in cart
const existingItem = await prismaClient.cartdata.findFirst({
  where: {
    userId: userId,
    productId: productId,
  },
});

let cartProduct;

if (existingItem) {
  // Increment quantity
  cartProduct = await prismaClient.cartdata.update({
    where: { id: existingItem.id },
    data: {
      quantity: existingItem.quantity + quantity,
    },
  });
} else {
  // Create new cart item
  cartProduct = await prismaClient.cartdata.create({
    data: {
      userId,
      productId,
      quantity,
    },
  });
}

return NextResponse.json({
  success: true,
  data: cartProduct,
});
```

**Key Feature**: Automatic quantity increment for existing items

---

### 2. Update Cart Quantity (`cart/update/route.ts`)

**Route**: `PUT /api/cart/update`

**Purpose**: Modify item quantity

**Request Body**:
```typescript
{
  userId: string;
  productId: string;
  quantity: number;
}
```

**Logic**:
```typescript
const updatedItem = await prismaClient.cartdata.updateMany({
  where: {
    userId,
    productId,
  },
  data: {
    quantity,
  },
});

return NextResponse.json({
  success: true,
  data: updatedItem
});
```

**Note**: Uses `updateMany` to handle multiple matching records

---

### 3. Delete Cart Item (`cart/delete/route.ts`)

**Route**: `DELETE /api/cart/delete`

**Purpose**: Remove item from cart

**Request Body**:
```typescript
{
  id: string;  // cart item ID
}
```

**Logic**:
```typescript
const deleteproduct = await prismaClient.cartdata.delete({
  where: {
    id: body.id
  }
});

return NextResponse.json({
  success: true,
  data: deleteproduct
});
```

---

### 4. Merge Guest Cart (`cart/merge/route.ts`)

**Route**: `POST /api/cart/merge`

**Purpose**: Sync localStorage cart to database on login

**Request Body**:
```typescript
{
  items: Array<{
    id: string;
    quantity: number;
  }>
}
```

**Logic**:

```typescript
const { items } = await req.json();
const user = await getCurrentUserFromCookies();

for (let item of items) {
  // Check if product already in DB cart
  const existing = await prismaClient.cartdata.findFirst({
    where: { userId: user?.id, productId: item.id },
  });

  if (existing) {
    // Increment quantity
    await prismaClient.cartdata.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + item.quantity },
    });
  } else {
    // Create new entry
    await prismaClient.cartdata.create({
      data: {
        userId: user?.id,
        productId: item.id,
        quantity: item.quantity,
      },
    });
  }
}

return Response.json({ success: true });
```

**Use Case**: Called when user logs in with items in localStorage

---

### 5. Move to Save for Later (`cart/savelater/route.ts`)

**Route**: `POST /api/cart/savelater`

**Purpose**: Transfer item from cart to save-for-later

**Request Body**:
```typescript
{
  id: string;        // cart item ID
  userId: string;
  productId: string;
}
```

**Logic**:

```typescript
// Delete from cart
const removefromcart = await prismaClient.cartdata.delete({
  where: { id: id }
});

// Add to save-for-later
const movetosavelater = await prismaClient.save.create({
  data: {
    userId: userId,
    productId: productId,
  }
});

return NextResponse.json({ success: true });
```

**Transaction Note**: Operations are separate (not atomic)

---

## Save for Later Endpoints

### 1. Get/Add Saved Items (`savelater/route.ts`)

#### GET `/api/savelater`

**Purpose**: Retrieve user's saved items

**Logic**:
```typescript
const user = await getCurrentUserFromCookies();

if (!user) {
  return NextResponse.json({
    success: true,
    products: [],
  });
}

const savelaterproducts = await prismaClient.save.findMany({
  where: { userId: user.id },
  include: { product: true },
});

return NextResponse.json({
  success: true,
  products: savelaterproducts,
});
```

---

#### POST `/api/savelater`

**Purpose**: Add item to save-for-later

**Request Body**:
```typescript
{
  productId: string;
  userId: string;
}
```

**Logic**:

```typescript
const existingProduct = await prismaClient.save.findFirst({
  where: {
    userId: body.userId,
    productId: body.productId
  }
});

if (existingProduct) {
  return NextResponse.json({
    success: false,
    message: "product already in the savelist"
  });
}

const savedproduct = await prismaClient.save.create({
  data: savelaterproduct
});

return NextResponse.json({ success: true });
```

**Duplicate Prevention**: Checks if item already saved

---

### 2. Move to Cart (`savelater/movetocart/route.ts`)

**Route**: `POST /api/savelater/movetocart`

**Purpose**: Transfer saved item back to cart

**Request Body**:
```typescript
{
  id: string;        // save item ID
  userId: string;
  productId: string;
  quantity: number;
}
```

**Logic**:

```typescript
// Delete from save-for-later
const removefromsave = await prismaClient.save.delete({
  where: { id: id }
});

// Add to cart
const movetocart = await prismaClient.cartdata.create({
  data: {
    userId: userId,
    productId: productId,
    quantity: quantity
  }
});

return NextResponse.json({ success: true });
```

---

### 3. Merge Guest Saves (`savelater/merge/route.ts`)

**Route**: `POST /api/savelater/merge`

**Purpose**: Sync localStorage saved items to database on login

**Request Body**:
```typescript
{
  products: Array<{
    id: string;
  }>
}
```

**Logic**:

```typescript
const { products } = await req.json();
const user = await getCurrentUserFromCookies();

for (let product of products) {
  const existingproduct = await prismaClient.save.findFirst({
    where: {
      userId: user?.id,
      productId: product.id
    }
  });

  if (!existingproduct) {
    await prismaClient.save.create({
      data: {
        userId: user?.id,
        productId: product.id
      }
    });
  }
}

return NextResponse.json({ success: true });
```

**Duplicate Handling**: Only creates if not already saved

---

## Product Management Endpoints

### 1. List/Create Products (`products/route.ts`)

#### GET `/api/products`

**Purpose**: Retrieve all products

**Logic**:
```typescript
const res = await prismaClient.product.findMany();

return NextResponse.json({
  success: true,
  data: res,
});
```

**Response**: Array of all products in database

---

#### POST `/api/products`

**Purpose**: Create new product (business users)

**Request Body**:
```typescript
{
  title: string;
  description: string;
  price: number;
  images: string;     // URL
  category: string;
}
```

**Logic**:

```typescript
const user = await getCurrentUserFromCookies();

const productToSave = {
  title: body.title,
  description: body.description,
  price: body.price,
  thumbnail: body.images,
  category: body.category
};

// Check if user has company
const company = await prismaClient.company.findFirst({
  where: { ownerId: user?.id },
});

let product;

if (company) {
  // Link product to company
  product = await prismaClient.product.create({
    data: { ...productToSave, companyId: company.id },
  });
} else {
  // Create without company link
  product = await prismaClient.product.create({
    data: productToSave,
  });
}

return NextResponse.json({
  success: true,
  data: product,
});
```

**Company Linking**: Automatically associates product with user's company if exists

---

### 2. Get Single Product (`products/[id]/route.ts`)

**Route**: `GET /api/products/[id]`

**Purpose**: Fetch product details by ID

**Logic**:
```typescript
const id = params.id;

if (!id) {
  return NextResponse.json({
    success: false,
    message: "no id provided"
  });
}

const product = await prismaClient.product.findUnique({
  where: { id: id }
});

return NextResponse.json({
  success: true,
  data: product,
});
```

---

### 3. Edit Product (`edit-product/[id]/route.ts`)

#### GET `/api/edit-product/[id]`

**Purpose**: Fetch product for editing

**Logic**:
```typescript
const id = params.id;

const product = await prismaClient.product.findUnique({
  where: { id: id }
});

return NextResponse.json({
  success: true,
  product: product
});
```

---

#### POST `/api/edit-product/[id]`

**Purpose**: Update product

**Request Body**:
```typescript
{
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
}
```

**Logic**:

```typescript
const id = params.id;
const body = await req.json();

const updateproduct = {
  title: body.title,
  description: body.description,
  price: body.price,
  thumbnail: body.thumbnail,
  category: body.category
};

const updatedproduct = await prismaClient.product.update({
  where: { id: id },
  data: updateproduct
});

return NextResponse.json({
  success: true,
  product: updatedproduct
});
```

---

### 4. Search Products (`search/route.ts`)

**Route**: `GET /api/search?q=query&min=100&max=5000`

**Purpose**: Search products with filters

**Query Parameters**:
- `q`: Search query (searches in title)
- `min`: Minimum price (default: 0)
- `max`: Maximum price (default: Infinity)

**Logic**:

```typescript
const query = searchParams.get('q');
const min = searchParams.get('min') 
  ? Number(searchParams.get('min')) 
  : 0;
const max = searchParams.get('max') 
  ? Number(searchParams.get('max')) 
  : Infinity;

if (!query) {
  return NextResponse.json({
    success: false,
    data: [],
    message: "no query given"
  });
}

const data = await prismaClient.product.findMany({
  where: {
    title: {
      contains: query,
      mode: 'insensitive'
    },
    price: {
      gte: min,
      lte: max,
    }
  }
});

return NextResponse.json({
  success: true,
  data: data,
});
```

**Search Features**:
- Case-insensitive title matching
- Price range filtering
- Returns empty array if no query provided

---

### 5. Select by Category (`selectproducts/route.ts`)

**Route**: `GET /api/selectproducts?category=smartphones&min=0&max=50000`

**Purpose**: Filter products by category and price

**Query Parameters**:
- `category`: Product category
- `min`: Minimum price
- `max`: Maximum price

**Logic**:

```typescript
const category = searchparams.get('category');
const minprice = searchparams.get('min');
const maxprice = searchparams.get('max');

const max = maxprice && maxprice.trim() !== "" 
  ? Number(maxprice) 
  : Number.MAX_VALUE;

const products = await prismaClient.product.findMany({
  where: {
    category: category,
    price: {
      gte: minprice ? Number(minprice) : 0,
      lte: max
    }
  },
});

return NextResponse.json({
  success: true,
  products: products
});
```

---

### 6. Similar Products (`similarproducts/route.ts`)

**Route**: `GET /api/similarproducts?category=beauty&id=123`

**Purpose**: Get related products (same category, exclude current)

**Query Parameters**:
- `category`: Product category
- `id`: Current product ID (to exclude)

**Logic**:

```typescript
const category = searchParams.get('category');
const id = searchParams.get('id');

const similarproducts = await prismaClient.product.findMany({
  where: {
    category: category,
    NOT: {
      id: id
    },
  },
  take: 9,
});

return NextResponse.json({
  success: true,
  data: similarproducts
});
```

**Limit**: Returns maximum 9 similar products

---

## Company Management Endpoints

### 1. Register Company (`addcompany/route.ts`)

**Route**: `POST /api/addcompany`

**Purpose**: Create new company for business user

**Request Body**:
```typescript
{
  name: string;
  category: string;
  description: string;
  ownerId: string;
}
```

**Logic**:

```typescript
const companydata = await req.json();

const company = await prismaClient.company.create({
  data: companydata
});

return NextResponse.json({
  success: true,
  data: company
});
```

**Relationship**: Links company to user via `ownerId`

---

### 2. Get Company Products (`allsalesproduct/route.ts`)

**Route**: `GET /api/allsalesproduct`

**Purpose**: Retrieve all products belonging to user's company

**Authentication**: Requires logged-in business user

**Logic**:

```typescript
const user = await getCurrentUserFromCookies();

const products = await prismaClient.product.findMany({
  where: {
    companyId: user.company?.[0]?.id
  },
});

return NextResponse.json({
  success: true,
  products: products || [],
});
```

**Query Filter**: Uses first company from user's company array

---

## Key Patterns & Best Practices

### 1. Error Handling

**Pattern**:
```typescript
try {
  // Database operation
  const result = await prismaClient.model.operation();
  
  return NextResponse.json({
    success: true,
    data: result
  });
} catch (err) {
  console.log(err.message);
  
  return NextResponse.json({
    success: false,
    message: err.message // or omit for security
  });
}
```

### 2. Authentication Check

**Using Helper Function**:
```typescript
const user = await getCurrentUserFromCookies();

if (!user) {
  return NextResponse.json({
    success: false,
    message: "Unauthorized"
  });
}

// Proceed with operation
```

### 3. Request Body Parsing

```typescript
const body = await req.json();

// Extract fields
const { userId, productId, quantity } = body;
```

### 4. Query Parameters

```typescript
const searchParams = req.nextUrl.searchParams;
const query = searchParams.get('q');
const min = searchParams.get('min') || 0;
```

### 5. Response Structure

**Success**:
```typescript
{
  success: true,
  data: any,
  // OR
  items: any[],
  products: any[]
}
```

**Error**:
```typescript
{
  success: false,
  message?: string
}
```

---

## Database Operations Summary

### Common Queries

1. **Find Many**:
```typescript
await prismaClient.model.findMany({
  where: { field: value },
  include: { relation: true },
  take: 10
});
```

2. **Find Unique**:
```typescript
await prismaClient.model.findUnique({
  where: { id: id }
});
```

3. **Find First**:
```typescript
await prismaClient.model.findFirst({
  where: { field: value }
});
```

4. **Create**:
```typescript
await prismaClient.model.create({
  data: { ...fields }
});
```

5. **Update**:
```typescript
await prismaClient.model.update({
  where: { id: id },
  data: { ...updates }
});
```

6. **Update Many**:
```typescript
await prismaClient.model.updateMany({
  where: { field: value },
  data: { ...updates }
});
```

7. **Delete**:
```typescript
await prismaClient.model.delete({
  where: { id: id }
});
```

---

## Security Considerations

## Performance Optimizations

1. **Database Queries**:
   - Uses Prisma's `include` for eager loading
   - Limits results with `take` where appropriate

2. **Caching**: No caching implemented
   - **Recommendation**: Add Redis for frequently accessed data

3. **Pagination**: Not implemented on API level
   - **Recommendation**: Add cursor-based pagination

---

## Summary

The API directory provides comprehensive backend functionality:
- **Authentication**: Dual system (OAuth + JWT)
- **Cart Management**: Full CRUD with guest/auth sync
- **Product Operations**: Search, filter, CRUD
- **Company Management**: Registration and product linking
- **Data Persistence**: Prisma ORM with MongoDB

All endpoints follow RESTful conventions and return consistent JSON responses with `success` flags for error handling.