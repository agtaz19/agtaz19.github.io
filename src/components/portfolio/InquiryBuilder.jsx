/**
 * InquiryBuilder — Multi-step dynamic contact form
 *
 * Step 1: Select sector
 * Step 2: Select priority (border color shifts to match urgency)
 * Step 3: Enter name, email, message → submit
 * Step 4: Confirmation screen
 *
 * The border color of the container updates in real-time based
 * on the selected priority level — Standard / Priority / Urgent.
 *
 * Edit SECTORS and PRIORITIES to match your real service tiers.
 */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, CheckCircle } from "lucide-react";

// ── Sector options ──
const SECTORS = [
    "Asset Management",
    "Private Equity",
    "Corporate Finance",
    "Hedge Fund",
    "Insurance",
    "Government / Sovereign",
    "Technology",
    "Other",
];

// ── Priority tiers — each shifts the container border color ──
const PRIORITIES = [
    {
        value: "standard",
        label: "Standard",
        sublabel: "5–7 business days",
        borderColor: "rgba(var(--border-color), var(--border-opacity))",
    },
    {
        value: "priority",
        label: "Priority",
        sublabel: "2–3 business days",
        borderColor: "rgb(var(--accent))",
    },
    {
        value: "urgent",
        label: "Urgent",
        sublabel: "24 hours",
        borderColor: "rgb(212, 175, 55)",
    },
];

