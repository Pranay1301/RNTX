export type Player = {
  slug?: string;
  handle: string;
  name: string;
  role: string;
  image?: string;
  source?: string;
  note?: string;
  stat?: string;
};

export type Division = {
  slug: string;
  game: string;
  short: string;
  genre: string;
  status: string;
  headline: string;
  accent: string;
  achievement: string;
  currentRecord: string;
  source: string;
  players: Player[];
};

export const socials = {
  instagram: "https://www.instagram.com/revenantesports.gg",
  xsparkInstagram: "https://www.instagram.com/teamx_spark",
  youtube: "https://www.youtube.com/@RevenantEsports",
  x: "https://twitter.com/RevenantGGWP",
  discord: "https://discord.gg/r4T2Ncy5fa",
  shop: "https://shop.revenantesports.com/",
  liquipedia: "https://liquipedia.net/pubgmobile/Revenant_XSpark",
};

export const divisions: Division[] = [
  {
    slug: "bgmi",
    game: "Battlegrounds Mobile India",
    short: "BGMI",
    genre: "Battle royale · India",
    status: "Active roster · 2026",
    headline: "The wolven spark",
    accent: "#f2c861",
    achievement: "BGIS 2024 + BMPS 2024 champions",
    currentRecord: "OneGame Summer 2026 champions · BGIS 2026 seventh",
    source: "https://liquipedia.net/pubgmobile/Revenant_XSpark",
    players: [
      {
        slug: "tracegod",
        handle: "TRACEGOD",
        name: "Joel Thomas",
        role: "Player",
        image: "/assets/people/tracegod.jpg",
        source: "https://liquipedia.net/pubgmobile/Tracegod",
        note: "Joined 17 Aug 2025",
        stat: "OneGame Summer 2026 MVP",
      },
      {
        slug: "ninjajod",
        handle: "NINJAJOD",
        name: "Shubham Ranjan Sahoo",
        role: "Captain",
        image: "/assets/people/ninjajod.png",
        source: "https://liquipedia.net/pubgmobile/NinjaJOD",
        note: "Joined 23 Nov 2025",
        stat: "Fearless S1 Grand Finals MVP",
      },
      {
        slug: "pain09",
        handle: "PAIN09",
        name: "Abhijot Singh",
        role: "Player",
        image: "/assets/people/pain09.jpg",
        source: "https://liquipedia.net/pubgmobile/Pain09",
        note: "Joined 23 Nov 2025",
        stat: "Young fragger · born 29 May 2009",
      },
      {
        slug: "proton",
        handle: "PROTON",
        name: "Rishi Vardhan",
        role: "Player",
        image: "/assets/people/proton.jpg",
        source: "https://liquipedia.net/pubgmobile/Proton",
        note: "Joined 19 Apr 2026",
        stat: "2026 roster addition",
      },
      {
        slug: "sukuna",
        handle: "SUKUNA",
        name: "Name not publicly listed",
        role: "Player",
        image: "/assets/people/sukuna.jpg",
        source: "https://liquipedia.net/pubgmobile/Revenant_XSpark",
        note: "Joined 28 Apr 2026",
        stat: "2026 roster addition",
      },
    ],
  },
  {
    slug: "valorant",
    game: "VALORANT",
    short: "VCT",
    genre: "Tactical FPS · South Asia",
    status: "Active roster · 2026",
    headline: "Precision under pressure",
    accent: "#b993ff",
    achievement: "VCL South Asia 2025 Split 2 winners",
    currentRecord: "VCL 2026 South Asia Split 2 · third place",
    source: "https://liquipedia.net/valorant/Revenant_XSpark",
    players: [
      { handle: "HOAX", name: "Aman Yadav", role: "Player" },
      { handle: "TECHNO", name: "Shravana Kumar Sahoo", role: "Player" },
      { handle: "VENKA", name: "Venkatesh Sharma", role: "Player" },
      { handle: "K1NGKAPPA", name: "Muhammad Axel Syahbanna Dadan", role: "Player" },
      { handle: "MADELYN", name: "Raven William", role: "Player" },
      { handle: "RINSAT", name: "Rinan Satpute", role: "Player" },
    ],
  },
  {
    slug: "brawl-stars",
    game: "Brawl Stars",
    short: "BRAWL",
    genre: "Mobile arena · APAC",
    status: "Active roster · 2026",
    headline: "Small arena. Global impact.",
    accent: "#ffda70",
    achievement: "Brawl Stars World Finals 2025 · third–fourth",
    currentRecord: "Brawl Stars Championship 2026 Brawl Cup · fifth–eighth",
    source: "https://liquipedia.net/brawlstars/Revenant_XSpark",
    players: [
      { handle: "SERGEANT CLASH", name: "Ashmit Raj Singh", role: "Player" },
      { handle: "WALKTHROUGH", name: "Name not publicly listed", role: "Player" },
      { handle: "X9JAY", name: "Jayden Wong", role: "Player" },
    ],
  },
  {
    slug: "pokemon-unite",
    game: "Pokémon UNITE",
    short: "UNITE",
    genre: "5v5 MOBA · India",
    status: "Active roster · 2026",
    headline: "Five minds. One rotation.",
    accent: "#eeb6ff",
    achievement: "WCS 2022 + ACL 2023 India champions",
    currentRecord: "Pokémon UNITE Championship Series 2026 India · runner-up",
    source: "https://liquipedia.net/pokemon/Revenant_XSpark",
    players: [
      { handle: "REUBEN", name: "Reuben Fernandes", role: "Player" },
      { handle: "VULCAN", name: "Sai Krishna Nalluri", role: "Player" },
      { handle: "DISAPPLE", name: "Dipjyoti Laxman Nath", role: "Player" },
      { handle: "BADSHAHH", name: "Adnan Badshah", role: "Player" },
      { handle: "REX", name: "Rudra Narayan Nayak", role: "Player" },
    ],
  },
  {
    slug: "free-fire-max",
    game: "Free Fire MAX",
    short: "FFMAX",
    genre: "Battle royale · India",
    status: "Active roster · 2026",
    headline: "Fast drops. Faster decisions.",
    accent: "#ffac65",
    achievement: "Gateway 2026 Season 2 champions",
    currentRecord: "FFMIC 2026 Fall Group Stage · qualified",
    source: "https://liquipedia.net/freefire/Revenant_XSpark",
    players: [
      { handle: "ARSH", name: "Arshil Ahmed", role: "Player" },
      { handle: "VINCENT", name: "Sahil Kumar", role: "Player" },
      { handle: "BLACK", name: "Anurag Thakur", role: "Player" },
      { handle: "KUNAL", name: "Kunal Uke", role: "Player" },
      { handle: "SOHAN", name: "Sheikh Sohan", role: "Player" },
    ],
  },
  {
    slug: "honor-of-kings",
    game: "Honor of Kings",
    short: "HOK",
    genre: "5v5 MOBA · India",
    status: "Active roster · 2026",
    headline: "A kingdom hunted as one.",
    accent: "#74e5d2",
    achievement: "2026 KWC India qualifier winners",
    currentRecord: "Honor of Kings World Cup 2026 · competing in Paris",
    source: "https://liquipedia.net/honorofkings/Revenant_XSpark",
    players: [
      { handle: "DEADSHOT", name: "Ashish Chouhan", role: "Top lane" },
      { handle: "CALLMESENPAI", name: "Ainul Haidery", role: "Jungler" },
      { handle: "JTIAN", name: "Cai Yapeng", role: "Jungler · loan" },
      { handle: "CANDIE", name: "Harsh Lal", role: "Middle" },
      { handle: "PUREMAN", name: "Aayush Sharma", role: "Bottom lane" },
      { handle: "NIGHTMAREDINO", name: "Akshaj Behal", role: "Roamer" },
    ],
  },
  {
    slug: "mobile-legends",
    game: "Mobile Legends: Bang Bang",
    short: "MLBB",
    genre: "5v5 MOBA · India",
    status: "Active roster · 2026",
    headline: "Every lane. One purpose.",
    accent: "#79b9ff",
    achievement: "ML Masters Series Season 1 · third–fourth",
    currentRecord: "ML Masters Series Season 1 · third–fourth · $6,000",
    source: "https://liquipedia.net/mobilelegends/Revenant_XSpark",
    players: [
      { handle: "MIRIO", name: "Name not publicly listed", role: "EXP lane" },
      { handle: "SUCHISLIFE", name: "Name not publicly listed", role: "Jungler" },
      { handle: "VVITCH", name: "Nungshiyenba Usham", role: "Middle" },
      { handle: "JOWM", name: "Jomari Pingol", role: "Gold lane" },
      { handle: "KRAM GOD", name: "Mark Glenn Florencio", role: "Roamer" },
    ],
  },
];

