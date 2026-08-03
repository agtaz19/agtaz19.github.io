import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./lib/PageNotFound";
import ScrollToTop from "./components/ScrollToTop";
import { ThemeProvider } from "@/lib/ThemeContext";
import { LanguageProvider } from "@/lib/LanguageContext";

// Page imports
import Home from "@/pages/Home";
import About from "@/pages/About";
import Experience from "@/pages/Experience";
import Publications from "@/pages/Publications";
import Projects from "@/pages/Projects";
import Events from "@/pages/Events";
import Blog from "@/pages/Blog";
import Resources from "@/pages/Resources";
import Archive from "@/pages/Archive";
import Images from "@/pages/Gallery";
import BlogPost from "@/pages/BlogPost";

// Layout (shared header + footer wrapper)
import Layout from "@/components/portfolio/Layout";

function App() {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <QueryClientProvider client={queryClientInstance}>
                    <Router>
                        <ScrollToTop />
                        <Routes>
                            {/* All pages share the Layout (Header + Footer) */}
                            <Route element={<Layout />}>
                                <Route path="/" element={<Home />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/experience" element={<Experience />} />
                                <Route path="/publications" element={<Publications />} />
                                <Route path="/projects" element={<Projects />} />
                                <Route path="/events" element={<Events />} />
                                <Route path="/blog" element={<Blog />} />
                                <Route path="/blog/:slug" element={<BlogPost />} />
                                <Route path="/resources" element={<Resources />} />
                                <Route path="/archive" element={<Archive />} />
                                <Route path="/gallery" element={<Images />} />
                            </Route>
                            <Route path="*" element={<PageNotFound />} />
                        </Routes>
                    </Router>
                    <Toaster />
                </QueryClientProvider>
            </LanguageProvider>
        </ThemeProvider>
    );
}

export default App;
