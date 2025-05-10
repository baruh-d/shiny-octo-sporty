'use client';

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

// Updated to use motion.create() instead of motion()
export const MotionCard = motion.create(Card);

interface MotionSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const MotionSection: React.FC<MotionSectionProps> = ({ 
  children, 
  className, 
  delay = 0 
}) => (
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay }}
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }}
    className={className}
  >
    {children}
  </motion.section>
);

// Additional reusable motion components
interface MotionDivProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
}

export const MotionDiv: React.FC<MotionDivProps> = ({
  children,
  className,
  delay = 0,
  yOffset = 20
}) => (
  <motion.div
    initial={{ opacity: 0, y: yOffset }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

// Fade-in component
export const MotionFadeIn = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className={className}
  >
    {children}
  </motion.div>
);