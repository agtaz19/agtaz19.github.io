import React, { useEffect, useRef, useState, useCallback } from "react";

const COLS = 10;
const ROWS = 10;
const TOTAL_MINES = 12;

function createBoard(rows, cols, mines, firstRow, firstCol) {
    let board = Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => ({
            r,
            c,
            mine: false,
            revealed: false,
            flagged: false,
            neighborMines: 0,
        }))
    );

    let planted = 0;
    while (planted < mines) {
        const mr = Math.floor(Math.random() * rows);
        const mc = Math.floor(Math.random() * cols);
        const isNearFirst = Math.abs(mr - firstRow) <= 1 && Math.abs(mc - firstCol) <= 1;
        if (!board[mr][mc].mine && !isNearFirst) {
            board[mr][mc].mine = true;
            planted++;
        }
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (board[r][c].mine) continue;
            let count = 0;
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    const nr = r + dr;
                    const nc = c + dc;
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].mine) {
                        count++;
                    }
                }
            }
            board[r][c].neighborMines = count;
        }
    }

    return board;
}

function cellColor(ch, revealed, mine) {
    if (!revealed) return "#68b0b0"; // Muted Cyan
    if (mine) return "#e0716a";      // Muted Red
    if (ch === "1") return "#7fa8d7"; // Blue
    if (ch === "2") return "#86c5a0"; // Green
    if (ch === "3") return "#e0716a"; // Red
    if (ch === "4") return "#a786c5"; // Purple
    if (ch >= "5") return "#d4af37";  // Gold
    return "#333333";
}

