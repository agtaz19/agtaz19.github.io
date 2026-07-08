import React, { useState, useMemo } from "react";
import { Search, FileText, X } from "lucide-react";

const PROJECTS = [
    {
        id: "volsurface",
        tag: "Research",
        title: "Volatility Surface Calibrator",
        year: "2024",
        quarter: "Q1",
        season: "Winter",
        status: "Live",
        description: "Calibrates stochastic local volatility models (Heston, SABR, Rough Bergomi) to live option chain data. Outputs smooth implied vol surfaces with arbitrage checks. Used for options desk analytics.",
        stack: ["Python", "SciPy", "QuantLib", "Plotly"],
        pdf: "https://www.w3.org/WAI/WCAG21/Techniques/pdf/PDF1",
        pdfLabel: "Methodology Paper",
    },
    {
        id: "macrodash",
        tag: "Tools",
        title: "Macro Dashboard",
        year: "2024",
        quarter: "Q3",
        season: "Summer",
        status: "Internal",
        description: "A real-time macro monitoring dashboard that aggregates central bank data, yield curves, credit spreads, and commodity signals into a single regime scorecard. Alerts on regime transitions.",
        stack: ["Python", "Streamlit", "FRED API", "Bloomberg API"],
        pdf: null,
        pdfLabel: null,
    },
    {
        id: "riskengine",
        tag: "Quantitative",
        title: "Python Risk Engine",
        year: "2023",
        quarter: "Q2",
        season: "Spring",
        status: "Live",
        description: "A production-grade portfolio risk engine built in Python. Covers VaR (historical, parametric, Monte Carlo), CVaR, factor decomposition, and stress testing across multi-asset portfolios. Used live by two institutional clients.",
        stack: ["Python", "NumPy", "Pandas", "Polars", "FastAPI"],
        pdf: "https://www.w3.org/WAI/WCAG21/Techniques/pdf/PDF1",
        pdfLabel: "Technical Overview",
    },
    {
        id: "nlpcredit",
        tag: "Research",
        title: "NLP Credit Signal Extractor",
        year: "2023",
        quarter: "Q4",
        season: "Fall",
        status: "Research",
        description: "Applies transformer-based NLP to earnings call transcripts and 10-K filings to extract forward-looking credit signals. Demonstrated alpha on high-yield universe over a 3-year backtest period.",
        stack: ["Python", "HuggingFace", "FinBERT", "Pandas"],
        pdf: "https://www.w3.org/WAI/WCAG21/Techniques/pdf/PDF1",
        pdfLabel: "Research Brief",
    },
    {
        id: "alloc",
        tag: "Quantitative",
        title: "Dynamic Asset Allocator",
        year: "2022",
        quarter: "Q3",
        season: "Summer",
        status: "Live",
        description: "A signal-driven tactical asset allocation engine that combines momentum, value, carry, and macro signals into a daily rebalancing recommendation across 12 asset classes.",
        stack: ["Python", "PostgreSQL", "Docker", "Airflow"],
        pdf: null,
        pdfLabel: null,
    },
];

const TAG_COLORS = {
    "Quantitative": "rgb(212,175,55)",
    "Research":     "rgb(90,160,210)",
    "Tools":        "rgb(100,185,130)",
};

const ALL_TAGS = ["All", ...Object.keys(TAG_COLORS)];

export default function Projects() {
    const [active, setActive] = useState(null);
    const [query, setQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState("All");

    const filtered = useMemo(() => {
        const q = query.toLowerCase();
        return PROJECTS.filter((p) => {
            const matchesTag = selectedTag === "All" || p.tag === selectedTag;
            const matchesQuery =
                !q ||
                p.title.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                p.stack.some((s) => s.toLowerCase().includes(q)) ||
                p.tag.toLowerCase().includes(q);
            return matchesTag && matchesQuery;
        });
    }, [query, selectedTag]);

    return (
        <>
            <section className="relative bg-dark-panel border-b overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="absolute inset-0">
                    <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1800&q=80&fit=crop" alt="" className="w-full h-full object-cover object-center opacity-50" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.2) 100%)" }} />
                </div>
                <div className="relative z-10" style={{ paddingTop: "clamp(5rem,10vw,9rem)", paddingBottom: "clamp(3rem,6vw,5rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/40 mb-3">Who I Am</p>
                    <h1 className="font-heading font-bold text-white leading-[1.05]" style={{ fontSize: "clamp(2.2rem,5vw,4.5rem)" }}>Projects</h1>
                    <p className="mt-5 text-base md:text-lg leading-relaxed text-white/60 max-w-2xl">Selected builds, models, and tools — live, research, and internal.</p>
                </div>
            </section>

            <section style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(4rem,8vw,7rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                {/* Search + filter bar */}
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                    <div className="relative flex-1 max-w-md">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-muted" />
                        <input
                            type="text"
                            placeholder="Search by title, stack, or keyword…"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full pl-9 pr-8 py-2.5 text-sm bg-transparent border border-theme text-theme placeholder:text-theme-muted focus:outline-none focus:border-[rgb(212,175,55)] transition-colors"
                        />
                        {query && (
                            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-muted hover:text-theme">
                                <X size={12} />
                            </button>
                        )}
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {ALL_TAGS.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className="text-[10px] tracking-[0.15em] uppercase px-3 py-2 border transition-colors duration-200"
                                style={{
                                    borderColor: selectedTag === tag ? (TAG_COLORS[tag] || "rgb(212,175,55)") : "rgb(var(--border-color))",
                                    color: selectedTag === tag ? (TAG_COLORS[tag] || "rgb(212,175,55)") : "rgb(var(--text-secondary))",
                                }}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results count */}
                {(query || selectedTag !== "All") && (
                    <p className="text-xs text-theme-muted mb-6">{filtered.length} project{filtered.length !== 1 ? "s" : ""} found</p>
                )}

                <div className="space-y-0">
                    {filtered.length === 0 ? (
                        <p className="text-sm text-theme-muted py-10">No projects match your search.</p>
                    ) : (
                        filtered.map((p) => (
                            <div
                                key={p.id}
                                className="border-b border-theme cursor-pointer"
                                onClick={() => setActive(active === p.id ? null : p.id)}
                            >
                                <div className="flex items-start justify-between gap-6 py-7">
                                    <div className="flex items-start gap-5 flex-1">
                                        <span className="text-xs font-mono tracking-widest text-theme-muted pt-1 flex-shrink-0 w-