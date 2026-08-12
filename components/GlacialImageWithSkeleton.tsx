'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, RefreshCw, AlertCircle } from 'lucide-react';

interface GlacialImageWithSkeletonProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string; // e.g. "aspect-video" or "aspect-[16/9]"
  fallbackComponent?: React.ReactNode;
  fallbackText?: string;
}

export default function GlacialImageWithSkeleton({
  src,
  alt,
  className = '',
  containerClassName = '',
  aspectRatio = 'aspect-video',
  fallbackComponent,
  fallbackText = 'Image Preview Unavailable',
}: GlacialImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-[#060810] ${aspectRatio} ${containerClassName}`}
    >
      {/* Pulse Skeleton State using --signal-ice-dim */}
      <AnimatePresence>
        {!isLoaded && !hasError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 bg-[var(--signal-ice-dim)] animate-pulse border border-[#67E8F9]/20"
            style={{
              backgroundColor: 'var(--signal-ice-dim, rgba(103, 232, 249, 0.1))',
            }}
          >
            {/* Shimmer line effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#67E8F9]/15 to-transparent animate-shimmer" />

            {/* Skeleton visual placeholder lines */}
            <div className="w-full max-w-sm space-y-3 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#67E8F9] animate-ping" />
                  <span className="text-[10px] font-mono font-bold text-[#67E8F9] uppercase tracking-wider">
                    // PREVIEW_LOADING...
                  </span>
                </div>
                <span className="text-[9px] font-mono text-[#8B96A8]">GLACIAL_FETCH</span>
              </div>

              {/* Skeleton Mockup Wireframe Bars */}
              <div className="h-2.5 w-3/4 bg-[#67E8F9]/20 rounded-full" />
              <div className="h-2 w-1/2 bg-[#67E8F9]/15 rounded-full" />

              <div className="pt-4 flex items-center justify-center gap-2 text-[#8B96A8]">
                <ImageIcon className="w-5 h-5 text-[#67E8F9] animate-bounce" />
                <span className="text-xs font-mono text-[#8B96A8]/80">Rendering High-Res Preview</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Fallback State */}
      {hasError ? (
        fallbackComponent ? (
          <div className="w-full h-full flex items-center justify-center">
            {fallbackComponent}
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#0C1018] text-center border border-[#EF4444]/30 text-[#8B96A8]">
            <AlertCircle className="w-6 h-6 text-[#EF4444] mb-2" />
            <span className="text-xs font-mono font-bold text-[#EEF2F7]">{fallbackText}</span>
            <span className="text-[10px] font-mono text-[#8B96A8] mt-1">
              Check network connection or fallback to vector mode
            </span>
          </div>
        )
      ) : (
        /* Actual External Image */
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
        />
      )}
    </div>
  );
}
