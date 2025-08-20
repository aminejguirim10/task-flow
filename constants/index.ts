import {
  Brain,
  Database,
  Folder,
  Home,
  ListTodo,
  MessageSquare,
  Share2,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

export const nav = [
  { href: "/", label: "Home", icon: Home },
  { href: "/chat", label: "Chat", icon: MessageSquare },
  { href: "/projects", label: "Projects", icon: Folder },
]

export const features = [
  {
    title: "AI task generation",
    description:
      "Turn any idea into a structured project with prioritized tasks,estimates, and categories.",
    icon: Sparkles,
  },
  {
    title: "Project overview",
    description:
      "Track total and completed tasks with progress and milestones at aglance.",
    icon: ListTodo,
  },
  {
    title: "Export & integrations",
    description:
      " Export your plan or save it to your account for seamless collaboration.",
    icon: Share2,
  },
  {
    title: "Save to database",
    description:
      "Persist projects and tasks securely to revisit and iterate anytime.",
    icon: Database,
  },
  {
    title: "Magic link & social login",
    description:
      "Sign in with email or your favorite provider to get started instantly.",
    icon: ShieldCheck,
  },
  {
    title: "Smart updates",
    description:
      "Iterate quickly—regenerate and refine tasks as your project evolves.",
    icon: Brain,
  },
]

export const howItWorks = [
  {
    number: "1",
    title: "Describe",
    description:
      "Tell the AI about your project goals, requirements, and constraints in natural language.",
  },
  {
    number: "2",
    title: "Review",
    description:
      "Get a complete plan with timelines, priorities, and milestones tailored to your needs.",
  },
  {
    number: "3",
    title: "Execute",
    description:
      "Save, export, and start tracking progress across all tasks with your team.",
  },
]

export const faqs = [
  {
    question: "How accurate is the AI task generation?",
    response:
      "The AI task generation is highly accurate, leveraging advanced algorithms and extensive training data to deliver precise and relevant task breakdowns.",
  },
  {
    question: "What is the expected timeline for project completion?",
    response:
      "The timeline for project completion depends on various factors, including the complexity of the project and the resources available. Our AI can help estimate timelines based on similar past projects.",
  },

  {
    question: "What if I need help with my project?",
    response:
      "Our support team is here to help! You can reach out via chat or email for assistance with your project.",
  },
  {
    question: "Is my data safe?",
    response:
      "Yes, we take data security seriously. All data is encrypted and stored securely.",
  },

  {
    question: "How do I get started with a new project?",
    response:
      "To start a new project, simply navigate to the Chat section and click on 'Generate'. Follow the prompts to set up your project details.",
  },
  {
    question: "What are the benefits of using AI for task management?",
    response:
      "Using AI for task management streamlines the process, reduces manual effort, and enhances accuracy in task breakdown and timeline estimation.",
  },
]
