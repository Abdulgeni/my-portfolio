'use client';

import { useEffect } from 'react';

export default function GlobalExtensionGuard() {
  useEffect(() => {
    const isExtensionError = (err: unknown): boolean => {
      if (!err) return false;
      let str = '';
      if (typeof err === 'string') {
        str = err;
      } else if (err instanceof Error) {
        str = `${err.name} ${err.message} ${err.stack || ''}`;
      } else if (typeof err === 'object') {
        try {
          str = `${JSON.stringify(err)} ${String((err as { message?: string }).message || '')} ${String((err as { reason?: string }).reason || '')} ${String((err as { details?: string }).details || '')}`;
        } catch {
          str = String(err);
        }
      } else {
        str = String(err);
      }

      const lower = str.toLowerCase();
      return (
        lower.includes('metamask') ||
        lower.includes('ethereum') ||
        lower.includes('web3') ||
        lower.includes('wallet') ||
        lower.includes('user rejected') ||
        lower.includes('failed to connect') ||
        lower.includes('error 0') ||
        lower.includes('rpc error') ||
        lower.includes('eip-1193') ||
        lower.includes('coinbase') ||
        lower.includes('phantom') ||
        lower.includes('solana') ||
        lower.includes('chrome-extension') ||
        lower.includes('moz-extension') ||
        lower.includes('inpage.js')
      );
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (isExtensionError(event.reason)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const handleError = (event: ErrorEvent) => {
      if (isExtensionError(event.error) || isExtensionError(event.message)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const originalConsoleError = console.error;
    console.error = (...args: unknown[]) => {
      if (args.some((arg) => isExtensionError(arg))) {
        return;
      }
      originalConsoleError.apply(console, args);
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection, true);
    window.addEventListener('error', handleError, true);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection, true);
      window.removeEventListener('error', handleError, true);
      console.error = originalConsoleError;
    };
  }, []);

  return null;
}


