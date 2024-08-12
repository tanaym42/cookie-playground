import './global.css';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Navbar } from './components/nav';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SandpackCSS } from './blog/[slug]/sandpack';
import Script from 'next/script'
import { GoogleTagManager } from '@next/third-parties/google'


export const metadata: Metadata = {
  metadataBase: new URL('https://leerob.io'),
  title: {
    default: 'Cookie Playground',
    template: '%s | Lee Robinson',
  },
  description: 'Developer, writer, and creator.',
  openGraph: {
    title: 'Cookie playground',
    description: 'Developer, writer, and creator.',
    url: 'https://leerob.io',
    siteName: 'Cookie playground',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Lee Robinson',
    card: 'summary_large_image',
  },
  verification: {
    google: 'eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw',
    yandex: '14d2e73487fa6c71',
  },
};

const cx = (...classes) => classes.filter(Boolean).join(' ');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-[#111010]',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
    <head>

    <GoogleTagManager gtmId="GTM-PQV9QV44"/>

   
      
      {/* <Script async src="https://www.googletagmanager.com/gtag/js?id=G-TFP7T6EKG6" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-TFP7T6EKG6');
        `}  
      </Script> */}

    
      <script src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"  type="text/javascript" charSet="UTF-8" data-domain-script="0190e591-2d31-79cf-aa8c-8bf84f9788a9" ></script>
      <script type="text/javascript">
      function OptanonWrapper() { }
      </script>

    <SandpackCSS />
    </head>

      <body className="antialiased max-w-2xl mb-40 flex flex-col md:flex-row mx-4 mt-8 lg:mx-auto">

      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PQV9QV44"
      height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>


        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
      {/* <GoogleAnalytics gaId="G-TFP7T6EKG6" /> */}
    </html>
  );
}
