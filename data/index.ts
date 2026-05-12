export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks = [
  { icon: "FiGithub",    href: "https://github.com/dip-aaa",                          label: "GitHub" },
  { icon: "FiLinkedin",  href: "https://www.linkedin.com/in/dipa-khanal-5b66142ab/",  label: "LinkedIn" },
  { icon: "FiTwitter",   href: "https://x.com/DipaKhanal62",                          label: "Twitter" },
  { icon: "FiInstagram", href: "https://www.instagram.com/deepakhanal62",             label: "Instagram" },
  { icon: "FiFacebook",  href: "https://www.facebook.com/dipa.khanal.247416",         label: "Facebook" },
];

export const aboutCards = [
  {
    icon: "FiUser",
    title: "Who I Am",
    desc: "I'm Dipa, currently pursuing a Bachelor's degree in Computer Engineering. I'm deeply fascinated by the world of data-driven technologies—from databases and data analysis to emerging innovations in tech.",
    highlight: "Computer Engineering",
  },
  {
    icon: "FiCode",
    title: "What I Love",
    desc: "I enjoy exploring web design and development, blending creativity with logic. My curiosity drives me to discover the limitless possibilities of data and technology.",
    highlight: "web design and development",
  },
  {
    icon: "FiZap",
    title: "My Vision",
    desc: "I'm excited to keep learning, building, and turning information into impactful solutions for the future. Every project is an opportunity to create something meaningful.",
    highlight: "impactful solutions",
  },
];

export const educationTimeline = [
  {
    year: "2024 – Present",
    degree: "Bachelor's in Computer Engineering",
    school: "Khwopa College of Engineering",
    icon: "FiBookOpen",
    color: "cyan",
  },
  {
    year: "2021 – 2023",
    degree: "High School Diploma",
    school: "Global School of Science, Baneshwor",
    icon: "FiAward",
    color: "violet",
  },
  {
    year: "Before 2021",
    degree: "Secondary Education",
    school: "Valley View English School",
    icon: "FiHome",
    color: "blue",
  },
];

export const skillCategories = [
  {
    label: "Frontend",
    icon: "FiMonitor",
    skills: [
      { name: "React", level: 85 },
      { name: "Next.js", level: 75 },
      { name: "Tailwind CSS", level: 90 },
      { name: "HTML/CSS", level: 95 },
      { name: "JavaScript", level: 85 },
    ],
  },
  {
    label: "Backend",
    icon: "FiServer",
    skills: [
      { name: "Node.js", level: 70 },
      { name: "Express.js", level: 65 },
      { name: "Python", level: 75 },
      { name: "REST APIs", level: 80 },
    ],
  },
  {
    label: "Tools",
    icon: "FiTool",
    skills: [
      { name: "Git & GitHub", level: 88 },
      { name: "VS Code", level: 95 },
      { name: "Figma", level: 70 },
      { name: "Postman", level: 78 },
    ],
  },
  {
    label: "Languages",
    icon: "FiCpu",
    skills: [
      { name: "TypeScript", level: 72 },
      { name: "Python", level: 75 },
      { name: "C/C++", level: 65 },
      { name: "SQL", level: 80 },
    ],
  },
];

