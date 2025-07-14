import React from "react";

import Image from "next/image";
import { motion } from "framer-motion";

const Load = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          y: [0, -20, 0],
          opacity: 1,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
          opacity: {
            duration: 0.5,
            ease: "easeIn",
          },
        }}
      >
        <Image width={100} height={100} src="/icons/favicon.png" alt="" />
      </motion.div>
    </div>
  );
};

export default Load;
