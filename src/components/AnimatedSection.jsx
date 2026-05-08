import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  const initial =
    direction === "left"
      ? { opacity: 0, x: -40 }
      : direction === "right"
      ? { opacity: 0, x: 40 }
      : direction === "fade"
      ? { opacity: 0 }
      : { opacity: 0, y: 40 };

  const animate = inView
    ? direction === "fade"
      ? { opacity: 1 }
      : { opacity: 1, x: 0, y: 0 }
    : initial;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.65, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger container helper
export function StaggerContainer({ children, className = "", staggerDelay = 0.1 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