// ── Slide animation ──
const slideVariants = {
    enter:  (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

export default function InquiryBuilder() {
    const [step,         setStep]       = useState(0);
    const [direction, setDirection] = useState(1);
    const [sector,      setSector]     = useState("");
    const [priority,    setPriority]   = useState("");
    const [name,        setName]       = useState("");
    const [email,       setEmail]      = useState("");
    const [message,     setMessage]    = useState("");

    const goNext = () => { setDirection(1);  setStep((s) => s + 1); };
    const goBack = () => { setDirection(-1); setStep((s) => s - 1); };

    const activePriority = PRIORITIES.find((p) => p.value === priority);
    // Dynamic border color shifts as user selects priority
    const containerBorder = activePriority
        ? activePriority.borderColor
        : "rgba(var(--border-color), var(--border-opacity))";

    const inputStyle = {
        backgroundColor: "transparent",
        borderColor: containerBorder,
        color: "rgb(var(--text-primary))",
        fontFamily: "var(--font-mono)",
        fontSize: "0.875rem",
    };

    return (
        <div
            className="border rounded-sm overflow-hidden transition-all duration-500"
            style={{
                borderColor: containerBorder,
                backgroundColor: "rgb(var(--bg-card))",
            }}
        >
            {/* ── Step progress bar ── */}
            <div className="flex border-b border-theme">
                {["Sector", "Priority", "Details"].map((label, i) => (
                    <div
                        key={label}
                        className="flex-1 h-0.5 transition-colors duration-500"
                        style={{
                            backgroundColor: i < step && step < 3
                                ? "rgb(var(--accent))"
                                : i === step && step < 3
                                ? "rgb(var(--accent))"
                                : "rgba(var(--border-color), var(--border-opacity))",
                        }}
                    />
                ))}
            </div>

            <div className="p-7 md:p-10">
                {/* ── Step label ── */}
                {step < 3 && (
                    <p
                        className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-6"
                        style={{ color: "rgb(var(--text-secondary))", fontFamily: "var(--font-mono)" }}
                    >
                        Step {step + 1} of 3 — {["Select Sector", "Set Priority", "Your Details"][step]}
                    </p>
                )}

                {/* ── Animated step content ── */}
                <AnimatePresence mode="wait" custom={direction}>
                    {/* STEP 0: Sector */}
                    {step === 0 && (
                        <motion.div
                            key="sector"
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="font-heading text-xl md:text-2xl font-semibold mb-2">
                                What is your sector?
                            </h3>
                            <p className="text-sm mb-6" style={{ color: "rgb(var(--text-secondary))" }}>
                                Helps us route your inquiry to the right specialist.
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                                {SECTORS.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => { setSector(s); goNext(); }}
                                        className="border border-theme text-left px-3 py-3.5 rounded-sm text-sm
                                                   transition-all duration-250 hover:border-opacity-50"
                                        style={{
                                            borderColor: sector === s ? "rgb(var(--accent))" : undefined,
                                            color: sector === s ? "rgb(var(--accent))" : "rgb(var(--text-primary))",
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "0.78rem",
                                        }}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 1: Priority */}
                    {step === 1 && (
                        <motion.div
                            key="priority"
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="font-heading text-xl md:text-2xl font-semibold mb-2">
                                Select your priority level
                            </h3>
                            <p className="text-sm mb-6" style={{ color: "rgb(var(--text-secondary))" }}>
                                Expected response time adjusts based on your selection.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {PRIORITIES.map((p) => (
                                    <button
                                        key={p.value}
                                        onClick={() => { setPriority(p.value); goNext(); }}
                                        className="border text-left p-5 rounded-sm transition-all duration-300"
                                        style={{
                                            borderColor: priority === p.value ? p.borderColor : "rgba(var(--border-color), var(--border-opacity))",
                                        }}
                                    >
                                        <div className="font-heading text-lg font-semibold">{p.label}</div>
                                        <div
                                            className="text-xs mt-1"
                                            style={{ color: "rgb(var(--text-secondary))", fontFamily: "var(--font-mono)" }}
                                        >
                                            {p.sublabel}
                                        </div>
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={goBack}
                                className="mt-6 text-xs flex items-center gap-1.5 transition-opacity hover:opacity-60"
                                style={{ color: "rgb(var(--text-secondary))", fontFamily: "var(--font-mono)" }}
                            >
                                <ArrowLeft size={13} /> Back
                            </button>
                        </motion.div>
                    )}

                    {/* STEP 2: Contact details */}
                    {step === 2 && (
                        <motion.div
                            key="details"
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="font-heading text-xl md:text-2xl font-semibold mb-1">
                                Your Details
                            </h3>
                            <p className="text-sm mb-6" style={{ color: "rgb(var(--text-secondary))" }}>
                                Sector:{" "}
                                <span style={{ color: "rgb(var(--accent))" }}>{sector}</span>
                                {" · "}
                                Priority:{" "}
                                <span style={{ color: "rgb(var(--accent))" }}>{priority}</span>
                            </p>

                            <div className="space-y-3 max-w-lg">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full border rounded-sm px-4 py-3 focus:outline-none
                                               transition-colors duration-300 placeholder:opacity-40"
                                    style={inputStyle}
                                />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border rounded-sm px-4 py-3 focus:outline-none
                                               transition-colors duration-300 placeholder:opacity-40"
                                    style={inputStyle}
                                />
                                <textarea
                                    placeholder="Describe your inquiry..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={4}
                                    className="w-full border rounded-sm px-4 py-3 focus:outline-none
                                               transition-colors duration-300 placeholder:opacity-40 resize-none"
                                    style={inputStyle}
                                />
                            </div>

                            <div className="flex items-center gap-5 mt-6">
                                <button
                                    onClick={goBack}
                                    className="text-xs flex items-center gap-1.5 transition-opacity hover:opacity-60"
                                    style={{ color: "rgb(var(--text-secondary))", fontFamily: "var(--font-mono)" }}
                                >
                                    <ArrowLeft size={13} /> Back
                                </button>
                                <button
                                    onClick={goNext}
                                    disabled={!name || !email || !message}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-sm text-sm
                                               font-semibold tracking-[0.12em] uppercase transition-all duration-300
                                               hover:opacity-90 disabled:opacity-30"
                                    style={{
                                        backgroundColor: "rgb(var(--accent))",
                                        color: "white",
                                    }}
                                >
                                    Submit <Send size={14} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: Confirmation */}
                    {step === 3 && (
                        <motion.div
                            key="done"
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                            className="text-center py-10"
                        >
                            <CheckCircle
                                size={44}
                                className="mx-auto mb-5"
                                style={{ color: "rgb(var(--accent))" }}
                            />
                            <h3 className="font-heading text-2xl font-semibold mb-2">
                                Inquiry Received
                            </h3>
                            <p className="text-sm leading-relaxed max-w-md mx-auto" style={{ color: "rgb(var(--text-secondary))" }}>
                                Your <strong>{priority}</strong> inquiry for the{" "}
                                <strong>{sector}</strong> sector has been logged. We will respond
                                within the indicated timeframe.
                            </p>
                            <button
                                onClick={() => {
                                    setStep(0); setSector(""); setPriority("");
                                    setName(""); setEmail(""); setMessage("");
                                }}
                                className="mt-7 text-xs font-semibold tracking-[0.15em] uppercase px-6 py-3
                                           border border-theme rounded-sm transition-opacity hover:opacity-60"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                Submit New Inquiry
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}