/* ============================================================
   Portfolio — data
   Edit this file to update projects, skills, and interests.
   ============================================================ */

const SITE = {
  name: "Chris Bern J. Engada",
  shortName: "Chris",
  tagline: "Game Dev \u00b7 Web Dev \u00b7 Data",
  role: "Electronics Engineering Student \u00b7 Developer \u00b7 Founder",
  location: "Dasmari\u00f1as, Cavite, Philippines",
  phone: "+63 976 141 9110",
  email: "chrisengada2006@gmail.com",
  github: "https://github.com/Christocker",
  linkedin: "https://www.linkedin.com/in/chris-bern-engada-76270a304/",
  facebook: "https://www.facebook.com/chrisengada06",
};

const PROJECTS = [
  {
    id: "help-is-on-the-way",
    title: "Help Is on the Way",
    subtitle: "Free Mental Healthcare Access Platform",
    year: 2026,
    category: "Completed Builds",
    language: "TypeScript",
    tool: "Next.js / Supabase",
    desc: "A platform that connects people with professional mental health services for free, coordinating with partner providers so users don\u2019t have to pay.",
    key: "Built the full mental-healthcare platform as the developer: secure account creation with email-confirmation verification, login, a user database with Row Level Security, an appointment booking workflow, and an admin dashboard to manage appointments, clients, categories, and availability. Deployed to Vercel with auth, protected routes, and role-based access.",
    highlights: [
      "Account creation, login, and email-confirmation verification",
      "Supabase (PostgreSQL) with Row Level Security and role-based access",
      "Guided 4-step appointment booking flow with no payment step",
      "Admin dashboard: appointments, clients, categories, availability",
      "Mobile-first responsive design deployed on Vercel",
    ],
    links: [
      { label: "Live Site", href: "https://help-is-on-the-way.vercel.app" },
      { label: "View Source", href: "https://github.com/Christocker/Help-Is-on-the-Way" },
    ],
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS", "Vercel"],
  },
  {
    id: "onebyte",
    title: "OneByte Steel Cabinets",
    subtitle: "Business Website",
    year: 2026,
    category: "Completed Builds",
    language: "TypeScript",
    tool: "React / Next.js",
    desc: "A responsive storefront for the steel-cabinet dealership \u2014 product catalog, gallery with lightbox, FAQ, how-to-order flow, and embedded store directions.",
    key: "Built the full company site for OneByte Steel Cabinets: hero, filterable product grid, gallery with lightbox, FAQ, how-to-order flow, and an embedded storefront with directions. Deployed to Vercel with SEO metadata, sitemap, and robots.",
    highlights: [
      "Next.js + Tailwind CSS, deployed on Vercel",
      "Product catalog, gallery lightbox, FAQ, and order-flow sections",
      "Google Maps embed with store directions",
      "SEO: sitemap, robots.txt, metadata, OG tags",
    ],
    links: [
      { label: "Live Site", href: "https://onebyte-steel-cabinet.vercel.app" },
      { label: "Facebook Page", href: "https://www.facebook.com/profile.php?id=61572768444647" },
      { label: "View Source", href: "https://github.com/Christocker/OneByte-Steel-Cabinet" },
    ],
    tags: ["React", "Next.js", "Tailwind CSS", "Vercel"],
  },
  {
    id: "udspot",
    title: "UDSpot",
    subtitle: "Blind Corner Vehicle Detection System",
    year: 2024,
    category: "Research",
    language: "C++ / Arduino",
    tool: "Arduino / Tinkercad",
    desc: "An Arduino-based vehicle detection prototype that warns drivers about oncoming vehicles at blind corners, improving road safety.",
    key: "Designed and developed a prototype for Elizabeth Seton School \u2014 South using ultrasonic sensors and an Arduino board. Built the circuit in Tinkercad, drafted enclosure and mounting layouts in AutoCAD, and tested detection logic to warn drivers before blind-corner turns.",
    highlights: [
      "Arduino-based ultrasonic vehicle detection",
      "Circuit design and simulation in Tinkercad",
      "AutoCAD layout for physical mounting",
      "Focused on road-safety impact at blind corners",
    ],
    links: [
      { label: "View Research Paper", href: "https://drive.google.com/file/d/18Sc4w7_er7RtVi6QERsHs5Fs82KrSzeC/view?usp=sharing" },
    ],
    tags: ["Arduino", "C++", "Ultrasonic Sensors", "AutoCAD"],
  },
  {
    id: "powerbi",
    title: "Power BI Project 1",
    subtitle: "Sales Analytics Dashboard",
    year: 2025,
    category: "Project",
    language: "DAX / Power Query",
    tool: "Power BI",
    badge: "Under Construction",
    desc: "A sales analytics dashboard in Power BI from sample sales data \u2014 KPIs, trends, and slicer-driven visuals. Still being built out.",
    note: "This entry is under construction \u2014 the report layer, final KPI visuals, and slicers are still being built.",
    key: "Connected and transformed a sample sales dataset (Excel) in Power Query, modeled it, and am building the interactive report layer. The final dashboard \u2014 KPI tiles, trend charts, and slicer-driven pages \u2014 is still under construction as I finish and polish the measures and visuals.",
    highlights: [
      "Data import and cleaning with Power Query",
      "Star-schema model ready for DAX measures",
      "KPI and trend visuals \u2014 in progress",
      "Slicers for region, date, and product filtering",
    ],
    links: [
      { label: "Open Project Folder", href: "https://github.com/Christocker" },
    ],
    tags: ["Power BI", "DAX", "Power Query", "Excel", "In Progress"],
  },
];

