/**
 * LiveClock — Real-time clock, monospaced, right-aligned
 *
 * Displayed in the hero top-right to convey an "active session" feel.
 * Updates every second. Shows HH:MM:SS and the user's timezone.
 */
import React, { useState, useEffect } from "react";

export default function LiveClock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    const formatted = time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return (
        <div className="text-right hidden md:block">
            <div
                className="text-xl md:text-2xl tracking-widest text-white/90"
                style={{ fontFamily: "var(--font-mono)" }}
            >
                {formatted}
            </div>
            <div
                className="text-[10px] tracking-[0.2em] text-white/50 uppercase mt-0.5"
                style={{ fontFamily: "var(--font-mono)" }}
            >
                {tz}
            </div>
        </div>
    );
}