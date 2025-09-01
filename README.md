# 🚀 TaskFlow - AI-Powered Task Management Platform

Welcome to **TaskFlow**, your intelligent companion for transforming ideas into actionable project plans. This cutting-edge full-stack application leverages AI to break down complex projects into manageable tasks with smart prioritization, timeline estimation, and dependency mapping. Whether you're a project manager, developer, or entrepreneur, TaskFlow streamlines your workflow and boosts productivity through intelligent task generation and comprehensive project management.

## ✨ Features

👉 **AI-Powered Task Generation:** Advanced AI using Groq's Llama models to analyze project descriptions and generate comprehensive task breakdowns with intelligent prioritization and realistic time estimates.

👉 **Intelligent Project Planning:** Complete project lifecycle management with timeline estimation, milestone tracking, and dependency mapping for optimal workflow organization.

👉 **Smart Authentication System:** Secure multi-provider authentication with Better Auth, supporting GitHub, Google, and magic link authentication for seamless user experience.

👉 **Interactive Task Management:** Real-time task completion tracking, progress visualization, and dynamic project status updates with persistent storage.

👉 **Export & Integration:** Comprehensive export options including CSV downloads and automated Google Calendar integration with intelligent scheduling based on work hours.

👉 **Responsive Dashboard:** Modern, mobile-first design with intuitive project overview, task cards with priority indicators, and progress tracking visualizations.

👉 **Database Persistence:** Secure project and task storage with MongoDB integration, allowing users to save, retrieve, and iterate on their projects.

👉 **Advanced Task Features:** Task categorization, tagging system, dependency tracking, and customizable priority levels (low, medium, high, urgent).

## 🛠️ Technologies Used

- **Frontend:** [Next.js 15](https://nextjs.org/) with App Router, [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [TailwindCSS 4](https://tailwindcss.com/) with custom animations and responsive design
- **Backend:** Next.js Server Actions and API Routes with streaming responses
- **Database:** [MongoDB](https://www.mongodb.com/) with [Prisma ORM](https://www.prisma.io/) for type-safe database operations
- **Authentication:** [Better Auth](https://better-auth.com/) with GitHub, Google, and magic link support
- **AI Integration:** [Groq](https://groq.com/) with Llama models for intelligent task generation via AI SDK
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) with Radix UI primitives
- **Email Service:** [Nodemailer](https://nodemailer.com/) for magic link authentication

## 📋 Prerequisites

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en) (v18 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [MongoDB](https://www.mongodb.com/) database (local or cloud)

## 🚀 Installation

1. Clone the repository:

```bash
git clone https://github.com/aminejguirim10/task-flow.git
```

2. Navigate to the project directory:

```bash
cd task-flow
```

3. Install the dependencies:

```bash
npm install
```

4. Configure environment variables:

Create a new file named `.env` in the root of your project and add the following content:

```bash
# Groq AI Configuration
GROQ_API_KEY="your_groq_api_key"

# MongoDB Database Configuration
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/task-flow?retryWrites=true&w=majority&appName=Cluster0"

# Better Auth Configuration
BETTER_AUTH_SECRET="your_better_auth_secret_key"
BETTER_AUTH_URL="http://localhost:3000"

# GitHub OAuth
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

# Google OAuth
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Email Configuration (for magic links)
NODE_MAILER_AUTHOR_MAIL="your_email@gmail.com"
NODE_MAILER_SECRET="your_gmail_app_password"
```

5. Set up the database:

```bash
npx prisma generate
npx prisma db push
```

6. Start the development server:

```bash
npm run dev
```

7. Open your browser and visit:

```bash
http://localhost:3000
```

## 🤖 AI Capabilities

TaskFlow's AI engine provides:

- **Context-Aware Analysis:** Understanding project scope, requirements, and constraints
- **Intelligent Task Generation:** Creating specific, actionable tasks with clear deliverables
- **Smart Prioritization:** Automatic priority assignment based on dependencies and importance
- **Realistic Scheduling:** Time estimation based on task complexity and historical data

## 📁 Project Structure

```
task-flow/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   ├── (marketing)/              # Main application pages
│   ├── api/                      # API routes and endpoints
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── app/                      # Application-specific components
│   ├── form/                     # Form components
│   ├── layout/                   # Layout components
│   ├── shared/                   # Shared utility components
│   └── ui/                       # shadcn/ui components
├── lib/                          # Utility functions and configurations
├── prisma/                       # Database schema and migrations
├── actions/                      # Server actions
├── constants/                    # Application constants
└── types/                        # TypeScript type definitions
```

## 🔐 Authentication

TaskFlow supports multiple authentication methods:

- **Magic Link:** Passwordless authentication via email
- **GitHub OAuth:** Sign in with GitHub account
- **Google OAuth:** Sign in with Google account
- **Secure Sessions:** JWT-based session management with Better Auth

## 🚶 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the code style
4. Run tests and ensure quality checks pass
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request