export const achievements = [
  {
    date: "29 JUL 2026",
    place: "03",
    title: "PRG NONSTOP LEGACY",
    game: "FREE FIRE MAX",
    detail: "D-tier · third place · $105",
    image: "/assets/rntx-merger.jpg",
  },
  {
    date: "27 JUN 2026",
    place: "03",
    title: "VCL SOUTH ASIA SPLIT 2",
    game: "VALORANT",
    detail: "B-tier · third place · $1,907.58",
    image: "/assets/rntx-merger.jpg",
  },
  {
    date: "21 JUN 2026",
    place: "07",
    title: "ASIA INVITATIONAL SUMMER",
    game: "FREE FIRE MAX",
    detail: "A-tier · seventh place · $2,400",
    image: "/assets/rntx-merger.jpg",
  },
  {
    date: "30 MAY 2026",
    place: "01",
    title: "ASIA INVITATIONAL GATEWAY S2",
    game: "FREE FIRE MAX",
    detail: "C-tier · champions · $1,500",
    image: "/assets/rntx-merger.jpg",
  },
  {
    date: "17 MAY 2026",
    place: "01",
    title: "KWC INDIA QUALIFIER",
    game: "HONOR OF KINGS",
    detail: "Qualifier champions · 4–1 vs S8UL · $1,823.48",
    image: "/assets/rntx-merger.jpg",
  },
  {
    date: "17 MAY 2026",
    place: "05–08",
    title: "BRAWL CUP 2026",
    game: "BRAWL STARS",
    detail: "S-tier · fifth–eighth · $5,000",
    image: "/assets/rntx-merger.jpg",
  },
  {
    date: "09 MAY 2026",
    place: "03–04",
    title: "ML MASTERS SERIES S1",
    game: "MOBILE LEGENDS",
    detail: "A-tier · third–fourth · $6,000",
    image: "/assets/rntx-merger.jpg",
  },
  {
    date: "29 APR 2026",
    place: "01",
    title: "ONEGAME SUMMER SERIES",
    game: "BGMI",
    detail: "C-tier · champions · $3,698",
    image: "/assets/rntx-merger.jpg",
  },
  {
    date: "26 APR 2026",
    place: "02",
    title: "UNITE 2026 INDIA QUALIFIER",
    game: "POKÉMON UNITE",
    detail: "A-tier · runner-up · $4,000",
    image: "/assets/rntx-merger.jpg",
  },
  {
    date: "29 MAR 2026",
    place: "07",
    title: "BGIS 2026",
    game: "BGMI",
    detail: "A-tier national final · seventh · $14,771",
    image: "/assets/rntx-merger.jpg",
  },
  {
    date: "30 NOV 2025",
    place: "03–04",
    title: "BRAWL STARS WORLD FINALS",
    game: "BRAWL STARS",
    detail: "S-tier · third–fourth · $80,000",
    image: "/assets/rntx-merger.jpg",
  },
  {
    date: "01 JUN 2025",
    place: "01",
    title: "VCL SOUTH ASIA SPLIT 2",
    game: "VALORANT",
    detail: "B-tier · champions · $14,023.83",
    image: "/assets/rntx-merger.jpg",
  },
  {
    date: "29 SEP 2024",
    place: "01",
    title: "BMPS 2024",
    game: "BGMI",
    detail: "Team XSpark · A-tier champions · $89,586",
    image: "/assets/bmps-2024.jpg",
  },
  {
    date: "30 JUN 2024",
    place: "01",
    title: "BGIS 2024",
    game: "BGMI",
    detail: "Team XSpark · A-tier champions · $71,973",
    image: "/assets/bgis-2024.jpg",
  },
];

