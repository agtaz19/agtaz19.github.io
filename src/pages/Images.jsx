import React, { useState, useRef } from "react";
import { X } from "lucide-react";

const IMAGES = [
    {
        src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80&fit=crop",
        thumb: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80&fit=crop",
        title: "SCCA Road Racing — Northeast Circuit",
        date: "September 2024",
        description: "Competing in the Sports Car Club of America Time Trial series at Lime Rock Park, Connecticut. Running a prepared 2003 Porsche 996 GT3 in the GTL class.",
        tags: ["Motorsport", "SCCA", "Connecticut"],
    },
    {
        src: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&q=80&fit=crop",
        thumb: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80&fit=crop",
        title: "Historic Sports Car Network of New York",
        date: "June 2024",
        description: "HSNY concours and driving event at Watkins Glen International. One of the most storied circuits in North American motorsport history.",
        tags: ["Historic Racing", "HSNY", "Watkins Glen"],
    },
    {
        src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80&fit=crop",
        thumb: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80&fit=crop",
        title: "New York — Office",
        date: "2023",
        description: "The advisory practice is based in Midtown Manhattan. Most client work is conducted in-person, supplemented by international travel for major engagements.",
        tags: ["New York", "Advisory"],
    },
    {
        src: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=1200&q=80&fit=crop",
        thumb: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=600&q=80&fit=crop",
        title: "Milken Institute Global Conference",
        date: "April 2024",
        description: "Invited attendee at the Milken Institute Global Conference in Beverly Hills. Panel discussions on systemic risk, capital markets resilience, and the evolving role of alternative data.",
        tags: ["Conference", "Beverly Hills", "Finance"],
    },
    {
        src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80&fit=crop",
        thumb: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80&fit=crop",
        title: "CFA Institute Annual Conference",
        date: "October 2025",
        description: "Keynote address at the CFA Institute Annual Conference in Chicago, presenting research on regime-adaptive portfolio construction in a post-QE world.",
        tags: ["Speaking", "Chicago", "CFA"],
    },
    {
        src: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=1200&q=80&fit=crop",
        thumb: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=600&q=80&fit=crop",
        title: "Research & Publications",
        date: "2024",
        description: "Academic research work published in the Journal of Portfolio Management and Review of Financial Studies. The practice maintains active working papers on liquidity-adjusted factor models and options flow informativeness.",
        tags: ["Research", "Academic", "Publications"],
    },
    {
        src: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80&fit=crop",
        thumb: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80&fit=crop",
        title: "Trading Floor — Market Open",
        date: "March 2024",
        description: "On the floor during a volatile market open session. A reminder that data and intuition must work in concert when speed matters.",
        tags: ["Markets", "Finance", "New York"],
    },
    {
        src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&fit=crop",
        thumb: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&fit=crop",
        title: "Alpine Track Day — Switzerland",
        date: "August 2023",
        description: "A private track day in the Swiss Alps organized through the HSNY European circuit. Stunning backdrop and challenging elevation changes.",
        tags: ["Motorsport", "Switzerland", "HSNY"],
    },
    {
        src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&q=80&fit=crop",
        thumb: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80&fit=crop",
        title: "Executive Strategy Session",
        date: "February 2025",
        description: "Off-site strategy session with a sovereign wealth fund executive team, mapping capital allocation priorities through a multi-scenario framework.",
        tags: ["Advisory", "Strategy", "Consulting"],
    },
    {
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80&fit=crop",
        thumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&fit=crop",
        title: "NYU Courant — Guest Lecture",
        date: "November 2024",
        description: "Annual guest lecture for the M.S. Financial Engineering program at NYU Courant, covering rough volatility models and their practical calibration challenges.",
        tags: ["Academia", "NYU", "Lecture"],
    },
    {
        src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80&fit=crop",
        thumb: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80&fit=crop",
        title: "Client Advisory — London",
        date: "May 2024",
        description: "Cross-border engagement with a London-based family office, reviewing portfolio risk exposures and structuring a currency overlay program.",
        tags: ["Advisory", "London", "FX"],
    },
    {
        src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80&fit=crop",
        thumb: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80&fit=crop",
        title: "New York City — Skyline",
        date: "2024",
        description: "The city that never sleeps — and neither do the markets. New York remains the center of gravity for global capital allocation.",
        tags: ["New York", "City"],
    },
];

// Split images into 3 rows with offset starting points
const ROWS = [
    { images: IMAGES.slice(0, 4),   speed: "70s",   offset: "0px",  reverse: false },
    { images: IMAGES.slice(4, 8),   speed: "90s",   offset: "40px", reverse: true  },
    { images: IMAGES.slice(8, 12),  speed: "80s",   offset: "80px", reverse: false },
];

