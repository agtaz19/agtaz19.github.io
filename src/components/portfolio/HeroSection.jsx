import React, { useState, useEffect, useCallback } from "react";
import LiveClock from "@/components/portfolio/LiveClock";

// ── Hero background
import HERO_BACKGROUND from "@/assets/stock_photos/Home_Nyc_Skyline.jpg";

const ROTATING_WORDS = [
    "Alexandre Tilly.",
    "an analyst.",
    "a strategist.",
    "a quant.",
    "an advisor.",
    "an architect.",
    "a researcher.",
    "an engineer.",
];

function useTypewriter(words, typingSpeed = 80, deletingSpeed = 45, pauseDuration = 1800) {
    const [displayed, setDisplayed] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [phase, setPhase] = useState("typing");

    useEffect(() => {
        const word = words[wordIndex % words.length];

        if (phase === "typing") {
            if (displayed.length < word.length) {
                const t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), typingSpeed);
                return () => clearTimeout(t);
            } else {
                const t = setTimeout(() => setPhase("pausing"), pauseDuration);
                return () => clearTimeout(t);
            }
        }

        if (phase === "pausing") {
            const t = setTimeout(() => setPhase("deleting"), 300);
            return () => clearTimeout(t);
        }

        if (phase === "deleting") {
            if (displayed.length > 0) {
                const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), deletingSpeed);
                return () => clearTimeout(t);
            } else {
                setWordIndex(i => (i + 1) % words.length);
                setPhase("typing");
            }
        }
    }, [displayed, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

    return displayed;
}

// ══════════════════════════════════════════════════════════════════════════
// ── Market data: live (free, no-key) with automatic simulated fallback ──
// ══════════════════════════════════════════════════════════════════════════

function isNyseOpenNow() {
    const nyString = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
    const ny = new Date(nyString);
    const day = ny.getDay();
    if (day === 0 || day === 6) return false;
    const minutesNow = ny.getHours() * 60 + ny.getMinutes();
    return minutesNow >= 9 * 60 + 30 && minutesNow < 16 * 60;
}

const TICKER_SEED = {
    QQQ: { label: "QQQ", group: "index", price: 458.20, changePct: 0.72 },
    DIA: { label: "DIA", group: "index", price: 389.50, changePct: 0.15 },
    IWM: { label: "IWM", group: "index", price: 205.30, changePct: -0.80 },
    VIX: { label: "VIX", group: "index", price: 13.45, changePct: -2.10 },
    AAPL: { label: "AAPL", group: "equity", price: 192.15, changePct: 1.25 },
    MSFT: { label: "MSFT", group: "equity", price: 415.80, changePct: 0.95 },
    TSLA: { label: "TSLA", group: "equity", price: 178.40, changePct: -1.50 },
    LLY: { label: "LLY", group: "equity", price: 780.20, changePct: 0.50 },

    US10Y: { label: "US10Y", group: "yield", price: 4.21, changePct: -0.05 },
    US02Y: { label: "US02Y", group: "yield", price: 4.65, changePct: -0.02 },
    US03M: { label: "US03M", group: "yield", price: 5.30, changePct: 0.01 },
    US05Y: { label: "US05Y", group: "yield", price: 4.05, changePct: -0.02 },
    US30Y: { label: "US30Y", group: "yield", price: 4.45, changePct: 0.03 },
    DXY: { label: "DXY", group: "index", price: 104.20, changePct: 0.10 },
    "EUR/USD": { label: "EUR/USD", group: "fx", price: 1.084, changePct: 0.12 },
    "GBP/USD": { label: "GBP/USD", group: "fx", price: 1.265, changePct: -0.25 },
    "USD/JPY": { label: "USD/JPY", group: "fx", price: 155.30, changePct: 0.40 },
    XAU: { label: "XAU", group: "commodity", price: 2340.50, changePct: 1.10 },
    XAG: { label: "XAG", group: "commodity", price: 28.15, changePct: 1.85 },
    WTI: { label: "WTI", group: "commodity", price: 82.30, changePct: -0.40 },
    V: { label: "V", group: "equity", price: 275.10, changePct: 0.30 },

    NVDA: { label: "NVDA", group: "equity", price: 128.50, changePct: 2.10 },
    AMZN: { label: "AMZN", group: "equity", price: 186.20, changePct: 0.85 },
    GOOGL: { label: "GOOGL", group: "equity", price: 177.40, changePct: -0.40 },
    SPY: { label: "SPY", group: "equity", price: 545.72, changePct: 1.15 },
    JPM: { label: "JPM", group: "equity", price: 206.10, changePct: 0.30 },
    GLD: { label: "GLD", group: "etf", price: 216.40, changePct: 0.65 },
    TLT: { label: "TLT", group: "etf", price: 93.20, changePct: -0.15 },
    AMD: { label: "AMD", group: "equity", price: 156.80, changePct: -1.20 },
    AVGO: { label: "AVGO", group: "equity", price: 1350.40, changePct: 1.20 },
    UNH: { label: "UNH", group: "equity", price: 510.60, changePct: -0.20 },
    PUTCALL: { label: "PUT/CALL", group: "macro", price: 0.82, changePct: -1.20 },
    ADLINE: { label: "A/D LINE", group: "macro", price: 14250, changePct: 0.85 },
    ABOVE200: { label: ">200 DMA", group: "macro", price: 62.4, changePct: 1.20 },
    HYSPREAD: { label: "HY SPREAD", group: "macro", price: 3.45, changePct: -0.12 },
    CAPE: { label: "CAPE RATIO", group: "macro", price: 34.2, changePct: 0.15 },
};

