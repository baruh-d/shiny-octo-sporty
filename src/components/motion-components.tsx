// filepath: /home/baru/Documents/projects/sports/my-sports-app/src/components/MotionComponents.tsx
'use client';

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export const MotionCard = motion(Card);

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