/**
 * PhilosophyBanner — Full-width dark editorial banner, HRT-style
 *
 * Mirrors HRT's "Our Philosophy" section:
 * - Always dark background (even in light mode), for contrast
 * - Small-caps label on the left / top
 * - Large serif paragraph spanning the width
 * - Subtle accent stat row at the bottom
 */
import React from "react";

// ── Key stats displayed at the bottom of the banner ──
// Edit values and labels to match your real numbers
const STATS = [
    { value: "$2.4B+", label: "Capital Advised" },
    { value: "45+",    label: "Quant Models Deployed" },
    { value: "120+",   label: "Client Engagements" },
    { value: "12",     label: "Countries" },
];

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
                {/* Left label */}
                <div className="lg:col-span-3">
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-theme-muted">
                        My Philosophy
                    </p>
                </div>

                {/* Right: large serif text */}
                <div className="lg:col-span-9">
                    <p
                        className="font-heading font-medium leading-[1.3] text-theme"
                        style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)" }}
                    >
                        My internal standard of rigor far exceeds what most engagements
                        require. I believe that every analysis should be transparent,
                        every model should be explainable, and every recommendation
                        should be one I would stake my own capital on. This philosophy
                        shapes the work from the first data pull to the final board deck.
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
                            {s.value}
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