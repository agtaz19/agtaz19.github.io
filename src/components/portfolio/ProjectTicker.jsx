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
        tag: "Quant",
        title: "Retail Behavior & Sentiment Analytics",
        description: "Modeled retail investor order flow and social sentiment dynamics to capture alpha from meme stock and retail-driven volatility.",
        metric: "3MM",
        metricLabel: "Data Points Captured Daily",
        details: {
            overview: "Built a quantitative framework analyzing non-institutional market participation by capturing micro-structure shifts, options flow imbalances, and alternative data sentiment metrics.",
            highlights: [
                "Ingested high-frequency option order flow data and social sentiment streams using custom NLP pipelines.",
                "Engineered proprietary indicators tracking retail positioning concentration and retail-induced volatility spikes.",
                "Backtested delta-neutral options strategies designed to capture rapid mean-reversion following momentum peaks.",
                "Optimized risk limits to shield portfolios from extreme tail-risk drawdowns during rapid short squeezes.",
            ],
            outcome: "Delivered a systematic trading signal overlay that generated a 320 bps return boost with low correlation to traditional risk factors.",
        },
    },
    {
        id: 2,
        tag: "Quant",
        title: "Crisis Investing Implementation",
        description: "Implemented a macro crisis playbook and stress-testing infrastructure for distressed asset allocation during market disruptions.",
        metric: "3+",
        metricLabel: "Linkage of Platforms",
        details: {
            overview: "Designed an institutional macro framework to evaluate cross-asset mispricings and liquidity crises, enabling rapid liquidity deployment into high-yield, distressed, and undervalued assets.",
            highlights: [
                "Constructed historical crisis drawdowns and recovery dynamics across sovereign debt, credit, and equity markets.",
                "Built automated risk-monitoring dashboards that trigger liquidity rebalancing when market stress metrics peak.",
                "Evaluated capital structure positions to identify senior secured debt assets offering asymmetric upside.",
                "Modeled liquidity run-rates and solvency probabilities under severe multi-variable macro shock scenarios.",
            ],
            outcome: "Provided real-time actionable signals that guided personal capital deployment into deeply discounted positions during severe volatility.",
        },
    },
    {
        id: 3,
        tag: "Quant",
        title: "NYC Weather Derivatives & Event Markets",
        description: "Engineered weather event pricing models linked to degree-day metrics and hyper-local meteorology data in New York City.",
        metric: "~20%",
        metricLabel: "Mispricing Edge",
        details: {
            overview: "Developed a quantitative trading framework for heating degree day (HDD) and cooling degree day (CDD) contracts, alongside event market contracts tied to NYC weather patterns.",
            highlights: [
                "Processed multi-decade NYC meteorological dataset combined with high-resolution ensemble forecast models.",
                "Constructed Monte Carlo simulations modeling non-linear temperature distribution shifts and seasonal anomalies.",
                "Structured multi-step data ingestion process to organize data and refine singals.",
                "Identified structural mispricings in local energy demand spikes relative to consensus weather forecasts.",
            ],
            outcome: "Achieved a ~20% mispricing edge over standard baseline models, providing enhanced hedging performance for power desk exposure.",
        },
    },
    {
        id: 4,
        tag: "Finance",
        title: "Corporate Restructuring & Performance Improvement",
        description: "Executed turnaround strategy for a mid-market industrial firm, driving working capital optimization and operational realignment.",
        metric: "$25M",
        metricLabel: "Run-Rate Savings",
        details: {
            overview: "Led an operational and financial restructuring mandate for a distressed industrial firm facing margin compression, supply chain bottlenecks, and debt covenant pressures.",
            highlights: [
                "Engineered a 13-week cash flow forecasting model to preserve liquidity and renegotiate short-term debt covenants.",
                "Identified key operational bottlenecks across manufacturing sites, driving a lean plant-floor redesign.",
                "Rationalized unprofitable product lines and restructured supplier contracts to reclaim gross margins.",
                "Aligned management incentives with EBITDA recovery targets across core business divisions.",
            ],
            outcome: "Restored positive operating cash flow within 6 months, unlocking $25M in annualized run-rate savings and stabilizing creditor relations.",
        },
    },
    {
        id: 5,
        tag: "Quant",
        title: "Academic Trading Competition Platform",
        description: "Designed, backtested, and executed a competitive multi-asset quantitative and fundamental environment.",
        metric: "30+",
        metricLabel: "Student Involvement",
        details: {
            overview: "Developed and organized trading competition simulating live exchange microstructure conditions around forex, stocks, bonds, and futures.",
            highlights: [
                "Architected the simulation engine and order-matching framework to mirror real-world exchange liquidity and order book dynamics.",
                "Designed a multi-asset scoring model evaluating participants on risk-adjusted returns (Sharpe ratio), maximum drawdown control, and fundamental analysis quality.",
                "Created baseline quantitative trading templates and synthetic market scenario generators for stress-testing student algorithms under high volatility.",
                "Advised 30+ student participants on portfolio risk management, execution mechanics, and statistical modeling.",
            ],
            outcome: "Successfully ran a multi-week trading competition for 30+ students, driving measurable growth in algorithmic trading literacy and creating a reusable framework for future academic cohorts.",
        },
    },
    {
        id: 6,
        tag: "Strategy",
        title: "Enterprise Corporate & Growth Strategy",
        description: "Formulated a 5-year corporate growth strategy, evaluating core portfolio optimization and expansion vector adjacencies.",
        metric: "18%",
        metricLabel: "Target ROI Increase",
        details: {
            overview: "Assisted C-suite leadership in evaluating corporate portfolio performance, capital allocation efficiency, and strategic priorities to accelerate enterprise value creation.",
            highlights: [
                "Evaluated profitability and return on invested capital (ROIC) across multiple internal business units.",
                "Identified high-growth adjacent markets and constructed build-versus-buy buildout frameworks.",
                "Delivered long-term financial models projecting revenue trajectories, capex demands, and margin expansion pathways.",
                "Facilitated strategic alignment workshops across division heads to finalize strategic KPIs.",
            ],
            outcome: "Adopted by executive leadership as the foundational strategic growth map, targeting an 18% lift in capital return over five years.",
        },
    },
    {
        id: 7,
        tag: "Strategy",
        title: "B2B SaaS Go-To-Market (GTM) Launch",
        description: "Architected end-to-end GTM strategy, customer segmentation, and pricing structure for enterprise solution expansion.",
        metric: "3.5x",
        metricLabel: "Pipeline Growth",
        details: {
            overview: "Designed and executed a comprehensive Go-To-Market plan for launching a new enterprise product line into mid-market and enterprise accounts.",
            highlights: [
                "Defined target customer profiles (TCP), buyer personas, and key value propositions across key verticals.",
                "Structured multi-tier SaaS value pricing models optimized for land-and-expand revenue growth.",
                "Built sales enablement toolkits, competitor battlecards, and direct outbound cadence strategies.",
                "Coordinated joint product-marketing rollouts and strategic channel partnership programs.",
            ],
            outcome: "Accelerated initial pipeline generation by 3.5x within the first two quarters of post-launch deployment.",
        },
    },
    {
        id: 8,
        tag: "Consulting",
        title: "Enterprise AI & Workflow Automation",
        description: "Deployed custom AI agent workflows and LLM infrastructure to streamline manual operations and data processing.",
        metric: "70%",
        metricLabel: "Manual Task Reduction",
        details: {
            overview: "Architected an AI automation initiative leveraging custom LLM pipelines, document parsing, and automated decision flows for operations and research teams.",
            highlights: [
                "Mapped core manual operational workflows to identify high-ROI automation opportunities across teams.",
                "Built secure Retrieval-Augmented Generation (RAG) pipelines for parsing internal financial documentation.",
                "Integrated automated data pipeline agents, eliminating repetitive data entry and manual reconciliation.",
                "Established AI governance, compliance validation, and human-in-the-loop review guardrails.",
            ],
            outcome: "Reduced manual processing hours by 70% across targeted workflows while maintaining 99%+ accuracy.",
        },
    },
    {
        id: 9,
        tag: "Consulting",
        title: "Fund Migration & Project Management Office (PMO)",
        description: "Managed a complex institutional fund migration project, establishing a centralized PMO to oversee multi-system integration.",
        metric: "$800M+",
        metricLabel: "Migrated AUM",
        details: {
            overview: "Directed the Project Management Office for a multi-asset fund migration, transferring operations, data structures, and custodians without client disruption.",
            highlights: [
                "Established PMO governance, risk matrices, and milestone tracking dashboards across 8 cross-functional teams.",
                "Overseed historical trade data, custodian transfer operations, and compliance mapping across platforms.",
                "Mitigated operational risk during transition through parallel run testing and automated reconciliation checks.",
                "Coordinated institutional client communication, custodian sign-offs, and third-party vendor integration.",
            ],
            outcome: "Successfully migrated over $800M in AUM on schedule with zero operational trade breaks or downtime.",
        },
    },
    {
    id: 10,
    tag: "Consulting",
    title: "Multi-Phase Workforce Reduction & Spend Realignment",
    description: "Structured and executed a multi-phase workforce right-sizing initiative across key business divisions to optimize personnel cost structure.",
    metric: "$30M",
    metricLabel: "Annual Savings",
    details: {
        overview: "Led the strategic planning and operational execution of a multi-phase workforce reduction program, balancing target run-rate cost reductions with key talent retention and operational continuity.",
        highlights: [
            "Constructed role-level dependency frameworks to evaluate operational redundancies and critical skill gaps across 8 operating divisions.",
            "Modeled multi-scenario severance liabilities, retention packages, and transition timelines under strict budgetary parameters.",
            "Coordinated with Legal, HR, and Public Relations workstreams to ensure regulatory compliance (including WARN Act) and execution sensitivity.",
            "Redesigned post-reduction team structures and workflows to ensure uninterrupted core operations and prevent burnout.",
        ],
        outcome: "Delivered all execution phases on schedule, unlocking $18M in annualized cost savings while maintaining a 95%+ retention rate among designated key talent.",
    },
    },
    {
        id: 11,
        tag: "Volunteering",
        title: "Boys State Operations & Logistics Revamp",
        description: "Overhauled operational logistics, scheduling systems, and administrative infrastructure for a premier leadership program.",
        metric: "1,000+",
        metricLabel: "Participants Served",
        details: {
            overview: "Executed an operational overhaul of event logistics, participant management, and program scheduling for a major civic leadership summit.",
            highlights: [
                "Digitized participant tracking and registration processes, replacing legacy manual record systems.",
                "Optimized multi-site scheduling, resource distribution, and speaker logistics across a intensive 7-day program.",
                "Managed a cross-functional staff team handling health, safety, parliamentary procedures, and event execution.",
                "Designed feedback loops and KPI reporting metrics to ensure continuous year-over-year operational improvements.",
            ],
            outcome: "Delivered the highest-rated participant experience score in program history while trimming operational overhead by 15%.",
        },
    },
];

const TAG_COLORS = {
    Finance:    { bg: "rgba(212,175,55,0.1)",  text: "rgb(212,175,55)" },
    Quant:      { bg: "rgba(100,185,130,0.1)", text: "rgb(100,185,130)" },
    Consulting: { bg: "rgba(90,160,210,0.1)",  text: "rgb(90,160,210)" },
    Strategy:   { bg: "rgba(220,160,100,0.1)", text: "rgb(220,160,100)" },
    Volunteering: { bg: "rgba(220,160,100,0.1)", text: "rgb(199, 28, 71)" },
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
                    Highlights & Recent Projects
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