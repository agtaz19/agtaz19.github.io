import React, { useEffect, useRef, useState, useCallback } from "react";

const COLS = 17;
const ROWS = 15;

// Unicode symbols for rendering the playfield
const SYMBOLS = {
    HEAD_UP: "▲",
    HEAD_DOWN: "▼",
    HEAD_LEFT: "◀",
    HEAD_RIGHT: "▶",
    BODY: "▣",
    TAIL: "▢",
    FOOD: "♥",
    GOLDEN_FOOD: "★",
    EMPTY: " ",
};

function cellColor(type) {
    if (["▲", "▼", "◀", "▶"].includes(type)) return "#86c5a0"; // Muted Green (Head)
    if (type === SYMBOLS.BODY || type === SYMBOLS.TAIL) return "#68b0b0"; // Muted Cyan (Body)
    if (type === SYMBOLS.FOOD) return "#e0716a"; // Muted Red (Regular Food)
    if (type === SYMBOLS.GOLDEN_FOOD) return "#d4af37"; // Gold (Bonus Food)
    return "#333333";
}

function getRandomFood(snake) {
    const isGolden = Math.random() < 0.2; // 20% chance for golden food
    while (true) {
        const x = Math.floor(Math.random() * COLS);
        const y = Math.floor(Math.random() * ROWS);
        const collision = snake.some((seg) => seg.x === x && seg.y === y);
        if (!collision) {
            return { x, y, golden: isGolden };
        }
    }
}

function initialState() {
    const startSnake = [
        { x: Math.floor(COLS / 2), y: Math.floor(ROWS / 2) },
        { x: Math.floor(COLS / 2) - 1, y: Math.floor(ROWS / 2) },
        { x: Math.floor(COLS / 2) - 2, y: Math.floor(ROWS / 2) },
    ];
    return {
        snake: startSnake,
        dir: { x: 1, y: 0, label: "RIGHT" },
        nextDir: { x: 1, y: 0, label: "RIGHT" },
        food: getRandomFood(startSnake),
        score: 0,
        level: 1,
        applesEaten: 0,
        status: "playing", // "playing" | "paused" | "lost"[cite: 1, 3]
    };
}

