import React from "react";
    import { Link, useParams } from "react-router-dom";
    import { POSTS } from "./Blog";
    import ReactMarkdown from "react-markdown";

    const TAG_COLORS = {
        Markets:       "rgb(212,175,55)",
        Macro:         "rgb(90,160,210)",
        Quantitative:  "rgb(100,185,130)",
        Strategy:      "rgb(220,160,100)",
    };

    export default function BlogPost() {
        const { slug } = useParams();
        const post = POSTS.find(p => p.slug === slug);

        if (!post) {
            return (
                <div style={{ paddingTop: "clamp(6rem,12vw,10rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                    <p className="text-theme-muted font-mono text-sm">Post not found.</p>
                    <Link to="/blog" className="text-xs tracking-[0.2em] uppercase font-semibold mt-4 inline-block" style={{ color: "rgb(212,175,55)" }}>← Back to Blog</Link>
                </div>
            );
        }

        return (
            <>
                {/* Hero */}
                <section className="relative bg-dark-panel border-b overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                    <div className="absolute inset-0">
                        <img src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1800&q=80&fit=crop" alt="" className="w-full h-full object-cover object-center opacity-40" />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.65) 30%, rgba(0,0,0,0.3) 100%)" }} />
                    </div>
                    <div className="relative z-10" style={{ paddingTop: "clamp(5rem,10vw,9rem)", paddingBottom: "clamp(3rem,6vw,5rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-xs font-mono tracking-widest text-white/40">{post.date}</span>
                            <span
                                className="text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 border"
                                style={{ color: TAG_COLORS[post.tag] || "rgb(212,175,55)", borderColor: TAG_COLORS[post.tag] || "rgb(212,175,55)", opacity: 0.85 }}
                            >
                                {post.tag}
                            </span>
                        </div>
                        <h1 className="font-heading font-bold text-white leading-[1.08] max-w-3xl" style={{ fontSize: "clamp(1.8rem,4vw,3.5rem)" }}>{post.title}</h1>
                        <p className="mt-4 text-base leading-relaxed text-white/60 max-w-2xl">{post.summary}</p>
                    </div>
                </section>

                {/* Body */}
                <section style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(4rem,8vw,7rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                        <div className="lg:col-span-3">
                            <Link
                                to="/blog"
                                className="text-xs tracking-[0.2em] uppercase font-semibold transition-opacity hover:opacity-70"
                                style={{ color: "rgb(212,175,55)", fontFamily: "var(--font-mono)" }}
                            >
                                ← Back to Blog
                            </Link>
                        </div>
                        <div className="lg:col-span-7">
                            <div className="prose prose-sm max-w-none text-theme-muted leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                                <ReactMarkdown
                                    components={{
                                        p: ({ children }) => <p className="mb-5 text-sm leading-[1.85] text-theme-muted">{children}</p>,
                                        strong: ({ children }) => <strong className="font-semibold text-theme">{children}</strong>,
                                        h2: ({ children }) => <h2 className="font-heading font-semibold text-theme text-xl mt-8 mb-3">{children}</h2>,
                                        h3: ({ children }) => <h3 className="font-heading font-semibold text-theme text-base mt-6 mb-2">{children}</h3>,
                                    }}
                                >
                                    {post.body}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }