import React, { useState } from "react";
import { ChevronDown, FileText } from "lucide-react";
import EventsImage from "@/assets/stock_photos/Events_Ampi_Stock.jpg";

import RunningMeetingPdf from "@/assets/outreach/20260512-Class Notes-Running a Meeting Effectively.pdf";
import PublicFinancePdf from "@/assets/papers_projects_pdfs/events_outreach/Public Finance & Banking-vf.pdf";
import PersuasionPdf from "@/assets/papers_projects_pdfs/events_outreach/Persuasion & Advocacy-vf.pdf";
import SCCAImage from "@/assets/stock_photos/Z-SCCAImage.jpg";


//events and pdfs
const EVENTS = [
    {
        date: "June 2026", 
        title: "Running a Meeting Effectively", 
        org: "Arizona Boys State",
        org_website: "https://azboystate.com/",
        role: "Instructor", 
        location: "Tucson, Arizona", 
        topic: "Robert's Rules of Order & Running a Caucus",
        pdfUrl: RunningMeetingPdf,
        comments: "Designed to equip emerging leaders with the tools for seamless parliamentary governance, this workshop provided a comprehensive walkthrough of formal meeting management. Attendees mastered the fundamentals of Robert's Rules of Order—from floor motions and point-of-order protocols to voting mechanics—alongside strategic techniques for facilitating dynamic, fast-paced caucuses. Through practical governance scenarios, participants learned how to maintain order, encourage balanced debate, and drive group consensus efficiently. Attendees walked away with the confidence and procedural clarity needed to run structured, impactful meetings in any formal setting.",
    },
    {
        date: "March 2026", 
        title: "Career Development Series: AI & Technology", 
        org: "State Street",
        org_website: "https://www.statestreet.com/us/en",
        role: "Moderator", 
        location: "New York, NY", 
        topic: "AI Literacy & Productivity, Emerging Skills, Roles and Careers, Ethics and Responsibility",
        pdfUrl: "",
        comments: "Hosted three senior professionals (Linghang Ying, Travis Whitmore, and Austin Parker) and designed a fireside chat to help ambitious professionals navigate an evolving digital landscape, this session explored how artificial intelligence is reshaping modern career trajectories and how AI works. Attendees gained practical insights on leveraging AI tools, identifying emerging industry trends, how professionals are leveraging it across every facit of the bank, how to encourage ethical use of AI, and positioning their skill sets for maximum impact. Through strategic guidance and actionable takeaways, participants learned how to adapt to technological shifts and stand out in tech-driven fields. Attendees walked away with a clear playbook to future-proof their careers and confidently lead in the workforce of tomorrow.",
    },
    {
        date: "Spring 2026", 
        title: "Networking Series", 
        org: "Financial Quants & Engineers (FQE)", 
        org_website: "https://baruchfqe.github.io/",
        role: "Co-Host", 
        location: "New York, NY", 
        topic: "How to Network & Hosting Industry Professionals",
        pdfUrl: "",
        comments: "Designed to bridge the gap between rising talent and established leaders, this workshop focused on mastering the art of professional networking and successfully hosting industry guests. Attendees gained practical strategies for initiating meaningful outreach, moderating engaging speaker sessions, and maintaining authentic, long-term connections. Through real-world examples, participants learned how to navigate high-stakes professional environments with confidence and poise. Attendees walked away with an actionable framework to elevate their networking skills and host impactful events.",
    },
    {
        date: "Fall 2025", 
        title: "Education Series", 
        org: "Financial Quants & Engineers (FQE)", 
        org_website: "https://baruchfqe.github.io/",
        role: "Co-Host", 
        location: "New York, NY", 
        topic: "Quantitative Finance Topics",
        pdfUrl: "",
        comments: "Developed and delivered structured educational sessions for Financial Quants & Engineers (FQE), introducing team members to core quantitative finance concepts, advanced mathematical techniques, and effective technical presentation practices. Designed instructional materials and facilitated discussions to strengthen analytical rigor, technical proficiency, and communication skills across the team.",
    },
    {
        date: "June 2025", 
        title: "Public Finance & Banking", 
        org: "Arizona Boys State",
        org_website: "https://azboystate.com/",
        role: "Instructor", 
        location: "Tucson, Arizona", 
        topic: "Public Finance and the Role of the Treasury",
        pdfUrl: PublicFinancePdf,
        comments: "Led coursework on public finance and banking fundamentals, covering government budgeting, financial institutions, and capital markets, with an emphasis on applied analysis and real-world policy and market dynamics.",
    },
    {
        date: "June 2024", 
        title: "Persuasion & Advocacy", 
        org: "Arizona Boys State",
        org_website: "https://azboystate.com/",
        role: "Instructor", 
        location: "Flagstaff, Arizona", 
        topic: "Methods of Persuasion and Advocacy Roles Within the Current Market",
        pdfUrl: PersuasionPdf,
        comments: "Delivered intensive instruction on persuasive communication, advocacy strategy, and message framing in a seminar-style academic setting, guiding participants through practical exercises in argument development, public speaking, and policy advocacy.",
    },
    {
        date: "September 2023", 
        title: "2023 New Consultant Orientation", 
        org: "FTI Consulting", 
        org_website: "https://www.fticonsulting.com/",
        role: "Instructor", 
        location: "Chantilly, Virginia", 
        topic: "Corporate Finance & Restructuring Case Study & Performance Improvement Case Study",
        pdfUrl: "",
        comments: "Developed and delivered two comprehensive case studies as part of new consultant orientation. Led end-to-end analysis and presentation of a specialty retail vendor turnaround, including 13-week cash flow modeling, comparable company analysis, and performance improvement recommendations, instructing and engaging 100+ incoming consultants. Advised a cohort of 15 new consultants on contract-level profitability analysis for a professional services firm and guided the presentation of findings identifying key drivers of declining segment margins.",
    },
    {
        date: "January 2023", 
        title: "FTI Consulting Recruiting @ ASU", 
        org: "Hispanic Organization for Leadership & Advancement", 
        role: "Host", 
        org_website: "https://www.fticonsulting.com/",
        location: "Tempe, Arizona", 
        topic: "More about FTI Consulting and the five independent departments",
        pdfUrl: "",
        comments: "Hosted an undergraduate recruiting session with four ASU undergraduate clubs: Financial Management Association, Supply Chain Management Association, New Venture Group (Consulting Club), and ALPFA, in coordination with HOLA (Hispanic Organization for Leadership & Advancement) at FTI Consulting. Delivered an overview of FTI’s five divisions and core product offerings to educate students on management consulting career paths and firm capabilities.",
    },
];

