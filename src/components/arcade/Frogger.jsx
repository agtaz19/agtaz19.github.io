import React, { useState, useEffect, useRef, useCallback } from "react";

const COLS = 13;
const ROWS = 13;

// Goal bay column indexes on Row 0
const GOAL_BAYS = [1, 4, 7, 10];

// Row definitions for playfield hazards & terrain
const LANES = [
    { row: 0, type: "goal" },
    { row: 1, type: "water", dir: -1, speed: 2, pattern: "═══    ═══   " }, // Logs left
    { row: 2, type: "water", dir: 1,  speed: 3, pattern: "◉◉   ◉◉   ◉◉ " }, // Turtles right
    { row: 3, type: "water", dir: 1,  speed: 1, pattern: "════   ════  " }, // Fast logs right
    { row: 4, type: "water", dir: -1, speed: 2, pattern: "◉◉◉    ◉◉◉   " }, // Turtles left
    { row: 5, type: "water", dir: 1,  speed: 2, pattern: "═══   ═══    " }, // Logs right
    { row: 6, type: "median" },
    { row: 7, type: "road",  dir: -1, speed: 3, pattern: "■■    ■■    ■" }, // Red cars left
    { row: 8, type: "road",  dir: 1,  speed: 2, pattern: "  ▬     ▬    " }, // Purple cruisers right
    { row: 9, type: "road",  dir: -1, speed: 1, pattern: "◀   ◀     ◀  " }, // Gold speedsters left
    { row: 10, type: "road", dir: 1,  speed: 3, pattern: "■■■    ■■■   " }, // Trucks right
    { row: 11, type: "road", dir: -1, speed: 2, pattern: "  ■■     ■■  " }, // Compact cars left
    { row: 12, type: "start" },
];

function cellColor(type, ch) {
    if (type === "frog") return "#86c5a0";       // Muted Green
    if (type === "home_filled") return "#d4af37"; // Gold star
    if (type === "water") {
        if (ch === "═") return "#d48a56";        // Logs (Muted Orange/Brown)
        if (ch === "◉") return "#68b0b0";        // Turtles (Muted Cyan)
        return "#1e304b";                        // Water ripple (Dark Navy/Blue)
    }
    if (type === "road") {
        if (ch === "■") return "#e0716a";        // Red Car
        if (ch === "▬") return "#a786c5";        // Purple Cruiser
        if (ch === "◀" || ch === "▶") return "#d4af37"; // Gold Speedster
        return "#1c222d";                        // Asphalt
    }
    if (type === "median" || type === "start") return "#2e4a38"; // Safe Grass
    if (type === "goal_wall") return "#23372b";  // Hedge/Bush
    return "#333333";
}

function getLaneCharAt(lane, col, offset) {
    if (!lane.pattern) return " ";
    const len = lane.pattern.length;
    // Calculate wrapping character position based on offset and direction
    const shift = ((offset * lane.dir) % len + len) % len;
    const idx = ((col - shift) % len + len) % len;
    return lane.pattern[idx];
}

function initialState() {
    return {
        playerX: 6,
        playerY: 12,
        playerDir: "▲",
        lives: 3,
        score: 0,
        level: 1,
        goals: [false, false, false, false], // Status of the 4 bays
        status: "playing", // "playing" | "paused" | "lost"
        tickCount: 0,
        laneOffsets: Array(ROWS).fill(0),
    };
}

