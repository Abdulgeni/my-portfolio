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
};

export default function RootLayout({
  children,
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
    </html>
  );
}
