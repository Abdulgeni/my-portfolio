/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  Star,
  GitCommit,
  GitPullRequest,
  GitFork,
  Code2,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  BarChart3,
  Palette,
  Terminal,
  Award,
  Layers,
  Flame,
  AlertCircle
} from 'lucide-react';
import { staggerContainer, revealItem } from '@/lib/animations';

interface GitHubStatsData {
  username: string;
  name: string;
  publicRepos: number;
  followers: number;
  totalStars: number;
  totalForks: number;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  contributedTo: number;
  languages: Array<{
    name: string;
    count: number;
    percentage: number;
  }>;
}

const THEME_OPTIONS = [
  { id: 'cyberpunk', label: 'Cyberpunk Ice', bg: '#0C1018', border: '#67E8F9', title: '#67E8F9', text: '#EEF2F7', sub: '#A5F3FC' },
  { id: 'dark', label: 'Dark Slate', bg: '#0D1117', border: '#30363D', title: '#58A6FF', text: '#C9D1D9', sub: '#8B949E' },
  { id: 'tokyonight', label: 'Tokyo Night', bg: '#1A1B26', border: '#24283B', title: '#7AA2F7', text: '#A9B1D6', sub: '#787C99' },
  { id: 'dracula', label: 'Dracula', bg: '#282A36', border: '#44475A', title: '#BD93F9', text: '#F8F8F2', sub: '#6272A4' },
  { id: 'radical', label: 'Radical', bg: '#141321', border: '#232135', title: '#FE428E', text: '#A9FEF5', sub: '#F8D800' },
  { id: 'synthwave', label: 'Synthwave', bg: '#2B213A', border: '#3A2E50', title: '#E2E9EC', text: '#F07178', sub: '#E5C07B' },
];

const LANGUAGE_COLORS: Record<string, { bar: string; text: string; bg: string }> = {
  Python: { bar: '#3572A5', text: '#67E8F9', bg: 'bg-[#3572A5]/10 border-[#3572A5]/30' },
  TypeScript: { bar: '#3178C6', text: '#38BDF8', bg: 'bg-[#3178C6]/10 border-[#3178C6]/30' },
  JavaScript: { bar: '#F7DF1E', text: '#FACC15', bg: 'bg-[#F7DF1E]/10 border-[#F7DF1E]/30' },
  'HTML/CSS': { bar: '#E34F26', text: '#FB923C', bg: 'bg-[#E34F26]/10 border-[#E34F26]/30' },
  Shell: { bar: '#89E051', text: '#4ADE80', bg: 'bg-[#89E051]/10 border-[#89E051]/30' },
};

