"use client";

import { useState, useEffect, useRef, FunctionComponent } from "react";
import { motion, Variants } from "framer-motion";
import StarBorder from './StarBorder/StarBorder';
import { X, ArrowUpRight } from "lucide-react";

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay, duration: 0.5, ease: "easeOut" },
    }),
};

const pathVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (delay: number) => ({
        pathLength: 1,
        opacity: 1,
        transition: { delay, duration: 1.5, ease: "easeInOut" },
    }),
};

interface PathState {
    path1: string;
    path2: string;
}

const RoadMap: FunctionComponent = () => {
    const [paths, setPaths] = useState<PathState>({ path1: "", path2: "" });
    const [isVisible, setIsVisible] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const btn1Ref = useRef<HTMLDivElement>(null);
    const btn2Ref = useRef<HTMLDivElement>(null);
    const btn3Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);

        const updatePaths = () => {
            if (containerRef.current && btn1Ref.current && btn2Ref.current && btn3Ref.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const rect1 = btn1Ref.current.getBoundingClientRect();
                const rect2 = btn2Ref.current.getBoundingClientRect();
                const rect3 = btn3Ref.current.getBoundingClientRect();

                const createSymmetricalSPath = (startRect: DOMRect, endRect: DOMRect, depth: number) => {
                    const startX = startRect.right - containerRect.left;
                    const startY = startRect.top + startRect.height / 2 - containerRect.top;
                    const endX = endRect.left - containerRect.left;
                    const endY = endRect.top + endRect.height / 2 - containerRect.top;

                    const horizontalDistance = endX - startX;
                    const cp1x = startX + horizontalDistance * 0.25;
                    const cp2x = endX - horizontalDistance * 0.25;

                    const cp1y = startY + depth;
                    const cp2y = endY + depth;

                    return `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
                };

                const path1D = createSymmetricalSPath(rect1, rect2, 120);
                const path2D = createSymmetricalSPath(rect2, rect3, 120);
                setPaths({ path1: path1D, path2: path2D });
            }
        };

        requestAnimationFrame(updatePaths);
        window.addEventListener("resize", updatePaths);

        return () => {
            window.removeEventListener("resize", updatePaths);
            clearTimeout(timer);
        };
    }, []);

    const animationSequence = isVisible ? "visible" : "hidden";

    return (
        <div ref={containerRef} className="relative w-screen h-screen bg-[#6700c6] overflow-hidden font-sans text-white">

            <motion.div
                className="absolute top-6 left-6 md:top-10 md:left-12 flex items-center gap-2 text-xl md:text-2xl text-purple-300 opacity-90 z-20"
                custom={0} initial="hidden" animate={animationSequence} variants={itemVariants}
            >
                <X size={20} />
                <span>Our Roadmap</span>
            </motion.div>

            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                <motion.path
                    d={paths.path1} fill="none" stroke="white" strokeWidth="6" strokeLinecap="round"
                    custom={0.8} initial="hidden" animate={animationSequence} variants={pathVariants}
                />
                <motion.path
                    d={paths.path2} fill="none" stroke="white" strokeWidth="6" strokeLinecap="round"
                    custom={1.0} initial="hidden" animate={animationSequence} variants={pathVariants}
                />
            </svg>

            <div className="absolute inset-0 pt-[15vh] pb-[35vh] px-[8vw] flex flex-col justify-around z-20">
                <motion.div
                    ref={btn1Ref}
                    className="self-start"
                    custom={0.2} initial="hidden" animate={animationSequence} variants={itemVariants}
                >
                    <StarBorder as="button" color="white" speed="5s">
                        Content
                    </StarBorder>
                </motion.div>

                <motion.div
                    ref={btn2Ref}
                    className="self-center"
                    custom={0.4} initial="hidden" animate={animationSequence} variants={itemVariants}
                >
                    <StarBorder as="button" color="white" speed="5s">
                        Community
                    </StarBorder>
                </motion.div>

                <motion.div
                    ref={btn3Ref}
                    className="self-end"
                    custom={0.6} initial="hidden" animate={animationSequence} variants={itemVariants}
                >
                    <StarBorder as="button" color="white" speed="5s">
                        Spaces
                    </StarBorder>
                </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 w-full px-6 md:px-12 pb-12 flex flex-col items-start gap-y-6 md:gap-y-8 z-20">
                <motion.div
                    className="w-full grid grid-cols-[max-content_1fr] gap-x-3 items-baseline"
                    custom={1.4} initial="hidden" animate={animationSequence} variants={itemVariants}
                >
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-extralight leading-tight whitespace-nowrap">
                        Starting from
                    </p>
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-extralight leading-tight">
                        <span className="font-semibold text-purple-300">Sound,</span>
                    </p>
                    <p className="col-start-2 text-2xl sm:text-3xl lg:text-4xl font-extralight leading-tight">
                        we extend into the real world – a community of talented minds. In the near future, we plan to build offline spaces for creating.
                    </p>
                </motion.div>

                <motion.a
                    href="#"
                    className="inline-flex items-center gap-2 text-lg sm:text-xl lg:text-2xl text-purple-300 underline underline-offset-4 hover:text-white transition-colors"
                    custom={1.6} initial="hidden" animate={animationSequence} variants={itemVariants}
                >
                    Meet Singularity Team <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                </motion.a>
            </div>
        </div>
    );
};

export default RoadMap;