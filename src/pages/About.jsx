import React from "react";
import { Mail, MapPin, Linkedin, Github } from "lucide-react";
import Landscape from "@/src/assets/1920x1080-Landscape.JPG";



const SECTIONS = [
    {
        id: "endeavors",
        label: "Current Endeavors",
        content: [
            "I am currently an Assistant Vice President in State Street’s Alternative Investments Business Transformation team, where I focus on managing and optimizing the intersection of people, processes, and technology across private equity, hedge funds, and other alternative investment platforms. In this role, I work closely with internal and external stakeholders to analyze, design, and implement operational improvements that enhance efficiency, reduce risk, and support scalable, client-facing solutions. My responsibilities span the full spectrum of transformation work: identifying and deploying process improvements, gathering and interpreting end-user requirements, collaborating with internal developers to deliver tailored solutions, and leading workshops to communicate complex operational models to diverse teams. The role requires balancing multiple priorities, applying creative problem-solving to complex operational challenges, and driving meaningful outcomes under tight timelines—all while ensuring compliance with regulatory and internal policy frameworks.",
            "Alongside my professional work, I am pursuing advanced mathematics studies at Baruch College. My coursework focuses on probability, statistics, linear algebra, and computer science, motivated by the goal of strengthening my quantitative and analytical foundation to inform systematic investment strategies, financial modeling, and data-driven decision-making. These studies complement my professional work by providing a rigorous theoretical framework for understanding risk, constructing models, and interpreting complex financial data.",
            "In addition, I am actively involved with the Financial Quants and Engineers (FQE) community, where I collaborate with peers on quantitative finance projects, algorithmic trading research, and computational finance initiatives. This engagement allows me to apply mathematical concepts to practical financial problems, exchange ideas with fellow enthusiasts, and explore emerging methodologies in quantitative research. Collectively, my professional, academic, and extracurricular endeavors reflect a commitment to continuous learning, technical rigor, and translating theory into actionable solutions in the alternative investments space."
        ],
    },
    {
        id: "experience",
        label: "Previous Experience",
        content: [
            "Prior to my current role, I was a consultant at FTI Consulting within the Corporate Finance & Restructuring practice. There, I advised clients on performance improvement, restructuring initiatives, and transaction-related projects, contributing to over $55 million in identified and implemented cost savings. In addition to client work, I participated in recruiting, new-hire onboarding and training, and internal initiatives focused on diversity and inclusion, which honed both my leadership and organizational skills in high-pressure, results-driven environments.",
            <>
                During my undergraduate studies, I conducted research under{" "}
                <a className="text-primary hover:underline" href="https://search.asu.edu/profile/825492" target="_blank" rel="noopener noreferrer">
                    Professor Sunil Wahal
                </a>{" "}
                on <i>R&D, Expected Profitability, and Expected Returns</i>, (
                <a className="text-primary hover:underline" href="https://path-to-your-paper.com" target="_blank" rel="noopener noreferrer">
                    Goyal, Wahal - 2023
                </a>
                ). In this project, I analyzed how corporate R&D expenditures predict future cash-based operating profitability and the implications for expected stock returns. My work involved gathering and cleaning firm-level financial and R&D data, constructing operating profitability factors, and implementing regression analyses to examine relationships between R&D intensity and expected returns. Through this research, I helped confirm that high R&D firms exhibit positive loadings on a cash-based operating profitability factor while showing zero alphas, and demonstrated that capitalizing R&D into book values is unnecessary for asset pricing when expected profitability is explicitly incorporated. This experience honed my quantitative modeling skills, empirical research methodology, and ability to translate complex financial concepts into actionable insights.
            </>,
            "I have additional experience in estate planning and business law as a legal assistant.",
        ],
    },
    {
        id: "academic",
        label: "Academic Background",
        content: [
            "I hold a dual degree in Finance and Supply Chain Management from Arizona State University, where I graduated summa cum laude and was recognized as a Jack D. Furst Honors Scholar (2022). My academic training provided a rigorous foundation in both financial theory and operational strategy. In finance, I developed expertise in financial analysis, valuation, capital markets, portfolio management, and corporate finance, gaining experience with tools such as LBO, DCF, Comparable Company, and Precedent Transaction analyses. In supply chain management, I focused on process optimization, logistics, operations strategy, and sustainable practices, learning to integrate quantitative methods with strategic decision-making to improve organizational efficiency and resilience.",
            <>
                Concurrently, I was actively engaged with the Student Investment Management Fund & Portfolio Engineering under{" "}
                <a className="text-primary hover:underline" href="https://swahal.github.io/" target="_blank" rel="noopener noreferrer">
                    Professor Sunil Wahal
                </a>{" "}
                and{" "}
                <a className="text-primary hover:underline" href="https://www.boguth.org/" target="_blank" rel="noopener noreferrer">
                    Professor Oliver Boguth
                </a>
                , analyzing retail investor activity and implementing methodologies inspired by <i>Tracking Retail Investor Activity</i> (Ekkehart Boehmer et al.), evaluating the predictive power of retail order imbalances for short-term equity performance.
            </>,
            <>
                I also completed my honors thesis under{" "}
                <a className="text-primary hover:underline" href="https://search.asu.edu/profile/192622" target="_blank" rel="noopener noreferrer">
                    Professor Mark Simonson
                </a>
                , producing a comprehensive valuation and pitchbook of Footlocker, Inc., employing LBO, DCF, Comparable Company, and Precedent Transaction analyses.
            </>,
            "I further strengthened my practical skills and competitive edge through participation in multiple case competitions. Notably, I earned second place in the Dell Case Competition for sustainable supply chain management, demonstrating my ability to apply analytical frameworks and strategic insights to real-world operational challenges. Additional competitions provided exposure to corporate strategy, financial modeling, and cross-functional teamwork, reinforcing both my technical capabilities and leadership skills.",
            "Collectively, my education combined rigorous theoretical training, applied research, and practical investment and operational experience, equipping me to approach complex business and financial problems with analytical precision, strategic insight, and creativity.",
            "I spent two years at Case Western Reserve University studying Cognitive Science and English, minoring in Computer Science."
        ],
    },
    {
        id: "interests",
        label: "Personal Interests",
        content: [
            "Outside of work and academics, I pursue activities that challenge both mind and body. I am an avid participant in motorsports and distance running, disciplines that sharpen focus, endurance, and discipline. I also enjoy testing my knowledge through trivia competitions, which feed my curiosity and appreciation for learning across diverse subjects.",
            "In addition to personal hobbies, I am a devoted pet owner to a Yorkshire Terrier, who provides companionship, balance, and perspective amid busy professional and academic schedules. These interests allow me to cultivate resilience, creativity, and a sense of play, complementing my professional and scholarly pursuits."
        ],
    },
    {
        id: "contact",
        label: "How to Contact",
        content: [
            <>
                I am always happy to network, I welcome thoughtful conversations related to quantitative finance, mathematics, markets, or lifelong learning. Feel free to reach out by email to{" "}
                <a className="text-primary hover:underline" href="mailto:atilly@statestreet.com">
                    atilly@statestreet.com
                </a>{" "}
                or{" "}
                <a className="text-primary hover:underline" href="mailto:agtaz19@gmail.com">
                    agtaz19@gmail.com
                </a>
                .
            </>
        ]
    },
];

