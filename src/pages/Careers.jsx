import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, ArrowRight, ChevronDown, Users, TrendingUp, Heart } from "lucide-react";
import AnimatedSection, { StaggerContainer, StaggerItem } from "../components/AnimatedSection";
import JobApplicationModal from "../components/JobApplicationModal";
import { getJobs } from "../lib/db";

const perks = [
  { icon: TrendingUp, title: "Career Growth", desc: "Clear progression paths and ongoing technical training in specialty chemicals." },
  { icon: Users, title: "Collaborative Team", desc: "Work alongside industry experts across Lahore, Faisalabad, and Karachi." },
  { icon: Heart, title: "Meaningful Work", desc: "Help Pakistan's leading textile manufacturers achieve world-class quality." },
];

const typeColors = {
  "Full Time": "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
  "Part Time": "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
  Contract: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
};

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [applyJob, setApplyJob] = useState(null); // job to apply for, or true for general

  useEffect(() => {
    getJobs()
      .then(setJobs)
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));
  }, []);

  const openJobs = jobs.filter((j) => j.status !== "closed");

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 bg-gradient-to-br from-gray-50 via-green-50/30 to-gray-100 dark:from-[#0a0f1a] dark:via-[#0d1f12] dark:to-[#0a1a0d] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(22,163,74,0.1)_0%,_transparent_60%)]" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold text-green-700 dark:text-green-400 border border-green-400/40 dark:border-green-500/30 rounded-full bg-green-100 dark:bg-green-500/10 mb-6 tracking-widest uppercase">
              <Briefcase className="w-3.5 h-3.5" /> Join Our Team
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Build Your Career at<br />
              <span className="text-gradient">SAK Speciality Chemicals</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              We're growing and looking for driven individuals to join our team of textile chemistry professionals.
              Explore open positions below or reach out to us directly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Perks */}
      <section className="section-padding max-w-7xl mx-auto">
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {perks.map(({ icon: Icon, title, desc }) => (
            <StaggerItem key={title}>
              <div className="p-6 rounded-2xl border border-gray-200 dark:border-green-900/20 bg-white dark:bg-[#162032] text-center">
                <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-600/15 border border-green-200 dark:border-green-600/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-gray-900 dark:text-white font-semibold mb-2">{title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Open Positions */}
      <section className="section-padding bg-gray-50 dark:bg-[#060d14]">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="mb-12 text-center">
            <span className="text-green-600 dark:text-green-400 text-sm font-semibold tracking-widest uppercase mb-2 block">Open Positions</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Current Openings</h2>
          </AnimatedSection>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : openJobs.length === 0 ? (
            <AnimatedSection>
              <div className="text-center py-16 rounded-2xl border border-dashed border-gray-300 dark:border-green-900/30">
                <Briefcase className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 font-medium">No open positions right now.</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Check back soon or send us your CV at{" "}
                  <a href="mailto:hr@sakchemicals.com" className="text-green-600 dark:text-green-400 hover:underline">hr@sakchemicals.com</a>
                </p>
              </div>
            </AnimatedSection>
          ) : (
            <div className="flex flex-col gap-4">
              {openJobs.map((job) => (
                <AnimatedSection key={job.docId}>
                  <div className="rounded-2xl border border-gray-200 dark:border-green-900/20 bg-white dark:bg-[#162032] overflow-hidden">
                    <button
                      onClick={() => setSelected(selected === job.docId ? null : job.docId)}
                      className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="text-gray-900 dark:text-white font-semibold text-lg">{job.title}</h3>
                          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${typeColors[job.type] ?? typeColors["Full Time"]}`}>
                            {job.type || "Full Time"}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                          {job.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" /> {job.location}
                            </span>
                          )}
                          {job.department && (
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-3.5 h-3.5" /> {job.department}
                            </span>
                          )}
                          {job.deadline && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" /> Apply by {job.deadline}
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${selected === job.docId ? "rotate-180" : ""}`}
                      />
                    </button>
                    {selected === job.docId && (
                      <div className="px-6 pb-6 border-t border-gray-100 dark:border-green-900/20 pt-4">
                        {job.description && (
                          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 whitespace-pre-line">{job.description}</p>
                        )}
                        {job.requirements && (
                          <div className="mb-4">
                            <h4 className="text-gray-800 dark:text-gray-200 font-semibold text-sm mb-2">Requirements</h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed whitespace-pre-line">{job.requirements}</p>
                          </div>
                        )}
                        <button
                          onClick={() => setApplyJob(job)}
                          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-500 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-green-600/25"
                        >
                          Apply Now <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-green-50 to-white dark:from-green-900/40 dark:to-[#0e1f0e] rounded-3xl border border-green-200 dark:border-green-600/20 px-8 py-14">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Don't See a Fit?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
              We're always interested in talented people. Submit a general application and we'll keep your profile on file.
            </p>
            <button
              onClick={() => setApplyJob({})}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-500 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-green-600/30"
            >
              Submit General Application <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </AnimatedSection>
      </section>

      {applyJob !== null && (
        <JobApplicationModal
          job={applyJob && applyJob.docId ? applyJob : null}
          onClose={() => setApplyJob(null)}
        />
      )}
    </div>
  );
}
