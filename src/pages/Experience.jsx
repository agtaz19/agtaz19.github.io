import React from "react";
import Sailing from "@/assets/stock_photos/Experience_Sailing.jpg"

const ROLES = [
    {
        period: "2024 – Present",
        location: "New York, NY",
        title: "Alternative Investments Business Transformation Analyst, Assistant Vice-President",
        firm: "State Street",
        description: "Part of the Alternative Investments Business Transformation team, supporting strategic and operational initiatives across institutional alternative investment platforms, including private equity, private credit, and real assets. Focused on process optimization, data-driven insights, and scalable solutions to enhance investment operations and decision-making.",
        highlights: ["Led team execution and coordinated cross-functional partners to deploy operational and technology enhancements across alternative investment platforms, turning complex workflows into actionable deliverables.","Designed and implemented analytical models to optimize portfolio operations and evaluate investment workflows.", "Worked with large-scale financial datasets using SQL, Python, and Excel to support performance analysis, reporting, and scenario modeling.", "Collaborated with cross-functional teams, including risk, compliance, technology, and reporting, to deliver process improvements and technology-enabled solutions."],
    },
    {
        period: "2022 – 2024",
        location: "New York, New York",
        title: "Management Consultant, Consultant",
        firm: "FTI Consulting",
        description: "Consulting within FTI’s Corporate Finance & Restructuring practice, advising corporate clients, creditors, and investors on complex restructuring, turnaround, and performance improvement initiatives. Focused on financial analysis, operational optimization, and business transformation to support strategic and transactional decision-making.",
        highlights: ["Developed financial models, valuation analyses, and liquidity forecasts to guide restructuring and turnaround strategies for clients across industries.", "Evaluated operational and financial data to identify performance gaps and quantify potential improvements.", "Partnered with cross-functional teams, including legal, finance, and operations, to craft actionable recommendations and execution plans.", " Produced executive-ready reports, dashboards, and presentations to inform stakeholder decision-making in both in-court and out-of-court restructuring scenarios."],
    },
    {
        period: "2022",
        location: "Tempe, Arizona",
        title: "Research Analyst",
        firm: "Center for Investment Engineering, W.P. Carey School of Business",
        description: "Conducted quantitative finance research within the Center for Investment Engineering, supporting faculty-led projects on asset pricing, investment strategies, and financial statement analysis. Focused on structuring and analyzing complex datasets to generate actionable insights for empirical research.",
        highlights: ["Organized unstructured historical financial statement data to enable large-scale empirical analysis.", "Assisted in development of models linking R&D expenditures to future cash-based operating profitability and expected returns, contributing to peer-reviewed research (Goyal, A. & Wahal, S., 2023, “R&D, Expected Profitability, and Expected Returns”).", "Performed statistical and econometric analyses to validate hypotheses and generate research-ready datasets.", "Prepared technical reports and visualizations summarizing findings for faculty and academic audiences."],
    }
];

const TOOL_GROUPS = [
    {
        label: "Programming Languages",
        items: ["Git/Github", "Python", "R", "C++", "SQL", "Java", "Magma", "SageMath", "Mathematica", "LaTeX"],
    },
    {
        label: "Market Intelligence Software",
        items: ["Bloomberg Terminal", "FactSet", "Refinitiv Eikon", "Capital IQ","Morningstar Direct"],
    },
    {
        label: "Microsoft Suite",
        items: ["Excel (Advanced)", "PowerPoint", "Word", "Access", "Power BI", "PowerBI", "Power Automate", "VBA"],
    },
    {
        label: "Other Tools",
        items: ["NumPy / SciPy", "Pandas", "scikit-learn", "PyTorch", "Seaborn", "DateTime", "Tableau"],
    },
];

