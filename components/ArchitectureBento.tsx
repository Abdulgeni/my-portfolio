'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Layers, ShieldCheck, Languages, ArrowRight, Copy, Check, Code2, Terminal } from 'lucide-react';
import { staggerContainer, revealItem, bentoGridStagger, bentoCardReveal } from '@/lib/animations';

// Code snippets for developer utility
const RAG_SNIPPET = `// rag-pipeline.ts - Vector Retrieval Engine
import { GoogleGenAI } from "@google/genai";
import { ChromaClient } from "chromadb";

export async function queryKernel(prompt: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const embed = await ai.models.embedContent({
    model: "text-embedding-004",
    contents: prompt
  });
  const chroma = new ChromaClient();
  const collection = await chroma.getCollection({ name: "kernel_docs" });
  const docs = await collection.query({ queryEmbeddings: [embed.values] });
  
  return ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: \`Context: \${docs}\\nQuestion: \${prompt}\`
  });
}`;

const AUTOMATION_SNIPPET = `// n8n-workflow-webhook.json
{
  "event": "pipeline.trigger",
  "source": "github_actions",
  "actions": ["n8n_sync", "slack_notify"],
  "retry_policy": { "max_attempts": 3, "backoff_ms": 1000 }
}`;

const FULLSTACK_SNIPPET = `// app/api/kernel/route.ts - Next.js App Router
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  // Server-side secured API Proxy
  const res = await fetch(process.env.CORE_LLM_SERVICE_URL!, {
    method: "POST",
    headers: { "Authorization": \`Bearer \${process.env.SERVICE_SECRET}\` },
    body: JSON.stringify({ prompt })
  });
  return NextResponse.json(await res.json());
}`;

const SECURITY_SNIPPET = `// security-sanitizer.ts - OWASP Guardrail
export function sanitizeInput(rawInput: string): string {
  // Strip harmful script tags & limit payload length
  return rawInput
    .replace(/<script\\b[^<]*(?:(?!<\\/script>)<[^<]*)*<\\/script>/gi, "")
    .trim()
    .slice(0, 4096);
}`;

