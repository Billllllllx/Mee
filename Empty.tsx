import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Empty component
export function Empty({ message = "Coming soon" }) {
  return (
    <motion.div 
      className={cn("flex h-full items-center justify-center")} 
      onClick={() => toast(message)}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <span className="text-white/60 text-lg">{message}</span>
    </motion.div>
  );
}