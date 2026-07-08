import React from "react";

const ROLES = [
    {
        period: "2023 – Present",
        location: "New York, NY",
        title: "Principal Advisor",
        firm: "Independent Practice",
        description: "Lead engagements in quantitative strategy, portfolio construction, and capital allocation for institutional clients and family offices. Typical mandate size: $200M–$2B AUM.",
        highlights: ["Structured a risk-parity overlay for a $800M multi-asset portfolio", "Advised on market entry strategy for two sovereign wealth funds entering U.S. equities", "Developed a proprietary options pricing model adopted by a mid-size hedge fund"],
    },
    {
        period: "2021 – 2023",
        location: "New York & London",
        title: "Senior Strategy Consultant",
        firm: "Boutique Advisory Firm",
        description: "Led cross-border strategy engagements for asset managers, family offices, and corporate executives. Covered M&A feasibility, market structuring, and regulatory strategy.",
        highlights: ["Managed a team of 4 analysts across 8 client mandates simultaneously", "Delivered board-level presentations in Singapore, Dubai, and Zurich", "Designed a scenario-analysis framework adopted as a firm-wide standard"],
    },
    {
        period: "2019 – 2021",
        location: "New York, NY",
        title: "Quantitative Analyst",
        firm: "Global Macro Hedge Fund",
        description: "Built and maintained systematic equity and macro models. Managed a discretionary sub-portfolio through the 2020 volatility cycle. Responsible for risk reporting and model validation.",
        highlights: ["Reduced drawdown by 18% during March 2020 through dynamic hedge rebalancing", "Deployed 3 production quant models with live capital allocation", "Led migration of risk infrastructure from legacy Excel to Python-based pipeline"],
    },
    {
        period: "2017 – 2019",
        location: "New York, NY",
        title: "M.S. Financial Engineering",
        firm: "NYU Courant Institute",
        description: "Graduate research focused on stochastic volatility models, derivatives pricing, and machine learning applications in quantitative finance.",
        highlights: ["Thesis: 'Calibration of the Rough Bergomi Model Under Market Microstructure Constraints'", "Research assistant to Prof. in computational finance", "Dean's List, Merit Fellowship recipient"],
    },
];

const TOOL_GROUPS = [
    {
        label: "Programming Languages",
        items: ["Python", "R", "MATLAB", "C++", "SQL", "VBA"],
    },
    {
        label: "Market Intelligence Software",
        items: ["Bloomberg Terminal", "FactSet", "Refinitiv Eikon", "Capital IQ", "Morningstar Direct"],
    },
    {
        label: "Microsoft Suite",
        items: ["Excel (Advanced)", "PowerPoint", "Word", "Access", "Power BI"],
    },
    {
        label: "Other Tools",
        items: ["NumPy / SciPy", "pandas", "scikit-learn", "PyTorch", "Git", "LaTeX", "Jupyter", "Tableau"],
    },
];

const INDUSTRY_GROUPS = [
    {
        label: "Finance & Quantitative Finance",
        items: ["Derivatives Pricing & Structuring", "Portfolio Construction & Optimization", "Quantitative Risk Management", "Macro Strategy", "Fixed Income & Rates", "Equity Long/Short", "Regulatory Capital (Basel III/IV)"],
    },
    {
        label: "Estate Planning & Private Wealth Management",
        items: ["Family Office Advisory", "Intergenerational Wealth Transfer", "Trust & Estate Structuring", "Tax-Efficient Asset Allocation"],
    },
    {
        label: "Data Science",
        items: ["Machine Learning & Statistical Modeling", "Alternative Data Analysis", "Time Series Forecasting", "Natural Language Processing (Finance)"],
    },
    {
        label: "Supply Chain Management",
        items: ["Inventory Optimization", "Procurement Analytics", "Logistics Network Modeling"],
    },
    {
        label: "Accounting",
        items: ["Financial Statement Analysis", "Management Accounting", "GAAP / IFRS Frameworks", "Forensic Accounting Principles"],
    },
    {
        label: "Real Estate",
        items: ["Commercial Real Estate Valuation", "REITs & Property Portfolio Analysis", "Cap Rate & DCF Modeling", "Market Entry & Feasibility Studies"],
    },
];