export const projects = [
  {
    category: "Full Stack",
    title: "Profit.exe — Expense Splitter",
    desc: "A full-stack web app for splitting expenses, managing group budgets, and tracking shared money among friends.",
    tech: ["React", "Node.js", "Supabase"],
    github: "https://github.com/Ambiton-HackFest-2082/Profit.exe",
    live: "",
    icon: "FiDollarSign",
  },
  {
    category: "AI/ML",
    title: "DPcube — AI Therapy Assistant",
    desc: "An AI-powered chatbot and therapy assistant platform designed to connect users with mental health support and guidance.",
    tech: ["React", "Node.js", "Supabase", "LLM"],
    github: "https://github.com/Sandbox-3-0/DPcube",
    live: "",
    icon: "FiHeart",
  },
  {
    category: "Mobile",
    title: "Thaili — Financial Empowerment",
    desc: "A mobile app focused on financial literacy, savings, and expense tracking for women with a simple and intuitive design.",
    tech: ["Flutter", "MySQL"],
    github: "https://github.com/dip-aaa/thaili-",
    live: "",
    icon: "FiSmartphone",
  },
  {
    category: "Full Stack",
    title: "Senior–Junior Resource Hub",
    desc: "A platform that connects seniors and juniors for resource sharing, with an integrated second-hand marketplace feature.",
    tech: ["React", "Node.js", "Express", "PostgreSQL", "TypeScript"],
    github: "https://github.com/dip-aaa/web-project",
    live: "",
    icon: "FiGlobe",
  },
  {
    category: "AI/ML",
    title: "Job Analyzer",
    desc: "A data science project that analyzes job trends and helps users find suitable career paths using interactive dashboards.",
    tech: ["Python", "Streamlit"],
    github: "https://github.com/dip-aaa/job_analyzer",
    live: "",
    icon: "FiBarChart2",
  },
  {
    category: "AI/ML",
    title: "Eye Game — Vision Controlled",
    desc: "A computer vision-based interactive game controlled using eye movements and gestures.",
    tech: ["Python", "OpenCV", "MediaPipe"],
    github: "https://github.com/dip-aaa/eye_game",
    live: "",
    icon: "FiEye",
  },
];

export const projectCategories = ["All", "Full Stack", "Mobile", "AI/ML"];

export const achievements = [
  {
    title: "Hult Prize",
    award: "Title Winner",
    year: "2025",
    location: "Khwopa College of Engineering",
    desc: "Won the on-campus Hult Prize competition at Khwopa College of Engineering in 2025. Led the team through innovation, creativity, and strong problem-solving skills to secure the title-winning position.",
    image: "/images/1.png",
  },
  {
    title: "KU Business Hack",
    award: "First Runner-Up",
    year: "2025",
    location: "Kathmandu University, Dhulikhel",
    desc: "Achieved First Runner-Up at KU Business Hack held at Kathmandu University, Dhulikhel. Competed against innovative teams and presented impactful business and technology-driven solutions.",
    image: "/images/2.png",
  },
  {
    title: "Ambition Hackfest 2025",
    award: "Title Winner",
    year: "2025",
    location: "Ambition College, Baneshwor",
    desc: "Secured the Title Winner position at Ambition Hackfest 2025 through innovative ideas, teamwork, and technical execution during the competitive hackathon event.",
    image: "/images/3.png",
  },
  {
    title: "Codefest 2025",
    award: "People's Choice Award",
    year: "2025",
    location: "Nepal",
    desc: "Received the People's Choice Award at Codefest 2025, recognized for building a solution that strongly connected with the audience and community.",
    image: "/images/4.png",
  },
  {
    title: "Khwopa College Recognition Award",
    award: "Special Recognition",
    year: "2025",
    location: "Khwopa College of Engineering",
    desc: "Received a special recognition award from Khwopa College of Engineering for representing the college and achieving success in multiple hackathons and competitive innovation events.",
    image: "/images/5.png",
  },
];

export const contactInfo = [
  {
    icon: "FiMail",
    label: "Email Me",
    value: "khanaldeepa126@gmail.com",
    sub: "I'll respond within 24 hours",
    href: "mailto:khanaldeepa126@gmail.com",
  },
  {
    icon: "FiPhone",
    label: "Call Me",
    value: "+977 9863335195",
    sub: "Mon–Fri, 9am–6pm NPT",
    href: "tel:+9779863335195",
  },
  {
    icon: "FiMapPin",
    label: "Location",
    value: "Kathmandu, Nepal",
    sub: "Open to remote work globally",
    href: "#",
  },
  {
    icon: "FiLinkedin",
    label: "LinkedIn",
    value: "Connect with me professionally",
    sub: "Quick response guaranteed",
    href: "https://linkedin.com/",
  },
];