export default function AsciiSnake({ onExit }) {
    const stateRef = useRef(initialState());
    const [, setTick] = useState(0);
    const [level, setLevel] = useState(1);
    const [banner, setBanner] = useState(null);
    const rerender = () => setTick((t) => t + 1);

    const step = useCallback(() => {
        const s = stateRef.current;
        if (s.status !== "playing") return;

        // Apply queued direction change
        s.dir = s.nextDir;

        const head = s.snake[0];
        const nextX = head.x + s.dir.x;
        const nextY = head.y + s.dir.y;

        // Wall collision check
        if (nextX < 0 || nextX >= COLS || nextY < 0 || nextY >= ROWS) {
            s.status = "lost";
            rerender();
            return;
        }

        // Self collision check (ignoring tail tip if not growing)
        const willGrow = nextX === s.food.x && nextY === s.food.y;
        const bodyToCheck = willGrow ? s.snake : s.snake.slice(0, -1);
        if (bodyToCheck.some((seg) => seg.x === nextX && seg.y === nextY)) {
            s.status = "lost";
            rerender();
            return;
        }

        const newHead = { x: nextX, y: nextY };
        const newSnake = [newHead, ...s.snake];

        // Check if food eaten
        if (willGrow) {
            const points = (s.food.golden ? 50 : 10) * s.level;
            s.score += points;
            s.applesEaten += 1;

            // Level up every 5 apples eaten
            const nextLevel = Math.floor(s.applesEaten / 5) + 1;
            if (nextLevel > s.level) {
                s.level = nextLevel;
                setLevel(nextLevel);
                setBanner(nextLevel);
            }

            s.food = getRandomFood(newSnake);
        } else {
            newSnake.pop(); // Remove tail
        }

        s.snake = newSnake;
        rerender();
    }, []);

    const setDirection = (nx, ny, label) => {
        const s = stateRef.current;
        if (s.status !== "playing") return;
        // Prevent 180-degree immediate reversals
        if (s.dir.x + nx === 0 && s.dir.y + ny === 0) return;
        s.nextDir = { x: nx, y: ny, label };
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

    // Game loop tick based on current level[cite: 1, 3]
    useEffect(() => {
        const tickMs = Math.max(80, 220 - (level - 1) * 18);
        const id = setInterval(() => {
            step();
        }, tickMs);
        return () => clearInterval(id);
    }, [level, step]);

    // Keyboard controls
    useEffect(() => {
        const onKey = (e) => {
            const key = e.key.toLowerCase();
            if (
                [
                    "arrowleft",
                    "arrowright",
                    "arrowup",
                    "arrowdown",
                    "w",
                    "a",
                    "s",
                    "d",
                    " ",
                ].includes(key)
            ) {
                e.preventDefault();
            }

            if (key === "arrowleft" || key === "a") setDirection(-1, 0, "LEFT");
            else if (key === "arrowright" || key === "d") setDirection(1, 0, "RIGHT");
            else if (key === "arrowup" || key === "w") setDirection(0, -1, "UP");
            else if (key === "arrowdown" || key === "s") setDirection(0, 1, "DOWN");
            else if (key === "p" || key === "escape") togglePause();
        };

        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    // Level-up banner auto-dismiss[cite: 1, 3]
    useEffect(() => {
        if (banner == null) return;
        const t = setTimeout(() => setBanner(null), 1200);
        return () => clearTimeout(t);
    }, [banner]);

    const s = stateRef.current;

    // Construct 2D playfield grid[cite: 1, 3]
    const grid = Array.from({ length: ROWS }, () => Array(COLS).fill(SYMBOLS.EMPTY));

    // Place food
    if (s.food) {
        grid[s.food.y][s.food.x] = s.food.golden
            ? SYMBOLS.GOLDEN_FOOD
            : SYMBOLS.FOOD;
    }

    // Place snake
    s.snake.forEach((seg, idx) => {
        if (seg.y >= 0 && seg.y < ROWS && seg.x >= 0 && seg.x < COLS) {
            if (idx === 0) {
                if (s.dir.y === -1) grid[seg.y][seg.x] = SYMBOLS.HEAD_UP;
                else if (s.dir.y === 1) grid[seg.y][seg.x] = SYMBOLS.HEAD_DOWN;
                else if (s.dir.x === -1) grid[seg.y][seg.x] = SYMBOLS.HEAD_LEFT;
                else grid[seg.y][seg.x] = SYMBOLS.HEAD_RIGHT;
            } else if (idx === s.snake.length - 1) {
                grid[seg.y][seg.x] = SYMBOLS.TAIL;
            } else {
                grid[seg.y][seg.x] = SYMBOLS.BODY;
            }
        }
    });

    return (
        <div
            className="border border-theme p-5 max-w-md mx-auto"
            style={{
                backgroundColor: "rgb(var(--bg-card, 10, 15, 24))",
                fontFamily: "var(--font-mono, monospace)",
            }}
        >
            {/* HUD */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4 text-[11px] tracking-[0.15em] uppercase">
                    <span className="text-theme-muted">
                        Score <span style={{ color: "#d4af37" }}>{s.score}</span>
                    </span>
                    <span className="text-theme-muted">
                        Lv <span style={{ color: "#d4af37" }}>{s.level}</span>
                    </span>
                    <span className="text-theme-muted">
                        Length <span style={{ color: "#d4af37" }}>{s.snake.length}</span>
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

            {/* Playfield Container Frame */}
            <div
                className="relative overflow-hidden border border-theme"
                style={{ maxWidth: "306px", margin: "0 auto" }}
            >
                {/* PLAYABLE GAME AREA — Obsidian Slate[cite: 1, 3] */}
                <div
                    style={{
                        backgroundColor: "#090d14",
                        display: "grid",
                        gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
                        padding: "6px",
                        gap: "1px",
                    }}
                >
                    {grid.map((row, y) =>
                        row.map((ch, x) => (
                            <div
                                key={`${y}-${x}`}
                                style={{
                                    aspectRatio: "1",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "14px",
                                    lineHeight: "1",
                                    color: cellColor(ch),
                                    userSelect: "none",
                                }}
                            >
                                {ch === " " ? "\u00A0" : ch}
                            </div>
                        ))
                    )}
                </div>

                {/* NON-GAME STATUS BAR[cite: 1, 3] */}
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
                        Direction: <span style={{ color: "#86c5a0" }}>{s.dir.label}</span>
                    </span>
                    <span
                        className="text-xs font-bold px-2 py-0.5 border flex items-center gap-1"
                        style={{
                            color: s.food?.golden ? "#d4af37" : "#e0716a",
                            borderColor: "rgba(212,175,55,0.3)",
                        }}
                    >
                        <span>{s.food?.golden ? SYMBOLS.GOLDEN_FOOD : SYMBOLS.FOOD}</span>
                        <span className="text-[10px]">
                            {s.food?.golden ? "GOLDEN (+50)" : "APPLE (+10)"}
                        </span>
                    </span>
                </div>

                {/* Paused Overlay[cite: 1, 3] */}
                {s.status === "paused" && (
                    <div
                        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                        style={{ backgroundColor: "rgba(9, 13, 20, 0.85)" }}
                    >
                        <p
                            className="tracking-[0.3em] uppercase font-bold mb-1"
                            style={{
                                color: "#d4af37",
                                fontSize: "clamp(16px, 3.5vw, 22px)",
                            }}
                        >
                            ◈ PAUSED ◈
                        </p>
                        <p className="text-[10px] tracking-[0.15em] text-theme-muted uppercase">
                            Press P or ESC to resume
                        </p>
                    </div>
                )}

                {/* Level-up Banner[cite: 1, 3] */}
                {banner != null && (
                    <div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
                    >
                        <p
                            className="tracking-[0.3em] uppercase font-bold"
                            style={{
                                color: "#d4af37",
                                fontSize: "clamp(14px, 3vw, 20px)",
                            }}
                        >
                            ◈ Level {banner} ◈
                        </p>
                    </div>
                )}
            </div>

            {/* Status Overlay[cite: 1, 3] */}
            {s.status === "lost" && (
                <div className="mt-5 text-center">
                    <p
                        className="text-sm tracking-[0.2em] uppercase font-bold mb-3"
                        style={{ color: "#e0716a" }}
                    >
                        ◈ Game Over ◈ — Score: {s.score}
                    </p>
                    <button
                        onClick={restart}
                        className="px-4 py-2 text-[10px] tracking-[0.2em] uppercase border border-theme text-theme hover:bg-theme-muted transition-colors"
                    >
                        ↻ Play Again
                    </button>
                </div>
            )}

            {/* Controls[cite: 1, 3] */}
            <div className="mt-5 flex flex-col items-center gap-3">
                <div className="flex flex-col items-center gap-1">
                    <button
                        onClick={() => setDirection(0, -1, "UP")}
                        className="px-4 py-1.5 text-xs border border-theme text-theme hover:bg-theme-muted transition-colors"
                    >
                        ▲
                    </button>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setDirection(-1, 0, "LEFT")}
                            className="px-3 py-1.5 text-xs border border-theme text-theme hover:bg-theme-muted transition-colors"
                        >
                            ◀
                        </button>
                        <button
                            onClick={() => setDirection(0, 1, "DOWN")}
                            className="px-4 py-1.5 text-xs border border-theme text-theme hover:bg-theme-muted transition-colors"
                        >
                            ▼
                        </button>
                        <button
                            onClick={() => setDirection(1, 0, "RIGHT")}
                            className="px-3 py-1.5 text-xs border border-theme text-theme hover:bg-theme-muted transition-colors"
                        >
                            ▶
                        </button>
                    </div>
                </div>
                <p className="text-[10px] tracking-[0.12em] text-theme-muted opacity-50 text-center">
                    ←/→/↑/↓ or W/A/S/D move · P pause · ESC resume
                </p>
            </div>
        </div>
    );
}