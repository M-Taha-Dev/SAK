import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "../assets/t_logo.webp";
// import logoWhite from "../assets/logo.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/vision-mission", label: "Vision & Mission" },
  { to: "/products", label: "Products" },
  { to: "/industries", label: "Industries" },
  { to: "/sustainability", label: "Sustainability" },
  { to: "/team", label: "Team" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-white/95 dark:bg-[#0a0f1a]/95 backdrop-blur-md border-gray-200 dark:border-green-900/30"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="SAK Speciality Chemicals" className="h-36 lg:h-42 w-auto object-contain dark:hidden" />
            {/* <img src={logoWhite} alt="SAK Speciality Chemicals" className="h-36 lg:h-42 w-auto object-contain hidden dark:block" /> */}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    isActive
                      ? "text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-400/10"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <Link
              to="/contact"
              className="hidden lg:inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-500 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-green-600/30"
            >
              Get in Touch
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-white/97 dark:bg-[#0d1520]/97 backdrop-blur-xl border-t border-gray-200 dark:border-green-900/30"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    className={({ isActive }) =>
                      `block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? "text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-400/10"
                          : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <div className="pt-2 pb-1">
                <Link
                  to="/contact"
                  className="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-500 rounded-lg transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
