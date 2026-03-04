<div align="center">

<br/>

```
██╗   ██╗██╗██████╗ ███████╗██╗   ██╗███████╗███╗   ██╗██████╗  ██████╗ ██████╗ 
██║   ██║██║██╔══██╗██╔════╝██║   ██║██╔════╝████╗  ██║██╔══██╗██╔═══██╗██╔══██╗
██║   ██║██║██████╔╝█████╗  ██║   ██║█████╗  ██╔██╗ ██║██║  ██║██║   ██║██████╔╝
╚██╗ ██╔╝██║██╔══██╗██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║██║  ██║██║   ██║██╔══██╗
 ╚████╔╝ ██║██████╔╝███████╗ ╚████╔╝ ███████╗██║ ╚████║██████╔╝╚██████╔╝██║  ██║
  ╚═══╝  ╚═╝╚═════╝ ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝
```

### *Your shop, alive online.* 🧡

<br/>

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Claude AI](https://img.shields.io/badge/Claude-AI_Powered-F97316?style=for-the-badge&logo=anthropic&logoColor=white)](https://anthropic.com/)

<br/>

> **VibeVendor** is an AI-powered platform that helps local vendors and small business owners  
> launch a professional digital storefront in under **5 minutes** — no coding, no designers, no hassle.

<br/>

[🚀 Live Demo](#) · [📸 Screenshots](#-screenshots) · [🛠️ Installation](#%EF%B8%8F-getting-started) · [🤝 Contributing](#-contributing)

<br/>

---

</div>

<br/>

## ✨ What is VibeVendor?

Local vendors — market traders, home-based sellers, small shop owners — struggle to get online. They can't afford developers. They don't know how to use website builders. They just want customers to find them.

**VibeVendor solves this.** Fill a simple form. AI writes your copy, builds your page, and generates a QR code. Share the link. Done.

Built for the streets of Lagos, Accra, Nairobi, Abuja — and every local market in between. 🌍

<br/>

---

## 🎯 Features

<br/>

### 🤖 AI-Powered Storefront Generation
> Vendors fill a quick form. Claude AI writes everything else.

- **Smart Shop Bio** — AI generates a warm, professional description of your business
- **Product Copywriting** — Every product gets a persuasive, customer-facing description
- **Catchy Taglines** — Unique one-liners that capture your brand's personality
- **SEO Metadata** — Page titles and descriptions written automatically for discoverability

<br/>

### 🏪 Beautiful Generated Storefronts
> Each vendor gets a real, shareable webpage — not a template, a *brand*.

- Bold editorial design with category-specific color themes
- Animated scrolling marquee banner
- Responsive product grid (mobile-first)
- Sticky WhatsApp CTA button on mobile
- Confetti celebration on first launch 🎉

<br/>

### 📱 ScanKart — Built-in POS System
> A full point-of-sale dashboard right inside the vendor's shop page.

- **Barcode Scanner** — Scan products using device camera via `html5-qrcode`
- **Inventory Manager** — Track stock levels with low-stock alerts
- **Sales Dashboard** — Today's revenue, order count, UPI vs. cash breakdown
- **Checkout Flow** — Process orders with animated counters and live totals

<br/>

### 📲 Instant Sharing Tools
- Unique shareable URL: `/shop/[your-shop-slug]`
- Auto-generated QR code (downloadable as PNG)
- One-click WhatsApp contact button with pre-filled order messages
- Copy link with toast notification

<br/>

---

## 🖼️ Screenshots

<br/>

| Landing Page | Onboarding Form |
|:---:|:---:|
| *Hero section with features overview* | *5-minute shop setup form* |

| AI Generation Screen | Live Storefront |
|:---:|:---:|
| *Animated loading with rotating messages* | *Bold editorial storefront with product grid* |

| ScanKart Dashboard | POS Checkout |
|:---:|:---:|
| *Sales stats & low stock alerts* | *Barcode scanning & order processing* |

<br/>

---

## 🗺️ App Routes

```
/                          → Landing Page
/create                    → Onboarding Form
/generating                → AI Generation Loading Screen
/shop/:slug                → Generated Storefront (public)
/shop/:slug/pos            → ScanKart Dashboard
/shop/:slug/pos/inventory  → Inventory Manager
/shop/:slug/pos/checkout   → POS Checkout
```

<br/>

---

## 🛠️ Getting Started

### Prerequisites

Make sure you have the following installed:

```bash
node >= 18.0.0
bun >= 1.0.0      # preferred (project uses bun.lockb)
# OR
npm >= 9.0.0
```

<br/>

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/vibevendor-ai.git
cd vibevendor-ai
```

**2. Install dependencies**
```bash
bun install
# or
npm install
```

**3. Set up your Anthropic API Key**

VibeVendor uses the Claude API for AI content generation. You can add your key two ways:

*Option A — Environment Variable (recommended for local dev):*
```bash
# Create a .env file in the root directory
VITE_ANTHROPIC_API_KEY=your_api_key_here
```

*Option B — In-app settings:*  
The app includes a settings panel where you can paste your Anthropic API key directly. It's stored in `localStorage` for hackathon/demo use.

> 🔑 Get your API key at [console.anthropic.com](https://console.anthropic.com)

**4. Start the development server**
```bash
bun dev
# or
npm run dev
```

**5. Open in browser**
```
http://localhost:5173
```

<br/>

---

## 🏗️ Project Structure

```
vibevendor-ai/
├── src/
│   ├── pages/
│   │   ├── Index.tsx              # Landing page
│   │   ├── Create.tsx             # Onboarding form
│   │   ├── Generating.tsx         # AI loading screen
│   │   ├── Storefront.tsx         # Generated storefront
│   │   └── scankart/
│   │       ├── Dashboard.tsx      # POS dashboard
│   │       ├── Inventory.tsx      # Stock manager
│   │       └── Checkout.tsx       # Checkout flow
│   │
│   ├── components/
│   │   ├── landing/               # Landing page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── PhoneMockup.tsx
│   │   │
│   │   ├── storefront/            # Storefront page sections
│   │   │   ├── HeroBanner.tsx
│   │   │   ├── MarqueeBar.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ProductsGrid.tsx
│   │   │   ├── ContactBanner.tsx
│   │   │   ├── StorefrontFooter.tsx
│   │   │   ├── CreatorBar.tsx
│   │   │   └── MobileStickyWhatsApp.tsx
│   │   │
│   │   ├── scankart/              # POS components
│   │   │   ├── BarcodeScanner.tsx
│   │   │   ├── BottomNav.tsx
│   │   │   └── AnimatedCounter.tsx
│   │   │
│   │   └── ui/                    # shadcn/ui components
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   │
│   ├── App.tsx                    # Root with React Router
│   └── main.tsx
│
├── public/
├── package.json
├── tailwind.config.ts
├── vite.config.ts
└── tsconfig.json
```

<br/>

---

## 🧰 Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React 18 + TypeScript |
| **Build Tool** | Vite 5 |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Animations** | Framer Motion |
| **Routing** | React Router v6 |
| **Forms** | React Hook Form + Zod |
| **AI** | Anthropic Claude API |
| **Database** | Supabase |
| **QR Code** | qrcode.react |
| **Barcode Scanner** | html5-qrcode |
| **Confetti** | canvas-confetti |
| **Icons** | Lucide React |
| **Package Manager** | Bun |

<br/>

---

## 🤖 AI Integration

VibeVendor makes a **single Claude API call** per storefront, generating all content at once in structured JSON:

```typescript
// Example API payload sent to Claude
{
  shopName: "Mama Tee's Kitchen",
  category: "Food & Drinks",
  location: "Yaba, Lagos",
  vendorNote: "We cook fresh daily",
  products: [
    { name: "Jollof Rice", price: 1500, note: "Party-style" },
    { name: "Fried Chicken", price: 2000, note: "Crispy, spiced" }
  ]
}

// Claude responds with
{
  tagline: "Where every plate tells a story 🍛",
  shopBio: "Mama Tee's Kitchen brings the warmth of home cooking...",
  seoTitle: "Mama Tee's Kitchen | Fresh Nigerian Food in Yaba, Lagos",
  seoDescription: "...",
  products: [
    { name: "Jollof Rice", description: "Our signature smoky party jollof...", price: 1500 },
    { name: "Fried Chicken", description: "Golden, crispy, fall-off-the-bone...", price: 2000 }
  ]
}
```

<br/>

---

## 📦 Available Scripts

```bash
bun dev          # Start development server
bun build        # Build for production
bun preview      # Preview production build locally
bun lint         # Run ESLint
bun test         # Run tests (Vitest)
bun test:watch   # Run tests in watch mode
```

<br/>

---

## 🌍 Use Cases

- 🍲 **Food vendors** — Mama Tee's Kitchen, roadside chefs, home cooks
- 👗 **Fashion traders** — Boutiques, thrift sellers, fabric dealers  
- 💄 **Beauty sellers** — Skincare brands, makeup artists, hair vendors
- 🛠️ **Artisans** — Crafters, furniture makers, tailors
- 🌾 **Agri-businesses** — Farm produce sellers, market gardeners
- 📱 **Electronics** — Phone accessories, gadget resellers

<br/>

---

## 🔮 Roadmap

- [ ] Multi-language support (Pidgin, Yoruba, Swahili, Hausa)
- [ ] Custom domain mapping for storefronts
- [ ] Analytics dashboard (page views, WhatsApp clicks)
- [ ] Instagram & Facebook auto-post integration
- [ ] Payment collection via Paystack / Flutterwave
- [ ] Vendor mobile app (React Native)
- [ ] Multi-vendor marketplace discovery page
- [ ] AI-powered pricing suggestions

<br/>

---

## 🤝 Contributing

Contributions are welcome! Here's how to get involved:

```bash
# 1. Fork the repo
# 2. Create your feature branch
git checkout -b feature/amazing-feature

# 3. Commit your changes
git commit -m "feat: add amazing feature"

# 4. Push to branch
git push origin feature/amazing-feature

# 5. Open a Pull Request
```

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

<br/>

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

<br/>

---

## 🙏 Acknowledgements

- [Anthropic](https://anthropic.com) — for the Claude AI API powering all content generation
- [shadcn/ui](https://ui.shadcn.com) — for the beautiful, accessible component library
- [Lovable](https://lovable.dev) — for the AI-assisted development platform
- Every local market vendor hustling to grow their business 🧡

<br/>

---

<div align="center">

**Built with 🧡 for local vendors everywhere**

*If VibeVendor helped you, consider giving it a ⭐ on GitHub!*

<br/>

[![GitHub stars](https://img.shields.io/github/stars/yourusername/vibevendor-ai?style=social)](https://github.com/yourusername/vibevendor-ai)

</div>
