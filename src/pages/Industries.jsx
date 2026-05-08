import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AnimatedSection, { StaggerContainer, StaggerItem } from "../components/AnimatedSection";
import { industries } from "../data/content";

export default function Industries() {
  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-[#0a0f1a]">
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_rgba(22,163,74,0.1)_0%,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto text-center">
          <AnimatedSection>
            <span className="text-green-600 dark:text-green-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Sectors We Serve</span>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-5">Industries</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">Specialised chemical solutions for every segment of the textile and fibre industry, from denim to technical fabrics.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding max-w-7xl mx-auto">
        <div className="space-y-20">
          {industries.map((ind, i) => (
            <AnimatedSection key={ind.id} direction={i % 2 === 0 ? "left" : "right"}>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
                <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/3] shadow-md dark:shadow-none">
                    <img src={ind.image} alt={ind.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-green-900/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-bold text-green-700 dark:text-green-400 bg-white/90 dark:bg-green-900/60 border border-green-300 dark:border-green-600/30 rounded-full shadow-sm">
                        {ind.title}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={i % 2 !== 0 ? "lg:order-1" : ""}>
                  <span className="text-green-600 dark:text-green-400 text-sm font-semibold tracking-widest uppercase mb-2 block">Industry Focus</span>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">{ind.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base mb-6">{ind.description}</p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {["Pre-treatment", "Dyeing", "Printing", "Finishing"].map((step) => (
                      <div key={step} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-[#162032] border border-gray-200 dark:border-green-900/20 shadow-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                  {ind.link && (
                    <Link
                      to={ind.link}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-500 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-green-600/30 hover:-translate-y-0.5"
                    >
                      View Products <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  );
}
