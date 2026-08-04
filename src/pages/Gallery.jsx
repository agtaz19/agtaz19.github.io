import React, { useState } from "react";
import { X } from "lucide-react";

const galleryAssets = import.meta.glob(
    [
        "./assets/gallery/*.{jpg,jpeg,png,webp,svg}",
        "../assets/gallery/*.{jpg,jpeg,png,webp,svg}",
        "../../assets/gallery/*.{jpg,jpeg,png,webp,svg}",
        "/src/assets/gallery/*.{jpg,jpeg,png,webp,svg}",
    ],
    { eager: true, import: "default" }
);

const getAssetUrl = (filepath) => {
    if (!filepath) return "";

    const filename = filepath.split("/").pop();

    const matchKey = Object.keys(galleryAssets).find((key) =>
        key.endsWith(filename)
    );

    if (matchKey) {
        return galleryAssets[matchKey];
    }

    const cleanPath = filepath.replace(/^\.\//, "");
    return `${import.meta.env.BASE_URL}${cleanPath}`;
};

const IMAGES = [
    {
        src: "./assets/gallery/AIX_Summit_2026.jpg",
        thumb: "./assets/gallery/AIX_Summit_2026.jpg",
        title: "AIX Summit 2026",
        date: "March 2026",
        description: "Captured at the inaugural AIX Summit 2026 in New York City, this photo brings together pioneering researchers, industry visionaries, and policymakers shaping the next frontier of artificial intelligence. The event buzzed with transformative energy as world-renowned keynotes and cross-disciplinary panels tackled the dynamic convergence of AI across science, engineering, finance, and healthcare. From vibrant research poster sessions to high-level roundtables, the image highlights an inspiring intergenerational dialogue between established technology pioneers and rising innovators. Every interaction captured underscores a collective commitment to expanding technological boundaries while grounding AI advancement in trust, safety, and rigorous scientific inquiry. This photo serves as a lasting visual milestone from a landmark summit where global experts aligned to shape the next era of innovation.",
        tags: ["Artificial Intelligence", "Machine Learning", "Applied Mathematics"],
    },
    {
        src: "./assets/gallery/arizona_boys_state_group_2025.jpg",
        thumb: "./assets/gallery/arizona_boys_state_group_2025.jpg",
        title: "Arizona Boys State 2025",
        date: "June 2025",
        description: "Captured against the backdrop of the 2025 Arizona Boys State program, this group photo embodies the energy, camaraderie, and shared ambition of a remarkable cohort of young leaders. Standing shoulder to shoulder, these delegates spent an intensive week navigating complex simulations of state governance, city politics, and legislative debate to discover what true civic engagement requires. Each face in the frame represents hours of spirited campaigning, collaborative problem-solving, and a deep commitment to understanding the nuances of executive, judicial, and municipal leadership. Beyond the formal proceedings and political triumphs, this image freezes in time the lifelong friendships and mutual respect forged through late-night caucus sessions and shared challenges. It serves as a lasting testament to a week that transformed passionate individuals into a unified community poised to shape the future of their local communities and beyond.",
        tags: ["Volunteering", "Arizona Boys State", "Civics"],
    },
    {
        src: "./assets/gallery/arizona_boys_state_mexican_food.jpg",
        thumb: "./assets/gallery/arizona_boys_state_mexican_food.jpg",
        title: "Arizona Boys State Team Bonding",
        date: "June 2026",
        description: "Capturing a lighter, unscripted moment from the program, this photo showcases delegates stepping away from the legislative floor to build genuine connections with their peers. Through collaborative team-building exercises, impromptu athletic matches, and spirited late-night residence hall discussions, these delegates formed bonds that quickly transformed functional political coalitions into genuine, lasting friendships. The candid smiles and shared laughter in the frame highlight how mutual trust and effective leadership are rooted far more in empathy and personal connection than in mere political strategy. Navigating intense civic simulations together creates a unique camaraderie, where late-night brainstorming sessions and friendly rivalries forge a tight-knit community. This image perfectly captures the heart of the program—where young leaders come together not just to govern, but to support, challenge, and inspire one another long after the week concludes.",
        tags: ["Volunteering", "Arizona Boys State", "Civics"],
    },
    {
        src: "./assets/gallery/arizona_boys_state_one-on-one.jpg",
        thumb: "./assets/gallery/arizona_boys_state_one-on-one.jpg",
        title: "Arizona Boys State 2025",
        date: "June 2025",
        description: "Framed during a brief pause in a fast-paced week, this photo captures a meaningful moment of friendship built amidst the high-stakes momentum of Arizona Boys State 2026. Stepping aside from intense legislative debates, campaign speeches, and late-night caucus strategy, two delegates share a candid reflection on an unforgettable journey. Navigating the complexities of city, county, and state governance side by side turns peers into true confidants, grounding every political victory and hard-fought session in genuine mutual support. The shared smiles in this frame represent more than just a memorable week in leadership; they mark the foundation of a lasting bond forged through common purpose, shared ambition, and mutual respect. This image stands as a personal snapshot of a defining experience—a reminder that the most valuable takeaway from Boys State is often the lifelong connections made along the way.",
        tags: ["Volunteering", "Arizona Boys State", "Future Leaders"],
    },
    {
        src: "./assets/gallery/fordham_2026.jpg",
        thumb: "./assets/gallery/fordham_2026.jpg",
        title: "Fordham Quant Finance Conference 2026",
        date: "April 2026",
        description: "Hosted at Fordham University’s Gabelli School of Business in Lincoln Center, this snapshot captures the energy of QuantVision 2026, one of the premier gatherings in quantitative finance and financial engineering. Industry leaders, hedge fund managers, quantitative researchers, and ambitious students converged to explore the rapidly shifting landscape of machine learning, alternative datasets, and algorithmic strategy. Engaging panel sessions and keynotes sparked deep technical discussions on everything from agentic AI models to risk management in complex market regimes. Beyond the rigorous academic and technical discourse, the hall buzzed with vibrant networking as delegates built connections with leading practitioners across Wall Street. This photo represents a milestone moment at the intersection of data science and finance, highlighting a community dedicated to defining the future of systematic investing.",
        tags: ["Quant Finance", "New York City", "Quant Vision 2026"],
    },
    {
        src: "./assets/gallery/fqe_bny_roundtable.jpg",
        thumb: "./assets/gallery/fqe_bny_roundtable.jpg",
        title: "FQE BNY Roundtable",
        date: "April 2026",
        description: "Gathered for an exclusive roundtable hosted by the Financial Quants and Engineers (FQE) club alongside industry leaders from BNY Mellon, this photo captures a pivotal moment of exchange between aspiring quants and seasoned financial engineers. Set against an engaging backdrop of high-level discussion, delegates spent the session diving deep into real-world applications of data infrastructure, risk modeling, and market structure transformations within global custodial banking. The dynamic interactions in the room highlight a shared focus on bridging academic quantitative rigor with cutting-edge industry practice. Each candid reaction reflects the value of direct mentorship, as students posed thoughtful questions on portfolio strategies and scalable financial technology. Beyond the technical insights shared, this image stands as a testament to FQE's commitment to cultivating strong institutional networks and empowering the next generation of quantitative leaders.",
        tags: ["AI in Quantitiative Finance", "Industry Leaders", "Networking"],
    },
    {
        src: "./assets/gallery/fqe_bny_speakers.jpg",
        thumb: "./assets/gallery/fqe_bny_speakers.jpg",
        title: "FQE BNY Speakers",
        date: "April 2026",
        description: "Standing on the high-energy trading floor at BNY, members of the Financial Quants and Engineers (FQE) club gained firsthand exposure to the operational pulse of global financial markets. Hosted by industry practitioners and senior quantitative specialists, the speaker session demystified complex execution algorithms, market-making architecture, and real-time risk management strategies. Surrounded by multi-screen terminals and active market monitors, students observed how sophisticated mathematical models transition from academic theory into multi-trillion-dollar institutional execution. The interactive dialogue provided invaluable clarity on quantitative careers, highlighting the exact engineering, data infrastructure, and analytical skills needed to navigate front-office roles. Capturing a seamless blend of mentorship and institutional scale, this photo highlights FQE's ongoing mission to bridge classroom learning with front-line Wall Street innovation.",
        tags: ["Trading Floor Monitor", "Financial Quants & Engineers (FQE)", "Collaboration"],
    },
    {
        src: "./assets/gallery/fqe_trading_competition 2026.jpg",
        thumb: "./assets/gallery/fqe_trading_competition 2026.jpg",
        title: "FQE Trading Competition Spring 2026",
        date: "April 2026",
        description: "Captured during the intense final hours of the Financial Quants and Engineers (FQE) Spring 2026 Trading Competition, this photo brings to life the high-stakes environment where analytical rigor meets market execution. Laptops flashed with real-time volatility graphs, order book feeds, and algorithmic scripts as participants raced to optimize position limits and dynamic hedging strategies under changing market regimes. The focused energy in the room was palpable, reflecting weeks of preparation in backtesting strategies, risk control, and quantitative programming. Behind every line of code and trade execution lay a rigorous test of speed, discipline, and adaptiveness against simulated market shocks. This image serves as a powerful snapshot of FQE’s core ethos—empowering young quantitative talent to test their theories, refine their trading frameworks, and thrive in competitive, real-world conditions.",
        tags: ["Financial Quants & Engineers (FQE)", "New York City", "Baruch College"],
    },
    {
        src: "./assets/gallery/NY_StockExchange.jpg",
        thumb: "./assets/gallery/NY_StockExchange.jpg",
        title: "New York Stock Exchange",
        date: "April 2026",
        description: "Standing on the iconic floor of the New York Stock Exchange, this photo captures the heartbeat of global capital markets and centuries of financial history. Framed beneath the high-vaulted ceiling and vibrant display boards, the scene pulses with the unique energy of market makers, institutional traders, and floor brokers during peak trading hours. Every glance at a monitor and quick discussion among specialists represents real-time price discovery, liquidity provision, and the execution of global economic activity. Beyond the technological infrastructure driving modern trading, the setting stands as an enduring symbol of market resilience, institutional scale, and economic movement. This image serves as a powerful reminder of what it means to stand at the world's most famous financial intersection, where strategy, capital, and global enterprise meet.",
        tags: ["Markets", "New York City", "Wall Street"],
    },
    {
        src: "./assets/gallery/nyc_snow.jpg",
        thumb: "./assets/gallery/nyc_snow.jpg",
        title: "NYC Cold Day",
        date: "January 2026",
        description: "Wrapped in heavy coats and thick scarves, this photo captures the raw, crisp beauty of New York City in the dead of winter. Frosty air sharpens every skyline view, with steam billowing dramatically from subway grates into the frigid, clear atmosphere. Streets usually bustling with slow-moving pedestrians now see people stepping briskly past quiet cafes, hands buried deep in pockets and coffee cups steaming in hand. The winter sunlight casts long, golden shadows across snow-dusted sidewalks, turning a chilling afternoon into a serene visual moment. This image perfectly freezes the quiet resilience and undeniable charm of Manhattan on a biting, clear cold day.",
        tags: ["NYC Winter", "New York City", "Manhattan Parks"],
    },
    {
        src: "./assets/gallery/state_street_ai_talk.jpg",
        thumb: "./assets/gallery/state_street_ai_talk.jpg",
        title: "State Street AI Talk",
        date: "March 2026",
        description: "Gathered for an insightful tech discourse hosted by State Street, this photo captures leading quantitative engineers, AI researchers, and financial strategists coming together to explore the frontier of artificial intelligence in institutional finance. The room buzzed with high-level discussion surrounding multi-agent systems, natural language processing for sentiment analysis, and machine learning models engineered for complex portfolio optimization. Attendees actively engaged with panel speakers, probing into how cutting-edge generative tools and predictive models are reshaping traditional asset management and custody operations. Beyond the technical mechanics, the dialogue emphasized building scalable, explainable, and risk-managed AI frameworks designed to operate safely within heavily regulated global markets. This snapshot highlights an impactful session where academic machine learning theory directly intersected with enterprise financial technology.",
        tags: ["AI in Finance", "State Street", "FinTech"],
    },
    {
        src: "./assets/gallery/cfa_nyc_spring_2025.jpg",
        thumb: "./assets/gallery/cfa_nyc_spring_2025.jpg",
        title: "9th Annual Data Science in Finance Conference",
        date: "January 2026",
        description: "Co-hosted by the Society of Quantitative Analysts (SQA) and CFA Society New York at 1540 Broadway, this photo captures the intellectual energy of the 9th Annual Data Science in Finance Conference. Keynote speakers, quantitative researchers, and industry leaders gathered across engaging sessions to discuss the cutting-edge fusion of asset embeddings, LLMs for global news analysis, and uncertainty-aware portfolio optimization. The vibrant networking breaks and panel discussions in the hall highlighted a seamless convergence of academic research with institutional Wall Street applications. Each interaction reflected a collective drive to advance machine learning and big data frameworks while maintaining quantitative rigor in modern investment strategies. This snapshot marks a premier gathering of data science minds dedicated to defining the next evolution of systematic finance.",
        tags: ["Data Science", "SQA", "CFA NY"],
    },
    {
        src: "./assets/gallery/young_financial_times.jpg",
        thumb: "./assets/gallery/young_financial_times.jpg",
        title: "3 Years Young",
        date: "August 2002",
        description: "Looking back on three years old, this snapshot captures a charmingly curious moment where I’m focused on a surprisingly sophisticated piece of reading: the Financial Times. Clad in a small, patterned sweater, my hands grip the recognizable salmon-colored pages, navigating headline text almost as large as I am. It’s an innocent yet focused introduction to complex markets and global news, long before financial engineering and quantitative strategy entered my world. This photo now stands as a playful hint at the future, freezing in time a simple, unexpected moment that hints at a lifelong path of analysis and curiosity. Beyond the humorous visual contrast, it’s a treasured memory of an early, playful spark that grew into a dedication to defining the next generation of finance.",
        tags: ["3 Years Young", "Financial Times", "Mini-Quant"],
    },
    {
        src: "./assets/gallery/nyc_cold_day_portrait.jpg",
        thumb: "./assets/gallery/nyc_cold_day_portrait.jpg",
        title: "NYC Cold Day Portrait",
        date: "April 2024",
        description: "Wrapped against the biting winter wind on a crisp New York City afternoon, this portrait captures a pivotal moment of personal and professional transition. Bundled up against the frost-filled air, steam rising from the surrounding Manhattan streets, the image reflects both the chill of the season and the quiet warmth of starting an exciting new chapter at State Street. Moving on to a new role in the heart of global financial markets brings a fresh wave of energy, ambition, and opportunity despite the freezing temperatures. The stark winter sunlight and sharp city backdrop perfectly mirror the focus and clarity that come with taking a bold next step in a career. This photo freezes in time a memorable milestone—a cold day in NYC marking the beginning of a promising new journey.",
        tags: ["State Street", "New York City Winter", "Career Milestone"],
    },
    {
        src: "./assets/gallery/fqe_fall_2025.jpg",
        thumb: "./assets/gallery/fqe_fall_2025.jpg",
        title: "FQE Fall 2025 Club Photo",
        date: "September 2025",
        description: "Taking on my first executive board role as Treasurer for the Financial Quants and Engineers (FQE) during Fall 2025 marked an exciting milestone in leading our quantitative community. Navigating budget allocations, event funding, and institutional sponsorships gave me hands-on experience managing the financial pulse of a rapidly growing organization. Working alongside a dedicated e-board team, we successfully funded technical workshops, trading competitions, and high-impact guest speaker sessions for our members. The position challenged me to balance strategic planning with operational precision, ensuring every dollar invested directly enhanced the educational experience of aspiring quants. This photo captures a proud moment from that defining semester—a time of stepping up into leadership, sharpening my financial stewardship, and helping shape the future of FQE.",
        tags: ["Financial Quants & Engineers (FQE)", "Baruch College", "Leadership"],
    },
    {
        src: "./assets/gallery/nyc_night_view.jpg",
        thumb: "./assets/gallery/nyc_night_view.jpg",
        title: "NYC Night View",
        date: "April 2023",
        description: "Framed against the glowing Manhattan skyline, this photo captures a breathtaking late-night view of the iconic Empire State Building and Chrysler Building towering over the city. Taken during my consulting days, it brings back memories of long hours, high-stakes projects, and the relentless drive that defines working in the heart of New York. The neon lights and illuminated spires cut through the dark sky, serving as a reminder of the energy and resilience that powered those demanding evenings. Looking out over the city after a long day of client work always offered a moment of quiet perspective amidst the constant motion of consulting life. This image stands as a sharp, nostalgic snapshot of a fast-paced era defined by hard work, ambition, and unforgettable cityscapes.",
        tags: ["NYC Night View", "Consulting Team Bonding", "Manhattan Skyline"],
    },
];

// Split images into 4 rows with offset starting points
const ROWS = [
    { images: IMAGES.slice(0, 4), speed: "95s", offset: "0px", reverse: false },
    { images: IMAGES.slice(4, 8), speed: "90s", offset: "0px", reverse: true },
    { images: IMAGES.slice(8, 12), speed: "85s", offset: "0px", reverse: false },
    { images: IMAGES.slice(12, 16), speed: "80s", offset: "0px", reverse: true },
];

function GalleryStrip({ rowImages, speed, offset, reverse, onSelect }) {
    const [paused, setPaused] = useState(false);
    const strip = [...rowImages, ...rowImages, ...rowImages];
    const animName = reverse ? "scroll-right" : "scroll-left";

    return (
        <div className="overflow-hidden" style={{ marginBottom: "12px" }}>
            <div
                style={{
                    display: "flex",
                    gap: "12px",
                    width: "max-content",
                    animation: `${animName} ${speed} linear infinite`,
                    animationPlayState: paused ? "paused" : "running",
                    transform: `translateY(${offset})`,
                    marginTop: offset !== "0px" ? `-${offset}` : "0",
                    willChange: "transform",
                }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                {strip.map((img, i) => (
                    <div
                        key={i}
                        className="group relative cursor-pointer overflow-hidden flex-shrink-0"
                        style={{ width: "300px", height: "210px" }}
                        onClick={() => onSelect(img)}
                    >
                        <img
                            src={getAssetUrl(img.thumb)}
                            alt={img.title}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-300 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100">
                            <p className="font-heading font-semibold text-white text-sm leading-snug mb-1">
                                {img.title}
                            </p>
                            <p className="text-xs font-mono text-white/60 mb-2">{img.date}</p>
                            <div className="flex flex-wrap gap-1 mb-3">
                                {img.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[9px] tracking-[0.12em] uppercase px-1.5 py-0.5 border border-white/30 text-white/70"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <p className="text-xs tracking-[0.15em] uppercase font-semibold text-white/90">
                                View →
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Images() {
    const [selected, setSelected] = useState(null);

    return (
        <>
            <style>{`
                @keyframes scroll-left {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes scroll-right {
                    0%   { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
            `}</style>

            {/* Hero */}
            <section
                className="relative bg-dark-panel border-b overflow-hidden"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
                <div className="absolute inset-0">
                    <img
                        src="https://images.pexels.com/photos/18343396/pexels-photo-18343396.jpeg?w=1800&q=80&fit=crop"
                        alt=""
                        className="w-full h-full object-cover object-center opacity-50"
                        loading="lazy"
                        decoding="async"
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(to right, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.2) 100%)",
                        }}
                    />
                </div>
                <div
                    className="relative z-10"
                    style={{
                        paddingTop: "clamp(5rem,10vw,9rem)",
                        paddingBottom: "clamp(3rem,6vw,5rem)",
                        paddingLeft: "var(--fluid-pad)",
                        paddingRight: "var(--fluid-pad)",
                    }}
                >
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/40 mb-3">
                        Gallery
                    </p>
                    <h1
                        className="font-heading font-bold text-white leading-[1.05]"
                        style={{ fontSize: "clamp(2.2rem,5vw,4.5rem)" }}
                    >
                        Highlights
                    </h1>
                    <p className="mt-5 text-base md:text-lg leading-relaxed text-white/60">
                        A curated record of moments across my life like professional
                        presentation, academic lectures, presentation, or industry events -
                        this gallery is intended to capture the breadth of a practice built
                        on both rigour and range.
                    </p>
                </div>
            </section>

            {/* Offset stacked gallery */}
            <section
                style={{
                    paddingTop: "clamp(3rem,7vw,6rem)",
                    paddingBottom: "clamp(4rem,8vw,7rem)",
                    overflow: "hidden",
                }}
            >
                {ROWS.map((row, i) => (
                    <GalleryStrip
                        key={i}
                        rowImages={row.images}
                        speed={row.speed}
                        offset={row.offset}
                        reverse={row.reverse}
                        onSelect={setSelected}
                    />
                ))}
            </section>

            {/* Modal */}
            {selected && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
                    onClick={() => setSelected(null)}
                >
                    <div
                        className="relative max-w-4xl w-full border border-theme overflow-hidden"
                        style={{ backgroundColor: "rgb(var(--bg-card))" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelected(null)}
                            className="absolute top-4 right-4 z-10 p-1 text-white/70 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                        <img
                            src={getAssetUrl(selected.src)}
                            alt={selected.title}
                            className="w-full object-cover"
                            style={{ maxHeight: "60vh" }}
                        />
                        <div className="p-6 md:p-8">
                            <div className="flex items-start justify-between gap-4 mb-3">
                                <h2 className="font-heading font-semibold text-xl text-theme leading-snug">
                                    {selected.title}
                                </h2>
                                <span className="text-xs font-mono text-theme-muted flex-shrink-0 pt-1">
                                    {selected.date}
                                </span>
                            </div>
                            <p className="text-sm leading-relaxed text-theme-muted mb-4">
                                {selected.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {selected.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 border border-theme text-theme-muted"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}