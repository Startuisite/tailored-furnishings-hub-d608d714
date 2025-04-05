
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ContactButtonProps {
  children: ReactNode;
  isOpen: boolean;
  onClick: () => void;
  isPulsing?: boolean;
  className?: string;
}

const ContactButton = ({ 
  children, 
  isOpen, 
  onClick, 
  isPulsing = false,
  className
}: ContactButtonProps) => {
  return (
    <Button
      size="icon"
      onClick={onClick}
      className={cn(
        "relative rounded-full shadow-lg z-10",
        isPulsing && !isOpen ? "animate-pulse" : "",
        className
      )}
    >
      <motion.div
        animate={{ rotate: isOpen ? 0 : 360 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </Button>
  );
};

export default ContactButton;
