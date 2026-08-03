import React, { useEffect, useRef, useState, useCallback } from "react";

const COLS = 10;
const ROWS = 20;

// Tetromino definitions with square/box Unicode symbols and rotation states
const PIECES = {
    I: {
        char: "I",
        symbol: "▩", // Crosshatch Square
        rotations: [
            [[0, -1], [0, 0], [0, 1], [0, 2]],
            [[-1, 0], [0, 0], [1, 0], [2, 0]],
            [[0, -1], [0, 0], [0, 1], [0, 2]],
            [[-1, 0], [0, 0], [1, 0], [2, 0]],
        ],
    },
    O: {
        char: "O",
        symbol: "▣", // Square with Inner Square
        rotations: [
            [[0, 0], [0, 1], [1, 0], [1, 1]],
            [[0, 0], [0, 1], [1, 0], [1, 1]],
            [[0, 0], [0, 1], [1, 0], [1, 1]],
            [[0, 0], [0, 1], [1, 0], [1, 1]],
        ],
    },
    T: {
        char: "T",
        symbol: "▦", // Grid Square
        rotations: [
            [[0, -1], [0, 0], [0, 1], [1, 0]],
            [[-1, 0], [0, 0], [1, 0], [0, -1]],
            [[0, -1], [0, 0], [0, 1], [-1, 0]],
            [[-1, 0], [0, 0], [1, 0], [0, 1]],
        ],
    },
    S: {
        char: "S",
        symbol: "▧", // Square with Diagonal Lines
        rotations: [
            [[0, 0], [0, 1], [1, -1], [1, 0]],
            [[-1, 0], [0, 0], [0, 1], [1, 1]],
            [[0, 0], [0, 1], [1, -1], [1, 0]],
            [[-1, 0], [0, 0], [0, 1], [1, 1]],
        ],
    },
    Z: {
        char: "Z",
        symbol: "▨", // Square with Reverse Diagonal Lines
        rotations: [
            [[0, -1], [0, 0], [1, 0], [1, 1]],
            [[-1, 1], [0, 0], [0, 1], [1, 0]],
            [[0, -1], [0, 0], [1, 0], [1, 1]],
            [[-1, 1], [0, 0], [0, 1], [1, 0]],
        ],
    },
    J: {
        char: "J",
        symbol: "▤", // Square with Horizontal Lines
        rotations: [
            [[-1, -1], [0, -1], [0, 0], [0, 1]],
            [[-1, 1], [-1, 0], [0, 0], [1, 0]],
            [[0, -1], [0, 0], [0, 1], [1, 1]],
            [[-1, 0], [0, 0], [1, 0], [1, -1]],
        ],
    },
    L: {
        char: "L",
        symbol: "▥", // Square with Vertical Lines
        rotations: [
            [[0, -1], [0, 0], [0, 1], [-1, 1]],
            [[-1, 0], [0, 0], [1, 0], [1, 1]],
            [[1, -1], [0, -1], [0, 0], [0, 1]],
            [[-1, -1], [-1, 0], [0, 0], [1, 0]],
        ],
    },
};

const PIECE_KEYS = Object.keys(PIECES);

function cellColor(type) {
    if (type === "I") return "#68b0b0"; // Muted Cyan
    if (type === "O") return "#d4af37"; // Gold
    if (type === "T") return "#a786c5"; // Muted Purple
    if (type === "S") return "#86c5a0"; // Muted Green
    if (type === "Z") return "#e0716a"; // Muted Red
    if (type === "J") return "#7fa8d7"; // Muted Blue
    if (type === "L") return "#d48a56"; // Muted Orange
    return "#333333";
}

function cellDisplay(code) {
    if (!code || code === " ") {
        return { symbol: "", color: "transparent", opacity: 1 };
    }
    const isGhost = code.startsWith("g");
    const type = isGhost ? code.slice(1) : code;
    const pieceDef = PIECES[type];

    return {
        symbol: isGhost ? "[*]" : pieceDef ? pieceDef.symbol : "▣",
        color: cellColor(type),
        opacity: isGhost ? 0.45 : 1,
    };
}

function randomPiece() {
    const key = PIECE_KEYS[Math.floor(Math.random() * PIECE_KEYS.length)];
    return {
        type: key,
        char: PIECES[key].char,
        row: 1,
        col: Math.floor(COLS / 2) - 1,
        rot: 0,
    };
}

function initialState() {
    return {
        board: Array.from({ length: ROWS }, () => Array(COLS).fill(" ")),
        current: randomPiece(),
        next: randomPiece(),
        score: 0,
        lines: 0,
        level: 1,
        status: "playing", // "playing" | "paused" | "lost"
    };
}

