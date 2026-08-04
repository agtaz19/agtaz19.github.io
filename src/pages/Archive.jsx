import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ArchiveImage from "https://images.pexels.com/photos/18343396/pexels-photo-18343396.jpeg";
import AlienAttack from "@/components/arcade/AlienAttack.jsx";
import Blackjack from "@/components/arcade/Blackjack.jsx";
import Dropper from "@/components/arcade/BLockDropper.jsx";
import Poker from "@/components/arcade/TexasPoker.jsx";
import Snake from "@/components/arcade/Snake.jsx";
import Frogger from "@/components/arcade/Frogger.jsx";
import Roulette from "@/components/arcade/Roulette.jsx";
import Minesweeper from "@/components/arcade/Minesweeper.jsx";
import ConnectFour from "@/components/arcade/ConnectFour.jsx";



const SITES = [
    { 
        name: "The Scale of the Universe", 
        url: "https://scaleofuniverse.com",
        blurb: "Zoom from quantum foam to the observable universe in one scroll." },
    { 
        name: "Window Swap", 
        url: "https://window-swap.com", 
        blurb: "Look out of a stranger's window, somewhere in the world, right now." },
    { 
        name: "A Soft Murmur", 
        url: "https://asoftmurmur.com", blurb: "Mix rain, thunder, fire, and coffee shop ambience to find your focus." },
    { 
        name: "Radio Garden", 
        url: "https://radio.garden", 
        blurb: "Spin the globe and listen to live radio from anywhere on Earth." },
    { 
        name: "Drive & Listen", 
        url: "https://driveandlisten.herokuapp.com", 
        blurb: "Drive through a city at night with local radio playing in the background." },
    { 
        name: "Patatap", 
        url: "https://www.patatap.com", 
        blurb: "Tap keys to trigger sounds and animations. A synesthetic playground." },
    { 
        name: "Pointer Pointer", 
        url: "https://pointerpointer.com", 
        blurb: "The internet finds a photo of someone pointing at your cursor. Somehow." },
    { 
        name: "The Useless Web", 
        url: "https://theuselessweb.com", 
        blurb: "Press the button. Be transported to a site that is gloriously pointless." },
    { 
        name: "Window Knocks", 
        url: "https://www.windowknocks.com", 
        blurb: "Short films about the cities people call home — one window at a time." },
    { 
        name: "Infinite Jukebox", 
        url: "https://infinitejukebox.playlistmachinery.com", 
        blurb: "Pick a song; the algorithm beats-matches it into an endless remix." },
    { 
        name: "A Good Universe", 
        url: "https://agadventure.com", 
        blurb: "A gentle, minimalist pixel universe to wander through when you need it." },
    { 
        name: "Flight Radar 24", 
        url: "https://www.flightradar24.com", 
        blurb: "Watch every commercial flight on the planet moving in real time." },
];

const MEDIA_ENTRIES = [
    { 
        year: "2025", 
        type: "Whitepaper", 
        title: "High-Frequency Trading in a Limit Order Book", 
        author: "Avellaneda & Stoikov", 
        note: "The canonical framework for optimal market making. Indispensable for modeling inventory risk, reservation prices, and dynamic bid-ask spreads." 
    },
    { 
        year: "2024", 
        type: "Book", 
        title: "The Alignment Problem", 
        author: "Brian Christian", 
        note: "A fascinating deep dive into AI safety, human values, and the ethical implications of machine learning models." 
    },
    { 
        year: "2023", 
        type: "Whitepaper", 
        title: "Attention Is All You Need", 
        author: "Vaswani et al.", 
        note: "The foundational text for modern transformer architectures. 3am, black coffee, terminal green." 
    },
    { 
        year: "2023", 
        type: "Book", 
        title: "Trading and Exchanges: Market Microstructure for Practitioners", 
        author: "Larry Harris", 
        note: "The definitive mechanics of order types, market makers, and liquidity dynamics. Crucial for translating theoretical alpha into real execution." 
    },
    { 
        year: "2022", 
        type: "Podcast", 
        title: "Invest Like the Best", 
        author: "Patrick O'Shaughnessy", 
        note: "Consistently excellent conversations on capital allocation and building businesses." 
    },
    { 
        year: "2022", 
        type: "Podcast", 
        title: "Flirting with Models", 
        author: "Corey Hoffstein", 
        note: "Masterclass discussions on systematic trading, quantitative risk factor modeling, and structural market inefficiencies." 
    },
    { 
        year: "2021", 
        type: "Film", 
        title: "Margin Call", 
        author: "J.C. Chandor", 
        note: "The most accurate depiction of risk management and the visceral panic of a financial crisis on screen." 
    },
    { 
        year: "2021", 
        type: "Book", 
        title: "Designing Data-Intensive Applications", 
        author: "Martin Kleppmann", 
        note: "The gold standard on distributed systems, data storage trade-offs, and building resilient high-throughput architectures." 
    },
    { 
        year: "2020", 
        type: "Book", 
        title: "The Man Who Solved the Market", 
        author: "Gregory Zuckerman", 
        note: "Inside Renaissance Technologies. A compelling look at how pattern recognition, raw signal isolation, and cold discipline beat traditional discretionary intuition." 
    },
    { 
        year: "2019", 
        type: "Book", 
        title: "When Genius Failed: The Rise and Fall of LTCM", 
        author: "Roger Lowenstein", 
        note: "A sobering lesson in tail risk, correlation breakdowns under stress, and the danger of confusing statistical models with reality." 
    },
    { 
        year: "2018", 
        type: "Textbook", 
        title: "Stochastic Calculus for Finance II: Continuous-Time Models", 
        author: "Steven E. Shreve", 
        note: "Rigorous, uncompromising theory for option pricing, Geometric Brownian Motion, and risk-neutral measure transformations." 
    }
];

