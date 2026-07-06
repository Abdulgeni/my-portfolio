<<<<<<< HEAD
import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import PageShell from "@/components/PageShell";
import Nav from "@/components/Nav";
import ChatWidget from "@/components/ChatWidget";
import BackToTop from "@/components/BackToTop";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abdulgeni | AI Engineer & Full Stack Developer",
  description:
    "AI & Full Stack Engineer specializing in production-grade LLM applications, retrieval-augmented generation (RAG) pipelines, intelligent agents, and scalable SaaS solutions.",
  keywords: [
    "Abdulgeni",
    "AI Engineer",
    "Full Stack Developer",
    "RAG",
    "LLM",
    "LangChain",
    "React",
    "TypeScript",
    "Python",
    "Workflow Automation",
    "Next.js",
    "Developer Portfolio",
  ],
  authors: [{ name: "Abdulgeni" }],
  openGraph: {
    type: "website",
    title: "Abdulgeni | AI & Full Stack Engineering Portfolio",
    description:
      "Explore custom-engineered AI tools, multi-document RAG systems, workflow automation, and full-stack SaaS platforms built by Abdulgeni.",
    siteName: "Abdulgeni Portfolio",
    images: ["/images/og_share_banner_1783308513698.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdulgeni | AI & Full Stack Engineering Portfolio",
    description:
      "Explore custom-engineered AI tools, multi-document RAG systems, workflow automation, and full-stack SaaS platforms built by Abdulgeni.",
    images: ["/images/og_share_banner_1783308513698.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#4f46e5",
=======
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abdulgeni Abdulaziz | Full Stack AI Engineer",
  description: "Portfolio of Abdulgeni Abdulaziz, a Full Stack AI Engineer specializing in production RAG systems, workflow automation, and Next.js SaaS architectures.",
>>>>>>> 310d1b85f6650eb9992b428c73310bfb174ef3f6
};

export default function RootLayout({
  children,
<<<<<<< HEAD
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${ibmPlexMono.variable} ${inter.variable} ${spaceGrotesk.variable} bg-bg text-text-1 selection:bg-accent-dim selection:text-accent font-sans antialiased`}
      >
        <Providers>
          <Nav />
          <PageShell>{children}</PageShell>
          <BackToTop />
          <ChatWidget />
          <KeyboardShortcuts />
        </Providers>
      </body>
=======
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
>>>>>>> 310d1b85f6650eb9992b428c73310bfb174ef3f6
    </html>
  );
}
