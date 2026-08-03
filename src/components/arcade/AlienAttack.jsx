import React, { useEffect, useRef, useState, useMemo } from "react";

const COLS = 13;
const ROWS = 18;

const SKY_W = 54;
const SKY_H = 5;

function makeAliens(level) {
    const startRow = 1 + Math.min(2, Math.floor((level - 1) / 2));
    const aliens = [];
    for (let r = 0; r < 3; r++) {
        for (let c = 1; c <= 9; c++) {
            aliens.push({ x: c, y: startRow + r, alive: true });
        }
    }
    return aliens;
}

function initialState() {
    return {
        playerX: Math.floor(COLS / 2),
        aliens: makeAliens(1),
        dir: 1,
        bullet: null,
        bombs: [],
        score: 0,
        lives: 3,
        level: 1,
        status: "playing",
        moveCounter: 0,
    };
}

function bounds(aliens) {
    let minX = Infinity;
    let maxX = -Infinity;
    let maxY = -1;
    for (const a of aliens) {
        if (!a.alive) continue;
        if (a.x < minX) minX = a.x;
        if (a.x > maxX) maxX = a.x;
        if (a.y > maxY) maxY = a.y;
    }
    return { minX, maxX, maxY, any: maxX >= 0 };
}

function step(prev) {
    const s = prev;
    if (s.status !== "playing") return s;
    const next = { ...s, bombs: [], moveCounter: s.moveCounter + 1 };

    const drop = 1 + Math.min(2, Math.floor((s.level - 1) / 3));
    const bombChance = Math.min(0.45, 0.12 + (s.level - 1) * 0.04);

    // alien horizontal movement every 2 ticks
    if (next.moveCounter % 2 === 0) {
        const b = bounds(s.aliens);
        if (b.any) {
            if (b.maxX + s.dir > COLS - 2 || b.minX + s.dir < 0) {
                next.dir = -s.dir;
                next.aliens = s.aliens.map((a) =>
                    a.alive ? { ...a, y: a.y + drop } : a
                );
            } else {
                next.aliens = s.aliens.map((a) =>
                    a.alive ? { ...a, x: a.x + s.dir } : a
                );
            }
        } else {
            next.aliens = s.aliens;
        }
    } else {
        next.aliens = s.aliens;
    }

    // bullet
    if (s.bullet) {
        const by = s.bullet.y - 1;
        if (by < 0) {
            next.bullet = null;
        } else {
            let hit = false;
            next.aliens = next.aliens.map((a) => {
                if (a.alive && a.x === s.bullet.x && a.y === by) {
                    hit = true;
                    return { ...a, alive: false };
                }
                return a;
            });
            if (hit) {
                next.bullet = null;
                next.score = s.score + 10;
            } else {
                next.bullet = { x: s.bullet.x, y: by };
            }
        }
    } else {
        next.bullet = null;
    }

    // alien bombs
    if (Math.random() < bombChance) {
        const alive = next.aliens.filter((a) => a.alive);
        if (alive.length) {
            const shooter = alive[Math.floor(Math.random() * alive.length)];
            next.bombs = s.bombs.concat([{ x: shooter.x, y: shooter.y + 1 }]);
        } else {
            next.bombs = s.bombs.slice();
        }
    } else {
        next.bombs = s.bombs.slice();
    }

    // move bombs and check player hit
    const playerRow = ROWS - 1;
    let hitPlayer = false;
    const remaining = [];
    for (const bm of next.bombs) {
        const ny = bm.y + 1;
        if (ny === playerRow) {
            if (bm.x === next.playerX) hitPlayer = true;
        } else if (ny > playerRow) {
            // discard
        } else {
            remaining.push({ x: bm.x, y: ny });
        }
    }
    next.bombs = remaining;
    if (hitPlayer) {
        next.lives = s.lives - 1;
        if (next.lives <= 0) next.status = "lost";
    }

    // lose if aliens reach player row
    const b2 = bounds(next.aliens);
    if (b2.any && b2.maxY >= playerRow - 1) {
        next.status = "lost";
    }

    // wave cleared → advance level
    if (!b2.any && next.status === "playing") {
        next.level = s.level + 1;
        next.aliens = makeAliens(next.level);
        next.bullet = null;
        next.bombs = [];
        next.dir = 1;
    }

    return next;
}

