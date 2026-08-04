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
    category: "Prototypes",
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
    category: "Research",
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
    skills: ["Python", "JavaScript", "C++", "Java", "HTML/CSS"],
  },
  {
    name: "Frontend & Backend",
    skills: ["React", "Tailwind CSS", "Node.js", "TypeScript", "Vercel"],
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
    skills: ["Git", "GitHub", "Figma", "Power BI"],
  },
];

const EXPERIENCE = [
  {
    years: "2023 \u2013 Present",
    tag: "Founder",
    title: "Founder \u2014 OneByte (Digital Products)",
    text: "Founded and managed an online digital products business. Marketed and sold digital applications while managing customer inquiries and transactions, with technical support and after-sales assistance.",
  },
  {
    years: "2024 \u2013 Present",
    tag: "Co-Founder",
    title: "Co-Founder \u2014 OneByte Steel Cabinets",
    text: "Co-founded a steel-cabinet dealership: sourced suppliers and coordinated procurement, oversaw inventory, logistics, and customer relations, and developed the company website and digital marketing initiatives.",
  },
  {
    years: "2026",
    tag: "DLSU-D",
    title: "Student Assistant \u2014 GMD Laboratory",
    text: "Managed laboratory inventory and supported daily operations at De La Salle University \u2013 Dasmari\u00f1as. Monitored equipment, tools, and supplies, and assisted faculty and staff with lab maintenance.",
  },
  {
    years: "2025",
    tag: "OJT",
    title: "On-the-Job Trainee \u2014 Consolidated Viking Tourist Transport Inc.",
    text: "Hands-on bus maintenance, mechanical repairs, welding, grinding, and drilling. Assisted technicians with vehicle inspection, preventive maintenance, and repair, applying engineering principles and workplace safety practices.",
  },
  {
    years: "2023",
    tag: "Analog Devices",
    title: "ADI Junior Aspirant Trainee",
    text: "Collaborated with engineers to verify chip functionality, system configurations, and performance. Awarded the ADI Junior Aspirant Certificate of Completion and Best ADIary Presentation Certificate.",
  },
];

const EDUCATION = [
  {
    status: "Currently enrolled",
    degree: "B.S. Electronics Engineering",
    school: "De La Salle University \u2013 Dasmari\u00f1as",
    years: "2024 \u2013 Present",
    honors: [
      "First Honors Dean\u2019s Lister \u2014 1st Sem, AY 2024\u20132025",
      "First Honors Dean\u2019s Lister \u2014 2nd Sem, AY 2024\u20132025",
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
  { title: "First Honors Dean\u2019s Lister", meta: "De La Salle University \u2013 Dasmari\u00f1as \u00b7 AY 2024\u20132025, both semesters" },
  { title: "Robothon Inter-Section Robotics Champion", meta: "Elizabeth Seton School \u2013 South \u00b7 2019" },
  { title: "Financial Aid Scholar", meta: "CEAT \u00b7 USG \u00b7 DOLE SPES \u00b7 DLSU-D" },
];

const INTERESTS = [
  {
    icon: "\uD83D\uDD27",
    title: "Hardware Tinkering",
    text: "Arduino and ESP32 side quests, breadboard experiments, and taking things apart just to understand how they tick \u2014 robots, sensors, and repair projects included.",
  },
  {
    icon: "\uD83D\uDCBB",
    title: "Programming",
    text: "Little projects across Python, C++, and the web \u2014 I ship small things just to see them run and to keep my skills sharp.",
  },
  {
    icon: "\uD83C\uDFAE",
    title: "Narrative Games",
    text: "Visual novels and story-driven games \u2014 I play them, and I\u2019m exploring writing branching plots and dialogue with Ren\u2019Py.",
  },
  {
    icon: "\uD83D\uDC85",
    title: "Web & UI Polish",
    text: "Interfaces that feel finished: typography, spacing, micro-interactions, and the last 5% of detail that makes a site feel designed.",
  },
  {
    icon: "\uD83D\uDCCA",
    title: "Data & Dashboards",
    text: "Turning raw data into clean stories with Power BI \u2014 KPIs, trends, and slicers that make numbers feel readable.",
  },
  {
    icon: "\uD83C\uDFB5",
    title: "Music",
    text: "A good soundtrack is half the build \u2014 lo-fi, hip-hop instrumentals, and jazz when the code gets quiet.",
  },
  {
    icon: "\uD83D\uDCDA",
    title: "Reading",
    text: "Datasheets, research papers, and docs \u2014 plus the occasional book that isn\u2019t about electronics.",
  },
  {
    icon: "\uD83D\uDE97",
    title: "Automotive & Repair",
    text: "Hands-on wrenching with real machines \u2014 bus maintenance during OJT taught me that fixing things with your own hands is strangely satisfying.",
  },
  {
    icon: "\uD83C\uDF93",
    title: "Online Learning",
    text: "Always in a course or three \u2014 LinkedIn Learning, Cisco, and platform certificates to stay sharp and current.",
  },
];