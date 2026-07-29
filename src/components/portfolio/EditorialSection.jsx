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
                        I help organizations make high-stakes decisions with confidence. With my background in quantiative finance and management consulting, I build frameworks, models, and strategies to evaluate and solve problems. From my experience from engineering quantitiative strategies to building a financial model or assisting non-profit organizations with a project plan, I weight inputs and measure optimal outcomes.
                    </p>

                    <p
                        className="mt-6 text-base leading-relaxed"
                        style={{ color: "rgb(var(--text-secondary))", maxWidth: "920px" }}
                    >
                        My experience is extensive from Quantitative Research & Analysis to Programming & Software Development, even including more traditional areas like restructuring and transaction advisory. Please reach out and learn more.
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