export const featuredAchievements = [
  achievements.find((item) => item.title === "BMPS 2024")!,
  achievements.find((item) => item.title === "BGIS 2024")!,
];

export const creators = [
  {
    handle: "SC0UTOP",
    name: "Tanmay Singh",
    role: "Team XSpark owner · RNTX brand ambassador",
    image: "/assets/people/scoutop.png",
    href: "https://www.instagram.com/scoutop/",
    source: "Liquipedia portrait",
  },
  {
    handle: "GHATAK",
    name: "Abhijeet Harishchandra Andhare",
    role: "Director of Esports & Community",
    image: "/assets/people/ghatak.png",
    href: "https://www.instagram.com/ghatak.official/",
    source: "Liquipedia portrait",
  },
  {
    handle: "NEYOO",
    name: "Suraj Nityanand Majumdar",
    role: "Content creator",
    image: "/assets/people/neyoo.jpg",
    href: "https://www.instagram.com/neyoo.ig/",
    source: "Official RNTX announcement",
  },
];

export const creatorCollective = [
  "Mogambo / Yash Kalakoti",
  "Kwisss / Kristine Sun",
  "Vanshaj / Vanshaj Singh",
  "EagleGaming / Dilin Dinesan",
  "Abhi9av / Abhinav Shukla",
  "Hastar / Gopal Sarda",
  "Spero / Piyush Bhatla",
];

