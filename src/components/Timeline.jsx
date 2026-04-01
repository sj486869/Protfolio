"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="c-space section-spacing" ref={containerRef}>
      <h2 className="text-heading">My Work Experience</h2>
      <div ref={ref} className="relative pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky z-40 flex flex-col items-center self-start max-w-xs md:flex-row top-40 lg:max-w-sm md:w-full">
              <div className="absolute flex items-center justify-center w-10 h-10 rounded-full -left-[15px] bg-midnight shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                <motion.div
                  className="w-4 h-4 p-2 border rounded-full bg-neutral-800 border-neutral-700"
                  whileInView={{
                    backgroundColor: "#5c33cc",
                    scale: 1.2,
                    boxShadow: "0 0 20px #5c33cc",
                  }}
                  viewport={{ once: false, amount: 0.5 }}
                />
              </div>
              <div className="flex-col hidden gap-1 md:flex md:pl-20">
                <p className="text-xl font-bold text-neutral-300">{item.date}</p>
                <h3 className="text-2xl font-black text-white">{item.title}</h3>
                <h4 className="text-lg font-medium text-lavender/80">
                  {item.job}
                </h4>
              </div>
            </div>

            <motion.div
              className="relative w-full p-6 pl-20 transition-all duration-500 rounded-2xl md:pl-4 glass-morphism hover:bg-white/10 group"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="block mb-6 md:hidden">
                <p className="text-lg font-bold text-neutral-300">{item.date}</p>
                <h3 className="text-xl font-black text-white">{item.title}</h3>
                <h4 className="text-md font-medium text-lavender/80">
                  {item.job}
                </h4>
              </div>
              <ul className="space-y-4">
                {item.contents.map((content, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-lavender shrink-0" />
                    <p className="font-normal leading-relaxed text-neutral-400 group-hover:text-neutral-300">
                      {content}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-1 left-1 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent via-neutral-800 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-royal via-lavender to-transparent rounded-full shadow-[0_0_10px_#5c33cc]"
          />
        </div>
      </div>
    </div>
  );
};
