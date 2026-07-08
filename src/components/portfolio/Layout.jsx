/**
 * Layout — Page wrapper providing consistent Header + Footer
 *
 * Wraps every page via React Router's <Outlet>.
 * NOTE: The hero section handles its own top spacing (full-viewport).
 *       The main element has no top padding here — the header is transparent
 *       over the hero and becomes solid on scroll.
 */
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/portfolio/Header.jsx";
import Footer from "@/components/portfolio/Footer";

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col grain-overlay">
            {/* Fixed glassmorphism header */}
            <Header />

            {/* Page content — no extra top padding; hero sections manage their own */}
            <main className="flex-1">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}