function getBlocks(piece, rotIndex = piece.rot, offsetRow = 0, offsetCol = 0) {
    const def = PIECES[piece.type];
    const offsets = def.rotations[rotIndex % 4];
    return offsets.map(([r, c]) => ({
        r: piece.row + offsetRow + r,
        c: piece.col + offsetCol + c,
    }));
}

function isValidPosition(board, piece, rotIndex = piece.rot, offsetRow = 0, offsetCol = 0) {
    const blocks = getBlocks(piece, rotIndex, offsetRow, offsetCol);
    for (const b of blocks) {
        if (b.c < 0 || b.c >= COLS || b.r >= ROWS) return false;
        if (b.r >= 0 && board[b.r][b.c] !== " ") return false;
    }
    return true;
}

function getGhostRow(board, piece) {
    let offsetRow = 0;
    while (isValidPosition(board, piece, piece.rot, offsetRow + 1, 0)) {
        offsetRow += 1;
    }
    return piece.row + offsetRow;
}

function lockPiece(board, piece) {
    const newBoard = board.map((row) => row.slice());
    const blocks = getBlocks(piece);
    for (const b of blocks) {
        if (b.r >= 0 && b.r < ROWS && b.c >= 0 && b.c < COLS) {
            newBoard[b.r][b.c] = piece.char;
        }
    }
    return newBoard;
}

function clearLines(board) {
    const remaining = board.filter((row) => row.some((cell) => cell === " "));
    const clearedCount = ROWS - remaining.length;
    const newRows = Array.from({ length: clearedCount }, () =>
        Array(COLS).fill(" ")
    );
    return {
        board: [...newRows, ...remaining],
        cleared: clearedCount,
    };
}