const ASSET_NAMES = {
    QQQ: "Invesco QQQ (Nasdaq-100)",
    DIA: "SPDR Dow Jones ETF",
    IWM: "iShares Russell 2000",
    VIX: "CBOE Volatility Index",
    AAPL: "Apple Inc.",
    MSFT: "Microsoft Corp.",
    TSLA: "Tesla Inc.",
    US10Y: "US 10-Year Treasury Yield",
    US02Y: "US 2-Year Treasury Yield",
    US03M: "US 3-Month Treasury Yield",
    US05Y: "US 5-Year Treasury Yield",
    US30Y: "US 30-Year Treasury Yield",
    DXY: "US Dollar Index",
    "EUR/USD": "Euro / US Dollar",
    "GBP/USD": "British Pound / US Dollar",
    "USD/JPY": "US Dollar / Japanese Yen",
    XAU: "Gold Spot",
    XAG: "Silver Spot",
    WTI: "WTI Crude Oil",
    NVDA: "NVIDIA Corp.",
    AMZN: "Amazon.com Inc.",
    GOOGL: "Alphabet Inc.",
    SPY: "SPDR S&P 500 ETF Trust(S&P 500)",
    JPM: "JPMorgan Chase & Co.",
    GLD: "SPDR Gold Shares",
    TLT: "iShares 20+ Year Treasury Bond",
    AMD: "Advanced Micro Devices",
    LLY: "Eli Lilly and Co.",
    AVGO: "Broadcom Inc.",
    V: "Visa Inc.",
    UNH: "UnitedHealth Group",
};

const ROW_ORDER = {
    row1: ["QQQ", "DIA", "IWM", "VIX", "AAPL", "MSFT", "TSLA", "LLY"],
    row2: ["US10Y", "US02Y", "EUR/USD", "GBP/USD", "USD/JPY", "XAU", "XAG", "WTI", "V"],
    row3: ["NVDA", "AMZN", "GOOGL", "SPY", "JPM", "GLD", "TLT", "AMD", "AVGO", "UNH"],
};

function formatTickerValue(key, price) {
    const group = TICKER_SEED[key].group;
    if (group === "yield") return `${price.toFixed(2)}%`;
    if (group === "fx") return price.toFixed(key === "USD/JPY" ? 2 : 3);
    return price.toFixed(2);
}