const INDUSTRY_GROUPS = [
    {
        label: "Finance & Quantitative Finance",
        items: ["Refinitiv, Debtwire, Octus", "Pitchbook, Crunchbase, WRDs", "Mergers & Acquisitions", "Alternative Investments", "Portfolio Management", "Risk Management", "Trading", "Due Diligence (Commercial, Market, Operational)",  "Investments", "FP&A", "Securities: Fixed Income, Options", "Restructuring: Bankruptcy Advisory, 13 Week Cash Flow", "Investment Management", "Management: Corporate Strategy, Business Strategy, Market Research, Operational Modeling, Business Development, Root Cause Analysis"],
    },
    {
        label: "Estate Planning & Private Wealth Management",
        items: ["Family Office Advisory", "Business Law", "Trust & Estate Structuring", "Tax-Efficient Asset Allocation"],
    },
    {
        label: "Data Science",
        items: ["Quantitative Analytics", "Statistics: Regressions, Bayesian Statistics, Maximum Likelihood Estimator", "Time Series Forecasting", "Natural Language Processing (Finance)"],
    },
    {
        label: "Supply Chain Management",
        items: ["Inventory Optimization", "Procurement Analytics", "Logistics Network Modeling", "Pricing Strategy", "Cost & Spend Management"],
    },
    {
        label: "Accounting",
        items: ["Financial Statement Analysis", "Financial Accounting", "Management Accounting", "GAAP / IFRS Frameworks", "Forensic Accounting Principles", "Fund Accounting", "AR/AP Management"],
    },
    {
        label: "Real Estate",
        items: ["Real Estate Valuation (Residential, Commercial, Residential)", "REITs & Property Portfolio Analysis", "Cap Rate & DCF Modeling", "Market Entry & Feasibility Studies"],
    },
];

const ORGS = [
    { name: "International Association for Quantitative Finance (IAQF)", role: "Member", since: "2022", url: "https://www.iaqf.org/" },
    { name: "Society of Quantitative Analysis (SQA)", role: "Member", since: "2022", url: "https://www.sqa-us.org/" },
    { name: "Society for Industrial & Applied Mathematics (SIAM)", role: "Member", since: "2024", url: "https://www.siam.org/" },
    { name: "Institute for Supply Management (ISM)", role: "Member", since: "2021", url: "https://www.ismworld.org/" },
    { name: "The American Finance Association (AFA)", role: "Member", since: "2021", url: "https://afajof.org/" },
    { name: "Turnaround Management Association (TMA)", role: "Member", since: "2022", url: "https://www.turnaround.org/" },
    { name: "Beta Gamma Sigma (BGS)", role: "Member", since: "2020", url: "https://www.betagammasigma.org/" }
];

export default function Experience() {
    return (
        <>
            <section className="relative bg-dark-panel border-b overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="absolute inset-0">
                    <img src={Sailing} alt="" className="w-full h-full object-cover object-center opacity-50" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.2) 100%)" }} />
                </div>
                <div className="relative z-10" style={{ paddingTop: "clamp(5rem,10vw,9rem)", paddingBottom: "clamp(3rem,6vw,5rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/40 mb-3">Who I Am</p>
                    <h1 className="font-heading font-bold text-white leading-[1.05]" style={{ fontSize: "clamp(2.2rem,5vw,4.5rem)" }}>Work & Experience</h1>
                    <p className="mt-5 text-base md:text-lg leading-relaxed text-white/60">
                        I am an Assistant Vice-President in State Street’s Alternative Investments Transformation group, where I operate at the interface of operational architecture, data flows, and technology-enabled process design across private equity, hedge fund, and alternative investment platforms. My work involves decomposing complex fund lifecycle processes, eliciting and formalizing business requirements, and partnering with internal technology teams to deliver scalable solutions that improve operational efficiency, data integrity, and risk controls. Previously, I was a management consultant in FTI Consulting’s Corporate Finance & Restructuring practice, where I applied rigorous financial analysis, process diagnostics, and execution frameworks to performance improvement, restructuring, and transaction-related engagements, contributing to over $55 million in realized cost savings. Earlier experience includes private equity, venture capital, and corporate strategy roles at Transcend Healthcare Partners, Anodize Capital Partners (a search fund), and Intel, where I supported investment underwriting, due diligence, financial modeling, and data-driven go-to-market strategy initiatives, including work on autonomous vehicle programs.
                    </p>
                    <p className="mt-5 text-base md:text-lg leading-relaxed text-white/60">
                        I am looking to expand my skills and experience in quantitiative finance as I complete my Mathematics degree at Baruch College.
                    </p>
                </div>
            </section>

            {/* Roles */}
            <section className="border-b border-theme" style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(3rem,7vw,6rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                <div className="space-y-0">
                    <div className="lg:col-span-3">
                        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-theme-muted">Work Experience</p>
                    </div>
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
                            <div key={i} className="group flex flex-col md:flex-row md:items-center justify-between gap-2 py-5 border-b border-theme">
                                <div>
                                    <a 
                                        href={org.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="inline-flex items-center gap-1.5 font-heading font-semibold text-base text-theme hover:opacity-75 transition-opacity"
                                    >
                                        {org.name}
                                        <svg className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
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