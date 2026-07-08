import React from "react";

export default function Terms() {
    return (
        <>
            <section className="bg-dark-panel border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <div style={{ paddingTop: "clamp(5rem,10vw,9rem)", paddingBottom: "clamp(3rem,6vw,5rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/40 mb-3">Legal</p>
                    <h1 className="font-heading font-bold text-white leading-[1.05]" style={{ fontSize: "clamp(2.2rem,5vw,4.5rem)" }}>Terms of Engagement</h1>
                    <p className="mt-5 text-base md:text-lg leading-relaxed text-white/60 max-w-2xl">Governing terms for all advisory and consulting engagements.</p>
                </div>
            </section>
            <section style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(4rem,8vw,7rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                <div className="max-w-3xl space-y-8">
                    {[
                        { title: "Scope of Services", body: "All advisory, analytical, and consulting services are delivered under a mutually agreed Statement of Work (SOW). No services commence prior to the execution of a signed engagement letter and, where applicable, a Non-Disclosure Agreement." },
                        { title: "Confidentiality", body: "All information shared by clients in the context of an engagement is treated as strictly confidential. Deliverables, models, and methodologies developed under engagement are proprietary and may not be reproduced or distributed without written consent." },
                        { title: "Payment Terms", body: "Invoices are issued at engagement milestones as defined in the SOW. Payment is due within 14 calendar days of invoice date. Retainer engagements are invoiced monthly in advance." },
                        { title: "Intellectual Property", body: "All frameworks, models, and methodologies developed prior to or independent of an engagement remain the intellectual property of the advisor. Custom deliverables developed specifically for a client engagement are licensed exclusively to that client upon full payment." },
                        { title: "Limitation of Liability", body: "Advisory services constitute professional opinion informed by rigorous analysis. They do not constitute financial advice under any regulatory definition. The advisor's liability is limited to fees paid in the most recent engagement period." },
                        { title: "Governing Law", body: "These terms are governed by the laws of the State of New York. Any disputes shall be resolved through binding arbitration in New York County." },
                    ].map(s => (
                        <div key={s.title} className="border-b border-theme pb-8">
                            <h3 className="font-heading font-semibold text-xl text-theme mb-3">{s.title}</h3>
                            <p className="text-sm leading-relaxed text-theme-muted">{s.body}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}