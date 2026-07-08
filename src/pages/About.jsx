import React from "react";
import { Mail, MapPin, Linkedin, Github } from "lucide-react";

const TIMELINE = [
    { year: "2013–2017", role: "B.S. Applied Mathematics & Economics", org: "Columbia University", note: "Graduated with honors. Thesis: volatility surface calibration under stochastic local vol models." },
    { year: "2017–2019", role: "M.S. Financial Engineering", org: "NYU Courant Institute", note: "Focus on derivatives pricing, risk management, and machine learning applications in finance." },
    { year: "2019–2021", role: "Quantitative Analyst", org: "Global Macro Hedge Fund", note: "Built and maintained systematic equity and macro models. Managed a sub-portfolio through 2020 volatility." },
    { year: "2021–2023", role: "Senior Consultant", org: "Boutique Strategy Advisory", note: "Led engagements for sovereign wealth funds and family offices across 8 countries." },
    { year: "2023–Present", role: "Independent Advisor", org: "New York, NY", note: "Principal advisory practice focused on quantitative strategy, capital allocation, and institutional consulting." },
];

const SECTIONS = [
    {
        id: "endeavors",
        label: "Current Endeavors",
        content: [
            "Running an independent advisory practice from New York, working with institutional clients, family offices, and executive teams on quantitative strategy and capital allocation.",
            "Developing proprietary research on regime-adaptive portfolio construction and non-linear risk models.",
            "Engaged as a guest faculty member at NYU Courant, lecturing annually on derivatives pricing and stochastic volatility.",
        ],
    },
    {
        id: "experience",
        label: "Previous Experience",
        content: [
            "Senior Strategy Consultant at a boutique advisory firm spanning New York and London — cross-border engagements for asset managers and corporate executives.",
            "Quantitative Analyst at a global macro hedge fund — systematic equity and macro models, live capital allocation, and risk infrastructure in Python.",
            "Research and model validation work across credit, rates, and equity derivatives.",
        ],
    },
    {
        id: "academic",
        label: "Academic Background",
        content: [
            "M.S. Financial Engineering — NYU Courant Institute. Focus on stochastic volatility, derivatives pricing, and ML in quantitative finance. Merit Fellowship.",
            "B.S. Applied Mathematics & Economics — Columbia University, graduated with honors. Thesis on volatility surface calibration under stochastic local vol models.",
        ],
    },
    {
        id: "interests",
        label: "Personal Interests",
        content: [
            "Motorsport competitor — active member of the Sports Car Club of America (SCCA) and the Historic Sports Car Network of New York (HSNY).",
            "History, philosophy of mathematics, and the history of economic thought.",
            "Long-distance running and endurance sports.",
        ],
    },
    {
        id: "contact",
        label: "How to Contact",
        content: null,
    },
];

