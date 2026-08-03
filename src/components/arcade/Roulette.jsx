import React, { useState, useEffect, useCallback, useRef } from "react";

const RED_NUMBERS = new Set([
    1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36
]);

const BET_PRESETS = [10, 25, 50, 100, 250];

const WHEEL_SEQUENCE = [
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5,
    24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
];

function getNumberColor(num) {
    if (num === 0) return "#86c5a0"; // Muted Green
    if (RED_NUMBERS.has(num)) return "#e0716a"; // Muted Red
    return "#cbd5e1"; // Light Slate / Black
}

function getNumberTypeLabel(num) {
    if (num === 0) return "GREEN";
    return RED_NUMBERS.has(num) ? "RED" : "BLACK";
}

function evaluateBet(betType, target, winningNumber) {
    if (betType === "NUMBER") {
        return winningNumber === target ? 35 : -1;
    }
    if (winningNumber === 0) return -1; // Outside bets lose on 0

    if (betType === "RED") return RED_NUMBERS.has(winningNumber) ? 1 : -1;
    if (betType === "BLACK") return !RED_NUMBERS.has(winningNumber) ? 1 : -1;
    if (betType === "EVEN") return winningNumber % 2 === 0 ? 1 : -1;
    if (betType === "ODD") return winningNumber % 2 !== 0 ? 1 : -1;
    if (betType === "LOW") return winningNumber >= 1 && winningNumber <= 18 ? 1 : -1;
    if (betType === "HIGH") return winningNumber >= 19 && winningNumber <= 36 ? 1 : -1;
    if (betType === "DOZEN_1") return winningNumber >= 1 && winningNumber <= 12 ? 2 : -1;
    if (betType === "DOZEN_2") return winningNumber >= 13 && winningNumber <= 24 ? 2 : -1;
    if (betType === "DOZEN_3") return winningNumber >= 25 && winningNumber <= 36 ? 2 : -1;

    return -1;
}