export default function ArchitectureBento() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (id: string, text: string) => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      }).catch((err) => {
        console.error('Failed to copy: ', err);
      });
    }
  };

  return (
    <motion.section
      id="architecture"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10"
    >
      {/* Section Title */}
      <motion.div variants={revealItem} className="mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-[#67E8F9] font-bold tracking-wider uppercase mb-2 glow-text-ice">
          <Cpu className="w-4 h-4 text-[#67E8F9]" />
          <span>PRODUCTION INFRASTRUCTURE &amp; CAPABILITIES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-space font-bold text-[#EEF2F7]">
          {"// System Architecture"}
        </h2>
      </motion.div>

      {/* Bento Grid with Staggered Entrance */}
      <motion.div variants={bentoGridStagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Large Card: AI / RAG Engineering (Span 2 cols on MD+) */}
        <motion.div
          variants={bentoCardReveal}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="md:col-span-2 rounded-2xl bg-[#0C1018] border border-white/5 p-6 sm:p-8 relative overflow-hidden group shadow-[0_0_20px_rgba(103,232,249,0.08)] hover:border-[#67E8F9] hover:shadow-[0_0_30px_rgba(103,232,249,0.25)] transition-all duration-300"
        >
          {/* Subtle background dot pattern */}
          <div className="absolute inset-0 bg-dot-pattern opacity-20 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />

          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-[#67E8F9] bg-[#67E8F9]/10 border border-[#67E8F9]/30 font-bold">
                  <Cpu className="w-3.5 h-3.5" />
                  CORE ARCHITECTURE
                </span>
                <span className="font-mono text-xs text-[#4A5262]">01 / AI_INFRA</span>
              </div>

              <h3 className="text-2xl font-space font-bold text-[#EEF2F7] mb-3">
                AI / RAG Engineering
              </h3>
              <p className="text-[#8B96A8] text-sm leading-relaxed mb-6 max-w-xl">
                End-to-end vector retrieval pipelines, autonomous multi-agent systems, Model Context Protocol (MCP) servers, and low-latency LLM orchestration.
              </p>

              {/* RAG Flow Diagram */}
              <div className="my-4 p-4 rounded-xl bg-[#141B26] border border-white/5 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[#EEF2F7]">
                <div className="flex items-center gap-2 bg-[#060810] px-3 py-2 rounded-lg border border-[#67E8F9]/40 shadow-[0_0_10px_rgba(103,232,249,0.2)]">
                  <span className="w-2 h-2 rounded-full bg-[#67E8F9] animate-ping" />
                  <span>1. User Query</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#67E8F9] hidden sm:block shrink-0" />

                <div className="flex items-center gap-2 bg-[#060810] px-3 py-2 rounded-lg border border-[#67E8F9]/40 shadow-[0_0_10px_rgba(103,232,249,0.2)]">
                  <span className="w-2 h-2 rounded-full bg-[#67E8F9]" />
                  <span>2. Vector Embed</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#67E8F9] hidden sm:block shrink-0" />

                <div className="flex items-center gap-2 bg-[#060810] px-3 py-2 rounded-lg border border-[#A5F3FC]/40 shadow-[0_0_10px_rgba(165,243,252,0.2)] text-[#A5F3FC]">
                  <span className="w-2 h-2 rounded-full bg-[#A5F3FC]" />
                  <span>3. Chroma Retrieval</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#A5F3FC] hidden sm:block shrink-0" />

                <div className="flex items-center gap-2 bg-[#060810] px-3 py-2 rounded-lg border border-[#A5F3FC]/40 shadow-[0_0_10px_rgba(165,243,252,0.2)] text-[#A5F3FC]">
                  <span className="w-2 h-2 rounded-full bg-[#A5F3FC]" />
                  <span>4. LLM Synthesis</span>
                </div>
              </div>

              {/* Code Snippet Box with Copy Button */}
              <div className="my-5 rounded-xl bg-[#060810] border border-[#67E8F9]/30 overflow-hidden shadow-inner">
                <div className="flex items-center justify-between px-4 py-2 bg-[#141B26] border-b border-white/5 font-mono text-xs text-[#8B96A8]">
                  <span className="flex items-center gap-2 text-[#67E8F9]">
                    <Code2 className="w-3.5 h-3.5 text-[#67E8F9]" />
                    rag-pipeline.ts
                  </span>
                  <button
                    onClick={() => copyToClipboard('rag', RAG_SNIPPET)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0C1018] border border-[#67E8F9]/30 hover:border-[#67E8F9] text-[#67E8F9] hover:bg-[#67E8F9]/10 text-[11px] transition-all cursor-pointer focus:outline-none"
                    aria-label="Copy RAG code snippet to clipboard"
                  >
                    {copiedId === 'rag' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#4ADE80]" />
                        <span className="text-[#4ADE80]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 font-mono text-[11px] sm:text-xs text-[#A5F3FC] overflow-x-auto leading-relaxed max-h-48 scrollbar-thin">
                  <code>{RAG_SNIPPET}</code>
                </pre>
              </div>
            </div>

            {/* Stack Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['LangChain', 'RAG Pipelines', 'ChromaDB', 'Gemini API', 'OpenAI API', 'MCP Protocol', 'Prompt Engineering'].map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-mono text-[#EEF2F7] bg-[#141B26] border border-white/5 hover:border-[#67E8F9]/50 transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Medium Card: Automation */}
        <motion.div
          variants={bentoCardReveal}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="rounded-2xl bg-[#0C1018] border border-white/5 p-6 sm:p-8 relative overflow-hidden group shadow-[0_0_20px_rgba(103,232,249,0.08)] hover:border-[#A5F3FC] hover:shadow-[0_0_30px_rgba(165,243,252,0.25)] transition-all duration-300"
        >
          <div className="absolute inset-0 bg-dot-pattern opacity-20 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />

          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-[#A5F3FC] bg-[#A5F3FC]/10 border border-[#A5F3FC]/30 font-semibold">
                  <Zap className="w-3.5 h-3.5" />
                  WORKFLOWS
                </span>
                <span className="font-mono text-xs text-[#4A5262]">02 / PIPELINES</span>
              </div>

              <h3 className="text-xl font-space font-bold text-[#EEF2F7] mb-3">
                Automation
              </h3>
              <p className="text-[#8B96A8] text-sm leading-relaxed mb-4">
                Event-driven webhooks, n8n orchestrations, GitHub Action bots, and automated email processing pipelines.
              </p>

              {/* Code Snippet with Copy Button */}
              <div className="my-4 rounded-xl bg-[#060810] border border-[#A5F3FC]/30 overflow-hidden shadow-inner">
                <div className="flex items-center justify-between px-3 py-1.5 bg-[#141B26] border-b border-white/5 font-mono text-[11px] text-[#8B96A8]">
                  <span className="text-[#A5F3FC] truncate">n8n-webhook.json</span>
                  <button
                    onClick={() => copyToClipboard('automation', AUTOMATION_SNIPPET)}
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#0C1018] border border-[#A5F3FC]/30 hover:border-[#A5F3FC] text-[#A5F3FC] text-[10px] transition-all cursor-pointer shrink-0 focus:outline-none"
                    aria-label="Copy automation workflow snippet to clipboard"
                  >
                    {copiedId === 'automation' ? (
                      <>
                        <Check className="w-3 h-3 text-[#4ADE80]" />
                        <span className="text-[#4ADE80]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3 font-mono text-[11px] text-[#A5F3FC] overflow-x-auto leading-relaxed scrollbar-thin">
                  <code>{AUTOMATION_SNIPPET}</code>
                </pre>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {['n8n', 'Zapier', 'GitHub Actions', 'Webhooks', 'Twilio API', 'Slack API'].map((item, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono text-[#A5F3FC] bg-[#141B26] border border-white/5"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Medium Card: Full Stack */}
        <motion.div
          variants={bentoCardReveal}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="rounded-2xl bg-[#0C1018] border border-white/5 p-6 sm:p-8 relative overflow-hidden group shadow-[0_0_20px_rgba(103,232,249,0.08)] hover:border-[#67E8F9] hover:shadow-[0_0_30px_rgba(103,232,249,0.25)] transition-all duration-300"
        >
          <div className="absolute inset-0 bg-dot-pattern opacity-20 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />

          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-[#67E8F9] bg-[#67E8F9]/10 border border-[#67E8F9]/30 font-semibold">
                  <Layers className="w-3.5 h-3.5" />
                  WEB &amp; BACKEND
                </span>
                <span className="font-mono text-xs text-[#4A5262]">03 / STACK</span>
              </div>

              <h3 className="text-xl font-space font-bold text-[#EEF2F7] mb-3">
                Full Stack
              </h3>
              <p className="text-[#8B96A8] text-sm leading-relaxed mb-4">
                Production web applications engineered with Next.js App Router, TypeScript, Prisma ORM, and PostgreSQL.
              </p>

              {/* Code Snippet with Copy Button */}
              <div className="my-4 rounded-xl bg-[#060810] border border-[#67E8F9]/30 overflow-hidden shadow-inner">
                <div className="flex items-center justify-between px-3 py-1.5 bg-[#141B26] border-b border-white/5 font-mono text-[11px] text-[#8B96A8]">
                  <span className="text-[#67E8F9] truncate">app/api/kernel/route.ts</span>
                  <button
                    onClick={() => copyToClipboard('fullstack', FULLSTACK_SNIPPET)}
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#0C1018] border border-[#67E8F9]/30 hover:border-[#67E8F9] text-[#67E8F9] text-[10px] transition-all cursor-pointer shrink-0 focus:outline-none"
                    aria-label="Copy full stack code snippet to clipboard"
                  >
                    {copiedId === 'fullstack' ? (
                      <>
                        <Check className="w-3 h-3 text-[#4ADE80]" />
                        <span className="text-[#4ADE80]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3 font-mono text-[11px] text-[#67E8F9] overflow-x-auto leading-relaxed scrollbar-thin">
                  <code>{FULLSTACK_SNIPPET}</code>
                </pre>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {['Next.js 16', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Prisma', 'Tailwind v4'].map((item, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono text-[#67E8F9] bg-[#141B26] border border-white/5"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Small Card: Security */}
        <motion.div
          variants={bentoCardReveal}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="rounded-2xl bg-[#0C1018] border border-white/5 p-6 relative overflow-hidden group shadow-[0_0_20px_rgba(103,232,249,0.08)] hover:border-[#67E8F9] hover:shadow-[0_0_30px_rgba(103,232,249,0.25)] transition-all duration-300"
        >
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-3">
                <ShieldCheck className="w-5 h-5 text-[#67E8F9]" />
                <span className="font-mono text-xs text-[#4A5262]">04 / SEC</span>
              </div>
              <h3 className="text-lg font-space font-bold text-[#EEF2F7] mb-2">
                Security &amp; Best Practices
              </h3>
              <p className="text-[#8B96A8] text-xs leading-relaxed mb-3">
                OWASP Top 10 mitigation, secure API proxying, type safety, and input sanitization across LLM boundaries.
              </p>

              {/* Code Snippet with Copy Button */}
              <div className="my-3 rounded-xl bg-[#060810] border border-[#67E8F9]/30 overflow-hidden shadow-inner">
                <div className="flex items-center justify-between px-3 py-1.5 bg-[#141B26] border-b border-white/5 font-mono text-[10px] text-[#8B96A8]">
                  <span className="text-[#67E8F9] truncate">security-sanitizer.ts</span>
                  <button
                    onClick={() => copyToClipboard('security', SECURITY_SNIPPET)}
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#0C1018] border border-[#67E8F9]/30 hover:border-[#67E8F9] text-[#67E8F9] text-[10px] transition-all cursor-pointer shrink-0 focus:outline-none"
                    aria-label="Copy security sanitizer code snippet to clipboard"
                  >
                    {copiedId === 'security' ? (
                      <>
                        <Check className="w-3 h-3 text-[#4ADE80]" />
                        <span className="text-[#4ADE80]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-2.5 font-mono text-[10px] text-[#A5F3FC] overflow-x-auto leading-relaxed scrollbar-thin">
                  <code>{SECURITY_SNIPPET}</code>
                </pre>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono text-[#EEF2F7] bg-[#141B26] border border-white/5">OWASP Top 10</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono text-[#EEF2F7] bg-[#141B26] border border-white/5">Secure Coding</span>
            </div>
          </div>
        </motion.div>

        {/* Small Highlighted Card: Languages Spoken */}
        <motion.div
          variants={bentoCardReveal}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="rounded-2xl bg-gradient-to-br from-[#141B26] via-[#0C1018] to-[#141B26] border border-[#67E8F9]/60 p-6 relative overflow-hidden group shadow-[0_0_25px_rgba(103,232,249,0.2)] hover:border-[#A5F3FC] hover:shadow-[0_0_35px_rgba(165,243,252,0.3)] transition-all duration-300"
        >
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A5F3FC] font-semibold">
                  <Languages className="w-4 h-4 text-[#A5F3FC]" />
                  DIFFERENTIATOR
                </span>
                <span className="font-mono text-xs text-[#A5F3FC] font-bold">5 LANGUAGES</span>
              </div>
              <h3 className="text-lg font-space font-bold text-[#EEF2F7] mb-2">
                Multilingual Engineering
              </h3>
              <p className="text-[#8B96A8] text-xs leading-relaxed mb-4">
                Fluent global communication for international remote teams &amp; cross-border AI localization.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {['English (Fluent)', 'Arabic (Fluent)', 'Turkish (Fluent)', 'Amharic (Native)', 'Afaan Oromo (Native)'].map((lang, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium text-[#A5F3FC] bg-[#060810]/80 border border-[#A5F3FC]/30"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

