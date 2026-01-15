# NEDAPay

### Master Landing Page for the NEDAPay Ecosystem

> Showcasing the complete NedaPay payment apps: Web App, Farcaster Mini App, Base L2 Integration, and nTZS Stablecoin.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.7-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38bdf8)](https://tailwindcss.com/)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Ecosystem](#-ecosystem)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Setup & Installation](#-setup--installation)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)

---

## 🎯 Overview

### What is NedaPay?

NedaPay is a comprehensive digital payment ecosystem that enables seamless cross-border transactions, stablecoin payments, and instant settlements. Our infrastructure spans multiple platforms to meet users wherever they are.

**Unlock Seamless Payments Globally**  
Send and Accept Stablecoins, Swap instantly, Cash Out Easily.

### Our Mission

To provide the infrastructure for seamless cross-border value transfer, powered by the nTZS stablecoin and a network of global partners. We're building Africa's largest digital asset reserve and payment network.

---

## 🌐 Ecosystem

### One Ecosystem, Multiple Gateways

Access the NedaPay network wherever you are - whether you're a developer, a business, or a social user.

#### 1. **NedaPlus Web App** 
*Core Platform*

Comprehensive dashboard for cross-border settlements. Manage liquidity, track transactions, and handle payouts to 130+ countries.

- 🌍 Global reach across 130+ countries
- 💱 Real-time currency conversion
- 📊 Advanced analytics and reporting
- 🔐 Enterprise-grade security

**Access**: [nedapayplus.xyz](https://nedapayplus.xyz/auth/login)

#### 2. **Farcaster Mini App**
*Social Payments*

Seamless social payments directly within Farcaster. Send nTZS and USDC to friends without leaving your feed.

- 💬 Native Farcaster integration
- ⚡ Instant peer-to-peer transfers
- 🎯 Zero-friction UX
- � Social graph payments

**Access**: [Farcaster Mini App](https://farcaster.xyz/miniapps/nhIkqfY9DK47/nedapay)

#### 3. **Built on Base**
*L2 Infrastructure*

Leveraging Base L2 for near-zero gas fees and instant confirmation. The perfect infrastructure for micro-payments.

- ⚡ Near-zero gas fees
- 🚀 Instant confirmations
- 🔗 Ethereum compatibility
- 📈 Scalable infrastructure

#### 4. **nTZS Stablecoin**
*Tanzania's Local Stablecoin*

The first fully compliant stablecoin for Tanzania. 1:1 backed and audited, ensuring trust and stability for digital finance.

- 🏛️ BoT Regulated
- 💰 1:1 TZS backing
- 🔒 Fully audited
- 🌍 Global liquidity

**Access**: [app.ntzs.co.tz](https://app.ntzs.co.tz/)

---

## ✨ Features

### 🎨 Modern Landing Page
- Responsive design with dark/light mode
- Video background hero section
- Animated feature cards with horizontal scroll
- Infinite scrolling partner logos
- Glassmorphism UI elements

### 🎯 Key Highlights
- **Global Liquidity**: Powered by nTZS and global partners
- **Multiple Access Points**: Web, Farcaster, Base integration
- **Regulatory Compliance**: Licensed by Bank of Tanzania
- **130+ Countries**: Instant cross-border settlements
- **All Business Tools**: Complete payment infrastructure in one place

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|----------|
| **Framework** | Next.js (App Router) | 15.5.7 |
| **UI Library** | React | 19.0.0 |
| **Language** | TypeScript | 5.0 |
| **Styling** | Tailwind CSS | 3.4.1 |
| **Components** | Radix UI | Latest |
| **Icons** | Lucide React | 0.511.0 |
| **Animations** | tailwindcss-animate | 1.0.7 |
| **Notifications** | Sonner | 1.7.0 |
| **Theme** | next-themes | 0.4.6 |
| **Utilities** | clsx, tailwind-merge | Latest |

### Key Dependencies

```json
{
  "next": "^15.5.7",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "typescript": "^5",
  "tailwindcss": "^3.4.1",
  "@radix-ui/react-*": "Latest",
  "lucide-react": "^0.511.0",
  "next-themes": "^0.4.6",
  "sonner": "^1.7.0"
}
```

---

## 🚀 Setup & Installation

### Prerequisites

- Node.js ≥22.0.0
- npm ≥10.0.0

### Quick Start

#### 1. Clone the Repository

```bash
git clone https://github.com/mxsafiri/nedapay_plus-.git
cd nedapay_plus-
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

#### 4. Build for Production

```bash
npm run build
npm start
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

---

## � Project Structure

```
nedapay_plus-/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with theme provider
│   ├── page.tsx             # Landing page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── landing/            # Landing page sections
│   │   ├── hero-section.tsx
│   │   ├── features-section.tsx
│   │   ├── partners-section.tsx
│   │   └── footer.tsx
│   ├── ui/                 # Reusable UI components (Radix UI)
│   └── theme-switcher.tsx  # Dark/light mode toggle
├── lib/                     # Utilities
│   └── utils.ts            # Utility functions (cn, etc.)
├── public/                  # Static assets
│   ├── BG.mp4              # Hero background video
│   ├── logo.svg            # NedaPay logo
│   ├── NTZ STABLE 2.png    # nTZS stablecoin image
│   └── partner logos/      # Partner and token logos
├── next.config.ts          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

### Landing Page Components

#### HeroSection
- Video background with overlay
- Main tagline and description
- CTA buttons (Email/Wallet login, Farcaster Mini App)
- Business tools highlight
- Scroll indicator

#### FeaturesSection
- Horizontal scrolling feature cards
- Four main features: Web App, Farcaster, Base, nTZS
- Animated card hover effects
- Trust badges (BoT Regulated, BaaS API, 130+ Countries)

#### PartnersSection
- nTZS stablecoin highlight
- Infinite scrolling partner logos
- Supported stablecoins showcase

#### Footer
- Ecosystem links
- Contact information
- Legal links
- Social proof

---







---

## 🔗 Quick Links

- **NedaPay webapp**: [app.nedapay.xyz](https://app.nedapay.xyz)
- **NedaPlus Dashboard**: [nedapayplus.xyz](https://nedapayplus.xyz/auth/login)
- **Farcaster Mini App**: [Launch App](https://farcaster.xyz/miniapps/nhIkqfY9DK47/nedapay)
- **nTZS Stablecoin**: [app.ntzs.co.tz](https://app.ntzs.co.tz/)
- **Regulator Portal**: [regulator.ntzs.co.tz](https://regulator.ntzs.co.tz/auth/signin)

---

**Built with ❤️ for seamless cross-border payments**

**🌟 Star this repo if you find it helpful!**
