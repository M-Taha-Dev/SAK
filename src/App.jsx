import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import VisionMission from "./pages/VisionMission";
import Products from "./pages/Products";
import Industries from "./pages/Industries";
import Sustainability from "./pages/Sustainability";
import Team from "./pages/Team";
import News from "./pages/News";
import Contact from "./pages/Contact";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/vision-mission" element={<VisionMission />} />
          <Route path="/products" element={<Products />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/team" element={<Team />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function AppInner() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0a0f1a] transition-colors duration-300">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppInner />
      </BrowserRouter>
    </ThemeProvider>
  );
}
