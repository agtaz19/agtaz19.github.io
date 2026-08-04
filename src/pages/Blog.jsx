import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown } from "lucide-react";
import BlogImage from "@/assets/stock_photos/Blog_Storm.jpg";
import PostsData from "@/assets/blog_posts/blog_posts.json";

// ---- Single source of truth for blog data ----
// Edit tag colors and post-loading logic HERE only.
// BlogPost.jsx imports both POSTS and TAG_COLORS from this file.

// Normalizes either a raw array export or a { posts: [...] } wrapper,
// so the JSON file's shape can change later without touching page code.
export const POSTS = Array.isArray(PostsData) ? PostsData : (PostsData.posts || []);

export const TAG_COLORS = {
    Markets:           "rgb(212,175,55)",   /* gold   — finance/markets       */
    Macro:             "rgb(90,160,210)",   /* blue   — macro/global          */
    Quantitative:      "rgb(100,185,130)",  /* green  — quant/data            */
    Strategy:          "rgb(220,160,100)",  /* amber  — strategy              */
    Restructuring:     "rgb(210,80,80)",    /* red    — turnaround/distress   */
    Private_Equity:     "rgb(140,110,200)",  /* purple — private equity        */
    Venture_Capital:    "rgb(230,130,180)",  /* pink   — venture/startups      */
    Financial_Modeling: "rgb(80,180,190)",   /* teal   — accounting/modeling   */
    Investment_Banking: "rgb(60,110,180)",   /* navy   — M&A/banking           */
    Consulting:        "rgb(160,140,110)",  /* taupe  — advisory/consulting   */
    Lifestyle:         "rgb(120,190,150)",  /* sage   — habits/lifestyle      */
    Career:            "rgb(170,130,100)",  /* rust   — career/development    */
    Reviews:           "rgb(235,120,100)"   /* coral  — dining/reviews        */
};
// ---- End single source of truth ----

const ALL_DATES = ["All", ...Array.from(new Set(POSTS.map(p => p.date)))];
const ALL_TAGS = ["All", ...Array.from(new Set(POSTS.map(p => p.tag))).sort()];

const PAGE_SIZE = 8;

export default function Blog() {
    const [query, setQuery] = useState("");
    const [dateFilter, setDateFilter] = useState("All");
    const [tagFilter, setTagFilter] = useState("All");
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    const filtered = useMemo(() => {
        const q = query.toLowerCase();
        return (Array.isArray(POSTS) ? POSTS : []).filter(p => {
            const matchesDate = dateFilter === "All" || p.date === dateFilter;
            const matchesTag = tagFilter === "All" || p.tag === tagFilter;
            const matchesQuery = !q ||
                (p.title || "").toLowerCase().includes(q) ||
                (p.summary || "").toLowerCase().includes(q) ||
                (p.tag || "").toLowerCase().includes(q);
            return matchesDate && matchesTag && matchesQuery;
        });
    }, [query, dateFilter, tagFilter]);

    // Reset pagination whenever the filters change, so a new search/filter
    // doesn't leave you scrolled past a "Show More" cutoff from before.
    useEffect(() => {
        setVisibleCount(PAGE_SIZE);
    }, [query, dateFilter, tagFilter]);

    const visiblePosts = filtered.slice(0, visibleCount);
    const hasMore = visibleCount < filtered.length;

    if (!Array.isArray(POSTS)) return <div className="p-10 text-red-500">Error: Posts is not an array!</div>;

    return (
        <>
            <section className="relative bg-dark-panel border-b overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="absolute inset-0">
                    <img src={BlogImage} alt="" className="w-full h-full object-cover object-center opacity-50" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.2) 100%)" }} />
                </div>
                <div className="relative z-10" style={{ paddingTop: "clamp(5rem,10vw,9rem)", paddingBottom: "clamp(3rem,6vw,5rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/40 mb-3">Insights</p>
                    <h1 className="font-heading font-bold text-white leading-[1.05]" style={{ fontSize: "clamp(2.2rem,5vw,4.5rem)" }}>Blog</h1>
                    <p className="mt-5 text-base md:text-lg leading-relaxed text-white/60">
                    Long-form commentary on markets, quantitative finance, and strategy. Note: Current posts are filler content as I need to migrate previous posts.
                    </p>
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

                    <div className="relative w-full sm:w-48">
                        <select
                            value={tagFilter}
                            onChange={(e) => setTagFilter(e.target.value)}
                            className="w-full appearance-none pl-4 pr-10 py-2.5 text-sm bg-theme border border-theme text-theme focus:outline-none focus:border-[rgb(212,175,55)] transition-colors cursor-pointer"
                        >
                            {ALL_TAGS.map(t => (
                                <option key={t} value={t}>
                                    {t === "All" ? "All Tags" : t}
                                </option>
                            ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-muted pointer-events-none" />
                    </div>

                    <div className="relative w-full sm:w-48">
                        <select
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="w-full appearance-none pl-4 pr-10 py-2.5 text-sm bg-theme border border-theme text-theme focus:outline-none focus:border-[rgb(212,175,55)] transition-colors cursor-pointer"
                        >
                            {ALL_DATES.map(d => (
                                <option key={d} value={d}>
                                    {d === "All" ? "All Dates" : d}
                                </option>
                            ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-muted pointer-events-none" />
                    </div>
                </div>

                <div className="space-y-0">
                    {filtered.length === 0 && (
                        <p className="text-sm text-theme-muted py-10">No posts match your search.</p>
                    )}
                    {visiblePosts.map((post, i) => (
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

                {hasMore && (
                    <div className="flex justify-center mt-12">
                        <button
                            onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
                            className="px-6 py-2.5 text-xs tracking-[0.15em] uppercase font-semibold border border-theme text-theme hover:border-[rgb(212,175,55)] hover:text-[rgb(212,175,55)] transition-colors"
                        >
                            Show More
                        </button>
                    </div>
                )}
            </section>
        </>
    );
}
