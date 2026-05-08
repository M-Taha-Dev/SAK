import { useState, useEffect } from "react";
import { Calendar, Tag } from "lucide-react";
import AnimatedSection, { StaggerContainer, StaggerItem } from "../components/AnimatedSection";
import { getNews } from "../lib/db";
import { news as defaultNews } from "../data/content";

const ALL_CATEGORIES = ["All", "Product Launch", "Events", "Company News"];

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    getNews()
      .then((data) => setNews(data.length > 0 ? data : defaultNews))
      .catch(() => setNews(defaultNews))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeCategory === "All"
      ? news
      : news.filter((a) => a.category === activeCategory);

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-[#0a0f1a]">
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_rgba(22,163,74,0.1)_0%,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto text-center">
          <AnimatedSection>
            <span className="text-green-600 dark:text-green-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Latest Updates</span>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-5">News & Insights</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">Stay up to date with SAK's latest product launches, industry events, and company milestones.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="px-4 lg:px-8 max-w-7xl mx-auto pb-6">
        <AnimatedSection>
          <div className="flex flex-wrap gap-2">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-colors ${
                  activeCategory === cat
                    ? "bg-green-600 text-white border-green-600"
                    : "border-gray-300 dark:border-green-900/30 text-gray-600 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400 hover:border-green-400 dark:hover:border-green-600/50 bg-white dark:bg-transparent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimatedSection>
      </section>

      <section className="section-padding max-w-7xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-white dark:bg-[#162032] border border-gray-200 dark:border-green-900/20 overflow-hidden shadow-sm animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-green-900/20" />
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-gray-100 dark:bg-green-900/10 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 dark:bg-green-900/20 rounded w-5/6" />
                  <div className="h-3 bg-gray-100 dark:bg-green-900/10 rounded w-full" />
                  <div className="h-3 bg-gray-100 dark:bg-green-900/10 rounded w-4/5" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((article) => (
              <StaggerItem key={article.docId || article.id}>
                <article className="group h-full rounded-2xl bg-white dark:bg-[#162032] border border-gray-200 dark:border-green-900/20 hover:border-green-400 dark:hover:border-green-600/40 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-green-100 dark:hover:shadow-green-900/20 shadow-sm">
                  <div className="relative h-48 overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white bg-green-600/90 rounded-full">
                        <Tag className="w-2.5 h-2.5" /> {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 text-xs mb-3">
                      <Calendar className="w-3 h-3" /> {article.date}
                    </div>
                    <h2 className="text-gray-900 dark:text-white font-bold text-base leading-snug mb-2 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">{article.title}</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">{article.excerpt}</p>
                    <button className="mt-4 text-green-600 dark:text-green-400 text-xs font-semibold hover:text-green-700 dark:hover:text-green-300 transition-colors">Read More →</button>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </section>
    </div>
  );
}