export default function Frogger({ onExit }) {
    const stateRef = useRef(initialState());
    const [, setTick] = useState(0);
    const [level, setLevel] = useState(1);
    const [banner, setBanner] = useState(null);
    const rerender = () => setTick((t) => t + 1);

    const resetFrog = () => {
        const s = stateRef.current;
        s.playerX = 6;
        s.playerY = 12;
        s.playerDir = "▲";
    };

    const loseLife = () => {
        const s = stateRef.current;
        s.lives -= 1;
        if (s.lives <= 0) {
            s.status = "lost";
        } else {
            resetFrog();
        }
    };

    // Main game tick: advances traffic, carries frog on logs/turtles, checks collisions
    const step = useCallback(() => {
        const s = stateRef.current;
        if (s.status !== "playing") return;

        s.tickCount += 1;

        // Advance lanes according to their speeds
        for (let r = 0; r < ROWS; r++) {
            const lane = LANES[r];
            if (!lane.speed) continue;
            if (s.tickCount % lane.speed === 0) {
                s.laneOffsets[r] = (s.laneOffsets[r] + 1) % (lane.pattern?.length || COLS);

                // If frog is riding a river object in this row, drift with it
                if (s.playerY === r && lane.type === "water") {
                    s.playerX += lane.dir;
                    // Bounded off-screen check
                    if (s.playerX < 0 || s.playerX >= COLS) {
                        loseLife();
                        rerender();
                        return;
                    }
                }
            }
        }

        // Hazard Collision Detection at Frog's current coordinate
        const currentLane = LANES[s.playerY];
        if (currentLane.type === "road") {
            const charAtFrog = getLaneCharAt(currentLane, s.playerX, s.laneOffsets[s.playerY]);
            if (charAtFrog !== " ") {
                loseLife();
            }
        } else if (currentLane.type === "water") {
            const charAtFrog = getLaneCharAt(currentLane, s.playerX, s.laneOffsets[s.playerY]);
            if (charAtFrog === " " || charAtFrog === undefined) {
                // Sunk in water!
                loseLife();
            }
        }

        rerender();
    }, []);

    // Player movement handler
    const move = (dx, dy, symbol) => {
        const s = stateRef.current;
        if (s.status !== "playing") return;

        const nextX = s.playerX + dx;
        const nextY = s.playerY + dy;

        s.playerDir = symbol;

        // Keep player within boundaries
        if (nextX < 0 || nextX >= COLS || nextY > 12) return;

        // Handle Goal Row (Row 0) arrival
        if (nextY === 0) {
            const bayIdx = GOAL_BAYS.indexOf(nextX);
            if (bayIdx !== -1 && !s.goals[bayIdx]) {
                // Successfully docked in an open Goal Bay!
                s.goals[bayIdx] = true;
                s.score += 200 * s.level;

                // Check if all 4 Goal Bays are filled
                if (s.goals.every(Boolean)) {
                    s.score += 1000 * s.level;
                    s.level += 1;
                    s.goals = [false, false, false, false];
                    setLevel(s.level);
                    setBanner(s.level);
                }
                resetFrog();
                rerender();
                return;
            } else {
                // Hit a hedge or already occupied bay
                loseLife();
                rerender();
                return;
            }
        }

        // Score 10 points for each forward step towards river
        if (dy < 0 && nextY < s.playerY) {
            s.score += 10;
        }

        s.playerX = nextX;
        s.playerY = nextY;

        // Immediately check collision on the new cell
        const targetLane = LANES[nextY];
        if (targetLane.type === "road") {
            const ch = getLaneCharAt(targetLane, nextX, s.laneOffsets[nextY]);
            if (ch !== " ") loseLife();
        } else if (targetLane.type === "water") {
            const ch = getLaneCharAt(targetLane, nextX, s.laneOffsets[nextY]);
            if (ch === " ") loseLife();
        }

        rerender();
    };

    const togglePause = () => {
        const s = stateRef.current;
        if (s.status === "playing") {
            s.status = "paused";
            rerender();
        } else if (s.status === "paused") {
            s.status = "playing";
            rerender();
        }
    };

    const restart = () => {
        stateRef.current = initialState();
        setLevel(1);
        setBanner(null);
        rerender();
    };

    // Game loop tick interval scaled by level
    useEffect(() => {
        const tickMs = Math.max(75, 160 - (level - 1) * 15);
        const id = setInterval(() => {
            step();
        }, tickMs);
        return () => clearInterval(id);
    }, [level, step]);

    // Keyboard controls
    useEffect(() => {
        const onKey = (e) => {
            const key = e.key.toLowerCase();
            if (["arrowleft", "arrowright", "arrowup", "arrowdown", "w", "a", "s", "d", " "].includes(key)) {
                e.preventDefault();
            }
            if (key === "arrowleft" || key === "a") move(-1, 0, "◀");
            else if (key === "arrowright" || key === "d") move(1, 0, "▶");
            else if (key === "arrowup" || key === "w") move(0, -1, "▲");
            else if (key === "arrowdown" || key === "s") move(0, 1, "▼");
            else if (key === "p" || key === "escape") togglePause();
        };

        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    // Level-up banner auto-dismiss
    useEffect(() => {
        if (banner == null) return;
        const t = setTimeout(() => setBanner(null), 1200);
        return () => clearTimeout(t);
    }, [banner]);

    const s = stateRef.current;

    // Build ASCII composite grid
    const grid = Array.from({ length: ROWS }, () => Array(COLS).fill(" "));

    for (let r = 0; r < ROWS; r++) {
        const lane = LANES[r];
        for (let c = 0; c < COLS; c++) {
            if (lane.type === "goal") {
                const bayIdx = GOAL_BAYS.indexOf(c);
                if (bayIdx !== -1) {
                    grid[r][c] = s.goals[bayIdx] ? "★" : "⊔";
                } else {
                    grid[r][c] = "▒";
                }
            } else if (lane.type === "water") {
                const ch = getLaneCharAt(lane, c, s.laneOffsets[r]);
                grid[r][c] = ch === " " ? "~" : ch;
            } else if (lane.type === "road") {
                const ch = getLaneCharAt(lane, c, s.laneOffsets[r]);
                grid[r][c] = ch;
            } else if (lane.type === "median" || lane.type === "start") {
                grid[r][c] = "·";
            }
        }
    }

    // Place active frog (unless game over)
    if (s.status !== "lost") {
        grid[s.playerY][s.playerX] = s.playerDir;
    }

    return (
        <div
            className="border border-theme p-5 max-w-md mx-auto"
            style={{
                backgroundColor: "rgb(var(--bg-card, 10, 15, 24))",
                fontFamily: "var(--font-mono, monospace)",
            }}
        >
            {/* HUD BAR */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4 text-[11px] tracking-[0.15em] uppercase">
                    <span className="text-theme-muted">
                        Score <span style={{ color: "#d4af37" }}>{s.score}</span>
                    </span>
                    <span className="text-theme-muted">
                        Lv <span style={{ color: "#d4af37" }}>{s.level}</span>
                    </span>
                    <span className="text-theme-muted">
                        Lives <span style={{ color: "#d4af37" }}>{s.lives}</span>
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    {s.status !== "lost" && (
                        <button
                            onClick={togglePause}
                            className="text-[10px] tracking-[0.18em] uppercase px-2 py-1 border border-theme text-theme hover:bg-theme-muted transition-colors"
                        >
                            {s.status === "paused" ? "▶ resume" : "❚❚ pause"}
                        </button>
                    )}
                    <button
                        onClick={onExit}
                        className="text-[10px] tracking-[0.18em] uppercase text-theme-muted hover:text-theme transition-colors"
                    >
                        ← exit
                    </button>
                </div>
            </div>

            {/* PLAYFIELD CONTAINER */}
            <div
                className="relative overflow-hidden border border-theme"
                style={{ maxWidth: "312px", margin: "0 auto" }}
            >
                {/* GAME GRID */}
                <div
                    style={{
                        backgroundColor: "#090d14",
                        display: "grid",
                        gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
                        padding: "8px 6px 4px",
                        gap: "1px",
                    }}
                >
                    {grid.map((row, y) =>
                        row.map((ch, x) => {
                            const isFrog = y === s.playerY && x === s.playerX && s.status !== "lost";
                            const isGoalFilled = y === 0 && ch === "★";
                            const laneType = LANES[y].type;

                            let color = cellColor(laneType, ch);
                            if (isFrog) color = cellColor("frog");
                            else if (isGoalFilled) color = cellColor("home_filled");
                            else if (y === 0 && ch === "▒") color = cellColor("goal_wall");

                            return (
                                <div
                                    key={`${y}-${x}`}
                                    style={{
                                        aspectRatio: "1",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "15px",
                                        lineHeight: "1",
                                        color: color,
                                        userSelect: "none",
                                        backgroundColor:
                                            y === 0 && ch === "▒"
                                                ? "rgba(46, 74, 56, 0.25)"
                                                : laneType === "water"
                                                ? "rgba(30, 48, 75, 0.35)"
                                                : "transparent",
                                    }}
                                >
                                    {ch === " " ? "\u00A0" : ch}
                                </div>
                            );
                        })
                    )}
                </div>

                {/* STATUS FOOTER BAR */}
                <div
                    style={{
                        overflow: "hidden",
                        padding: "6px 10px",
                        backgroundColor: "#0d121c",
                        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <span className="text-[10px] tracking-[0.2em] text-theme-muted uppercase">
                        Bays Saved:
                    </span>
                    <div className="flex items-center gap-1.5">
                        {s.goals.map((filled, idx) => (
                            <span
                                key={idx}
                                className="text-xs font-bold px-1.5 py-0.5 border"
                                style={{
                                    color: filled ? "#d4af37" : "#555555",
                                    borderColor: filled
                                        ? "rgba(212,175,55,0.4)"
                                        : "rgba(255,255,255,0.1)",
                                }}
                            >
                                {filled ? "★" : "⊔"}
                            </span>
                        ))}
                    </div>
                </div>

                {/* PAUSED OVERLAY */}
                {s.status === "paused" && (
                    <div
                        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                        style={{ backgroundColor: "rgba(9, 13, 20, 0.85)" }}
                    >
                        <p
                            className="tracking-[0.3em] uppercase font-bold mb-1"
                            style={{ color: "#d4af37", fontSize: "clamp(16px, 3.5vw, 22px)" }}
                        >
                            ◈ PAUSED ◈
                        </p>
                        <p className="text-[10px] tracking-[0.15em] text-theme-muted uppercase">
                            Press P or ESC to resume
                        </p>
                    </div>
                )}

                {/* LEVEL-UP BANNER */}
                {banner != null && (
                    <div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
                    >
                        <p
                            className="tracking-[0.3em] uppercase font-bold"
                            style={{ color: "#d4af37", fontSize: "clamp(14px, 3vw, 20px)" }}
                        >
                            ◈ Level {banner} ◈
                        </p>
                    </div>
                )}
            </div>

            {/* GAME OVER OVERLAY */}
            {s.status === "lost" && (
                <div className="mt-5 text-center">
                    <p
                        className="text-sm tracking-[0.2em] uppercase font-bold mb-3"
                        style={{ color: "#e0716a" }}
                    >
                        ◈ Game Over ◈ — Reached Level {s.level}
                    </p>
                    <button
                        onClick={restart}
                        className="px-4 py-2 text-[10px] tracking-[0.2em] uppercase border border-theme text-theme hover:bg-theme-muted transition-colors"
                    >
                        ↻ Play Again
                    </button>
                </div>
            )}

            {/* CONTROLS */}
            <div className="mt-5 flex flex-col items-center gap-3">
                <div className="flex flex-col items-center gap-1">
                    <button
                        onClick={() => move(0, -1, "▲")}
                        className="px-4 py-1.5 text-xs border border-theme text-theme hover:bg-theme-muted transition-colors"
                    >
                        ▲
                    </button>
                    <div className="flex gap-2">
                        <button
                            onClick={() => move(-1, 0, "◀")}
                            className="px-3 py-1.5 text-xs border border-theme text-theme hover:bg-theme-muted transition-colors"
                        >
                            ◀
                        </button>
                        <button
                            onClick={() => move(0, 1, "▼")}
                            className="px-4 py-1.5 text-xs border border-theme text-theme hover:bg-theme-muted transition-colors"
                        >
                            ▼
                        </button>
                        <button
                            onClick={() => move(1, 0, "▶")}
                            className="px-3 py-1.5 text-xs border border-theme text-theme hover:bg-theme-muted transition-colors"
                        >
                            ▶
                        </button>
                    </div>
                </div>
                <p className="text-[10px] tracking-[0.12em] text-theme-muted opacity-50 text-center">
                    ←/→/↑/↓ or W/A/S/D hop · reach the open bays ⊔ · P pause
                </p>
            </div>
        </div>
    );
}