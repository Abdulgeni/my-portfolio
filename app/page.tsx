import ScrollProgress from '@/components/ScrollProgress';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AIAssistant from '@/components/AIAssistant';
import ArchitectureBento from '@/components/ArchitectureBento';
import SystemHealth from '@/components/SystemHealth';
import ProjectsSection from '@/components/ProjectsSection';
import GitHubStatsSection from '@/components/GitHubStatsSection';
import ExperienceLog from '@/components/ExperienceLog';
import ClientFeedback from '@/components/ClientFeedback';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SectionDivider from '@/components/SectionDivider';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#060810] text-[#EEF2F7] overflow-x-hidden selection:bg-[#67E8F9]/30 selection:text-[#A5F3FC] relative">
      {/* Top Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Top Navbar */}
      <Navbar />

      {/* Hero Section with WebGL Neural Network Background & Live Terminal Typing */}
      <Hero />

      <SectionDivider label="AI Interface" />

      {/* Live AI Assistant Section */}
      <AIAssistant />

      <SectionDivider label="Architecture" />

      {/* System Architecture Bento Grid */}
      <ArchitectureBento />

      <SectionDivider label="Infrastructure Telemetry" />

      {/* Live Infrastructure Telemetry & System Health */}
      <SystemHealth />

      <SectionDivider label="Case Studies" />

      {/* Deployed Systems Case Studies */}
      <ProjectsSection />

      <SectionDivider label="Code Analytics" />

      {/* GitHub Readme Stats & Code Analytics */}
      <GitHubStatsSection />

      <SectionDivider label="Engineering Log" />

      {/* Engineering Log Timeline */}
      <ExperienceLog />

      <SectionDivider label="Client Feedback" />

      {/* Client Feedback Carousel */}
      <ClientFeedback />

      <SectionDivider label="Get In Touch" />

      {/* Credentials & Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  );
}
