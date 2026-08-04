import React from "react";
import PublicationsImage from "@/assets/stock_photos/Publications_Library_Stock.jpg"

const PAPERS = [
    {
        year: "2023",
        title: "R&D, Expected Profitability, and Expected Returns",
        authors: "Goyal A., Wahal S.",
        venue: "Social Science Research Network",
        link: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4339765",
        abstract: "Current R&D expenditures forecast cash-based operating profitability up to three years in the future and sometimes as much as ten years, but do not forecast asset growth.High R&D firms have positive loadings on a cash-based operating profitability factor, and zero alphas. Capitalizing R&D to augment book values with intangible assets is unnecessary for asset pricing, so long as expected profitability is explicitly recognized as a determinant of expected returns.",
        tags: ["RA","Research & Development", "Intangibles", "Profitability", "Asset Pricing", "Expected Returns", "Accruals"],
    },
        {
        year: "2022",
        title: "Shoes, Coronavirus, & LBOs",
        authors: "Goyal A., Wahal S.",
        venue: "ASU KEEP",
        link: "https://keep.lib.asu.edu/items/164803",
        abstract: "This honors thesis for Barrett, the Honors College at Arizona State University provides an analysis of a leveraged buyout (LBO) of Foot Locker. This thesis serves to demonstrate how a fictional private equity firm would acquire a company through an LBO. The project provides insight onto what private equity firms do, the background of Foot Locker, and an industry analysis on the sector that Foot Locker operates in. The thesis looks to provide a deeper understanding of the fair value of Foot Locker using a discounted cash flow (DCF) analysis, comparable company analysis, and precedent transaction analysis. Included is a pitchbook, the DCF model, and LBO model.",
        tags: ["Private Equity", "Leveraged Buyouts", "Valuation", "Strategy", "Retail", "Supply Chain Management"],
    },
];

const WORKING = [
    { title: "N/A", status: "N/A" },

];

export default function Publications() {
    return (
        <>
            <section className="relative bg-dark-panel border-b overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="absolute inset-0">
                    <img src={PublicationsImage} alt="" className="w-full h-full object-cover object-center opacity-50" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.2) 100%)" }} />
                </div>
                <div className="relative z-10" style={{ paddingTop: "clamp(5rem,10vw,9rem)", paddingBottom: "clamp(3rem,6vw,5rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/40 mb-3">Who I Am</p>
                    <h1 className="font-heading font-bold text-white leading-[1.05]" style={{ fontSize: "clamp(2.2rem,5vw,4.5rem)" }}>Publications & Research</h1>
                    <p className="mt-5 text-base md:text-lg leading-relaxed text-white/60">
                        A curated collection of research work, publications, and projects where I contributed as a collaborator. These pieces reflect a mix of independent inquiry, academic coursework, and partnerships with faculty or peers. Together, they represent the topics I’ve explored in greater depth, the methods I’ve applied, and the areas where I’ve helped advance ongoing research efforts. Please note for the papers that I assisted in the creation of as a research analyst, I include a tag ("RA") - by no means do I take credit or ownership of authorship of said papers.
                    </p>
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