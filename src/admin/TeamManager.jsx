import { useState, useEffect, useRef } from "react";
import { Plus, Pencil, Trash2, User, Loader2, GripVertical } from "lucide-react";
import { getTeam, addTeamMember, updateTeamMember, deleteTeamMember } from "../lib/db";
import Modal from "./components/Modal";
import { team as defaultTeam } from "../data/content";

const EMPTY = { name: "", title: "", bio: "", image: "" };

export default function TeamManager() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [seeding, setSeeding] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      setMembers(await getTeam());
    } catch (e) {
      setError("Failed to load: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => setModal({ mode: "add", data: { ...EMPTY, order: members.length + 1 } });
  const openEdit = (m) => setModal({ mode: "edit", data: { ...m } });
  const setField = (k, v) =>
    setModal((p) => ({ ...p, data: { ...p.data, [k]: v } }));

  const handleSave = async () => {
    setError("");
    setSaving(true);
    try {
      const { docId, ...data } = modal.data;
      if (modal.mode === "add") {
        await addTeamMember(data);
      } else {
        await updateTeamMember(docId, data);
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
      await deleteTeamMember(deleteTarget);
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
      for (const m of defaultTeam) {
        await addTeamMember({
          name: m.name,
          title: m.title,
          bio: m.bio,
          image: m.image || "",
          order: m.order,
        });
      }
      await load();
    } catch (e) {
      setError("Seed failed: " + e.message);
    } finally {
      setSeeding(false);
    }
  };

  const dragIndex = useRef(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = (idx) => { dragIndex.current = idx; };
  const handleDragOver = (e, idx) => { e.preventDefault(); if (dragIndex.current !== idx) setDragOverIndex(idx); };
  const handleDragEnd = () => { dragIndex.current = null; setDragOverIndex(null); };

  const handleDrop = async (e, dropIdx) => {
    e.preventDefault();
    const fromIdx = dragIndex.current;
    handleDragEnd();
    if (fromIdx === null || fromIdx === dropIdx) return;
    const reordered = [...members];
    const [moved] = reordered.splice(fromIdx, 1);
    reordered.splice(dropIdx, 0, moved);
    setMembers(reordered);
    try {
      await Promise.all(reordered.map((m, i) => updateTeamMember(m.docId, { order: i + 1 })));
    } catch (e) {
      setError("Reorder failed: " + e.message);
      load();
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
          <h2 className="text-xl font-bold text-gray-900">Team Members</h2>
          <p className="text-gray-500 text-sm mt-0.5">
            {members.length} member{members.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex gap-2">
          {members.length === 0 && !loading && (
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
            Add Member
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-green-500 animate-spin" />
        </div>
      ) : members.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <User className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No team members yet. Seed the default data or add manually.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((m, idx) => (
            <div
              key={m.docId}
              draggable
              onDragStart={() => handleDragStart(idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDragEnd={handleDragEnd}
              onDrop={(e) => handleDrop(e, idx)}
              className={`bg-white border rounded-xl p-4 flex gap-3 shadow-sm transition-all duration-150 ${
                dragOverIndex === idx
                  ? "border-green-400 ring-2 ring-green-200 scale-[1.02]"
                  : "border-gray-200"
              }`}
            >
              <div
                className="flex items-center cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-400 shrink-0 pr-1"
                title="Drag to reorder"
              >
                <GripVertical className="w-4 h-4" />
              </div>
              <div className="w-12 h-12 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0 overflow-hidden">
                {m.image ? (
                  <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-5 h-5 text-green-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 font-semibold text-sm truncate">{m.name}</p>
                <p className="text-green-600 text-xs truncate">{m.title}</p>
                <p className="text-gray-400 text-xs mt-1 line-clamp-2">{m.bio}</p>
              </div>
              <div className="flex flex-col gap-1 shrink-0">
                <button
                  onClick={() => openEdit(m)}
                  className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteTarget(m.docId)}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <Modal
          title={modal.mode === "add" ? "Add Team Member" : "Edit Team Member"}
          onClose={() => setModal(null)}
        >
          <div className="space-y-4">
            {[
              { key: "name", label: "Name", placeholder: "e.g. Muhammad Usman" },
              { key: "title", label: "Title", placeholder: "e.g. Chief Executive Officer" },
              { key: "image", label: "Image URL", placeholder: "https://…" },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="text-gray-600 text-xs font-medium mb-1.5 block">
                  {label}
                </label>
                <input
                  value={modal.data[key] || ""}
                  onChange={(e) => setField(key, e.target.value)}
                  placeholder={placeholder}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>
            ))}
            <div>
              <label className="text-gray-600 text-xs font-medium mb-1.5 block">Bio</label>
              <textarea
                value={modal.data.bio || ""}
                onChange={(e) => setField("bio", e.target.value)}
                rows={3}
                placeholder="Short biography…"
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
                disabled={saving || !modal.data.name || !modal.data.title}
                className="px-4 py-2 text-sm font-semibold bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white rounded-lg transition-colors"
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {deleteTarget && (
        <Modal title="Delete Team Member" onClose={() => setDeleteTarget(null)}>
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
