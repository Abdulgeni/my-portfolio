import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import GlobalExtensionGuard from '@/components/GlobalExtensionGuard';
import { ThemeProvider } from '@/lib/ThemeContext';
import { LanguageProvider } from '@/lib/LanguageContext';
import ClickRipple from '@/components/ClickRipple';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://abdulgeni-abdulaziz.vercel.app'),
  title: 'Abdulgeni Abdulaziz — Full Stack AI Engineer',
  description:
    'Full Stack AI Engineer based in Addis Ababa, Ethiopia. RAG pipelines, production chatbots, SaaS platforms, and Model Context Protocol (MCP) servers.',
  openGraph: {
    title: 'Abdulgeni Abdulaziz — Full Stack AI Engineer',
    description:
      'Live AI Engineer portfolio featuring real-time WebGL neural background, embedded Gemini AI assistant, system architecture bento grid, and case studies.',
    type: 'website',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} dark scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('theme');
                  if (t === 'light' || (!t && window.matchMedia('(prefers-color-scheme: light)').matches)) {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}

                function isExtErr(err) {
                  if (!err) return false;
                  var str = '';
                  if (typeof err === 'string') { str = err; }
                  else if (err && err.message) { str = (err.message || '') + ' ' + (err.stack || '') + ' ' + (err.name || ''); }
                  else { try { str = JSON.stringify(err); } catch(e) { str = String(err); } }
                  var lower = str.toLowerCase();
                  return lower.indexOf('metamask') !== -1 ||
                         lower.indexOf('ethereum') !== -1 ||
                         lower.indexOf('web3') !== -1 ||
                         lower.indexOf('wallet') !== -1 ||
                         lower.indexOf('failed to connect') !== -1 ||
                         lower.indexOf('error 0') !== -1 ||
                         lower.indexOf('eip-1193') !== -1 ||
                         lower.indexOf('coinbase') !== -1 ||
                         lower.indexOf('phantom') !== -1 ||
                         lower.indexOf('solana') !== -1 ||
                         lower.indexOf('chrome-extension') !== -1 ||
                         lower.indexOf('moz-extension') !== -1 ||
                         lower.indexOf('inpage.js') !== -1;
                }

                window.addEventListener('unhandledrejection', function(e) {
                  if (isExtErr(e.reason)) {
                    e.preventDefault();
                    if (e.stopPropagation) e.stopPropagation();
                    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
                  }
                }, true);

                window.addEventListener('error', function(e) {
                  if (isExtErr(e.error) || isExtErr(e.message)) {
                    e.preventDefault();
                    if (e.stopPropagation) e.stopPropagation();
                    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
                  }
                }, true);

                var origError = console.error;
                console.error = function() {
                  for (var i = 0; i < arguments.length; i++) {
                    if (isExtErr(arguments[i])) return;
                  }
                  origError.apply(console, arguments);
                };

                var origWarn = console.warn;
                console.warn = function() {
                  for (var i = 0; i < arguments.length; i++) {
                    if (isExtErr(arguments[i])) return;
                  }
                  origWarn.apply(console, arguments);
                };
              })();
            `,
          }}
        />
      </head>
      <body className="bg-[#060810] text-[#EEF2F7] antialiased selection:bg-[#67E8F9]/30 selection:text-[#A5F3FC]" suppressHydrationWarning>
        <LanguageProvider>
          <ThemeProvider>
            <GlobalExtensionGuard />
            <ClickRipple />
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

