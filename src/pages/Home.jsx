/**
 * Home Page — "The Master Portfolio"
 *
 * Section order (mirrors HRT layout rhythm):
 * 1. HeroSection      — Full-viewport hero, typewriter title, live clock
 * 2. EditorialSection — "What I Do" editorial two-column block
 * 3. PillarsGrid      — 4-tile image grid (Finance / Quant / Consulting / Strategy)
 * 4. PhilosophyBanner — Full-width dark editorial banner with stats
 * 5. ProjectTicker    — Horizontal-scrolling project cards
 */
import React from "react";
import HeroSection      from "@/components/portfolio/HeroSection";
import EditorialSection from "@/components/portfolio/EditorialSection";
import PillarsGrid      from "@/components/portfolio/PillarsGrid";
import PhilosophyBanner from "@/components/portfolio/PhilosophyBanner";
import ProjectTicker    from "@/components/portfolio/ProjectTicker";

export default function Home() {
    return (
        <>
            <HeroSection />
            <EditorialSection />
            <PillarsGrid />
            <PhilosophyBanner />
            <ProjectTicker />
        </>
    );
}