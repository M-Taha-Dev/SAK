import { Link } from "react-router-dom";
import { Phone, MapPin } from "lucide-react";
import { company } from "../data/content";
import logo from "../assets/t_logo.webp";
// import logoWhite from "../assets/logo.png";



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

        {/* Offices */}
        <div className="border-t border-gray-200 dark:border-green-900/20 pt-8 pb-4">
          <p className="text-gray-900 dark:text-white font-semibold text-sm mb-5 tracking-wide uppercase">Our Offices</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {company.offices.map((o) => (
              <div key={o.city}>
                <p className="text-green-700 dark:text-green-400 text-xs font-semibold uppercase tracking-wider mb-1.5">{o.city}</p>
                {o.address && (
                  <div className="flex items-start gap-1.5 text-gray-500 dark:text-gray-400 text-xs mb-1">
                    <MapPin className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                    {o.address}
                  </div>
                )}
                {(o.phone || o.cell) && (
                  <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-xs">
                    <Phone className="w-3.5 h-3.5 text-green-600 shrink-0" />
                    {o.phone && o.cell ? `${o.phone} | ${o.cell}` : o.phone || o.cell}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-green-900/20 pt-6 flex items-center justify-center">
          <p className="text-gray-400 dark:text-gray-500 text-xs">
            © {new Date().getFullYear()} SAK Speciality Chemicals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
