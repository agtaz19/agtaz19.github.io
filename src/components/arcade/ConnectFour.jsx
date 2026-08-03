import React, { useEffect, useState, useCallback } from "react";

const ROWS = 6;
const COLS = 7;

function createEmptyBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

function checkWin(board) {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const player = board[r][c];
            if (player === 0) continue;
            // Horizontal right
            if (c + 3 < COLS && player === board[r][c + 1] && player === board[r][c + 2] && player === board[r][c + 3]) return player;
            // Vertical down
            if (r + 3 < ROWS && player === board[r + 1][c] && player === board[r + 2][c] && player === board[r + 3][c]) return player;
            // Diagonal down-right
            if (r + 3 < ROWS && c + 3 < COLS && player === board[r + 1][c + 1] && player === board[r + 2][c + 2] && player === board[r + 3][c + 3]) return player;
            // Diagonal up-right
            if (r - 3 >= 0 && c + 3 < COLS && player === board[r - 1][c + 1] && player === board[r - 2][c + 2] && player === board[r - 3][c + 3]) return player;
        }
    }
    return 0;
}

function isBoardFull(board) {
    return board[0].every((cell) => cell !== 0);
}

export default function AsciiConnectFour({ onExit }) {
    const [board, setBoard] = useState(createEmptyBoard);
    const [turn, setTurn] = useState(1); // 1 = Player (Gold), 2 = AI (Red)
    const [status, setStatus] = useState("playing"); // "playing" | "paused" | "won" | "lost" | "draw"
    const [cursorCol, setCursorCol] = useState(3);
    const [score, setScore] = useState(0);
    const [banner, setBanner] = useState(null);

    const restart = () => {
        setBoard(createEmptyBoard());
        setTurn(1);
        setStatus("playing");
        setCursorCol(3);
        setBanner(null);
    };

    const togglePause = () => {
        if (status === "playing") setStatus("paused");
        else if (status === "paused") setStatus("playing");
    };

    const dropPieceInCol = useCallback((col, playerTurn) => {
        if (status !== "playing") return false;

        // Find lowest empty row in col
        let targetRow = -1;
        for (let r = ROWS - 1; r >= 0; r--) {
            if (board[r][col] === 0) {
                targetRow = r;
                break;
            }
        }

        if (targetRow === -1) return false; // Column is full

        const newBoard = board.map((row) => [...row]);
        newBoard[targetRow][col] = playerTurn;
        setBoard(newBoard);

        const winner = checkWin(newBoard);
        if (winner === 1) {
            setStatus("won");
            setBanner("Victory!");
            setScore((s) => s + 100);
            return true;
        } else if (winner === 2) {
            setStatus("lost");
            setBanner("Defeat");
            return true;
        } else if (isBoardFull(newBoard)) {
            setStatus("draw");
            setBanner("Draw Game");
            return true;
        }

        return true;
    }, [board, status]);

    // AI Turn Effect
    useEffect(() => {
        if (turn === 2 && status === "playing") {
            const timer = setTimeout(() => {
                // Find valid columns
                const validCols = [];
                for (let c = 0; c < COLS; c++) {
                    if (board[0][c] === 0) validCols.push(c);
                }
                if (validCols.length > 0) {
                    // Simple heuristic: check if AI can win, or block player, else random
                    let chosenCol = validCols[Math.floor(Math.random() * validCols.length)];
                    
                    for (let c of validCols) {
                        // Test AI win
                        let testBoard = board.map(r => [...r]);
                        let tr = -1;
                        for (let r = ROWS - 1; r >= 0; r--) {
                            if (testBoard[r][c] === 0) { tr = r; break; }
                        }
                        testBoard[tr][c] = 2;
                        if (checkWin(testBoard) === 2) {
                            chosenCol = c;
                            break;
                        }
                    }

                    dropPieceInCol(chosenCol, 2);
                    setTurn(1);
                }
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [turn, status, board, dropPieceInCol]);

    const handlePlayerMove = (col) => {
        if (turn !== 1 || status !== "playing") return;
        const success = dropPieceInCol(col, 1);
        if (success) {
            setTurn(2);
        }
    };

    useEffect(() => {
        const onKey = (e) => {
            const key = e.key.toLowerCase();
            if (["arrowleft", "arrowright", " ", "arrowdown", "p", "escape"].includes(key)) {
                e.preventDefault();
            }

            if (key === "arrowleft") setCursorCol((c) => Math.max(0, c - 1));
            else if (key === "arrowright") setCursorCol((c) => Math.min(COLS - 1, c + 1));
            else if (key === " " || key === "arrowdown") {
                if (turn === 1 && status === "playing") {
                    handlePlayerMove(cursorCol);
                }
            } else if (key === "p" || key === "escape") togglePause();
        };

        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [cursorCol, turn, status, board]);

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
                        Turn <span style={{ color: turn === 1 ? "#d4af37" : "#e0716a" }}>{turn === 1 ? "Player" : "AI"}</span>
                    </span>
                    <span className="text-theme-muted">
                        Score <span style={{ color: "#d4af37" }}>{score}</span>
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    {status !== "lost" && status !== "won" && status !== "draw" && (
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
                style={{ maxWidth: "320px", margin: "0 auto" }}
            >
                {/* Column Drop Indicator Row */}
                <div
                    style={{
                        backgroundColor: "#0d121c",
                        display: "grid",
                        gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
                        padding: "4px 6px 0 6px",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                    }}
                >
                    {Array.from({ length: COLS }).map((_, c) => {
                        const isCursor = cursorCol === c;
                        return (
                            <div
                                key={`indicator-${c}`}
                                onClick={() => handlePlayerMove(c)}
                                style={{
                                    textAlign: "center",
                                    fontSize: "12px",
                                    color: isCursor ? "#d4af37" : "transparent",
                                    cursor: "pointer",
                                    userSelect: "none",
                                }}
                            >
                                ▼
                            </div>
                        );
                    })}
                </div>

                {/* PLAYABLE GAME AREA — Obsidian Slate */}
                <div
                    style={{
                        backgroundColor: "#090d14",
                        display: "grid",
                        gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
                        padding: "6px",
                        gap: "2px",
                    }}
                >
                    {board.map((row, r) =>
                        row.map((cell, c) => {
                            const isCursor = cursorCol === c;
                            let displayChar = "·";
                            let color = "#333333";

                            if (cell === 1) {
                                displayChar = "●";
                                color = "#d4af37"; // Gold for Player
                            } else if (cell === 2) {
                                displayChar = "●";
                                color = "#e0716a"; // Red for AI
                            }

                            return (
                                <div
                                    key={`${r}-${c}`}
                                    onClick={() => handlePlayerMove(c)}
                                    style={{
                                        aspectRatio: "1",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "16px",
                                        lineHeight: "1",
                                        backgroundColor: isCursor ? "rgba(212,175,55,0.08)" : "transparent",
                                        border: isCursor && r === 0 ? "1px solid rgba(212,175,55,0.4)" : "1px solid rgba(255,255,255,0.02)",
                                        color: cell === 0 ? "#444444" : color,
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

                {/* NON-GAME STATUS BAR */}
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
                        Mode: <span style={{ color: "#d4af37" }}>Connect 4</span>
                    </span>
                    <span className="text-[10px] tracking-[0.1em] text-theme-muted uppercase">
                        Click / Space to Drop
                    </span>
                </div>

                {/* Paused Overlay */}
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

                {/* Banner Overlay */}
                {banner != null && (
                    <div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
                    >
                        <p
                            className="tracking-[0.3em] uppercase font-bold"
                            style={{
                                color: status === "won" ? "#86c5a0" : status === "lost" ? "#e0716a" : "#d4af37",
                                fontSize: "clamp(14px, 3vw, 20px)",
                            }}
                        >
                            ◈ {banner} ◈
                        </p>
                    </div>
                )}
            </div>

            {/* Game Over / Victory Overlay Actions */}
            {(status === "lost" || status === "won" || status === "draw") && (
                <div className="mt-5 text-center">
                    <p
                        className="text-sm tracking-[0.2em] uppercase font-bold mb-3"
                        style={{ color: status === "won" ? "#86c5a0" : status === "lost" ? "#e0716a" : "#d4af37" }}
                    >
                        ◈ {banner} ◈ — Score: {score}
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
                        onClick={() => handlePlayerMove(cursorCol)}
                        className="px-4 py-2 text-xs border border-theme text-theme hover:bg-theme-muted transition-colors uppercase tracking-wider"
                        style={{ borderColor: "rgba(212,175,55,0.5)", color: "rgb(212,175,55)" }}
                    >
                        Drop Disc [SPACE]
                    </button>
                </div>
                <p className="text-[10px] tracking-[0.12em] text-theme-muted opacity-50 text-center">
                    Left/Right keys to select column · Space to drop · P to pause
                </p>
            </div>
        </div>
    );
}