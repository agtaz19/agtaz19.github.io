/**
HeroSection
 */
import React, { useState, useEffect } from "react";
import LiveClock from "@/components/portfolio/LiveClock";

// ── Hero background
import HERO_BACKGROUND from "@/assets/stock_photos/Home_Nyc_Skyline.jpg";

const ROTATING_WORDS = [
    "Alexandre Tilly.",
    "an analyst.",
    "a strategist.",
    "a quant.",
    "an advisor.",
    "an architect.",
    "a researcher.",
    "an engineer.",
];

function useTypewriter(words, typingSpeed = 80, deletingSpeed = 45, pauseDuration = 1800) {
    const [displayed, setDisplayed] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [phase, setPhase] = useState("typing");

    useEffect(() => {
        const word = words[wordIndex % words.length];

        if (phase === "typing") {
            if (displayed.length < word.length) {
                const t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), typingSpeed);
                return () => clearTimeout(t);
            } else {
                const t = setTimeout(() => setPhase("pausing"), pauseDuration);
                return () => clearTimeout(t);
            }
        }

        if (phase === "pausing") {
            const t = setTimeout(() => setPhase("deleting"), 300);
            return () => clearTimeout(t);
        }

        if (phase === "deleting") {
            if (displayed.length > 0) {
                const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), deletingSpeed);
                return () => clearTimeout(t);
            } else {
                setWordIndex(i => (i + 1) % words.length);
                setPhase("typing");
            }
        }
    }, [displayed, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

    return displayed;
}

export default function HeroSection() {
    const typedWord = useTypewriter(ROTATING_WORDS);

    return (
        <section className="relative w-full h-screen min-h-[600px] flex items-end overflow-hidden">
            {/* ── Background GIF ── */}
            <div className="absolute inset-0">
                <img
                    src={HERO_BACKGROUND}
                    alt="New York City financial district"
                    className="w-full h-full object-cover object-center"
                />

                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(to bottom, rgba(8,8,8,0.5) 0%, rgba(8,8,8,0.72) 60%, rgba(8,8,8,0.92) 100%)",
                    }}
                />
            </div>

            {/* ── Live clock — top right ── */}
            <div className="absolute top-24 right-0 pr-[var(--fluid-pad)]">
                <LiveClock />
            </div>

            {/* ── Hero text — bottom left ── */}
            <div
                className="relative z-10 pb-16 md:pb-24 w-full max-w-7xl"
                style={{ paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}
            >
                {/* Main headline */}
                <h1
                    className="text-white font-heading font-bold leading-[1.05]"
                    style={{ fontSize: "clamp(2.4rem, 6.5vw, 5.5rem)" }}
                >
                    I am{" "}
                    <span className="text-white">
                        {typedWord}
                        <span
                            className="inline-block w-[3px] ml-1 align-baseline"
                            style={{
                                height: "0.85em",
                                backgroundColor: "white",
                                animation: "blink 1s step-end infinite",
                            }}
                        />
                    </span>
                </h1>

                {/* City tag */}
                <p
                    className="mt-3 text-xs font-semibold tracking-[0.3em] uppercase text-white/50"
                    style={{ fontFamily: "var(--font-mono)" }}
                >
                    New York, New York
                </p>

                {/* Subtitle */}
                <p
                    className="mt-5 text-white/75 text-base md:text-lg leading-relaxed max-w-5xl"
                    style={{ fontFamily: "var(--font-body)" }}
                >
                    A curated overview of my research, projects, and professional experience across finance, consulting, and quantitiative finance. This space is designed to highlight my work, provide insights into my approach to problem-solving, and showcase my contributions to academic and the professional world.
                </p>

                {/* CTA row: responsive wrap on mobile, inline dividers on desktop */}
                <div className="flex flex-wrap items-center gap-3 mt-8 md:mt-10 md:gap-0">
                    <a
                        href="https://www.linkedin.com/in/alexandre-tilly/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-5 py-2.5 md:px-6 md:py-3 text-sm font-semibold tracking-[0.1em] uppercase transition-all duration-300"
                        style={{ border: "1px solid rgba(90,160,210,0.5)", color: "rgba(90,160,210,0.9)" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgb(90,160,210)"; e.currentTarget.style.backgroundColor = "rgba(90,160,210,0.1)"; e.currentTarget.style.color = "rgb(90,160,210)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(90,160,210,0.5)"; e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "rgba(90,160,210,0.9)"; }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        LinkedIn
                    </a>

                    {/* Divider - hidden on mobile so it doesn't leave an orphaned line */}
                    <div className="hidden md:block w-px h-10 bg-white/20 mx-1" />

                    <a
                        href="https://github.com/agtaz19"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-5 py-2.5 md:px-6 md:py-3 text-sm font-semibold tracking-[0.1em] uppercase transition-all duration-300"
                        style={{ border: "1px solid rgba(100,185,130,0.5)", color: "rgba(100,185,130,0.9)" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgb(100,185,130)"; e.currentTarget.style.backgroundColor = "rgba(100,185,130,0.1)"; e.currentTarget.style.color = "rgb(100,185,130)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(100,185,130,0.5)"; e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "rgba(100,185,130,0.9)"; }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                        </svg>
                        GitHub
                    </a>

                    <div className="hidden md:block w-px h-10 bg-white/20 mx-1" />

                    <a
                        href="https://linktr.ee/agtaz19"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-5 py-2.5 md:px-6 md:py-3 text-sm font-semibold tracking-[0.1em] uppercase transition-all duration-300"
                        style={{ border: "1px solid rgba(212,175,55,0.5)", color: "rgba(212,175,55,0.9)" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgb(212,175,55)"; e.currentTarget.style.backgroundColor = "rgba(212,175,55,0.1)"; e.currentTarget.style.color = "rgb(212,175,55)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.5)"; e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "rgba(212,175,55,0.9)"; }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7.953 15.066c-.08.163-.08.324-.08.486.08.893.893 1.627 1.787 1.547.326-.02.613-.122.851-.284l5.204-3.235c.176-.108.37-.168.569-.168.198 0 .392.06.569.168l5.204 3.235c.238.162.525.264.851.284.894.08 1.707-.654 1.787-1.547 0-.162 0-.323-.08-.486L19.993 8.25a1.29 1.29 0 00-.486-.647l-6.66-4.11a1.29 1.29 0 00-1.38 0l-6.66 4.11a1.29 1.29 0 00-.487.647L.527 15.066zM12 20.55c-.486 0-.973-.162-1.38-.486L4.36 15.714c-.162-.122-.346-.203-.543-.24-.566-.108-1.132.162-1.38.647-.243.486-.08 1.052.324 1.38l6.66 4.11c.649.404 1.38.607 2.58.607 1.2 0 1.931-.203 2.58-.607l6.66-4.11c.404-.328.567-.894.324-1.38-.248-.485-.814-.755-1.38-.647-.197.037-.381.118-.543.24l-6.26 4.35c-.407.324-.894.486-1.38.486z"/>
                        </svg>
                        Linktree
                    </a>
                </div>
            </div>

            <style>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50%      { opacity: 0; }
            }
            `}</style>
        </section>
    );
}