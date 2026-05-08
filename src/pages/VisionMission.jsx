import { Eye, Target, Lightbulb, Leaf, ShieldCheck, Handshake } from "lucide-react";
import AnimatedSection, { StaggerContainer, StaggerItem } from "../components/AnimatedSection";

const pillars = [
  { icon: Lightbulb, title: "Innovation", desc: "Continuously advance chemical research and product offerings to stay ahead of market needs." },
  { icon: Leaf, title: "Sustainability", desc: "Foster a more sustainable textile industry through green chemistry and responsible practices." },
  { icon: ShieldCheck, title: "Quality", desc: "Uphold uncompromising standards in every product, every batch, every delivery." },
  { icon: Handshake, title: "Partnership", desc: "Build long-term relationships based on trust, transparency, and genuine value creation." },
];

export default function VisionMission() {
  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-[#0a0f1a]">
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_rgba(22,163,74,0.1)_0%,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto text-center">
          <AnimatedSection>
            <span className="text-green-600 dark:text-green-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Our Direction</span>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-5">Vision & Mission</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">The principles that drive our strategy, shape our culture, and guide every decision we make.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vision */}
          <AnimatedSection direction="left">
            <div className="h-full relative overflow-hidden p-10 rounded-3xl bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-[#0e1f0e] border border-green-300 dark:border-green-600/25">
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-green-200/60 dark:bg-green-600/10" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-green-600 flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <span className="text-green-700 dark:text-green-400 text-xs font-bold tracking-widest uppercase mb-3 block">Our Vision</span>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-5 leading-tight">Global Leadership in Textile Chemicals</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                  To become the global leader in textile chemicals, recognised for our innovative solutions and unwavering commitment to sustainability. We aim to continuously advance our product offerings and operational practices to foster a more sustainable and efficient textile industry.
                </p>
                <div className="mt-8 pt-6 border-t border-green-300 dark:border-green-900/30">
                  <p className="text-gray-600 dark:text-gray-400 text-sm italic">"To be the chemical partner that textile manufacturers worldwide trust most, for quality, innovation, and responsibility."</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Mission */}
          <AnimatedSection direction="right" delay={0.1}>
            <div className="h-full relative overflow-hidden p-10 rounded-3xl bg-white dark:bg-[#162032] border border-gray-200 dark:border-green-900/25 shadow-sm dark:shadow-none">
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gray-100 dark:bg-green-900/15" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-green-100 dark:bg-green-600/20 border border-green-300 dark:border-green-600/30 flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-green-700 dark:text-green-400 text-xs font-bold tracking-widest uppercase mb-3 block">Our Mission</span>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-5 leading-tight">Exceptional Products, Exceptional Impact</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                  To deliver exceptional chemical products that significantly enhance the quality and sustainability of textiles. We are committed to innovation, leveraging cutting-edge technology and research to create solutions that meet the evolving needs of our clients, today and well into the future.
                </p>
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-green-900/30">
                  <p className="text-gray-500 dark:text-gray-400 text-sm italic">"Every formulation we create must add measurable value: to our clients, to the end consumer, and to the planet."</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-gray-100 dark:bg-[#060d14]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="text-green-600 dark:text-green-400 text-sm font-semibold tracking-widest uppercase mb-2 block">Strategic Pillars</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">How We Achieve Our Vision</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">Four core principles underpin everything we do, from laboratory to delivery.</p>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map(({ icon: Icon, title, desc }) => (
              <StaggerItem key={title}>
                <div className="p-7 rounded-2xl bg-white dark:bg-[#162032] border border-gray-200 dark:border-green-900/20 hover:border-green-400 dark:hover:border-green-600/40 transition-all duration-300 hover:-translate-y-1 text-center h-full shadow-sm hover:shadow-md">
                  <div className="w-14 h-14 rounded-2xl bg-green-100 dark:bg-green-600/15 border border-green-200 dark:border-green-600/20 flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-3">{title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 px-4">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-green-600 dark:text-green-400 text-7xl font-serif leading-none mb-4">"</div>
            <blockquote className="text-2xl lg:text-3xl font-medium text-gray-900 dark:text-white leading-relaxed mb-6">
              We don't just manufacture chemicals. We engineer better textiles, cleaner processes, and a more sustainable future.
            </blockquote>
            <cite className="text-green-600 dark:text-green-400 font-semibold text-sm tracking-wide not-italic">
              SAK Speciality Chemicals Leadership
            </cite>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
