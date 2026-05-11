import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Check, AlertTriangle } from "lucide-react";
import { getJobs, addJob, updateJob, deleteJob } from "../lib/db";

const EMPTY = {
  title: "",
  department: "",
  location: "",
  type: "Full Time",
  deadline: "",
  description: "",
  requirements: "",
  status: "open",
  order: 0,
};

const JOB_TYPES = ["Full Time", "Part Time", "Contract"];
const JOB_STATUSES = ["open", "closed"];

export default function JobsManager() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(null); // null = closed, {} = new, {docId,...} = edit
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    getJobs()
      .then(setJobs)
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openNew = () => setForm({ ...EMPTY });
  const openEdit = (job) => setForm({ ...job });
  const closeForm = () => { setForm(null); setError(""); };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === "order" ? Number(value) : value }));
  };

  const handleSave = async () => {
    if (!form.title.trim()) { setError("Job title is required."); return; }
    setSaving(true);
    setError("");
    try {
      const { docId, ...data } = form;
      if (docId) {
        await updateJob(docId, data);
      } else {
        await addJob(data);
      }
      load();
      closeForm();
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteJob(deleteTarget);
      setDeleteTarget(null);
      load();
    } catch {
      setDeleteTarget(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Jobs</h2>
          <p className="text-sm text-gray-500 mt-0.5">Manage career listings shown on the public Careers page.</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-500 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Job
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-7 h-7 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-16 rounded-xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-medium">No job listings yet.</p>
          <button onClick={openNew} className="mt-3 text-sm text-green-600 hover:underline">Add your first listing</button>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">#</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Title</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600 hidden md:table-cell">Location</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600 hidden lg:table-cell">Type</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {jobs.map((job, i) => (
                <tr key={job.docId} className="bg-white hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 text-gray-400">{i + 1}</td>
                  <td className="px-5 py-3 font-medium text-gray-900">{job.title}</td>
                  <td className="px-5 py-3 text-gray-500 hidden md:table-cell">{job.location || "—"}</td>
                  <td className="px-5 py-3 text-gray-500 hidden lg:table-cell">{job.type || "—"}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full ${
                      job.status === "open"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}>
                      {job.status === "open" ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      {job.status || "open"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => openEdit(job)} className="p-1.5 text-gray-400 hover:text-green-600 rounded transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDeleteTarget(job.docId)} className="p-1.5 text-gray-400 hover:text-red-500 rounded transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Form Modal */}
      {form && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-10 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-lg">{form.docId ? "Edit Job" : "New Job Listing"}</h3>
              <button onClick={closeForm} className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-6 flex flex-col gap-4">
              {error && (
                <div className="flex items-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-lg text-sm">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" /> {error}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Job Title *</label>
                  <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Technical Sales Executive"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Department</label>
                  <input name="department" value={form.department} onChange={handleChange} placeholder="e.g. Sales & Marketing"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Location</label>
                  <input name="location" value={form.location} onChange={handleChange} placeholder="e.g. Lahore"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Type</label>
                  <select name="type" value={form.type} onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 text-sm bg-white">
                    {JOB_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Status</label>
                  <select name="status" value={form.status} onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 text-sm bg-white">
                    {JOB_STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Application Deadline</label>
                  <input name="deadline" value={form.deadline} onChange={handleChange} placeholder="e.g. 31 May 2026"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Display Order</label>
                  <input name="order" type="number" value={form.order} onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 text-sm" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Job Description</label>
                  <textarea name="description" value={form.description} onChange={handleChange} rows={4}
                    placeholder="Describe the role, responsibilities, and what the candidate will be doing..."
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 text-sm resize-none" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Requirements</label>
                  <textarea name="requirements" value={form.requirements} onChange={handleChange} rows={4}
                    placeholder="List qualifications, experience, and skills required..."
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 text-sm resize-none" />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={closeForm} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving}
                className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-500 rounded-lg transition-colors disabled:opacity-60">
                {saving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Delete this job?</h3>
            <p className="text-gray-500 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteTarget(null)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors">
                Cancel
              </button>
              <button onClick={handleDelete} className="px-4 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
