import { Leaf, Droplets, Wind, ShieldCheck, Recycle, Globe } from "lucide-react";
import AnimatedSection, { StaggerContainer, StaggerItem } from "../components/AnimatedSection";
import { sustainability } from "../data/content";

const iconMap = { Leaf, Droplets, Wind, ShieldCheck, Recycle, Globe };
const certifications = [
  { name: "REACH", desc: "EU chemical regulation compliance" },
  { name: "ZDHC MRSL", desc: "Zero discharge of hazardous chemicals" },
  { name: "OEKO-TEX®", desc: "Tested for harmful substances" },
  { name: "bluesign®", desc: "Responsible textile production" },
  { name: "ISO 14001", desc: "Environmental management system" },
  { name: "GOTS", desc: "Global organic textile standard" },
];

export default function Sustainability() {
  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-[#0a0f1a]">
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_rgba(22,163,74,0.1)_0%,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto text-center">
          <AnimatedSection>
            <span className="text-green-600 dark:text-green-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Our Commitment</span>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-5">Sustainability</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">We care deeply about the environment and are continuously investing in developing eco-friendly solutions to make this world greener and cleaner.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="px-4 lg:px-8 max-w-7xl mx-auto pb-16">
        <AnimatedSection>
          <div className="relative rounded-3xl overflow-hidden h-64 lg:h-96 shadow-lg dark:shadow-none">
            <img src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1400&q=80" alt="Sustainability" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center">
              <div className="px-10 max-w-xl">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">Greener Chemistry for a Better Tomorrow</h2>
                <p className="text-gray-200">Our sustainability roadmap guides every product decision and operational practice across the entire SAK portfolio.</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <section className="section-padding bg-gray-100 dark:bg-[#060d14]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="text-green-600 dark:text-green-400 text-sm font-semibold tracking-widest uppercase mb-2 block">Our Pillars</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Sustainability in Action</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">Six core commitments that define how we operate and innovate every day.</p>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sustainability.map((item) => {
              const Icon = iconMap[item.icon] || Leaf;
              return (
                <StaggerItem key={item.title}>
                  <div className="p-7 h-full rounded-2xl bg-white dark:bg-[#162032] border border-gray-200 dark:border-green-900/20 hover:border-green-400 dark:hover:border-green-600/40 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md">
                    <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-600/15 border border-green-200 dark:border-green-600/20 flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-3">{item.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-14">
          <span className="text-green-600 dark:text-green-400 text-sm font-semibold tracking-widest uppercase mb-2 block">Compliance</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Standards & Certifications</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">Our products comply with the world's most rigorous environmental and safety standards.</p>
        </AnimatedSection>
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {certifications.map((cert) => (
            <StaggerItem key={cert.name}>
              <div className="p-5 rounded-2xl bg-white dark:bg-[#162032] border border-gray-200 dark:border-green-900/20 hover:border-green-400 dark:hover:border-green-500/40 transition-all duration-300 text-center hover:-translate-y-1 shadow-sm">
                <div className="text-green-600 dark:text-green-400 font-bold text-sm mb-2">{cert.name}</div>
                <p className="text-gray-400 dark:text-gray-500 text-xs leading-tight">{cert.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <section className="py-12 bg-green-50 dark:bg-[#0e1a0e] border-y border-green-200 dark:border-green-900/20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "40%", label: "Average water savings vs. conventional" },
              { value: "30%", label: "Reduction in energy consumption" },
              { value: "100%", label: "REACH compliant portfolio" },
              { value: "2030", label: "Target year for carbon neutrality" },
            ].map((s) => (
              <StaggerItem key={s.label}>
                <div className="text-3xl lg:text-4xl font-bold text-gradient mb-2">{s.value}</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">{s.label}</div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
