import postgres from 'postgres';

export const sql = postgres(process.env.POSTGRES_URL, {
  ssl: 'allow',
});

const nextConfig = {
  experimental: {
    ppr: false,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  transpilePackages: ['next-mdx-remote'],
  async redirects() {
    if (!process.env.POSTGRES_URL) {
      return [];
    }

    let redirects = await sql`
      SELECT source, destination, permanent
      FROM redirects;
    `;

    return redirects.map(({ source, destination, permanent }) => ({
      source,
      destination,
      permanent: !!permanent,
    }));
  },
  headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

const ContentSecurityPolicy = `
    default-src 'self' vercel.live;
    script-src 'self' https://www.googletagmanager.com/ https://*.googletagmanager.com https://tagmanager.google.com 'unsafe-eval' 'unsafe-inline' * https://privacyportal-uat-cdn.onetrust.com www.googletagmanager.com/ https://www.googletagmanager.com/ https://*.googletagmanager.com https://tagmanager.google.com cdn.cookielaw.org cdn.vercel-insights.com vercel.live va.vercel-scripts.com;
    script-src-elem * 'unsafe-inline' https://www.googletagmanager.com/ https://*.googletagmanager.com https://tagmanager.google.com;
    style-src 'self' 'unsafe-inline';
    img-src * https://www.googletagmanager.com blob: data:;
    media-src 'none';
    connect-src * https://www.googletagmanager.com;
    font-src 'self' data:;
    frame-src 'self' *.codesandbox.io vercel.live https://www.youtube.com https://www.youtube-nocookie.com https://www.googletagmanager.com/;
`;

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

export default nextConfig;
