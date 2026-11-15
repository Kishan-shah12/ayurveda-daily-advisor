<div align="center">

# 🌿 AyurvedaDaily
### *Your Personalized, AI-Powered Ayurvedic Wellness Companion*

[![Angular](https://img.shields.io/badge/Angular-22-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-2.0%20Flash-8E75C2?style=for-the-badge&logo=googlegemini&logoColor=white)](https://ai.google.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Backend%20Proxy-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![RxJS](https://img.shields.io/badge/RxJS-Reactive-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)](https://rxjs.dev/)
[![CSS3](https://img.shields.io/badge/CSS3-Custom%20Theme-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](file:///Users/kishansah/Ayruveda/LICENSE)

<p align="center">
  <b>AyurvedaDaily</b> bridges ancient Vedic wisdom with modern artificial intelligence. It helps individuals discover their constitutional Dosha (Vata, Pitta, or Kapha), maintain healthy daily lifestyle rhythms (Dinacharya), explore authentic natural herbs, and access personalized, AI-tailored wellness guidance.
</p>

</div>

---

## 🌟 Key Features

| Feature | Description |
| :--- | :--- |
| 🧘 **Dosha Constitution Quiz** | Interactive assessment that calculates your predominant Dosha (Vata, Pitta, Kapha) and saves your profile locally for a personalized app experience. |
| 🤖 **Context-Aware AI Chatbot** | Powered by Google Gemini AI. Automatically injects your Dosha profile into prompts to provide personalized dietary, herbal, and lifestyle recommendations. |
| 🌿 **AI Symptom Checker** | Input acute or general ailments (e.g. headaches, digestion, stress) to receive authentic, Dosha-specific Ayurvedic home remedies and lifestyle adjustments. |
| ⏰ **Interactive Dinacharya (Daily Routine)** | Step-by-step Ayurvedic daily routine tracker with local browser notifications to remind you of optimal times for meditation, meals, and self-care. |
| 📚 **Smart Herb & Remedy Catalog** | Curated database of Ayurvedic herbs and formulations that dynamically sorts itself to prioritize items best suited for your constitutional balance. |
| 💬 **Community Feedback System** | Built-in feedback module enabling users to share their wellness journeys and app experiences. |

---

## 🛠️ Technology Stack & Role Details

| Technology | Category | Role & Purpose in Project |
| :--- | :--- | :--- |
| ![Angular](https://img.shields.io/badge/Angular-DD0031?style=flat-square&logo=angular&logoColor=white) **Angular 22** | Frontend Framework | Drives the entire single-page application using modern Standalone Components, built-in Control Flow syntax (`@if`, `@for`), and fast client-side routing. |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) **TypeScript** | Core Language | Provides static typing, strong contracts, interfaces, and compile-time safety across all components, models, and services. |
| ![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75C2?style=flat-square&logo=googlegemini&logoColor=white) **Google Gemini AI** | Large Language Model | Powers both the conversational Ayurveda advisor and symptom diagnosis engine with contextual understanding of ancient Ayurvedic principles. |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) **Node.js** | Backend API Proxy | Implements a secure backend proxy server to forward requests to the Gemini API while safely hiding API credentials from client browsers. |
| ![Angular Signals](https://img.shields.io/badge/Signals-E0234E?style=flat-square&logo=angular&logoColor=white) **Angular Signals** | State Management | Delivers fine-grained, predictable reactivity for dynamic quiz calculations, Dosha profiles, and UI state without unnecessary re-renders. |
| ![RxJS](https://img.shields.io/badge/RxJS-B7178C?style=flat-square&logo=reactivex&logoColor=white) **RxJS** | Reactive Streams | Manages asynchronous data pipelines, HTTP calls, user input debouncing, and reactive streams between UI services and backend APIs. |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) **CSS3 Variables** | Styling Architecture | Pure modular CSS crafted with bespoke custom CSS properties for botanical-themed aesthetics, high responsiveness, and zero bloated external UI dependencies. |
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) **HTML5 & Web APIs** | Browser APIs | Employs `localStorage` for privacy-first, on-device user profile persistence, and the Web `Notification API` for timely daily routine reminders. |
| ![Dotenv](https://img.shields.io/badge/Dotenv-ECD53F?style=flat-square&logo=dotenv&logoColor=black) **Dotenv** | Configuration | Safely loads sensitive API keys and environment configurations for backend service operations. |
| ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black) **Prettier** | Code Quality | Enforces consistent formatting and high code cleanliness across the entire codebase. |

---

## 🏗️ Architecture & Data Flow

```mermaid
graph TD
    %% Frontend Client
    subgraph "Client Layer (Angular 22)"
        UI[User Interface / Views]
        Profile[Profile Service<br>LocalStorage Persistence]
        ChatSvc[Chat Service]
        RemedySvc[Symptom Checker Service]
        NotifSvc[Notification Service<br>Web Notification API]
    end

    %% Backend Proxy
    subgraph "Backend Proxy Layer (Node.js)"
        ApiChat[api/chat.js<br>System Prompt + Chat History]
        ApiRemedy[api/remedy.js<br>Symptom Assessment Engine]
    end

    %% External Intelligence
    Gemini[(Google Gemini AI<br>Model API)]

    %% Data Flow
    UI -->|Take Assessment| Profile
    UI -->|Routine Tracking| NotifSvc
    UI -->|Ask Consultation| ChatSvc
    UI -->|Check Symptoms| RemedySvc

    Profile -.->|Injects User Dosha| ChatSvc
    Profile -.->|Injects User Dosha| RemedySvc

    ChatSvc -->|POST /api/chat| ApiChat
    RemedySvc -->|POST /api/remedy| ApiRemedy

    ApiChat -->|Secure API Key Call| Gemini
    ApiRemedy -->|Secure API Key Call| Gemini

    Gemini -->|Ayurvedic Insights (Markdown)| ApiChat
    Gemini -->|Ayurvedic Insights (Markdown)| ApiRemedy
```

---

## 📂 Project Structure

```text
AyurvedaDaily/
├── api/                        # Backend API handlers
│   ├── chat.js                 # Gemini chat completion proxy
│   └── remedy.js               # Gemini symptom analysis proxy
├── api-dev-server.js           # Local Node.js API development server
├── src/
│   ├── app/
│   │   ├── components/         # Reusable UI widgets
│   │   │   ├── ai-chat/        # Interactive AI chatbot component
│   │   │   ├── feedback/       # Experience feedback submission
│   │   │   ├── footer/         # App footer
│   │   │   └── navbar/         # Navigation header
│   │   ├── pages/              # Application route views
│   │   │   ├── daily-routine/  # Dinacharya routine tracker
│   │   │   ├── dosha-quiz/     # Constitutional quiz
│   │   │   ├── herbs/          # Ayurvedic herb repository
│   │   │   ├── home/           # Landing page
│   │   │   ├── remedies/       # Home remedy guides
│   │   │   └── symptom-checker/# AI symptom checker page
│   │   ├── services/           # Angular singleton services
│   │   │   ├── chat.service.ts
│   │   │   ├── notification.service.ts
│   │   │   └── profile.service.ts
│   │   ├── app.routes.ts       # Application route definitions
│   │   └── app.ts              # Root standalone component
│   ├── index.html              # HTML document root
│   └── styles.css              # Global styles & Ayurvedic color tokens
├── package.json                # Project dependencies and run scripts
├── LICENSE                     # MIT License specification
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

Follow these steps to run the application locally on your machine:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ayurveda-daily.git
cd ayurveda-daily
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the project root directory and add your Google Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
*(Get your API key for free from the [Google AI Studio](https://aistudio.google.com/)).*

### 4. Start the Application
Run both the Angular development server and the Node.js API server concurrently:
```bash
npm run dev:api
```

- **Frontend Application:** `http://localhost:4200`
- **Backend API Proxy:** `http://localhost:3001` (proxied automatically via Angular proxy)

---

## 🔒 Security & Privacy

- **API Key Protection:** The client bundle never exposes your Google Gemini API key. All AI queries pass through a dedicated Node.js backend proxy.
- **Privacy-First Storage:** User Dosha profiles and quiz answers are stored strictly in client-side `localStorage`, ensuring personal health information stays on your device.

---

## 📄 License & Copyright

This project is licensed under the **MIT License** - see the [LICENSE](file:///Users/kishansah/Ayruveda/LICENSE) file for complete details.

```text
Copyright (c) 2026 Kishan Sah. All rights reserved.
```
