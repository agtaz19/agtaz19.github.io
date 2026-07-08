import React from "react";

const PAPERS = [
    {
        year: "2024",
        title: "Regime-Adaptive Risk Parity: A Dynamic Covariance Approach Under Markov Switching",
        authors: "Your Name, Co-Author A, Co-Author B",
        venue: "Journal of Portfolio Management",
        link: "https://doi.org/10.example/2024-regime",
        abstract: "We propose a regime-adaptive extension of the risk parity framework that incorporates Markov-switching volatility regimes into the covariance estimation process. Empirical results across 20 years of multi-asset data demonstrate significant drawdown reduction relative to static risk parity.",
        tags: ["Risk Parity", "Markov Switching", "Portfolio Construction"],
    },
    {
        year: "2023",
        title: "Option Surface Arbitrage and the Volatility Risk Premium: Evidence from Index Options",
        authors: "Your Name, Co-Author C",
        venue: "Review of Financial Studies",
        link: "https://doi.org/10.example/2023-options",
        abstract: "This paper documents systematic mispricing in the implied volatility surface of S&P 500 options and attributes the premium to institutional demand for downside protection. We construct a delta-neutral trading strategy that captures the premium with controlled tail risk.",
        tags: ["Derivatives", "Volatility", "Options Pricing"],
    },
    {
        year: "2022",
        title: "Machine Learning for Credit Spread Prediction: A Gradient Boosting Approach",
        authors: "Your Name, Co-Author D, Co-Author E",
        venue: "Journal of Fixed Income",
        link: "https://doi.org/10.example/2022-ml-credit",
        abstract: "We apply gradient boosting models to the prediction of investment-grade and high-yield credit spreads, incorporating macro, fundamental, and technical features. Out-of-sample results outperform linear benchmarks by 23 bps in mean absolute error.",
        tags: ["Machine Learning", "Credit Markets", "Fixed Income"],
    },
    {
        year: "2021",
        title: "Tail Risk Hedging Efficiency: CDS vs. Long Volatility Strategies in Stress Scenarios",
        authors: "Your Name, Co-Author F",
        venue: "Risk Magazine",
        link: "https://doi.org/10.example/2021-tail-risk",
        abstract: "A comparative analysis of credit default swap overlays versus long volatility positions as portfolio tail risk hedges. We evaluate cost efficiency, correlation stability, and convexity across historical stress periods including 2008, 2011, 2015, and 2020.",
        tags: ["Tail Risk", "CDS", "Hedging"],
    },
];

const WORKING = [
    { title: "Liquidity-Adjusted Factor Models in Emerging Markets", status: "Under Review" },
    { title: "The Informativeness of Options Flow in Predicting Earnings Surprises", status: "Working Paper" },
    { title: "Strategic Asset Allocation Under Climate Transition Risk", status: "Draft" },
];

export default function Publications() {
    return (
        <>
            <section className="relative bg-dark-panel border-b overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="absolute inset-0">
                    <img src="https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=1800&q=80&fit=crop" alt="" className="w-full h-full object-cover object-center opacity-50" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.2) 100%)" }} />
                </div>
                <div className="relative z-10" style={{ paddingTop: "clamp(5rem,10vw,9rem)", paddingBottom: "clamp(3rem,6vw,5rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/40 mb-3">Who I Am</p>
                    <h1 className="font-heading font-bold text-white leading-[1.05]" style={{ fontSize: "clamp(2.2rem,5vw,4.5rem)" }}>Publications & Research</h1>
                    <p className="mt-5 text-base md:text-lg leading-relaxed text-white/60 max-w-2xl">Peer-reviewed papers, working papers, and academic contributions.</p>
                </div>
            </section>

            <section className="border-b border-theme" style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(3rem,7vw,6rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    <div className="lg:col-span-3">
                        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-theme-muted">Published</p>
                    </div>
                    <div className="lg:col-span-9 space-y-0">
                        {PAPERS.map((p, i) => (
                            <div key={i} className="py-8 border-b border-theme">
                                <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                                    <span className="text-xs font-mono tracking-widest text-theme-muted">{p.year}</span>
                                    <span className="text-sm font-bold" style={{ color: "rgb(134,197,134)" }}>{p.venue}</span>
                                </div>
                                {p.link ? (
                                    <a href={p.link} target="_blank" rel="noreferrer" className="group inline-block mb-1">
                                        <h3 className="font-heading font-semibold text-lg text-theme leading-snug group-hover:opacity-70 transition-opacity">{p.title}</h3>
                                    </a>
                                ) : (
                                    <h3 className="font-heading font-semibold text-lg text-theme mb-1 leading-snug">{p.title}</h3>
                                )}
                                <p className="text-xs text-theme-muted mb-3 italic">{p.authors}</p>
                                <p className="text-sm leading-relaxed text-theme-muted mb-4">{p.abstract}</p>
                                <div className="flex flex-wrap gap-2">
                                    {p.tags.map(t => (
                                        <span key={t} className="text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 border border-theme text-theme-muted">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(4rem,8vw,7rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    <div className="lg:col-span-3">
                        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-theme-muted">In Progress</p>
                    </div>
                    <div className="lg:col-span-9 space-y-4">
                        {WORKING.map((w, i) => (
                            <div key={i} className="flex items-center justify-between gap-6 py-4 border-b border-theme">
                                <p className="text-sm text-theme">{w.title}</p>
                                <span className="text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 border border-theme text-theme-muted flex-shrink-0">{w.status}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}