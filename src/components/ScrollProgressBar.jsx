import { motion, useScroll } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed left-0 top-0 z-[9999] h-1 origin-left bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
      style={{
        scaleX: scrollYProgress,
      }}
    />
  );
}
