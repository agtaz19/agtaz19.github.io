/**
     * Archive — Easter egg page
     * Reached via the nearly-invisible "◈ archive" link in the footer.
     */
    import React, { useEffect, useState } from "react";
    import { Link } from "react-router-dom";

    const ENTRIES = [
        { year: "2018", note: "First quant model deployed in production. 3am, black coffee, terminal green." },
        { year: "2019", note: "Paper accepted. Celebrated with a walk across the Brooklyn Bridge at midnight." },
        { year: "2020", note: "Rebuilt the entire risk engine during a lockdown. 60 days, no weekends." },
        { year: "2021", note: "First nine-figure advisory mandate. Didn't sleep for three days." },
        { year: "2022", note: "Moved offices to Midtown. The view of the skyline still doesn't get old." },
        { year: "2023", note: "Keynote in Singapore. Asked a question I didn't have an answer to. Still thinking." },
        { year: "2024", note: "Turned down a role I always wanted. Decided building is better than joining." },
        { year: "2025", note: "Quiet year. Read 40 books. Ran a marathon. Launched this site." },
    ];

    export default function Archive() {
        const [visible, setVisible] = useState(false);

        useEffect(() => {
            const t = setTimeout(() => setVisible(true), 100);
            return () => clearTimeout(t);
        }, []);

        return (
            <>
                {/* Hero banner — matches other pages */}
                <section className="relative bg-dark-panel border-b overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1800&q=80&fit=crop"
                            alt=""
                            className="w-full h-full object-cover object-center opacity-50"
                        />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.2) 100%)" }} />
                    </div>
                    <div
                        className="relative z-10"
                        style={{
                            paddingTop: "clamp(5rem,10vw,9rem)",
                            paddingBottom: "clamp(3rem,6vw,5rem)",
                            paddingLeft: "var(--fluid-pad)",
                            paddingRight: "var(--fluid-pad)",
                            opacity: visible ? 1 : 0,
                            transition: "opacity 0.8s ease",
                        }}
                    >
                        <p className="text-xs font-semibold tracking-[0.35em] uppercase mb-3" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono)" }}>
                            ◈ you found it
                        </p>
                        <h1 className="font-heading font-bold text-white leading-[1.05]" style={{ fontSize: "clamp(2.2rem,5vw,4.5rem)" }}>
                            The Archive
                        </h1>
                        <p className="mt-5 text-base md:text-lg leading-relaxed text-white/60 max-w-2xl">
                            A private ledger of moments. Not the résumé — the real record.
                        </p>
                    </div>
                </section>

                {/* ── Blank top section — to be filled ── */}
                <section className="border-b border-theme" style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(3rem,7vw,6rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                    <div className="flex items-center justify-center min-h-[160px]">
                        <p className="text-xs font-mono tracking-[0.3em] uppercase text-theme-muted opacity-30">— coming soon —</p>
                    </div>
                </section>

                {/* Entries */}
                <section style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(4rem,8vw,7rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                        <div className="lg:col-span-3">
                            <p className="text-sm font-bold tracking-[0.15em] uppercase text-theme">Log</p>
                            <p className="text-xs mt-3 leading-relaxed text-theme-muted">Eight years. Eight entries. The ones that actually mattered.</p>
                        </div>
                        <div className="lg:col-span-9 space-y-0">
                            {ENTRIES.map((e, i) => (
                                <div
                                    key={e.year}
                                    className="flex gap-8 py-7 border-b border-theme"
                                    style={{
                                        opacity: visible ? 1 : 0,
                                        transform: visible ? "translateY(0)" : "translateY(16px)",
                                        transition: `opacity 0.7s ease ${i * 90}ms, transform 0.7s ease ${i * 90}ms`,
                                    }}
                                >
                                    <span
                                        className="text-xs font-mono font-bold tracking-widest pt-1 flex-shrink-0 w-10"
                                        style={{ color: "rgb(212,175,55)" }}
                                    >
                                        {e.year}
                                    </span>
                                    <p className="text-sm leading-relaxed text-theme-muted">{e.note}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-16">
                        <Link
                            to="/"
                            className="text-xs tracking-[0.2em] uppercase transition-opacity duration-300 hover:opacity-100 font-semibold"
                            style={{ color: "rgb(212,175,55)", fontFamily: "var(--font-mono)" }}
                        >
                            ← back to the surface
                        </Link>
                    </div>
                </section>

                {/* ── ASCII Game Arcade ── */}
                <section className="border-t border-theme" style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(4rem,8vw,7rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                        <div className="lg:col-span-3">
                            <p className="text-sm font-bold tracking-[0.15em] uppercase text-theme">Arcade</p>
                            <p className="text-xs mt-3 leading-relaxed text-theme-muted">ASCII games. Because sometimes the terminal is enough.</p>
                        </div>
                        <div className="lg:col-span-9">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {[
                                    { id: "alien", label: "Alien Attack", glyph: "👾", desc: "Defend the terminal against an incoming wave." },
                                    { id: "blackjack", label: "Blackjack", glyph: "🃏", desc: "Hit or stand. The house always has an edge." },
                                    { id: "block", label: "Block Dropper", glyph: "🟦", desc: "Stack falling blocks before the grid fills up." },
                                ].map((game) => (
                                    <button
                                        key={game.id}
                                        disabled
                                        className="group text-left border border-theme p-6 transition-colors duration-200 cursor-not-allowed opacity-60 hover:opacity-80"
                                        style={{ backgroundColor: "rgb(var(--bg-card))", fontFamily: "var(--font-mono)" }}
                                    >
                                        <div className="text-3xl mb-3">{game.glyph}</div>
                                        <p className="text-xs font-bold tracking-[0.18em] uppercase text-theme mb-2">{game.label}</p>
                                        <p className="text-xs leading-relaxed text-theme-muted mb-4">{game.desc}</p>
                                        <span className="text-[10px] tracking-[0.2em] uppercase px-2 py-1 border border-theme text-theme-muted">
                                            Coming Soon
                                        </span>
                                    </button>
                                ))}
                            </div>
                            <p className="text-[10px] font-mono tracking-[0.15em] text-theme-muted mt-6 opacity-40">
                                &gt; select a game to launch_
                            </p>
                        </div>
                    </div>
                </section>
            </>
        );
    }