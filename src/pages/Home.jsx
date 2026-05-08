import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, FlaskConical, Droplets, Sparkles, Layers } from "lucide-react";
import AnimatedSection, { StaggerContainer, StaggerItem } from "../components/AnimatedSection";
import { stats, products, industries, values } from "../data/content";

const iconMap = { FlaskConical, Droplets, Sparkles, Layers };

const heroV = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
};
const heroI = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } } };

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-green-50/30 to-gray-100 dark:from-[#0a0f1a] dark:via-[#0d1f12] dark:to-[#0a1a0d] pt-16 lg:pt-20">
        <div className="absolute inset-0 -top-16 lg:-top-20" style={{ backgroundImage: "url('/output.webp')", backgroundSize: "cover", backgroundPosition: "center", filter: "grayscale(80%)", opacity: 0.4 }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(22,163,74,0.12)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(22,163,74,0.06)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(22,163,74,1) 1px, transparent 1px), linear-gradient(90deg, rgba(22,163,74,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />
        <div className="absolute inset-0 bg-white/55 dark:bg-[#0a0f1a]/65" />

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 lg:px-8 pt-24 pb-16 text-center">
          <motion.div variants={heroV} initial="hidden" animate="visible">
            <motion.div variants={heroI}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold text-green-700 dark:text-green-400 border border-green-400/40 dark:border-green-500/30 rounded-full bg-green-100 dark:bg-green-500/10 mb-6 tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Textile Speciality Chemicals
              </span>
            </motion.div>

            <motion.h1 variants={heroI} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              Innovative Solutions
              <br />
              <span className="text-gradient">for the Textile Industry</span>
            </motion.h1>

            <motion.p variants={heroI} className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              SAK Speciality Chemicals delivers world-class chemical formulations that enhance quality, performance, and sustainability across global textile manufacturing.
            </motion.p>

            <motion.div variants={heroI} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-500 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-green-600/30 hover:-translate-y-0.5">
                Explore Products <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-gray-800 dark:text-white border border-gray-400 dark:border-green-600/40 hover:border-green-500 dark:hover:border-green-500 rounded-xl transition-all duration-200 bg-white/70 dark:bg-white/10 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-green-500/10 hover:-translate-y-0.5">
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1 text-gray-400 dark:text-gray-500">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-green-50 dark:bg-[#0e1a0e] border-y border-green-200 dark:border-green-900/30 py-10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <StaggerItem key={s.label} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-gradient mb-1">{s.value}</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">{s.label}</div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── About Teaser ── */}
      <section className="section-padding max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection direction="left">
            <div className="relative">
              <div className="absolute -inset-4 bg-green-200/40 dark:bg-green-600/10 rounded-2xl blur-xl" />
              <img src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=900&q=80" alt="SAK Laboratory"
                className="relative rounded-2xl w-full object-cover h-80 lg:h-[460px]" />
              <div className="absolute bottom-4 left-4 glass rounded-xl px-5 py-4">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">2013</div>
                <div className="text-green-600 dark:text-green-400 text-xs font-medium">Year Founded</div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.1}>
            <span className="text-green-600 dark:text-green-400 text-sm font-semibold tracking-widest uppercase mb-2 block">About SAK</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-5 leading-tight">
              Pioneering Excellence in Textile Chemistry
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Founded in 2013, SAK Specialty Chemicals was established with a clear and ambitious vision: to expand the boundaries of the chemical industry both nationally and internationally. What began as a strategic foundation evolved rapidly, and by 2016, we officially commenced our in-house manufacturing operations, specifically tailored to meet the rigorous demands of the textile manufacturing sector.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Driven by a commitment to excellence, the company reached a significant milestone in 2023 by achieving all major industry certifications, ensuring our processes and products align with the highest global market standards. To better serve our growing clientele, we have strategically established a physical presence across Pakistan, with fully operational offices in the major industrial hubs of Faisalabad, Lahore, and Karachi.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              At the core of SAK Specialty Chemicals is a dedicated technical sales and support team comprised of industry experts. Our primary mission is to move beyond simple product supply by providing comprehensive technical solutions and state-of-the-art products that address the specific challenges of our customers. By focusing on market differentiation and innovative service, we empower our partners in the textile industry to achieve superior results and sustainable growth.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold hover:text-green-700 dark:hover:text-green-300 transition-colors group">
              Learn Our Story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Products Teaser ── */}
      <section className="section-padding bg-gray-50 dark:bg-[#060d14]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="text-green-600 dark:text-green-400 text-sm font-semibold tracking-widest uppercase mb-2 block">Our Products</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Complete Chemical Solutions</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">From fabric preparation to final finishing, a comprehensive range engineered for performance.</p>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 6).map((product) => {
              const Icon = iconMap[product.icon] || FlaskConical;
              return (
                <StaggerItem key={product.id}>
                  <div className="group h-full p-6 rounded-2xl bg-white dark:bg-[#162032] border border-gray-200 dark:border-green-900/20 hover:border-green-400 dark:hover:border-green-600/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-green-100 dark:hover:shadow-green-900/20 cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-600/15 border border-green-200 dark:border-green-600/20 flex items-center justify-center mb-4 group-hover:bg-green-200 dark:group-hover:bg-green-600/25 transition-colors">
                      <Icon className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-2">{product.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">{product.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
          <AnimatedSection className="text-center mt-10">
            <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-green-700 dark:text-green-400 border border-green-400 dark:border-green-600/40 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-500/10 rounded-xl transition-all duration-200">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="section-padding max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-14">
          <span className="text-green-600 dark:text-green-400 text-sm font-semibold tracking-widest uppercase mb-2 block">Our Values</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">What Drives Us</h2>
        </AnimatedSection>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <StaggerItem key={v.title}>
              <div className="text-center p-6 rounded-2xl bg-green-50 dark:bg-[#0e1a0e] border border-green-200 dark:border-green-900/20">
                <div className="w-14 h-14 rounded-full bg-white dark:bg-green-600/15 border border-green-200 dark:border-green-600/20 flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <span className="text-green-600 dark:text-green-400 text-xl font-bold">{v.title[0]}</span>
                </div>
                <h3 className="text-gray-900 dark:text-white font-semibold mb-2">{v.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{v.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ── Industries Teaser ── */}
      <section className="section-padding bg-gray-50 dark:bg-[#060d14]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="text-green-600 dark:text-green-400 text-sm font-semibold tracking-widest uppercase mb-2 block">Industries We Serve</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Across Every Textile Sector</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">Tailored solutions for denim, knit, woven, technical textiles, and more.</p>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {industries.map((ind) => {
              const inner = (
                <div className="relative group overflow-hidden rounded-2xl aspect-[4/3]">
                  <img src={ind.image} alt={ind.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg">{ind.title}</h3>
                    <p className="text-gray-300 text-xs mt-1 line-clamp-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">{ind.description}</p>
                  </div>
                  {ind.link && (
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-white bg-green-600 rounded-lg">
                        View Products <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  )}
                </div>
              );
              return (
                <StaggerItem key={ind.id}>
                  {ind.link ? <Link to={ind.link}>{inner}</Link> : inner}
                </StaggerItem>
              );
            })}
          </StaggerContainer>
          <AnimatedSection className="text-center mt-10">
            <Link to="/industries" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-green-700 dark:text-green-400 border border-green-400 dark:border-green-600/40 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-500/10 rounded-xl transition-all duration-200">
              View All Industries <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 px-4">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-green-50 to-white dark:from-green-900/40 dark:to-[#0e1f0e] rounded-3xl border border-green-200 dark:border-green-600/20 px-8 py-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Ready to Optimise Your Textile Process?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">Our technical experts are ready to help you find the right chemical solutions for your specific requirements.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-500 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-green-600/30">
                Contact Our Team <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/products" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-gray-700 dark:text-white border border-gray-300 dark:border-green-600/40 hover:border-green-500 rounded-xl transition-all duration-200 hover:bg-green-50 dark:hover:bg-green-500/10">
                Browse Products
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
