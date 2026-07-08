/**
 * Footer — HRT-style minimal footer
 * Columns: Contact | Legal
 * Bottom: Logo mark + copyright | Language switcher | Easter egg | Last updated
 */
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage, LANGUAGES } from "@/lib/LanguageContext";

// Inline SVG logo mark
function LogoMark() {
    return (
        <svg width="32" height="26" viewBox="0 0 44 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="18" height="32" rx="2" fill="rgb(var(--text-primary))" opacity="0.7" />
            <rect x="12" y="8" width="30" height="20" rx="2" fill="rgb(212,175,55)" />
            <rect x="14" y="10" width="26" height="16" rx="1" fill="white" opacity="0.12" />
            <line x1="2" y1="34" x2="20" y2="34" stroke="rgb(212,175,55)" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

export default function Footer() {
    const { lang, setLang, t } = useLanguage();
    const year = new Date().getFullYear();
    const lastUpdated = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const FOOTER_COLS = [
        {
            heading: t.contact,
            links: [
                { label: "contact@example.com", href: "mailto:contact@example.com" },
                { label: "+1 (212) 555-0190",   href: "tel:+12125550190" },
                { label: t.newYork,             href: null },
            ],
        },
        {
            heading: t.legal,
            links: [
                { label: t.privacyPolicy,       path: "/privacy" },
                { label: t.termsOfEngagement,   path: "/terms" },
                { label: t.ndaTemplate,         path: "/nda" },
            ],
        },
    ];

    return (
        <footer
            className="border-t border-theme bg-theme-footer"
        >
            <div
                style={{
                    paddingTop: "clamp(3rem, 6vw, 5rem)",
                    paddingBottom: "clamp(2rem, 4vw, 3rem)",
                    paddingLeft: "var(--fluid-pad)",
                    paddingRight: "var(--fluid-pad)",
                }}
            >
                {/* ── 2-column directory ── */}
                <div className="grid grid-cols-2 gap-10 md:gap-16 max-w-xl">
                    {FOOTER_COLS.map((col) => (
                        <div key={col.heading}>
                            <h5 className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-4"
                                style={{ color: "rgb(var(--text-secondary))" }}>
                                {col.heading}
                            </h5>
                            <ul className="space-y-2.5">
                                {col.links.map((link) =>
                                    link.href !== undefined && link.href !== null ? (
                                        <li key={link.label}>
                                            <a href={link.href}
                                                className="text-sm transition-colors duration-300 hover:opacity-60"
                                                style={{ color: "rgb(var(--text-primary))" }}>
                                                {link.label}
                                            </a>
                                        </li>
                                    ) : !link.path ? (
                                        <li key={link.label}>
                                            <span className="text-sm" style={{ color: "rgb(var(--text-primary))" }}>
                                                {link.label}
                                            </span>
                                        </li>
                                    ) : (
                                        <li key={link.label}>
                                            <Link to={link.path}
                                                className="text-sm transition-colors duration-300 hover:opacity-60"
                                                style={{ color: "rgb(var(--text-primary))" }}>
                                                {link.label}
                                            </Link>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* ── Language switcher ── */}
                <div className="flex items-center gap-3 mt-10 mb-2">
                    {LANGUAGES.map((l, i) => (
                        <React.Fragment key={l.code}>
                            <button
                                onClick={() => setLang(l.code)}
                                className="text-[10px] font-semibold tracking-[0.2em] uppercase transition-all duration-200"
                                style={{
                                    color: lang === l.code ? "rgb(212,175,55)" : "rgb(var(--text-secondary))",
                                    borderBottom: lang === l.code ? "1px solid rgb(212,175,55)" : "1px solid transparent",
                                    paddingBottom: "1px",
                                }}
                                title={l.full}
                            >
                                {l.label}
                            </button>
                            {i < LANGUAGES.length - 1 && (
                                <span className="text-[10px]" style={{ color: "rgb(var(--border-color))" }}>·</span>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* ── Bottom rule ── */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-8 pt-8 border-t border-theme">
                    {/* Left: logo + copyright */}
                    <div className="flex items-center gap-4">
                        <LogoMark />
                        <span className="text-xs" style={{ color: "rgb(var(--text-secondary))" }}>
                            © {year} — {t.allRightsReserved}
                        </span>
                    </div>

                    {/* Center: easter egg */}
                    <Link
                        to="/archive"
                        className="text-[10px] tracking-[0.2em] uppercase opacity-20 hover:opacity-60 transition-opacity duration-500"
                        style={{ color: "rgb(var(--text-secondary))", fontFamily: "var(--font-mono)" }}
                        title="You found it."
                    >
                        ◈ archive
                    </Link>

                    {/* Right: timestamp */}
                    <span className="text-xs" style={{ color: "rgb(var(--text-secondary))", fontFamily: "var(--font-mono)" }}>
                        {t.updated}: {lastUpdated}
                    </span>
                </div>
            </div>
        </footer>
    );
}