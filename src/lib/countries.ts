export interface Country {
  name: string;
  flag: string;
  color: string;
  gradient: string;
  visa: {
    totalCost: string;
    processTime: string;
    intake: string;
    universityFee: string;
    bankStatement: string;
    otherDetails?: string;
    requirements: string;
  };
  expenses: {
    applicationFee: string;
    visaFee: string;
    travelInsurance: string;
    ticket: string;
    livingExpenses: string;
  };
  ug: {
    percentage: string;
    ielts: string;
    gap: string;
    tuition: string;
  };
  pg: {
    percentage: string;
    ielts: string;
    gap: string;
    tuition: string;
  };
  universities: { name: string; majors: string; fee: string }[];
}

export const countries: Country[] = [
  {
    name: "Italy",
    flag: "🇮🇹",
    color: "#009246",
    gradient: "from-emerald-500 to-red-500",
    visa: {
      totalCost: "8–10 Lac (includes 2–2.5 Lac consultancy fee)",
      processTime: "4–6 months",
      intake: "September intake (Deadline: May)",
      universityFee: "$2,500 – $3,000 per year",
      bankStatement: "25+ Lac",
      otherDetails: "Appointment required (\"ON BUY\"). Fully funded scholarships available (Free Tuition + Accommodation + Stipend) based on regional income (show FBR income under 38 Lac/year) and good academics.",
      requirements: "English Proficiency, All Educational Docs (Attested by concerned Board and University, IBCC, MOFA, University degree + Transcript from HEC)."
    },
    expenses: {
      applicationFee: "€50 – €150",
      visaFee: "€50",
      travelInsurance: "€150 per year",
      ticket: "130,000 – 160,000 PKR",
      livingExpenses: "€600 – €800 per month"
    },
    ug: {
      percentage: "60% or above (12 years of education + DOV/CIMEA)",
      ielts: "No IELTS required (MOI accepted in many universities)",
      gap: "No gap issue (gaps can be justified)",
      tuition: "€1,000 – €3,000 per year (often reduced to €156 via ISEE)"
    },
    pg: {
      percentage: "65% or above",
      ielts: "No IELTS required (MOI accepted)",
      gap: "No gap issue",
      tuition: "€1,500 – €3,500 per year (often reduced to €156 via ISEE)"
    },
    universities: [
      { name: "Sapienza University of Rome", majors: "Classics, Ancient History, Architecture", fee: "€1,000 - €3,000" },
      { name: "University of Bologna", majors: "Law, Agriculture, Modern Languages", fee: "€1,500 - €3,500" },
      { name: "Polytechnic University of Milan", majors: "Engineering, Design, Architecture", fee: "€3,500 - €4,000" },
      { name: "University of Padua", majors: "Psychology, Physics, Astronomy", fee: "€2,500 - €3,000" },
      { name: "University of Milan", majors: "Medicine, Veterinary, Humanities", fee: "€1,500 - €4,000" }
    ]
  },
  {
    name: "Turkey",
    flag: "🇹🇷",
    color: "#E30A17",
    gradient: "from-red-500 to-amber-500",
    visa: {
      totalCost: "6–7 Lac (includes 1.5–2 Lac consultancy fee)",
      processTime: "3–4 months",
      intake: "September intake (Deadline: May)",
      universityFee: "$2,500 – $3,000 per year (Initial fee: $1,000)",
      bankStatement: "20+ Lac",
      otherDetails: "Appointment required. Full/Half fee waiver scholarships available based on good academics. No free accommodation or stipend.",
      requirements: "English Proficiency, All Educational Docs (Attested by concerned Board and University, IBCC, MOFA, University degree + Transcript from HEC)."
    },
    expenses: {
      applicationFee: "$50 - $100",
      visaFee: "$60",
      travelInsurance: "$50 – $100 per year",
      ticket: "100,000 – 130,000 PKR",
      livingExpenses: "$300 – $500 per month"
    },
    ug: {
      percentage: "60% or above",
      ielts: "No IELTS required (MOI accepted)",
      gap: "No gap issue (short gaps preferred)",
      tuition: "$1,000 – $2,500 per year"
    },
    pg: {
      percentage: "65% or above",
      ielts: "No IELTS required (MOI accepted)",
      gap: "No gap issue",
      tuition: "$1,500 – $3,000 per year"
    },
    universities: [
      { name: "Middle East Technical University (METU)", majors: "Engineering, Architecture, Sciences", fee: "$500 - $1,500" },
      { name: "Boğaziçi University", majors: "Business, Engineering, Humanities", fee: "$1,000 - $2,500" },
      { name: "Istanbul Technical University (ITU)", majors: "Civil Engineering, Architecture", fee: "$800 - $2,000" },
      { name: "Ankara University", majors: "Medicine, Law, Political Science", fee: "$1,000 - $3,000" },
      { name: "Hacettepe University", majors: "Medicine, Pharmacy, Dentistry", fee: "$1,000 - $3,500" }
    ]
  },
  {
    name: "Serbia",
    flag: "🇷🇸",
    color: "#C6363C",
    gradient: "from-red-600 to-blue-600",
    visa: {
      totalCost: "10–12 Lac (includes 2.5 Lac consultancy fee)",
      processTime: "3–4 months",
      intake: "September intake (Deadline: May)",
      universityFee: "€2,000 – €3,500 per year",
      bankStatement: "10–15 Lac",
      requirements: "All Educational Docs (Attested by concerned Board and University, IBCC, MOFA, University degree + Transcript from HEC)."
    },
    expenses: {
      applicationFee: "€50 – €100",
      visaFee: "€60",
      travelInsurance: "€100 per year",
      ticket: "120,000 – 150,000 PKR",
      livingExpenses: "€400 – €500 per month"
    },
    ug: {
      percentage: "50% or above",
      ielts: "No IELTS required",
      gap: "No gap issue",
      tuition: "€1,500 – €2,500 per year"
    },
    pg: {
      percentage: "55% or above",
      ielts: "No IELTS required",
      gap: "No gap issue",
      tuition: "€2,000 – €3,500 per year"
    },
    universities: [
      { name: "University of Belgrade", majors: "Medicine, Engineering, IT", fee: "€2,000 - €5,000" },
      { name: "University of Novi Sad", majors: "Agriculture, Sciences, Arts", fee: "€1,500 - €3,500" },
      { name: "University of Niš", majors: "Mechanical Engineering, Economics", fee: "€1,500 - €3,000" },
      { name: "University of Kragujevac", majors: "Medical Sciences, Engineering", fee: "€1,500 - €3,000" },
      { name: "University of Priština", majors: "Philosophy, Law, Sciences", fee: "€1,500 - €2,500" }
    ]
  },
  {
    name: "Finland",
    flag: "🇫🇮",
    color: "#003580",
    gradient: "from-blue-500 to-white",
    visa: {
      totalCost: "40–45 Lac",
      processTime: "3–4 months",
      intake: "September intake (Deadline: May)",
      universityFee: "€8,000 – €12,000 per year",
      bankStatement: "45 Lac (maintained for 1 month)",
      requirements: "All Educational Docs (Attested by concerned Board and University, IBCC, MOFA, University degree + Transcript from HEC)."
    },
    expenses: {
      applicationFee: "€50 - €150",
      visaFee: "€350",
      travelInsurance: "€200 – €300 per year",
      ticket: "150,000 – 180,000 PKR",
      livingExpenses: "€800 – €1,000 per month"
    },
    ug: {
      percentage: "60% or above",
      ielts: "No IELTS required (MOI or Duolingo accepted by some universities)",
      gap: "No gap issue (gaps must be justified)",
      tuition: "€8,000 – €10,000 per year"
    },
    pg: {
      percentage: "65% or above",
      ielts: "No IELTS required (MOI or Duolingo accepted by some universities)",
      gap: "No gap issue (gaps must be justified with experience)",
      tuition: "€10,000 – €12,000 per year"
    },
    universities: [
      { name: "University of Helsinki", majors: "Environmental Science, IT, Law", fee: "€13,000 - €18,000" },
      { name: "Aalto University", majors: "Art & Design, Business, Engineering", fee: "€12,000 - €15,000" },
      { name: "University of Turku", majors: "Biosciences, Education, Medicine", fee: "€8,000 - €12,000" },
      { name: "University of Oulu", majors: "Wireless Communications, Engineering", fee: "€10,000 - €13,000" },
      { name: "Tampere University", majors: "Social Sciences, Technology, Health", fee: "€10,000 - €12,000" }
    ]
  },
  {
    name: "France",
    flag: "🇫🇷",
    color: "#002395",
    gradient: "from-blue-600 to-red-500",
    visa: {
      totalCost: "22–24 Lac",
      processTime: "3–4 months",
      intake: "September intake (Deadline: May)",
      universityFee: "$3,000 – $5,000 per year",
      bankStatement: "35 Lac (maintained for 3 months)",
      otherDetails: "Appointment required. Full/Half fee waiver scholarships available based on good academics. No free accommodation or stipend.",
      requirements: "English Proficiency, All Educational Docs (Attested by concerned Board and University, IBCC, MOFA, University degree + Transcript from HEC)."
    },
    expenses: {
      applicationFee: "€50 – €150",
      visaFee: "€50 (plus Campus France fee ~15,000 PKR)",
      travelInsurance: "€200 – €300 per year",
      ticket: "140,000 – 170,000 PKR",
      livingExpenses: "€700 – €900 per month"
    },
    ug: {
      percentage: "60% or above",
      ielts: "No IELTS required (MOI accepted by specific public universities)",
      gap: "No gap issue (if justified)",
      tuition: "€2,770 per year"
    },
    pg: {
      percentage: "60% or above",
      ielts: "No IELTS required (MOI accepted)",
      gap: "No gap issue",
      tuition: "€3,770 per year"
    },
    universities: [
      { name: "Sorbonne University", majors: "Humanities, Sciences, Medicine", fee: "€2,770 - €3,770 (Non-EU)" },
      { name: "Université Paris-Saclay", majors: "Mathematics, Physics, Engineering", fee: "€2,770 - €3,770" },
      { name: "Aix-Marseille University", majors: "Oceanography, Law, Business", fee: "€2,770 - €3,770 (Non-EU)" },
      { name: "University of Strasbourg", majors: "Chemistry, Biology, European Studies", fee: "€2,770 - €3,770 (Non-EU)" },
      { name: "Université de Paris (Paris Cité)", majors: "Health Sciences, Earth Sciences", fee: "€2,770 - €3,770 (Non-EU)" }
    ]
  },
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    color: "#012169",
    gradient: "from-blue-700 to-red-600",
    visa: {
      totalCost: "40–45 Lac",
      processTime: "3 months",
      intake: "September intake (Deadline: May)",
      universityFee: "£8,500 – £12,000 per year (First-year fee must be paid before admission)",
      bankStatement: "40–60 Lac",
      requirements: "All Educational Docs (Attested by concerned Board and University, IBCC, MOFA, University degree + Transcript from HEC)."
    },
    expenses: {
      applicationFee: "£50 – £100 (varies by university)",
      visaFee: "£490",
      travelInsurance: "£776 per year (Immigration Health Surcharge)",
      ticket: "150,000 – 200,000 PKR",
      livingExpenses: "£9,207 – £12,006 per year (depending on London vs. outside London)"
    },
    ug: {
      percentage: "60% or above in Intermediate/A-Levels",
      ielts: "No IELTS required (if English proficiency letter or MOI is accepted)",
      gap: "No gap issue (gaps up to 2-3 years can be justified)",
      tuition: "£10,000 – £15,000 per year"
    },
    pg: {
      percentage: "60% or above (2.2 or equivalent Bachelor's degree)",
      ielts: "No IELTS required (if English proficiency letter or MOI is accepted)",
      gap: "No gap issue (gaps up to 5 years can be justified with work experience)",
      tuition: "£12,000 – £18,000 per year"
    },
    universities: [
      { name: "University of Oxford", majors: "Medicine, Law, Humanities", fee: "£28,000 - £40,000+" },
      { name: "University of Cambridge", majors: "Engineering, Sciences, Business", fee: "£25,000 - £40,000+" },
      { name: "University College London (UCL)", majors: "Architecture, Education, Economics", fee: "£24,000 - £35,000" },
      { name: "University of Edinburgh", majors: "Data Science, Linguistics, Medicine", fee: "£23,000 - £33,000" },
      { name: "University of Manchester", majors: "Engineering, Business, Nursing", fee: "£20,000 - £30,000" }
    ]
  },
  {
    name: "Belgium",
    flag: "🇧🇪",
    color: "#2D2926",
    gradient: "from-amber-500 to-red-500",
    visa: {
      totalCost: "60–62 Lac (includes 2.5 Lac consultancy fee)",
      processTime: "3–4 months",
      intake: "September intake (Deadline: May)",
      universityFee: "",
      bankStatement: "40–45 Lac (Requires Block Account)",
      requirements: "All Educational Docs (Attested by concerned Board and University, IBCC, MOFA, University degree + Transcript from HEC)."
    },
    expenses: {
      applicationFee: "€50 – €150",
      visaFee: "€200",
      travelInsurance: "€250 per year",
      ticket: "140,000 – 170,000 PKR",
      livingExpenses: "€800 – €1,000 per month"
    },
    ug: {
      percentage: "65% or above",
      ielts: "No IELTS required (MOI accepted at specific institutions)",
      gap: "No gap issue",
      tuition: "€2,000 – €4,000 per year"
    },
    pg: {
      percentage: "65% or above",
      ielts: "No IELTS required (MOI accepted)",
      gap: "No gap issue",
      tuition: "€3,000 – €6,000 per year"
    },
    universities: [
      { name: "KU Leuven", majors: "Theology, Engineering, Philosophy", fee: "€1,000 - €4,000" },
      { name: "Ghent University", majors: "Veterinary Medicine, Bioscience Engineering", fee: "€2,000 - €6,000" },
      { name: "UCLouvain", majors: "Economics, Theology, Social Sciences", fee: "€2,000 - €4,500" },
      { name: "University of Antwerp", majors: "Applied Economics, Sciences, Law", fee: "€3,000 - €6,000" },
      { name: "Vrije Universiteit Brussel (VUB)", majors: "Communications, IT, Engineering", fee: "€3,000 - €5,000" }
    ]
  },
  {
    name: "Germany",
    flag: "🇩🇪",
    color: "#DD0000",
    gradient: "from-gray-700 to-amber-500",
    visa: {
      totalCost: "60–65 Lac (includes 2.5 Lac consultancy fee)",
      processTime: "3–4 months",
      intake: "September intake (Deadline: May)",
      universityFee: "Free (Semester contribution: €150 – €350 per semester)",
      bankStatement: "45+ Lac (Requires Block Account - €11,208)",
      requirements: "All Educational Docs (Attested by concerned Board and University, IBCC, MOFA, University degree + Transcript from HEC)."
    },
    expenses: {
      applicationFee: "€75 - €150",
      visaFee: "€75",
      travelInsurance: "€120 per month",
      ticket: "140,000 – 180,000 PKR",
      livingExpenses: "€934 per month"
    },
    ug: {
      percentage: "70% or above (13 years of education usually required for direct entry)",
      ielts: "No IELTS required (MOI accepted by a few English-taught programs, though rare for UG)",
      gap: "No gap issue (can be justified)",
      tuition: "Free (Semester contribution: €150 – €350 per semester)"
    },
    pg: {
      percentage: "70% or above (minimum 2.5 German Grade)",
      ielts: "No IELTS required (MOI accepted by select universities)",
      gap: "No gap issue (professional experience adds value)",
      tuition: "Free (Semester contribution: €150 – €350 per semester)"
    },
    universities: [
      { name: "Technical University of Munich (TUM)", majors: "Engineering, IT, Natural Sciences", fee: "Free tuition (Semester fee: €150)" },
      { name: "Ludwig Maximilian University of Munich (LMU)", majors: "Physics, Philosophy, Biological Sciences", fee: "Free tuition (Semester fee: €150)" },
      { name: "Heidelberg University", majors: "Medicine, Life Sciences, Humanities", fee: "€3,000 (Non-EU in Baden-Württemberg)" },
      { name: "Humboldt University of Berlin", majors: "Arts, Humanities, Neuroscience", fee: "Free tuition (Semester fee: €300)" },
      { name: "RWTH Aachen University", majors: "Mechanical Engineering, Architecture", fee: "Free tuition (Semester fee: €300)" }
    ]
  },
  {
    name: "South Korea",
    flag: "🇰🇷",
    color: "#003478",
    gradient: "from-red-500 to-blue-700",
    visa: {
      totalCost: "17–20 Lac (35 Lac Done Base, includes 2.5 Lac consultancy fee)",
      processTime: "3–4 months",
      intake: "September intake (Deadline: May)",
      universityFee: "10–15 Lac per year",
      bankStatement: "60+ Lac",
      otherDetails: "Appointment required. Scholarships available (Requires IELTS > 5.5). Accommodation and stipend are provided.",
      requirements: "English Proficiency, All Educational Docs (Attested by concerned Board and University, IBCC, MOFA, University degree + Transcript from HEC)."
    },
    expenses: {
      applicationFee: "$50 – $150",
      visaFee: "$60",
      travelInsurance: "$150 per year",
      ticket: "150,000 – 180,000 PKR",
      livingExpenses: "$500 – $800 per month"
    },
    ug: {
      percentage: "65% or above",
      ielts: "No IELTS required (if university allows conditional admission / language course first)",
      gap: "No gap issue (max 1-2 years gap preferred)",
      tuition: "$3,000 – $5,000 per year"
    },
    pg: {
      percentage: "65% or above",
      ielts: "No IELTS required (MOI or university entrance exam accepted by some)",
      gap: "No gap issue (work experience covers gaps)",
      tuition: "$4,000 – $6,000 per year"
    },
    universities: [
      { name: "Seoul National University (SNU)", majors: "Business, Engineering, Medicine", fee: "$2,500 - $6,000" },
      { name: "Pusan National University", majors: "Mechanical Engineering, Maritime", fee: "$2,000 - $4,000" },
      { name: "Kyungpook National University", majors: "IT, Agriculture, Business", fee: "$2,000 - $4,500" },
      { name: "Chonnam National University", majors: "Materials Science, Arts", fee: "$2,000 - $4,500" },
      { name: "Chungnam National University", majors: "Bioscience, Engineering", fee: "$2,000 - $4,500" }
    ]
  },
  {
    name: "Ireland",
    flag: "🇮🇪",
    color: "#169B62",
    gradient: "from-green-600 to-orange-500",
    visa: {
      totalCost: "35–40 Lac",
      processTime: "3–4 months",
      intake: "September intake (Deadline: May)",
      universityFee: "€9,000 – €15,000 per year",
      bankStatement: "30–40 Lac",
      otherDetails: "Stay back visa of 2 years after graduation. Part-time work allowed (20 hrs/week).",
      requirements: "English Proficiency, All Educational Docs (Attested by concerned Board and University, IBCC, MOFA, University degree + Transcript from HEC)."
    },
    expenses: {
      applicationFee: "€50 – €100",
      visaFee: "€60",
      travelInsurance: "€200 – €300 per year",
      ticket: "140,000 – 170,000 PKR",
      livingExpenses: "€800 – €1,200 per month"
    },
    ug: {
      percentage: "60% or above",
      ielts: "IELTS 6.0 or MOI accepted by some universities",
      gap: "No gap issue (gaps up to 2 years can be justified)",
      tuition: "€9,000 – €12,000 per year"
    },
    pg: {
      percentage: "60% or above (2.2 or equivalent)",
      ielts: "IELTS 6.5 or MOI accepted by some universities",
      gap: "No gap issue (work experience adds value)",
      tuition: "€10,000 – €15,000 per year"
    },
    universities: [
      { name: "Trinity College Dublin", majors: "Law, Medicine, Humanities", fee: "€15,000 - €25,000" },
      { name: "University College Dublin", majors: "Business, Engineering, Science", fee: "€12,000 - €22,000" },
      { name: "National University of Ireland Galway", majors: "Medicine, Engineering, Arts", fee: "€10,000 - €18,000" },
      { name: "University of Limerick", majors: "Technology, Business, Education", fee: "€9,000 - €15,000" },
      { name: "Dublin City University", majors: "Computing, Business, Communications", fee: "€10,000 - €16,000" }
    ]
  }
];
