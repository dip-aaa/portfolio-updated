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
const ALT_NAMES = ["Deepa Khanal", "Dipa", "Deepa"];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${NAME} — Developer & Designer`,
    template: `%s | ${NAME}`,
  },
  description:
    "Dipa Khanal (Deepa Khanal) — Computer Engineering student at Khwopa College of Engineering, hackathon winner, and full-stack web developer based in Kathmandu, Nepal. Portfolio showcasing React, Next.js, and data-driven projects.",
  keywords: [
    "Dipa Khanal",
    "Deepa Khanal",
    "Dipa",
    "Deepa",
    "Khanal",
    "Dipa Khanal portfolio",
    "Deepa Khanal portfolio",
    "Dipa Khanal developer",
    "Deepa Khanal developer",
    "web developer Nepal",
    "computer engineering student Nepal",
    "Khwopa College of Engineering",
    "Kathmandu developer",
    "React developer Nepal",
    "Next.js developer Nepal",
    "hackathon winner Nepal",
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
    title: `${NAME} — Developer & Designer`,
    description:
      "Personal portfolio of Dipa Khanal (Deepa Khanal) — Computer Engineering student, hackathon winner, and full-stack web developer based in Kathmandu, Nepal.",
    images: [
      {
        url: "/images/profile.jpg",
        width: 1200,
        height: 630,
        alt: `${NAME} — Developer & Designer`,
      },
    ],
    firstName: "Dipa",
    lastName: "Khanal",
    username: "deepakhanal62",
  },
  twitter: {
    card: "summary_large_image",
    title: `${NAME} — Developer & Designer`,
    description:
      "Dipa Khanal (Deepa Khanal) — Web developer & designer from Kathmandu, Nepal.",
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
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: NAME,
  alternateName: ALT_NAMES,
  givenName: "Dipa",
  familyName: "Khanal",
  url: SITE_URL,
  image: `${SITE_URL}/images/profile.jpg`,
  jobTitle: "Web Developer & Designer",
  description:
    "Computer Engineering student at Khwopa College of Engineering, hackathon winner, and full-stack web developer based in Kathmandu, Nepal.",
  email: "mailto:khanaldeepa126@gmail.com",
  nationality: "Nepali",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kathmandu",
    addressCountry: "Nepal",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Khwopa College of Engineering",
  },
  knowsAbout: [
    "Web Development",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "UI/UX Design",
    "Data Science",
  ],
  sameAs: [
    "https://github.com/dip-aaa",
    "https://www.linkedin.com/in/dipa-khanal-5b66142ab/",
    "https://x.com/DipaKhanal62",
    "https://www.instagram.com/deepakhanal62",
    "https://www.facebook.com/dipa.khanal.247416",
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
            __html: `(function(){try{var realOrig=console.error,inner=realOrig,depth=0;function filter(){var a=arguments[0];if(typeof a==='string'&&a.indexOf('Encountered a script tag')===0)return;if(depth>0)return realOrig.apply(console,arguments);depth++;try{return inner.apply(console,arguments);}finally{depth--;}}Object.defineProperty(console,'error',{configurable:true,get:function(){return filter;},set:function(v){inner=v;}});localStorage.removeItem('theme');if(sessionStorage.getItem('dipa_intro_played')!=='1'){document.documentElement.classList.add('intro-loading');}}catch(e){}})();`,
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
