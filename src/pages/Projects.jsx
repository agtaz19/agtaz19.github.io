import React, { useState, useMemo, useEffect } from "react";
import { Search, FileText, X, ArrowUpRight, Github } from "lucide-react";
import PROJECTS from "@/assets/projects/projects.json";

const TAG_COLORS = {
    "Modeling":  "rgb(11, 202, 78)",
    "Quantitative": "rgb(212,175,55)",
    "Research":     "rgb(90,160,210)",
    "Tools":        "rgb(100,185,130)",
    "Academic":     "rgb(180,120,200)",
    "Competition":  "rgb(230,100,100)",
};

const ALL_TAGS = ["All", ...Object.keys(TAG_COLORS)];

const CARDS_PER_PAGE = 9;

export default function Projects() {
    const [query, setQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState("All");
    const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);
    const [activeProject, setActiveProject] = useState(null);

    // Reset pagination when filters change
    useEffect(() => {
        setVisibleCount(CARDS_PER_PAGE);
    }, [query, selectedTag]);

    const filtered = useMemo(() => {
        const q = query.toLowerCase();
        return PROJECTS.filter((p) => {
            const matchesTag = selectedTag === "All" || p.tag === selectedTag;
            const matchesQuery =
                !q ||
                p.title.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                p.stack.some((s) => s.toLowerCase().includes(q)) ||
                p.tag.toLowerCase().includes(q);
            return matchesTag && matchesQuery;
        });
    }, [query, selectedTag]);

    const visibleProjects = filtered.slice(0, visibleCount);
    const hasMore = visibleCount < filtered.length;

    return (
        <>
            {/* Header Section */}
            <section className="relative bg-dark-panel border-b overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="absolute inset-0">
                    <img src="src\assets\stock_photos\Projects_Code_Stock.jpg" alt="" className="w-full h-full object-cover object-center opacity-50" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.2) 100%)" }} />
                </div>
                <div className="relative z-10" style={{ paddingTop: "clamp(5rem,10vw,9rem)", paddingBottom: "clamp(3rem,6vw,5rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/40 mb-3">Who I Am</p>
                    <h1 className="font-heading font-bold text-white leading-[1.05]" style={{ fontSize: "clamp(2.2rem,5vw,4.5rem)" }}>Projects</h1>
                    <p className="mt-5 text-base md:text-lg leading-relaxed text-white/60">Selected builds, models, and tools.</p>
                </div>
            </section>

            {/* Filter and Grid Section */}
            <section style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(4rem,8vw,7rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                
                {/* Search + filter bar */}
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                    <div className="relative flex-1 max-w-md">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-muted" />
                        <input
                            type="text"
                            placeholder="Search by title, stack, or keyword…"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full pl-9 pr-8 py-2.5 text-sm bg-transparent border border-theme/20 text-theme placeholder:text-theme-muted focus:outline-none focus:border-[rgb(212,175,55)] transition-colors"
                        />
                        {query && (
                            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-muted hover:text-theme">
                                <X size={12} />
                            </button>
                        )}
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {ALL_TAGS.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className="text-[10px] tracking-[0.15em] uppercase px-3 py-2 border transition-colors duration-200"
                                style={{
                                    borderColor: selectedTag === tag ? (TAG_COLORS[tag] || "rgb(212,175,55)") : "rgba(0, 0, 0, 0.1)",
                                    color: selectedTag === tag ? (TAG_COLORS[tag] || "rgb(212,175,55)") : "rgb(0, 0, 0)",
                                }}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results count */}
                <p className="text-xs text-theme-muted mb-6">Showing {visibleProjects.length} of {filtered.length} projects</p>

                {/* Grid Layout */}
                {filtered.length === 0 ? (
                    <p className="text-sm text-theme-muted py-10">No projects match your search.</p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {visibleProjects.map((p) => (
                                <div 
                                    key={p.id} 
                                    className="group flex flex-col h-full border border-theme/10 hover:border-[rgb(212,175,55)]/50 transition-all duration-300 p-6 relative cursor-pointer"
                                    style={{ backgroundColor: "rgb(var(--bg-card))" }}
                                    onClick={() => setActiveProject(p)}
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <span 
                                                className="text-[10px] tracking-[0.15em] uppercase font-semibold"
                                                style={{ color: TAG_COLORS[p.tag] || "rgb(212,175,55)" }}
                                            >
                                                {p.tag}
                                            </span>
                                            <span className="text-[10px] tracking-[0.15em] uppercase text-theme-muted">
                                                {p.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {p.github && (
                                                <a
                                                    href={p.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="text-theme-muted hover:text-[rgb(212,175,55)] transition-colors"
                                                    aria-label="View source on GitHub"
                                                >
                                                    <Github size={12} />
                                                </a>
                                            )}
                                            <span className="text-xs font-mono text-theme-muted">
                                                {p.year}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <h3 className="font-heading font-semibold text-theme text-xl leading-snug mb-3 pr-6">
                                        {p.title}
                                    </h3>
                                    <p className="text-sm text-theme-muted leading-relaxed line-clamp-3 mb-6">
                                        {p.description}
                                    </p>
                                    
                                    <div className="flex-grow"></div>
                                    
                                    <div className="pt-4 border-t border-theme/10 flex items-center justify-between mt-auto">
                                        <div className="flex gap-2 flex-wrap max-w-[80%]">
                                            {p.stack.slice(0, 3).map((s) => (
                                                <span key={s} className="text-[9px] tracking-[0.1em] uppercase px-2 py-1 border border-theme/20 text-theme-muted">
                                                    {s}
                                                </span>
                                            ))}
                                            {p.stack.length > 3 && (
                                                <span className="text-[9px] tracking-[0.1em] uppercase px-2 py-1 border border-theme/20 text-theme-muted">
                                                    +{p.stack.length - 3}
                                                </span>
                                            )}
                                        </div>
                                        
                                        <div className="w-8 h-8 rounded-full bg-theme/5 flex items-center justify-center group-hover:bg-[rgb(212,175,55)]/10 transition-colors">
                                            <ArrowUpRight size={14} className="text-theme-muted group-hover:text-[rgb(212,175,55)] transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Load More Button */}
                        {hasMore && (
                            <div className="mt-12 flex justify-center">
                                <button 
                                    onClick={() => setVisibleCount(prev => prev + CARDS_PER_PAGE)}
                                    className="text-xs tracking-[0.15em] uppercase font-semibold px-8 py-3 border border-theme/20 text-theme hover:border-[rgb(212,175,55)] hover:text-[rgb(212,175,55)] transition-all duration-300"
                                >
                                    Load More
                                </button>
                            </div>
                        )}
                    </>
                )}
            </section>

            {/* Modal Overlay */}
            {activeProject && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setActiveProject(null)}
                >
                    <div 
                        className="border border-[rgb(212,175,55)]/30 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl"
                        style={{ backgroundColor: "rgb(var(--bg-card))" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => setActiveProject(null)} 
                            className="absolute top-4 right-4 p-2 text-theme-muted hover:text-theme transition-colors z-10"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-8 sm:p-10">
                            <div className="mb-8 pr-12">
                                <div className="flex items-center gap-3 mb-3">
                                    <span 
                                        className="text-[10px] tracking-[0.2em] uppercase font-semibold"
                                        style={{ color: TAG_COLORS[activeProject.tag] || "rgb(212,175,55)" }}
                                    >
                                        {activeProject.tag}
                                    </span>
                                    <span className="text-[10px] tracking-[0.2em] uppercase text-theme-muted">
                                        {activeProject.season} {activeProject.year}
                                    </span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-theme mb-4">
                                    {activeProject.title}
                                </h2>
                                <p className="text-base text-theme-muted leading-relaxed">
                                    {activeProject.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                {activeProject.methodology && (
                                    <div>
                                        <h4 className="text-xs font-semibold tracking-widest uppercase text-theme mb-3 border-b border-theme/10 pb-2">Methodology</h4>
                                        <p className="text-sm text-theme-muted leading-relaxed" dangerouslySetInnerHTML={{ __html: activeProject.methodology }}></p>
                                    </div>
                                )}
                                
                                {activeProject.implementation && (
                                    <div>
                                        <h4 className="text-xs font-semibold tracking-widest uppercase text-theme mb-3 border-b border-theme/10 pb-2">Implementation</h4>
                                        <p className="text-sm text-theme-muted leading-relaxed" dangerouslySetInnerHTML={{ __html: activeProject.implementation }}></p>
                                    </div>
                                )}

                                {activeProject.outcomes && (
                                    <div>
                                        <h4 className="text-xs font-semibold tracking-widest uppercase text-theme mb-3 border-b border-theme/10 pb-2">Outcomes & Metrics</h4>
                                        <p className="text-sm text-theme-muted leading-relaxed">{activeProject.outcomes}</p>
                                    </div>
                                )}

                                {activeProject.extensions && (
                                    <div>
                                        <h4 className="text-xs font-semibold tracking-widest uppercase text-theme mb-3 border-b border-theme/10 pb-2">Future Extensions</h4>
                                        <p className="text-sm text-theme-muted leading-relaxed">{activeProject.extensions}</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-theme/10">
                                <div className="flex gap-2 flex-wrap">
                                    {activeProject.stack.map((s) => (
                                        <span key={s} className="text-[10px] tracking-[0.1em] uppercase px-3 py-1.5 bg-theme/5 border border-theme/10 text-theme-muted rounded-sm">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                                
                                <div className="flex gap-3 flex-wrap flex-shrink-0">
                                    {activeProject.github && (
                                        <a 
                                            href={activeProject.github} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase font-semibold px-5 py-2.5 bg-theme/5 text-theme-muted border border-theme/10 hover:bg-theme/10 hover:text-theme transition-colors rounded-sm"
                                        >
                                            <Github size={14} />
                                            View Source
                                        </a>
                                    )}
                                    {activeProject.pdf && (
                                        <a 
                                            href={activeProject.pdf} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase font-semibold px-5 py-2.5 bg-[rgb(212,175,55)]/10 text-[rgb(212,175,55)] hover:bg-[rgb(212,175,55)]/20 transition-colors rounded-sm"
                                        >
                                            <FileText size={14} />
                                            {activeProject.pdfLabel || "View Report"}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}