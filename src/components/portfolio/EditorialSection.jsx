/**
 * EditorialSection — "What I Do" editorial block, HRT-style
 *
 * Layout: two-column on desktop
 *   Left:  small-caps label ("What I Do") + overline
 *   Right: large serif paragraph + arrow link
 *
 * This pattern is used on HRT directly below the hero.
 */
import React from "react";
import { Link } from "react-router-dom";

export default function EditorialSection() {
    return (
        <section
            className="border-b border-theme"
            style={{
                paddingTop: "clamp(3rem, 8vw, 7rem)",
                paddingBottom: "clamp(3rem, 8vw, 7rem)",
                paddingLeft: "var(--fluid-pad)",
                paddingRight: "var(--fluid-pad)",
            }}
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                {/* ── Left: label ── */}
                <div className="lg:col-span-3">
                    <p
                        className="text-xs font-semibold tracking-[0.25em] uppercase"
                        style={{ color: "rgb(var(--text-secondary))" }}
                    >
                        What I Do
                    </p>
                </div>

                {/* ── Right: body ── */}
                <div className="lg:col-span-9">
                    <p
                        className="font-heading font-medium leading-[1.35] text-theme"
                        style={{ fontSize: "clamp(1.3rem, 2.5vw, 2rem)" }}
                    >
                        I apply rigorous mathematics, computer science, and quantitative modeling to engineer high-performance trading strategies and decode complex market dynamics. By leveraging stochastic calculus, algorithmic execution frameworks, and statistical arbitrage models, I transform raw data into systematic alpha. Supported by past experience spanning institutional finance and strategic consulting, I bring a structured perspective to high-stakes problem-solving. Whether backtesting execution pipelines or building robust financial models, I bridge advanced computational theory with disciplined capital deployment.
                    </p>

                    <p
                        className="mt-6 text-base leading-relaxed"
                        style={{ color: "rgb(var(--text-secondary))", maxWidth: "920px" }}
                    >
                        From architecting algorithmic software and quantitative research pipelines to evaluating corporate health through restructuring and transaction advisory, I connect deep computational execution with fundamental business strategy intuition. Let's connect to explore how we can build, analyze, or solve something exceptional together. Please reach out to learn more.
                    </p>

                    <Link
                        className="inline-flex items-center gap-2 mt-8 text-sm font-semibold tracking-wide
                                    transition-colors duration-300 hover:opacity-70"
                        style={{ color: "rgb(212,175,55)" }}
                        to="https://www.linkedin.com/in/alexandre-tilly/"
                    >
                        ↳ Reach Out
                    </Link>
                </div>
            </div>
        </section>
    );
}