export const competitiveLeadership = [
  { name: "Prakhar Agrawal", role: "Management Director" },
  { name: "Swapnil Bhosale", role: "Esports Manager" },
  { name: "Urvesh Bidwe", role: "BGMI Manager" },
  { name: "Pushpak “EXPLICIT” Mishra", role: "BGMI Coach" },
  { name: "Chirag “Ch1rag” Patel", role: "BGMI Analyst" },
  { name: "Raunak “MrCrowley” Sen", role: "Head of Esports — MOBA" },
];

export const upcomingEvents = [
  {
    date: "30 JUL — 08 AUG",
    year: "2026",
    game: "HONOR OF KINGS",
    title: "HONOR OF KINGS WORLD CUP",
    location: "Paris, France",
    detail: "S-tier · 20 teams · $3,025,000 prize pool",
    state: "COMPETING",
    href: "https://liquipedia.net/honorofkings/Honor_of_Kings_World_Cup/2026",
  },
  {
    date: "06 — 16 AUG",
    year: "2026",
    game: "FREE FIRE MAX",
    title: "FFMIC FALL — GROUP STAGE",
    location: "India · Group C",
    detail: "A-tier qualifier · first listed Group C games on 8 August",
    state: "QUALIFIED",
    href: "https://liquipedia.net/freefire/Free_Fire_MAX_India_Cup/2026/Fall/Group_Stage",
  },
];

export const recentResults = [
  { date: "29 JUL 2026", game: "FREE FIRE MAX", result: "3RD", title: "PRG Nonstop Legacy", detail: "D-tier · $105 recorded prize" },
  { date: "09 JUL 2026", game: "FREE FIRE MAX", result: "4TH", title: "Clash of Titans Season 2", detail: "D-tier · $73 recorded prize" },
  { date: "27 JUN 2026", game: "VALORANT", result: "3RD", title: "VCL South Asia Split 2", detail: "B-tier · $1,907.58 recorded prize" },
  { date: "21 JUN 2026", game: "FREE FIRE MAX", result: "7TH", title: "Asia Invitational Summer", detail: "$2,400 recorded prize" },
  { date: "17 MAY 2026", game: "HONOR OF KINGS", result: "1ST", title: "KWC India Qualifier", detail: "4–1 vs S8UL · $1,823.48" },
  { date: "17 MAY 2026", game: "BRAWL STARS", result: "5TH–8TH", title: "Brawl Cup 2026", detail: "S-tier · $5,000 recorded prize" },
];