// Outreach organized by organization
const OUTREACH_ORGS = [
    {
        org: "Arizona Boys State, American Legion",
        role: "Senior Counselor & Instructor",
        since: "2022 - Present",
        entries: [
            "Lead counselors in managing daily meetings and program operations for 30+ sessions at the week-long civics camp. Develop and deliver instructional activities, including speeches, engagement programs, and fitness sessions, while tracking participation trends to inform operational decisions. Advise the board on strategic initiatives, including camp location selection between Flagstaff and Tucson. Due to my professional experience, I am involved with these committees:",
            "Operations & Personnel Committee: This committee is responsible for the overall execution of the programs, ensuring smooth daily operations, effective staffing, and engagement of all participants. It develops key operational materials, including the caucuses, elections, and others, to standardize processes and facilitate an organized and engaging experience for attendees.",
            "Finance Committee: The Finance Committee oversees budgeting, expense management, and financial planning for Boys State Organization. Its goal is to ensure the program remains fiscally responsible while maintaining operational quality, balancing resources across activities, staffing, and programmatic needs.",
            "Contracts & Strategic Planning Committee: This committee evaluates vendor agreements, contracts, and long-term initiatives to optimize program logistics and sustainability. Its focus is on aligning strategic decisions, such as site selection and vendor partnerships, with the organization’s long-term objectives and operational efficiency."
        ],
    },
    {
        org: "Arizona Boys State, American Legion",
        role: "Junior Counselor",
        since: "2018 - 2022",
        entries: [
            "Assisted senior staff in leading daily sessions and logistical activities for a week-long civics camp. Provided support during structured programs including fitness, team-building, and civic engagement exercises, while monitoring participant progress and attendance to ensure smooth operation.",
        ],
    },
    {
        org: "Latin American Professionals Group, State Street",
        role: "Commerce Committee Member",
        since: "2024 - Present",
        entries: [
            "Serve on the Commerce Committee of the Latin American Professionals Network, supporting initiatives focused on professional development, business engagement, and economic empowerment. Contribute to the planning and execution of commerce-focused programming, partnerships, and networking events designed to connect members with industry leaders and business opportunities.",
            "Assist in organizing networking events and workshops to foster professional growth and industry connections.",
            "Support strategic partnerships with businesses and community organizations to enhance member engagement and resources.",
            "Develop and implement programs aimed at economic empowerment and skill-building for Latin American professionals.",
        ],
    },
    {
        org: "Hispanic Organization for Latino Advancement (HOLA), FTI Consulting",
        role: "Administrative Team Member",
        since: "2024 - Present",
        entries: [
            "Designed to foster community, professional growth, and cultural engagement, this role focused on driving operations and membership for the Hispanic Organization for Latino Advancement (HOLA) administrative team. Responsibilities included spearheading event creation and ensuring a consistent quarterly calendar of programming that kept members active and engaged. Additionally, targeted recruitment efforts helped expand the organization's reach and welcome new talent into the community. Through these initiatives, the team successfully cultivated a vibrant, connected, and rapidly growing professional network.",
            "Executive Event Planning: Spearheaded end-to-end event strategy and logistics for the Hispanic Organization for Latino Advancement (HOLA) to deliver high-impact executive programming. From hosting senior industry leaders to managing seamless quarterly rollouts, these initiatives drove meaningful professional development and strengthened community engagement across the firm.",
            "Networking: Actively built and sustained strong internal networks within the Hispanic Organization for Latino Advancement (HOLA) to foster peer-to-peer engagement and professional development. Facilitated impactful connections, mentorship opportunities, and collaborative outreach to champion inclusive community growth across the firm..",
            "Recruiting: Drove targeted outreach and recruitment initiatives to attract diverse talent and expand employment at FTI Consulting. Championed strategic engagement efforts that welcomed new professionals into the community and strengthened the group's firm-wide presence.",
        ],
    },
];

