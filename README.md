# 🛒 AccountsBazaar — Full-Stack Social Profile Marketplace App

AccountsBazaar is a comprehensive, full-stack social media profile marketplace platform built using the **PERN Stack** (PostgreSQL, Express, React, Node.js). The application enables users to buy and sell verified or monetized social media accounts securely, featuring real-time chat, cloud media storage, user management, and advanced listing controls.

---

## ✨ Features

### 👤 User & Subscription Experience
- **Authentication & Security:** Powered by Clerk with seamless email and Google OAuth sign-in options.
- **Subscription Billing:** Tiered membership structures (Free and Premium plans) with integrated 7-day free trials managed directly through Clerk's billing components.
- **Custom User Profile Control:** In-app account management to update credentials, profile images, or securely wipe accounts.

### 📈 Marketplace & Listings Management
- **Smart Filtering System:** Real-time side filters sorting entries by platform (YouTube, Instagram, TikTok, etc.), price metrics, follower ranges, target niches, and account initialization states (Verified or Monetized).
- **Listing Workflow:** Users can post accounts for sale with granular engagement details and descriptive write-ups, capped at 5 files for basic users and unlimited thresholds for premium members.
- **Visual Proof System:** Embedded responsive media slider components detailing audience metrics via image optimization channels.
- **Hardware Profile Validation:** Dynamic lock states alerting users on credential safety (`Submitted`, `Verified`, `Changed`, or `Not Submitted`).

### 💬 Real-Time Interactions
- **Live Communication Flow:** Private instantaneous messaging threads between account owners and potential buyers utilizing short-polling intervals.
- **Activity Status Alerts:** Dynamic unread badge triggers showing text message queues clearly.
- **Fluid UI Controls:** Auto-scroll positioning centering ongoing user messages down to individual timestamps.

### 🛡️ Admin Monitoring Dashboard
- **Revenue Operations Ledger:** Comprehensive overview calculating active entries, user counts, and total system revenue.
- **Credential Interception Pipeline:** Dedicated queue processing account authentication variables before marketplace updates.
- **Manual Balance Approvals:** Settlement tracking tracking withdrawn profiles alongside available vendor balance allocations.

---

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework:** [React JS](https://react.dev/) + [Vite](https://vite.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) & `React-Redux`
- **Navigation:** [React Router DOM](https://reactrouter.com/)
- **Icons:** [Lucid React](https://lucid.dev/)
- **UI Architecture Patterns:** Optimized template frameworks powered by [Pre-built UI](https://prebuiltui.com/)

### Backend (Server)
- **Runtime Environment:** [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **Database Engine:** [Neon DB](https://neon.tech/) (Serverless Postgres Instance)
- **ORM Mapping Layer:** [Prisma Client](https://www.prisma.io/)
- **Asynchronous Task Workers:** [Inngest](https://www.inngest.com/) (Background pipeline event sync handles color change operations and triggers)
- **User Infrastructure Management:** [Clerk Auth & Billing Services](https://clerk.com/)
- **Media Optimization Content Networks:** [ImageKit.io NodeJS SDK](https://imagekit.io/)
- **Binary Stream Parsers:** Multer engine structures parsing multi-part visual uploads

---

## ⚙️ Project Architecture & Directory Layout

```text
AccountsBazaar/
├── client/                 # Frontend App Architecture (React / Vite)
│   ├── public/             # Static Assets & Icons
│   └── src/
│       ├── app/            # Redux Store Management & Slices (Listing, Chat)
│       ├── components/     # UI Building Blocks (Hero, Cards, Sidebars, Admin Views)
│       ├── configs/        # Axios Server Base URL Routing Configurations
│       └── pages/          # Core Component Modules (Marketplace, Orders, Details)
│
├── server/                 # Backend Processing Engine (Express API REST Node)
│   ├── config/             # Connection Clients (Prisma Engines, ImageKit Services)
│   ├── controllers/        # Logical Endpoints Processing Listing Adjustments 
│   ├── inngest/            # Webhook Events Tracking Clerk User Account Operations
│   ├── middlewares/        # Security Filters Intercepting Request Payload Elements
│   ├── prisma/             # Schema Validation Blueprints Outlining DB Tables
│   └── routes/             # Grouped Route Channels Sorting Data Pipeline Entry Hooks
```

---

## 🚀 Local Installation & Configuration Setup

### Prerequisites
Ensure your device environment contains local copies of:
- **Git**
- **Node.js** (v18+ recommended)
- **npm** or **yarn** package managers

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/PiyushM12/AccountsBazaar.git
   cd AccountsBazaar
   ```

2. **Frontend Setup (`client`):**
   ```bash
   cd client
   npm install
   ```
   Create a `.env` file in the root of the `/client` directory:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_CURRENCY=$
   VITE_BASE_URL=http://localhost:3000
   ```

3. **Backend Setup (`server`):**
   ```bash
   cd ../server
   npm install
   ```
   Create a `.env` file in the root of the `/server` directory:
   ```env
   PORT=3000
   NODE_ENV=development
   DATABASE_URL=your_neon_postgres_pooling_string
   DIRECT_URL=your_neon_postgres_direct_string
   CLERK_SECRET_KEY=your_clerk_backend_secret_key
   CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   INGEST_EVENT_KEY=your_inngest_event_identification_key
   INGEST_SIGNING_KEY=your_inngest_signing_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_secret_private_key
   ```

4. **Initialize ORM Schema with Neon Database Model:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the Application:**
   * Open a terminal for the server framework:
     ```bash
     cd server
     npm run server
     ```
   * Open a separate terminal for the client layout:
     ```bash
     cd client
     npm run dev
     ```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 
Feel free to check the [issues page](https://github.com/PiyushM12/AccountsBazaar/issues) to initiate adjustments.

1. Fork the Project layout
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes safely (`git commit -m 'Add some AmazingFeature'`)
4. Push components back into the active tree (`git push origin feature/AmazingFeature`)
5. Open a formal Pull Request review block

---

## 📝 License

This system framework is open-source software distributed under the boundaries of the **MIT License**. Refer to individual asset headers for code compliance boundaries.
