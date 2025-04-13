'use client'

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { 
  FaArrowRight, 
  FaAward, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaClock, 
  FaExternalLinkAlt 
} from "react-icons/fa";
import { IconType } from "react-icons";
import { MotionCard, MotionSection } from "@/components/motion-components";
import { PublicNavbar } from "@/app/components/public-navbar"

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Feature card component
interface FeatureCardProps {
  icon: IconType;
  title: string;
  description: string;
  content: string;
  index: number;
}

const FeatureCard = ({ icon: Icon, title, description, content, index }: FeatureCardProps) => (
  <MotionCard 
    className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all group"
    variants={fadeInUp}
    transition={{ delay: index * 0.1 }}
  >
    <CardHeader className="pb-2 relative overflow-hidden">
      <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all" />
      <div className="p-3 rounded-xl bg-primary/10 w-fit mb-3 relative z-10 group-hover:scale-110 transition-all">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <CardTitle className="text-xl font-semibold tracking-tight">{title}</CardTitle>
      <CardDescription className="text-sm">{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="leading-relaxed">{content}</p>
    </CardContent>
  </MotionCard>
);

// Event card component
interface EventCardProps {
  index: number;
  title: string;
  date: string;
  location: string;
  time: string;
}

const EventCard = ({ index, title, date, location, time }: EventCardProps) => (
  <MotionCard 
    className="overflow-hidden hover:shadow-lg transition-all group"
    variants={fadeInUp}
    transition={{ delay: index * 0.1 }}
  >
    <div className="relative h-48 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
      <Image
        src={`/placeholder.svg?height=400&width=600&text=Event+${index}`}
        alt={`Event ${index}`}
        fill
        className="object-cover transition-transform group-hover:scale-105"
      />
    </div>
    <CardHeader className="pb-2">
      <CardTitle className="group-hover:text-primary transition-colors text-lg font-medium">{title}</CardTitle>
      <CardDescription className="flex items-center gap-2">
        <FaCalendarAlt className="h-4 w-4 text-primary" /> {date}
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-2 pb-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <FaMapMarkerAlt className="h-4 w-4 flex-shrink-0" /> {location}
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <FaClock className="h-4 w-4 flex-shrink-0" /> {time}
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
        View Details <FaArrowRight className="ml-2 h-3 w-3" />
      </Button>
    </CardFooter>
  </MotionCard>
);

// Organization link component
interface OrganizationLinkProps {
  href: string;
  children: React.ReactNode;
}

const OrganizationLink = ({ href, children }: OrganizationLinkProps) => (
  <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center py-2 px-3 rounded-md hover:bg-muted transition-all hover:text-primary"
    >
      {children} <FaExternalLinkAlt className="ml-2 h-3 w-3" />
    </Link>
  </motion.li>
);

// Section heading component
interface SectionHeadingProps {
  children: React.ReactNode;
  subtitle?: string;
}

const SectionHeading = ({ children, subtitle }: SectionHeadingProps) => (
  <motion.div
    className="text-center mb-16"
    variants={fadeInUp}
  >
    <span className="text-primary text-sm uppercase tracking-wider font-medium mb-2 inline-block">
      {subtitle || ""}
    </span>
    <h2 className="text-3xl md:text-4xl font-light mb-3 leading-tight tracking-tight">
      <span className="font-medium">{children}</span>
    </h2>
    <div className="w-16 h-0.5 bg-primary mx-auto rounded-full"></div>
  </motion.div>
);

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <PublicNavbar />

      {/* Main Content */}
      {/* Hero Section with Background Image */}
      <motion.section 
        className="relative h-[650px] flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50 z-10" />
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Kenyan athletes running"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div 
              className="max-w-2xl text-white"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block text-primary font-semibold mb-2 tracking-wider">KENYA&apos;S PREMIER SPORTS PLATFORM</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4 leading-tight tracking-tight">
                Empowering <span className="font-semibold">Kenyan Sports</span> Excellence
              </h1>
              <p className="text-lg mb-8 text-white/80 leading-relaxed">
                A comprehensive platform connecting athletes, coaches, scouts, and administrators to nurture sporting
                talent across Kenya.
              </p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial="hidden"
                animate="visible"
                variants={staggerChildren}
              >
                <motion.div variants={fadeInUp}>
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/30 transition-all">
                    <Link href="/auth/signin">Sign In</Link>
                  </Button>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="bg-transparent backdrop-blur-sm text-white border-white hover:bg-white/10 transition-all"
                  >
                    <Link href="/auth/signup">Create Account</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div 
              className="hidden md:block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* Animation placeholder */}
              <div className="relative h-[400px] w-full rounded-xl overflow-hidden backdrop-blur-md bg-white/5 shadow-2xl border border-white/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white/50">Sports Hero Animation</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <MotionSection className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <SectionHeading subtitle="OUR PLATFORM">
            Transforming Kenyan Sports
          </SectionHeading>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <FeatureCard
              icon={FaUsers}
              title="Connect"
              description="Connect athletes with coaches and scouts across the country"
              content="Build your profile, showcase your talents, and get discovered by top coaches and scouts from Kenya and beyond."
              index={0}
            />
            <FeatureCard
              icon={FaAward}
              title="Develop"
              description="Access training resources and performance tracking"
              content="Track your progress, access personalized training plans, and receive feedback from professional coaches."
              index={1}
            />
            <FeatureCard
              icon={FaCalendarAlt}
              title="Compete"
              description="Discover events and competitions nationwide"
              content="Stay updated on upcoming events, register for competitions, and showcase your skills on the national stage."
              index={2}
            />
          </motion.div>
        </div>
      </MotionSection>

      {/* About Kenyan Sports */}
      <MotionSection className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div 
              className="md:w-1/2"
              variants={fadeInUp}
            >
              <span className="text-primary text-sm uppercase tracking-wider font-medium mb-2 inline-block">OUR HERITAGE</span>
              <h2 className="text-3xl font-light mb-4 leading-tight tracking-tight">
                Kenyan <span className="font-medium">Sports Excellence</span>
              </h2>
              <div className="w-16 h-0.5 bg-primary mb-6 rounded-full"></div>
              <p className="mb-4 text-lg">
                Kenya has established itself as a global powerhouse in athletics, producing world-class long-distance
                runners who have dominated international competitions for decades.
              </p>
              <p className="mb-4">
                Beyond athletics, Kenya is developing talent in rugby, football, volleyball, and many other sports,
                creating a diverse sporting culture that celebrates excellence and determination.
              </p>
              <p className="mb-6">
                Our platform aims to nurture this talent by providing the tools, connections, and resources needed to
                develop the next generation of Kenyan sports stars.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Button asChild className="group">
                  <Link href="/about">
                    Learn More About Us 
                    <FaArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
            <motion.div 
              className="md:w-1/2 relative h-[400px] rounded-xl overflow-hidden shadow-xl"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/placeholder.svg?height=800&width=1200"
                alt="Kenyan athletes celebrating"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </div>
        </div>
      </MotionSection>

      {/* Upcoming Events */}
      <MotionSection className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <SectionHeading subtitle="MARK YOUR CALENDAR">
            Upcoming National Events
          </SectionHeading>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <EventCard
              index={1}
              title="National Athletics Championship 2024"
              date="12-14 June, 2024"
              location="Kasarani Stadium, Nairobi"
              time="9:00 AM - 6:00 PM"
            />
            <EventCard
              index={2}
              title="National Athletics Championship 2025"
              date="14-16 June, 2025"
              location="Kasarani Stadium, Nairobi"
              time="9:00 AM - 6:00 PM"
            />
            <EventCard
              index={3}
              title="National Athletics Championship 2026"
              date="16-18 June, 2026"
              location="Kasarani Stadium, Nairobi"
              time="9:00 AM - 6:00 PM"
            />
          </motion.div>
          
          <motion.div 
            className="text-center mt-12"
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Button asChild variant="outline" className="group">
              <Link href="/events">
                View All Events 
                <FaArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </MotionSection>

      {/* Sports Organizations */}
      <MotionSection className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeading subtitle="OUR NETWORK">
            Sports Organizations
          </SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <MotionCard
              variants={fadeInUp}
              className="border-none shadow-lg hover:shadow-xl transition-all"
            >
              <CardHeader>
                <span className="text-primary text-xs uppercase tracking-wider font-medium mb-1 inline-block">NATIONAL</span>
                <CardTitle className="text-xl font-medium mb-1">National Organizations</CardTitle>
                <div className="w-12 h-0.5 bg-primary rounded-full mt-2"></div>
              </CardHeader>
              <CardContent>
                <motion.ul 
                  className="space-y-1"
                  variants={staggerChildren}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <OrganizationLink href="https://sportskenya.org/">
                    Ministry of Sports, Culture and Heritage
                  </OrganizationLink>
                  <OrganizationLink href="https://www.nock.or.ke/">
                    National Olympic Committee of Kenya
                  </OrganizationLink>
                  <OrganizationLink href="https://athletics-kenya.or.ke/">
                    Athletics Kenya
                  </OrganizationLink>
                  <OrganizationLink href="https://www.fkf.or.ke/">
                    Football Kenya Federation
                  </OrganizationLink>
                  <OrganizationLink href="https://www.kru.co.ke/">
                    Kenya Rugby Union
                  </OrganizationLink>
                </motion.ul>
              </CardContent>
            </MotionCard>
            
            <MotionCard
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="border-none shadow-lg hover:shadow-xl transition-all"
            >
              <CardHeader>
                <span className="text-primary text-xs uppercase tracking-wider font-medium mb-1 inline-block">GLOBAL</span>
                <CardTitle className="text-xl font-medium mb-1">International Organizations</CardTitle>
                <div className="w-12 h-0.5 bg-primary rounded-full mt-2"></div>
              </CardHeader>
              <CardContent>
                <motion.ul 
                  className="space-y-1"
                  variants={staggerChildren}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <OrganizationLink href="https://www.olympic.org/">
                    International Olympic Committee
                  </OrganizationLink>
                  <OrganizationLink href="https://www.fifa.com/">
                    FIFA
                  </OrganizationLink>
                  <OrganizationLink href="https://www.worldathletics.org/">
                    World Athletics
                  </OrganizationLink>
                  <OrganizationLink href="https://www.world.rugby/">
                    World Rugby
                  </OrganizationLink>
                  <OrganizationLink href="https://www.fiba.basketball/">
                    FIBA
                  </OrganizationLink>
                </motion.ul>
              </CardContent>
            </MotionCard>
          </div>
        </div>
      </MotionSection>

      {/* CTA Section */}
      <MotionSection 
        className="py-24 bg-card text-card-foreground border-y border-border relative overflow-hidden"
        delay={0.2}
      >
        {/* Subtle animated accents */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-primary/5"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-accent/5"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto bg-background border border-border rounded-2xl p-10 shadow-lg"
            variants={fadeInUp}
          >
            <motion.div
              className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-6 py-1 rounded-full text-sm font-medium"
              variants={fadeInUp}
            >
              Join Today
            </motion.div>
            
            <motion.h2 
              className="text-3xl md:text-4xl font-light mb-6 text-foreground"
              variants={fadeInUp}
            >
              Join the Kenyan <span className="font-medium">Sports Revolution</span>
            </motion.h2>
            
            <motion.p 
              className="text-lg mb-8 mx-auto text-muted-foreground"
              variants={fadeInUp}
            >
              Whether you&apos;re an athlete looking to showcase your talent, a coach seeking promising prospects, or a scout
              searching for the next big star, our platform has everything you need.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeInUp} whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 400 }}>
                <Button asChild size="lg" variant="default" className="px-8">
                  <Link href="/auth/signup">
                    <span className="flex items-center gap-2">
                      Create Account
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </span>
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div variants={fadeInUp} whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 400 }}>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline"
                  className="px-8"
                >
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.p 
              className="mt-6 text-sm text-muted-foreground"
              variants={fadeInUp}
            >
              Already helping over 5,000+ athletes across Kenya
            </motion.p>
          </motion.div>
        </div>
      </MotionSection>
    </div>
  );
}