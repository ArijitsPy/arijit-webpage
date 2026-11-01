export interface EducationItem {
  degree: string;
  institution: string;
  duration: string;
  location: string;
  cgpaOrPercentage: string;
  details: string[];
  corePapers?: string[];
  audit?: string;
}

export interface AchievementItem {
  exam: string;
  rank: string;
  percentileOrScore: string;
  year: string;
  description: string;
}

export interface ProjectItem {
  title: string;
  category: 'Research' | 'Fabrication' | 'Software' | 'Workshop';
  duration: string;
  location?: string;
  summary: string;
  bullets: string[];
  link?: string;
  tags: string[];
}

export interface ExperienceItem {
  role: string;
  organization: string;
  duration: string;
  location: string;
  description: string;
  details: string[];
}

export interface SkillCategory {
  title: string;
  skills: { name: string; proficiency: number; level: string }[];
}

export const PROFILE_DATA = {
  name: "Arijit Sikder",
  title: "PhD Student in Theoretical Physics",
  affiliation: "Department of Physics, Indian Institute of Technology (IIT) Kharagpur",
  supervisor: "Prof. Sonjoy Majumder",
  researchTopic: "Stochastic Bose–Einstein Condensation",
  email: "mearijitsikder@gmail.com",
  phone: "+91 7029791801",
  location: "Rajballav Pur, North 24 PGS, WB-743289, India",
  github: "https://github.com/ArijitsPy",
  githubUsername: "ArijitsPy",
  cvPdfUrl: "/assets/aistudio/ArijitSikder_CV_ee895c15.pdf",
  photoUrl: "/assets/aistudio/ArijitSikder_image_3d107cb1.png",
  about: "I am a PhD student in the Department of Physics at IIT Kharagpur, India, working under the supervision of Prof. Sonjoy Majumder. My research focuses on Stochastic Bose–Einstein Condensation (BEC), open quantum dynamics, phase transitions, and microscopic fluctuations in ultracold atomic systems using the Stochastic Projected Gross–Pitaevskii Equation (SPGPE)."
};

export const RESEARCH_ASSETS = {
  videoSimulation: "/assets/aistudio/VID-20261101-WA0003_71534d8c.mp4",
  vortexPhaseSnapshot: "/assets/aistudio/IMG-20261101-WA0000_7df8e28f.jpg",
  growthDerivatives: "/assets/aistudio/IMG-20261101-WA0001_6771f7de.jpg",
  spgpeGrowthDynamics: "/assets/aistudio/IMG-20261101-WA0002_14dadfca.jpg",
};

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    exam: "JEST (Joint Entrance Screening Test)",
    rank: "AIR 28",
    percentileOrScore: "99.27 Percentile",
    year: "2025",
    description: "National prestigious screening examination for PhD admissions across India's premier theoretical physics institutes."
  },
  {
    exam: "GATE (Graduate Aptitude Test in Engineering)",
    rank: "AIR 78",
    percentileOrScore: "GATE Score 683 · 49.0 / 100",
    year: "2025",
    description: "Qualified with high national standing in Physics (PH) among nationwide candidates."
  },
  {
    exam: "Joint CSIR-UGC NET",
    rank: "AIR 89",
    percentileOrScore: "97.084 Percentile",
    year: "June 2025",
    description: "Qualified for Assistant Professor (Lectureship LS) in Physical Sciences."
  }
];

