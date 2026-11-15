# 🤝 Contributing to AyurvedaDaily

First off, thank you for considering contributing to **AyurvedaDaily**! Projects like this thrive because of community members like you who take the time to improve code, report bugs, enhance documentation, or share new Ayurvedic insights.

Please take a moment to review this document to understand our contribution workflow, coding standards, and intellectual property/contributor rights.

---

## 📜 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [Contributor Rights & Licensing](#-contributor-rights--licensing)
- [How Can I Contribute?](#-how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Features & Enhancements](#suggesting-features--enhancements)
  - [Submitting Pull Requests](#submitting-pull-requests)
- [Development Workflow](#-development-workflow)
  - [Branch Naming](#branch-naming-conventions)
  - [Commit Message Format](#commit-message-format)
- [Coding & Design Standards](#-coding--design-standards)
- [Security & Privacy Guidelines](#-security--privacy-guidelines)
- [Recognition](#-recognition)

---

## ⚖️ Contributor Rights & Licensing

When you contribute to AyurvedaDaily, both you and the project maintainer share clear legal protections:

1. **Licensing Under MIT**:
   - By submitting a Pull Request, issue, or patch to this repository, you agree that your contributions will be licensed under the project's [MIT License](file:///Users/kishansah/Ayruveda/LICENSE).
2. **Authorship & Copyright Retention**:
   - You retain copyright and moral authorship over the unique code and content you originally write. You are encouraged to add your name and handle to [CONTRIBUTORS.md](file:///Users/kishansah/Ayruveda/CONTRIBUTORS.md) upon your first merged PR.
3. **Grant of Rights**:
   - By contributing, you grant the project maintainer (**Kishan Sah**) and all downstream users an irrevocable, royalty-free, perpetual, non-exclusive license to use, reproduce, modify, merge, publish, distribute, sublicense, and sell copies of the software under the terms of the MIT License.
4. **Originality & Third-Party Code**:
   - You affirm that any contribution you submit is your original creation, or that you have sufficient legal rights and permissions to submit it under the MIT License. Do not submit proprietary or copyrighted third-party material without explicit, compatible licensing.
5. **Project Governance & Maintainer Rights**:
   - The primary maintainer (**Kishan Sah**) reserves the ultimate right to review, request alterations to, accept, or reject any pull request, or refactor merged code as necessary to protect the project's integrity, security, and architectural vision.

---

## 🕊️ Code of Conduct

We are committed to providing a friendly, safe, and welcoming environment for all contributors, regardless of experience level, background, gender, or identity.

- **Be Respectful**: Treat fellow contributors with kindness and constructive empathy.
- **Focus on Wellness & Scientific Rigor**: Ensure that Ayurvedic principles and natural wellness information are respectfully and accurately represented.
- **Constructive Collaboration**: Critique ideas and code constructively, never individuals.

---

## 💡 How Can I Contribute?

### Reporting Bugs
If you find a bug or unexpected behavior:
1. Search existing issues to ensure the problem hasn’t already been reported.
2. Open a new issue with a clear title and description.
3. Include reproduction steps, your environment (browser version, OS), and relevant console logs or screenshots.

### Suggesting Features & Enhancements
Feature requests are always welcome!
1. Clearly state the problem or opportunity the feature addresses.
2. Describe your proposed solution and how it benefits AyurvedaDaily users.
3. Discuss large changes or architectural shifts with the maintainers in an issue before beginning implementation.

### Submitting Pull Requests
1. Fork the repository and clone your fork locally.
2. Create a dedicated branch for your change (see conventions below).
3. Implement your changes, test them locally, and format your code.
4. Push your branch to GitHub and open a Pull Request against the `main` branch.

---

## 💻 Development Workflow

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Google Gemini API Key**: Free tier available from [Google AI Studio](https://aistudio.google.com/)

### 2. Local Setup
```bash
# Clone your fork
git clone https://github.com/Kishan-shah12/ayurveda-daily-advisor.git
cd ayurveda-daily-advisor

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env # or create .env with GEMINI_API_KEY
```

### 3. Run Development Server
```bash
# Concurrently starts the Angular frontend (port 4200) and backend API proxy (port 3001)
npm run dev:api
```

### Branch Naming Conventions
Keep your branch names descriptive and prefixed with their purpose:
- `feat/add-dosha-visualization`
- `fix/remedy-sorting-bug`
- `docs/update-contributor-guide`
- `refactor/signals-cleanup`

### Commit Message Format
We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:
- `feat: add herbal tea recommendations based on pitta dosha`
- `fix: resolve mobile navigation drawer overflow`
- `docs: improve API proxy setup instructions`
- `style: format feedback component css`
- `refactor: optimize profile service state signals`

---

## 🎨 Coding & Design Standards

- **Angular 22 Standalone**: Use Standalone Components (`imports: [...]`) and avoid legacy NgModules.
- **Reactivity**: Prefer **Angular Signals** (`signal()`, `computed()`, `effect()`) for component and service state management.
- **Styling**: Use vanilla CSS with established custom CSS properties (`var(--primary)`, `var(--bg)`, etc.). Avoid pulling in heavy external UI styling frameworks (Bootstrap, Tailwind) to maintain lightweight bundle sizes.
- **Formatting**: Run Prettier before committing:
  ```bash
  npx prettier --write .
  ```
- **Type Safety**: Strictly type all interfaces, models, and service methods. Avoid `any` where possible.

---

## 🔒 Security & Privacy Guidelines

- **Never Commit Secrets**: Never commit `.env` files, API keys, credentials, or private keys to the repository. The `.gitignore` is configured to exclude sensitive files.
- **User Health Data Privacy**: User Dosha results, quiz responses, and symptoms must remain client-side (stored in `localStorage`). Do not persist personal health information to external databases without explicit user consent.

---

## 🏅 Recognition

Every merged PR grants you the right to be recognized in our [CONTRIBUTORS.md](file:///Users/kishansah/Ayruveda/CONTRIBUTORS.md) file! Feel free to add your name, GitHub handle, and a brief note about your contribution as part of your PR.

Thank you for helping make AyurvedaDaily better for everyone! 🌿
