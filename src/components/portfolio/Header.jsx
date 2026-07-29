/**
 * Header — Navigation bar with dropdown menus
 *
 * - Transparent at top of home page, turns white (glass) on scroll
 * - "Who I Am" and "Support" both use the same accent color when active
 * - Dropdowns stay open with a hover-bridge gap so they don't flicker closed
 */
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "@/components/portfolio/ThemeToggle";
import { Menu, X, ChevronDown } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";
import { useLanguage } from "@/lib/LanguageContext";
import logoLight from "@/assets/logo/emine_logo_clear_white.png"
import logoDark from "@/assets/logo/emine_logo_dark.png"

function useNavItems(t) {
    const whoIAmItems = [
        { label: t.aboutMe,     path: "/about" },
        { label: t.experience,  path: "/experience" },
        { label: t.publications, path: "/publications" },
        { label: t.projects,    path: "/projects" },
        { label: "Gallery",     path: "/gallery" },
    ];
    const supportItems = [
        { label: t.events,   path: "/events" },
        { label: t.blog,     path: "/blog" },
        { label: t.resources, path: "/resources" },
    ];
    return { whoIAmItems, supportItems };
}

function Logo({ transparent }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    // transparent = over dark hero; scrolled+dark-mode = dark bg; scrolled+light-mode = light bg
    const onDarkBg = transparent || isDark;

    return (
        <Link to="/" className="flex items-center" aria-label="Home">
            <img 
                // If on a dark background, show the white logo (logoLight).
                // Otherwise, show the dark logo (logoDark).
                src={onDarkBg ? logoLight : logoDark} 
                alt="Company Logo" 
                
                // Tailwind classes to match your original 36px height (h-9) 
                // w-auto prevents the image from squishing
                className="h-9 w-auto object-contain" 
                style={{ transition: "all 0.4s ease" }}
            />
        </Link>
    );
}

function DropdownMenu({ items }) {
    return (
        /* Extra top padding creates a hover bridge so the cursor can travel into the dropdown */
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 min-w-[220px]">
            <div
                className="py-1 shadow-xl border border-theme"
                style={{ backgroundColor: "rgb(var(--bg-card))" }}
            >
                {items.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className="block px-5 py-3 text-xs tracking-[0.12em] uppercase font-semibold transition-colors duration-200"
                        style={{ color: "rgb(var(--text-secondary))" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "rgb(212,175,55)")}
                        onMouseLeave={e => (e.currentTarget.style.color = "rgb(var(--text-secondary))")}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}

function NavDropdown({ label, items, isActive, isTransparent, labelStyle }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const closeTimer = useRef(null);

    const handleMouseEnter = () => {
        clearTimeout(closeTimer.current);
        setOpen(true);
    };

    const handleMouseLeave = () => {
        // Small delay so the dropdown stays open while the cursor travels to it
        closeTimer.current = setTimeout(() => setOpen(false), 120);
    };

    // Close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div
            ref={ref}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1 text-xs tracking-[0.18em] uppercase font-semibold transition-colors duration-300"
                style={labelStyle}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = isTransparent ? "white" : "rgb(var(--text-primary))"; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = labelStyle?.color || "rgb(var(--text-secondary))"; }}
            >
                {label}
                <ChevronDown
                    size={12}
                    style={{
                        transform: open ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s",
                    }}
                />
            </button>
            {open && <DropdownMenu items={items} />}
        </div>
    );
}

const GOLD = "rgb(212,175,55)";

export default function Header() {
    const location = useLocation();
    const { t } = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileWhoOpen, setMobileWhoOpen] = useState(false);
    const [mobileSupportOpen, setMobileSupportOpen] = useState(false);

    const { whoIAmItems, supportItems } = useNavItems(t);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => { setMobileOpen(false); }, [location.pathname]);

    // All pages start with a dark hero banner, so the header is transparent at top everywhere
    const transparent = !scrolled;

    const whoIAmActive = whoIAmItems.some(i => i.path === location.pathname);
    const supportActive =
        supportItems.some(i => i.path === location.pathname) ||
        location.pathname === "/support";

    // On non-home pages the header is always solid (glass-panel), so use theme text.
    // On home page: white when transparent (over dark hero), theme text once scrolled.
    const navLabelStyle = (isActive) => ({
        color: isActive
            ? GOLD
            : transparent
            ? "rgba(255,255,255,0.7)"
            : "rgb(var(--text-secondary))",
        transition: "color 0.4s ease",
    });

    // Mobile hamburger color mirrors the same logic
    const mobileIconColor = transparent ? "white" : "rgb(var(--text-primary))";

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
                ${!transparent ? "glass-panel border-b shadow-sm" : "bg-transparent"}`}
            style={!transparent ? { borderColor: "rgb(var(--border-color))" } : undefined}
        >
            <div
                className="flex items-center justify-between h-16 md:h-20"
                style={{ paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}
            >
                <Logo transparent={transparent} />

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <NavDropdown
                        label={t.whoIAm}
                        items={whoIAmItems}
                        isActive={whoIAmActive}
                        isTransparent={transparent}
                        labelStyle={navLabelStyle(whoIAmActive)}
                    />
                    <NavDropdown
                        label={t.support}
                        items={supportItems}
                        isActive={supportActive}
                        isTransparent={transparent}
                        labelStyle={navLabelStyle(supportActive)}
                    />
                    <ThemeToggle transparent={transparent} />
                </nav>

                {/* Mobile controls */}
                <div className="flex md:hidden items-center gap-4">
                    <ThemeToggle transparent={transparent} />
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                        className="transition-colors duration-300"
                        style={{ color: mobileIconColor, transition: "color 0.4s ease" }}
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden glass-panel border-t border-theme">
                    <nav
                        className="flex flex-col py-4"
                        style={{ paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}
                    >
                        <button
                            onClick={() => setMobileWhoOpen(!mobileWhoOpen)}
                            className="flex items-center justify-between text-sm tracking-[0.15em] uppercase font-semibold py-3 border-b border-theme"
                            style={{ color: whoIAmActive ? GOLD : "rgb(var(--text-primary))" }}
                        >
                            {t.whoIAm}
                            <ChevronDown size={14} style={{ transform: mobileWhoOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                        </button>
                        {mobileWhoOpen &&
                            whoIAmItems.map(item => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="text-xs tracking-[0.12em] uppercase py-2.5 pl-4 border-b border-theme transition-colors"
                                    style={{ color: location.pathname === item.path ? GOLD : "rgb(var(--text-secondary))" }}
                                >
                                    {item.label}
                                </Link>
                            ))}

                        <button
                            onClick={() => setMobileSupportOpen(!mobileSupportOpen)}
                            className="flex items-center justify-between text-sm tracking-[0.15em] uppercase font-semibold py-3 border-b border-theme"
                            style={{ color: supportActive ? GOLD : "rgb(var(--text-primary))" }}
                        >
                            {t.support}
                            <ChevronDown size={14} style={{ transform: mobileSupportOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                        </button>
                        {mobileSupportOpen &&
                            supportItems.map(item => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="text-xs tracking-[0.12em] uppercase py-2.5 pl-4 border-b border-theme transition-colors"
                                    style={{ color: location.pathname === item.path ? GOLD : "rgb(var(--text-secondary))" }}
                                >
                                    {item.label}
                                </Link>
                            ))}
                    </nav>
                </div>
            )}
        </header>
    );
}