export default function About() {
    return (
        <>
            {/* Hero */}
            <section className="relative bg-dark-panel border-b overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="absolute inset-0">
                    <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=80&fit=crop" alt="" className="w-full h-full object-cover object-center opacity-50" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.2) 100%)" }} />
                </div>
                <div className="relative z-10" style={{ paddingTop: "clamp(5rem,10vw,9rem)", paddingBottom: "clamp(3rem,6vw,5rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/40 mb-3">Who I Am</p>
                    <h1 className="font-heading font-bold text-white leading-[1.05]" style={{ fontSize: "clamp(2.2rem,5vw,4.5rem)" }}>About Me</h1>
                    <p className="mt-5 text-base md:text-lg leading-relaxed text-white/60 max-w-2xl">
                        Applied mathematician, financial engineer, and independent advisor. Based in New York.
                    </p>
                </div>
            </section>

            {/* Background + sub-sections */}
            <section className="border-b border-theme" style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(3rem,7vw,6rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    <div className="lg:col-span-3">
                        <p className="text-sm font-bold tracking-[0.15em] uppercase text-theme">Background</p>
                    </div>
                    <div className="lg:col-span-9 space-y-5">
                        <p className="font-heading font-medium leading-[1.4] text-theme" style={{ fontSize: "clamp(1.2rem,2.2vw,1.7rem)" }}>
                            I build the models that move capital and the frameworks that shape strategy.
                        </p>
                        <p className="text-sm leading-relaxed text-theme-muted max-w-2xl">
                            My career sits at the intersection of mathematics, markets, and executive decision-making. I trained as an applied mathematician and financial engineer before spending years inside hedge funds and boutique strategy firms — working on problems that don't have textbook answers.
                        </p>
                        <p className="text-sm leading-relaxed text-theme-muted max-w-2xl">
                            I run an independent advisory practice from New York, working with a small number of institutional clients, family offices, and executive teams on quantitative strategy, portfolio construction, and high-stakes analytical problems.
                        </p>
                    </div>
                </div>

                <div className="mt-14 space-y-10">
                    {SECTIONS.map((sec) => (
                        <div key={sec.id} className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-16">
                            <div className="lg:col-span-3">
                                <p className="text-xs font-semibold tracking-[0.25em] uppercase text-theme-muted">{sec.label}</p>
                            </div>
                            <div className="lg:col-span-9">
                                {sec.id === "contact" ? (
                                    <div className="space-y-3">
                                        <a href="mailto:contact@example.com" className="flex items-center gap-3 text-sm text-theme-muted hover:opacity-70 transition-opacity">
                                            <Mail size={14} style={{ color: "rgb(212,175,55)" }} />
                                            contact@example.com
                                        </a>
                                        <div className="flex items-center gap-3 text-sm text-theme-muted">
                                            <MapPin size={14} style={{ color: "rgb(212,175,55)" }} />
                                            New York, New York
                                        </div>
                                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-theme-muted hover:opacity-70 transition-opacity">
                                            <Linkedin size={14} style={{ color: "rgb(212,175,55)" }} />
                                            linkedin.com/in/yourprofile
                                        </a>
                                        <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-theme-muted hover:opacity-70 transition-opacity">
                                            <Github size={14} style={{ color: "rgb(212,175,55)" }} />
                                            github.com/yourprofile
                                        </a>
                                    </div>
                                ) : (
                                    <div className="space-y-2.5">
                                        {sec.content.map((line, i) => (
                                            <p key={i} className="text-sm leading-relaxed text-theme-muted">{line}</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Timeline */}
            <section className="border-b border-theme" style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(3rem,7vw,6rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    <div className="lg:col-span-3">
                        <p className="text-sm font-bold tracking-[0.15em] uppercase text-theme">Timeline</p>
                    </div>
                    <div className="lg:col-span-9">
                        <div className="space-y-0">
                            {TIMELINE.map((item, i) => (
                                <div key={i} className="flex flex-col md:flex-row gap-4 md:gap-8 py-6 border-b border-theme">
                                    <span className="text-xs font-mono tracking-widest text-theme-muted flex-shrink-0 md:w-36 pt-0.5">{item.year}</span>
                                    <div>
                                        <p className="font-heading font-semibold text-base text-theme">{item.role}</p>
                                        <p className="text-xs tracking-[0.1em] uppercase mt-0.5 mb-2" style={{ color: "rgb(212,175,55)" }}>{item.org}</p>
                                        <p className="text-sm leading-relaxed text-theme-muted">{item.note}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Embedded CV */}
            <section style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(4rem,8vw,7rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    <div className="lg:col-span-3">
                        <p className="text-sm font-bold tracking-[0.15em] uppercase text-theme">Curriculum Vitae</p>
                        <p className="text-xs mt-3 leading-relaxed text-theme-muted">Full CV available below. Request a PDF copy by email.</p>
                    </div>
                    <div className="lg:col-span-9">
                        <div
                            className="w-full rounded-sm border border-theme overflow-hidden"
                            style={{ backgroundColor: "rgb(var(--bg-card))" }}
                        >
                            <div
                                className="flex flex-col items-center justify-center gap-4 py-20"
                                style={{ borderColor: "rgb(var(--border-color))" }}
                            >
                                <p className="text-xs tracking-[0.2em] uppercase text-theme-muted">CV / Résumé</p>
                                <p className="text-sm text-theme-muted max-w-sm text-center leading-relaxed">
                                    To embed your CV, host a PDF and replace this placeholder with an{" "}
                                    <code className="text-xs font-mono" style={{ color: "rgb(212,175,55)" }}>&lt;iframe&gt;</code>.
                                </p>
                                <a
                                    href="mailto:contact@example.com?subject=CV Request"
                                    className="text-xs tracking-[0.15em] uppercase font-semibold transition-opacity hover:opacity-60"
                                    style={{ color: "rgb(212,175,55)" }}
                                >
                                    Request PDF →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}