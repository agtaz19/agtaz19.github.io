/**
 * LanguageContext — Global language state
 * Persists in localStorage. Supported: en, fr, es, br (Breton)
 */
import React, { createContext, useContext, useState } from "react";

export const LANGUAGES = [
    { code: "en", label: "EN", full: "English" },
    { code: "fr", label: "FR", full: "Français" },
    { code: "es", label: "ES", full: "Español" },
    { code: "br", label: "BR", full: "Brezhoneg" },
];

// Translations — extend as needed
export const TRANSLATIONS = {
    en: {
        whoIAm: "Who I Am",
        support: "Insights",
        aboutMe: "About Me & CV",
        experience: "Work & Experience",
        publications: "Publications & Research",
        projects: "Projects",
        events: "Events & Outreach",
        blog: "Blog",
        resources: "Resources",
        contact: "Contact",
        legal: "Legal",
        privacyPolicy: "Privacy Policy",
        termsOfEngagement: "Terms of Engagement",
        ndaTemplate: "NDA Template",
        allRightsReserved: "All rights reserved",
        updated: "Updated",
        newYork: "New York, New York",
        linkedin: "LinkedIn",
        github: "GitHub",
        heroSubtitle: "Finance, consulting, and quantitative strategy at the highest level. Precision-driven solutions for complex markets and executive decisions.",
        weAre: "We are",
    },
    fr: {
        whoIAm: "Qui je suis",
        support: "Insights",
        aboutMe: "À propos & CV",
        experience: "Parcours & Expérience",
        publications: "Publications & Recherche",
        projects: "Projets",
        events: "Événements & Rayonnement",
        blog: "Blog",
        resources: "Ressources",
        contact: "Contact",
        legal: "Mentions légales",
        privacyPolicy: "Politique de confidentialité",
        termsOfEngagement: "Conditions d'engagement",
        ndaTemplate: "Modèle de NDA",
        allRightsReserved: "Tous droits réservés",
        updated: "Mis à jour",
        newYork: "New York, New York",
        linkedin: "LinkedIn",
        github: "GitHub",
        heroSubtitle: "Finance, conseil et stratégie quantitative au plus haut niveau. Des solutions de précision pour les marchés complexes et les décisions exécutives.",
        weAre: "Nous sommes des",
    },
    es: {
        whoIAm: "Quién soy",
        support: "Insights",
        aboutMe: "Sobre mí & CV",
        experience: "Trayectoria & Experiencia",
        publications: "Publicaciones & Investigación",
        projects: "Proyectos",
        events: "Eventos & Divulgación",
        blog: "Blog",
        resources: "Recursos",
        contact: "Contacto",
        legal: "Legal",
        privacyPolicy: "Política de privacidad",
        termsOfEngagement: "Términos de compromiso",
        ndaTemplate: "Plantilla de NDA",
        allRightsReserved: "Todos los derechos reservados",
        updated: "Actualizado",
        newYork: "Nueva York, Nueva York",
        linkedin: "LinkedIn",
        github: "GitHub",
        heroSubtitle: "Finanzas, consultoría y estrategia cuantitativa al más alto nivel. Soluciones de precisión para mercados complejos y decisiones ejecutivas.",
        weAre: "Somos",
    },
    br: {
        whoIAm: "Piv on-me",
        support: "Insights",
        aboutMe: "Diwar va zorn & CV",
        experience: "Labour & Skiant",
        publications: "Embannadurioù & Enklask",
        projects: "Raktresoù",
        events: "Darvoudoù & Titourance",
        blog: "Blog",
        resources: "Restadurioù",
        contact: "Darempred",
        legal: "Lezenn",
        privacyPolicy: "Politikerezh prevezded",
        termsOfEngagement: "Termenoù en em gavout",
        ndaTemplate: "Patrom NDA",
        allRightsReserved: "An holl gwirioù mireret",
        updated: "Hizivaet",
        newYork: "New York, New York",
        linkedin: "LinkedIn",
        github: "GitHub",
        heroSubtitle: "Finanç, konseil ha stratejiezh niverel d'ar gwellañ. Diskoulmañ reizh evit ar marc'hadoù klok ha an darvoudoù renerel.",
        weAre: "Omp",
    },
};

const LanguageContext = createContext({ lang: "en", setLang: () => {}, t: TRANSLATIONS.en });

export function LanguageProvider({ children }) {
    const [lang, setLangState] = useState(() => {
        try {
            return localStorage.getItem("portfolio-lang") || "en";
        } catch {
            return "en";
        }
    });

    const setLang = (code) => {
        setLangState(code);
        try {
            localStorage.setItem("portfolio-lang", code);
        } catch {}
    };

    const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}