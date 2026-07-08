/**
 * PillarsGrid — 4-tile image + label grid, HRT-style
 *
 * Mirrors HRT's "Think / Trust / Tinker / Trade" section.
 * Each tile: full-bleed image background, small-caps label on top,
 * and a single bold word below it.
 *
 * On hover: slight scale on the image for depth.
 * On mobile: 2-column grid.
 */
import React from "react";

const FINANCE_IMG     = "https://media.base44.com/images/public/6a3c7ebdbbe27499fdf64500/477db773e_generated_2513d20c.png";
const QUANT_IMG       = "https://media.base44.com/images/public/6a3c7ebdbbe27499fdf64500/92a25305b_generated_52567184.png";
const CONSULTING_IMG = "https://media.base44.com/images/public/6a3c7ebdbbe27499fdf64500/bf2bf9c35_generated_2c144d8c.png";
const STRATEGY_IMG   = "https://media.base44.com/images/public/6a3c7ebdbbe27499fdf64500/1b9a05dc0_generated_6a286cb9.png";

// ── Edit these to change pillar titles / descriptions ──
const PILLARS = [
    {
        id: "finance",
        label: "Finance",
        word: "Precision",
        description: "Capital markets, M&A, and structured financial solutions.",
        image: FINANCE_IMG,
    },
    {
        id: "quant",
        label: "Quant",
        word: "Rigor",
        description: "Statistical modeling, algorithmic strategies, and derivatives.",
        image: QUANT_IMG,
    },
    {
        id: "consulting",
        label: "Consulting",
        word: "Clarity",
        description: "Strategic planning, due diligence, and operational insight.",
        image: CONSULTING_IMG,
    },
    {
        id: "strategy",
        label: "Strategy",
        word: "Vision",
        description: "Market entry, digital transformation, and board advisory.",
        image: STRATEGY_IMG,
    },
];

function PillarTile({ pillar }) {
    return (
        <div className="group relative overflow-hidden aspect-[4/5] md:aspect-auto md:h-[420px]">
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
                    background: "linear-gradient(to top, rgba(8,8,8,0.85) 30%, rgba(8,8,8,0.2) 100%)",
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
                {/* Description — fades in on hover */}
                <p className="text-white/70 text-sm mt-2 leading-relaxed max-h-0 overflow-hidden
                              transition-all duration-500 group-hover:max-h-20 opacity-0 group-hover:opacity-100">
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

            {/* 4-tile grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {PILLARS.map((pillar) => (
                    <PillarTile key={pillar.id} pillar={pillar} />
                ))}
            </div>
        </section>
    );
}