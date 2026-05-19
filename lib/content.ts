export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  image?: string;
  images?: string[];
  liveUrl?: string;
  year?: string;
  status?: "Live" | "Case study" | "Work in progress";
  highlights?: string[];
};

export type StackGroup = { title: string; items: string[] };
export type ExperienceEntry = { dates: string; role: string; company: string };
export type Testimonial = { name: string; role: string; company: string; content: string };
export type Pillar = { number: string; title: string; description: string };

export const content = {
  identity: {
    name: "Abdulhalim Oladimeji",
    role: "Backend & Full-Stack Developer",
    tagline: "API integration · Real-time systems · Blockchain.",
    email: "tsolution418@gmail.com",
    phone: "+380 951 594 897",
    location: "Remote · Worldwide",
    yearsExperience: 4,
    available: true,
    socials: {
      linkedin: "https://www.linkedin.com/in/abdulhalim-abdulrahim-1aba17374",
      github: "https://github.com/ITECHsoftware00",
    },
    cvUrl: "/cv.html",
    avatarUrl: "/profile.jpeg", // Using the updated profile picture
  },

  about: `Backend & Full-Stack Developer with 4+ years delivering production-grade APIs, real-time apps, and blockchain platforms for clients across UAE, Nigeria, and Europe. I've shipped 15+ projects end-to-end — authentication systems, crypto payment gateways, DeFi smart contracts — with a relentless focus on security, scale, and clean architecture.`,

  featuredProjects: [
    {
      id: "ogisback",
      title: "Ogisback",
      category: "Marketplace · Creator Economy",
      year: "2026",
      status: "Live",
      description:
        "Content-first influencer marketplace. Creators post and get discovered; brands launch campaigns and pay via escrow. Google + Meta OAuth, Stripe Checkout, Supabase RLS, and Edge Functions for atomic escrow release.",
      tech: ["React 19", "Vite", "Supabase", "Stripe", "Tailwind CSS", "Framer Motion"],
      highlights: ["Escrow payments", "Creator profiles", "Campaign management", "Stripe webhooks"],
      image: "/ogisback-preview.png",
      liveUrl: "https://cloudcost365.com/",
    },
    {
      id: "1971win-bd",
      title: "1971WIN BD",
      category: "Gaming Platform · Bangladesh",
      year: "2024",
      status: "Case study",
      description:
        "Full-featured sports betting and crash game platform for Bangladesh. Live match odds (Football, Cricket, Kabaddi), accumulator bet slip, real-time SVG crash multiplier curve, and local payment methods — bKash, Nagad, Rocket.",
      tech: ["React 18", "Vite", "CSS Variables", "JavaScript"],
      highlights: ["Crash game", "Live betting", "bKash · Nagad", "Admin panel"],
    },
    {
      id: "smart-finance",
      title: "Smart Finance",
      category: "Fintech · AI",
      year: "2024",
      status: "Case study",
      description:
        "AI-powered personal finance app. Budget tracking, transaction analytics, and OpenAI-driven insights. Built on Next.js with Supabase Auth, Postgres schema migrations, and a clean dashboard UI.",
      tech: ["Next.js", "TypeScript", "Supabase", "OpenAI", "PostgreSQL"],
      highlights: ["AI insights", "Budget tracking", "Supabase Auth", "Analytics dashboard"],
    },
    {
      id: "elysian",
      title: "Elysian",
      category: "Digital Flagship · Luxury Perfume",
      year: "2026",
      status: "Live",
      description:
        "High-fidelity digital flagship prototype for a luxury perfume brand. Designed with a 'Classic Luxury' aesthetic, combining sophisticated typography, cinematic imagery, and seamless interactive experiences.",
      tech: ["HTML5", "CSS3", "JavaScript", "Intersection Observer"],
      highlights: ["Multi-Page Journey", "AJAX 'Quick Add'", "Sample Logic", "Persistent Selection"],
      images: ["/elysian-1.png", "/elysian-2.png", "/elysian-3.png", "/elysian-4.png"],
      liveUrl: "https://github.com/ITECHsoftware00/ELYSIAN-store.git",
    },
  ] satisfies Project[],

  archiveProjects: [
    { id: "zipbook", title: "ZipBook", category: "Fintech · Mobile", description: "Real-time wallet system with transaction tracking, reward-point engine, biometric + OTP auth, and analytics dashboard.", tech: ["Flutter", "Firebase", "Node.js"], image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=1200&auto=format&fit=crop" },
    { id: "qr-menu", title: "QR Menu & Food Ordering", category: "F&B · Mobile", description: "QR-based ordering for tier-2/3 cities with offline sync, WhatsApp Business API notifications, and admin panel.", tech: ["Flutter", "Firebase", "WhatsApp API"], image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1200&auto=format&fit=crop" },
    { id: "mindful", title: "Mindful — Focus & Screen Time", category: "Productivity · Health", description: "Open-source Android app to control screen time and block distractions.", tech: ["Kotlin", "Android SDK", "Room"], image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1200&auto=format&fit=crop", liveUrl: "https://play.google.com/store/apps/details?id=com.mindful.android" },
    { id: "patch-me", title: "Patch Me", category: "Medical · Health", description: "Eye-patch tracking app for parents — reminders, photo logs, treatment adherence.", tech: ["Flutter", "Dart", "SQLite"], image: "https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?q=80&w=1200&auto=format&fit=crop", liveUrl: "https://play.google.com/store/apps/details?id=com.edocllc.patch_me" },
    { id: "leaf-lens", title: "Leaf Lens", category: "AI · Agriculture", description: "Plant disease identification using on-device ML inference.", tech: ["Python", "TensorFlow", "Android"], image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229ce?q=80&w=1200&auto=format&fit=crop", liveUrl: "https://play.google.com/store/apps/details?id=com.leaflens.pdda2" },
    { id: "habo", title: "Habo", category: "Productivity · Lifestyle", description: "Simple open-source habit tracker.", tech: ["React Native", "Redux", "Node.js"], image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fd16f?q=80&w=1200&auto=format&fit=crop", liveUrl: "https://play.google.com/store/apps/details?id=com.pavlenko.Habo" },
    { id: "so-vegan", title: "SO VEGAN", category: "Food & Drink", description: "600+ plant-based recipes, shopping lists, videos.", tech: ["React Native", "TypeScript", "Firebase"], image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop", liveUrl: "https://play.google.com/store/apps/details?id=com.wearesovegan.app" },
    { id: "trinity-orientation", title: "Trinity Orientation", category: "Education", description: "Orientation app for new students.", tech: ["React Native", "iOS", "Android"], image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop", liveUrl: "https://play.google.com/store/apps/details?id=com.tory.trinityOrientation" },
    { id: "unops", title: "UNOPS Collect", category: "Productivity", description: "Phone-based replacement for paper forms with offline data collection.", tech: ["Android", "Kotlin", "Java"], image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop", liveUrl: "https://play.google.com/store/apps/details?id=org.unops.collect" },
    { id: "woocommerce-crypto", title: "WooCommerce Crypto Checkout", category: "E-Commerce · Web3", description: "WordPress plugin enabling on-chain crypto checkout, wallet connect, and live transaction confirmation for WooCommerce stores.", tech: ["PHP", "Solidity", "Web3.js", "WordPress"], image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop" },
    { id: "rest-api-rbac", title: "RESTful API · JWT + RBAC", category: "Backend · Auth", description: "Reusable backend stack with JWT auth, role-based access control, and Stripe + crypto payment integration for e-commerce and fintech clients.", tech: ["Node.js", "Express", "PostgreSQL", "JWT"], image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop" },
    { id: "realtime-sync", title: "Realtime Multi-Device Sync", category: "Backend · Realtime", description: "Live transactions, push notifications, and multi-device data sync infrastructure built on Firebase + WebSockets.", tech: ["Firebase", "WebSockets", "Node.js"], image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop" },
    { id: "defi-staking", title: "DeFi Staking Vault", category: "Web3 · DeFi", description: "Audited staking vault with reward distribution, emergency pause, and governance hooks. Solidity unit tests with full coverage.", tech: ["Solidity", "Hardhat", "Ethers.js"], image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop" },
  ] satisfies Project[],

  stackGroups: [
    { title: "Core Languages", items: ["JavaScript", "TypeScript", "PHP", "Dart", "Solidity", "Rust"] },
    { title: "Backend", items: ["Node.js", "Express", "Laravel", "Spring Boot", "REST APIs"] },
    { title: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"] },
    { title: "Mobile", items: ["Flutter", "React Native"] },
    { title: "Blockchain", items: ["Smart Contracts", "DeFi", "NFT", "Web3.js", "ERC-721", "IPFS"] },
    { title: "Realtime & Auth", items: ["WebSockets", "Firebase Realtime", "JWT", "RBAC", "OAuth"] },
    { title: "Data & DevOps", items: ["PostgreSQL", "MongoDB", "Firebase", "Docker", "Git"] },
    { title: "Payments", items: ["Stripe", "Crypto Checkout", "Wallet Connect", "MetaMask"] },
  ] satisfies StackGroup[],

  experience: [
    {
      dates: "2021 — Present",
      role: "Freelance Full-Stack Developer",
      company: "Self-Employed · Remote",
    },
    {
      dates: "2019 — Present",
      role: "Self-Taught Software Developer",
      company: "Real-world projects · Open source",
    },
  ] satisfies ExperienceEntry[],

  pillars: [
    { number: "01", title: "Security First", description: "Architecting for absolute data integrity and compliance." },
    { number: "02", title: "Speed & Scale", description: "Zero-latency infrastructures that never slow down." },
    { number: "03", title: "Design Legacy", description: "Building interfaces that stay modern for years." },
    { number: "04", title: "Strategic Code", description: "Technical debt prevention through clean patterns." },
  ] satisfies Pillar[],

  testimonials: [
    { name: "Sarah Chen", role: "Product Lead", company: "Future.co", content: "Abdulhalim's ability to architect scalable systems is unparalleled. He didn't just write code; he built a foundation that allowed our platform to handle a 300% increase in traffic without a single hiccup." },
    { name: "James Ramsay", role: "Operations Director", company: "Global Hospitality Group", content: "A rare talent who understands both the technical intricacies of the backend and the aesthetic demands of high-end frontend design." },
    { name: "Marco Rossi", role: "Founder", company: "ProHouse Blockchain", content: "We needed someone who could bridge the gap between traditional real estate and Web3. Abdulhalim delivered a secure, user-friendly platform that exceeded our investors' expectations." },
  ] satisfies Testimonial[],
};