export default function Archive() {
    const [visible, setVisible] = useState(false);
    const [site, setSite] = useState(() => SITES[Math.floor(Math.random() * SITES.length)]);
    const [activeGame, setActiveGame] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const rollSite = () => {
        let next = site;
        while (next.url === site.url) {
        next = SITES[Math.floor(Math.random() * SITES.length)];
        }
        setSite(next);
    };

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(t);
    }, []);

    const numItems = MEDIA_ENTRIES.length;

    const spinLeft = () => setActiveIndex((prev) => (prev - 1 + numItems) % numItems);
    const spinRight = () => setActiveIndex((prev) => (prev + 1) % numItems);

    return (
        <>
            {/* ── Hero Banner ── */}
            <section className="relative bg-dark-panel overflow-hidden">
                <div className="absolute inset-0">
                    <img
                    src={ArchiveImage}
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
                        ◈ you found it ◈
                    </p>
                    <h1 className="font-heading font-bold text-white leading-[1.05]" style={{ fontSize: "clamp(2.2rem,5vw,4.5rem)" }}>
                        The Archives
                    </h1>
                    <p className="mt-5 text-base md:text-lg leading-relaxed text-white/60 max-w-2xl">
                        <i>Media Worth Digesting</i>
                    </p>
                </div>
            </section>

            {/* ── Random Websites ── */}
            <section className="border-t border-theme" style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(4rem,8vw,7rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    <div className="lg:col-span-3">
                        <p className="text-sm font-bold tracking-[0.15em] uppercase text-theme">Random Corner</p>
                        <p className="text-xs mt-3 leading-relaxed text-theme-muted">A button. A rabbit hole. No two the same.</p>
                    </div>
                    <div className="lg:col-span-9">
                        <div className="border border-theme p-8 transition-colors w-full" style={{ backgroundColor: "rgb(var(--bg-card))", fontFamily: "var(--font-mono)" }}>
                            <div className="flex items-start justify-between gap-6 mb-6">
                                <div className="w-full">
                                    <h3 className="font-heading font-semibold text-2xl text-theme leading-snug mb-3">{site.name}</h3>
                                    <p className="text-sm leading-relaxed text-theme-muted w-full">{site.blurb}</p>
                                </div>
                                <span className="text-2xl flex-shrink-0">🗝️</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                <a
                                    href={site.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold tracking-[0.18em] uppercase transition-opacity hover:opacity-80"
                                    style={{ backgroundColor: "rgb(212,175,55)", color: "#000" }}
                                >
                                    Visit Site →
                                </a>
                                <button
                                    onClick={rollSite}
                                    className="px-4 py-2.5 text-xs font-bold tracking-[0.18em] uppercase border border-theme text-theme transition-colors hover:bg-theme-muted"
                                >
                                    ↻ Roll Again
                                </button>
                                <span className="text-[10px] tracking-[0.15em] text-theme-muted opacity-50 ml-1">{site.url.replace("https://", "")}</span>
                            </div>
                        </div>
                        <p className="text-[10px] font-mono tracking-[0.15em] text-theme-muted mt-6 opacity-40">
                            &gt; {SITES.length} sites in rotation. press roll to wander_
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Favorite Media 3D Carousel Section ── */}
            <section className="border-t border-theme" style={{ 
                paddingTop: "clamp(3rem,7vw,6rem)", 
                paddingBottom: "clamp(4rem,8vw,7rem)", 
                paddingLeft: "var(--fluid-pad)", 
                paddingRight: "var(--fluid-pad)",
                overflow: "hidden"
            }}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    
                    {/* Header */}
                    <div className="lg:col-span-3">
                        <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-theme">
                            Notable Media
                        </h2>
                        <p className="text-xs mt-3 leading-relaxed text-theme-muted">
                            Media that I love and highly encourage others to read, watch, or listen to.
                        </p>
                    </div>

                    {/* 3D Spinning Area */}
                    <div className="lg:col-span-9 flex flex-col items-center justify-center min-h-[500px]"
                        style={{
                            opacity: visible ? 1 : 0,
                            transform: visible ? "translateY(0)" : "translateY(16px)",
                            transition: "opacity 0.7s ease 200ms, transform 0.7s ease 200ms",
                        }}
                    >
                        <div 
                            className="relative w-full max-w-[340px] h-[400px] sm:h-[450px] mb-12 flex justify-center items-center" 
                            style={{ perspective: "1200px" }}
                        >
                            {MEDIA_ENTRIES.map((e, i) => {
                                let offset = (i - activeIndex) % numItems;
                                if (offset < 0) offset += numItems;
                                if (offset > numItems / 2) offset -= numItems;

                                const isVisible = Math.abs(offset) <= 2; 

                                const translateX = offset * 70; 
                                const translateZ = -Math.abs(offset) * 120; 
                                const rotateY = -offset * 15; 
                                const opacity = isVisible ? (1 - Math.abs(offset) * 0.3) : 0;
                                const zIndex = 50 - Math.abs(offset); 

                                return (
                                    <div
                                        key={`${e.title}-${i}`}
                                        onClick={() => setActiveIndex(i)}
                                        className="absolute w-full h-full flex flex-col p-6 sm:p-8 border border-theme shadow-xl cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                                        style={{
                                            backgroundColor: "rgb(var(--bg-card))", 
                                            transform: `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                                            opacity: opacity,
                                            zIndex: zIndex,
                                            pointerEvents: isVisible ? "auto" : "none",
                                        }}
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <span className="block text-[10px] font-semibold uppercase tracking-wider text-theme-muted opacity-70">
                                                {e.type}
                                            </span>
                                            <span className="block text-sm font-mono font-bold tracking-widest" style={{ color: "rgb(212,175,55)" }}>
                                                {e.year}
                                            </span>
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-theme mb-2">
                                                {e.title}
                                            </h3>
                                            <p className="text-xs font-mono text-theme-muted mb-6 opacity-80 border-b border-theme/20 pb-4">
                                                by {e.author}
                                            </p>
                                            <p className="text-sm leading-relaxed text-theme-muted overflow-hidden line-clamp-6">
                                                {e.note}
                                            </p>
                                        </div>
                                        
                                        {offset !== 0 && (
                                            <div className="absolute inset-0 bg-black/5 dark:bg-black/20 rounded-sm" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Controls */}
                        <div className="flex gap-6 z-10">
                            <button 
                                onClick={spinLeft} 
                                className="px-6 py-3 border border-theme/30 hover:border-theme text-theme-muted hover:text-theme text-xs uppercase tracking-[0.2em] font-mono transition-all duration-300 hover:bg-theme/5 active:scale-95"
                            >
                                ← Prev
                            </button>
                            <button 
                                onClick={spinRight} 
                                className="px-6 py-3 border border-theme/30 hover:border-theme text-theme-muted hover:text-theme text-xs uppercase tracking-[0.2em] font-mono transition-all duration-300 hover:bg-theme/5 active:scale-95"
                            >
                                Next →
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── ASCII Game Arcade ── */}
            <section className="border-t border-theme" style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(4rem,8vw,7rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    <div className="lg:col-span-3">
                        <p className="text-sm font-bold tracking-[0.15em] uppercase text-theme">
                            Arcade
                        </p>
                        <p className="text-xs mt-3 leading-relaxed text-theme-muted">
                            ASCII games. Because sometimes the terminal is enough.
                        </p>
                    </div>
                    <div className="lg:col-span-9">
                        {
                            activeGame === "alien" ? (
                            <AlienAttack onExit={() => setActiveGame(null)} />
                        ) : activeGame === "blackjack" ? (
                            <Blackjack onExit={() => setActiveGame(null)} />
                        ) : activeGame === "block" ? (
                            <Dropper onExit={() => setActiveGame(null)} />
                        ) : activeGame === "poker" ? (
                            <Poker onExit={() => setActiveGame(null)} />
                        ) : activeGame === "snake" ? (
                            <Snake onExit={() => setActiveGame(null)} />
                        ) : activeGame === "frogger" ? (
                            <Frogger onExit={() => setActiveGame(null)} />
                        ) : activeGame === "roulette" ? (
                            <Roulette onExit={() => setActiveGame(null)} />
                        ) : activeGame === "minesweeper" ? (
                            <Minesweeper onExit={() => setActiveGame(null)} />
                        ) : activeGame === "connect4" ? (
                            <ConnectFour onExit={() => setActiveGame(null)} />
                        ) :
                        (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { id: "alien", label: "Alien Attack", glyph: "👾", tag: "Shooter", desc: "Defend the terminal against an incoming wave." },
                                        { id: "blackjack", label: "Blackjack", glyph: "🃏", tag: "Cards", desc: "Hit or stand. The house always has an edge." },
                                        { id: "block", label: "Block Dropper", glyph: "🟦", tag: "Puzzle", desc: "Stack falling blocks before the grid fills up." },
                                        { id: "poker", label: "Texas Hold'em", glyph: "♠️", tag: "Cards", desc: "Read the table, manage the stack, bluff the river." },
                                        { id: "snake", label: "Snake", glyph: "🐍", tag: "Arcade", desc: "Grow the line without biting your own tail." },
                                        { id: "frogger", label: "Frogger", glyph: "🐸", tag: "Arcade", desc: "Cross the road, dodge the logs, reach the lily pads." },
                                        { id: "roulette", label: "Roulette", glyph: "🎰", tag: "Casino", desc: "Red, black, or zero. Place your bets and spin." },
                                        { id: "minesweeper", label: "Minesweeper", glyph: "💣", tag: "Puzzle", desc: "Flag the mines. Deduce the grid. Don't click wrong." },
                                        { id: "connect4", label: "Connect Four", glyph: "🔴", tag: "Strategy", desc: "Drop the disc. Build the line. Block the threat." },
                                    ].map((game) => {
                                        // Game IDs
                                        const enabled = ["alien", "blackjack", "block", "poker", "snake", "frogger", "roulette", "", ""].includes(game.id);

                                        return (
                                            <button
                                                key={game.id}
                                                disabled={!enabled}
                                                onClick={() => enabled && setActiveGame(game.id)}
                                                className={enabled
                                                    ? "group text-left border border-theme p-6 transition-colors duration-200 hover:bg-theme-muted cursor-pointer"
                                                    : "group text-left border border-theme p-6 transition-colors duration-200 cursor-not-allowed opacity-60 hover:opacity-80"}
                                                style={{ backgroundColor: "rgb(var(--bg-card))", fontFamily: "var(--font-mono)" }}
                                            >
                                                <div className="text-3xl mb-3">
                                                    {game.glyph}
                                                </div>
                                                <p className="text-xs font-bold tracking-[0.18em] uppercase text-theme mb-2">{game.label}</p>
                                                <p className="text-xs leading-relaxed text-theme-muted mb-4">{game.desc}</p>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="text-[10px] tracking-[0.2em] uppercase px-2 py-1 border text-theme-muted" style={{ borderColor: "rgba(212,175,55,0.4)", color: "rgb(212,175,55)" }}>
                                                        {game.tag}
                                                    </span>
                                                    {enabled ? (
                                                        <span className="text-[10px] tracking-[0.2em] uppercase px-2 py-1" style={{ backgroundColor: "rgb(212,175,55)", color: "#000" }}>
                                                            Play →
                                                        </span>
                                                    ) : (
                                                        <span className="text-[10px] tracking-[0.2em] uppercase px-2 py-1 border border-theme text-theme-muted">
                                                            Coming Soon
                                                        </span>
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                                <p className="text-[10px] font-mono tracking-[0.15em] text-theme-muted mt-6 opacity-40">
                                    &gt; select a game to launch_
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* ── Bottom Navigation Footer ── */}
            <section className="border-t border-theme" style={{ paddingTop: "clamp(3rem,6vw,5rem)", paddingBottom: "clamp(4rem,8vw,7rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                <div>
                    <Link
                        to="/"
                        className="inline-block text-xs tracking-[0.2em] uppercase transition-opacity duration-300 opacity-70 hover:opacity-100 font-semibold"
                        style={{ color: "rgb(212,175,55)", fontFamily: "var(--font-mono)" }}
                    >
                        ← back to the surface
                    </Link>
                </div>
            </section>
        </>
    );
}