import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { seo, site } from '@/content/site';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { RevealController } from '@/components/layout/RevealController';
import { SiteBackground } from '@/components/background/SiteBackground';
import './globals.css';

/**
 * Inter Variable, self-hosted from app/fonts.
 *
 * Not next/font/google: that fetches at build time and adds a third-party
 * dependency to a site that otherwise has none. One 48KB woff2 covering
 * weights 100–900, latin subset, zero external requests, zero layout shift.
 */
const inter = localFont({
  src: './fonts/InterVariable.woff2',
  variable: '--font-inter',
  display: 'swap',
  weight: '100 900',
  preload: true,
  fallback: [
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: seo.title,
    template: seo.titleTemplate,
  },
  description: seo.description,
  keywords: [...seo.keywords],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: 'website',
    siteName: seo.title,
    title: seo.title,
    description: seo.description,
    url: site.url,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#070B14',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-dvh antialiased">
        <SiteBackground />
        <Nav />
        <RevealController />

        <main id="main" className="relative">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