const SKILL_GROUPS = [
  {
    name: "Electronics Engineering",
    skills: ["Circuit Analysis", "Electronics Troubleshooting", "PCB & Schematic Design", "Solar PV Systems", "Basic Electrical Installation"],
  },
  {
    name: "Programming Languages",
    skills: ["Python", "JavaScript", "C++", "Java", "HTML/CSS", "SQL", "PostgreSQL"],
  },
  {
    name: "Frontend & Backend",
    skills: ["Next.js", "React", "Tailwind CSS", "Node.js", "TypeScript", "REST APIs", "Vercel", "Supabase"],
  },
  {
    name: "Game Development",
    skills: ["Ren\u2019Py"],
  },
  {
    name: "Engineering Software",
    skills: ["Cisco Packet Tracer", "Arduino IDE", "NI Multisim", "LTspice", "MATLAB", "EasyEDA", "AutoCAD", "VS Code"],
  },
  {
    name: "Tools",
    skills: ["Git", "GitHub", "npm", "Figma", "Power BI"],
  },
];

const EXPERIENCE = [
  {
    years: "2023 \u2013 Present",
    tag: "Founder",
    title: "Founder \u2014 OneByte (Digital Solutions & Web Services)",
    points: [
      "Founded and operated a digital solutions business focused on web development and software-related services.",
      "Design, develop, and deploy responsive websites based on client requirements.",
      "Coordinate projects from consultation and planning through deployment and post-launch support.",
    ],
  },
  {
    years: "2024 \u2013 Present",
    tag: "Co-Founder",
    title: "Co-Founder \u2014 OneByte Steel Cabinets",
    points: [
      "Sourced suppliers and coordinated product procurement to meet customer demand.",
      "Oversaw inventory, logistics, and customer relations.",
      "Developed the company website and managed digital marketing initiatives.",
    ],
  },
  {
    years: "2026",
    tag: "DLSU-D",
    title: "Student Assistant \u2014 GMD Laboratory",
    points: [
      "Managed laboratory inventory and supported daily laboratory operations.",
      "Monitored equipment, tools, and supplies to ensure availability and proper organization.",
      "Assisted faculty and staff in maintaining laboratories and materials.",
    ],
  },
  {
    years: "2025",
    tag: "OJT",
    title: "On-the-Job Trainee \u2014 Consolidated Viking Tourist Transport Inc.",
    points: [
      "Performed hands-on bus maintenance, mechanical repairs, welding, grinding, and drilling.",
      "Assisted technicians in vehicle inspection, preventive maintenance, and repair activities.",
      "Applied engineering principles and workplace safety practices in an automotive maintenance environment.",
    ],
  },
  {
    years: "2023",
    tag: "Analog Devices",
    title: "ADI Junior Aspirant Trainee",
    points: [
      "Collaborated with engineers to verify chip functionality, system configurations, and performance.",
      "Awarded the ADI Junior Aspirant Certificate of Completion and Best ADIary Presentation Certificate.",
    ],
  },
];

