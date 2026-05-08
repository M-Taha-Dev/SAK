import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import AnimatedSection, { StaggerContainer, StaggerItem } from "../components/AnimatedSection";
import { denimProducts, denimCategories } from "../data/content";

function ProductCard({ product }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="flex flex-col bg-white dark:bg-[#162032] border border-gray-200 dark:border-green-900/20 rounded-2xl overflow-hidden hover:border-green-400 dark:hover:border-green-600/40 transition-colors duration-300">
      <div className="p-6 flex-1">
        <h3 className="text-gray-900 dark:text-white font-bold text-base mb-1">{product.name}</h3>
        <p className="text-green-600 dark:text-green-400 text-xs font-medium mb-4 leading-relaxed">{product.subtitle}</p>
        <ul className="space-y-1.5">
          {product.properties.map((prop) => (
            <li key={prop} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-[5px] shrink-0" />
              {prop}
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-gray-100 dark:border-green-900/20">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between px-6 py-3 text-xs font-semibold text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-500/5 transition-colors"
        >
          <span>Technical Data</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {expanded && (
          <table className="w-full text-sm border-t border-gray-100 dark:border-green-900/20">
            <tbody>
              {product.technical.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 dark:border-green-900/10 last:border-0">
                  <td className="px-6 py-2.5 text-gray-500 dark:text-gray-500 font-medium text-xs w-2/5">{row.parameter}</td>
                  <td className="px-6 py-2.5 text-gray-800 dark:text-gray-200 text-xs">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default function Denim() {
  const [activeCategory, setActiveCategory] = useState("all");

  const tabs = [{ id: "all", label: "All Products" }, ...denimCategories];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1a]">
      {/* ── Hero ── */}
      <section className="relative pt-36 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1542272604-787c3835535d?w=1400&q=80"
            alt="Denim"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-900/75 to-gray-900/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(22,163,74,0.15)_0%,_transparent_60%)]" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <AnimatedSection>
            <Link
              to="/industries"
              className="inline-flex items-center gap-1.5 text-green-400 hover:text-green-300 text-sm font-medium mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Industries
            </Link>
            <span className="text-green-400 text-sm font-semibold tracking-widest uppercase mb-3 block">
              Industry Focus
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              Denim Chemical Range
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl leading-relaxed mb-8">
              21 specialised products engineered for every stage of denim production — from pre-treatment
              and washing through to softening and finishing.
            </p>
            <div className="flex flex-wrap gap-3">
              {denimCategories.map((cat) => (
                <span
                  key={cat.id}
                  className="px-4 py-1.5 text-xs font-semibold text-green-300 border border-green-500/30 bg-green-500/10 rounded-full"
                >
                  {cat.label}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Sticky Category Tabs ── */}
      <div className="sticky top-16 lg:top-20 z-30 bg-white/95 dark:bg-[#0a0f1a]/95 backdrop-blur-md border-b border-gray-200 dark:border-green-900/20 shadow-sm dark:shadow-none">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3 no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeCategory === tab.id
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Products ── */}
      <section className="section-padding max-w-7xl mx-auto">
        {activeCategory === "all" ? (
          <div className="space-y-16">
            {denimCategories.map((cat) => {
              const catProducts = denimProducts.filter((p) => p.category === cat.id);
              return (
                <div key={cat.id}>
                  <AnimatedSection>
                    <div className="flex items-center gap-4 mb-8">
                      <span className="w-10 h-0.5 bg-green-500 shrink-0" />
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">{cat.label}</h2>
                      <span className="ml-auto text-sm text-gray-400 dark:text-gray-500 shrink-0">
                        {catProducts.length} products
                      </span>
                    </div>
                  </AnimatedSection>
                  <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {catProducts.map((product) => (
                      <StaggerItem key={product.id}>
                        <ProductCard product={product} />
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              );
            })}
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {denimProducts
              .filter((p) => p.category === activeCategory)
              .map((product) => (
                <StaggerItem key={product.id}>
                  <ProductCard product={product} />
                </StaggerItem>
              ))}
          </StaggerContainer>
        )}
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-4">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center bg-white dark:bg-[#162032] border border-gray-200 dark:border-green-900/20 rounded-3xl px-8 py-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Need Technical Guidance?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
              Our denim specialists can help you select the right chemical combination for your specific
              process requirements and fabric targets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-500 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-green-600/30"
              >
                Contact Our Team <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-gray-700 dark:text-white border border-gray-300 dark:border-green-600/40 hover:border-green-500 rounded-xl transition-all duration-200 hover:bg-green-50 dark:hover:bg-green-500/10"
              >
                Full Product Range
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
