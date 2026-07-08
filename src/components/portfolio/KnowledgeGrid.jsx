/**
 * KnowledgeGrid — Expandable support topic cards
 *
 * Each card: icon + title + one-liner summary.
 * Click to expand a detailed description.
 * Styled to match the clean light-theme grid language.
 *
 * Edit CATEGORIES to add/change support topics.
 */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, Database, BarChart3, Shield, FileText, Settings, ChevronDown } from "lucide-react";

// ── Support topics — edit freely ──
const CATEGORIES = [
    {
        id: "onboarding",
        icon: UserPlus,
        title: "Onboarding",
        summary: "Getting started as a new client",
        details:
            "Our onboarding process includes an initial discovery call, needs assessment, scope definition, and a tailored engagement plan delivered within 5 business days.",
    },
    {
        id: "data-access",
        icon: Database,
        title: "Data Access",
        summary: "Requesting datasets and reports",
        details:
            "All deliverables are hosted on a secure client portal. Request ad-hoc data exports, schedule recurring reports, and manage team access permissions.",
    },
    {
        id: "frameworks",
        icon: BarChart3,
        title: "Strategic Frameworks",
        summary: "Methodologies and analytical tools",
        details:
            "We employ proprietary frameworks including Risk Parity Allocation, Monte Carlo Scenario Analysis, and Strategic Optionality Mapping — all available through your engagement dashboard.",
    },
    {
        id: "compliance",
        icon: Shield,
        title: "Compliance & NDA",
        summary: "Legal and confidentiality agreements",
        details:
            "All engagements are governed by strict NDAs and regulatory compliance protocols. Contact us to review or amend existing agreements.",
    },
    {
        id: "deliverables",
        icon: FileText,
        title: "Deliverables",
        summary: "Reports, models, and presentations",
        details:
            "Deliverables include executive summaries, detailed financial models, board-ready presentations, and implementation roadmaps.",
    },
    {
        id: "technical",
        icon: Settings,
        title: "Technical Support",
        summary: "Platform access and troubleshooting",
        details:
            "For technical issues with the client portal, data feeds, or API integrations, our support team responds within 4 hours during business days.",
    },
];

function KnowledgeCard({ category }) {
    const [expanded, setExpanded] = useState(false);
    const Icon = category.icon;

    return (
        <div
            className="border border-theme cursor-pointer transition-shadow duration-300 hover:shadow-sm"
            style={{ backgroundColor: "rgb(var(--bg-card))" }}
            onClick={() => setExpanded(!expanded)}
        >
            <div className="p-5 md:p-6">
                {/* Header row */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div
                            className="flex-shrink-0 w-9 h-9 rounded flex items-center justify-center mt-0.5"
                            style={{ backgroundColor: "rgba(var(--accent), 0.08)" }}
                        >
                            <Icon size={16} style={{ color: "rgb(var(--accent))" }} />
                        </div>
                        {/* Title + summary */}
                        <div>
                            <h3 className="font-heading font-semibold text-base md:text-lg leading-tight">
                                {category.title}
                            </h3>
                            <p
                                className="text-xs mt-1 font-mono tracking-wide"
                                style={{ color: "rgb(var(--text-secondary))" }}
                            >
                                {category.summary}
                            </p>
                        </div>
                    </div>
                    {/* Chevron */}
                    <ChevronDown
                        size={16}
                        className="flex-shrink-0 mt-1 transition-transform duration-300"
                        style={{
                            color: "rgb(var(--text-secondary))",
                            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                    />
                </div>

                {/* Expanded detail */}
                <AnimatePresence initial={false}>
                    {expanded && (
                        <motion.div
                            key="detail"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.28 }}
                            className="overflow-hidden"
                        >
                            <p
                                className="text-sm leading-relaxed mt-4 pt-4 border-t border-theme"
                                style={{ color: "rgb(var(--text-secondary))" }}
                            >
                                {category.details}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default function KnowledgeGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {CATEGORIES.map((cat) => (
                <KnowledgeCard key={cat.id} category={cat} />
            ))}
        </div>
    );
}