const TIMELINE = [
    {
        year: "2024 - Present",
        items: [
            { 
                role: "B.S. Applied Mathematics", 
                org: "Baruch College", 
                note: "Pursuing advanced study in Mathematics while participating in the Financial Quants & Engineers (FQE) organization, developing quantitative modeling, data analysis, and computational skills applicable to finance and investment decision-making." 
            },
            { 
                role: "Assistant Vice-President", 
                org: "State Street - Alternative Investments Business Transformation", 
                note: "Promoted from Officer, lead initiatives at the intersection of operations, data, and technology to optimize alternative investment processes, develop quantitative models, and enable data-driven decision-making across institutional investment platforms." 
            }
        ]
    },
    {
        year: "2022 - 2024",
        items: [
            { 
                role: "Consultant, Corporate Finance & Restructuring", 
                org: "FTI Consulting", 
                note: "Advised clients on operational and strategic challenges by analyzing complex data, modeling business processes, and designing solutions to improve efficiency, risk management, and decision-making." 
            },
        ]
    },
    {
        year: "2019 - 2022",
        items: [
            { 
                role: "B.S. Finance & Supply Chain Management", 
                org: "Arizona State University", 
                note: "Combined Finance and Supply Chain Management studies with active participation in related student organizations, applying quantitative analysis, financial modeling, and operational problem-solving to practical projects and case studies." 
            },
            { 
                role: "Research Analyst", 
                org: "Center for Investment Engineering, W.P. Carey School of Business", 
                note: "Applied statistical and computational methods to analyze financial markets, develop predictive models, and assess investment opportunities for the SIM Fund under the guidance of faculty researchers." 
            },
            { 
                role: "Student Investment Management (SIM) Fund", 
                org: "Department of Finance, W.P. Carey School of Business", 
                note: "Conducted quantitative analysis and financial modeling for the Student Investment Management (SIM) Fund, applying statistical methods and data-driven approaches to evaluate equities and inform systematic investment decisions." 
            },
            { 
                role: "Student Mentor", 
                org: "Barrett, the Honors College", 
                note: "Helped peers navigate academic and social challenges while cultivating leadership, collaboration, and problem-solving skills within the Honors College community." 
            },
            { 
                role: "Summer Financial Analyst", 
                org: "Intel Corporation", 
                note: "Conducted detailed financial analysis, including budgeting, forecasting, and variance evaluation, contributing to operational and strategic insights across business units." 
            },
            { 
                role: "Private Equity Analyst, Intern", 
                org: "Transcend Healthcare Partners", 
                note: "Supported the private equity team with financial modeling, industry research, and due diligence on healthcare investment opportunities, gaining exposure to valuation methodologies, market dynamics, and deal evaluation processes." 
            },
            { 
                role: "Investment Analyst, Intern", 
                org: "Anodize Capital Partners", 
                note: "Gained early exposure to investment analysis through research, valuation work, and participation in the investment evaluation process." 
            },
            { 
                role: "Legal Assistant", 
                org: "Forakis Law Firm", 
                note: "Contributed to day-to-day legal operations through research, document drafting, and administrative support across active cases." 
            },
        ]
    },
    {
        year: "2017 - 2018",
        items: [
            { 
                role: "B.A. Cognitive Science & B.A. English, minor Computer Science", 
                org: "Case Western Reserve University, School of Arts & Sciences", 
                note: "Pursued interdisciplinary coursework in cognitive science, English, and computer science while participating in The Athenian satirical journal, ultimate frisbee, and pre-law organizations. My academic focus centered on formalizing models of human decision-making by integrating cognitive theory, linguistic analysis, and computational methods, with particular interest in applications to law and institutional decision systems." 
            },
            { 
                role: "Residential Assistant", 
                org: "Case Western Reserve University, Office of Student Life<", 
                note: "Served as a residential assistant supporting student development, community standards, and residential operations, with a focus on mentorship, conflict resolution, and student well-being." 
            }
        ]
    },
    {
        year: "Prior to 2017",
        items: [
            { 
                role: "Growing Up", 
                org: "Arizona", 
                note: "Pursued interdisciplinary coursework in cognitive science, English, and computer science while participating in The Athenian satirical journal, ultimate frisbee, and pre-law organizations. My academic focus centered on formalizing models of human decision-making by integrating cognitive theory, linguistic analysis, and computational methods, with particular interest in applications to law and institutional decision systems." 
            }
        ]
    }
];

