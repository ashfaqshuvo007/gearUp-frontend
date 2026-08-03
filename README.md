# GearUp Frontend 🏋️

**"Rent Sports & Outdoor Gear Instantly"**

---

## Project Overview

GearUp is a modern, responsive **Next.js application** for a sports and outdoor equipment rental service. Customers can browse available gear, select rental dates, and complete secure payments. Providers manage their gear inventory and fulfill rental orders through an intuitive dashboard. Admins oversee the entire platform through a comprehensive moderation interface.

---

## Roles & Permissions

| Role         | Description                | Frontend UI Expectations                                                                                                         |
| ------------ | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Customer** | Users who rent sports gear | Public browsing, interactive date-pickers for rentals, checkout/payment flow, order tracking dashboard, review submission.       |
| **Provider** | Gear vendors/rental shops  | Protected provider dashboard, gear CRUD forms (with image upload UI), order management tables with status-update actions.        |
| **Admin**    | Platform moderators        | Protected admin dashboard, user management tables (suspend/activate actions), global platform statistics, content moderation UI. |

---

## Features & UI/UX Requirements

### Public Features

- **Responsive Gear Grid**: Display equipment with optimized images (`next/image`), price per day, category, and availability status.
- **Advanced Search & Filter**: Sidebar or top-bar filters for category, price range, brand, and availability dates with real-time UI updates.
- **Gear Details Page**: Comprehensive view with image gallery, specifications, provider info, and an interactive "Rent Now" section (with date pickers).
- **Loading & Error States**: Skeleton loaders for data fetching and graceful `error.tsx` fallbacks.

### Customer Features

- **Auth Flows**: Registration and login forms with Zod validation and inline error messages.
- **Rental Order Flow**: Interactive checkout UI to select rental dates and confirm items.
- **Payment Integration**: Seamless redirect to **Stripe Checkout** or **SSLCommerz** gateway. Dedicated `/payment/success` and `/payment/cancel` pages with clear UI feedback.
- **Customer Dashboard**: View rental order history (with status badges), payment history table, and a form to leave reviews after the gear is returned.

### Provider Features

- **Provider Dashboard**: Overview of total gear listed, active rentals, and pending orders.
- **Inventory Management**: Forms to add, edit, and remove gear. Include UI for image URL uploads, pricing, and stock/availability toggles.
- **Order Management**: A dedicated table to view incoming orders with action buttons to update status (e.g., "Confirm", "Mark Picked Up", "Mark Returned").

### Admin Features

- **Admin Dashboard**: Global overview of platform health (total users, active gear, total rentals).
- **User Management**: Data table of all users with search, pagination, and "Suspend/Activate" action buttons.
- **Content Moderation**: Views to inspect all gear listings and rental orders across the platform.

---

## Frontend Routes & API Integration

| Next.js Route                          | Component/Feature                  | Backend API Consumption                                      |
| -------------------------------------- | ---------------------------------- | ------------------------------------------------------------ |
| `/`                                    | Home page with featured gear       | `GET /api/gear`                                              |
| `/gear`                                | Browse & filter gear               | `GET /api/gear`, `GET /api/categories`                       |
| `/gear/[id]`                           | Gear details & rent CTA            | `GET /api/gear/:id`                                          |
| `/auth/register`                       | Role selection & registration form | `POST /api/auth/register`                                    |
| `/auth/login`                          | Login form                         | `POST /api/auth/login`                                       |
| `/dashboard/customer`                  | Customer overview & order history  | `GET /api/rentals`, `GET /api/payments`                      |
| `/dashboard/customer/orders/[id]/pay`  | Payment initiation page            | `POST /api/payments/create`                                  |
| `/payment/success` & `/payment/cancel` | Payment outcome pages              | (Updates UI based on URL params/session)                     |
| `/dashboard/provider`                  | Provider overview & inventory list | `GET /api/provider/gear`                                     |
| `/dashboard/provider/gear/new`         | Add gear form                      | `POST /api/provider/gear`                                    |
| `/dashboard/provider/orders`           | Manage incoming orders             | `GET /api/provider/orders`, `PATCH /api/provider/orders/:id` |
| `/dashboard/admin`                     | Admin overview & user management   | `GET /api/admin/users`, `PATCH /api/admin/users/:id`         |

---

## Flow Diagrams & UI Considerations

### 🏋️ Customer Journey

```text
[Register/Login] → [Browse Gear] → [View Details]
       ↓
[Select Dates & "Rent Now"] → [Checkout UI]
       ↓
[Stripe/SSLCommerz Redirect] → [Payment Success Page]
       ↓
[Track Order Status] → [Mark as Returned] → [Leave Review Form]
```

### 🏪 Provider Journey

```text
[Register/Login] → [Dashboard Overview] → [Add Gear Form]
       ↓
[View Incoming Orders Table] → [Click "Confirm" / "Mark Picked Up"]
       ↓
[Toast Notification: "Order Updated"] → [Customer can now pick up]
```

### 📊 Rental Order Status (UI Badges)

- `PLACED` → Yellow/Orange Badge (Provider sees "Confirm" button)
- `CONFIRMED` → Blue Badge (Customer sees "Pay Now" button)
- `PAID` → Purple Badge (Provider sees "Mark Picked Up" button)
- `PICKED_UP` → Green Badge (Customer has the gear)
- `RETURNED` → Gray Badge (Customer sees "Leave Review" button)
- `CANCELLED` → Red Badge

## Running the app

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
