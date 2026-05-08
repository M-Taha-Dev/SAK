import { useState, useEffect } from "react";
import { User } from "lucide-react";
import AnimatedSection, { StaggerContainer, StaggerItem } from "../components/AnimatedSection";
import { getTeam } from "../lib/db";
import { team as defaultTeam } from "../data/content";

export default function Team() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  const byOrder = (arr) => [...arr].sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));

  useEffect(() => {
    getTeam()
      .then((data) => setTeam(byOrder(data.length > 0 ? data : defaultTeam)))
      .catch(() => setTeam(byOrder(defaultTeam)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-[#0a0f1a]">
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_rgba(22,163,74,0.1)_0%,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto text-center">
          <AnimatedSection>
            <span className="text-green-600 dark:text-green-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Our People</span>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-5">Meet the Team</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">Dedicated professionals with deep expertise in chemistry, manufacturing, and textile applications, united by a passion for innovation.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding max-w-7xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-7 rounded-2xl bg-white dark:bg-[#162032] border border-gray-200 dark:border-green-900/20 shadow-sm animate-pulse">
                <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-green-900/20 mx-auto mb-5" />
                <div className="space-y-2 text-center">
                  <div className="h-4 bg-gray-200 dark:bg-green-900/20 rounded w-2/3 mx-auto" />
                  <div className="h-3 bg-gray-100 dark:bg-green-900/10 rounded w-1/2 mx-auto" />
                  <div className="h-3 bg-gray-100 dark:bg-green-900/10 rounded w-3/4 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <StaggerItem key={member.docId || member.name}>
                <div className="group p-7 rounded-2xl bg-white dark:bg-[#162032] border border-gray-200 dark:border-green-900/20 hover:border-green-400 dark:hover:border-green-600/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-green-100 dark:hover:shadow-green-900/20 shadow-sm">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-600/30 border-2 border-green-300 dark:border-green-600/30 flex items-center justify-center mb-5 mx-auto group-hover:border-green-400 dark:group-hover:border-green-500/50 transition-colors">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <User className="w-9 h-9 text-green-600 dark:text-green-400" />
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-1">{member.name}</h3>
                    <p className="text-green-600 dark:text-green-400 text-xs font-semibold tracking-wide uppercase mb-3">{member.title}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </section>

      <section className="section-padding bg-gray-100 dark:bg-[#060d14]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <span className="text-green-600 dark:text-green-400 text-sm font-semibold tracking-widest uppercase mb-2 block">Our Culture</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-5">Built on Expertise and Collaboration</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">At SAK, our people are our greatest asset. We invest in continuous learning, foster a culture of curiosity and innovation, and celebrate the diverse expertise that each team member brings.</p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">From our chemists and application specialists to our logistics and customer service teams, everyone at SAK shares a single goal: to deliver exceptional value to our clients.</p>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.1}>
              <div className="relative rounded-2xl overflow-hidden h-80 lg:h-[460px] shadow-lg dark:shadow-none">
                <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&q=80" alt="SAK Team" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-green-900/20 to-transparent" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