export default function AsciiRoulette({ onExit }) {
    const [chips, setChips] = useState(1000);
    const [selectedChip, setSelectedChip] = useState(25);
    const [activeBets, setActiveBets] = useState({}); // { [betKey]: { amount, betType, target, label } }
    const [status, setStatus] = useState("betting"); // "betting" | "spinning" | "result"
    const [winningNumber, setWinningNumber] = useState(null);
    const [displayNumber, setDisplayNumber] = useState(0);
    const [message, setMessage] = useState("Place your bets on the board & spin.");
    const [netResult, setNetResult] = useState(0);

    const spinIntervalRef = useRef(null);

    const totalWagered = Object.values(activeBets).reduce((sum, b) => sum + b.amount, 0);

    const handlePlaceBet = useCallback(
        (betKey, betType, target, label) => {
            if (status !== "betting" || chips < selectedChip) return;

            setChips((prev) => prev - selectedChip);
            setActiveBets((prev) => {
                const existing = prev[betKey] || { amount: 0, betType, target, label };
                return {
                    ...prev,
                    [betKey]: {
                        ...existing,
                        amount: existing.amount + selectedChip,
                    },
                };
            });
            setMessage(`Added $${selectedChip} on ${label}`);
        },
        [status, chips, selectedChip]
    );

    const clearBets = useCallback(() => {
        if (status !== "betting" || totalWagered === 0) return;
        setChips((prev) => prev + totalWagered);
        setActiveBets({});
        setMessage("All active bets cleared.");
    }, [status, totalWagered]);

    const spinWheel = useCallback(() => {
        if (status !== "betting" || totalWagered === 0) return;

        setStatus("spinning");
        setMessage("◈ Wheel is spinning... ◈");

        const finalNumber = Math.floor(Math.random() * 37);
        setWinningNumber(finalNumber);

        let ticks = 0;
        spinIntervalRef.current = setInterval(() => {
            ticks++;
            const randomIdx = Math.floor(Math.random() * WHEEL_SEQUENCE.length);
            setDisplayNumber(WHEEL_SEQUENCE[randomIdx]);

            if (ticks > 18) {
                clearInterval(spinIntervalRef.current);
                setDisplayNumber(finalNumber);

                // Calculate payouts
                let totalPayout = 0;
                let wonAmount = 0;

                Object.values(activeBets).forEach((bet) => {
                    const payoutMultiplier = evaluateBet(bet.betType, bet.target, finalNumber);
                    if (payoutMultiplier > 0) {
                        const win = bet.amount + bet.amount * payoutMultiplier;
                        totalPayout += win;
                        wonAmount += bet.amount * payoutMultiplier;
                    }
                });

                setChips((prev) => prev + totalPayout);
                const roundNet = totalPayout - totalWagered;
                setNetResult(roundNet);

                const colorName = getNumberTypeLabel(finalNumber);
                if (roundNet > 0) {
                    setMessage(`◈ Landed on ${finalNumber} (${colorName}) — You Won +$${roundNet}! ◈`);
                } else if (roundNet === 0 && totalPayout > 0) {
                    setMessage(`◈ Landed on ${finalNumber} (${colorName}) — Push ($0) ◈`);
                } else {
                    setMessage(`◈ Landed on ${finalNumber} (${colorName}) — Dealer Wins ◈`);
                }

                setStatus("result");
            }
        }, 85);
    }, [status, totalWagered, activeBets]);

    const resetRound = useCallback(() => {
        setActiveBets({});
        setStatus("betting");
        setMessage("Place your bets on the board & spin.");
    }, []);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
                e.preventDefault();
            }
            if (status === "betting") {
                if (e.code === "Space" || e.code === "Enter") spinWheel();
                if (e.key.toLowerCase() === "c") clearBets();
            } else if (status === "result") {
                if (e.code === "Space" || e.code === "Enter") resetRound();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [status, spinWheel, clearBets, resetRound]);

    // Generate grid numbers (1 to 36 in 3 columns)
    const gridRows = [];
    for (let r = 0; r < 12; r++) {
        gridRows.push([r * 3 + 1, r * 3 + 2, r * 3 + 3]);
    }

    return (
        <div
            className="border border-theme p-5 max-w-3xl mx-auto select-none"
            style={{
                backgroundColor: "rgb(var(--bg-card, 10, 15, 24))",
                fontFamily: "var(--font-mono, monospace)",
            }}
        >
            {/* HUD BAR */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-5 text-[11px] tracking-[0.15em] uppercase">
                    <span className="text-theme-muted">
                        Chips <span style={{ color: "#d4af37" }}>${chips}</span>
                    </span>
                    <span className="text-theme-muted">
                        Total Bet <span style={{ color: "#d4af37" }}>${totalWagered}</span>
                    </span>
                    <span className="text-theme-muted">
                        Chip Size <span style={{ color: "#d4af37" }}>${selectedChip}</span>
                    </span>
                </div>
                <button
                    onClick={onExit}
                    className="text-[10px] tracking-[0.18em] uppercase text-theme-muted hover:text-theme transition-colors"
                >
                    ← exit
                </button>
            </div>

            {/* MAIN PLAYFIELD */}
            <div
                className="border border-theme p-5 flex flex-col justify-between min-h-[410px]"
                style={{ backgroundColor: "#06090e" }}
            >
                {/* WHEEL & RESULT DISPLAY */}
                <div className="text-center pb-4 border-b border-white/10">
                    <div className="text-[10px] tracking-[0.2em] uppercase text-theme-muted mb-2">
                        ◈ Single-Zero Wheel ◈
                    </div>
                    <div className="flex items-center justify-center gap-4 my-1">
                        <span className="text-sm opacity-30">◀═══</span>
                        <div
                            className="w-16 h-12 border flex flex-col items-center justify-center font-bold text-lg transition-transform"
                            style={{
                                borderColor: "rgba(212,175,55,0.6)",
                                backgroundColor: "#090d14",
                                color: getNumberColor(displayNumber),
                            }}
                        >
                            <span>{displayNumber}</span>
                            <span className="text-[8px] tracking-widest uppercase">
                                {getNumberTypeLabel(displayNumber)}
                            </span>
                        </div>
                        <span className="text-sm opacity-30">═══▶</span>
                    </div>
                    <p
                        className="text-xs tracking-[0.15em] uppercase font-bold mt-2"
                        style={{
                            color:
                                status === "result" && netResult > 0
                                    ? "#86c5a0"
                                    : status === "result" && netResult < 0
                                    ? "#e0716a"
                                    : "#d4af37",
                        }}
                    >
                        {message}
                    </p>
                </div>

                {/* BETTING BOARD */}
                <div className="my-4 flex flex-col gap-2">
                    {/* ZERO ROW */}
                    <button
                        onClick={() => handlePlaceBet("num_0", "NUMBER", 0, "0")}
                        disabled={status !== "betting"}
                        className="w-full py-2 border flex items-center justify-between px-4 text-xs font-bold transition-colors"
                        style={{
                            borderColor: activeBets["num_0"] ? "#d4af37" : "rgba(255,255,255,0.15)",
                            backgroundColor: activeBets["num_0"] ? "rgba(212,175,55,0.15)" : "transparent",
                            color: "#86c5a0",
                        }}
                    >
                        <span>[ 0 ] SINGLE ZERO (35:1)</span>
                        {activeBets["num_0"] && (
                            <span style={{ color: "#d4af37" }}>${activeBets["num_0"].amount}</span>
                        )}
                    </button>

                    {/* MAIN 1-36 NUMBER GRID */}
                    <div className="grid grid-cols-6 gap-1">
                        {gridRows.flat().map((num) => {
                            const betKey = `num_${num}`;
                            const bet = activeBets[betKey];
                            return (
                                <button
                                    key={num}
                                    onClick={() => handlePlaceBet(betKey, "NUMBER", num, `#${num}`)}
                                    disabled={status !== "betting"}
                                    className="py-2.5 border flex flex-col items-center justify-center text-xs font-bold transition-colors relative"
                                    style={{
                                        borderColor: bet ? "#d4af37" : "rgba(255,255,255,0.1)",
                                        backgroundColor: bet ? "rgba(212,175,55,0.12)" : "#090d14",
                                        color: getNumberColor(num),
                                    }}
                                >
                                    <span>{num}</span>
                                    {bet && (
                                        <span
                                            className="text-[9px] absolute bottom-0.5 right-1"
                                            style={{ color: "#d4af37" }}
                                        >
                                            ${bet.amount}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* DOZENS OUTSIDE BETS */}
                    <div className="grid grid-cols-3 gap-1 mt-1">
                        {[
                            { id: "doz_1", type: "DOZEN_1", label: "1ST 12 (1-12)" },
                            { id: "doz_2", type: "DOZEN_2", label: "2ND 12 (13-24)" },
                            { id: "doz_3", type: "DOZEN_3", label: "3RD 12 (25-36)" },
                        ].map((item) => {
                            const bet = activeBets[item.id];
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handlePlaceBet(item.id, item.type, null, item.label)}
                                    disabled={status !== "betting"}
                                    className="py-2 border text-[10px] tracking-wider uppercase font-bold flex flex-col items-center justify-center"
                                    style={{
                                        borderColor: bet ? "#d4af37" : "rgba(255,255,255,0.15)",
                                        backgroundColor: bet ? "rgba(212,175,55,0.12)" : "transparent",
                                        color: bet ? "#d4af37" : "#cbd5e1",
                                    }}
                                >
                                    <span>{item.label}</span>
                                    {bet && <span className="text-[9px]">${bet.amount}</span>}
                                </button>
                            );
                        })}
                    </div>

                    {/* EVEN-MONEY OUTSIDE BETS */}
                    <div className="grid grid-cols-6 gap-1">
                        {[
                            { id: "low", type: "LOW", label: "1-18", color: "#cbd5e1" },
                            { id: "even", type: "EVEN", label: "EVEN", color: "#cbd5e1" },
                            { id: "red", type: "RED", label: "RED ♦", color: "#e0716a" },
                            { id: "black", type: "BLACK", label: "BLACK ♠", color: "#cbd5e1" },
                            { id: "odd", type: "ODD", label: "ODD", color: "#cbd5e1" },
                            { id: "high", type: "HIGH", label: "19-36", color: "#cbd5e1" },
                        ].map((item) => {
                            const bet = activeBets[item.id];
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handlePlaceBet(item.id, item.type, null, item.label)}
                                    disabled={status !== "betting"}
                                    className="py-2 border text-[10px] tracking-wider uppercase font-bold flex flex-col items-center justify-center"
                                    style={{
                                        borderColor: bet ? "#d4af37" : "rgba(255,255,255,0.15)",
                                        backgroundColor: bet ? "rgba(212,175,55,0.12)" : "transparent",
                                        color: item.color,
                                    }}
                                >
                                    <span>{item.label}</span>
                                    {bet && (
                                        <span style={{ color: "#d4af37" }} className="text-[9px]">
                                            ${bet.amount}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* CONTROL BAR */}
            <div className="mt-5 space-y-3">
                {status === "betting" ? (
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-[10px] text-theme-muted uppercase tracking-wider mr-1">
                                    Chip Size:
                                </span>
                                {BET_PRESETS.map((amount) => (
                                    <button
                                        key={amount}
                                        onClick={() => setSelectedChip(amount)}
                                        disabled={chips < amount}
                                        className="px-2.5 py-1 text-xs border border-theme text-theme hover:bg-theme-muted transition-colors disabled:opacity-30"
                                        style={{
                                            borderColor: selectedChip === amount ? "#d4af37" : undefined,
                                            color: selectedChip === amount ? "#d4af37" : undefined,
                                        }}
                                    >
                                        ${amount}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={clearBets}
                                disabled={totalWagered === 0}
                                className="px-3 py-1 text-xs border border-theme text-theme hover:bg-theme-muted transition-colors uppercase tracking-wider disabled:opacity-30"
                                style={{ borderColor: "rgba(224,113,106,0.5)", color: "#e0716a" }}
                            >
                                Clear Bets <span className="text-[10px] opacity-60">[C]</span>
                            </button>
                        </div>

                        <button
                            onClick={spinWheel}
                            disabled={totalWagered === 0}
                            className="w-full py-2.5 text-xs border transition-colors font-bold uppercase tracking-[0.2em] flex justify-center items-center gap-2"
                            style={{
                                borderColor: "rgba(212,175,55,0.5)",
                                color: totalWagered === 0 ? "gray" : "rgb(212,175,55)",
                            }}
                        >
                            Spin Wheel <span className="text-[10px] opacity-60 font-normal">[SPACE / ENTER]</span>
                        </button>
                    </div>
                ) : status === "result" ? (
                    <button
                        onClick={resetRound}
                        className="w-full py-2.5 text-xs border transition-colors font-bold uppercase tracking-[0.2em] flex justify-center items-center gap-2"
                        style={{ borderColor: "rgba(212,175,55,0.5)", color: "rgb(212,175,55)" }}
                    >
                        New Round <span className="text-[10px] opacity-60 font-normal">[SPACE / ENTER]</span>
                    </button>
                ) : (
                    <div className="w-full py-2.5 text-xs border border-theme text-center uppercase tracking-[0.2em] text-theme-muted">
                        Spinning Wheel...
                    </div>
                )}

                <div className="text-[10px] tracking-[0.12em] text-theme-muted opacity-60 text-center">
                    {status === "betting"
                        ? "Click board positions to add chips • Press C to Clear • Space/Enter to Spin"
                        : "Press Space/Enter to start a new betting round"}
                </div>
            </div>
        </div>
    );
}