function GalleryStrip({ rowImages, speed, offset, reverse, onSelect }) {
    const [paused, setPaused] = useState(false);
    const strip = [...rowImages, ...rowImages, ...rowImages, ...rowImages];
    const animName = reverse ? "scroll-right" : "scroll-left";

    return (
        <div className="overflow-hidden" style={{ marginBottom: "12px" }}>
            <div
                style={{
                    display: "flex",
                    gap: "12px",
                    width: "max-content",
                    animation: `${animName} ${speed} linear infinite`,
                    animationPlayState: paused ? "paused" : "running",
                    transform: `translateY(${offset})`,
                    marginTop: offset !== "0px" ? `-${offset}` : "0",
                }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                {strip.map((img, i) => (
                    <div
                        key={i}
                        className="group relative cursor-pointer overflow-hidden flex-shrink-0"
                        style={{ width: "300px", height: "210px" }}
                        onClick={() => onSelect(img)}
                    >
                        <img
                            src={img.thumb}
                            alt={img.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-300 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100">
                            <p className="font-heading font-semibold text-white text-sm leading-snug mb-1">{img.title}</p>
                            <p className="text-xs font-mono text-white/60 mb-2">{img.date}</p>
                            <div className="flex flex-wrap gap-1 mb-3">
                                {img.tags.map(tag => (
                                    <span key={tag} className="text-[9px] tracking-[0.12em] uppercase px-1.5 py-0.5 border border-white/30 text-white/70">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <p className="text-xs tracking-[0.15em] uppercase font-semibold text-white/90">View →</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Images() {
    const [selected, setSelected] = useState(null);

    return (
        <>
            <style>{`
                @keyframes scroll-left {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes scroll-right {
                    0%   { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
            `}</style>

            {/* Hero */}
            <section className="relative bg-dark-panel border-b overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1800&q=80&fit=crop"
                        alt=""
                        className="w-full h-full object-cover object-center opacity-50"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.2) 100%)" }} />
                </div>
                <div
                    className="relative z-10"
                    style={{ paddingTop: "clamp(5rem,10vw,9rem)", paddingBottom: "clamp(3rem,6vw,5rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}
                >
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/40 mb-3">Gallery</p>
                    <h1 className="font-heading font-bold text-white leading-[1.05]" style={{ fontSize: "clamp(2.2rem,5vw,4.5rem)" }}>Images</h1>
                    <p className="mt-5 text-base md:text-lg leading-relaxed text-white/60 max-w-2xl">A visual record of events, engagements, and pursuits.</p>
                </div>
            </section>

            {/* Intro text */}
            <section className="border-b border-theme" style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(3rem,6vw,5rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    <div className="lg:col-span-3">
                        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-theme-muted">Highlights</p>
                    </div>
                    <div className="lg:col-span-9">
                        <p className="text-lg md:text-xl leading-relaxed text-theme mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                            From racing circuits to conference halls, research desks to trading floors.
                        </p>
                        <p className="text-sm leading-relaxed text-theme-muted max-w-2xl">
                            A curated record of moments across motorsport, advisory engagements, academic lectures, and industry events. Races at Lime Rock and Watkins Glen, keynotes at the CFA Institute and Milken Global Conference, guest lectures at NYU Courant, and client sessions from New York to London — this gallery captures the breadth of a practice built on both rigour and range.
                        </p>
                    </div>
                </div>
            </section>

            {/* Offset stacked gallery */}
            <section style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(4rem,8vw,7rem)", overflow: "hidden" }}>
                {ROWS.map((row, i) => (
                    <GalleryStrip
                        key={i}
                        rowImages={row.images}
                        speed={row.speed}
                        offset={row.offset}
                        reverse={row.reverse}
                        onSelect={setSelected}
                    />
                ))}
            </section>

            {/* Modal */}
            {selected && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
                    onClick={() => setSelected(null)}
                >
                    <div
                        className="relative max-w-4xl w-full border border-theme overflow-hidden"
                        style={{ backgroundColor: "rgb(var(--bg-card))" }}
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelected(null)}
                            className="absolute top-4 right-4 z-10 p-1 text-white/70 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                        <img src={selected.src} alt={selected.title} className="w-full object-cover" style={{ maxHeight: "60vh" }} />
                        <div className="p-6 md:p-8">
                            <div className="flex items-start justify-between gap-4 mb-3">
                                <h2 className="font-heading font-semibold text-xl text-theme leading-snug">{selected.title}</h2>
                                <span className="text-xs font-mono text-theme-muted flex-shrink-0 pt-1">{selected.date}</span>
                            </div>
                            <p className="text-sm leading-relaxed text-theme-muted mb-4">{selected.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {selected.tags.map(tag => (
                                    <span key={tag} className="text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 border border-theme text-theme-muted">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}