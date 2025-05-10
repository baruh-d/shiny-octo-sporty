// import { type NextConfig } from "next";
// import withPWA from "next-pwa";

// type PWAConfig = {
//   dest: string;
//   disable: boolean;
//   register: boolean;
//   skipWaiting: boolean;
// };

// declare module "next-pwa" {
//   export default function withPWA(config: NextConfig & { pwa?: PWAConfig }): NextConfig;
// }

// const nextConfig: NextConfig = {
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   /* config options here */
//   pwa: {
//     dest: "public",
//     disable: process.env.NODE_ENV === "development",
//     register: true,
//     skipWaiting: true,
//   },
// };

// export default withPWA(nextConfig);

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // TEMPORARY - remove after build works
  },
  eslint: {
    ignoreDuringBuilds: true, // TEMPORARY - remove after build works
  },
  // Add this to ensure environment variables are available at runtime
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

// Define your security headers once
const securityHeaders = [
  // Basic protections
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // CSP - Adjust based on your needs
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' ${
        process.env.NODE_ENV === 'development' ? "'unsafe-eval'" : ""
      };
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: blob:;
      font-src 'self';
      connect-src 'self' https://*.supabase.co;
      frame-src 'none';
      media-src 'none';
    `.replace(/\s+/g, " ").trim(),
  },
  // HTTPS enforcement
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // XSS protection
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  // Permissions policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },

];

module.exports = nextConfig;