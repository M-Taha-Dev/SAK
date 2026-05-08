import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Newspaper, Loader2 } from "lucide-react";
import { getNews, addNewsArticle, updateNewsArticle, deleteNewsArticle } from "../lib/db";
import Modal from "./components/Modal";
import { news as defaultNews } from "../data/content";

const CATEGORIES = [
  "Product Launch",
  "Events",
  "Company News",
];

const EMPTY = { title: "", excerpt: "", date: "", category: CATEGORIES[0], image: "" };

export default function NewsManager() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [seeding, setSeeding] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      setArticles(await getNews());
    } catch (e) {
      setError("Failed to load: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => setModal({ mode: "add", data: { ...EMPTY } });
  const openEdit = (a) => setModal({ mode: "edit", data: { ...a } });
  const setField = (k, v) =>
    setModal((p) => ({ ...p, data: { ...p.data, [k]: v } }));

  const handleSave = async () => {
    setError("");
    setSaving(true);
    try {
      const { docId, ...data } = modal.data;
      if (modal.mode === "add") {
        await addNewsArticle(data);
      } else {
        await updateNewsArticle(docId, data);
      }
      await load();
      setModal(null);
    } catch (e) {
      setError("Save failed: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteNewsArticle(deleteTarget);
      setDeleteTarget(null);
      await load();
    } catch (e) {
      setError("Delete failed: " + e.message);
      setDeleteTarget(null);
    }
  };

  const handleSeed = async () => {
    setError("");
    setSeeding(true);
    try {
      for (const a of defaultNews) {
        const { id, ...data } = a;
        await addNewsArticle(data);
      }
      await load();
    } catch (e) {
      setError("Seed failed: " + e.message);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
          {error}
        </div>
      )}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">News Articles</h2>
          <p className="text-gray-500 text-sm mt-0.5">
            {articles.length} article{articles.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex gap-2">
          {articles.length === 0 && !loading && (
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-600 border border-green-300 rounded-lg hover:bg-green-50 transition-colors disabled:opacity-50"
            >
              {seeding && <Loader2 className="w-4 h-4 animate-spin" />}
              Seed Default Data
            </button>
          )}
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Article
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-green-500 animate-spin" />
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <Newspaper className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No articles yet. Seed the default data or add manually.</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left text-gray-500 font-medium text-xs">Title</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium text-xs hidden sm:table-cell">Category</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium text-xs hidden md:table-cell">Date</th>
                <th className="px-4 py-3 text-right text-gray-500 font-medium text-xs">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a, i) => (
                <tr
                  key={a.docId}
                  className={`border-b border-gray-100 last:border-0 ${
                    i % 2 !== 0 ? "bg-gray-50/60" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {a.image && (
                        <img
                          src={a.image}
                          alt=""
                          className="w-10 h-8 object-cover rounded hidden sm:block flex-shrink-0"
                        />
                      )}
                      <span className="text-gray-900 font-medium line-clamp-1">{a.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full whitespace-nowrap">
                      {a.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell whitespace-nowrap">
                    {a.date}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEdit(a)}
                        className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(a.docId)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <Modal
          title={modal.mode === "add" ? "Add Article" : "Edit Article"}
          onClose={() => setModal(null)}
        >
          <div className="space-y-4">
            <div>
              <label className="text-gray-600 text-xs font-medium mb-1.5 block">Title</label>
              <input
                value={modal.data.title}
                onChange={(e) => setField("title", e.target.value)}
                placeholder="Article title…"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-gray-600 text-xs font-medium mb-1.5 block">Category</label>
                <select
                  value={modal.data.category}
                  onChange={(e) => setField("category", e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-green-500 transition-colors"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-gray-600 text-xs font-medium mb-1.5 block">Date</label>
                <input
                  value={modal.data.date}
                  onChange={(e) => setField("date", e.target.value)}
                  placeholder="e.g. March 2026"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-600 text-xs font-medium mb-1.5 block">Image URL</label>
              <input
                value={modal.data.image}
                onChange={(e) => setField("image", e.target.value)}
                placeholder="https://…"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>

            <div>
              <label className="text-gray-600 text-xs font-medium mb-1.5 block">Excerpt</label>
              <textarea
                value={modal.data.excerpt}
                onChange={(e) => setField("excerpt", e.target.value)}
                rows={3}
                placeholder="Short summary…"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors resize-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setModal(null)}
                className="px-4 py-2 text-sm text-gray-500 hover:text-gray-900 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !modal.data.title}
                className="px-4 py-2 text-sm font-semibold bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white rounded-lg transition-colors"
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {deleteTarget && (
        <Modal title="Delete Article" onClose={() => setDeleteTarget(null)}>
          <p className="text-gray-600 text-sm mb-6">
            Are you sure? This cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setDeleteTarget(null)}
              className="px-4 py-2 text-sm text-gray-500 hover:text-gray-900 border border-gray-300 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-sm font-semibold bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