export const playerDossiers = [
  {
    slug: "tracegod",
    handle: "TRACEGOD",
    name: "Joel Thomas",
    role: "BGMI Player",
    image: "/assets/people/tracegod.jpg",
    intro: "An Indian BGMI player who joined Revenant XSpark in August 2025 and remains part of the active five.",
    source: "https://liquipedia.net/pubgmobile/Tracegod",
    facts: [
      ["RNTX SINCE", "17 AUG 2025"],
      ["BORN", "25 JUL 2007"],
      ["NATIONALITY", "INDIA"],
      ["STATUS", "ACTIVE"],
    ],
    highlights: ["Domination Arena Season 1 MVP", "OneGame Summer 2026 MVP", "BGMS Season 4 Most Finishes"],
  },
  {
    slug: "ninjajod",
    handle: "NINJAJOD",
    name: "Shubham Ranjan Sahoo",
    role: "BGMI Captain",
    image: "/assets/people/ninjajod.png",
    intro: "A decorated Indian entry player and the captain of the current BGMI five, returning to the organization in November 2025.",
    source: "https://liquipedia.net/pubgmobile/NinjaJOD",
    facts: [
      ["RNTX SINCE", "23 NOV 2025"],
      ["ROLE", "CAPTAIN"],
      ["NATIONALITY", "INDIA"],
      ["STATUS", "ACTIVE"],
    ],
    highlights: ["Fearless Championship S1 Grand Finals MVP", "iQOO Pro Series 2024 MVP", "Entry fragger for the active roster"],
  },
  {
    slug: "pain09",
    handle: "PAIN09",
    name: "Abhijot Singh",
    role: "BGMI Player",
    image: "/assets/people/pain09.jpg",
    intro: "An Indian BGMI player who joined Revenant XSpark in November 2025 and remains active.",
    source: "https://liquipedia.net/pubgmobile/Pain09",
    facts: [
      ["RNTX SINCE", "23 NOV 2025"],
      ["BORN", "29 MAY 2009"],
      ["NATIONALITY", "INDIA"],
      ["STATUS", "ACTIVE"],
    ],
    highlights: ["Joined the 2026 BGMI core", "Competed in BGIS 2026", "Competed in BMPS 2026"],
  },
  {
    slug: "proton",
    handle: "PROTON",
    name: "Rishi Vardhan",
    role: "BGMI Player",
    image: "/assets/people/proton.jpg",
    intro: "A 2026 roster addition signed to add pace and pressure to the active BGMI unit.",
    source: "https://liquipedia.net/pubgmobile/Proton",
    facts: [
      ["RNTX SINCE", "19 APR 2026"],
      ["ROLE", "PLAYER"],
      ["NATIONALITY", "INDIA"],
      ["STATUS", "ACTIVE"],
    ],
    highlights: ["OneGame Summer 2026 champion", "Joined 19 April 2026", "Current active roster"],
  },
  {
    slug: "sukuna",
    handle: "SUKUNA",
    name: "Public name not listed",
    role: "BGMI Player",
    image: "/assets/people/sukuna.jpg",
    intro: "The newest member of the current five, announced by Revenant XSpark ahead of the 2026 summer competition window.",
    source: "https://liquipedia.net/pubgmobile/Revenant_XSpark",
    facts: [
      ["RNTX SINCE", "28 APR 2026"],
      ["ROLE", "PLAYER"],
      ["NATIONALITY", "INDIA"],
      ["STATUS", "ACTIVE"],
    ],
    highlights: ["Joined 28 April 2026", "Indian player", "Current active roster"],
  },
];
