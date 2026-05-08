import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AnimatedSection, { StaggerContainer, StaggerItem } from "../components/AnimatedSection";
import { values } from "../data/content";

export default function About() {
  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-[#0a0f1a]">
      <section className="relative py-20 px-4 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_rgba(22,163,74,0.1)_0%,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto text-center">
          <AnimatedSection>
            <span className="text-green-600 dark:text-green-400 text-sm font-semibold tracking-widest uppercase mb-3 block">About SAK</span>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-5">About Our Company</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">A leading provider of high-quality chemical solutions for the textile industry, committed to innovation, sustainability, and customer satisfaction.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection direction="left">
            <div className="relative">
              <div className="absolute -inset-4 bg-green-200/30 dark:bg-green-600/8 rounded-3xl blur-2xl" />
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80" alt="SAK facility"
                className="relative rounded-2xl w-full object-cover h-[480px]" />
              <div className="absolute -bottom-4 -right-4 w-40 h-40 rounded-2xl overflow-hidden border-4 border-gray-50 dark:border-[#0a0f1a]">
                <img src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&q=80" alt="Lab" className="w-full h-full object-cover" />
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.1}>
            <span className="text-green-600 dark:text-green-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Who We Are</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-5 leading-tight">A Trusted Partner in Textile Chemistry</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              {/* <p>Welcome to SAK Speciality Chemicals, a leading provider of high-quality chemical solutions for the textile industry. Our commitment to innovation, sustainability, and customer satisfaction sets us apart in the market.</p> */}
              <p className="">Founded in 2013, SAK Specialty Chemicals was established with a clear and ambitious vision: to expand the boundaries of the chemical industry both nationally and internationally. What began as a strategic foundation evolved rapidly, and by 2016, we officially commenced our in-house manufacturing operations, specifically tailored to meet the rigorous demands of the textile manufacturing sector.
Driven by a commitment to excellence, the company reached a significant milestone in 2023 by achieving all major industry certifications, ensuring our processes and products align with the highest global market standards. To better serve our growing clientele, we have strategically established a physical presence across Pakistan, with fully operational offices in the major industrial hubs of Faisalabad, Lahore, and Karachi.
At the core of SAK Specialty Chemicals has a dedicated technical sales and support team comprised of industry experts. Our primary mission is to move beyond simple product supply by providing comprehensive technical solutions and state-of-the-art products that address the specific challenges of our customers. By focusing on market differentiation and innovative service, we empower our partners in the textile industry to achieve superior results and sustainable growth.</p>
            </div>
            <div className="mt-8">
              <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-green-600 hover:bg-green-500 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-green-600/30">
                Explore Our Products <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-gray-100 dark:bg-[#060d14]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="text-green-600 dark:text-green-400 text-sm font-semibold tracking-widest uppercase mb-2 block">Our Values</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">Principles That Define Us</h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="p-6 rounded-2xl bg-white dark:bg-[#162032] border border-gray-200 dark:border-green-900/20 hover:border-green-400 dark:hover:border-green-600/40 transition-all duration-300 hover:-translate-y-1 h-full shadow-sm hover:shadow-md">
                  <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-600/15 border border-green-200 dark:border-green-600/20 flex items-center justify-center mb-4">
                    <span className="text-green-600 dark:text-green-400 font-bold text-lg">{v.title[0]}</span>
                  </div>
                  <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-2">{v.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{v.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

    </div>
  );
}