export default function About() {
    return (
        <>
            {/* Hero */}
            <section className="relative bg-dark-panel border-b overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="absolute inset-0">
                    <img src={Landscape} alt="Landscape Portrait" className="w-full h-full object-cover object-center opacity-50" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.2) 100%)" }} />
                </div>
                <div className="relative z-10" style={{ paddingTop: "clamp(5rem,10vw,9rem)", paddingBottom: "clamp(3rem,6vw,5rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/40 mb-3">Who I Am</p>
                    <h1 className="font-heading font-bold text-white leading-[1.05]" style={{ fontSize: "clamp(2.2rem,5vw,4.5rem)" }}>About Me</h1>
                    <p className="mt-5 text-base md:text-lg leading-relaxed text-white/60">
                        Applied mathematician, financial engineer, and life-long student. Based in New York.
                    </p>
                </div>
            </section>

            {/* Background + sub-sections */}
            <section className="border-b border-theme" style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(3rem,7vw,6rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                <div className="flex justify-center mb-10">
                    <img 
                        src="@/assets/portrait.JPG" 
                        alt="Profile picture" 
                        className="w-56 h-56 md:w-72 md:h-72 rounded-full object-cover" 
                    />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    <div className="lg:col-span-3">
                        <p className="text-sm font-bold tracking-[0.15em] uppercase text-theme">My Background</p>
                    </div>
                    <div className="lg:col-span-9 space-y-5">
                        <p className="font-heading font-medium leading-[1.4] text-theme" style={{ fontSize: "clamp(1.2rem,2.2vw,1.7rem)" }}>
                            I build the models that move capital and the frameworks that shape market strategies.
                        </p>
                        {/* max-w-2xl removed below to match the dynamic sections width */}
                        <p className="text-sm leading-relaxed text-theme-muted">
                            My career sits at the intersection of mathematics, markets, and executive decision-making. I trained both in executive operations and as an applied mathematician before spending years inside of boutique strategy firms and hedge funds — working on problems that don't have textbook answers.
                        </p>
                    </div>
                </div>

                <div className="mt-14 space-y-10">
                    {SECTIONS.map((sec) => (
                        <div key={sec.id} className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-16">
                            <div className="lg:col-span-3">
                                <p className="text-xs font-semibold tracking-[0.25em] uppercase text-theme-muted">{sec.label}</p>
                            </div>
                            <div className="lg:col-span-9">
                                {sec.id === "contact" ? (
                                    <div className="space-y-4">
                                        {sec.content.map((line, i) => (
                                            <p key={i} className="text-sm leading-relaxed text-theme-muted">{line}</p>
                                        ))}
                                        <div className="space-y-3 pt-1">
                                            <a href="https://www.linkedin.com/in/alexandre-tilly/" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-theme-muted hover:opacity-70 transition-opacity">
                                                <Linkedin size={14} style={{ color: "rgb(212,175,55)" }} />
                                                linkedin.com/in/alexandre-tilly
                                            </a>
                                            <a href="https://github.com/agtaz19" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-theme-muted hover:opacity-70 transition-opacity">
                                                <Github size={14} style={{ color: "rgb(212,175,55)" }} />
                                                github.com/agtaz19
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-2.5">
                                        {sec.content.map((line, i) => (
                                            <p key={i} className="text-sm leading-relaxed text-theme-muted">{line}</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Timeline */}
            <section className="border-b border-theme" style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(3rem,7vw,6rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    <div className="lg:col-span-3">
                        <p className="text-sm font-bold tracking-[0.15em] uppercase text-theme">My Timeline</p>
                    </div>
                    <div className="lg:col-span-9">
                        <div className="space-y-0">
                            {TIMELINE.map((section, i) => (
                                <div key={i} className="flex flex-col md:flex-row gap-4 md:gap-8 py-6 border-b border-theme last:border-b-0">
                                    <span className="text-xs font-mono tracking-widest text-theme-muted flex-shrink-0 md:w-36 pt-0.5">
                                        {section.year}
                                    </span>
                                    <div className="space-y-8 flex-1">
                                        {section.items.map((item, j) => (
                                            <div key={j}>
                                                <p className="font-heading font-semibold text-base text-theme">{item.role}</p>
                                                <p className="text-xs tracking-[0.1em] uppercase mt-0.5 mb-2" style={{ color: "rgb(212,175,55)" }}>
                                                    {item.org}
                                                </p>
                                                <p className="text-sm leading-relaxed text-theme-muted">{item.note}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Embedded CV */}
            <section style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(4rem,8vw,7rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    <div className="lg:col-span-3">
                        <p className="text-sm font-bold tracking-[0.15em] uppercase text-theme">Curriculum Vitae</p>
                        <p className="text-xs mt-3 leading-relaxed text-theme-muted">Full CV available below. Request a PDF copy by email.</p>
                        <a
                            href="mailto:agtaz19@gmail.com?subject=CV Request"
                            className="inline-block mt-4 text-xs tracking-[0.15em] uppercase font-semibold transition-opacity hover:opacity-60"
                            style={{ color: "rgb(212,175,55)" }}
                        >
                            Request PDF →
                        </a>
                    </div>
                    <div className="lg:col-span-9">
                        <div
                            className="w-full rounded-sm border border-theme overflow-hidden"
                            style={{ backgroundColor: "rgb(var(--bg-card))" }}
                        >
                            <iframe
                                src="src\assets\Tilly, Alexandre_CV.pdf"
                                title="Alexandre Tilly Curriculum Vitae"
                                className="w-full h-[600px] md:h-[800px] border-none"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}