// Extracurricular organizations
const EXTRACURRICULAR = [
    {
        org: "Sports Car Club of America (SCCA)",
        role: "Competitor / Member",
        image: SCCAImage,
        description: " The Sports Car Club of America (SCCA) is a non-profit American automobile club and sanctioning body supporting Autocross, Rallycross, HPDE, Time Trial, Road Racing, RoadRally, and Hill Climbs in the United States. Formed in 1944, it runs many programs for both amateur and professional racers.",
    },
    {
        org: "Horological Society of New York (HSNY)",
        role: "Member",
        image: "https://robbreport.com/wp-content/uploads/2026/02/horological-society-new-york-gala1.jpg",
        description: "The Horological Society of New York (HSNY) is an American nonprofit organization dedicated to advancing the art and science of horology.",
    },
];

function PdfViewer({ pdfUrl }) {
    const [open, setOpen] = useState(false);

    if (!pdfUrl) return null;

    return (
        <div className="mt-4">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase font-semibold transition-opacity hover:opacity-70"
                style={{ color: "rgb(212,175,55)" }}
            >
                <FileText size={12} />
                {open ? "Hide" : "View"} PDF Presentation
                <ChevronDown size={11} style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
            </button>
            {open && (
                <div className="mt-4 w-full bg-black/20 overflow-hidden rounded-sm border border-theme" style={{ height: "60vh", minHeight: "400px", maxWidth: "800px" }}>
                    <iframe
                        src={`${pdfUrl}#toolbar=0&navpanes=0`}
                        title="PDF Presentation"
                        className="w-full h-full border-none"
                    />
                </div>
            )}
        </div>
    );
}

