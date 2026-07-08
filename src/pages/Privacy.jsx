import React from "react";

export default function Privacy() {
    return (
        <>
            <section className="bg-dark-panel border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <div style={{ paddingTop: "clamp(5rem,10vw,9rem)", paddingBottom: "clamp(3rem,6vw,5rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/40 mb-3">Legal</p>
                    <h1 className="font-heading font-bold text-white leading-[1.05]" style={{ fontSize: "clamp(2.2rem,5vw,4.5rem)" }}>Privacy Policy</h1>
                    <p className="mt-5 text-base md:text-lg leading-relaxed text-white/60 max-w-2xl">How data is collected, used, and protected.</p>
                </div>
            </section>
            <section style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(4rem,8vw,7rem)", paddingLeft: "var(--fluid-pad)", paddingRight: "var(--fluid-pad)" }}>
                <div className="max-w-3xl space-y-8">
                    {[
                        { title: "Information We Collect", body: "We collect only the information you voluntarily provide through inquiry forms, including your name, email address, organization, and message content. We do not collect browsing data, tracking cookies, or any form of personal information without your explicit consent." },
                        { title: "How We Use Your Information", body: "Information submitted through this site is used solely to respond to your inquiry and facilitate an engagement. We do not sell, rent, or share your personal information with any third parties for marketing or advertising purposes." },
                        { title: "Data Retention", body: "Inquiry data is retained for a period of 24 months following the close of any engagement, or 12 months following initial contact if no engagement is initiated. You may request deletion of your data at any time." },
                        { title: "Security", body: "All data transmitted through this site is encrypted via TLS. We employ industry-standard security practices to protect your information from unauthorized access, disclosure, alteration, or destruction." },
                        { title: "Contact", body: "For privacy-related questions, data deletion requests, or concerns, please contact us directly at the address listed in the footer." },
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