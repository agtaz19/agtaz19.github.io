/**
 * Support Page — "The Operational Nexus"
 *
 * Organized in HRT layout rhythm:
 *   1. Page hero — dark-overlay banner with title + description
 *   2. KnowledgeGrid — expandable inquiry category cards
 *   3. InquiryBuilder — multi-step dynamic contact form
 */
import React from "react";
import KnowledgeGrid from "@/components/portfolio/KnowledgeGrid";
import InquiryBuilder from "@/components/portfolio/InquiryBuilder";

export default function Support() {
    return (
        <>
            {/* ── Page hero banner ── */}
            <section
                className="bg-dark-panel border-b"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
                <div
                    style={{
                        paddingTop: "clamp(5rem, 10vw, 9rem)",
                        paddingBottom: "clamp(3rem, 6vw, 5rem)",
                        paddingLeft: "var(--fluid-pad)",
                        paddingRight: "var(--fluid-pad)",
                    }}
                >
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/40 mb-3">
                        Client Services
                    </p>
                    <h1
                        className="font-heading font-bold text-white leading-[1.05]"
                        style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}
                    >
                        Operational Nexus
                    </h1>
                    <p
                        className="mt-5 text-base md:text-lg leading-relaxed text-white/60 max-w-2xl"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        Streamlined client communication and frictionless inquiry management.
                        Select a knowledge topic or submit a routed inquiry below.
                    </p>
                </div>
            </section>

            {/* ── Knowledge grid ── */}
            <section
                className="border-b border-theme"
                style={{
                    paddingTop: "clamp(3rem, 7vw, 6rem)",
                    paddingBottom: "clamp(3rem, 7vw, 6rem)",
                    paddingLeft: "var(--fluid-pad)",
                    paddingRight: "var(--fluid-pad)",
                }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                    {/* Label */}
                    <div className="lg:col-span-3">
                        <p
                            className="text-xs font-semibold tracking-[0.25em] uppercase"
                            style={{ color: "rgb(var(--text-secondary))" }}
                        >
                            Knowledge Base
                        </p>
                        <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgb(var(--text-secondary))" }}>
                            Click any card to expand details on each service area.
                        </p>
                    </div>
                    {/* Grid */}
                    <div className="lg:col-span-9">
                        <KnowledgeGrid />
                    </div>
                </div>
            </section>

            {/* ── Inquiry builder ── */}
            <section
                style={{
                    paddingTop: "clamp(3rem, 7vw, 6rem)",
                    paddingBottom: "clamp(4rem, 8vw, 7rem)",
                    paddingLeft: "var(--fluid-pad)",
                    paddingRight: "var(--fluid-pad)",
                }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                    {/* Label */}
                    <div className="lg:col-span-3">
                        <p
                            className="text-xs font-semibold tracking-[0.25em] uppercase"
                            style={{ color: "rgb(var(--text-secondary))" }}
                        >
                            Submit an Inquiry
                        </p>
                        <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgb(var(--text-secondary))" }}>
                            The form routes your request based on sector and urgency. Response
                            time reflects your selected priority level.
                        </p>
                    </div>
                    {/* Form */}
                    <div className="lg:col-span-9">
                        <InquiryBuilder />
                    </div>
                </div>
            </section>
        </>
    );
}