export const EDUCATION: EducationItem[] = [
  {
    degree: "Master of Science in Physics",
    institution: "Ramakrishna Mission Vivekananda Educational and Research Institute (RKMVERI)",
    duration: "August 2022 – May 2024",
    location: "Belur Math, Howrah, WB - 711202",
    cgpaOrPercentage: "CGPA: 9.27 (92.7%)",
    details: [
      "Rigorous theoretical training in advanced quantum mechanics, field theories, and statistical physics.",
      "Recipient of Swami Vivekananda Merit-cum-Means Scholarship."
    ],
    corePapers: [
      "Classical Mechanics",
      "Quantum Mechanics I & II",
      "Classical Theory of Fields I: Electrodynamics",
      "Mathematical Tools in Theoretical Physics I & II",
      "Computational Physics",
      "Classical Theory of Fields II: General Relativity",
      "Statistical Mechanics I",
      "Quantum Field Theory I & II",
      "Condensed Matter Physics I & II",
      "Particle Physics I",
      "Atomic & Molecular Physics",
      "Design & Fabrication Lab"
    ],
    audit: "Artificial Intelligence and Physics"
  },
  {
    degree: "Bachelor of Science (Honors) in Physics",
    institution: "Barasat Govt. College (West Bengal State University)",
    duration: "August 2019 – June 2022",
    location: "Barasat, Kolkata - 700124, WB",
    cgpaOrPercentage: "CGPA: 9.66 (84.9%)",
    details: [
      "Graduated with distinction in Physics Honors.",
      "Recipient of Swami Vivekananda Merit-cum-Means Scholarship."
    ],
    corePapers: [
      "Core Physics",
      "General Electives: Mathematics & Chemistry"
    ]
  },
  {
    degree: "Higher Secondary (10+2)",
    institution: "Rajballavpur High School (H.S) — WBCHSE",
    duration: "2019",
    location: "Rajballav Pur, 24 PGS (N), WB - 743289",
    cgpaOrPercentage: "Percentage: 88.2%",
    details: [
      "Major subjects: Mathematics, Physics, Chemistry, Biological Sciences, Bengali, and English."
    ]
  },
  {
    degree: "Secondary (Madhyamik Examination)",
    institution: "Rajballavpur High School (H.S) — WBBSE",
    duration: "2017",
    location: "Rajballav Pur, 24 PGS (N), WB - 743289",
    cgpaOrPercentage: "Percentage: 93.86%",
    details: [
      "Passed with outstanding academic distinction across science and language subjects."
    ]
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    title: "A Review of the Analytical Properties of the S-Matrix",
    category: "Research",
    duration: "August 2023 – May 2024",
    location: "RKMVERI, Belur",
    summary: "Investigation into the Scattering matrix (S-Matrix) in quantum field theory and particle physics.",
    bullets: [
      "Examined pole structures, analytical continuations into the complex energy plane, and unitarity constraints.",
      "Explored how bound states and resonance peaks emerge as physical poles in scattering amplitudes.",
      "Bridged abstract mathematical properties with modern computational particle physics."
    ],
    tags: ["Quantum Field Theory", "Scattering Theory", "Analytic S-Matrix", "Mathematical Physics"]
  },
  {
    title: "Persistence of Vision (POV) LED Pendulum Clock",
    category: "Fabrication",
    duration: "December 2023",
    location: "FabLab, RKMVERI Belur",
    summary: "Hardware prototype utilizing optical human persistence of vision to generate floating clock displays.",
    bullets: [
      "Engineered Arduino Nano firmware for microsecond LED array strobe synchronisation.",
      "Implemented dual analog and digital clock faces with real-time IR remote control calibration.",
      "Soldered custom PCB circuitry with hall-effect magnetic trigger sensor."
    ],
    tags: ["Arduino", "Embedded C++", "Hardware FabLab", "IR Sensing"]
  },
  {
    title: "Exam Interface for Computer-Based MCQ/MSQ Tests",
    category: "Software",
    duration: "Open-source",
    summary: "A robust offline-first examination platform for students and educational institutions.",
    bullets: [
      "Engineered full browser offline functionality with zero external telemetry dependence.",
      "Built automated countdown timers, question palette navigation, and instant CSV response exports.",
      "Integrated embedded PDF document viewing for question papers with local data privacy."
    ],
    tags: ["Open Source", "TypeScript/JS", "Educational Tools", "Offline First"],
    link: "https://github.com/ArijitsPy"
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Physics Teacher",
    organization: "Vivekdisha (RKMVERI & Ernst & Young Foundation)",
    duration: "2024 – Present",
    location: "Belur Math, Howrah, WB",
    description: "Vivekdisha is a specialized digital education initiative for rural secondary students across West Bengal, conducted by RKMVERI and supported by the EY Foundation.",
    details: [
      "Conduct live interactive Physics lectures for Class 11 and 12 students.",
      "Formulate problem-solving modules in Newtonian mechanics, thermodynamics, and electromagnetism.",
      "Mentor underserved students preparing for higher education and competitive entrance tests."
    ]
  },
  {
    role: "Freelance Subject Matter Expert (Advance Physics)",
    organization: "Chegg India Private Limited",
    duration: "2022",
    location: "Remote",
    description: "Resolved university-level advanced physics inquiries for international undergraduate students.",
    details: [
      "Provided step-by-step rigorous solutions in classical mechanics, quantum theory, and electrodynamics.",
      "Maintained top-tier accuracy and student rating feedback."
    ]
  }
];

export const SKILLS_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Python (NumPy, SciPy, Matplotlib)", proficiency: 95, level: "Advanced" },
      { name: "Fortran (Modern & HPC Numerical)", proficiency: 88, level: "Advanced" },
      { name: "C++ (Data structures, Algorithms)", proficiency: 80, level: "Proficient" },
      { name: "LaTeX (Academic manuscripts & Beamer)", proficiency: 92, level: "Advanced" },
      { name: "HTML & Web Technologies", proficiency: 72, level: "Competent" }
    ]
  },
  {
    title: "Software & Computation",
    skills: [
      { name: "Mathematica (Symbolic & Differential)", proficiency: 85, level: "Advanced" },
      { name: "MATLAB", proficiency: 75, level: "Proficient" },
      { name: "OriginLab (Data analysis & Curve fitting)", proficiency: 88, level: "Advanced" },
      { name: "Arduino IDE & Hardware prototyping", proficiency: 90, level: "Advanced" },
      { name: "OrCAD PSpice (Circuit simulation)", proficiency: 78, level: "Proficient" }
    ]
  },
  {
    title: "Operating Systems & Tools",
    skills: [
      { name: "Linux / Unix Environments & Bash", proficiency: 92, level: "Advanced" },
      { name: "Git & GitHub Version Control", proficiency: 88, level: "Proficient" },
      { name: "Windows", proficiency: 95, level: "Advanced" },
      { name: "High-Performance Computing (HPC)", proficiency: 80, level: "Proficient" }
    ]
  },
  {
    title: "Languages",
    skills: [
      { name: "Bengali", proficiency: 100, level: "Native" },
      { name: "English", proficiency: 85, level: "Professional Working" },
      { name: "Hindi", proficiency: 75, level: "Working Proficiency" }
    ]
  }
];

export const SCHOLARSHIPS = [
  {
    name: "Swami Vivekananda Merit-cum-Means Scholarship",
    level: "M.Sc. in Physics",
    period: "2022 – 2024",
    institution: "RKMVERI, Belur Math"
  },
  {
    name: "Swami Vivekananda Merit-cum-Means Scholarship",
    level: "B.Sc. (Honors) in Physics",
    period: "2019 – 2022",
    institution: "Barasat Govt. College"
  }
];
