/**
 * ProjectTicker — "Selected Work" horizontal scroll row, HRT-style
 *
 * Cards animate in from the right as they enter the viewport (scroll-triggered).
 * Clicking a card opens a detail modal.
 */
import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

const PROJECTS = [
    {
        id: 1,
        tag: "Finance",
        title: "Cross-Border M&A Restructuring",
        description: "Led a $1.2B cross-border acquisition across 4 jurisdictions, optimizing tax efficiency and regulatory compliance.",
        metric: "$1.2B",
        metricLabel: "Deal Size",
        details: {
            overview: "Managed the full lifecycle of a $1.2B cross-border acquisition spanning the United States, United Kingdom, Luxembourg, and Singapore. The mandate required simultaneous coordination of legal, tax, and regulatory workstreams across four distinct frameworks.",
            highlights: [
                "Structured a holding company architecture that reduced effective tax rate by 6.4 percentage points.",
                "Negotiated regulatory clearance with three separate competition authorities within a compressed 90-day timeline.",
                "Delivered final board presentation and integration roadmap, adopted without modification.",
                "Transaction closed on schedule, within 1.2% of projected all-in cost.",
            ],
            outcome: "The deal closed as the largest cross-border transaction in the client's history. Post-close integration exceeded synergy targets in Year 1 by 18%.",
        },
    },
    {
        id: 2,
        tag: "Quant",
        title: "Volatility Surface Modeling",
        description: "Built a proprietary volatility surface model using stochastic calculus, improving options pricing accuracy by 18%.",
        metric: "18%",
        metricLabel: "Accuracy Gain",
        details: {
            overview: "Developed a stochastic local volatility (SLV) hybrid model calibrated to live S&P 500 and single-stock option chains. The model replaced a legacy Black-Scholes surface that systematically mispriced skew.",
            highlights: [
                "Implemented the Heston-SLV calibration using a particle method on a GPU-accelerated Python stack.",
                "Achieved 18% improvement in out-of-sample pricing RMSE vs. the incumbent model.",
                "Integrated arbitrage-free interpolation across the full strike/maturity grid.",
                "Deployed to production in 6 weeks; adopted as the firm's primary vol surface for options desk analytics.",
            ],
            outcome: "The model is now live at two institutional clients, handling intraday re-calibration on a 15-minute cycle.",
        },
    },
    {
        id: 3,
        tag: "Consulting",
        title: "Digital Transformation Roadmap",
        description: "Designed a 3-year digital transformation strategy for a Fortune 500 financial services firm.",
        metric: "3 yr",
        metricLabel: "Roadmap",
        details: {
            overview: "Engaged by the CTO and CFO of a Fortune 500 financial services company to design a credible, sequenced 3-year transformation agenda following a failed prior initiative.",
            highlights: [
                "Conducted 40+ stakeholder interviews across technology, operations, risk, and finance divisions.",
                "Identified $120M in stranded technology spend with a clear rationalization path.",
                "Designed a platform architecture blueprint reducing core system dependencies by 35%.",
                "Built a benefits-realization model linking each initiative to P&L impact with quarterly milestones.",
            ],
            outcome: "The roadmap was approved by the Board within 30 days of delivery. Year 1 initiatives are currently in execution, tracking ahead of the projected cost reduction schedule.",
        },
    },
    {
        id: 4,
        tag: "Strategy",
        title: "Market Entry Analysis — APAC",
        description: "Comprehensive entry analysis across 5 APAC markets, identifying $400M in addressable revenue.",
        metric: "$400M",
        metricLabel: "TAM Identified",
        details: {
            overview: "Delivered a market entry feasibility study for a U.S.-based asset manager seeking to expand into the Asia-Pacific region. Covered Japan, Singapore, Hong Kong, Australia, and South Korea.",
            highlights: [
                "Built bottom-up TAM models for each market using regulatory filings, fund flow data, and primary research.",
                "Assessed competitive landscape across 60+ incumbent managers per market.",
                "Identified Singapore and Australia as Tier 1 entry markets with combined accessible TAM of $400M.",
                "Produced a regulatory entry matrix covering licensing, fund registration, and distribution requirements.",
            ],
            outcome: "The client proceeded with a Singapore entity establishment. The launch timeline and cost projections fell within 8% of our original estimates.",
        },
    },
    {
        id: 5,
        tag: "Quant",
        title: "Algorithmic Execution Engine",
        description: "Low-latency execution engine handling 50K+ orders/day with adaptive market-making strategies.",
        metric: "50K+",
        metricLabel: "Orders/Day",
        details: {
            overview: "Designed and implemented an algorithmic execution engine for a systematic equity fund, replacing a manual routing workflow that was creating slippage at scale.",
            highlights: [
                "Built in Python/C++ with FIX protocol connectivity to 4 prime brokers.",
                "Implemented VWAP, TWAP, and adaptive participation-rate strategies with real-time fill quality analytics.",
                "Reduced average implementation shortfall by 4.1 bps across the live book.",
                "System processes 50,000+ orders per day with sub-2ms routing latency at the 95th percentile.",
            ],
            outcome: "The engine has been in continuous live operation for 18 months. Annual slippage savings are estimated at $2.8M on the current book size.",
        },
    },
];

