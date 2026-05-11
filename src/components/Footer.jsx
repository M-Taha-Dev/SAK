import { Link } from "react-router-dom";
import {  Mail, Phone, MapPin, User } from "lucide-react";
import { company } from "../data/content";
import logo from "../assets/t_logo.webp";
// import logoWhite from "../assets/logo.png";


const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const footerLinks = [
  {
    heading: "Company",
    links: [
      { to: "/about", label: "About Us" },
      { to: "/team", label: "Our Team" },
      { to: "/vision-mission", label: "Vision & Mission" },
      { to: "/sustainability", label: "Sustainability" },
      { to: "/news", label: "News" },
    ],
  },
  {
    heading: "Products",
    links: [
      { to: "/products", label: "Pre-Treatment" },
      { to: "/products", label: "Optical Brighteners" },
      { to: "/products", label: "Printing Auxiliaries" },
      { to: "/products", label: "Dyeing Auxiliaries" },
      { to: "/products", label: "Finishing Agents" },
    ],
  },
  {
    heading: "Industries",
    links: [
      { to: "/industries", label: "Textile" },
      { to: "/industries", label: "Denim" },
      { to: "/industries", label: "Lubricants (Threads)" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-[#060d14] border-t border-gray-200 dark:border-green-900/20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
                       <Link to="/" className="flex items-center">
                         <img src={logo} alt="SAK Speciality Chemicals" className="h-12 lg:h-36 w-auto object-contain dark:hidden" />
                       {/* <img src={logoWhite} alt="SAK Speciality Chemicals" className="h-12 lg:h-36 w-auto object-contain hidden dark:block" /> */}
                       </Link>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              {company.tagline}. Delivering world-class chemical formulations for the global textile industry since {company.founded}.
            </p>
            <div className="space-y-3">
              {company.offices.map((o) => (
                <div key={o.city} className="pt-2 border-t border-gray-200 dark:border-green-900/20 first:border-0 first:pt-0">
                  <p className="text-green-700 dark:text-green-400 text-[11px] font-semibold uppercase tracking-wider mb-1">{o.city}</p>
                  <div className="flex items-start gap-2 text-gray-500 dark:text-gray-400 text-xs mb-0.5">
                    <MapPin className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                    {o.address}
                  </div>
                  {o.poc && (
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mt-1 mb-0.5">
                      <User className="w-3.5 h-3.5 text-green-600 shrink-0" />
                      <span className="font-medium text-gray-600 dark:text-gray-300">{o.poc}</span>
                    </div>
                  )}
                  {o.pocEmail && (
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-0.5">
                      <Mail className="w-3.5 h-3.5 text-green-600 shrink-0" />
                      <a href={`mailto:${o.pocEmail}`} className="hover:text-green-600 dark:hover:text-green-400 transition-colors">{o.pocEmail}</a>
                    </div>
                  )}
                  {o.phone && (
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs">
                      <Phone className="w-3.5 h-3.5 text-green-600 shrink-0" />
                      {o.phone}{o.cell ? ` | ${o.cell}` : ""}
                    </div>
                  )}
                  {!o.phone && o.cell && (
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs">
                      <Phone className="w-3.5 h-3.5 text-green-600 shrink-0" />
                      {o.cell}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <a href={company.linkedin}
                className="w-9 h-9 rounded-lg bg-white dark:bg-[#162032] border border-gray-200 dark:border-green-900/30 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:border-green-400 dark:hover:border-green-600/50 transition-all"
                aria-label="LinkedIn">
                <LinkedinIcon />
              </a>
              <a href={company.facebook}
                className="w-9 h-9 rounded-lg bg-white dark:bg-[#162032] border border-gray-200 dark:border-green-900/30 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:border-green-400 dark:hover:border-green-600/50 transition-all"
                aria-label="Facebook">
                <FacebookIcon />
              </a>
            </div>
          </div>

          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h4 className="text-gray-900 dark:text-white font-semibold text-sm mb-4 tracking-wide uppercase">
                {col.heading}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 dark:border-green-900/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-400 dark:text-gray-500 text-xs">
            © {new Date().getFullYear()} SAK Speciality Chemicals. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="#" className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-xs transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-xs transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
