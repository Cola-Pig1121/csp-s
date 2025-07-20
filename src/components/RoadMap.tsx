"use client";

import { useState, useEffect, useRef, FunctionComponent } from "react";
import { motion, Variants } from "framer-motion";
import StarBorder from './StarBorder/StarBorder'; // 假设 StarBorder 组件路径正确
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
        // 使用一个小的延迟确保元素已经渲染完成
        const timer = setTimeout(() => setIsVisible(true), 100);

        const updatePaths = () => {
            if (containerRef.current && btn1Ref.current && btn2Ref.current && btn3Ref.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const rect1 = btn1Ref.current.getBoundingClientRect();
                const rect2 = btn2Ref.current.getBoundingClientRect();
                const rect3 = btn3Ref.current.getBoundingClientRect();

                // 保持原有的 S 路径生成逻辑不变
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

        // 首次计算路径
        // 使用 rAF (requestAnimationFrame) 可以更可靠地在下一次绘制前执行，确保布局已更新
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

            {/* --- 核心改动：使用 Flexbox 容器来布局按钮 --- */}
            <div className="absolute inset-0 pt-[15vh] pb-[35vh] px-[8vw] flex flex-col justify-around z-20">
                <motion.div
                    ref={btn1Ref}
                    className="self-start" // 第一个按钮靠左
                    custom={0.2} initial="hidden" animate={animationSequence} variants={itemVariants}
                >
                    <StarBorder as="button" color="white" speed="5s">
                        Content
                    </StarBorder>
                </motion.div>

                <motion.div
                    ref={btn2Ref}
                    className="self-center" // 第二个按钮居中
                    custom={0.4} initial="hidden" animate={animationSequence} variants={itemVariants}
                >
                    <StarBorder as="button" color="white" speed="5s">
                        Community
                    </StarBorder>
                </motion.div>

                <motion.div
                    ref={btn3Ref}
                    className="self-end" // 第三个按钮靠右
                    custom={0.6} initial="hidden" animate={animationSequence} variants={itemVariants}
                >
                    <StarBorder as="button" color="white" speed="5s">
                        Spaces
                    </StarBorder>
                </motion.div>
            </div>


            <div className="absolute bottom-0 left-0 w-full px-6 md:px-12 pb-12 flex flex-col items-start gap-y-6 md:gap-y-8 z-20">
                <motion.div
                    className="w-full"
                    custom={1.4} initial="hidden" animate={animationSequence} variants={itemVariants}
                >
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-extralight leading-tight text-left">
                        Starting from <span className="font-semibold text-purple-300">Sound,</span></p>
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-extralight leading-tight text-left"> we extend into the real world – a community of talented minds. In the near future, we plan to build offline spaces for creating.
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