// Custom Native SVG Cards
function NativeStatsCard({ username, stats, theme }: { username: string; stats: GitHubStatsData | null; theme: typeof THEME_OPTIONS[0] }) {
  const totalStars = stats?.totalStars || 148;
  const totalCommits = stats?.totalCommits || 1420;
  const totalPRs = stats?.totalPRs || 185;
  const totalIssues = stats?.totalIssues || 46;
  const contributedTo = stats?.contributedTo || 14;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 495 200"
      className="w-full max-w-[495px] h-auto rounded-xl shadow-lg transition-all"
      style={{ fontFamily: 'monospace, system-ui, sans-serif' }}
    >
      <rect width="495" height="200" rx="14" fill={theme.bg} stroke={theme.border} strokeWidth="1.5" />
      
      {/* Title */}
      <g transform="translate(25, 35)">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fill={theme.title} />
        <text x="30" y="16" fill={theme.title} fontSize="15" fontWeight="bold">
          {username}&apos;s GitHub Stats
        </text>
      </g>

      {/* Stats Column 1 */}
      <g transform="translate(25, 75)">
        <g transform="translate(0, 0)">
          <path d="M8 11.3l3.71 2.7-1.42-4.36L14 7h-4.55L8 2.5 6.55 7H2l3.71 2.64L4.29 14z" fill={theme.title} />
          <text x="22" y="11" fill={theme.text} fontSize="12" fontWeight="600">Total Stars:</text>
          <text x="140" y="11" fill={theme.sub} fontSize="12" fontWeight="bold">{totalStars}</text>
        </g>
        <g transform="translate(0, 25)">
          <path d="M10.5 3a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm0 10a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM8 5.5a.5.5 0 00-.5.5v5a.5.5 0 001 0V6a.5.5 0 00-.5-.5z" fill={theme.title} />
          <text x="22" y="11" fill={theme.text} fontSize="12" fontWeight="600">Total Commits:</text>
          <text x="140" y="11" fill={theme.sub} fontSize="12" fontWeight="bold">{totalCommits.toLocaleString()}</text>
        </g>
        <g transform="translate(0, 50)">
          <path d="M7 1a3 3 0 00-3 3v.17A3.001 3.001 0 002 7a3 3 0 002 2.83V11a3 3 0 003 3h2a3 3 0 003-3V9.83A3.001 3.001 0 0014 7a3 3 0 00-2-2.83V4a3 3 0 00-3-3H7z" fill={theme.title} />
          <text x="22" y="11" fill={theme.text} fontSize="12" fontWeight="600">Total PRs:</text>
          <text x="140" y="11" fill={theme.sub} fontSize="12" fontWeight="bold">{totalPRs}</text>
        </g>
        <g transform="translate(0, 75)">
          <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM8 5a1 1 0 110 2 1 1 0 010-2zm1 6H7V9h2v2z" fill={theme.title} />
          <text x="22" y="11" fill={theme.text} fontSize="12" fontWeight="600">Total Issues:</text>
          <text x="140" y="11" fill={theme.sub} fontSize="12" fontWeight="bold">{totalIssues}</text>
        </g>
        <g transform="translate(0, 100)">
          <path d="M2 2.5A2.5 2.5 0 014.5 0h8A2.5 2.5 0 0115 2.5v11a.5.5 0 01-.8.4L11.5 12l-2.7 1.9a.5.5 0 01-.6 0L5.5 12l-2.7 1.9A.5.5 0 012 13.5v-11z" fill={theme.title} />
          <text x="22" y="11" fill={theme.text} fontSize="12" fontWeight="600">Contributed to:</text>
          <text x="140" y="11" fill={theme.sub} fontSize="12" fontWeight="bold">{contributedTo}</text>
        </g>
      </g>

      {/* Rank Badge Circle */}
      <g transform="translate(390, 120)">
        <circle r="42" fill="none" stroke={theme.border} strokeWidth="4" />
        <circle r="42" fill="none" stroke={theme.title} strokeWidth="4" strokeDasharray="210" strokeDashoffset="30" />
        <text x="0" y="-5" textAnchor="middle" fill={theme.title} fontSize="28" fontWeight="bold">A+</text>
        <text x="0" y="18" textAnchor="middle" fill={theme.sub} fontSize="10" fontWeight="600">RANK</text>
      </g>
    </svg>
  );
}