export default function AsciiMinesweeper({ onExit }) {
    const [board, setBoard] = useState(() =>
        Array.from({ length: ROWS }, (_, r) =>
            Array.from({ length: COLS }, (_, c) => ({
                r,
                c,
                mine: false,
                revealed: false,
                flagged: false,
                neighborMines: 0,
            }))
        )
    );
    const [status, setStatus] = useState("ready"); // "ready" | "playing" | "paused" | "won" | "lost"
    const [flagsCount, setFlagsCount] = useState(0);
    const [score, setScore] = useState(0);
    const [cursor, setCursor] = useState({ r: 0, c: 0 });
    const [banner, setBanner] = useState(null);

    const restart = () => {
        setBoard(
            Array.from({ length: ROWS }, (_, r) =>
                Array.from({ length: COLS }, (_, c) => ({
                    r,
                    c,
                    mine: false,
                    revealed: false,
                    flagged: false,
                    neighborMines: 0,
                }))
            )
        );
        setStatus("ready");
        setFlagsCount(0);
        setScore(0);
        setCursor({ r: 0, c: 0 });
        setBanner(null);
    };

    const togglePause = () => {
        if (status === "playing") setStatus("paused");
        else if (status === "paused") setStatus("playing");
    };

    const revealCell = (r, c) => {
        if (status === "lost" || status === "won" || status === "paused") return;
        let currentBoard = board;

        if (status === "ready") {
            currentBoard = createBoard(ROWS, COLS, TOTAL_MINES, r, c);
            setStatus("playing");
        }

        if (currentBoard[r][c].flagged || currentBoard[r][c].revealed) return;

        const newBoard = currentBoard.map((row) => row.map((cell) => ({ ...cell })));

        if (newBoard[r][c].mine) {
            for (let ro = 0; ro < ROWS; ro++) {
                for (let co = 0; co < COLS; co++) {
                    if (newBoard[ro][co].mine) newBoard[ro][co].revealed = true;
                }
            }
            newBoard[r][c].revealed = true;
            setBoard(newBoard);
            setStatus("lost");
            return;
        }

        const queue = [[r, c]];
        newBoard[r][c].revealed = true;
        let revealedCount = 1;

        while (queue.length > 0) {
            const [currR, currC] = queue.shift();
            if (newBoard[currR][currC].neighborMines === 0) {
                for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        const nr = currR + dr;
                        const nc = currC + dc;
                        if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
                            if (!newBoard[nr][nc].revealed && !newBoard[nr][nc].flagged) {
                                newBoard[nr][nc].revealed = true;
                                revealedCount++;
                                if (newBoard[nr][nc].neighborMines === 0) {
                                    queue.push([nr, nc]);
                                }
                            }
                        }
                    }
                }
            }
        }

        let unrevealedSafe = 0;
        for (let ro = 0; ro < ROWS; ro++) {
            for (let co = 0; co < COLS; co++) {
                if (!newBoard[ro][co].mine && !newBoard[ro][co].revealed) {
                    unrevealedSafe++;
                }
            }
        }

        setBoard(newBoard);
        setScore((s) => s + 10 * revealedCount);

        if (unrevealedSafe === 0) {
            setStatus("won");
            setBanner("Victory!");
        }
    };

    const toggleFlag = (r, c) => {
        if (status === "lost" || status === "won" || status === "paused" || status === "ready") return;
        if (board[r][c].revealed) return;

        const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
        const target = newBoard[r][c];
        target.flagged = !target.flagged;

        setBoard(newBoard);
        setFlagsCount((fc) => (target.flagged ? fc + 1 : fc - 1));
    };

    useEffect(() => {
        const onKey = (e) => {
            const key = e.key.toLowerCase();
            if (["arrowleft", "arrowright", "arrowup", "arrowdown", " ", "f", "p", "escape"].includes(key)) {
                e.preventDefault();
            }

            if (key === "arrowleft") setCursor((c) => ({ ...c, c: Math.max(0, c.c - 1) }));
            else if (key === "arrowright") setCursor((c) => ({ ...c, c: Math.min(COLS - 1, c.c + 1) }));
            else if (key === "arrowup") setCursor((c) => ({ ...c, r: Math.max(0, c.r - 1) }));
            else if (key === "arrowdown") setCursor((c) => ({ ...c, r: Math.min(ROWS - 1, c.r + 1) }));
            else if (key === " ") revealCell(cursor.r, cursor.c);
            else if (key === "f") toggleFlag(cursor.r, cursor.c);
            else if (key === "p" || key === "escape") togglePause();
        };

        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [cursor, board, status]);

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
                        Mines <span style={{ color: "#d4af37" }}>{TOTAL_MINES - flagsCount}</span>
                    </span>
                    <span className="text-theme-muted">
                        Score <span style={{ color: "#d4af37" }}>{score}</span>
                    </span>
                    <span className="text-theme-muted">
                        Status <span style={{ color: "#86c5a0" }}>{status}</span>
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    {status !== "lost" && status !== "won" && status !== "ready" && (
                        <button
                            onClick={togglePause}
                            className="text-[10px] tracking-[0.18em] uppercase px-2 py-1 border border-theme text-theme hover:bg-theme-muted transition-colors"
                        >
                            {status === "paused" ? "▶ resume" : "❚❚ pause"}
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
                style={{ maxWidth: "280px", margin: "0 auto" }}
            >
                {/* PLAYABLE GAME AREA — Obsidian Slate[cite: 1, 3, 5] */}
                <div
                    style={{
                        backgroundColor: "#090d14",
                        display: "grid",
                        gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
                        padding: "6px",
                        gap: "1px",
                    }}
                >
                    {board.map((row, r) =>
                        row.map((cell, c) => {
                            const isCursor = cursor.r === r && cursor.c === c;
                            let displayChar = "·";
                            if (cell.revealed) {
                                if (cell.mine) displayChar = "✹";
                                else if (cell.neighborMines > 0) displayChar = String(cell.neighborMines);
                                else displayChar = " ";
                            } else if (cell.flagged) {
                                displayChar = "⚑";
                            }

                            return (
                                <div
                                    key={`${r}-${c}`}
                                    onClick={() => revealCell(r, c)}
                                    onContextMenu={(e) => {
                                        e.preventDefault();
                                        toggleFlag(r, c);
                                    }}
                                    style={{
                                        aspectRatio: "1",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "13px",
                                        lineHeight: "1",
                                        backgroundColor: isCursor ? "rgba(212,175,55,0.2)" : "transparent",
                                        border: isCursor ? "1px solid #d4af37" : "1px solid rgba(255,255,255,0.04)",
                                        color: cell.flagged
                                            ? "#e0716a"
                                            : cellColor(displayChar, cell.revealed, cell.mine),
                                        userSelect: "none",
                                        cursor: "pointer",
                                    }}
                                >
                                    {displayChar}
                                </div>
                            );
                        })
                    )}
                </div>

                {/* NON-GAME STATUS BAR[cite: 1, 3, 5] */}
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
                        Mode: <span style={{ color: "#d4af37" }}>ASCII Mines</span>
                    </span>
                    <span className="text-[10px] tracking-[0.1em] text-theme-muted uppercase">
                        Left-Click: Reveal · Right-Click: Flag
                    </span>
                </div>

                {/* Paused Overlay[cite: 1, 3, 5] */}
                {status === "paused" && (
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

                {/* Banner Overlay[cite: 1, 3, 5] */}
                {banner != null && (
                    <div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
                    >
                        <p
                            className="tracking-[0.3em] uppercase font-bold"
                            style={{ color: "#d4af37", fontSize: "clamp(14px, 3vw, 20px)" }}
                        >
                            ◈ {banner} ◈
                        </p>
                    </div>
                )}
            </div>

            {/* Game Over / Victory Overlay */}
            {(status === "lost" || status === "won") && (
                <div className="mt-5 text-center">
                    <p
                        className="text-sm tracking-[0.2em] uppercase font-bold mb-3"
                        style={{ color: status === "won" ? "#86c5a0" : "#e0716a" }}
                    >
                        ◈ {status === "won" ? "Victory!" : "Game Over"} ◈ — Score: {score}
                    </p>
                    <button
                        onClick={restart}
                        className="px-4 py-2 text-[10px] tracking-[0.2em] uppercase border border-theme text-theme hover:bg-theme-muted transition-colors"
                    >
                        ↻ Play Again
                    </button>
                </div>
            )}

            {/* Controls Guide */}
            <div className="mt-5 flex flex-col items-center gap-3">
                <div className="flex gap-2">
                    <button
                        onClick={() => revealCell(cursor.r, cursor.c)}
                        className="px-4 py-2 text-xs border border-theme text-theme hover:bg-theme-muted transition-colors uppercase tracking-wider"
                        style={{ borderColor: "rgba(212,175,55,0.5)", color: "rgb(212,175,55)" }}
                    >
                        Reveal [SPACE]
                    </button>
                    <button
                        onClick={() => toggleFlag(cursor.r, cursor.c)}
                        className="px-4 py-2 text-xs border border-theme text-theme hover:bg-theme-muted transition-colors uppercase tracking-wider"
                    >
                        Flag [F]
                    </button>
                </div>
                <p className="text-[10px] tracking-[0.12em] text-theme-muted opacity-50 text-center">
                    Arrow keys to move cursor · Space to reveal · F to flag · P to pause
                </p>
            </div>
        </div>
    );
}