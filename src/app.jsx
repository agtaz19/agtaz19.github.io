import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./lib/PageNotFound";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import UserNotRegisteredError from "@/components/UserNotRegisteredError";
import ScrollToTop from "./components/ScrollToTop";
import { ThemeProvider } from "@/lib/ThemeContext";
import { LanguageProvider } from "@/lib/LanguageContext";

// Page imports
import Home from "@/pages/Home";
import Support from "@/pages/Support";
import About from "@/pages/About";
import Experience from "@/pages/Experience";
import Publications from "@/pages/Publications";
import Projects from "@/pages/Projects";
import Events from "@/pages/Events";
import Blog from "@/pages/Blog";
import Resources from "@/pages/Resources";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import NDA from "@/pages/NDA";
import Archive from "@/pages/Archive";
import Images from "@/pages/Images";
import BlogPost from "@/pages/BlogPost";

// Layout (shared header + footer wrapper)
import Layout from "@/components/portfolio/Layout";

const AuthenticatedApp = () => {
    const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

    if (isLoadingPublicSettings || isLoadingAuth) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-theme">
                <div className="w-8 h-8 border-4 border-theme-muted rounded-full animate-spin" style={{ borderTopColor: "rgb(var(--accent))" }}></div>
            </div>
        );
    }

    if (authError) {
        if (authError.type === "user_not_registered") {
            return <UserNotRegisteredError />;
        } else if (authError.type === "auth_required") {
            navigateToLogin();
            return null;
        }
    }

    return (
        <Routes>
            {/* All pages share the Layout (Header + Footer) */}
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/support" element={<Support />} />
                <Route path="/about" element={<About />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/publications" element={<Publications />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/events" element={<Events />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/nda" element={<NDA />} />
                <Route path="/archive" element={<Archive />} />
                <Route path="/images" element={<Images />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <LanguageProvider>
                    <QueryClientProvider client={queryClientInstance}>
                        <Router>
                            <ScrollToTop />
                            <AuthenticatedApp />
                        </Router>
                        <Toaster />
                    </QueryClientProvider>
                </LanguageProvider>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;