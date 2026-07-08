import React, { useState, useMemo } from "react";
    import { Link } from "react-router-dom";
    import { Search } from "lucide-react";

    export const POSTS = [
        {
            slug: "volatility-risk-premium",
            date: "June 2025",
            tag: "Markets",
            title: "The Volatility Risk Premium is Not Dead — It's Just Better Hidden",
            summary: "After a decade of compressed vol, many practitioners have written off the VRP as a reliable source of alpha. I disagree — but you have to know where to look and how to harvest it cleanly.",
            body: `The Volatility Risk Premium (VRP) — the persistent spread between implied and realized volatility — has been a reliable source of alpha for options sellers for decades. After years of compressed vol and seemingly endless central bank suppression of tail risk, many practitioners have concluded that the premium has been arbitraged away.\n\nThey're wrong. But the VRP has migrated.\n\n**Where it used to live**\n\nHistorically, the most accessible form of the VRP was simply selling S&P 500 puts or straddles and delta-hedging the position. The implied vol surface was consistently rich relative to subsequent realized vol, and the premium was large enough to absorb transaction costs and the occasional spike.\n\n**What changed**\n\nPost-2012, two forces compressed the classic equity VRP. First, the proliferation of systematic vol-selling strategies — CTAs, risk premia funds, and retail structured products — increased competition and compressed the spread. Second, central bank put options (quantitative easing, rate suppression) reduced the frequency of genuine tail events, making historical vol metrics unreliable.\n\n**Where it lives now**\n\nThe premium has migrated to three areas: single-stock options (where market-making is less competitive), cross-asset vol (FX and rates, where buy-side demand for hedges is structurally elevated), and the volatility of volatility itself (VIX options and variance swaps on realized vol). The harvesting mechanisms are more complex, but the premium is real and persistent.\n\nThe key insight: you don't find alpha where everyone is looking. The VRP didn't disappear — it relocated.`,
        },
        {
            slug: "fed-dot-plot",
            date: "April 2025",
            tag: "Macro",
            title: "Why the Fed's Dot Plot Is the Most Dangerous Chart in Finance",
            summary: "Markets have increasingly anchored to FOMC projections that have a historically poor forecasting record. The real risk isn't inflation — it's the feedback loop between the dots and market pricing.",
            body: `Every quarter, the Federal Reserve releases its Summary of Economic Projections — a scatter plot of individual FOMC member rate forecasts that has become, inexplicably, one of the most market-moving documents in global finance.\n\nThe problem is not that the Fed communicates its intentions. Transparency is valuable. The problem is that market participants have started treating the dot plot as a forecast rather than what it actually is: a projection conditional on assumptions that are almost always wrong.\n\n**The forecasting record**\n\nThe empirical evidence is damning. Fed projections have missed their own terminal rate targets by an average of 180 basis points over a two-year horizon. During the 2021–2023 inflation cycle, the median dot was below actual outcomes for six consecutive quarters.\n\n**The feedback loop**\n\nThe real danger is the reflexivity this creates. When markets anchor to the dots, the Fed becomes constrained by its own projections. Deviating from the dot path creates volatility, which feeds back into financial conditions, which affects the real economy — all before the underlying fundamental picture has changed.\n\nThe result is a monetary policy framework that is increasingly reactive to its own communication rather than to underlying economic reality.\n\n**What to do about it**\n\nIgnore the dots as a point forecast. Use them as a distribution of opinion. The dispersion across FOMC members is often more informative than the median — it reveals where the genuine uncertainty lies. And watch the language in the statement, not the scatter plot.`,
        },
        {
            slug: "factor-zoo",
            date: "February 2025",
            tag: "Quantitative",
            title: "Factor Zoo or Factor Farm? Building a Disciplined Signal Library",
            summary: "The academic literature has hundreds of documented anomalies. Most don't survive transaction costs, data-snooping adjustments, or regime changes. Here's how I think about building a live signal library.",
            body: `The factor zoo problem is well-documented: Harvey, Liu, and Zhu identified over 300 published return anomalies in the academic literature. McLean and Pontiff showed that anomalies decay significantly post-publication. And yet, quant funds continue to build signal libraries as if discovery alone confers durability.\n\n**The curation problem**\n\nBuilding a signal library is not a literature review exercise. The question is not "does this factor have a t-stat above 2 in the original paper?" The question is "does this factor survive transaction costs, out-of-sample data, and regime changes in my specific investment universe?"\n\nThose are very different questions.\n\n**My framework**\n\nI apply three filters before a signal enters live consideration. First, economic intuition: there must be a plausible, non-circular explanation for why the premium exists and why it shouldn't be immediately arbitraged away. Second, out-of-sample stability: the signal must show meaningful performance in a holdout period that was not used in the original publication's sample. Third, cost-adjusted returns: net of realistic transaction costs (not academic bid-ask midpoints), the signal must still carry a positive Sharpe.\n\n**The factor farm**\n\nThe goal is not a zoo of loosely related signals but a disciplined farm: a small number of robust, complementary factors with understood decay rates and regime dependencies. Correlation management matters more than signal count.\n\nMost live quant portfolios would perform better with half the signals and twice the implementation discipline.`,
        },
        {
            slug: "optionality-trap",
            date: "November 2024",
            tag: "Strategy",
            title: "The Optionality Trap: Why Smart Executives Over-Diversify",
            summary: "Optionality is valuable. But I've watched too many capable executives use 'keeping options open' as a proxy for strategy. At some point, the portfolio of options becomes the obstacle.",
            body: `There is a particular kind of executive paralysis that wears the costume of strategic sophistication. It presents as flexibility. It speaks the language of optionality, agility, and avoiding premature commitment. And it is, in many cases, the single largest drag on organizational performance I observe in advisory engagements.\n\n**Why optionality is seductive**\n\nReal options theory is legitimate finance. The value of flexibility under uncertainty is mathematically demonstrable. In capital allocation, maintaining the ability to pivot — to delay irreversible commitments until uncertainty resolves — can be the correct choice.\n\nThe error is importing this logic wholesale into organizational strategy and personal career management, where the costs of optionality preservation are systematically underweighted.\n\n**What keeping options open actually costs**\n\nEvery option you hold has a carrying cost: the attention, the ambiguity, the delayed resource commitment. Organizations that maintain too many strategic options don't allocate resources efficiently to any of them. The teams working on optionality-preserving initiatives know, implicitly, that they are not the primary bet — and they perform accordingly.\n\n**The discipline of commitment**\n\nThe executives I've seen compound most effectively share a counterintuitive trait: they commit earlier and more fully than their peers, and they build the optionality-creation capacity inside their primary commitment rather than spreading bets across multiple parallel tracks.\n\nOptionality is valuable. But a portfolio of options is not a strategy. At some point, you have to farm one field.`,
        },
        {
            slug: "rough-volatility",
            date: "September 2024",
            tag: "Quantitative",
            title: "Rough Volatility: What Practitioners Actually Need to Know",
            summary: "The rough Bergomi model is now well-established in academia. But its practical implications for vol surface calibration and options hedging are still widely misunderstood in practice.",
            body: `The rough volatility literature — initiated by Gatheral, Jaisson, and Rosenbaum's 2018 paper — has fundamentally changed how academics think about the dynamics of realized volatility. The empirical finding is striking: the Hurst exponent of log-realized volatility is approximately 0.1, far below the 0.5 implied by standard Brownian motion. Volatility is rougher than we thought.\n\n**What this means in practice**\n\nThe practical implications are less dramatic than the theoretical shift, but they are real. Three things matter for practitioners.\n\nFirst, the at-the-money vol skew term structure. Rough vol models generate a power-law term structure of ATM skew that matches empirical data far better than classic stochastic vol models. If your book has significant short-dated skew exposure, this matters for hedging.\n\nSecond, VIX options pricing. Standard models struggle with the short-dated VIX implied vol surface. Rough vol provides a theoretically consistent framework for simultaneously fitting SPX and VIX options — a long-standing challenge.\n\nThird, simulation and calibration complexity. The rough Bergomi model is not Markovian. This creates real computational challenges for calibration and for Monte Carlo pricing of path-dependent products. The Markovian approximations (Abi Jaber, El Euch) are practically useful but introduce their own errors.\n\n**The bottom line**\n\nIf you trade vanilla equity options at short tenors or have VIX exposure, rough vol models are worth understanding and potentially implementing. For most other practitioners, the standard Heston or SABR framework, properly calibrated, remains adequate.`,
        },
    ];

    const TAG_COLORS = {
        Markets:       "rgb(212,175,55)",   /* gold  — finance/markets */
        Macro:         "rgb(90,160,210)",   /* blue  — macro/global    */
        Quantitative:  "rgb(100,185,130)",  /* green — quant/data      */
        Strategy:      "rgb(220,160,100)",  /* amber — strategy        */
    };

    const ALL_DATES = ["All", ...Array.from(new Set(POSTS.map(p => p.date)))];

    export default function Blog() {
        const [query, setQuery] = useState("");
        const [dateFilter, setDateFilter] = useState("All");

        const filtered = useMemo(() => {
            const q = query.toLowerCase();
            return POSTS.filter(p => {
                const matchesDate = dateFilter === "All" || p.date === dateFilter;
                const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q) || p.tag.toLowerCase().includes(q);
                return matchesDate && matchesQuery;
            });
        }, [query, dateFilter]);

        return (
            <>
                <section className="relative bg-dark-panel border-b overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                    <div className="absolute inset-0">
                        <img src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1800&q=80&fit=crop" alt="" className="w-full h-full object-cover object-center opacity-50" />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.2) 100%)" }} />
                    </div>
                    <div className="relative z-10" style={{ paddingTop: "clamp(5rem,10vw,9rem)", paddingBottom: "clamp(3rem,6vw,5rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/40 mb-3">Insights</p>
                        <h1 className="font-heading font-bold text-white leading-[1.05]" style={{ fontSize: "clamp(2.2rem,5vw,4.5rem)" }}>Blog</h1>
                        <p className="mt-5 text-base md:text-lg leading-relaxed text-white/60 max-w-2xl">Long-form commentary on markets, quantitative finance, and strategy.</p>
                    </div>
                </section>

                <section style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(4rem,8vw,7rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                    {/* Search & Filter */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-10">
                        <div className="relative flex-1 max-w-md">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-muted pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Search by keyword, topic, or tag…"
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2.5 text-sm bg-theme border border-theme text-theme placeholder:text-theme-muted focus:outline-none focus:border-[rgb(212,175,55)] transition-colors"
                            />
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {ALL_DATES.map(d => (
                                <button
                                    key={d}
                                    onClick={() => setDateFilter(d)}
                                    className="text-[10px] tracking-[0.15em] uppercase px-3 py-2 border transition-colors duration-150"
                                    style={{
                                        borderColor: dateFilter === d ? "rgb(212,175,55)" : "rgb(var(--border-color))",
                                        color: dateFilter === d ? "rgb(212,175,55)" : "rgb(var(--text-secondary))",
                                    }}
                                >
                                    {d}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-0">
                        {filtered.length === 0 && (
                            <p className="text-sm text-theme-muted py-10">No posts match your search.</p>
                        )}
                        {filtered.map((post, i) => (
                            <Link key={i} to={`/blog/${post.slug}`} className="block">
                                <article className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-16 py-10 border-b border-theme group cursor-pointer">
                                    <div className="lg:col-span-3">
                                        <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-2">
                                            <span className="text-xs font-mono tracking-widest text-theme-muted">{post.date}</span>
                                            <span
                                                className="text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 border"
                                                style={{ color: TAG_COLORS[post.tag] || "rgb(212,175,55)", borderColor: TAG_COLORS[post.tag] || "rgb(212,175,55)", opacity: 0.8 }}
                                            >
                                                {post.tag}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-9">
                                        <h2
                                            className="font-heading font-semibold leading-snug text-theme mb-3 transition-colors duration-300 group-hover:opacity-70"
                                            style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
                                        >
                                            {post.title}
                                        </h2>
                                        <p className="text-sm leading-relaxed text-theme-muted">{post.summary}</p>
                                        <span
                                            className="inline-block mt-4 text-xs tracking-[0.15em] uppercase font-semibold transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                                            style={{ color: "rgb(212,175,55)" }}
                                        >
                                            Read →
                                        </span>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </section>
            </>
        );
    }