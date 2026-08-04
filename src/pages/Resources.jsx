import React, { useState } from "react";
import { Link } from "react-router-dom";
import ResourceImage from "@/assets/stock_photos/Resources_ASU_Library.jpg";
import { RESOURCE_SECTIONS } from "@/assets/resources/index.js";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// Renders a description made of alternating plain-text and linked runs
// without introducing stray spaces before punctuation.
function InlineRuns({ parts }) {
    return (
        <>
            {parts.map((part, i) => {
                const needsLeadingSpace = i > 0 && !/^[.,;:!?)]/.test(part.text);
                return (
                    <React.Fragment key={i}>
                        {needsLeadingSpace ? " " : ""}
                        {part.href ? (
                            <a
                                href={part.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:no-underline"
                                style={{ color: "rgb(var(--accent))" }}
                            >
                                {part.text}
                            </a>
                        ) : (
                            part.text
                        )}
                    </React.Fragment>
                );
            })}
        </>
    );
}

// A terminal resource: a link, optionally with a short description.
function ResourceLeaf({ item }) {
    return (
        <li className="py-3.5 first:pt-2 last:pb-2 border-b border-theme/10 last:border-b-0 pl-3">
            <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm md:text-[0.95rem] font-medium leading-snug text-theme hover:text-[#D4AF37] transition-colors"
                style={{ textDecoration: "none" }}
            >
                {item.title}
                <span className="ml-1.5 text-theme-muted" style={{ fontSize: "0.7em" }}>↗</span>
            </a>
            {item.description && item.description.length > 0 && (
                <div className="mt-1 flex items-start gap-2 pl-3">
                    <span className="text-theme-muted select-none" style={{ fontSize: "0.8em", lineHeight: "1.6" }}>•</span>
                    <p className="text-[0.85rem] md:text-sm leading-relaxed text-theme-muted">
                        <InlineRuns parts={item.description} />
                    </p>
                </div>
            )}
        </li>
    );
}

// A collapsible group of resources (a topic, or a nested sub-topic). Renders
// itself recursively since some groups contain further groups before
// reaching an actual link.
function ResourceGroup({ node, depth, pathKey }) {
    const [open, setOpen] = useState(depth === 0 ? false : false);

    const headingClasses = [
        "font-heading font-semibold text-theme",
        depth === 0 ? "text-lg md:text-xl" : depth === 1 ? "text-base md:text-lg" : "text-sm md:text-base",
    ].join(" ");

    return (
        <div
            className={depth === 0 ? "border-b border-theme" : ""}
            style={depth > 0 ? { marginLeft: `${depth * 1.25}rem` } : undefined}
        >
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="w-full flex items-center justify-between gap-4 text-left"
                style={{ paddingTop: depth === 0 ? "1.1rem" : "0.6rem", paddingBottom: depth === 0 ? "1.1rem" : "0.6rem" }}
            >
                <span className={headingClasses}>{node.label}</span>
                <span
                    className="text-theme-muted flex-shrink-0"
                    style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.2s", display: "inline-block" }}
                >
                    +
                </span>
            </button>

            {open && (
                <div className={depth === 0 ? "pb-5" : "pb-2"}>
                    {node.intro && (
                        <p className="text-sm leading-relaxed text-theme-muted mb-3">{node.intro}</p>
                    )}
                    <ul className={depth === 0 ? "space-y-0 divide-y divide-theme" : "space-y-0"}>
                        {node.children.map((child, i) =>
                            child.kind === "leaf" ? (
                                <ResourceLeaf key={`${pathKey}-${i}`} item={child} />
                            ) : (
                                <ResourceGroup key={`${pathKey}-${i}`} node={child} depth={depth + 1} pathKey={`${pathKey}-${i}`} />
                            )
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

// A full section (e.g. "Coding"): a heading plus its top-level groups/topics.
function CategorySection({ section }) {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div id={section.id}>
            <h2
                className="font-heading font-bold text-theme leading-tight mb-1 pb-4 border-b border-theme"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
                {section.title}
            </h2>
            <div>
                {section.groups.map((group, i) => (
                    <ResourceGroup key={`${section.id}-${i}`} node={group} depth={0} pathKey={`${section.id}-${i}`} />
                ))}
            </div>
            
            {/* Return to top button */}
            <div className="mt-8 flex justify-end">
                <button 
                    onClick={scrollToTop}
                    className="text-sm font-medium text-theme-muted hover:text-theme transition-colors flex items-center gap-1.5"
                >
                    ↑ Return to top
                </button>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function Resources() {
    return (
        <>
            <section className="relative bg-dark-panel border-b overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="absolute inset-0">
                    <img src={ResourceImage} alt="" className="w-full h-full object-cover object-center opacity-50" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.2) 100%)" }} />
                </div>
                <div className="relative z-10" style={{ paddingTop: "clamp(5rem,10vw,9rem)", paddingBottom: "clamp(3rem,6vw,5rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/40 mb-3">Insights</p>
                    <h1 className="font-heading font-bold text-white leading-[1.05]" style={{ fontSize: "clamp(2.2rem,5vw,4.5rem)" }}>Resources</h1>
                    <p className="mt-2 text-sm text-white/40"><em>Last updated December 2025</em></p>
                    <p className="mt-5 text-base md:text-lg leading-relaxed text-white/60">
                        A curated collection of books, papers, tools, courses, and recorded talks spanning quantitative finance, programming, finance, and business strategy. By no means is this list exhaustive, nor am I an expert, however if one deeply looks across all of these topics one will become much more informed about a given subject.
                    </p>
                    <p className="mt-5 text-base md:text-lg leading-relaxed text-white/60">
                        Most importantly issues that you encounter during education were most likely experienced previously in one form or another -- ask questions and be willing to be curious and ask silly questions. Understand why things work and one will learn.
                    </p>
                    <p className="mt-5 text-base md:text-lg leading-relaxed text-white/60">
                        Every resource below is freely available online.
                    </p>
                </div>
            </section>

            <section style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(4rem,8vw,7rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                <p className="text-xs text-theme-muted mb-10">
                    
                </p>
                <p className="text-xs text-theme-muted mb-10">
                    Jump to a topic:{" "}
                    {RESOURCE_SECTIONS.map((section, i) => (
                        <React.Fragment key={section.id}>
                            <a 
                                href={`#${section.id}`} 
                                className="text-theme font-medium underline decoration-theme/30 underline-offset-4 hover:opacity-70 transition-opacity"
                            >
                                {section.title}
                            </a>
                            {i < RESOURCE_SECTIONS.length - 1 ? " · " : ""}
                        </React.Fragment>
                    ))}
                    .
                </p>

                <div className="space-y-14">
                    {RESOURCE_SECTIONS.map((section) => (
                        <CategorySection key={section.id} section={section} />
                    ))}
                </div>
            </section>
        </>
    );
}
