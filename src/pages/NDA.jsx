import React from "react";

export default function NDA() {
    return (
        <>
            <section className="bg-dark-panel border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <div style={{ paddingTop: "clamp(5rem,10vw,9rem)", paddingBottom: "clamp(3rem,6vw,5rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/40 mb-3">Legal</p>
                    <h1 className="font-heading font-bold text-white leading-[1.05]" style={{ fontSize: "clamp(2.2rem,5vw,4.5rem)" }}>NDA Template</h1>
                    <p className="mt-5 text-base md:text-lg leading-relaxed text-white/60 max-w-2xl">Standard mutual non-disclosure agreement for all new engagements.</p>
                </div>
            </section>
            <section style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(4rem,8vw,7rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                <div className="max-w-3xl">
                    <p className="text-sm text-theme-muted leading-relaxed mb-8">
                        The following is a standard mutual non-disclosure agreement template used as the basis for all engagements. A customized version with party-specific details will be provided upon initiation of a formal engagement.
                    </p>
                    <div className="space-y-8">
                        {[
                            { title: "1. Definition of Confidential Information", body: `"Confidential Information" means any data or information, oral or written, that relates to a party's business, operations, strategy, financial condition, clients, or proprietary methodologies, and that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information and the circumstances of disclosure.` },
                            { title: "2. Obligations of Receiving Party", body: "Each party agrees to hold the other's Confidential Information in strict confidence, to use it solely for the purpose of evaluating or conducting a mutually agreed engagement, and not to disclose it to any third party without prior written consent." },
                            { title: "3. Exclusions", body: "Obligations under this Agreement do not apply to information that: (a) is or becomes publicly known through no breach of this Agreement; (b) was rightfully known to the receiving party prior to disclosure; (c) is independently developed by the receiving party; or (d) is required to be disclosed by law or court order." },
                            { title: "4. Term", body: "This Agreement is effective upon the date of first disclosure and shall remain in effect for a period of three (3) years, or for the duration of any active engagement plus two (2) years, whichever is longer." },
                            { title: "5. Governing Law", body: "This Agreement shall be governed by the laws of the State of New York, without regard to its conflict of law provisions." },
                        ].map(s => (
                            <div key={s.title} className="border-b border-theme pb-8">
                                <h3 className="font-heading font-semibold text-lg text-theme mb-3">{s.title}</h3>
                                <p className="text-sm leading-relaxed text-theme-muted">{s.body}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 p-6 border border-theme" style={{ backgroundColor: "rgb(var(--bg-card))" }}>
                        <p className="text-xs tracking-[0.15em] uppercase font-semibold text-theme-muted mb-2">Request a Signed NDA</p>
                        <p className="text-sm text-theme-muted leading-relaxed">
                            To initiate a formal engagement and receive a countersigned NDA, please use the contact form on the{" "}
                            <a href="/support" className="underline" style={{ color: "rgb(var(--accent))" }}>Support page</a>.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}