export default function Events() {
    return (
        <>
            <section className="relative bg-dark-panel border-b overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="absolute inset-0">
                    <img src={EventsImage} alt="" className="w-full h-full object-cover object-center opacity-50" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.2) 100%)" }} />
                </div>
                <div className="relative z-10" style={{ paddingTop: "clamp(5rem,10vw,9rem)", paddingBottom: "clamp(3rem,6vw,5rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/40 mb-3">Insights</p>
                    <h1 className="font-heading font-bold text-white leading-[1.05]" style={{ fontSize: "clamp(2.2rem,5vw,4.5rem)" }}>Events & Outreach</h1>
                    <p className="mt-5 text-base md:text-lg leading-relaxed text-white/60">
                        A selection of talks, conferences, panels, workshops, and outreach activities across academic, industry, and community settings. These engagements reflect my interest in sharing ideas, participating in broader conversations, and supporting initiatives that connect people to new insights, skills, and opportunities. I’ve contributed in a mix of roles—from speaker to organizer to moderator—each offering a chance to learn, collaborate, and engage with diverse audiences.
                    </p>
                </div>
            </section>

            {/* Speaking */}
            <section className="border-b border-theme" style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(3rem,7vw,6rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    <div className="lg:col-span-3">
                        <p className="text-sm font-bold tracking-[0.15em] uppercase text-theme">Speaking</p>
                        <p className="text-xs mt-3 leading-relaxed text-theme-muted">Keynotes, panels, and lectures at leading finance and technology forums.</p>
                    </div>
                    <div className="lg:col-span-9 space-y-0">
                        {EVENTS.map((e, i) => (
                            <div key={i} className="flex flex-col md:flex-row gap-4 md:gap-8 py-6 border-b border-theme">
                                <span className="text-xs font-mono tracking-widest text-theme-muted flex-shrink-0 md:w-24 pt-0.5">{e.date}</span>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between gap-4 flex-wrap mb-1">
                                        <h3 className="font-heading font-semibold text-base text-theme">{e.title}</h3>
                                        <span className="text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 border border-theme text-theme-muted flex-shrink-0">{e.role}</span>
                                    </div>
                                    <a className="text-sm font-semibold text-theme mb-1" href={e.org_website}>{e.org}</a>
                                    <p className="text-xs text-theme-muted mb-2">{e.location}</p>
                                    <p className="text-sm text-theme-muted italic mb-3">"{e.topic}"</p>
                                    <p className="text-sm text-theme-muted leading-relaxed mb-1">{e.comments}</p>
                                    <PdfViewer pdfUrl={e.pdfUrl} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Outreach & Service */}
            <section className="border-b border-theme" style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(3rem,7vw,6rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    <div className="lg:col-span-3">
                        <p className="text-sm font-bold tracking-[0.15em] uppercase text-theme">Outreach & Service</p>
                        <p className="text-xs mt-3 leading-relaxed text-theme-muted">Academic mentorship, non-profit advisory, and community engagement.</p>
                    </div>
                    <div className="lg:col-span-9 space-y-0">
                        {OUTREACH_ORGS.map((item, i) => (
                            <div key={i} className="py-8 border-b border-theme">
                                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1 md:gap-4 mb-3">
                                    <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4">
                                        <h3 className="font-heading font-semibold text-base text-theme">{item.org}</h3>
                                        <span className="text-[10px] tracking-[0.15em] uppercase flex-shrink-0" style={{ color: "rgb(212,175,55)" }}>{item.role}</span>
                                    </div>
                                    <span className="text-xs font-mono text-theme-muted flex-shrink-0">{item.since}</span>
                                </div>
                                
                                {item.entries && item.entries.length > 0 && (
                                    <>
                                        <p className="text-sm leading-relaxed text-theme-muted mb-3">
                                            {item.entries[0]}
                                        </p>
                                        
                                        {item.entries.length > 1 && (
                                            <ul className="space-y-2">
                                                {item.entries.slice(1).map((entry, j) => (
                                                    <li key={j} className="flex items-start gap-2.5 text-sm text-theme-muted">
                                                        <span style={{ color: "rgb(212,175,55)" }} className="mt-1.5 flex-shrink-0">—</span>
                                                        {entry}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Extracurricular */}
            <section style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(4rem,8vw,7rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    <div className="lg:col-span-3">
                        <p className="text-sm font-bold tracking-[0.15em] uppercase text-theme">Extracurricular</p>
                        <p className="text-xs mt-3 leading-relaxed text-theme-muted">Organizations and pursuits outside of professional practice related to personal enjoyment.</p>
                    </div>
                    <div className="lg:col-span-9 space-y-0">
                        {EXTRACURRICULAR.map((item, i) => (
                            <div key={i} className="py-8 border-b border-theme">
                                {item.image && (
                                    <div className="w-full h-48 md:h-64 overflow-hidden mb-5 rounded-sm">
                                        <img src={item.image} alt={item.org} className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 mb-2">
                                    <h3 className="font-heading font-semibold text-base text-theme">{item.org}</h3>
                                    <span className="text-[10px] tracking-[0.15em] uppercase flex-shrink-0" style={{ color: "rgb(212,175,55)" }}>{item.role}</span>
                                </div>
                                <p className="text-sm leading-relaxed text-theme-muted">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}