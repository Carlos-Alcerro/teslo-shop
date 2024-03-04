"use client";
import { motion, AnimatePresence } from "framer-motion";

export function TransitionPage() {
  return (
    <AnimatePresence mode="wait">
      <div>
        <motion.div
          className="fixed w-screen h-screen z-30 top-0 bottom-0 right-full bg-blue-500"
          variants={transitionsVariantPage}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
        ></motion.div>
        <motion.div
          className="fixed w-screen h-screen z-20 top-0 bottom-0 right-full bg-blue-300/85 opacity-50"
          variants={transitionsVariantPage}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ delay: 0.4, duration: 0.6, ease: "easeInOut" }}
        ></motion.div>
      </div>
    </AnimatePresence>
  );
}

const transitionsVariantPage = {
  initial: {
    x: "100%",
    width: "100%",
  },
  animate: {
    x: "0%",
    width: "0%",
  },
  exit: {
    x: ["0%", "100%"],
    width: ["0%", "100%"],
  },
};
