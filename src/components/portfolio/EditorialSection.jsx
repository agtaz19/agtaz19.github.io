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
                        I operate at the intersection of quantitative finance, strategic
                        consulting, and data-driven research — delivering rigorous analytical
                        work and high-stakes advisory to institutions, executives, and
                        investment teams. My practice combines deep market knowledge with
                        the computational precision of a quant and the strategic clarity of
                        a management consultant.
                    </p>

                    <p
                        className="mt-6 text-base leading-relaxed"
                        style={{ color: "rgb(var(--text-secondary))", maxWidth: "680px" }}
                    >
                        Whether structuring complex deals, modeling portfolio risk,
                        or advising on market entry strategy — every engagement is grounded
                        in rigorous analysis, transparent methodology, and a commitment to
                        outcomes that last.
                    </p>

                    <Link
                        to="/support"
                        className="inline-flex items-center gap-2 mt-8 text-sm font-semibold tracking-wide
                                   transition-colors duration-300 hover:opacity-70"
                        style={{ color: "rgb(212,175,55)" }}
                    >
                        ↳ Start an Engagement
                    </Link>
                </div>
            </div>
        </section>
    );
}