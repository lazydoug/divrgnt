"use client";

import { motion, AnimatePresence } from "motion/react";

export default function PortalTransition({ active }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="portal-glow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  );
}
