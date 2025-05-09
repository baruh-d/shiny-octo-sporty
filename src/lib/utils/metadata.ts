// lib/utils/metadata.ts
import type { Metadata } from "next";

interface OpenGraphImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

interface MetadataOptions {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath?: string;
  noIndex?: boolean;
  openGraphImages?: OpenGraphImage[];
  twitterCardType?: 'summary' | 'summary_large_image' | 'app' | 'player';
}

export function constructMetadata({
  title,
  description,
  keywords = [],
  canonicalPath = "",
  noIndex = false,
  openGraphImages = [],
  twitterCardType = 'summary_large_image'
}: MetadataOptions): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sportsacademyhub.com';
  const defaultImage = {
    url: `${baseUrl}/images/default-og.jpg`,
    width: 1200,
    height: 630,
    alt: 'Sports Academy Hub',
  };

  const images = openGraphImages.length > 0 ? openGraphImages : [defaultImage];

  return {
    title,
    description,
    keywords: ['sports management', 'athlete development', ...keywords],
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}${canonicalPath}`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}${canonicalPath}`,
      siteName: "Sports Academy Hub",
      images: images.map(img => ({
        url: img.url.startsWith('http') ? img.url : `${baseUrl}${img.url}`,
        width: img.width,
        height: img.height,
        alt: img.alt || title,
      })),
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: twitterCardType,
      title,
      description,
      creator: '@sportsacademyhub',
      images: images.map(img => ({
        url: img.url.startsWith('http') ? img.url : `${baseUrl}${img.url}`,
        width: img.width,
        height: img.height,
        alt: img.alt || title,
      })),
    },
    robots: noIndex ? {
      index: false,
      follow: false,
    } : {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      }
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
      other: [
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          url: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          url: '/favicon-16x16.png',
        },
      ],
    },
  };
}