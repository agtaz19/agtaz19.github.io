/**
 * PillarsGrid — 4-tile image + label grid, HRT-style
 *
 * Mirrors HRT's "Think / Trust / Tinker / Trade" section.
 * Each tile: full-bleed image background, small-caps label on top,
 * and a single bold word below it.
 *
 * On hover: slight scale on the image for depth.
 * On mobile: 1-column grid, stacking to 4-column on large screens.
 */
import React from "react";

const FINANCE_IMG    = "https://images.pexels.com/photos/325871/pexels-photo-325871.jpeg";
const QUANT_IMG      = "https://images.pexels.com/photos/5125366/pexels-photo-5125366.jpeg";
const CONSULTING_IMG = "https://images.pexels.com/photos/13838328/pexels-photo-13838328.jpeg";
const DATA_IMG       = "https://images.pexels.com/photos/36346074/pexels-photo-36346074.jpeg";

const PILLARS = [
    {
        id: "theoretical_foundation",
        label: "Core Discipline",
        word: "Mathematics",
        description: "The formal language of quantitative finance, utilizing probability theory, linear algebra, and stochastic calculus to model continuous-time asset price paths, volatility smiles, and derivative valuations.",
        image: DATA_IMG,
    },
    {
        id: "empirical_engine",
        label: "Analytical Method",
        word: "Statistics",
        description: "The data-driven framework used for parameter estimation, hypothesis testing, time-series analysis, and econometrics to separate genuine market signals from noise.",
        image: CONSULTING_IMG,
    },
    {
        id: "execution_infrastructure",
        label: "Technical Backbone",
        word: "Computation",
        description: "The software engineering and data infrastructure required to build low-latency execution pipelines, manage massive tick-data stores, and backtest algorithmic trading strategies efficiently.",
        image: QUANT_IMG,
    },
    {
        id: "market_principles",
        label: "Domain Knowledge",
        word: "Financial Economics",
        description: "The underlying theory of capital markets, covering market microstructure, asset pricing anomalies, liquidity dynamics, and portfolio risk management frameworks.",
        image: FINANCE_IMG,
    },
];

function PillarTile({ pillar }) {
    return (
        // FIX: Replaced aspect-[4/5] with a generous min-h-[350px] for mobile 
        // to give text room to expand without pushing the title out of the frame.
        <div className="group relative overflow-hidden min-h-[350px] lg:min-h-[420px] rounded-sm">
            {/* Image */}
            <img
                src={pillar.image}
                alt={pillar.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out
                            group-hover:scale-105"
            />
            {/* Gradient overlay */}
            <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                    background: "linear-gradient(to top, rgba(8,8,8,0.9) 10%, rgba(8,8,8,0.4) 60%, rgba(8,8,8,0.1) 100%)",
                }}
            />
            {/* Text content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/60 mb-1">
                    {pillar.label}
                </p>
                <h3 className="font-heading text-white text-2xl md:text-3xl font-bold">
                    {pillar.word}
                </h3>
                {/* FIX: Increased max-h-20 to max-h-[300px] so the text is never truncated on hover */}
                <p className="text-white/70 text-sm mt-3 leading-relaxed max-h-0 overflow-hidden
                            transition-all duration-500 group-hover:max-h-[300px] opacity-0 group-hover:opacity-100">
                    {pillar.description}
                </p>
            </div>
        </div>
    );
}

export default function PillarsGrid() {
    return (
        <section
            style={{
                paddingTop: "clamp(3rem, 6vw, 5rem)",
                paddingBottom: "clamp(3rem, 6vw, 5rem)",
                paddingLeft: "var(--fluid-pad)",
                paddingRight: "var(--fluid-pad)",
            }}
        >
            {/* Section label */}
            <p
                className="text-xs font-semibold tracking-[0.25em] uppercase mb-8"
                style={{ color: "rgb(var(--text-secondary))" }}
            >
                Core Disciplines
            </p>

            {/* FIX: Updated grid configuration. 
                1 column on mobile, 2 on tablets, 4 on desktops. */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {PILLARS.map((pillar) => (
                    <PillarTile key={pillar.id} pillar={pillar} />
                ))}
            </div>
        </section>
    );
}