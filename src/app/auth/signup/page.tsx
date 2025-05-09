import type { Metadata } from "next";
import { AuthClientWrapper } from '@/app/components/auth/auth-client-wrapper';
import { constructMetadata } from '@/lib/utils/metadata';

export const generateMetadata = (): Metadata => {
  return constructMetadata({
    title: "Sign Up | Sports Academy Hub",
    description: "Create your free account to access athlete tracking, coaching tools, and scouting resources",
    keywords: [
      "sports registration", 
      "athlete sign up", 
      "coach registration",
      "scout account",
      "sports management platform"
    ],
    canonicalPath: "/auth/signup",
    openGraphImages: [
      {
        url: "/images/signup-og.jpg",
        width: 1200,
        height: 630,
        alt: "Sports Academy Hub Registration",
      }
    ]
  });
};

interface SignUpPageProps {
  searchParams?: {
    referral?: string;
    role?: 'athlete' | 'coach' | 'scout';
  };
}

export default function SignUpPage({ searchParams }: SignUpPageProps) {
  return (
    <AuthClientWrapper 
      type="signup" 
      title="Join Our Sports Community"
      description={
        searchParams?.role 
          ? `Create your ${searchParams.role} account to get started`
          : "Register as an athlete, coach, or scout to access specialized features"
      }
      initialRole={searchParams?.role}
      referralCode={searchParams?.referral}
    />
  );
}