const EDUCATION = [
  {
    status: "Currently enrolled",
    degree: "B.S. Electronics Engineering",
    school: "De La Salle University \u2013 Dasmari\u00f1as",
    years: "2024 \u2013 Present",
    honors: [
      "DLSU-D | Second Honors Dean Lister: 1st Year, 2nd Semester | 2024-2025",
      "DLSU-D | Second Honors Dean Lister: 1st Year, 1st Semester | 2024-2025",
      "Latest GPA: 3.19",
    ],
    extra: ["IECEP Member", "NROTC Cadet"],
  },
];

const CERTIFICATIONS = [
  { issuer: "Analog Devices", name: "ADI Junior Aspirant \u2014 Certificate of Completion & Best ADIary Presentation (Dec 2023)" },
  { issuer: "Cisco (CCNA)", name: "C++ Essentials 1 & 2 \u00b7 Getting Started with Cisco Packet Tracer \u00b7 HTML Essentials (2026)" },
  { issuer: "IANsmart / Solis", name: "Solar Technical Training (2026)" },
  { issuer: "LinkedIn Learning", name: "Amplify Your Critical Thinking with Generative AI (2026)" },
  { issuer: "TESDA", name: "Installing & Configuring Computer Systems \u00b7 Diesel Engine Tune-Up \u00b7 Intro to CSS (2022)" },
];

const AWARDS = [
  { title: "Second Honors Dean\u2019s Lister", meta: "De La Salle University \u2013 Dasmari\u00f1as \u00b7 AY 2024\u20132025, both semesters" },
  { title: "Robothon Inter-Section Robotics Champion", meta: "Elizabeth Seton School \u2013 South \u00b7 2019" },
  { title: "Financial Aid Scholar", meta: "CEAT \u00b7 USG \u00b7 DOLE SPES \u00b7 DLSU-D" },
];

const INTERESTS = [
  {
    icon: "\uD83D\uDD27",
    title: "Hardware Tinkering",
    text: "I enjoy repairing and troubleshooting electronics, whether it's a phone, laptop, electric motor, or any device that can be taken apart and fixed.",
  },
  {
    icon: "\uD83D\uDCBB",
    title: "Programming",
    text: "Building applications and tools using Python, C++, JavaScript, and modern web technologies.",
  },
  {
    icon: "\uD83C\uDFAE",
    title: "Games",
    text: "I mostly play shooters and visual novels.",
  },
  {
    icon: "\u2728",
    title: "Web & UI Polish",
    text: "Making interfaces clean, consistent, and responsive.",
  },
  {
    icon: "\uD83D\uDCCA",
    title: "Data & Dashboards",
    text: "Working with data and analytics, building dashboards that present information clearly.",
  },
  {
    icon: "\uD83D\uDE97",
    title: "Automotive & Repair",
    text: "Vehicle maintenance and repair work \u2014 I like learning how automotive systems actually function.",
  },
  {
    icon: "\uD83C\uDF10",
    title: "Web Development",
    text: "Building responsive websites, experimenting with modern frameworks, and continuously improving frontend and backend development skills.",
  },
];