const TAG_COLORS = {
    Finance:    { bg: "rgba(212,175,55,0.1)",  text: "rgb(212,175,55)" },
    Quant:      { bg: "rgba(100,185,130,0.1)", text: "rgb(100,185,130)" },
    Consulting: { bg: "rgba(90,160,210,0.1)",  text: "rgb(90,160,210)" },
    Strategy:   { bg: "rgba(220,160,100,0.1)", text: "rgb(220,160,100)" },
};

function ProjectModal({ project, onClose }) {
    const tagColor = TAG_COLORS[project.tag] || { bg: "rgba(0,0,0,0.06)", text: "inherit" };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                {/* Backdrop */}
                <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }} />

                {/* Modal */}
                <motion.div
                    className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto border border-theme"
                    style={{ backgroundColor: "rgb(var(--bg-card))" }}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 24 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 p-6 md:p-8 border-b border-theme">
                        <div>
                            <span
                                className="text-[10px] font-semibold tracking-[0.2em] uppercase px-2.5 py-1 rounded-sm inline-block mb-3"
                                style={{ backgroundColor: tagColor.bg, color: tagColor.text }}
                            >
                                {project.tag}
                            </span>
                            <h2 className="font-heading font-bold text-theme leading-snug" style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)" }}>
                                {project.title}
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="flex-shrink-0 mt-1 text-theme-muted hover:text-theme transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6 md:p-8 space-y-6">
                        {/* Metric */}
                        <div className="flex items-baseline gap-3">
                            <span className="font-mono text-3xl font-semibold" style={{ color: "rgb(212,175,55)" }}>{project.metric}</span>
                            <span className="text-xs font-mono tracking-[0.18em] uppercase text-theme-muted">{project.metricLabel}</span>
                        </div>

                        {/* Overview */}
                        <div>
                            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-theme-muted mb-2">Overview</p>
                            <p className="text-sm leading-relaxed text-theme-muted">{project.details.overview}</p>
                        </div>

                        {/* Highlights */}
                        <div>
                            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-theme-muted mb-3">Key Highlights</p>
                            <ul className="space-y-2.5">
                                {project.details.highlights.map((h, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-sm text-theme-muted">
                                        <span className="flex-shrink-0 mt-1.5" style={{ color: "rgb(212,175,55)" }}>—</span>
                                        {h}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Outcome */}
                        <div className="pt-4 border-t border-theme">
                            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-theme-muted mb-2">Outcome</p>
                            <p className="text-sm leading-relaxed text-theme-muted">{project.details.outcome}</p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

function ProjectCard({ project, index, onClick }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    const tagColor = TAG_COLORS[project.tag] || { bg: "rgba(0,0,0,0.06)", text: "inherit" };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            onClick={onClick}
            className="flex-shrink-0 w-[82vw] sm:w-[380px] md:w-[420px]
                       border border-theme flex flex-col justify-between snap-start
                       p-6 md:p-8 transition-all duration-300 hover:shadow-lg cursor-pointer group"
            style={{ backgroundColor: "rgb(var(--bg-card))" }}
        >
            <div>
                <span
                    className="text-[10px] font-semibold tracking-[0.2em] uppercase px-2.5 py-1 rounded-sm"
                    style={{ backgroundColor: tagColor.bg, color: tagColor.text }}
                >
                    {project.tag}
                </span>
                <h3 className="font-heading font-semibold mt-4 leading-snug" style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.3rem)" }}>
                    {project.title}
                </h3>
                <p className="text-sm mt-3 leading-relaxed" style={{ color: "rgb(var(--text-secondary))" }}>
                    {project.description}
                </p>
            </div>

            <div className="flex items-end justify-between mt-8 pt-6 border-t border-theme">
                <div>
                    <div className="font-mono text-2xl font-semibold" style={{ color: "rgb(100,185,130)" }}>
                        {project.metric}
                    </div>
                    <div className="font-mono text-[10px] tracking-[0.18em] uppercase mt-0.5" style={{ color: "rgb(var(--text-secondary))" }}>
                        {project.metricLabel}
                    </div>
                </div>
                <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" style={{ color: "rgb(212,175,55)" }} />
            </div>
        </motion.div>
    );
}

export default function ProjectTicker() {
    const [selected, setSelected] = useState(null);

    return (
        <section className="border-t border-theme" style={{ paddingTop: "clamp(3rem, 6vw, 5rem)", paddingBottom: "clamp(3rem, 6vw, 5rem)" }}>
            <div className="mb-10" style={{ paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-2" style={{ color: "rgb(var(--text-secondary))" }}>
                    Selected Work
                </p>
                <h2 className="font-heading font-bold" style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)" }}>
                    Recent Engagements
                </h2>
            </div>

            <div
                className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
                style={{ paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)", scrollbarWidth: "none" }}
            >
                {PROJECTS.map((p, i) => (
                    <ProjectCard key={p.id} project={p} index={i} onClick={() => setSelected(p)} />
                ))}
            </div>

            {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
        </section>
    );
}