function useMarketData() {
    const [isOpen, setIsOpen] = useState(isNyseOpenNow());
    const [tickers, setTickers] = useState(() => {
        const seed = {};
        Object.entries(TICKER_SEED).forEach(([key, s]) => {
            seed[key] = { price: s.price, changePct: s.changePct };
        });
        return seed;
    });

    useEffect(() => {
        const id = setInterval(() => setIsOpen(isNyseOpenNow()), 60_000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        const id = setInterval(() => {
            setTickers(prev => {
                const next = {};
                Object.entries(prev).forEach(([key, t]) => {
                    const magnitude = isOpen ? 0.004 : 0.0015;
                    const drift = (Math.random() - 0.5) * magnitude;
                    next[key] = {
                        price: Math.max(0.0001, t.price * (1 + drift)),
                        changePct: t.changePct + drift * 100,
                    };
                });
                return next;
            });
        }, 2500);
        return () => clearInterval(id);
    }, [isOpen]);

    return { isOpen, tickers };
}

// ══════════════════════════════════════════════════════════════════════════
// ── Macro Market Indicators — yield curve & rotating metrics ──
// ══════════════════════════════════════════════════════════════════════════

const YIELD_CURVE_META = [
    { key: "US03M", label: "3M" },
    { key: "US05Y", label: "5Y" },
    { key: "US10Y", label: "10Y" },
    { key: "US30Y", label: "30Y" },
];

function YieldCurveMini({ points, size = "small" }) {
    const w = size === "large" ? 300 : 68;
    const chartH = size === "large" ? 70 : 22;
    const labelH = size === "large" ? 16 : 0;
    const values = points.map(p => p.yield);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = (max - min) || 1;
    const stepX = w / (points.length - 1);

    const coords = points.map((p, i) => {
        const x = i * stepX;
        const y = chartH - ((p.yield - min) / range) * (chartH - 8) - 4;
        return [x, y];
    });
    const path = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

    return (
        <svg width={w} height={chartH + labelH} viewBox={`0 0 ${w} ${chartH + labelH}`} className="overflow-visible shrink-0">
            <path d={path} fill="none" stroke="rgba(212,175,55,0.85)" strokeWidth={size === "large" ? 2 : 1.4} />
            {coords.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={size === "large" ? 3 : 1.8} fill="rgba(212,175,55,0.9)" />
            ))}
            {size === "large" && points.map((p, i) => (
                <text key={`t-${i}`} x={coords[i][0]} y={chartH + 12} fontSize="9" fill="rgba(255,255,255,0.5)" textAnchor="middle">
                    {p.label}
                </text>
            ))}
        </svg>
    );
}