export default function BlockDropper({ onExit }) {
    const stateRef = useRef(initialState());
    const [, setTick] = useState(0);
    const [level, setLevel] = useState(1);
    const [banner, setBanner] = useState(null);
    const rerender = () => setTick((t) => t + 1);

    const stepDown = useCallback(() => {
        const s = stateRef.current;
        if (s.status !== "playing") return;

        if (isValidPosition(s.board, s.current, s.current.rot, 1, 0)) {
            s.current.row += 1;
        } else {
            // Lock piece onto the board
            const nextBoard = lockPiece(s.board, s.current);
            const { board: clearedBoard, cleared } = clearLines(nextBoard);

            s.board = clearedBoard;
            if (cleared > 0) {
                const points = [0, 40, 100, 300, 1200][cleared] || 0;
                s.score += points * s.level;
                s.lines += cleared;
                const nextLevel = Math.floor(s.lines / 10) + 1;
                if (nextLevel > s.level) {
                    s.level = nextLevel;
                    setLevel(nextLevel);
                    setBanner(nextLevel);
                }
            }

            // Spawn next piece
            s.current = s.next;
            s.next = randomPiece();

            // Check for immediate collision -> game over
            if (!isValidPosition(s.board, s.current)) {
                s.status = "lost";
            }
        }
        rerender();
    }, []);

    const moveHorizontal = (dir) => {
        const s = stateRef.current;
        if (s.status !== "playing") return;
        if (isValidPosition(s.board, s.current, s.current.rot, 0, dir)) {
            s.current.col += dir;
            rerender();
        }
    };

    const rotate = () => {
        const s = stateRef.current;
        if (s.status !== "playing") return;
        const nextRot = (s.current.rot + 1) % 4;
        if (isValidPosition(s.board, s.current, nextRot)) {
            s.current.rot = nextRot;
            rerender();
        } else if (isValidPosition(s.board, s.current, nextRot, 0, -1)) {
            s.current.col -= 1;
            s.current.rot = nextRot;
            rerender();
        } else if (isValidPosition(s.board, s.current, nextRot, 0, 1)) {
            s.current.col += 1;
            s.current.rot = nextRot;
            rerender();
        }
    };

    const hardDrop = () => {
        const s = stateRef.current;
        if (s.status !== "playing") return;
        while (isValidPosition(s.board, s.current, s.current.rot, 1, 0)) {
            s.current.row += 1;
            s.score += 2;
        }
        stepDown();
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

    // Gravity loop
    useEffect(() => {
        const tickMs = Math.max(100, 750 - (level - 1) * 65);
        const id = setInterval(() => {
            stepDown();
        }, tickMs);
        return () => clearInterval(id);
    }, [level, stepDown]);

    // Keyboard controls including "R" / "r" for rotate
    useEffect(() => {
        const onKey = (e) => {
            if (["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", " ", "r", "R"].includes(e.key)) {
                e.preventDefault();
            }
            if (e.key === "ArrowLeft") moveHorizontal(-1);
            else if (e.key === "ArrowRight") moveHorizontal(1);
            else if (e.key === "ArrowDown") stepDown();
            else if (e.key === "ArrowUp" || e.key === "r" || e.key === "R") rotate();
            else if (e.key === " ") hardDrop();
            else if (e.key === "p" || e.key === "P" || e.key === "Escape") togglePause();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [stepDown]);

    // Level-up banner auto-dismiss
    useEffect(() => {
        if (banner == null) return;
        const t = setTimeout(() => setBanner(null), 1200);
        return () => clearTimeout(t);
    }, [banner]);

    const s = stateRef.current;

    // Composite display grid: board -> ghost shadow -> active current piece
    const displayGrid = s.board.map((row) => row.slice());
    if (s.status !== "lost") {
        // 1. Render Ghost / Shadow Piece
        const ghostRow = getGhostRow(s.board, s.current);
        const ghostBlocks = getBlocks(
            { ...s.current, row: ghostRow },
            s.current.rot
        );
        for (const b of ghostBlocks) {
            if (b.r >= 0 && b.r < ROWS && b.c >= 0 && b.c < COLS) {
                if (displayGrid[b.r][b.c] === " ") {
                    displayGrid[b.r][b.c] = `g${s.current.char}`;
                }
            }
        }

        // 2. Render Active Current Piece
        const activeBlocks = getBlocks(s.current);
        for (const b of activeBlocks) {
            if (b.r >= 0 && b.r < ROWS && b.c >= 0 && b.c < COLS) {
                displayGrid[b.r][b.c] = s.current.char;
            }
        }
    }

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
                        Lines <span style={{ color: "#d4af37" }}>{s.lines}</span>
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
                style={{ maxWidth: "240px", margin: "0 auto" }}
            >
                {/* PLAYABLE GAME AREA — Rigid Grid Layout */}
                <div
                    style={{
                        backgroundColor: "#090d14",
                        display: "grid",
                        gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
                        padding: "6px",
                        gap: "1px",
                    }}
                >
                    {displayGrid.map((row, y) =>
                        row.map((code, x) => {
                            const cell = cellDisplay(code);
                            return (
                                <div
                                    key={`${y}-${x}`}
                                    style={{
                                        aspectRatio: "1",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "14px",
                                        lineHeight: "1",
                                        color: cell.color,
                                        opacity: cell.opacity,
                                        overflow: "hidden",
                                        userSelect: "none",
                                    }}
                                >
                                    {cell.symbol || "\u00A0"}
                                </div>
                            );
                        })
                    )}
                </div>

                {/* NON-GAME HUD BAR — Next Piece Display */}
                <div
                    style={{
                        overflow: "hidden",
                        padding: "6px 8px",
                        backgroundColor: "#0d121c",
                        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <span className="text-[10px] tracking-[0.2em] text-theme-muted uppercase">
                        Next Piece:
                    </span>
                    <span
                        className="text-xs font-bold px-2 py-0.5 border flex items-center gap-1.5"
                        style={{
                            color: cellColor(s.next.char),
                            borderColor: "rgba(212,175,55,0.3)",
                        }}
                    >
                        <span>{PIECES[s.next.char].symbol}</span>
                        <span className="text-[10px]">{s.next.char}</span>
                    </span>
                </div>

                {/* Paused Overlay */}
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

                {/* Level-up banner */}
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

            {/* Status overlay */}
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

            {/* Controls */}
            <div className="mt-5 flex flex-col items-center gap-3">
                <div className="flex gap-2">
                    <button
                        onClick={() => moveHorizontal(-1)}
                        className="px-3 py-2 text-xs border border-theme text-theme hover:bg-theme-muted transition-colors"
                    >
                        ◀
                    </button>
                    <button
                        onClick={rotate}
                        className="px-3 py-2 text-xs border transition-colors font-bold"
                        style={{ borderColor: "rgba(212,175,55,0.5)", color: "rgb(212,175,55)" }}
                    >
                        ↻ ROTATE [R]
                    </button>
                    <button
                        onClick={stepDown}
                        className="px-3 py-2 text-xs border border-theme text-theme hover:bg-theme-muted transition-colors"
                    >
                        ▼ DROP
                    </button>
                    <button
                        onClick={() => moveHorizontal(1)}
                        className="px-3 py-2 text-xs border border-theme text-theme hover:bg-theme-muted transition-colors"
                    >
                        ▶
                    </button>
                </div>
                <p className="text-[10px] tracking-[0.12em] text-theme-muted opacity-50 text-center">
                    ←/→ move · R / ↑ rotate · ↓ soft drop · SPACE hard drop · P pause
                </p>
            </div>
        </div>
    );
}