function cellColor(ch) {
    if (ch === "A") return "#86c5a0";
    if (ch === "|") return "#d4af37";
    if (ch === "v") return "#e0716a";
    if (ch === "▲") return "#d4af37";
    return "#333333";
}

function useSkyline() {
    return useMemo(() => {
        const heights = [];
        let i = 0;
        while (i < SKY_W) {
            const w = 3 + Math.floor(Math.random() * 3);
            const bh = 2 + Math.floor(Math.random() * (SKY_H - 1));
            for (let k = 0; k < w && i < SKY_W; k++, i++) heights.push(bh);
            if (i < SKY_W) {
                heights.push(0);
                i++;
            }
        }
        const lines = [];
        for (let r = SKY_H; r >= 1; r--) {
            let line = "";
            for (let c = 0; c < SKY_W; c++) {
                const hh = heights[c] || 0;
                if (hh >= r) {
                    const isWindow = (c + r) % 3 === 0 && r < hh;
                    line += isWindow ? " " : "█";
                } else {
                    line += " ";
                }
            }
            lines.push(line);
        }
        lines.push("▆".repeat(SKY_W));
        return lines.join("\n");
    }, []);
}

export default function AlienAttack({ onExit }) {
    const stateRef = useRef(initialState());
    const [, setTick] = useState(0);
    const [level, setLevel] = useState(1);
    const [banner, setBanner] = useState(null);
    const rerender = () => setTick((t) => t + 1);
    const skyline = useSkyline();

    const move = (d) => {
        const s = stateRef.current;
        if (s.status !== "playing") return;
        s.playerX = Math.max(0, Math.min(COLS - 1, s.playerX + d));
        rerender();
    };

    const fire = () => {
        const s = stateRef.current;
        if (s.status !== "playing" || s.bullet) return;
        s.bullet = { x: s.playerX, y: ROWS - 2 };
        rerender();
    };

    const restart = () => {
        stateRef.current = initialState();
        setLevel(1);
        setBanner(null);
        rerender();
    };

    // game loop — speeds up each level
    useEffect(() => {
        const tickMs = Math.max(70, 240 - (level - 1) * 14);
        const id = setInterval(() => {
            const before = stateRef.current.level;
            stateRef.current = step(stateRef.current);
            if (stateRef.current.level !== before) {
                setLevel(stateRef.current.level);
                setBanner(stateRef.current.level);
            }
            rerender();
        }, tickMs);
        return () => clearInterval(id);
    }, [level]);

    // held-key movement loop — ship speeds up each level
    const keys = useRef({ left: false, right: false });
    useEffect(() => {
        const moveMs = Math.max(28, 70 - (level - 1) * 4);
        const id = setInterval(() => {
            if (keys.current.left) move(-1);
            if (keys.current.right) move(1);
        }, moveMs);
        return () => clearInterval(id);
    }, [level]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "ArrowLeft") {
                e.preventDefault();
                keys.current.left = true;
            } else if (e.key === "ArrowRight") {
                e.preventDefault();
                keys.current.right = true;
            } else if ((e.key === " " || e.key === "ArrowUp") && !e.repeat) {
                e.preventDefault();
                fire();
            }
        };
        const onUp = (e) => {
            if (e.key === "ArrowLeft") keys.current.left = false;
            else if (e.key === "ArrowRight") keys.current.right = false;
        };
        window.addEventListener("keydown", onKey);
        window.addEventListener("keyup", onUp);
        return () => {
            window.removeEventListener("keydown", onKey);
            window.removeEventListener("keyup", onUp);
        };
    }, []);

    useEffect(() => {
        if (banner == null) return;
        const t = setTimeout(() => setBanner(null), 1200);
        return () => clearTimeout(t);
    }, [banner]);

    const s = stateRef.current;
    const grid = Array.from({ length: ROWS }, () => Array(COLS).fill(" "));
    for (const a of s.aliens) if (a.alive) grid[a.y][a.x] = "A";
    if (s.bullet) grid[s.bullet.y][s.bullet.x] = "|";
    for (const bm of s.bombs) grid[bm.y][bm.x] = "v";
    grid[ROWS - 1][s.playerX] = "▲";

    return (
        <div
            className="border border-theme p-5"
            style={{ backgroundColor: "rgb(var(--bg-card))", fontFamily: "var(--font-mono)" }}
        >
            {/* HUD */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-5 text-[11px] tracking-[0.15em] uppercase">
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
                <button
                    onClick={onExit}
                    className="text-[10px] tracking-[0.18em] uppercase text-theme-muted hover:text-theme transition-colors"
                >
                    ← exit
                </button>
            </div>

            {/* Playfield + skyline */}
            <div className="relative overflow-hidden border border-theme" style={{ backgroundColor: "#000" }}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                        maxWidth: "416px",
                        margin: "0 auto",
                    }}
                >
                    {grid.map((row, y) =>
                        row.map((ch, x) => (
                            <div
                                key={`${y}-${x}`}
                                style={{
                                    height: "18px",
                                    lineHeight: "18px",
                                    fontSize: "14px",
                                    textAlign: "center",
                                    color: cellColor(ch),
                                }}
                            >
                                {ch === " " ? "" : ch}
                            </div>
                        ))
                    )}
                </div>

                {/* ASCII city skyline — non-playable ground */}
                <div style={{ overflow: "hidden", padding: "4px 0 2px", backgroundColor: "#000", textAlign: "center" }}>
                    <pre
                        style={{
                            display: "inline-block",
                            margin: 0,
                            color: "#3a7d54",
                            fontSize: "clamp(7px, 1.7vw, 9px)",
                            lineHeight: "1",
                            letterSpacing: "0",
                            whiteSpace: "pre",
                        }}
                    >
                        {skyline}
                    </pre>
                </div>

                {/* Level-up banner */}
                {banner != null && (
                    <div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
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

            {/* Status overlay */}
            {s.status !== "playing" && (
                <div className="mt-5 text-center">
                    <p
                        className="text-sm tracking-[0.2em] uppercase font-bold mb-3"
                        style={{ color: "#e0716a" }}
                    >
                        ◈ Game Over ◈ — reached Level {s.level}
                    </p>
                    <button
                        onClick={restart}
                        className="px-4 py-2 text-[10px] tracking-[0.2em] uppercase border border-theme text-theme hover:bg-theme-muted transition-colors"
                    >
                        ↻ Play Again
                    </button>
                </div>
            )}

            {/* Controls */}
            <div className="mt-5 flex items-center justify-between gap-3">
                <div className="flex gap-2">
                    <button
                        onPointerDown={(e) => {
                            e.preventDefault();
                            keys.current.left = true;
                        }}
                        onPointerUp={() => (keys.current.left = false)}
                        onPointerLeave={() => (keys.current.left = false)}
                        className="px-3 py-2 text-xs border border-theme text-theme hover:bg-theme-muted transition-colors"
                    >
                        ◀
                    </button>
                    <button
                        onPointerDown={(e) => {
                            e.preventDefault();
                            fire();
                        }}
                        className="px-4 py-2 text-xs border transition-colors"
                        style={{ borderColor: "rgba(212,175,55,0.5)", color: "rgb(212,175,55)" }}
                    >
                        ▲ FIRE
                    </button>
                    <button
                        onPointerDown={(e) => {
                            e.preventDefault();
                            keys.current.right = true;
                        }}
                        onPointerUp={() => (keys.current.right = false)}
                        onPointerLeave={() => (keys.current.right = false)}
                        className="px-3 py-2 text-xs border border-theme text-theme hover:bg-theme-muted transition-colors"
                    >
                        ▶
                    </button>
                </div>
                <p className="text-[10px] tracking-[0.12em] text-theme-muted opacity-50 hidden sm:block">
                    ←/→ move · space fire
                </p>
            </div>
        </div>
    );
}