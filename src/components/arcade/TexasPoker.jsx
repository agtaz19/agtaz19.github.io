import React, { useState, useEffect, useCallback } from "react";

const SUITS = ["♠", "♥", "♦", "♣"];
const VALUES = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const RANK_MAP = {
    "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9,
    "10": 10, "J": 11, "Q": 12, "K": 13, "A": 14
};
const BET_PRESETS = [20, 50, 100, 250, 500];

const BOT_NAME_POOL = [
    "Nash", "Markov", "Thorp", "Shannon", "Kelly",
    "Vesper", "Sloan", "Cipher", "Maverick", "Solomon",
    "Gauss", "Laplace", "Wiener", "Gatsby", "Sterling"
];

function getRandomBotNames(count = 3) {
    const shuffled = [...BOT_NAME_POOL].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

// --- DECK & SHUFFLING ---
function createDeck() {
    const deck = [];
    for (const suit of SUITS) {
        for (const value of VALUES) {
            deck.push({ suit, value, rank: RANK_MAP[value] });
        }
    }
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// --- 7-CARD HAND EVALUATOR ---
function getCombinations(arr, k) {
    const results = [];
    function combine(start, combo) {
        if (combo.length === k) {
            results.push([...combo]);
            return;
        }
        for (let i = start; i < arr.length; i++) {
            combo.push(arr[i]);
            combine(i + 1, combo);
            combo.pop();
        }
    }
    combine(0, []);
    return results;
}

function evaluateFiveCardHand(cards) {
    const sorted = [...cards].sort((a, b) => b.rank - a.rank);
    const ranks = sorted.map((c) => c.rank);
    const suits = sorted.map((c) => c.suit);

    const isFlush = suits.every((s) => s === suits[0]);

    let isStraight = false;
    let straightHigh = 0;
    const uniqueRanks = Array.from(new Set(ranks));
    if (uniqueRanks.length === 5) {
        if (uniqueRanks[0] - uniqueRanks[4] === 4) {
            isStraight = true;
            straightHigh = uniqueRanks[0];
        } else if (
            uniqueRanks[0] === 14 &&
            uniqueRanks[1] === 5 &&
            uniqueRanks[2] === 4 &&
            uniqueRanks[3] === 3 &&
            uniqueRanks[4] === 2
        ) {
            isStraight = true;
            straightHigh = 5;
        }
    }

    const counts = {};
    for (const r of ranks) {
        counts[r] = (counts[r] || 0) + 1;
    }
    const countPairs = Object.entries(counts)
        .map(([rank, count]) => ({ rank: Number(rank), count }))
        .sort((a, b) => b.count - a.count || b.rank - a.rank);

    if (isFlush && isStraight) {
        return {
            score: 8,
            name: straightHigh === 14 ? "Royal Flush" : "Straight Flush",
            tiebreakers: [straightHigh],
        };
    }
    if (countPairs[0].count === 4) {
        return {
            score: 7,
            name: "Four of a Kind",
            tiebreakers: [countPairs[0].rank, countPairs[1].rank],
        };
    }
    if (countPairs[0].count === 3 && countPairs[1].count === 2) {
        return {
            score: 6,
            name: "Full House",
            tiebreakers: [countPairs[0].rank, countPairs[1].rank],
        };
    }
    if (isFlush) {
        return { score: 5, name: "Flush", tiebreakers: ranks };
    }
    if (isStraight) {
        return { score: 4, name: "Straight", tiebreakers: [straightHigh] };
    }
    if (countPairs[0].count === 3) {
        return {
            score: 3,
            name: "Three of a Kind",
            tiebreakers: [countPairs[0].rank, countPairs[1].rank, countPairs[2].rank],
        };
    }
    if (countPairs[0].count === 2 && countPairs[1].count === 2) {
        return {
            score: 2,
            name: "Two Pair",
            tiebreakers: [countPairs[0].rank, countPairs[1].rank, countPairs[2].rank],
        };
    }
    if (countPairs[0].count === 2) {
        return {
            score: 1,
            name: "Pair",
            tiebreakers: [
                countPairs[0].rank,
                countPairs[1].rank,
                countPairs[2].rank,
                countPairs[3].rank,
            ],
        };
    }
    return { score: 0, name: "High Card", tiebreakers: ranks };
}

function getBestHand(cards) {
    if (cards.length < 5) return { score: -1, name: "", tiebreakers: [] };
    const combos = getCombinations(cards, 5);
    let best = null;

    for (const combo of combos) {
        const evalHand = evaluateFiveCardHand(combo);
        if (!best || compareHands(evalHand, best) > 0) {
            best = evalHand;
        }
    }
    return best;
}

function compareHands(handA, handB) {
    if (handA.score !== handB.score) {
        return handA.score - handB.score;
    }
    for (let i = 0; i < handA.tiebreakers.length; i++) {
        if (handA.tiebreakers[i] !== handB.tiebreakers[i]) {
            return handA.tiebreakers[i] - handB.tiebreakers[i];
        }
    }
    return 0;
}

// --- CARD COMPONENT ---
function Card({ card, hidden }) {
    if (hidden || !card) {
        return (
            <div
                className="w-11 h-15 border flex items-center justify-center text-xs select-none"
                style={{
                    backgroundColor: "#131822",
                    borderColor: "rgba(212,175,55,0.4)",
                    color: "#d4af37",
                }}
            >
                *
            </div>
        );
    }

    const isRed = card.suit === "♥" || card.suit === "♦";
    return (
        <div
            className="w-11 h-15 border flex flex-col justify-between p-1 text-xs select-none"
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

// --- PLAYER SEAT COMPONENT ---
function PlayerSeat({ player, isTurn, hideCards, roleLabel, evalHand }) {
    return (
        <div
            className="border p-2.5 flex flex-col justify-between transition-colors relative"
            style={{
                backgroundColor: isTurn ? "rgba(212,175,55,0.08)" : "#090d14",
                borderColor: isTurn ? "#d4af37" : "rgba(255,255,255,0.1)",
                minWidth: "135px",
                opacity: player.folded ? 0.45 : 1,
            }}
        >
            <div className="flex items-center justify-between text-[10px] tracking-[0.1em] uppercase mb-1.5">
                <span className="font-bold truncate" style={{ color: player.isHuman ? "#86c5a0" : "#e5e7eb" }}>
                    {player.name} {roleLabel && <span style={{ color: "#d4af37" }}>[{roleLabel}]</span>}
                </span>
                <span style={{ color: "#d4af37" }}>${player.chips}</span>
            </div>

            <div className="flex gap-1.5 justify-center my-1">
                {player.hand.map((card, idx) => (
                    <Card key={idx} card={card} hidden={hideCards && !player.isHuman} />
                ))}
            </div>

            <div className="flex items-center justify-between text-[9px] tracking-[0.1em] uppercase mt-1 text-theme-muted">
                <span>{player.folded ? "FOLDED" : player.status || "WAITING"}</span>
                <span>
                    {player.currentBet > 0 && (
                        <span style={{ color: "#d4af37" }}>${player.currentBet}</span>
                    )}
                </span>
            </div>

            {!hideCards && !player.folded && evalHand && (
                <div className="text-[9px] text-center mt-1 uppercase tracking-wider" style={{ color: "#86c5a0" }}>
                    {evalHand.name}
                </div>
            )}
        </div>
    );
}

// --- MAIN COMPONENT ---
export default function TexasHoldem({ onExit }) {
    const [deck, setDeck] = useState([]);
    const [communityCards, setCommunityCards] = useState([]);
    const [phase, setPhase] = useState("betting"); // betting | preflop | flop | turn | river | showdown
    const [pot, setPot] = useState(0);
    const [tableBet, setTableBet] = useState(20);
    const [bigBlindAmount, setBigBlindAmount] = useState(20);
    const [raiseAmount, setRaiseAmount] = useState(20);
    const [dealerIdx, setDealerIdx] = useState(0);
    const [turnIdx, setTurnIdx] = useState(0);
    const [statusMessage, setStatusMessage] = useState("Configure Big Blind & Deal to begin.");

    const [players, setPlayers] = useState(() => {
        const botNames = getRandomBotNames(3);
        return [
            { id: 0, name: "You", chips: 1000, currentBet: 0, hand: [], folded: false, isHuman: true, status: "" },
            { id: 1, name: botNames[0], chips: 1000, currentBet: 0, hand: [], folded: false, isHuman: false, status: "" },
            { id: 2, name: botNames[1], chips: 1000, currentBet: 0, hand: [], folded: false, isHuman: false, status: "" },
            { id: 3, name: botNames[2], chips: 1000, currentBet: 0, hand: [], folded: false, isHuman: false, status: "" },
        ];
    });

    const humanToCall = Math.max(0, tableBet - players[0].currentBet);
    const maxHumanRaise = Math.max(bigBlindAmount, players[0].chips - humanToCall);

    // Keep raiseAmount bounded within valid limits
    useEffect(() => {
        setRaiseAmount((prev) => Math.min(maxHumanRaise, Math.max(bigBlindAmount, prev)));
    }, [bigBlindAmount, maxHumanRaise]);

    // Advance to Next Round or Showdown
    const advanceRound = useCallback(
        (currentDeck, currentCommunity, currentPlayers) => {
            const remaining = currentPlayers.filter((p) => !p.folded);
            if (remaining.length === 1) {
                const winner = remaining[0];
                setPlayers((prev) =>
                    prev.map((p) =>
                        p.id === winner.id ? { ...p, chips: p.chips + pot, status: "WINNER" } : p
                    )
                );
                setPhase("showdown");
                setStatusMessage(`${winner.name} wins $${pot} (All opponents folded).`);
                return;
            }

            const resetPlayers = currentPlayers.map((p) => ({
                ...p,
                currentBet: 0,
                status: p.folded ? "FOLDED" : "",
            }));
            setTableBet(0);
            setRaiseAmount(bigBlindAmount);

            if (phase === "preflop") {
                const nextDeck = [...currentDeck];
                const flop = [nextDeck.pop(), nextDeck.pop(), nextDeck.pop()];
                setCommunityCards(flop);
                setDeck(nextDeck);
                setPlayers(resetPlayers);
                setPhase("flop");
                setTurnIdx((dealerIdx + 1) % 4);
                setStatusMessage("Flop dealt — Action begins.");
            } else if (phase === "flop") {
                const nextDeck = [...currentDeck];
                const turnCard = nextDeck.pop();
                const nextCommunity = [...currentCommunity, turnCard];
                setCommunityCards(nextCommunity);
                setDeck(nextDeck);
                setPlayers(resetPlayers);
                setPhase("turn");
                setTurnIdx((dealerIdx + 1) % 4);
                setStatusMessage("Turn card dealt.");
            } else if (phase === "turn") {
                const nextDeck = [...currentDeck];
                const riverCard = nextDeck.pop();
                const nextCommunity = [...currentCommunity, riverCard];
                setCommunityCards(nextCommunity);
                setDeck(nextDeck);
                setPlayers(resetPlayers);
                setPhase("river");
                setTurnIdx((dealerIdx + 1) % 4);
                setStatusMessage("River card dealt.");
            } else if (phase === "river") {
                let bestHand = null;
                let winners = [];

                remaining.forEach((player) => {
                    const evalHand = getBestHand([...player.hand, ...currentCommunity]);
                    if (!bestHand || compareHands(evalHand, bestHand) > 0) {
                        bestHand = evalHand;
                        winners = [player];
                    } else if (compareHands(evalHand, bestHand) === 0) {
                        winners.push(player);
                    }
                });

                const splitAmount = Math.floor(pot / winners.length);
                const winnerIds = new Set(winners.map((w) => w.id));

                setPlayers((prev) =>
                    prev.map((p) => {
                        if (winnerIds.has(p.id)) {
                            return { ...p, chips: p.chips + splitAmount, status: "WINNER" };
                        }
                        return p;
                    })
                );

                setPhase("showdown");
                if (winners.length === 1) {
                    setStatusMessage(`${winners[0].name} wins $${pot} with ${bestHand.name}!`);
                } else {
                    setStatusMessage(`Split pot ($${splitAmount} ea) with ${bestHand.name}!`);
                }
            }
        },
        [phase, pot, dealerIdx, bigBlindAmount]
    );

    // Turn transition helper
    const nextTurn = useCallback(
        (nextPlayers, nextPot, nextTableBet) => {
            const active = nextPlayers.filter((p) => !p.folded);
            if (active.length <= 1) {
                advanceRound(deck, communityCards, nextPlayers);
                return;
            }

            const allMatched = active.every((p) => p.currentBet === nextTableBet && p.status !== "");
            if (allMatched) {
                advanceRound(deck, communityCards, nextPlayers);
                return;
            }

            let nextIdx = (turnIdx + 1) % 4;
            while (nextPlayers[nextIdx].folded) {
                nextIdx = (nextIdx + 1) % 4;
            }
            setTurnIdx(nextIdx);
        },
        [turnIdx, deck, communityCards, advanceRound]
    );

    // --- PLAYER ACTIONS ---
    const handleAction = useCallback(
        (actionType, customRaiseAmount = raiseAmount) => {
            if (phase === "showdown" || phase === "betting") return;

            setPlayers((prev) => {
                const updated = [...prev];
                const current = { ...updated[turnIdx] };
                let addedPot = 0;
                let newTableBet = tableBet;

                if (actionType === "fold") {
                    current.folded = true;
                    current.status = "FOLDED";
                } else if (actionType === "call") {
                    const callAmount = Math.min(current.chips, tableBet - current.currentBet);
                    current.chips -= callAmount;
                    current.currentBet += callAmount;
                    addedPot += callAmount;
                    current.status = callAmount === 0 ? "CHECK" : "CALL";
                } else if (actionType === "raise") {
                    const totalBet = tableBet + customRaiseAmount;
                    const addAmount = Math.min(current.chips, totalBet - current.currentBet);
                    current.chips -= addAmount;
                    current.currentBet += addAmount;
                    addedPot += addAmount;
                    newTableBet = current.currentBet;
                    current.status = `RAISE $${current.currentBet}`;
                    setTableBet(newTableBet);
                }

                updated[turnIdx] = current;
                const newPot = pot + addedPot;
                setPot(newPot);

                setTimeout(() => {
                    nextTurn(updated, newPot, newTableBet);
                }, 0);

                return updated;
            });
        },
        [phase, turnIdx, tableBet, pot, raiseAmount, nextTurn]
    );

    // --- AI AUTO-PLAY TURN LOGIC ---
    useEffect(() => {
        if (phase === "betting" || phase === "showdown") return;

        const current = players[turnIdx];
        if (current.isHuman || current.folded) return;

        const timer = setTimeout(() => {
            const toCall = tableBet - current.currentBet;
            const holeCards = current.hand;
            const fullHand = getBestHand([...holeCards, ...communityCards]);

            const isPair = holeCards[0]?.rank === holeCards[1]?.rank;
            const isSuited = holeCards[0]?.suit === holeCards[1]?.suit;
            const highRank = Math.max(holeCards[0]?.rank || 0, holeCards[1]?.rank || 0);
            const isStrongPreflop = isPair || (highRank >= 11 && isSuited) || highRank >= 13;

            if (toCall === 0) {
                if (
                    (isStrongPreflop || fullHand.score >= 1) &&
                    Math.random() < 0.3 &&
                    current.chips >= bigBlindAmount
                ) {
                    handleAction("raise", bigBlindAmount);
                } else {
                    handleAction("call");
                }
            } else {
                const potOddsPressure = toCall / Math.max(1, pot + toCall);

                if (fullHand.score >= 2 || (isStrongPreflop && toCall <= bigBlindAmount * 3)) {
                    if (Math.random() < 0.25 && current.chips >= bigBlindAmount * 2) {
                        handleAction("raise", bigBlindAmount);
                    } else {
                        handleAction("call");
                    }
                } else if (toCall <= bigBlindAmount && Math.random() < 0.65) {
                    handleAction("call");
                } else if (potOddsPressure > 0.35 || toCall > bigBlindAmount * 2) {
                    if (Math.random() < 0.8) {
                        handleAction("fold");
                    } else {
                        handleAction("call");
                    }
                } else {
                    if (Math.random() < 0.5) {
                        handleAction("fold");
                    } else {
                        handleAction("call");
                    }
                }
            }
        }, 650);

        return () => clearTimeout(timer);
    }, [turnIdx, phase, players, tableBet, pot, bigBlindAmount, communityCards, handleAction]);

    // --- START HAND ---
    const startHand = useCallback(() => {
        const sbAmount = Math.max(5, Math.floor(bigBlindAmount / 2));
        const bbAmount = bigBlindAmount;

        const nextDealerIdx = (dealerIdx + 1) % 4;
        const sbIdx = (nextDealerIdx + 1) % 4;
        const bbIdx = (nextDealerIdx + 2) % 4;
        const utgIdx = (nextDealerIdx + 3) % 4;

        const newDeck = createDeck();
        let currentPot = 0;

        const updatedPlayers = players.map((p, idx) => {
            if (p.chips <= 0) {
                return { ...p, hand: [], folded: true, currentBet: 0, status: "SIT OUT" };
            }

            const hand = [newDeck.pop(), newDeck.pop()];
            let bet = 0;
            let status = "";

            if (idx === sbIdx) {
                bet = Math.min(p.chips, sbAmount);
                status = `SB ($${bet})`;
            } else if (idx === bbIdx) {
                bet = Math.min(p.chips, bbAmount);
                status = `BB ($${bet})`;
            }

            currentPot += bet;
            return {
                ...p,
                hand,
                chips: p.chips - bet,
                currentBet: bet,
                folded: false,
                status,
            };
        });

        setDealerIdx(nextDealerIdx);
        setDeck(newDeck);
        setCommunityCards([]);
        setPot(currentPot);
        setTableBet(bbAmount);
        setRaiseAmount(bbAmount);
        setPlayers(updatedPlayers);
        setTurnIdx(utgIdx);
        setPhase("preflop");
        setStatusMessage("Preflop — Blinds posted. Action on UTG.");
    }, [bigBlindAmount, dealerIdx, players]);

    // Keyboard controls for human player
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
                e.preventDefault();
            }
            const key = e.key.toLowerCase();

            if (phase === "betting") {
                if (e.code === "Space" || e.code === "Enter") startHand();
                if (e.key === "ArrowUp" || e.key === "ArrowRight") {
                    setBigBlindAmount((b) => Math.min(500, b + 10));
                }
                if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
                    setBigBlindAmount((b) => Math.max(10, b - 10));
                }
            } else if (phase !== "showdown") {
                const human = players[0];
                if (turnIdx === 0 && !human.folded) {
                    if (key === "c" || e.code === "Space") handleAction("call");
                    if (key === "r" && human.chips >= humanToCall + bigBlindAmount) {
                        handleAction("raise", raiseAmount);
                    }
                    if (key === "f") handleAction("fold");
                    if (e.key === "ArrowUp" || e.key === "ArrowRight") {
                        setRaiseAmount((r) => Math.min(maxHumanRaise, r + bigBlindAmount));
                    }
                    if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
                        setRaiseAmount((r) => Math.max(bigBlindAmount, r - bigBlindAmount));
                    }
                }
            } else {
                if (e.code === "Space" || e.code === "Enter") setPhase("betting");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [phase, turnIdx, players, bigBlindAmount, raiseAmount, humanToCall, maxHumanRaise, startHand, handleAction]);

    const getRoleLabel = (idx) => {
        const sbIdx = (dealerIdx + 1) % 4;
        const bbIdx = (dealerIdx + 2) % 4;
        if (idx === dealerIdx && idx === sbIdx) return "D/SB";
        if (idx === dealerIdx) return "D";
        if (idx === sbIdx) return "SB";
        if (idx === bbIdx) return "BB";
        return "";
    };

    const hideOpponentCards = phase !== "showdown";
    const isHumanTurn = phase !== "betting" && phase !== "showdown" && turnIdx === 0 && !players[0].folded;

    return (
        <div
            className="border border-theme p-5 max-w-3xl mx-auto"
            style={{ backgroundColor: "rgb(var(--bg-card, 10, 15, 24))", fontFamily: "var(--font-mono, monospace)" }}
        >
            {/* HUD BAR */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-5 text-[11px] tracking-[0.15em] uppercase">
                    <span className="text-theme-muted">
                        Pot <span style={{ color: "#d4af37" }}>${pot}</span>
                    </span>
                    <span className="text-theme-muted">
                        Blinds <span style={{ color: "#d4af37" }}>${Math.floor(bigBlindAmount / 2)}/${bigBlindAmount}</span>
                    </span>
                    <span className="text-theme-muted">
                        Table Bet <span style={{ color: "#d4af37" }}>${tableBet}</span>
                    </span>
                </div>
                <button
                    onClick={onExit}
                    className="text-[10px] tracking-[0.18em] uppercase text-theme-muted hover:text-theme transition-colors"
                >
                    ← exit
                </button>
            </div>

            {/* PLAYFIELD TABLE */}
            <div
                className="border border-theme p-5 flex flex-col justify-between min-h-[390px]"
                style={{ backgroundColor: "#06090e" }}
            >
                {/* OPPONENTS AREA */}
                <div className="grid grid-cols-3 gap-2">
                    {players.slice(1).map((bot, idx) => {
                        const actualIdx = idx + 1;
                        const evalHand = getBestHand([...bot.hand, ...communityCards]);
                        return (
                            <PlayerSeat
                                key={bot.id}
                                player={bot}
                                isTurn={turnIdx === actualIdx && phase !== "showdown"}
                                hideCards={hideOpponentCards}
                                roleLabel={getRoleLabel(actualIdx)}
                                evalHand={evalHand}
                            />
                        );
                    })}
                </div>

                {/* COMMUNITY BOARD & POT BANNER */}
                <div className="text-center my-4">
                    <div className="text-[10px] tracking-[0.2em] uppercase text-theme-muted mb-1.5">
                        ◈ Community Board ◈
                    </div>
                    <div className="flex justify-center gap-2 min-h-[60px] mb-2">
                        {Array.from({ length: 5 }).map((_, idx) => (
                            <Card key={idx} card={communityCards[idx]} hidden={!communityCards[idx]} />
                        ))}
                    </div>
                    <p
                        className="text-xs tracking-[0.15em] uppercase font-bold"
                        style={{
                            color:
                                phase === "showdown" && players[0].status === "WINNER"
                                    ? "#86c5a0"
                                    : phase === "showdown"
                                    ? "#e0716a"
                                    : "#d4af37",
                        }}
                    >
                        {statusMessage}
                    </p>
                </div>

                {/* HUMAN PLAYER AREA */}
                <div className="max-w-[220px] mx-auto w-full">
                    <PlayerSeat
                        player={players[0]}
                        isTurn={turnIdx === 0 && phase !== "showdown"}
                        hideCards={false}
                        roleLabel={getRoleLabel(0)}
                        evalHand={getBestHand([...players[0].hand, ...communityCards])}
                    />
                </div>
            </div>

            {/* CONTROL AREA */}
            <div className="mt-5 space-y-3">
                {phase === "betting" ? (
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-[10px] text-theme-muted uppercase tracking-wider mr-1">
                                    Big Blind:
                                </span>
                                {BET_PRESETS.map((amount) => (
                                    <button
                                        key={amount}
                                        onClick={() => setBigBlindAmount(amount)}
                                        className="px-2.5 py-1 text-xs border border-theme text-theme hover:bg-theme-muted transition-colors"
                                        style={{ borderColor: bigBlindAmount === amount ? "#d4af37" : undefined }}
                                    >
                                        ${amount}
                                    </button>
                                ))}
                            </div>
                            <div className="flex gap-1">
                                <button
                                    onClick={() => setBigBlindAmount((b) => Math.max(10, b - 10))}
                                    className="px-2.5 py-1 text-xs border border-theme text-theme hover:bg-theme-muted transition-colors"
                                >
                                    -$10
                                </button>
                                <button
                                    onClick={() => setBigBlindAmount((b) => Math.min(500, b + 10))}
                                    className="px-2.5 py-1 text-xs border border-theme text-theme hover:bg-theme-muted transition-colors"
                                >
                                    +$10
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={startHand}
                            disabled={players[0].chips < bigBlindAmount}
                            className="w-full py-2.5 text-xs border transition-colors font-bold uppercase tracking-[0.2em] flex justify-center items-center gap-2"
                            style={{
                                borderColor: "rgba(212,175,55,0.5)",
                                color: players[0].chips < bigBlindAmount ? "gray" : "rgb(212,175,55)",
                            }}
                        >
                            Deal Hand <span className="text-[10px] opacity-60 font-normal">[SPACE / ENTER]</span>
                        </button>
                    </div>
                ) : phase === "showdown" ? (
                    <button
                        onClick={() => setPhase("betting")}
                        className="w-full py-2.5 text-xs border transition-colors font-bold uppercase tracking-[0.2em] flex justify-center items-center gap-2"
                        style={{ borderColor: "rgba(212,175,55,0.5)", color: "rgb(212,175,55)" }}
                    >
                        Next Hand <span className="text-[10px] opacity-60 font-normal">[SPACE / ENTER]</span>
                    </button>
                ) : (
                    <div className="space-y-2">
                        {/* RAISE CONTROL BAR */}
                        {isHumanTurn && (
                            <div className="border border-theme p-2.5 bg-black/40 flex flex-col gap-2">
                                <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-theme-muted">
                                    <span>
                                        Raise Size: <strong style={{ color: "#d4af37" }}>+${raiseAmount}</strong>
                                    </span>
                                    <span>
                                        Total Bet: <strong style={{ color: "#d4af37" }}>${tableBet + raiseAmount}</strong>
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="range"
                                        min={bigBlindAmount}
                                        max={maxHumanRaise}
                                        step={10}
                                        value={raiseAmount}
                                        onChange={(e) => setRaiseAmount(Number(e.target.value))}
                                        className="w-full accent-[#d4af37] h-1 bg-gray-700 rounded-lg cursor-pointer"
                                    />
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-1 text-[10px]">
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => setRaiseAmount(bigBlindAmount)}
                                            className="px-2 py-0.5 border border-theme text-theme hover:bg-theme-muted transition-colors"
                                        >
                                            Min
                                        </button>
                                        <button
                                            onClick={() => setRaiseAmount(Math.min(maxHumanRaise, bigBlindAmount * 2))}
                                            className="px-2 py-0.5 border border-theme text-theme hover:bg-theme-muted transition-colors"
                                        >
                                            2x BB
                                        </button>
                                        <button
                                            onClick={() => setRaiseAmount(Math.min(maxHumanRaise, Math.max(bigBlindAmount, pot)))}
                                            className="px-2 py-0.5 border border-theme text-theme hover:bg-theme-muted transition-colors"
                                        >
                                            Pot
                                        </button>
                                        <button
                                            onClick={() => setRaiseAmount(maxHumanRaise)}
                                            className="px-2 py-0.5 border border-theme text-theme hover:bg-theme-muted transition-colors"
                                        >
                                            All-in
                                        </button>
                                    </div>

                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => setRaiseAmount((r) => Math.max(bigBlindAmount, r - 10))}
                                            className="px-2 py-0.5 border border-theme text-theme hover:bg-theme-muted transition-colors"
                                        >
                                            -$10
                                        </button>
                                        <button
                                            onClick={() => setRaiseAmount((r) => Math.min(maxHumanRaise, r + 10))}
                                            className="px-2 py-0.5 border border-theme text-theme hover:bg-theme-muted transition-colors"
                                        >
                                            +$10
                                        </button>
                                        <button
                                            onClick={() => setRaiseAmount((r) => Math.min(maxHumanRaise, r + 50))}
                                            className="px-2 py-0.5 border border-theme text-theme hover:bg-theme-muted transition-colors"
                                        >
                                            +$50
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ACTION BUTTONS */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleAction("call")}
                                disabled={!isHumanTurn}
                                className="flex-1 py-2 text-xs border border-theme text-theme hover:bg-theme-muted transition-colors uppercase tracking-[0.1em] flex justify-center items-center gap-1.5 disabled:opacity-30"
                            >
                                {humanToCall === 0 ? "Check" : `Call ($${humanToCall})`}{" "}
                                <span className="text-[10px] opacity-60">[C / SPACE]</span>
                            </button>
                            <button
                                onClick={() => handleAction("raise", raiseAmount)}
                                disabled={!isHumanTurn || players[0].chips < humanToCall + bigBlindAmount}
                                className="flex-1 py-2 text-xs border transition-colors uppercase tracking-[0.1em] flex justify-center items-center gap-1.5 disabled:opacity-30"
                                style={{ borderColor: "rgba(212,175,55,0.5)", color: "rgb(212,175,55)" }}
                            >
                                Raise (+${raiseAmount}) <span className="text-[10px] opacity-60">[R]</span>
                            </button>
                            <button
                                onClick={() => handleAction("fold")}
                                disabled={!isHumanTurn}
                                className="flex-1 py-2 text-xs border border-theme text-theme hover:bg-theme-muted transition-colors uppercase tracking-[0.1em] flex justify-center items-center gap-1.5 disabled:opacity-30"
                                style={{ borderColor: "rgba(224,113,106,0.5)", color: "#e0716a" }}
                            >
                                Fold <span className="text-[10px] opacity-60">[F]</span>
                            </button>
                        </div>
                    </div>
                )}

                <div className="text-[10px] tracking-[0.12em] text-theme-muted opacity-60 text-center">
                    {phase === "betting"
                        ? "Press Space/Enter to Deal • Up/Down arrows to adjust blind bet"
                        : phase === "showdown"
                        ? "Press Space/Enter to play next hand"
                        : "Press C or Space to Check/Call • R to Raise • F to Fold • Up/Down arrows to adjust raise"}
                </div>
            </div>
        </div>
    );
}