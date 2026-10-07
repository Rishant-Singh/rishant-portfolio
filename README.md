# Rishant Kumar Singh - Modern Full-Stack Portfolio & CMS

A high-performance, responsive developer portfolio, technical blog, and dynamic content management system built with **Next.js 16**, **TypeScript**, **MongoDB Atlas**, and **Google Gemini AI**.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-8E75C2?style=for-the-badge&logo=google-gemini&logoColor=white)](https://deepmind.google/technologies/gemini/)

---

## 🌟 Key Features

- 🤖 **"Cyber" AI Assistant**: An intelligent interactive portfolio chatbot powered by the **Google Gemini API**, answering visitor questions about Rishant's skills, projects, and background in real time.
- 🛠️ **Full-Stack Admin CMS Dashboard (`/admin`)**:
  - Secure JWT-based authentication.
  - Manage projects (CRUD) with tech stack tags and live GitHub URLs.
  - Write, publish, and edit technical blog posts with rich Markdown preview.
  - Categorized skills manager with official brand logos.
  - Real-time inbox for contact form submissions.
- 🎨 **Interactive Cyber-Themed UI**:
  - 3D interactive particle background using Three.js & `@react-three/fiber`.
  - Smooth micro-interactions powered by Framer Motion.
  - Full dark-mode cyber aesthetic with glassmorphism.
- ⚡ **Optimized Performance & SEO**:
  - Next.js Turbopack-powered SSR & SSG.
  - Dynamic sitemap and structured metadata.
  - 100% responsive across mobile, tablet, and ultra-wide displays.

---

## 💻 Tech Stack

- **Core**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, CSS Glassmorphism, Framer Motion
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Database & ODM**: MongoDB Atlas, Mongoose
- **AI & ML**: Google Generative AI (Gemini Flash)
- **Auth**: JWT, bcryptjs

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/Rishant-Singh/portfolio.git
cd portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
GITHUB_USERNAME=Rishant-Singh
GITHUB_TOKEN=your_github_token
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👤 Author

**Rishant Kumar Singh**
- **Education**: Master of Computer Applications (MCA), RGPV Bhopal
- **GitHub**: [@Rishant-Singh](https://github.com/Rishant-Singh)
- **LinkedIn**: [Rishant Kumar Singh](https://www.linkedin.com/in/rishantkrsingh/)
- **X (Twitter)**: [@singhrishant123](https://x.com/singhrishant123)
- **Discord**: `thebeast8828` (ID: 516275094457417730)
- **Email**: `singhrishant440@gmail.com`

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