const ORGS = [
    { name: "CFA Institute", role: "Charterholder", since: "2021" },
    { name: "Global Association of Risk Professionals (GARP)", role: "Member", since: "2020" },
    { name: "Society of Quantitative Analysts (SQA)", role: "Member", since: "2019" },
    { name: "New York Hedge Fund Roundtable", role: "Member", since: "2022" },
];

export default function Experience() {
    return (
        <>
            <section className="relative bg-dark-panel border-b overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="absolute inset-0">
                    <img src="https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=1800&q=80&fit=crop" alt="" className="w-full h-full object-cover object-center opacity-50" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.2) 100%)" }} />
                </div>
                <div className="relative z-10" style={{ paddingTop: "clamp(5rem,10vw,9rem)", paddingBottom: "clamp(3rem,6vw,5rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/40 mb-3">Who I Am</p>
                    <h1 className="font-heading font-bold text-white leading-[1.05]" style={{ fontSize: "clamp(2.2rem,5vw,4.5rem)" }}>Work & Experience</h1>
                    <p className="mt-5 text-base md:text-lg leading-relaxed text-white/60 max-w-2xl">Roles, engagements, and professional milestones across markets, advisory, and research.</p>
                </div>
            </section>

            {/* Roles */}
            <section className="border-b border-theme" style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(3rem,7vw,6rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                <div className="space-y-0">
                    {ROLES.map((role, i) => (
                        <div key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 py-10 border-b border-theme">
                            {/* Left: period + location stacked */}
                            <div className="lg:col-span-3 flex flex-col gap-1">
                                <p className="text-xs font-mono tracking-widest text-theme-muted">{role.period}</p>
                                <p className="text-xs font-mono tracking-wide" style={{ color: "rgb(212,175,55)", opacity: 0.7 }}>{role.location}</p>
                            </div>
                            <div className="lg:col-span-9">
                                <h3 className="font-heading font-semibold text-xl text-theme">{role.title}</h3>
                                <p className="text-sm font-bold mt-1 mb-3" style={{ color: "rgb(134,197,134)" }}>{role.firm}</p>
                                <p className="text-sm leading-relaxed text-theme-muted mb-4">{role.description}</p>
                                <ul className="space-y-1.5">
                                    {role.highlights.map((h, j) => (
                                        <li key={j} className="flex items-start gap-2.5 text-sm text-theme-muted">
                                            <span style={{ color: "rgb(var(--accent))" }} className="mt-1.5 flex-shrink-0">—</span>
                                            {h}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Tools & Technologies */}
            <section className="border-b border-theme" style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(3rem,7vw,6rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    <div className="lg:col-span-3">
                        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-theme-muted">Tools & Technologies</p>
                    </div>
                    <div className="lg:col-span-9 space-y-8">
                        {TOOL_GROUPS.map((group) => (
                            <div key={group.label}>
                                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: "rgb(212,175,55)" }}>{group.label}</p>
                                <div className="flex flex-wrap gap-2">
                                    {group.items.map((item) => (
                                        <span key={item} className="text-xs tracking-[0.08em] uppercase px-3 py-1.5 border border-theme text-theme-muted">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Industry Knowledge */}
            <section className="border-b border-theme" style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(3rem,7vw,6rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    <div className="lg:col-span-3">
                        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-theme-muted">Industry Knowledge</p>
                    </div>
                    <div className="lg:col-span-9 space-y-8">
                        {INDUSTRY_GROUPS.map((group) => (
                            <div key={group.label}>
                                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: "rgb(212,175,55)" }}>{group.label}</p>
                                <div className="flex flex-wrap gap-2">
                                    {group.items.map((item) => (
                                        <span key={item} className="text-xs tracking-[0.08em] px-3 py-1.5 border border-theme text-theme-muted">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Professional Organizations */}
            <section style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(4rem,8vw,7rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    <div className="lg:col-span-3">
                        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-theme-muted">Professional Organizations</p>
                    </div>
                    <div className="lg:col-span-9 space-y-0">
                        {ORGS.map((org, i) => (
                            <div key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-2 py-5 border-b border-theme">
                                <div>
                                    <p className="font-heading font-semibold text-base text-theme">{org.name}</p>
                                    <p className="text-xs tracking-[0.1em] uppercase mt-0.5" style={{ color: "rgb(212,175,55)" }}>{org.role}</p>
                                </div>
                                <span className="text-xs font-mono text-theme-muted flex-shrink-0">Since {org.since}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}