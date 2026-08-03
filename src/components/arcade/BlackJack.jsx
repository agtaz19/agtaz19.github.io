import React, { useState, useEffect, useCallback } from "react";

const SUITS = ["♠", "♥", "♦", "♣"];
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const BET_PRESETS = [10, 25, 50, 100, 250];

function createDeck() {
    const deck = [];
    for (const suit of SUITS) {
        for (const value of VALUES) {
            let weight = parseInt(value, 10);
            if (["J", "Q", "K"].includes(value)) weight = 10;
            if (value === "A") weight = 11;
            deck.push({ suit, value, weight });
        }
    }
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function getHandValue(hand) {
    let score = 0;
    let aces = 0;
    for (const card of hand) {
        score += card.weight;
        if (card.value === "A") aces += 1;
    }
    while (score > 21 && aces > 0) {
        score -= 10;
        aces -= 1;
    }
    return score;
}

function Card({ card, hidden }) {
    if (hidden) {
        return (
            <div
                className="w-12 h-16 border flex items-center justify-center text-xs select-none"
                style={{
                    backgroundColor: "#131822",
                    borderColor: "rgba(212,175,55,0.4)",
                    color: "#d4af37",
                }}
            >
                ░░
            </div>
        );
    }

    const isRed = card.suit === "♥" || card.suit === "♦";
    return (
        <div
            className="w-12 h-16 border flex flex-col justify-between p-1 text-xs select-none"
            style={{
                backgroundColor: "#06090e",
                borderColor: "rgba(212,175,55,0.4)",
                color: isRed ? "#e0716a" : "#86c5a0",
            }}
        >
            <span className="leading-none font-bold">{card.value}</span>
            <span className="self-center text-sm">{card.suit}</span>
            <span className="self-end leading-none font-bold">{card.value}</span>
        </div>
    );
}

export default function Blackjack({ onExit }) {
    const [deck, setDeck] = useState([]);
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [status, setStatus] = useState("betting"); // betting | playing | dealerTurn | won | lost | push | blackjack
    const [chips, setChips] = useState(1000);
    const [bet, setBet] = useState(50);

    const startHand = useCallback(() => {
        if (chips < bet || bet <= 0) return;
        const newDeck = createDeck();
        const pHand = [newDeck.pop(), newDeck.pop()];
        const dHand = [newDeck.pop(), newDeck.pop()];

        setDeck(newDeck);
        setPlayerHand(pHand);
        setDealerHand(dHand);
        setChips((c) => c - bet);

        const pVal = getHandValue(pHand);
        if (pVal === 21) {
            setStatus("blackjack");
            setChips((c) => c + Math.floor(bet * 2.5));
        } else {
            setStatus("playing");
        }
    }, [chips, bet]);

    const hit = useCallback(() => {
        if (status !== "playing") return;
        const nextDeck = [...deck];
        const nextHand = [...playerHand, nextDeck.pop()];
        setDeck(nextDeck);
        setPlayerHand(nextHand);

        if (getHandValue(nextHand) > 21) {
            setStatus("lost");
        }
    }, [status, deck, playerHand]);

    const stand = useCallback(() => {
        if (status !== "playing") return;
        setStatus("dealerTurn");
        let dHand = [...dealerHand];
        let nextDeck = [...deck];

        while (getHandValue(dHand) < 17) {
            dHand.push(nextDeck.pop());
        }

        setDealerHand(dHand);
        setDeck(nextDeck);

        const pVal = getHandValue(playerHand);
        const dVal = getHandValue(dHand);

        if (dVal > 21 || pVal > dVal) {
            setStatus("won");
            setChips((c) => c + bet * 2);
        } else if (pVal === dVal) {
            setStatus("push");
            setChips((c) => c + bet);
        } else {
            setStatus("lost");
        }
    }, [status, dealerHand, deck, playerHand, bet]);

    const doubleDown = useCallback(() => {
        if (status !== "playing" || chips < bet) return;
        setChips((c) => c - bet);
        const nextDeck = [...deck];
        const nextHand = [...playerHand, nextDeck.pop()];
        setDeck(nextDeck);
        setPlayerHand(nextHand);

        if (getHandValue(nextHand) > 21) {
            setStatus("lost");
            return;
        }

        let dHand = [...dealerHand];
        while (getHandValue(dHand) < 17) {
            dHand.push(nextDeck.pop());
        }
        setDealerHand(dHand);

        const pVal = getHandValue(nextHand);
        const dVal = getHandValue(dHand);

        if (dVal > 21 || pVal > dVal) {
            setStatus("won");
            setChips((c) => c + bet * 4);
        } else if (pVal === dVal) {
            setStatus("push");
            setChips((c) => c + bet * 2);
        } else {
            setStatus("lost");
        }
    }, [status, chips, bet, deck, playerHand, dealerHand]);

    const adjustBet = (amount) => {
        setBet((b) => Math.max(10, Math.min(chips, b + amount)));
    };

    const setPresetBet = (amount) => {
        setBet(Math.min(chips, amount));
    };

    // Keyboard Navigation / Control Listener
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Prevent browser scroll when using space or arrow keys
            if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
                e.preventDefault();
            }

            const key = e.key.toLowerCase();

            if (status === "playing") {
                if (key === "h") hit();
                if (key === "s") stand();
                if (key === "d" && playerHand.length === 2 && chips >= bet) doubleDown();
            } else {
                if (e.code === "Space" || e.code === "Enter") startHand();
                if (e.key === "ArrowUp" || e.key === "ArrowRight") adjustBet(10);
                if (e.key === "ArrowDown" || e.key === "ArrowLeft") adjustBet(-10);
                if (key === "m") setBet(chips); // Quick key for Max Bet
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [status, playerHand, chips, bet, hit, stand, doubleDown, startHand]);

    const pScore = getHandValue(playerHand);
    const dScore = getHandValue(dealerHand);
    const hideDealerCard = status === "playing";

    return (
        <div
            className="border border-theme p-5 max-w-2xl mx-auto"
            style={{ backgroundColor: "rgb(var(--bg-card, 10, 15, 24))", fontFamily: "var(--font-mono, monospace)" }}
        >
            {/* HUD */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-5 text-[11px] tracking-[0.15em] uppercase">
                    <span className="text-theme-muted">
                        Chips <span style={{ color: "#d4af37" }}>${chips}</span>
                    </span>
                    <span className="text-theme-muted">
                        Bet <span style={{ color: "#d4af37" }}>${bet}</span>
                    </span>
                </div>
                <button
                    onClick={onExit}
                    className="text-[10px] tracking-[0.18em] uppercase text-theme-muted hover:text-theme transition-colors"
                >
                    ← exit
                </button>
            </div>

            {/* Playfield Table */}
            <div
                className="border border-theme p-6 flex flex-col justify-between min-h-[280px]"
                style={{ backgroundColor: "#06090e" }}
            >
                {/* Dealer Area */}
                <div>
                    <div className="flex justify-between items-center text-[10px] tracking-[0.15em] uppercase text-theme-muted mb-2">
                        <span>Dealer Hand</span>
                        <span>
                            Score:{" "}
                            <span style={{ color: "#d4af37" }}>
                                {hideDealerCard && dealerHand.length > 0
                                    ? dealerHand[0].weight
                                    : dealerHand.length > 0
                                    ? dScore
                                    : "0"}
                            </span>
                        </span>
                    </div>
                    <div className="flex gap-2 min-h-[64px]">
                        {dealerHand.map((card, idx) => (
                            <Card key={idx} card={card} hidden={hideDealerCard && idx === 1} />
                        ))}
                    </div>
                </div>

                {/* Center Banner */}
                <div className="text-center my-4">
                    {status === "won" && (
                        <p className="text-sm tracking-[0.2em] uppercase font-bold" style={{ color: "#86c5a0" }}>
                            ◈ Player Wins! (+${bet}) ◈
                        </p>
                    )}
                    {status === "lost" && (
                        <p className="text-sm tracking-[0.2em] uppercase font-bold" style={{ color: "#e0716a" }}>
                            ◈ Dealer Wins ◈
                        </p>
                    )}
                    {status === "push" && (
                        <p className="text-sm tracking-[0.2em] uppercase font-bold" style={{ color: "#d4af37" }}>
                            ◈ Push — Bet Returned ◈
                        </p>
                    )}
                    {status === "blackjack" && (
                        <p className="text-sm tracking-[0.2em] uppercase font-bold" style={{ color: "#d4af37" }}>
                            ◈ Blackjack! (+${Math.floor(bet * 1.5)}) ◈
                        </p>
                    )}
                </div>

                {/* Player Area */}
                <div>
                    <div className="flex justify-between items-center text-[10px] tracking-[0.15em] uppercase text-theme-muted mb-2">
                        <span>Player Hand</span>
                        <span>
                            Score:{" "}
                            <span style={{ color: "#d4af37" }}>
                                {playerHand.length > 0 ? pScore : "0"}
                            </span>
                        </span>
                    </div>
                    <div className="flex gap-2 min-h-[64px]">
                        {playerHand.map((card, idx) => (
                            <Card key={idx} card={card} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Control Area */}
            <div className="mt-5 space-y-3">
                {status === "betting" || status !== "playing" ? (
                    <div className="flex flex-col gap-3">
                        {/* Bet Preset Chips & Adjustment Controls */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-1 flex-wrap">
                                <span className="text-[10px] text-theme-muted uppercase tracking-wider mr-1">Chips:</span>
                                {BET_PRESETS.map((amount) => (
                                    <button
                                        key={amount}
                                        onClick={() => setPresetBet(amount)}
                                        disabled={chips < amount}
                                        className="px-2.5 py-1 text-xs border border-theme text-theme hover:bg-theme-muted transition-colors disabled:opacity-30"
                                        style={{ borderColor: bet === amount ? "#d4af37" : undefined }}
                                    >
                                        ${amount}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setPresetBet(chips)}
                                    disabled={chips <= 0}
                                    className="px-2.5 py-1 text-xs border border-theme transition-colors font-bold uppercase tracking-wider"
                                    style={{ borderColor: "rgba(212,175,55,0.6)", color: "#d4af37" }}
                                >
                                    MAX
                                </button>
                            </div>

                            {/* Adjust +/- Buttons */}
                            <div className="flex gap-1">
                                <button
                                    onClick={() => adjustBet(-10)}
                                    className="px-2.5 py-1 text-xs border border-theme text-theme hover:bg-theme-muted transition-colors"
                                >
                                    -$10
                                </button>
                                <button
                                    onClick={() => adjustBet(10)}
                                    className="px-2.5 py-1 text-xs border border-theme text-theme hover:bg-theme-muted transition-colors"
                                >
                                    +$10
                                </button>
                            </div>
                        </div>

                        {/* Deal Button */}
                        <button
                            onClick={startHand}
                            disabled={chips < bet || bet <= 0}
                            className="w-full py-2.5 text-xs border transition-colors font-bold uppercase tracking-[0.2em] flex justify-center items-center gap-2"
                            style={{
                                borderColor: "rgba(212,175,55,0.5)",
                                color: chips < bet || bet <= 0 ? "gray" : "rgb(212,175,55)",
                            }}
                        >
                            Deal Hand <span className="text-[10px] opacity-60 font-normal">[SPACE / ENTER]</span>
                        </button>
                    </div>
                ) : (
                    /* Playing Controls */
                    <div className="flex gap-2">
                        <button
                            onClick={hit}
                            className="flex-1 py-2 text-xs border border-theme text-theme hover:bg-theme-muted transition-colors uppercase tracking-[0.1em] flex justify-center items-center gap-1.5"
                        >
                            Hit <span className="text-[10px] opacity-60">[H]</span>
                        </button>
                        <button
                            onClick={stand}
                            className="flex-1 py-2 text-xs border transition-colors uppercase tracking-[0.1em] flex justify-center items-center gap-1.5"
                            style={{ borderColor: "rgba(212,175,55,0.5)", color: "rgb(212,175,55)" }}
                        >
                            Stand <span className="text-[10px] opacity-60">[S]</span>
                        </button>
                        {playerHand.length === 2 && chips >= bet && (
                            <button
                                onClick={doubleDown}
                                className="flex-1 py-2 text-xs border border-theme text-theme hover:bg-theme-muted transition-colors uppercase tracking-[0.1em] flex justify-center items-center gap-1.5"
                            >
                                Double <span className="text-[10px] opacity-60">[D]</span>
                            </button>
                        )}
                    </div>
                )}

                {/* Keyboard Controls Guide */}
                <div className="text-[10px] tracking-[0.12em] text-theme-muted opacity-60 text-center">
                    {status === "playing"
                        ? "Press H to Hit • S to Stand • D to Double"
                        : "Press Space/Enter to Deal • Up/Down arrows to adjust bet • M for Max"}
                </div>
            </div>
        </div>
    );
}