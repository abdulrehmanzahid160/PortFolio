export interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  category: string[];
  github?: string;
  demo?: string;
  badge?: string;
  label?: string;
  gradient: string;
  isHero?: boolean;
}

export const projects: Project[] = [
  {
    id: "awam-connect",
    name: "Awam Connect KP",
    description:
      "A civic Android app connecting citizens of KP with their local government. Features member registration, complaint submission, democratic city head voting, and full admin control — built in 2.5 hours at a competition.",
    tags: ["Android", "Firebase"],
    category: ["Android"],
    github: "https://github.com/abdulrehmanzahid160",
    badge: "Award Winner",
    gradient: "linear-gradient(135deg, #d4a843 0%, #8B6914 100%)",
    isHero: true,
  },
  {
    id: "amaan-safety",
    name: "Amaan Safety App",
    description:
      "A women safety app for Pakistan with voice-activated emergency alerts, shake detection, automated SMS and Email dispatch with real-time location, and quick-dial access to emergency services.",
    tags: ["Flutter", "Dart", "Java"],
    category: ["Flutter"],
    github: "https://github.com/waqaramd55/Amaan-Safety-App",
    gradient: "linear-gradient(135deg, #2D5016 0%, #1a3a0a 100%)",
  },
  {
    id: "healix-ai",
    name: "Healix AI Medical Assistant",
    description:
      "A REST API backend with JWT authentication, medication tracking, BMI/BMR health metrics, and AI-driven chat. Built with FastAPI and PostgreSQL.",
    tags: ["Python", "FastAPI", "AI"],
    category: ["AI", "Backend"],
    demo: "https://drive.google.com/file/d/1TFzMgd2kDyA9Ni4c4p5sZeLXlH3kqZNm/view",
    gradient: "linear-gradient(135deg, #1a2744 0%, #0d1520 100%)",
  },
  {
    id: "teerop-foodos",
    name: "Teerop FoodOS",
    description:
      "A Pakistan-focused restaurant logistics platform concept. Flat PKR 10,000/month subscription model replacing per-order commissions. Features AI dispatch, chatbot ordering, live tracking, and demand forecasting.",
    tags: ["Concept", "System Design", "AI"],
    category: ["AI"],
    label: "Concept Project",
    gradient: "linear-gradient(135deg, #3a1a1a 0%, #1a0d0d 100%)",
  },
];

export const categories = ["All", "Android", "Flutter", "AI", "Backend"];
