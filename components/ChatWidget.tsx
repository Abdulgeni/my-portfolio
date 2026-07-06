"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../lib/types';
import { useLanguage } from '../context/LanguageContext';

export default function ChatWidget() {
  const { isRtl, language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize welcome messages on first open or language change (if no user interaction yet)
  useEffect(() => {
    if (isOpen) {
      setMessages((prev) => {
        const isInitialState = prev.length === 0 || 
          (prev.length === 2 && prev[0].id === 'welcome-1' && prev[1].id === 'welcome-2');
          
        if (isInitialState) {
          return [
            {
              id: 'welcome-1',
              role: 'model',
              text: t('ui.chatWelcome1'),
              timestamp: new Date().toLocaleTimeString(),
            },
            {
              id: 'welcome-2',
              role: 'model',
              text: t('ui.chatWelcome2'),
              timestamp: new Date().toLocaleTimeString(),
            }
          ];
        }
        return prev;
      });
    }
  }, [isOpen, language]);

  // Scroll to bottom whenever messages list changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (isOpen && !isLoading) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [messages, isLoading, isOpen]);

  // Global Remote Control Event Listeners
  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    window.addEventListener('toggle-chat', handleToggle);
    window.addEventListener('open-chat', handleOpen);
    window.addEventListener('close-chat', handleClose);

    return () => {
      window.removeEventListener('toggle-chat', handleToggle);
      window.removeEventListener('open-chat', handleOpen);
      window.removeEventListener('close-chat', handleClose);
    };
  }, []);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessageText = inputValue.trim();
    setInputValue('');
    
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      text: userMessageText,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const chatHistory = messages
        .filter(m => !m.id.startsWith('welcome'))
        .map(m => ({
          role: m.role,
          text: m.text
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessageText,
          history: chatHistory,
          // We can also pass the active language to the chatbot API so it replies in the correct script!
          language: language,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const modelMsg: ChatMessage = {
          id: `msg-${Date.now()}-model`,
          role: 'model',
          text: data.text || (isRtl ? 'لم يتم إرجاع أي استجابة من المساعد.' : 'No response returned from assistant.'),
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, modelMsg]);
      } else {
        const data = await res.json();
        throw new Error(data.error || 'Server error');
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      const errMsg: ChatMessage = {
        id: `msg-${Date.now()}-err`,
        role: 'model',
        text: `${isRtl ? 'خطأ' : 'Error'}: ${err.message || (isRtl ? 'فشل الاتصال بوحدة الذكاء الاصطناعي الأساسية.' : 'Failed to establish connection to core AI module.')}`,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed bottom-6 ${isRtl ? 'left-6 items-start' : 'right-6 items-end'} z-50 flex flex-col`}>
      
      {/* 1. Chat Panel Overlay (Open State) */}
      <div
        id="chat-widget"
        role="dialog"
        aria-label="Portfolio AI Assistant"
        aria-hidden={!isOpen}
        className={`w-[340px] bg-surface border border-border flex flex-col transition-all duration-150 ease-out select-none rounded-2xl shadow-2xl overflow-hidden ${
          isOpen 
            ? 'h-[min(480px,70vh)] opacity-100 mb-4 visible pointer-events-auto' 
            : 'h-0 opacity-0 mb-0 invisible pointer-events-none'
        }`}
        style={{ contentVisibility: isOpen ? 'auto' : 'hidden' }}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-3 border-b border-border font-mono text-[10px] bg-surface-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <span className="text-text-3 font-semibold tracking-wider" id="chat-header-title">
            [ {t('ui.chatTitle')} ]
          </span>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close Chat"
            className="text-text-3 hover:text-accent font-bold cursor-pointer focus:outline-none"
          >
            [ × ]
          </button>
        </div>

        {/* Messages Body */}
        <div 
          className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-[12px] scrollbar-thin"
          role="log"
          aria-live="polite"
        >
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                {isUser ? (
                  <div className={`max-w-[85%] bg-surface-2 border border-border p-2.5 text-text-1 rounded-xl ${isRtl ? 'text-right' : 'text-left'}`}>
                    {msg.text}
                  </div>
                ) : (
                  <div className={`text-text-2 leading-relaxed ${isRtl ? 'text-right' : 'text-left'}`}>
                    <span className={`text-accent font-semibold ${isRtl ? 'ml-1' : 'mr-1'}`} aria-hidden="true">
                      {isRtl ? ' <' : '> '}
                    </span>
                    {msg.text}
                  </div>
                )}
              </div>
            );
          })}
          
          {/* Loading status */}
          {isLoading && (
            <div className={`flex items-center text-text-3 ${isRtl ? 'flex-row-reverse' : ''}`} aria-live="assertive">
              <span className={`text-accent font-semibold ${isRtl ? 'ml-1' : 'mr-1'}`} aria-hidden="true">
                {isRtl ? ' <' : '> '}
              </span>
              <span>{t('ui.chatComputing')}</span>
              <span className="text-accent cursor-blink ml-1">...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form Footer */}
        <form onSubmit={handleSend} className={`border-t border-border flex items-center p-2 bg-surface-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <span className="font-mono text-[12px] text-accent font-semibold px-1 select-none" aria-hidden="true">
            {isRtl ? '؟' : '$'}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading || !isOpen}
            className={`flex-1 mx-2 bg-transparent border-none text-text-1 font-mono text-[12px] focus:outline-none placeholder-text-3 ${isRtl ? 'text-right' : 'text-left'}`}
            placeholder={t('ui.chatPlaceholder')}
            aria-label="Ask assistant a question"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            aria-label="Send message"
            className="px-3 py-1 font-mono text-[11px] font-semibold border border-border text-text-2 hover:border-accent hover:text-accent transition-colors duration-100 disabled:opacity-30 disabled:hover:border-border disabled:hover:text-text-2 cursor-pointer focus:outline-none rounded-lg"
          >
            {isRtl ? '[ ← ]' : '[ → ]'}
          </button>
        </form>
      </div>

      {/* 2. Floating Action Button (FAB) */}
      <div className="relative font-mono">
        {/* Tooltip */}
        {showTooltip && !isOpen && (
          <div className={`absolute bottom-[56px] ${isRtl ? 'left-0' : 'right-0'} bg-surface border border-accent/30 text-accent text-[9px] font-semibold px-2 py-1 uppercase tracking-wider whitespace-nowrap shadow-none select-none z-50 rounded-lg`}>
            [ {t('ui.chatTooltip')} ]
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="w-12 h-12 flex items-center justify-center bg-bg border border-accent hover:border-accent-dim text-accent transition-all duration-100 focus:outline-none relative cursor-pointer rounded-2xl z-40 select-none shadow-lg hover:shadow-accent/10"
          aria-label="Toggle assistant chat"
          aria-expanded={isOpen}
          aria-controls="chat-widget"
        >
          {/* Pulsing indicator */}
          {!isOpen && (
            <span className={`absolute -top-1 ${isRtl ? '-left-1' : '-right-1'} flex h-2 w-2`}>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          )}
          
          <span className="text-[14px] font-bold">
            {isOpen ? '[ X ]' : '> _'}
          </span>
        </button>
      </div>

    </div>
  );
}
