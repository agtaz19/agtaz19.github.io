import React, { useState } from "react";
    import { ChevronDown } from "lucide-react";

    const EVENTS = [
        {
            date: "Oct 2025", title: "CFA Institute Annual Conference", role: "Keynote Speaker", location: "Chicago, IL", topic: "Regime-Adaptive Portfolio Construction in a Post-QE World",
            slides: [
                { label: "Title", img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80&fit=crop" },
                { label: "Regime Framework", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&fit=crop" },
                { label: "Backtest Results", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&fit=crop" },
                { label: "Conclusion", img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80&fit=crop" },
            ],
        },
        {
            date: "Jun 2025", title: "Global Risk Forum", role: "Panelist", location: "Zurich, Switzerland", topic: "Tail Risk Management: Lessons from Recent Market Dislocations",
            slides: [
                { label: "Panel Overview", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&fit=crop" },
                { label: "Stress Scenarios", img: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=800&q=80&fit=crop" },
                { label: "Hedging Strategies", img: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&q=80&fit=crop" },
            ],
        },
        { date: "Mar 2025", title: "NYU Stern Finance Symposium", role: "Guest Lecturer", location: "New York, NY", topic: "Machine Learning Applications in Credit Markets" },
        {
            date: "Nov 2024", title: "Singapore FinTech Festival", role: "Speaker", location: "Singapore", topic: "Quantitative Methods for Emerging Market Allocation",
            slides: [
                { label: "Introduction", img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80&fit=crop" },
                { label: "EM Allocation Framework", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&fit=crop" },
                { label: "Risk Adjustments", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80&fit=crop" },
            ],
        },
        { date: "Sep 2024", title: "Columbia Engineering Alumni Forum", role: "Panelist", location: "New York, NY", topic: "From Academia to Markets: Applied Math in Practice" },
        { date: "Apr 2024", title: "Milken Institute Global Conference", role: "Invited Attendee", location: "Beverly Hills, CA", topic: "Systemic Risk and Capital Markets Resilience" },
    ];

    // Outreach organized by organization
    const OUTREACH_ORGS = [
        {
            org: "Columbia University — SIPA",
            role: "Mentor",
            since: "Sep 2022",
            entries: [
                "Mentoring graduate students in quantitative finance and career strategy — 3 mentees per academic year.",
                "Participant in the Columbia Alumni Mentorship Network since 2022.",
            ],
        },
        {
            org: "NYU Courant Institute",
            role: "Guest Faculty",
            since: "Jan 2021",
            entries: [
                "Annual guest lectures on stochastic volatility models and derivatives pricing for M.S. Financial Engineering students.",
                "Occasional thesis committee advisor for doctoral candidates in computational finance.",
            ],
        },
        {
            org: "Math for Finance Initiative",
            role: "Advisory Board Member",
            since: "Mar 2023",
            entries: [
                "Non-profit that teaches quantitative finance to underserved undergraduates at CUNY colleges.",
                "Provide curriculum guidance and facilitate industry speaker programming.",
            ],
        },
    ];

    // Extracurricular organizations
    const EXTRACURRICULAR = [
        {
            org: "Sports Car Club of America (SCCA)",
            role: "Competitor / Member",
            image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&auto=format&fit=crop",
            description: "Active road racing competitor in the SCCA Solo and Time Trial programs. Regional events along the northeast circuit.",
        },
        {
            org: "Historic Sports Car Network of New York (HSNY)",
            role: "Member",
            image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=900&auto=format&fit=crop",
            description: "Member of the New York-based club dedicated to the preservation and racing of historic sports and racing cars.",
        },
    ];

    function SlideDeck({ slides }) {
        const [open, setOpen] = useState(false);
        const [active, setActive] = useState(0);

        return (
            <div className="mt-3">
                <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase font-semibold transition-opacity hover:opacity-70"
                    style={{ color: "rgb(212,175,55)" }}
                >
                    {open ? "Hide" : "View"} Presentation ({slides.length} slides)
                    <ChevronDown size={11} style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                </button>
                {open && (
                    <div className="mt-4">
                        <div className="w-full overflow-hidden rounded-sm border border-theme" style={{ aspectRatio: "16/9", maxWidth: "640px" }}>
                            <img
                                src={slides[active].img}
                                alt={slides[active].label}
                                className="w-full h-full object-cover transition-opacity duration-300"
                            />
                        </div>
                        <div className="flex gap-2 mt-3 flex-wrap">
                            {slides.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActive(i)}
                                    className="text-[9px] tracking-[0.12em] uppercase px-2.5 py-1.5 border transition-colors duration-150"
                                    style={{
                                        borderColor: active === i ? "rgb(212,175,55)" : "rgb(var(--border-color))",
                                        color: active === i ? "rgb(212,175,55)" : "rgb(var(--text-secondary))",
                                    }}
                                >
                                    {i + 1}. {s.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    export default function Events() {
        return (
            <>
                <section className="relative bg-dark-panel border-b overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                    <div className="absolute inset-0">
                        <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1800&q=80&fit=crop" alt="" className="w-full h-full object-cover object-center opacity-50" />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.2) 100%)" }} />
                    </div>
                    <div className="relative z-10" style={{ paddingTop: "clamp(5rem,10vw,9rem)", paddingBottom: "clamp(3rem,6vw,5rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/40 mb-3">Insights</p>
                        <h1 className="font-heading font-bold text-white leading-[1.05]" style={{ fontSize: "clamp(2.2rem,5vw,4.5rem)" }}>Events & Outreach</h1>
                        <p className="mt-5 text-base md:text-lg leading-relaxed text-white/60 max-w-2xl">Speaking engagements, conferences, lectures, and community initiatives.</p>
                    </div>
                </section>

                {/* Speaking */}
                <section className="border-b border-theme" style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(3rem,7vw,6rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                        <div className="lg:col-span-3">
                            <p className="text-sm font-bold tracking-[0.15em] uppercase text-theme">Speaking</p>
                            <p className="text-xs mt-3 leading-relaxed text-theme-muted">Keynotes, panels, and lectures at leading finance and technology forums.</p>
                        </div>
                        <div className="lg:col-span-9 space-y-0">
                            {EVENTS.map((e, i) => (
                                <div key={i} className="flex flex-col md:flex-row gap-4 md:gap-8 py-6 border-b border-theme">
                                    <span className="text-xs font-mono tracking-widest text-theme-muted flex-shrink-0 md:w-24 pt-0.5">{e.date}</span>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-4 flex-wrap mb-1">
                                            <h3 className="font-heading font-semibold text-base text-theme">{e.title}</h3>
                                            <span className="text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 border border-theme text-theme-muted flex-shrink-0">{e.role}</span>
                                        </div>
                                        <p className="text-xs text-theme-muted mb-1">{e.location}</p>
                                        <p className="text-sm text-theme-muted italic">"{e.topic}"</p>
                                        {e.slides && <SlideDeck slides={e.slides} />}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Outreach & Service */}
                <section className="border-b border-theme" style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(3rem,7vw,6rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                        <div className="lg:col-span-3">
                            <p className="text-sm font-bold tracking-[0.15em] uppercase text-theme">Outreach & Service</p>
                            <p className="text-xs mt-3 leading-relaxed text-theme-muted">Academic mentorship, non-profit advisory, and community engagement.</p>
                        </div>
                        <div className="lg:col-span-9 space-y-0">
                            {OUTREACH_ORGS.map((item, i) => (
                                <div key={i} className="py-8 border-b border-theme">
                                    <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1 md:gap-4 mb-3">
                                        <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4">
                                            <h3 className="font-heading font-semibold text-base text-theme">{item.org}</h3>
                                            <span className="text-[10px] tracking-[0.15em] uppercase flex-shrink-0" style={{ color: "rgb(212,175,55)" }}>{item.role}</span>
                                        </div>
                                        <span className="text-xs font-mono text-theme-muted flex-shrink-0">{item.since}</span>
                                    </div>
                                    <ul className="space-y-2">
                                        {item.entries.map((entry, j) => (
                                            <li key={j} className="flex items-start gap-2.5 text-sm text-theme-muted">
                                                <span style={{ color: "rgb(212,175,55)" }} className="mt-1.5 flex-shrink-0">—</span>
                                                {entry}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Extracurricular */}
                <section style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(4rem,8vw,7rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                        <div className="lg:col-span-3">
                            <p className="text-sm font-bold tracking-[0.15em] uppercase text-theme">Extracurricular</p>
                            <p className="text-xs mt-3 leading-relaxed text-theme-muted">Organizations and pursuits outside of professional practice.</p>
                        </div>
                        <div className="lg:col-span-9 space-y-0">
                            {EXTRACURRICULAR.map((item, i) => (
                                <div key={i} className="py-8 border-b border-theme">
                                    {item.image && (
                                        <div className="w-full h-48 md:h-64 overflow-hidden mb-5 rounded-sm">
                                            <img src={item.image} alt={item.org} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 mb-2">
                                        <h3 className="font-heading font-semibold text-base text-theme">{item.org}</h3>
                                        <span className="text-[10px] tracking-[0.15em] uppercase flex-shrink-0" style={{ color: "rgb(212,175,55)" }}>{item.role}</span>
                                    </div>
                                    <p className="text-sm leading-relaxed text-theme-muted">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </>
        );
    }