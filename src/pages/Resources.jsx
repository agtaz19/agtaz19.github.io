import React, { useState } from "react";
import { Link } from "react-router-dom";

const RESOURCES = [
    {
        category: "Frameworks",
        items: [
            { title: "Risk Parity Allocation Guide", description: "Step-by-step methodology for building a risk-parity multi-asset portfolio. Covers covariance estimation, leverage constraints, and rebalancing triggers.", type: "PDF Guide" },
            { title: "Scenario Analysis Playbook", description: "A structured framework for conducting macro scenario analysis across 5 standard regimes: expansion, slowdown, recession, stagflation, and financial stress.", type: "PDF Guide" },
            { title: "Strategic Optionality Map", description: "A decision-framework template for mapping optionality in complex strategic decisions. Used in board-level advisory engagements.", type: "Template" },
        ],
    },
    {
        category: "Quantitative Tools",
        items: [
            { title: "Monte Carlo VaR Calculator", description: "Excel-based Monte Carlo simulation tool for portfolio Value-at-Risk. Supports correlated assets, fat tails (Student-t), and confidence interval reporting.", type: "Excel Model" },
            { title: "Volatility Surface Visualizer", description: "Python notebook for plotting and analyzing implied volatility surfaces from options chain data. Includes SABR calibration.", type: "Python Notebook" },
            { title: "Factor Exposure Decomposer", description: "Decomposes a multi-asset portfolio's returns into standard macro and style factors. Outputs attribution table and correlation heatmap.", type: "Python Notebook" },
        ],
    },
    {
        category: "Reading",
        items: [
            { title: "Recommended Reading List", description: "Curated list of 40 books across quantitative finance, macroeconomics, strategy, and decision science — organized by level and topic.", type: "Reference" },
            { title: "Key Papers in Quantitative Finance", description: "Annotated bibliography of 25 foundational academic papers every serious practitioner should read, from Black-Scholes to rough volatility.", type: "Reference" },
        ],
    },
];

export default function Resources() {
    const [open, setOpen] = useState({});
    const toggle = (key) => setOpen(prev => ({ ...prev, [key]: !prev[key] }));

    return (
        <>
            <section className="relative bg-dark-panel border-b overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="absolute inset-0">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1800&q=80&fit=crop" alt="" className="w-full h-full object-cover object-center opacity-50" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.2) 100%)" }} />
                </div>
                <div className="relative z-10" style={{ paddingTop: "clamp(5rem,10vw,9rem)", paddingBottom: "clamp(3rem,6vw,5rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/40 mb-3">Insights</p>
                    <h1 className="font-heading font-bold text-white leading-[1.05]" style={{ fontSize: "clamp(2.2rem,5vw,4.5rem)" }}>Resources</h1>
                    <p className="mt-5 text-base md:text-lg leading-relaxed text-white/60 max-w-2xl">Frameworks, models, templates, and curated references for serious practitioners.</p>
                </div>
            </section>

            <section style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(4rem,8vw,7rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                <p className="text-xs text-theme-muted mb-10 max-w-xl">
                    Resources marked as guides or templates are available upon request to active clients. Notebooks are available via GitHub.{" "}
                    <Link to="/support" style={{ color: "rgb(var(--accent))" }}>Contact to request access →</Link>
                </p>

                <div className="space-y-12">
                    {RESOURCES.map((section) => (
                        <div key={section.category}>
                            <h2 className="text-xs font-semibold tracking-[0.25em] uppercase text-theme-muted mb-4 pb-4 border-b border-theme">
                                {section.category}
                            </h2>
                            <div className="space-y-0">
                                {section.items.map((item, i) => {
                                    const key = `${section.category}-${i}`;
                                    return (
                                        <div
                                            key={i}
                                            className="border-b border-theme cursor-pointer"
                                            onClick={() => toggle(key)}
                                        >
                                            <div className="flex items-center justify-between gap-6 py-5">
                                                <div className="flex items-center gap-4 flex-1">
                                                    <h3 className="font-heading font-semibold text-base text-theme">{item.title}</h3>
                                                    <span className="text-[10px] tracking-[0.12em] uppercase px-2 py-0.5 border border-theme text-theme-muted hidden sm:inline-block">{item.type}</span>
                                                </div>
                                                <span className="text-theme-muted flex-shrink-0" style={{ transform: open[key] ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.2s", display: "inline-block" }}>+</span>
                                            </div>
                                            {open[key] && (
                                                <p className="text-sm leading-relaxed text-theme-muted pb-5 max-w-2xl">{item.description}</p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}