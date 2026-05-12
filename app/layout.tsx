import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import IntroGate from "@/components/intro/IntroGate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://www.khanaldipa.com.np";
const NAME = "Dipa Khanal";
const ALT_NAMES = ["Deepa Khanal", "Dipa", "Deepa", "khanaldipa", "khanaldeepa"];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${NAME} — Developer & Designer | Portfolio`,
    template: `%s | ${NAME}`,
  },
  description:
    "Dipa Khanal (Deepa Khanal) — Computer Engineering student at Khwopa College of Engineering, Bhaktapur. Full-stack web developer and designer from Kathmandu, Nepal. Hult Prize on-campus winner, Ambition Hackfest title winner, KU Business Hack first runner-up. Portfolio showcasing React, Next.js, Python, and data-driven projects.",
  keywords: [
    "Dipa Khanal",
    "Deepa Khanal",
    "Dipa Khanal Nepal",
    "Deepa Khanal Nepal",
    "Dipa",
    "Deepa",
    "Khanal",
    "khanaldipa",
    "khanaldeepa",
    "Dipa Khanal portfolio",
    "Deepa Khanal portfolio",
    "Dipa Khanal developer",
    "Deepa Khanal developer",
    "Dipa Khanal resume",
    "Dipa Khanal CV",
    "Dipa Khanal projects",
    "Dipa Khanal hackathon",
    "Dipa Khanal Khwopa",
    "Dipa Khanal Bhaktapur",
    "Dipa Khanal LinkedIn",
    "Dipa Khanal Instagram",
    "Dipa Khanal GitHub",
    "Dipa Khanal Kathmandu",
    "Dipa Khanal computer engineering",
    "Dipa Khanal React developer",
    "Dipa Khanal Next.js developer",
    "web developer Nepal",
    "frontend developer Nepal",
    "full stack developer Nepal",
    "React developer Nepal",
    "Next.js developer Nepal",
    "Python developer Nepal",
    "female developer Nepal",
    "Nepali developer portfolio",
    "developer Kathmandu",
    "developer Bhaktapur",
    "computer engineering student Nepal",
    "Khwopa College of Engineering",
    "Khwopa College of Engineering student",
    "hackathon winner Nepal",
    "Hult Prize Nepal",
    "Hult Prize Khwopa",
    "Ambition Hackfest winner",
    "KU Business Hack",
    "Codefest 2025",
  ],
  authors: [{ name: NAME, url: SITE_URL }],
  creator: NAME,
  publisher: NAME,
  applicationName: `${NAME} Portfolio`,
  category: "Personal Portfolio",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: SITE_URL,
    siteName: `${NAME} — Portfolio`,
    title: `${NAME} — Developer & Designer | Portfolio`,
    description:
      "Personal portfolio of Dipa Khanal (Deepa Khanal) — Computer Engineering student at Khwopa College, hackathon winner, and full-stack web developer based in Kathmandu, Nepal.",
    images: [
      {
        url: "/images/profile.jpg",
        width: 1200,
        height: 630,
        alt: `${NAME} — Developer & Designer based in Kathmandu, Nepal`,
      },
    ],
    firstName: "Dipa",
    lastName: "Khanal",
    username: "deepakhanal62",
    gender: "female",
  },
  twitter: {
    card: "summary_large_image",
    title: `${NAME} — Developer & Designer`,
    description:
      "Dipa Khanal (Deepa Khanal) — developer & designer from Kathmandu, Nepal. Computer Engineering student at Khwopa College, hackathon winner.",
    images: ["/images/profile.jpg"],
    creator: "@DipaKhanal62",
    site: "@DipaKhanal62",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
};

const person = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: NAME,
  alternateName: ALT_NAMES,
  givenName: "Dipa",
  familyName: "Khanal",
  gender: "Female",
  url: SITE_URL,
  mainEntityOfPage: SITE_URL,
  image: {
    "@type": "ImageObject",
    url: `${SITE_URL}/images/profile.jpg`,
    width: 1200,
    height: 630,
  },
  jobTitle: "Developer & Designer",
  description:
    "Computer Engineering student at Khwopa College of Engineering, hackathon winner, and full-stack web developer based in Kathmandu, Nepal.",
  email: "mailto:khanaldeepa126@gmail.com",
  nationality: { "@type": "Country", name: "Nepal" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kathmandu",
    addressRegion: "Bagmati",
    addressCountry: "NP",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Khwopa College of Engineering",
    sameAs: "https://khwopa.edu.np/",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bhaktapur",
      addressCountry: "NP",
    },
  },
  hasOccupation: {
    "@type": "Occupation",
    name: "Developer & Designer",
    occupationLocation: {
      "@type": "City",
      name: "Kathmandu",
    },
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Python",
      "Tailwind CSS",
      "UI/UX Design",
    ],
  },
  knowsAbout: [
    "Web Development",
    "Full-Stack Development",
    "Frontend Development",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Python",
    "Tailwind CSS",
    "UI/UX Design",
    "Data Science",
    "Computer Vision",
    "Hackathons",
  ],
  knowsLanguage: ["English", "Nepali"],
  award: [
    "Hult Prize 2025 — On-Campus Title Winner, Khwopa College of Engineering",
    "Ambition Hackfest 2025 — Title Winner, Ambition College Baneshwor",
    "KU Business Hack — First Runner-Up, Kathmandu University Dhulikhel",
    "Codefest 2025 — People's Choice Award",
    "Khwopa College of Engineering — Special Recognition Award",
  ],
  sameAs: [
    "https://github.com/dip-aaa",
    "https://www.linkedin.com/in/dipa-khanal-5b66142ab/",
    "https://x.com/DipaKhanal62",
    "https://www.instagram.com/deepakhanal62",
    "https://www.facebook.com/dipa.khanal.247416",
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    person,
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profile`,
      url: SITE_URL,
      name: `${NAME} — Developer & Designer`,
      mainEntity: { "@id": `${SITE_URL}/#person` },
      about: { "@id": `${SITE_URL}/#person` },
      dateModified: new Date().toISOString().slice(0, 10),
      inLanguage: "en",
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: `${NAME} — Portfolio`,
      description: "Personal portfolio of Dipa Khanal (Deepa Khanal).",
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
      author: { "@id": `${SITE_URL}/#person` },
      copyrightHolder: { "@id": `${SITE_URL}/#person` },
      copyrightYear: 2025,
    },
  ],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
    { media: "(prefers-color-scheme: light)", color: "#faf7f2" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var realOrig=console.error,inner=realOrig,depth=0;function filter(){var a=arguments[0];if(typeof a==='string'&&a.indexOf('Encountered a script tag')===0)return;if(depth>0)return realOrig.apply(console,arguments);depth++;try{return inner.apply(console,arguments);}finally{depth--;}}Object.defineProperty(console,'error',{configurable:true,get:function(){return filter;},set:function(v){inner=v;}});if(sessionStorage.getItem('dipa_intro_played')!=='1'){document.documentElement.classList.add('intro-loading');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>
          <IntroGate />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
