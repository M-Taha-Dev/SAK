import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FlaskConical, Droplets, Sparkles, Layers, Printer, Scissors } from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import { products } from "../data/content";

const iconMap = { FlaskConical, Droplets, Sparkles, Layers, Printer, Scissors };

export default function Products() {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeId, setActiveId] = useState(
    products.find((p) => p.id === tabParam)?.id ?? products[0].id
  );
  const active = products.find((p) => p.id === activeId);
  const Icon = iconMap[active.icon] || FlaskConical;

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-[#0a0f1a]">
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_rgba(22,163,74,0.1)_0%,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto text-center">
          <AnimatedSection>
            <span className="text-green-600 dark:text-green-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Our Portfolio</span>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-5">Products</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              A comprehensive portfolio of specialty chemicals covering every stage of textile wet processing, formulated for performance, consistency, and sustainability.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Tab Bar + Table */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 pb-20">
        <AnimatedSection>
          {/* Tabs */}
          <div className="flex flex-wrap gap-1 border-b border-gray-200 dark:border-green-900/30 mb-0">
            {products.map((p) => {
              const TabIcon = iconMap[p.icon] || FlaskConical;
              const isActive = p.id === activeId;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveId(p.id)}
                  className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-t-xl border-b-2 transition-all duration-200 -mb-px ${
                    isActive
                      ? "border-green-500 text-green-700 dark:text-green-400 bg-white dark:bg-[#162032] shadow-sm"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-white/70 dark:hover:bg-[#162032]/60"
                  }`}
                >
                  <TabIcon className="w-4 h-4 shrink-0" />
                  {p.shortTitle}
                  <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400"
                      : "bg-gray-100 dark:bg-[#1c2a3a] text-gray-400 dark:text-gray-500"
                  }`}>
                    {p.table.rows.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active tab panel */}
          <div className="bg-white dark:bg-[#162032] rounded-b-2xl rounded-tr-2xl border border-t-0 border-gray-200 dark:border-green-900/20 shadow-sm overflow-hidden">
            {/* Category header */}
            <div className="flex items-start gap-4 p-6 border-b border-gray-100 dark:border-green-900/20 bg-gray-50/50 dark:bg-[#0e1820]/60">
              <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{active.title}</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-3xl">{active.description}</p>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[700px]">
                <thead>
                  <tr className="bg-green-600 text-white">
                    {active.table.headers.map((h) => (
                      <th key={h} className={`px-4 py-3 text-left font-semibold text-xs tracking-wide whitespace-nowrap ${h === "pH" ? "min-w-[100px]" : ""}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {active.table.rows.map((row, i) => (
                    <tr
                      key={i}
                      className={`transition-colors ${
                        i % 2 === 0 ? "bg-white dark:bg-[#162032]" : "bg-gray-50/70 dark:bg-[#0e1820]"
                      } hover:bg-green-50/60 dark:hover:bg-green-900/10`}
                    >
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className={`px-4 py-2.5 border-b border-gray-100 dark:border-green-900/20 text-gray-700 dark:text-gray-300 align-top ${
                            j === 0 ? "font-semibold text-green-700 dark:text-green-400 whitespace-nowrap" : ""
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* CTA */}
      <section className="py-12 px-4">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center bg-green-50 dark:bg-[#0e1f0e] border border-green-200 dark:border-green-600/20 rounded-3xl px-8 py-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3">Need a Custom Formulation?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">Our R&D team can develop tailor-made chemical solutions for your specific substrate, process, or performance requirements.</p>
            <a href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-500 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-green-600/30">
              Talk to Our Experts
            </a>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
