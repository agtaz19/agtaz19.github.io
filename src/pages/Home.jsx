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