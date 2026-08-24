/**
 * PhilosophyBanner — Full-width dark editorial banner, HRT-style
 */
import React, { useState, useEffect, useRef } from "react";

// ── Key stats displayed at the bottom of the banner ──
// Edit values and labels to match your real numbers
const STATS = [
    { value: "$2.4B", label: "Capital Modeled & Serviced" },
    { value: "20+",    label: "Companies Advised" },
    { value: "20M+",   label: "Financial Data Points Modeled" },
    { value: "12",     label: "Organizations Collaborated With" },
];

const AnimatedStat = ({ textValue }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const animationRef = useRef(null); // Keeps track of the animation frame

    // Regex to split "$2.4B" into prefix ("$"), number ("2.4"), and suffix ("B")
    const match = textValue.match(/^([^0-9.-]*)([0-9.]+)(.*)$/);
    const prefix = match ? match[1] : '';
    const target = match ? parseFloat(match[2]) : 0;
    const suffix = match ? match[3] : '';
    
    // Determine how many decimal places to preserve
    const isFloat = match && match[2].includes('.');
    const decimals = isFloat ? match[2].split('.')[1].length : 0;

    const startAnimation = () => {
        let startTime = null;
        const duration = 2000; // 2 seconds

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            // Ease-out exponential function
            const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            setCount(target * easeOut);

            if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
            } else {
                setCount(target);
            }
        };
        animationRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Start animation when it enters the viewport
                    startAnimation();
                } else {
                    // User scrolled away: cancel animation and reset to 0
                    if (animationRef.current) cancelAnimationFrame(animationRef.current);
                    setCount(0);
                }
            },
            { threshold: 0.5 } // Triggers when 50% of the element is visible
        );

        observer.observe(ref.current);
        
        return () => {
            observer.disconnect();
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [target]);

    // Fallback if the string doesn't contain a number
    if (!match) return <span>{textValue}</span>;

    return (
        <span ref={ref}>
            {prefix}
            {count.toFixed(decimals)}
            {suffix}
        </span>
    );
};

export default function PhilosophyBanner() {
    return (
        <section
            className="border-t border-b border-theme"
            style={{
                backgroundColor: "rgb(var(--bg-primary))",
                paddingTop: "clamp(4rem, 9vw, 8rem)",
                paddingBottom: "clamp(4rem, 9vw, 8rem)",
                paddingLeft: "var(--fluid-pad)",
                paddingRight: "var(--fluid-pad)",
            }}
        >
            {/* Label + body: 12-col grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                <div className="lg:col-span-3">
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-theme-muted">
                        My Insights
                    </p>
                </div>

                <div className="lg:col-span-9">
                    <p
                        className="font-heading font-medium leading-[1.3] text-theme"
                        style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)" }}
                    >
                        I view  financial markets and complex organizations as interconnected systems that can be modeled, optimized, and systematically improved. Whether designing multi-factor quantitative strategies and empirical asset pricing models at Arizona State University, executing corporate restructuring and financial transformations at FTI Consulting, or driving operational efficiency at State Street, my approach centers on peeling back surface layers to master fundamental mechanics. True transformation requires eliminating institutional guesswork and replacing it with rigorous, data-driven architectures. Spanning algorithmic backtesting, predictive financial modeling, and streamlined operational workflows my work ensures long-term resilience and scalable performance.
                    </p>
                </div>
            </div>

            {/* ── Stats row ── */}
            <div
                className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 md:mt-20 pt-10 md:pt-12 border-t border-theme"
            >
                {STATS.map((s) => (
                    <div key={s.label}>
                        <div
                            className="font-mono font-semibold"
                            style={{
                                fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                                color: "rgb(212,175,55)",
                            }}
                        >
                            <AnimatedStat textValue={s.value} />
                        </div>
                        <div className="text-[11px] tracking-[0.2em] uppercase text-theme-muted mt-1"
                            style={{ fontFamily: "var(--font-mono)" }}>
                            {s.label}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}