function MarketIndicatorsBar({ tickers, onHover, onLeave }) {
    const [expanded, setExpanded] = useState(null);

    const toggle = (k) => setExpanded(prev => prev === k ? null : k);

    const points = YIELD_CURVE_META.map(({ key, label }) => ({
        label,
        yield: tickers[key]?.price ?? 0,
    }));
    const spreadBps = (points[2].yield - points[0].yield) * 100;
    const inverted = spreadBps < 0;

    const formatMacroVal = (key, val) => {
        if (key === 'adline') return Math.round(val).toLocaleString();
        if (key === 'above200') return val.toFixed(1);
        return val.toFixed(2);
    };

    const macroIndicators = [
        { key: 'vix', name: 'CBOE Volatility Index (VIX)', label: 'VIX', price: tickers.VIX?.price ?? 13.45, changePct: tickers.VIX?.changePct ?? -2.1, desc: "The market's expectation of 30-day S&P 500 volatility derived from index option prices.", suffix: '' },
        { key: 'putcall', name: 'Put/Call Ratio', label: 'PUT/CALL', price: tickers.PUTCALL?.price ?? 0.82, changePct: tickers.PUTCALL?.changePct ?? -1.2, desc: "Ratio of trading volume of put options to call options. Used to gauge market sentiment.", suffix: '' },
        { key: 'adline', name: 'Advance-Decline (A/D) Line', label: 'A/D LINE', price: tickers.ADLINE?.price ?? 14250, changePct: tickers.ADLINE?.changePct ?? 0.85, desc: "Cumulative sum of daily advancing vs declining stocks representing market breadth.", suffix: '' },
        { key: 'above200', name: '% Above 200-Day MA', label: '>200 DMA', price: tickers.ABOVE200?.price ?? 62.4, changePct: tickers.ABOVE200?.changePct ?? 1.2, desc: "Percentage of total index stocks trading above their long-term 200-day moving average.", suffix: '%' },
        { key: 'hyspread', name: 'High Yield (HY) Spread', label: 'HY SPREAD', price: tickers.HYSPREAD?.price ?? 3.45, changePct: tickers.HYSPREAD?.changePct ?? -0.12, desc: "Difference in yield between junk bonds and US Treasuries indicating credit risk tolerance.", suffix: '%' },
        { key: 'cape', name: 'Shiller CAPE Ratio', label: 'CAPE RATIO', price: tickers.CAPE?.price ?? 34.2, changePct: tickers.CAPE?.changePct ?? 0.15, desc: "Cyclically adjusted price-to-earnings ratio evaluating stock valuations over a 10-year scale.", suffix: '' }
    ];

    const getExpandedContent = () => {
        if (expanded === 'curve') {
            return (
                <>
                    <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-1">US Treasury Yield Curve</h4>
                    <p className="text-white/50 text-[10px] leading-tight mb-3">
                        3-month, 5-year, 10-year, and 30-year constant-maturity yields. The 10Y–3M spread is a widely watched recession signal.
                    </p>
                    <div className="flex justify-center">
                        <YieldCurveMini points={points} size="large" />
                    </div>
                    <div className="flex justify-between items-center mt-3 text-[11px]">
                        <span className="text-white/50">10Y – 3M spread</span>
                        <span className={inverted ? "text-red-400 font-bold" : "text-emerald-400 font-bold"}>
                            {inverted ? "" : "+"}{spreadBps.toFixed(0)} bps {inverted ? "(inverted)" : ""}
                        </span>
                    </div>
                </>
            );
        }

        const item = macroIndicators.find(m => m.key === expanded);
        if (item) {
            return (
                <>
                    <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-1">{item.name}</h4>
                    <p className="text-white/50 text-[10px] leading-tight mb-3">
                        {item.desc}
                    </p>
                    <div className="flex justify-between items-end">
                        <span className="text-2xl font-light text-zinc-200">
                            {formatMacroVal(item.key, item.price)}
                            {item.suffix}
                        </span>
                        <span className={item.changePct >= 0 ? "text-emerald-400" : "text-red-400"}>
                            {item.changePct >= 0 ? "▲" : "▼"} {(item.changePct > 0 ? "+" : "") + item.changePct.toFixed(2)}%
                        </span>
                    </div>
                </>
            );
        }
        return null;
    };

    const duplicatedMetrics = [...macroIndicators, ...macroIndicators, ...macroIndicators, ...macroIndicators];

    return (
        <div className="absolute bottom-0 left-0 right-0 z-30">
            <div
                className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-96 max-w-[92vw] bg-black/85 backdrop-blur-md border border-white/10 rounded-md p-4 transition-all duration-300 ${expanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                style={{ fontFamily: "var(--font-mono)" }}
            >
                {getExpandedContent()}
            </div>

            <div
                className="w-full bg-black/20 backdrop-blur-md border-t border-white/10 px-4 sm:px-6 py-2 flex items-center justify-between overflow-hidden"
                style={{ fontFamily: "var(--font-mono)" }}
            >
                <div className="flex items-center flex-1 overflow-hidden">
                    <button
                        onClick={() => toggle('curve')}
                        onMouseEnter={(e) => onHover(e, ["US Treasury Yield Curve", "Click to expand"], true)}
                        onMouseLeave={onLeave}
                        className={`flex items-center gap-3 shrink-0 transition-opacity pr-4 border-r border-white/10 ${expanded === 'curve' ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
                    >
                        <span className="text-[10px] text-white/40 tracking-widest uppercase hidden sm:inline-block">Yield Curve</span>
                        <YieldCurveMini points={points} size="small" />
                        <span className={`text-[11px] font-bold ${inverted ? "text-red-400" : "text-emerald-400"}`}>
                            {inverted ? "" : "+"}{spreadBps.toFixed(0)}bps
                        </span>
                    </button>

                    <div className="flex-1 overflow-hidden ml-4">
                        <div className="flex w-max animate-ticker-left-1 hover:[animation-play-state:paused] cursor-pointer">
                            {duplicatedMetrics.map((item, idx) => (
                                <button
                                    key={`${item.key}-${idx}`}
                                    onClick={() => toggle(item.key)}
                                    onMouseEnter={(e) => onHover(e, [item.name, "Click to expand"], true)}
                                    onMouseLeave={onLeave}
                                    className={`flex items-center gap-2 mx-6 group transition-opacity shrink-0 ${expanded === item.key ? 'opacity-100' : 'opacity-75 hover:opacity-100'}`}
                                >
                                    <span className="text-[9px] text-white/40 tracking-widest uppercase group-hover:text-white/60">
                                        {item.label}
                                    </span>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-xs text-zinc-200 font-bold">
                                            {formatMacroVal(item.key, item.price)}
                                            {item.suffix}
                                        </span>
                                        <span className={`text-[10px] ${item.changePct >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                                            {item.changePct >= 0 ? "+" : ""}{item.changePct.toFixed(2)}%
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Shared floating tooltip ──
function CursorTooltip({ tooltip }) {
    if (!tooltip) return null;
    
    const winHeight = typeof window !== "undefined" ? window.innerHeight : 800;
    // Render upward if we override with forceAbove or we are near bottom edge
    const isAbove = tooltip.forceAbove || tooltip.y > winHeight - 80;

    const style = {
        left: tooltip.x + 14,
        fontFamily: "var(--font-mono)",
    };

    if (isAbove) {
        style.bottom = winHeight - tooltip.y + 14; 
    } else {
        style.top = tooltip.y + 14;
    }

    return (
        <div
            className="fixed z-50 pointer-events-none px-2.5 py-1.5 rounded-sm border border-white/15 bg-black/85 backdrop-blur-sm text-white/90 text-[11px] leading-tight tracking-wide whitespace-nowrap shadow-xl transition-all duration-75"
            style={style}
        >
            {tooltip.lines.map((line, i) => (
                <div key={i} className={i === 0 ? "font-bold text-white mb-0.5" : "text-white/60"}>{line}</div>
            ))}
        </div>
    );
}

// ── Three Quantitative Ticker Ribbons ──
function TickerRibbons({ tickers, onCellHover, onCellLeave }) {
    const duplicateItems = (keys) => [...keys, ...keys, ...keys, ...keys];

    const renderRow = (rowKeys, animClass, rowIdx) => (
        <div className={`flex w-max ${animClass} hover:[animation-play-state:paused] pointer-events-auto`}>
            {duplicateItems(rowKeys).map((key, idx) => (
                <TickerCell
                    key={`r${rowIdx}-${key}-${idx}`}
                    tickerKey={key}
                    data={tickers[key]}
                    onHover={onCellHover}
                    onLeave={onCellLeave}
                />
            ))}
        </div>
    );

    return (
        <div className="w-full overflow-hidden opacity-90 flex flex-col gap-2">
            {renderRow(ROW_ORDER.row1, "animate-ticker-left-1", 1)}
            {renderRow(ROW_ORDER.row2, "animate-ticker-right", 2)}
            {renderRow(ROW_ORDER.row3, "animate-ticker-left-2", 3)}
        </div>
    );
}

function TickerCell({ tickerKey, data, onHover, onLeave }) {
    const seed = TICKER_SEED[tickerKey];
    if (!data) return null;
    const dir = data.changePct >= 0 ? "up" : "down";
    const displayVal = formatTickerValue(tickerKey, data.price);
    const chgStr = `${data.changePct >= 0 ? "+" : ""}${data.changePct.toFixed(2)}%`;

    return (
        <div
            className="flex items-center gap-2 mx-2 px-2.5 py-1 text-xs tracking-widest uppercase drop-shadow-md cursor-default bg-zinc-800/80 backdrop-blur-md border border-white/10 rounded"
            style={{ fontFamily: "var(--font-mono)" }}
            onMouseMove={(e) => onHover(e, [
                `${seed.label} — ${ASSET_NAMES[tickerKey] || seed.label}`,
                `${displayVal}  ${chgStr}  ·  SIMULATED`,
            ])}
            onMouseLeave={onLeave}
        >
            <span className="text-white/90 font-bold">{seed.label}</span>
            <span className="text-zinc-400 font-medium">{displayVal}</span>
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                dir === "up" 
                    ? "text-emerald-400 bg-emerald-950/60 border border-emerald-500/30" 
                    : "text-red-400 bg-red-950/60 border border-red-500/30"
            }`}>
                {dir === "up" ? "▲" : "▼"} {chgStr}
            </span>
        </div>
    );
}

// ── Market status badge ──
function MarketStatusBadge({ isOpen }) {
    return (
        <div
            className={`flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase select-none ${isOpen ? "text-white/50" : "text-white/30"}`}
            style={{ fontFamily: "var(--font-mono)" }}
        >
            <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? "bg-emerald-400 animate-pulse" : "bg-white/25"}`} />
            {isOpen ? "Market Open · Live" : "Market Closed · Simulated"}
        </div>
    );
}

// ── Interactive Stock Search Component with Extended Simulated Financial Data ──
function simulateQuote(symbol) {
    let seed = 0;
    for (let i = 0; i < symbol.length; i++) seed = (seed * 31 + symbol.charCodeAt(i)) % 100000;
    const rand = (n) => {
        seed = (seed * 9301 + 49297) % 233280;
        return (seed / 233280) * n;
    };

    const price = 20 + rand(480);
    const low52 = price * (0.7 + rand(0.15));
    const high52 = price * (1.1 + rand(0.25));
    const ratings = ["Strong Buy", "Buy", "Moderate Buy", "Hold", "Outperform"];

    return {
        price,
        changePct: rand(6) - 3,
        marketCap: `$${(10 + rand(2500)).toFixed(1)}B`,
        peRatio: `${(8 + rand(45)).toFixed(1)}x`,
        eps: `$${(1 + rand(15)).toFixed(2)}`,
        divYield: `${(rand(4)).toFixed(2)}%`,
        beta: (0.5 + rand(1.3)).toFixed(2),
        volume: `${(1 + rand(80)).toFixed(1)}M`,
        avgVolume: `${(5 + rand(70)).toFixed(1)}M`,
        profitMargin: `${(5 + rand(30)).toFixed(1)}%`,
        roe: `${(8 + rand(35)).toFixed(1)}%`,
        revenue: `$${(2 + rand(350)).toFixed(1)}B`,
        range52: `$${low52.toFixed(2)} - $${high52.toFixed(2)}`,
        analystRating: ratings[Math.floor(rand(ratings.length))],
    };
}

function StockSearch() {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        const symbol = query.toUpperCase().trim();
        if (!symbol || !/^[A-Z.]{1,6}$/.test(symbol)) {
            setResult({ error: true });
            return;
        }
        setResult({ symbol, ...simulateQuote(symbol) });
        setIsCollapsed(false);
    };

    const handleClear = () => {
        setQuery("");
        setResult(null);
        setIsCollapsed(false);
    };

    return (
        <div className="w-full mt-4 bg-black/50 backdrop-blur-md border border-white/10 rounded p-3 pointer-events-auto" style={{ fontFamily: "var(--font-mono)" }}>
            <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1 flex items-center">
                    <input
                        type="text"
                        placeholder="SEARCH TICKER..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className="bg-black/60 border border-white/20 rounded pl-2.5 pr-8 py-1.5 text-xs text-white uppercase focus:outline-none focus:border-white/50 w-full"
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={handleClear}
                            title="Clear"
                            className="absolute right-2 text-white/40 hover:text-white transition-colors"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    )}
                </div>
                <button type="submit" title="Search" className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded transition-colors flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>
                {result && !result.error && (
                    <button
                        type="button"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        title={isCollapsed ? "Expand" : "Collapse"}
                        className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded transition-colors flex items-center justify-center"
                    >
                        {isCollapsed ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="18 15 12 9 6 15"></polyline>
                            </svg>
                        )}
                    </button>
                )}
            </form>

            {result && !result.error && !isCollapsed && (
                <div className="mt-3 flex flex-col gap-2.5">
                    {/* Header Price Info */}
                    <div className="p-2 bg-black/60 border border-white/10 rounded flex items-center justify-between text-xs tracking-widest">
                        <span className="text-white/90 font-bold">{result.symbol}</span>
                        <span className="text-zinc-300 font-medium">${result.price.toFixed(2)}</span>
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                            result.changePct >= 0 
                                ? "text-emerald-400 bg-emerald-950/60 border border-emerald-500/30" 
                                : "text-red-400 bg-red-950/60 border border-red-500/30"
                        }`}>
                            {result.changePct >= 0 ? "▲" : "▼"} {(result.changePct > 0 ? "+" : "") + result.changePct.toFixed(2)}%
                        </span>
                    </div>

                    {/* 12 Fundamental Financial Data Points */}
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 p-2.5 bg-black/40 border border-white/10 rounded text-[11px]">
                        <div className="flex justify-between border-b border-white/5 pb-1">
                            <span className="text-white/40">Mkt Cap:</span>
                            <span className="text-white/80 font-medium">{result.marketCap}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1">
                            <span className="text-white/40">P/E (TTM):</span>
                            <span className="text-white/80 font-medium">{result.peRatio}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1">
                            <span className="text-white/40">EPS:</span>
                            <span className="text-white/80 font-medium">{result.eps}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1">
                            <span className="text-white/40">Div Yield:</span>
                            <span className="text-white/80 font-medium">{result.divYield}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1">
                            <span className="text-white/40">Beta:</span>
                            <span className="text-white/80 font-medium">{result.beta}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1">
                            <span className="text-white/40">Volume:</span>
                            <span className="text-white/80 font-medium">{result.volume}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1">
                            <span className="text-white/40">Avg Vol:</span>
                            <span className="text-white/80 font-medium">{result.avgVolume}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1">
                            <span className="text-white/40">Margin:</span>
                            <span className="text-white/80 font-medium">{result.profitMargin}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1">
                            <span className="text-white/40">ROE:</span>
                            <span className="text-white/80 font-medium">{result.roe}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1">
                            <span className="text-white/40">Revenue:</span>
                            <span className="text-white/80 font-medium">{result.revenue}</span>
                        </div>
                        <div className="col-span-2 flex justify-between border-b border-white/5 pb-1">
                            <span className="text-white/40">52-Wk Range:</span>
                            <span className="text-white/80 font-medium">{result.range52}</span>
                        </div>
                        <div className="col-span-2 flex justify-between pt-0.5">
                            <span className="text-white/40">Rating:</span>
                            <span className="text-amber-300 font-semibold">{result.analystRating}</span>
                        </div>
                    </div>
                </div>
            )}

            {result && result.error && (
                <div className="mt-3 text-xs text-red-400 tracking-widest uppercase">
                    Enter a valid ticker symbol.
                </div>
            )}
        </div>
    );
}

export default function HeroSection() {
    const typedWord = useTypewriter(ROTATING_WORDS);
    const { isOpen, tickers } = useMarketData();

    const [tooltip, setTooltip] = useState(null);

    // Added a forceAbove parameter allowing callers to dictate popup direction
    const handleHover = useCallback((e, lines, forceAbove = false) => {
        setTooltip({ x: e.clientX, y: e.clientY, lines, forceAbove });
    }, []);
    const handleLeave = useCallback(() => setTooltip(null), []);

    return (
        <section className="relative w-full h-screen min-h-[600px] flex items-end overflow-hidden">
            {/* ── Background Image & Gradients ── */}
            <div className="absolute inset-0">
                <img
                    src={HERO_BACKGROUND}
                    alt="New York City financial district"
                    className="w-full h-full object-cover object-center"
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(to bottom, rgba(8,8,8,0.28) 0%, rgba(8,8,8,0.46) 50%, rgba(8,8,8,0.86) 100%)",
                    }}
                />
            </div>

            {/* ── Live clock + market status, divider, tickers, and search bar — top right ── */}
            <div className="absolute top-24 right-0 pr-[var(--fluid-pad)] z-10 flex flex-col items-end gap-2 w-[300px] sm:w-[380px] md:w-[440px]">
                <LiveClock />
                <MarketStatusBadge isOpen={isOpen} />
                <div className="w-full h-px bg-white/15 my-1" />
                <TickerRibbons tickers={tickers} onCellHover={handleHover} onCellLeave={handleLeave} />
                <div className="w-full h-px bg-white/15 my-1" />
                <StockSearch />
            </div>

            {/* ── Hero text — bottom left ── */}
            <div
                className="relative z-10 pb-32 md:pb-48 w-full max-w-7xl"
                style={{ paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}
            >
                <h1
                    className="text-white font-heading font-bold leading-[1.05]"
                    style={{ fontSize: "clamp(2.4rem, 6.5vw, 5.5rem)" }}
                >
                    I am{" "}
                    <span className="text-white">
                        {typedWord}
                        <span
                            className="inline-block w-[3px] ml-1 align-baseline"
                            style={{
                                height: "0.85em",
                                backgroundColor: "white",
                                animation: "blink 1s step-end infinite",
                            }}
                        />
                    </span>
                </h1>

                <p
                    className="mt-3 text-xs font-semibold tracking-[0.3em] uppercase text-white/50"
                    style={{ fontFamily: "var(--font-mono)" }}
                >
                    New York, New York
                </p>

                <p
                    className="mt-5 text-white/75 text-base md:text-lg leading-relaxed max-w-5xl"
                    style={{ fontFamily: "var(--font-body)" }}
                >
                    A curated overview of my research, projects, and professional experience across finance, consulting, and quantitiative finance. This space is designed to highlight my work, provide insights into my approach to problem-solving, and showcase my contributions to academic and the professional world.

                </p>

                <div className="flex flex-wrap items-center gap-3 mt-8 md:mt-10 md:gap-0 relative z-20">
                    <a
                        href="https://www.linkedin.com/in/alexandre-tilly/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-5 py-2.5 md:px-6 md:py-3 text-sm font-semibold tracking-[0.1em] uppercase transition-all duration-300"
                        style={{ border: "1px solid rgba(90,160,210,0.5)", color: "rgba(90,160,210,0.9)" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgb(90,160,210)"; e.currentTarget.style.backgroundColor = "rgba(90,160,210,0.1)"; e.currentTarget.style.color = "rgb(90,160,210)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(90,160,210,0.5)"; e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "rgba(90,160,210,0.9)"; }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        LinkedIn
                    </a>

                    <div className="hidden md:block w-px h-10 bg-white/20 mx-1" />

                    <a
                        href="https://github.com/agtaz19"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-5 py-2.5 md:px-6 md:py-3 text-sm font-semibold tracking-[0.1em] uppercase transition-all duration-300"
                        style={{ border: "1px solid rgba(100,185,130,0.5)", color: "rgba(100,185,130,0.9)" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgb(100,185,130)"; e.currentTarget.style.backgroundColor = "rgba(100,185,130,0.1)"; e.currentTarget.style.color = "rgb(100,185,130)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(100,185,130,0.5)"; e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "rgba(100,185,130,0.9)"; }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                        </svg>
                        GitHub
                    </a>

                    <div className="hidden md:block w-px h-10 bg-white/20 mx-1" />

                    <a
                        href="https://linktr.ee/agtaz19"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-5 py-2.5 md:px-6 md:py-3 text-sm font-semibold tracking-[0.1em] uppercase transition-all duration-300"
                        style={{ border: "1px solid rgba(212,175,55,0.5)", color: "rgba(212,175,55,0.9)" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgb(212,175,55)"; e.currentTarget.style.backgroundColor = "rgba(212,175,55,0.1)"; e.currentTarget.style.color = "rgb(212,175,55)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.5)"; e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "rgba(212,175,55,0.9)"; }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7.953 15.066c-.08.163-.08.324-.08.486.08.893.893 1.627 1.787 1.547.326-.02.613-.122.851-.284l5.204-3.235c.176-.108.37-.168.569-.168.198 0 .392.06.569.168l5.204 3.235c.238.162.525.264.851.284.894.08 1.707-.654 1.787-1.547 0-.162 0-.323-.08-.486L19.993 8.25a1.29 1.29 0 00-.486-.647l-6.66-4.11a1.29 1.29 0 00-1.38 0l-6.66 4.11a1.29 1.29 0 00-.487.647L.527 15.066zM12 20.55c-.486 0-.973-.162-1.38-.486L4.36 15.714c-.162-.122-.346-.203-.543-.24-.566-.108-1.132.162-1.38.647-.243.486-.08 1.052.324 1.38l6.66 4.11c.649.404 1.38.607 2.58.607 1.2 0 1.931-.203 2.58-.607l6.66-4.11c.404-.328.567-.894.324-1.38-.248-.485-.814-.755-1.38-.647-.197.037-.381.118-.543.24l-6.26 4.35c-.407.324-.894.486-1.38.486z"/>
                        </svg>
                        Linktree
                    </a>
                </div>
            </div>

            <CursorTooltip tooltip={tooltip} />
            <MarketIndicatorsBar tickers={tickers} onHover={handleHover} onLeave={handleLeave} />

            <style>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50%      { opacity: 0; }
                }

                @keyframes tickerScrollLeft {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }

                @keyframes tickerScrollRight {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(2px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .animate-ticker-left-1 {
                    animation: tickerScrollLeft 90s linear infinite;
                }

                .animate-ticker-right {
                    animation: tickerScrollRight 110s linear infinite;
                }

                .animate-ticker-left-2 {
                    animation: tickerScrollLeft 80s linear infinite;
                }
                
                .animate-fade-in {
                    animation: fadeIn 0.4s ease-out forwards;
                }

                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}