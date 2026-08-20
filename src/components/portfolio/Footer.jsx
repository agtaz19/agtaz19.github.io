/**
 * Footer — HRT-style minimal footer
 * Columns: Contact | Legal
 * Bottom: Logo mark + copyright | Language switcher | Easter egg | Last updated
 */
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage, LANGUAGES } from "@/lib/LanguageContext";
import { useTheme } from "@/lib/ThemeContext";
import logoLight from "@/assets/logo/emine_logo_clear_white.png"
import logoDark from "@/assets/logo/emine_logo_dark.png"

export default function Footer() {
    const { lang, setLang, t } = useLanguage();
    const { theme } = useTheme();

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
                { label: "agtaz19@gmail.com", href: "mailto:agtaz19@gmail.com" },
                { label: "+1 (332) 373-3062",   href: "tel:+13323733062" },
                { label: t.newYork,             href: null },
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
                        <img 
                            src={theme === 'dark' ? logoLight : logoDark} 
                            alt="Logo" 
                            className="h-6 w-auto" 
                        />

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
                        ◈ Click Me ◈
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