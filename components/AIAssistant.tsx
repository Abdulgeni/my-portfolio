'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Send, Bot, Sparkles, User, RefreshCw, AlertCircle } from 'lucide-react';
import { staggerContainer, revealItem, revealScale } from '@/lib/animations';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const SUGGESTED_PROMPTS = [
  "What has he built with RAG?",
  "Is he available for remote work?",
  "Summarize his WhatsApp bot project",
  "What languages does he speak?"
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "SYSTEM INITIALIZED. I am Abdulgeni's Neural Interface Agent.\nAsk me anything about his RAG pipelines, production projects, engineering stack, or availability for remote work.",
      timestamp: 'ONLINE',
    },
  ]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  const handleSend = async (promptText?: string) => {
    const textToSend = promptText || input;
    if (!textToSend.trim() || isGenerating) return;

    const msgIndex = messages.length;
    const userMsgId = `user_msg_${msgIndex}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsGenerating(true);
    setError(null);

    const assistantMsgId = `assistant_msg_${msgIndex + 1}`;
    const initialAssistantMsg: ChatMessage = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, initialAssistantMsg]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }

      if (!response.body) {
        throw new Error('No response body stream received');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let currentStreamedText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        currentStreamedText = currentStreamedText + chunk;
        const nextContent = currentStreamedText;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId
              ? { ...msg, content: nextContent }
              : msg
          )
        );
      }
    } catch (err: unknown) {
      console.error('Chat error:', err);
      setError('Connection interrupted. Switched to offline backup response.');
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId && !msg.content
            ? {
                ...msg,
                content:
                  "Abdulgeni is a Full Stack AI Engineer specializing in RAG architectures (LangChain/ChromaDB), Next.js SaaS products, WhatsApp bots, and MCP servers. He is available for remote contract work! Contact him at abdulgeniabdulaziz@gmail.com.",
              }
            : msg
        )
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: "SYSTEM REBOOT COMPLETE. I am ready for your questions regarding Abdulgeni's work.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setError(null);
  };

  return (
    <motion.section
      id="ai-assistant"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10"
    >
      {/* Section Header */}
      <motion.div variants={revealItem} className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#67E8F9] font-bold tracking-wider uppercase mb-2 glow-text-ice">
            <Sparkles className="w-4 h-4 text-[#67E8F9]" />
            <span>LIVE EMBEDDED NEURAL MODEL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-space font-bold text-[#EEF2F7]">
            {"// Ask my AI anything about my work"}
          </h2>
        </div>
        <p className="text-sm text-[#8B96A8] max-w-md font-mono">
          RAG-backed conversational interface trained directly on Abdulgeni&apos;s architecture data &amp; system metrics.
        </p>
      </motion.div>

      {/* Terminal Container Panel - Reserved Signal Pulse Red Border */}
      <motion.div
        variants={revealScale}
        className="relative rounded-2xl bg-[#0C1018] border border-[#EF4444]/40 shadow-[0_0_35px_rgba(239,68,68,0.18)] overflow-hidden"
      >
        {/* Terminal Header Chrome Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#141B26] border-b border-[#141B26] select-none">
          <div className="flex items-center gap-2">
            {/* Custom Status Indicator Lights - Reserved Signal Pulse Red System Light */}
            <span className="w-3 h-3 rounded-full bg-[#EF4444] border border-[#EF4444] shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
            <span className="w-3 h-3 rounded-full bg-[#67E8F9]/80 border border-[#67E8F9]" />
            <span className="w-3 h-3 rounded-full bg-[#A5F3FC]/80 border border-[#A5F3FC]" />
            <span className="ml-3 font-mono text-xs text-[#8B96A8] flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#EF4444]" />
              abdulgeni-ai-kernel v2.6.0
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/40 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-ping" />
              ONLINE
            </span>
            <button
              onClick={handleReset}
              className="p-1 text-[#8B96A8] hover:text-[#EEF2F7] transition-colors rounded hover:bg-[#141B26]"
              title="Reset terminal session"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Terminal Output Log Area */}
        <div className="p-4 sm:p-6 min-h-[320px] max-h-[480px] overflow-y-auto space-y-4 font-mono text-sm scanline bg-[#060810]">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex flex-col ${
                msg.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div className="flex items-center gap-2 mb-1 text-[11px] text-[#4A5262]">
                {msg.role === 'user' ? (
                  <>
                    <span>visitor@client:~$</span>
                    <User className="w-3 h-3 text-[#67E8F9]" />
                  </>
                ) : (
                  <>
                    <Bot className="w-3.5 h-3.5 text-[#EF4444]" />
                    <span>ai@abdulgeni-kernel:~$</span>
                  </>
                )}
                <span suppressHydrationWarning>[{msg.timestamp}]</span>
              </div>

              <div
                className={`p-3.5 rounded-xl max-w-[88%] sm:max-w-[80%] leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-[#141B26] text-[#EEF2F7] border border-[#67E8F9]/40 shadow-[0_0_12px_rgba(103,232,249,0.15)]'
                    : 'bg-[#060810] text-[#EEF2F7] border border-[#EF4444]/35 shadow-[0_0_15px_rgba(239,68,68,0.12)]'
                }`}
              >
                {msg.content || (
                  <span className="inline-flex items-center gap-1 text-[#EF4444]">
                    <span>Synthesizing response...</span>
                    <span className="w-1.5 h-4 bg-[#EF4444] animate-cursor-blink ml-1" />
                  </span>
                )}
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Error notification if any */}
        {error && (
          <div className="px-4 py-2 bg-[#EF4444]/10 border-t border-[#EF4444]/30 text-xs font-mono text-[#EF4444] flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Suggested Prompt Chips */}
        <div className="px-4 py-3 bg-[#060810] border-t border-[#141B26] flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-[#4A5262] mr-1 hidden sm:inline">PROMPT_TEMPLATES:</span>
          {SUGGESTED_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              disabled={isGenerating}
              className="text-xs font-mono text-[#8B96A8] hover:text-[#060810] bg-[#141B26] hover:bg-[#67E8F9] border border-white/5 hover:border-[#67E8F9] px-3 py-1 rounded-lg transition-all duration-200 disabled:opacity-50 text-left font-medium"
            >
              &gt; {prompt}
            </button>
          ))}
        </div>

        {/* Terminal Input Bar */}
        <div className="p-4 bg-[#141B26] border-t border-[#141B26] flex items-center gap-3">
          <span className="font-mono text-sm text-[#67E8F9] font-black select-none">&gt;</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your question for Abdulgeni's AI assistant..."
            disabled={isGenerating}
            className="flex-1 bg-transparent border-none text-sm font-mono text-[#EEF2F7] placeholder-[#4A5262] focus:outline-none focus:ring-0"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isGenerating}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#67E8F9] to-[#A5F3FC] hover:brightness-110 disabled:bg-[#060810] disabled:from-transparent disabled:to-transparent text-[#060810] font-mono text-xs font-bold transition-all duration-200 shadow-[0_0_15px_rgba(103,232,249,0.4)] disabled:shadow-none"
          >
            <span>[ TRANSMIT ]</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </motion.section>
  );
}
