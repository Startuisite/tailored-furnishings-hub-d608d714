
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ContactButtonProps {
  isOpen: boolean;
  onClick: () => void;
  isPulsing: boolean;
  children: ReactNode;
}

const ContactButton = ({ isOpen, onClick, isPulsing, children }: ContactButtonProps) => {
  return (
    <motion.div
      animate={{
        scale: isPulsing ? [1, 1.1, 1] : 1,
        boxShadow: isPulsing ? "0px 0px 8px 4px rgba(155, 135, 245, 0.6)" : "0px 0px 0px 0px rgba(155, 135, 245, 0)"
      }}
      transition={{
        scale: { duration: 0.6, ease: "easeInOut" },
        boxShadow: { duration: 0.6, ease: "easeInOut" }
      }}
    >
      <Button
        size="lg"
        className={`rounded-full shadow-lg transition-colors ${
          isOpen 
            ? "bg-accent text-accent-foreground" 
            : "bg-[#9b87f5] text-white hover:bg-[#8a70fa]"
        } hover:scale-110 transition-transform transform relative`}
        onClick={onClick}
      >
        {children}
      </Button>
    </motion.div>
  );
};

export default ContactButton;