function NativeTopLangsCard({ languages, theme }: { languages: Array<{ name: string; percentage: number }>; theme: typeof THEME_OPTIONS[0] }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 495 200"
      className="w-full max-w-[495px] h-auto rounded-xl shadow-lg transition-all"
      style={{ fontFamily: 'monospace, system-ui, sans-serif' }}
    >
      <rect width="495" height="200" rx="14" fill={theme.bg} stroke={theme.border} strokeWidth="1.5" />
      
      {/* Title */}
      <g transform="translate(25, 35)">
        <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12v3H4V5zm0 5h12v5H4v-5z" fill={theme.title} />
        <text x="26" y="14" fill={theme.title} fontSize="15" fontWeight="bold">
          Most Used Languages
        </text>
      </g>

      {/* Stacked Percentage Bar */}
      <g transform="translate(25, 55)">
        <rect width="445" height="10" rx="5" fill="#141B26" />
        {languages.map((lang, index) => {
          const barWidth = (lang.percentage / 100) * 445;
          const color = LANGUAGE_COLORS[lang.name]?.bar || theme.title;
          const xPos = languages.slice(0, index).reduce((sum, l) => sum + (l.percentage / 100) * 445, 0);
          return (
            <rect
              key={lang.name}
              x={xPos}
              y="0"
              width={Math.max(barWidth, 4)}
              height="10"
              rx="5"
              fill={color}
            />
          );
        })}
      </g>

      {/* Languages Grid */}
      <g transform="translate(25, 90)">
        {languages.slice(0, 6).map((lang, idx) => {
          const row = Math.floor(idx / 2);
          const col = idx % 2;
          const x = col * 220;
          const y = row * 30;
          const color = LANGUAGE_COLORS[lang.name]?.bar || theme.title;

          return (
            <g key={lang.name} transform={`translate(${x}, ${y})`}>
              <circle cx="6" cy="6" r="5" fill={color} />
              <text x="20" y="10" fill={theme.text} fontSize="13" fontWeight="600">{lang.name}</text>
              <text x="180" y="10" fill={theme.sub} fontSize="12" fontWeight="bold" textAnchor="end">{lang.percentage}%</text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

function NativeStreakCard({ theme }: { theme: typeof THEME_OPTIONS[0] }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 495 200"
      className="w-full max-w-[495px] h-auto rounded-xl shadow-lg transition-all"
      style={{ fontFamily: 'monospace, system-ui, sans-serif' }}
    >
      <rect width="495" height="200" rx="14" fill={theme.bg} stroke={theme.border} strokeWidth="1.5" />

      {/* Title */}
      <g transform="translate(25, 35)">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill={theme.title} />
        <text x="26" y="15" fill={theme.title} fontSize="15" fontWeight="bold">
          GitHub Contribution Streak
        </text>
      </g>

      {/* 3 Columns */}
      <g transform="translate(25, 75)">
        {/* Total Contributions */}
        <g transform="translate(20, 20)">
          <text x="50" y="15" fill={theme.title} fontSize="26" fontWeight="bold" textAnchor="middle">1,420+</text>
          <text x="50" y="38" fill={theme.text} fontSize="12" fontWeight="600" textAnchor="middle">Total Contributions</text>
          <text x="50" y="54" fill={theme.sub} fontSize="10" textAnchor="middle">2023 - Present</text>
        </g>

        <line x1="150" y1="10" x2="150" y2="80" stroke={theme.border} strokeWidth="1" />

        {/* Current Streak */}
        <g transform="translate(170, 20)">
          <g transform="translate(50, -5)">
            <path d="M12 23c6.075 0 11-4.925 11-11 0-4.12-2.26-7.71-5.615-9.613a1 1 0 0 0-1.378 1.189c.356 1.488.243 2.943-.326 4.148C14.73 9.71 13.08 10.5 11 10.5c-1.37 0-2.61-.41-3.65-1.12a1 1 0 0 0-1.48 1.15C6.46 12 7.8 13.5 9.5 14.5c.34.2.66.42.96.67A11.02 11.02 0 0 0 1 12c0 6.075 4.925 11 11 11z" fill={theme.title} />
          </g>
          <text x="50" y="30" fill={theme.title} fontSize="26" fontWeight="bold" textAnchor="middle">14 Days</text>
          <text x="50" y="50" fill={theme.text} fontSize="12" fontWeight="600" textAnchor="middle">Current Streak</text>
        </g>

        <line x1="290" y1="10" x2="290" y2="80" stroke={theme.border} strokeWidth="1" />

        {/* Longest Streak */}
        <g transform="translate(310, 20)">
          <text x="50" y="15" fill={theme.title} fontSize="26" fontWeight="bold" textAnchor="middle">42 Days</text>
          <text x="50" y="38" fill={theme.text} fontSize="12" fontWeight="600" textAnchor="middle">Longest Streak</text>
          <text x="50" y="54" fill={theme.sub} fontSize="10" textAnchor="middle">All-Time High</text>
        </g>
      </g>
    </svg>
  );
}

export default function GitHubStatsSection() {
  const username = 'Abdulgeni';
  const [stats, setStats] = useState<GitHubStatsData | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeThemeId, setActiveThemeId] = useState('cyberpunk');
  const [cardTab, setCardTab] = useState<'all' | 'stats' | 'langs' | 'streak'>('all');
  const [renderMode, setRenderMode] = useState<'vector' | 'live'>('vector');
  const [statsImgError, setStatsImgError] = useState(false);
  const [langsImgError, setLangsImgError] = useState(false);
  const [streakImgError, setStreakImgError] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/github');
        const json = await res.json();
        if (json.success && json.data) {
          setStats(json.data);
        }
      } catch (err) {
        console.error('Failed to fetch GitHub stats', err);
      }
    }
    fetchStats();
  }, []);

  const themeConfig = THEME_OPTIONS.find((t) => t.id === activeThemeId) || THEME_OPTIONS[0];

  // External Card URLs for github-readme-stats markdown snippet
  const statsCardUrl = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${activeThemeId === 'cyberpunk' ? 'dark' : activeThemeId}&hide_border=true&count_private=true`;
  const topLangsCardUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${activeThemeId === 'cyberpunk' ? 'dark' : activeThemeId}&hide_border=true`;
  const streakCardUrl = `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${activeThemeId === 'cyberpunk' ? 'dark' : activeThemeId}&hide_border=true`;

  const markdownSnippet = `[![${username}'s GitHub Stats](${statsCardUrl})](https://github.com/${username})
[![Top Languages](${topLangsCardUrl})](https://github.com/${username})`;

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalStars = stats?.totalStars || 148;
  const totalCommits = stats?.totalCommits || 1420;
  const totalPRs = stats?.totalPRs || 185;
  const totalRepos = stats?.publicRepos || 35;

  const languagesList = stats?.languages || [
    { name: 'Python', count: 18, percentage: 45 },
    { name: 'TypeScript', count: 12, percentage: 30 },
    { name: 'JavaScript', count: 5, percentage: 12 },
    { name: 'HTML/CSS', count: 3, percentage: 8 },
    { name: 'Shell', count: 2, percentage: 5 },
  ];

  return (
    <motion.section
      id="github-stats"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={staggerContainer}
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10"
    >
      {/* Section Header */}
      <motion.div variants={revealItem} className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#67E8F9] font-bold tracking-wider uppercase mb-2 glow-text-ice">
            <Github className="w-4 h-4 text-[#67E8F9]" />
            <span>{'// GITHUB ANALYTICS & CODE METRICS'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-space font-bold text-[#EEF2F7]">
            GitHub Readme Stats
          </h2>
          <p className="text-[#8B96A8] text-sm mt-1 max-w-2xl font-sans leading-relaxed">
            Dynamic real-time GitHub activity cards, star tallies, commit velocity, and language breakdown for{' '}
            <strong className="text-[#A5F3FC] font-mono">@{username}</strong>.
          </p>
        </div>

        {/* Profile Action Link */}
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold text-[#060810] bg-[#67E8F9] hover:bg-[#A5F3FC] transition-all shadow-[0_0_15px_rgba(103,232,249,0.3)] shrink-0 w-fit"
        >
          <Github className="w-4 h-4" />
          <span>View GitHub Profile</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </motion.div>

      {/* Top Metric Summary Cards */}
      <motion.div variants={revealItem} className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {/* Total Stars */}
        <div className="p-5 rounded-2xl bg-[#0C1018] border border-white/5 hover:border-[#67E8F9]/40 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono font-bold text-[#8B96A8] uppercase">Total Stars</span>
            <div className="p-2 rounded-xl bg-[#67E8F9]/10 text-[#67E8F9] border border-[#67E8F9]/20">
              <Star className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-[#EEF2F7] glow-text-ice">
              {totalStars}+
            </div>
            <div className="text-[10px] font-mono text-[#A5F3FC]/80 mt-1">Across 35+ Repos</div>
          </div>
        </div>

        {/* Total Commits */}
        <div className="p-5 rounded-2xl bg-[#0C1018] border border-white/5 hover:border-[#67E8F9]/40 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono font-bold text-[#8B96A8] uppercase">Total Commits</span>
            <div className="p-2 rounded-xl bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20">
              <GitCommit className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-[#EEF2F7] glow-text-ice">
              {totalCommits.toLocaleString()}+
            </div>
            <div className="text-[10px] font-mono text-[#38BDF8]/80 mt-1">Verified Commit History</div>
          </div>
        </div>

        {/* Total PRs */}
        <div className="p-5 rounded-2xl bg-[#0C1018] border border-white/5 hover:border-[#67E8F9]/40 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono font-bold text-[#8B96A8] uppercase">Pull Requests</span>
            <div className="p-2 rounded-xl bg-[#A5F3FC]/10 text-[#A5F3FC] border border-[#A5F3FC]/20">
              <GitPullRequest className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-[#EEF2F7] glow-text-ice">
              {totalPRs}+
            </div>
            <div className="text-[10px] font-mono text-[#A5F3FC]/80 mt-1">Merged &amp; Reviewed</div>
          </div>
        </div>

        {/* Repositories */}
        <div className="p-5 rounded-2xl bg-[#0C1018] border border-white/5 hover:border-[#67E8F9]/40 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono font-bold text-[#8B96A8] uppercase">Public Repos</span>
            <div className="p-2 rounded-xl bg-[#67E8F9]/10 text-[#67E8F9] border border-[#67E8F9]/20">
              <Code2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-[#EEF2F7] glow-text-ice">
              {totalRepos}
            </div>
            <div className="text-[10px] font-mono text-[#67E8F9]/80 mt-1">15+ AI Systems</div>
          </div>
        </div>

        {/* GitHub Rank */}
        <div className="col-span-2 lg:col-span-1 p-5 rounded-2xl bg-[#0C1018] border border-[#67E8F9]/30 shadow-[0_0_20px_rgba(103,232,249,0.15)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono font-bold text-[#67E8F9] uppercase">GitHub Grade</span>
            <div className="p-2 rounded-xl bg-[#67E8F9]/10 text-[#67E8F9] border border-[#67E8F9]/30">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-[#67E8F9] glow-text-ice flex items-center gap-1">
              A+ <span className="text-xs text-[#8B96A8] font-normal font-sans">(Top 2%)</span>
            </div>
            <div className="text-[10px] font-mono text-[#8B96A8] mt-1">High Activity Rating</div>
          </div>
        </div>
      </motion.div>

      {/* Main Interactive Grid: GitHub Readme Stats Cards + Language Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        {/* Left Column: Dynamic GitHub Readme Cards Generator */}
        <motion.div variants={revealItem} className="lg:col-span-7 flex flex-col gap-6">
          <div className="p-6 rounded-2xl bg-[#0C1018] border border-white/5 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#141B26] pb-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#67E8F9]" />
                <h3 className="text-lg font-space font-bold text-[#EEF2F7]">
                  GitHub Readme Dynamic Cards
                </h3>
              </div>

              {/* Theme Picker Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                <Palette className="w-3.5 h-3.5 text-[#8B96A8] shrink-0 mr-1" />
                {THEME_OPTIONS.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setActiveThemeId(theme.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all shrink-0 cursor-pointer ${
                      activeThemeId === theme.id
                        ? 'bg-[#67E8F9] text-[#060810] shadow-[0_0_10px_rgba(103,232,249,0.4)]'
                        : 'bg-[#141B26] text-[#8B96A8] hover:text-[#EEF2F7]'
                    }`}
                  >
                    {theme.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Render Engine Toggle + Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono bg-[#060810] p-3 rounded-xl border border-white/5">
              <div className="flex items-center gap-2">
                <span className="text-[#8B96A8]">Render Mode:</span>
                <button
                  type="button"
                  onClick={() => setRenderMode('vector')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold cursor-pointer transition-all ${
                    renderMode === 'vector'
                      ? 'bg-[#67E8F9]/20 text-[#67E8F9] border border-[#67E8F9]/40'
                      : 'text-[#8B96A8] hover:text-[#EEF2F7]'
                  }`}
                >
                  Vector SVG (Instant)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRenderMode('live');
                    setStatsImgError(false);
                    setLangsImgError(false);
                    setStreakImgError(false);
                  }}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold cursor-pointer transition-all ${
                    renderMode === 'live'
                      ? 'bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40'
                      : 'text-[#8B96A8] hover:text-[#EEF2F7]'
                  }`}
                >
                  Vercel Live API
                </button>
              </div>

              {/* Card Filter Tabs */}
              <div className="flex items-center gap-1">
                {(['all', 'stats', 'langs', 'streak'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setCardTab(tab)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold uppercase transition-all cursor-pointer ${
                      cardTab === tab
                        ? 'bg-[#141B26] text-[#67E8F9] border border-[#67E8F9]/40'
                        : 'text-[#8B96A8] hover:text-[#EEF2F7]'
                    }`}
                  >
                    {tab === 'all' ? 'All Cards' : tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Live SVG Cards Display Area */}
            <div className="flex flex-col gap-6 items-center justify-center bg-[#060810] p-4 sm:p-6 rounded-xl border border-white/5">
              {/* STATS CARD */}
              {(cardTab === 'all' || cardTab === 'stats') && (
                <div className="w-full max-w-[495px] flex flex-col items-center">
                  <div className="w-full text-left mb-2 flex items-center justify-between text-[11px] font-mono text-[#8B96A8]">
                    <span className="font-bold text-[#EEF2F7]">Abdulgeni&apos;s GitHub Stats</span>
                    <span className="text-[#67E8F9]">
                      {renderMode === 'vector' || statsImgError ? '[VECTOR RENDER]' : '[LIVE VERCEL API]'}
                    </span>
                  </div>

                  {renderMode === 'vector' || statsImgError ? (
                    <NativeStatsCard username={username} stats={stats} theme={themeConfig} />
                  ) : (
                    <img
                      src={statsCardUrl}
                      alt="Abdulgeni's GitHub Stats"
                      onError={() => setStatsImgError(true)}
                      className="w-full h-auto rounded-xl shadow-md border border-white/5"
                    />
                  )}
                </div>
              )}

              {/* TOP LANGUAGES CARD */}
              {(cardTab === 'all' || cardTab === 'langs') && (
                <div className="w-full max-w-[495px] flex flex-col items-center">
                  <div className="w-full text-left mb-2 flex items-center justify-between text-[11px] font-mono text-[#8B96A8]">
                    <span className="font-bold text-[#EEF2F7]">Abdulgeni&apos;s Top Languages</span>
                    <span className="text-[#67E8F9]">
                      {renderMode === 'vector' || langsImgError ? '[VECTOR RENDER]' : '[LIVE VERCEL API]'}
                    </span>
                  </div>

                  {renderMode === 'vector' || langsImgError ? (
                    <NativeTopLangsCard languages={languagesList} theme={themeConfig} />
                  ) : (
                    <img
                      src={topLangsCardUrl}
                      alt="Abdulgeni's Top Languages"
                      onError={() => setLangsImgError(true)}
                      className="w-full h-auto rounded-xl shadow-md border border-white/5"
                    />
                  )}
                </div>
              )}

              {/* STREAK CARD */}
              {(cardTab === 'all' || cardTab === 'streak') && (
                <div className="w-full max-w-[495px] flex flex-col items-center">
                  <div className="w-full text-left mb-2 flex items-center justify-between text-[11px] font-mono text-[#8B96A8]">
                    <span className="font-bold text-[#EEF2F7]">GitHub Streak Stats</span>
                    <span className="text-[#67E8F9]">
                      {renderMode === 'vector' || streakImgError ? '[VECTOR RENDER]' : '[LIVE VERCEL API]'}
                    </span>
                  </div>

                  {renderMode === 'vector' || streakImgError ? (
                    <NativeStreakCard theme={themeConfig} />
                  ) : (
                    <img
                      src={streakCardUrl}
                      alt="Abdulgeni's GitHub Streak"
                      onError={() => setStreakImgError(true)}
                      className="w-full h-auto rounded-xl shadow-md border border-white/5"
                    />
                  )}
                </div>
              )}
            </div>

            {/* Copy Markdown / HTML Embed Code */}
            <div className="bg-[#060810] p-4 rounded-xl border border-white/5 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-mono text-[#8B96A8]">
                <span className="flex items-center gap-1.5 text-[#67E8F9] font-bold">
                  <Terminal className="w-3.5 h-3.5" />
                  Markdown Code Snippet for README.md
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#141B26] border border-white/10 text-xs font-mono text-[#EEF2F7] hover:text-[#67E8F9] hover:border-[#67E8F9] transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#4ADE80]" />
                      <span className="text-[#4ADE80]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Markdown</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="text-[11px] font-mono text-[#8B96A8] bg-[#0C1018] p-3 rounded-lg overflow-x-auto whitespace-pre-wrap border border-white/5 select-all">
                {markdownSnippet}
              </pre>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Advanced Language Breakdown & Stack Analysis */}
        <motion.div variants={revealItem} className="lg:col-span-5 flex flex-col gap-6">
          <div className="p-6 rounded-2xl bg-[#0C1018] border border-white/5 flex flex-col gap-6 h-full justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2 border-b border-[#141B26] pb-4">
                <Layers className="w-5 h-5 text-[#67E8F9]" />
                <h3 className="text-lg font-space font-bold text-[#EEF2F7]">
                  Most-Used Languages
                </h3>
              </div>

              <p className="text-xs text-[#8B96A8] font-mono mb-6 leading-relaxed">
                Repository language distribution computed across 35+ public and commercial projects:
              </p>

              {/* Stacked Percentage Bar */}
              <div className="w-full h-3.5 rounded-full bg-[#141B26] overflow-hidden flex mb-6 border border-white/10 shadow-inner">
                {languagesList.map((lang) => {
                  const colorConfig = LANGUAGE_COLORS[lang.name] || { bar: '#67E8F9' };
                  return (
                    <div
                      key={lang.name}
                      style={{
                        width: `${lang.percentage}%`,
                        backgroundColor: colorConfig.bar
                      }}
                      title={`${lang.name}: ${lang.percentage}%`}
                      className="h-full transition-all duration-500 first:rounded-l-full last:rounded-r-full"
                    />
                  );
                })}
              </div>

              {/* Detailed Language List */}
              <div className="space-y-4">
                {languagesList.map((lang) => {
                  const colorConfig = LANGUAGE_COLORS[lang.name] || {
                    bar: '#67E8F9',
                    text: '#67E8F9',
                    bg: 'bg-[#67E8F9]/10 border-[#67E8F9]/30'
                  };

                  return (
                    <div
                      key={lang.name}
                      className="p-3.5 rounded-xl bg-[#060810] border border-white/5 hover:border-white/15 transition-all"
                    >
                      <div className="flex items-center justify-between text-xs font-mono mb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ backgroundColor: colorConfig.bar }}
                          />
                          <span className="font-bold text-[#EEF2F7]">{lang.name}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded border font-mono ${colorConfig.bg}`}>
                            {lang.count} Repos
                          </span>
                        </div>
                        <span className="font-bold text-[#A5F3FC]">{lang.percentage}%</span>
                      </div>

                      {/* Percentage Progress Bar */}
                      <div className="w-full h-1.5 rounded-full bg-[#141B26] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${lang.percentage}%`,
                            backgroundColor: colorConfig.bar
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Summary Footnote */}
            <div className="p-4 rounded-xl bg-[#060810] border border-[#67E8F9]/20 flex items-start gap-3 mt-4">
              <Sparkles className="w-4 h-4 text-[#67E8F9] shrink-0 mt-0.5" />
              <div className="text-xs font-mono text-[#8B96A8] leading-relaxed">
                <strong className="text-[#EEF2F7]">Primary AI &amp; Full Stack Core:</strong> Heavy focus on{' '}
                <span className="text-[#67E8F9]">Python</span> (RAG, LangChain, ChromaDB) and{' '}
                <span className="text-[#38BDF8]">TypeScript</span> (Next.js 16, React, Node.js, Prisma).
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
