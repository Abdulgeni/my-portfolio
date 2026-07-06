"use client";

import React, { useState, useEffect } from 'react';
import { Github, Star, GitBranch, Flame, RefreshCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface GitHubData {
  repos: number;
  weeklyCommits: number;
  totalStars: number;
  contributionStreak: number;
}

export default function GitHubStats() {
  const { isRtl } = useLanguage();
  const [stats, setStats] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/github');
      if (!res.ok) throw new Error('API failed');
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error('Error fetching github stats in component:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="mt-16 border border-border bg-surface rounded-2xl p-6 relative overflow-hidden shadow-sm select-none">
      {/* Decorative Corner Lines */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-accent/40"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-accent/40"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-accent/40"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-accent/40"></div>

      {/* Header Row */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4 mb-6 font-mono ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
        <div className={`flex items-center space-x-3 ${isRtl ? 'flex-row-reverse space-x-reverse' : ''}`}>
          <div className="p-2 bg-accent/10 border border-accent/20 rounded-xl text-accent">
            <Github size={18} />
          </div>
          <div>
            <span className={`text-[10px] text-accent font-bold tracking-widest uppercase block leading-none mb-1 ${isRtl ? 'text-right' : 'text-left'}`}>
              [ {isRtl ? 'قياسات مستودع جيت هاب في الوقت الفعلي' : 'REALTIME REPOSITORY TELEMETRY'} ]
            </span>
            <h3 className={`text-[14px] font-bold text-text-1 tracking-tight ${isRtl ? 'text-right' : 'text-left'}`}>
              github.com/Abdulgeni
            </h3>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {loading ? (
            <div className={`flex items-center gap-2 text-[10px] text-text-3 font-semibold uppercase tracking-wider ${isRtl ? 'flex-row-reverse' : ''}`}>
              <RefreshCw size={12} className="animate-spin text-accent" />
              <span>{isRtl ? 'جاري المزامنة...' : 'SYNCING...'}</span>
            </div>
          ) : (
            <button
              onClick={fetchStats}
              className={`flex items-center gap-1.5 text-[9px] text-text-3 hover:text-accent font-semibold uppercase tracking-wider border border-border bg-surface-2 px-2.5 py-1.5 rounded-lg transition-all duration-150 cursor-pointer hover:border-accent ${isRtl ? 'flex-row-reverse' : ''}`}
              aria-label="Refresh telemetry data"
            >
              <RefreshCw size={10} />
              <span>{isRtl ? 'تحديث' : 'REFRESH'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Repos */}
        <div className="border border-border bg-surface-2 rounded-xl p-4 flex flex-col justify-between group hover:border-accent/30 transition-all duration-200">
          <div className={`flex items-center justify-between mb-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <span className="font-mono text-[9px] text-text-3 font-bold uppercase tracking-wider">
              {isRtl ? 'المستودعات' : 'REPOSITORIES'}
            </span>
            <div className="text-text-3 group-hover:text-accent transition-colors duration-200">
              <GitBranch size={14} />
            </div>
          </div>
          <div className={`mt-auto ${isRtl ? 'text-right' : 'text-left'}`}>
            <div className="font-space font-bold text-[28px] text-text-1 tracking-tight leading-none">
              {loading ? (
                <span className="inline-block w-12 h-8 bg-border animate-pulse rounded"></span>
              ) : error ? (
                <span className="text-text-3 text-[18px]">15</span>
              ) : (
                stats?.repos
              )}
            </div>
            <span className="font-mono text-[8px] text-text-3 uppercase tracking-wider mt-1 block">PUBLIC_REPOS_SYS</span>
          </div>
        </div>

        {/* Total Stars */}
        <div className="border border-border bg-surface-2 rounded-xl p-4 flex flex-col justify-between group hover:border-accent/30 transition-all duration-200">
          <div className={`flex items-center justify-between mb-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <span className="font-mono text-[9px] text-text-3 font-bold uppercase tracking-wider">
              {isRtl ? 'إجمالي النجوم' : 'TOTAL STARS'}
            </span>
            <div className="text-text-3 group-hover:text-amber-500 transition-colors duration-200">
              <Star size={14} />
            </div>
          </div>
          <div className={`mt-auto ${isRtl ? 'text-right' : 'text-left'}`}>
            <div className="font-space font-bold text-[28px] text-text-1 tracking-tight leading-none">
              {loading ? (
                <span className="inline-block w-12 h-8 bg-border animate-pulse rounded"></span>
              ) : error ? (
                <span className="text-text-3 text-[18px]">12</span>
              ) : (
                stats?.totalStars
              )}
            </div>
            <span className="font-mono text-[8px] text-text-3 uppercase tracking-wider mt-1 block">STARGAZERS_SUM</span>
          </div>
        </div>

        {/* Weekly Commits */}
        <div className="border border-border bg-surface-2 rounded-xl p-4 flex flex-col justify-between group hover:border-accent/30 transition-all duration-200">
          <div className={`flex items-center justify-between mb-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <span className="font-mono text-[9px] text-text-3 font-bold uppercase tracking-wider">
              {isRtl ? 'التعديلات الأسبوعية' : 'WEEKLY COMMITS'}
            </span>
            <div className="text-text-3 group-hover:text-accent transition-colors duration-200">
              <GitBranch size={14} className="rotate-90" />
            </div>
          </div>
          <div className={`mt-auto ${isRtl ? 'text-right' : 'text-left'}`}>
            <div className="font-space font-bold text-[28px] text-text-1 tracking-tight leading-none">
              {loading ? (
                <span className="inline-block w-12 h-8 bg-border animate-pulse rounded"></span>
              ) : error ? (
                <span className="text-text-3 text-[18px]">24</span>
              ) : (
                stats?.weeklyCommits
              )}
            </div>
            <span className="font-mono text-[8px] text-text-3 uppercase tracking-wider mt-1 block">LAST_7_DAYS_PUSH</span>
          </div>
        </div>

        {/* Contribution Streak */}
        <div className="border border-border bg-surface-2 rounded-xl p-4 flex flex-col justify-between group hover:border-accent/30 transition-all duration-200">
          <div className={`flex items-center justify-between mb-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <span className="font-mono text-[9px] text-text-3 font-bold uppercase tracking-wider">
              {isRtl ? 'النشاط المتواصل' : 'ACTIVE STREAK'}
            </span>
            <div className="text-text-3 group-hover:text-orange-500 transition-colors duration-200">
              <Flame size={14} />
            </div>
          </div>
          <div className={`mt-auto ${isRtl ? 'text-right' : 'text-left'}`}>
            <div className={`font-space font-bold text-[28px] text-text-1 tracking-tight leading-none flex items-baseline gap-1 ${isRtl ? 'flex-row-reverse' : ''}`}>
              {loading ? (
                <span className="inline-block w-12 h-8 bg-border animate-pulse rounded"></span>
              ) : error ? (
                <>
                  <span>6</span>
                  <span className="text-[11px] text-text-3 font-mono font-medium">{isRtl ? 'أيام' : 'DAYS'}</span>
                </>
              ) : (
                <>
                  <span>{stats?.contributionStreak}</span>
                  <span className="text-[11px] text-text-3 font-mono font-medium">{isRtl ? 'أيام' : 'DAYS'}</span>
                </>
              )}
            </div>
            <span className="font-mono text-[8px] text-text-3 uppercase tracking-wider mt-1 block">CONSECUTIVE_ENGAGEMENT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
