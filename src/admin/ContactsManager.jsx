import { useState, useEffect } from "react";
import { Trash2, Mail, Phone, Building2, RefreshCw } from "lucide-react";
import { getContacts, deleteContact } from "../lib/db";

const subjectLabels = {
  product: "Product Enquiry",
  custom: "Custom Formulation",
  technical: "Technical Support",
  distribution: "Distribution Partnership",
  other: "Other",
};

export default function ContactsManager() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const load = () => {
    setLoading(true);
    getContacts()
      .then((data) => {
        const sorted = [...data].sort((a, b) => {
          const ta = a.createdAt?.seconds ?? 0;
          const tb = b.createdAt?.seconds ?? 0;
          return tb - ta;
        });
        setContacts(sorted);
      })
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this submission?")) return;
    setDeleting(id);
    try {
      await deleteContact(id);
      setContacts((prev) => prev.filter((c) => c.docId !== id));
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400 text-sm gap-2">
        <RefreshCw className="w-4 h-4 animate-spin" /> Loading submissions…
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Contact Submissions</h2>
          <p className="text-gray-500 text-sm mt-0.5">{contacts.length} submission{contacts.length !== 1 ? "s" : ""}</p>
        </div>
        <button onClick={load} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors">
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {contacts.length === 0 ? (
        <div className="text-center py-20 text-gray-400 text-sm">No submissions yet.</div>
      ) : (
        <div className="space-y-4">
          {contacts.map((c) => (
            <div key={c.docId} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="font-semibold text-gray-900">{c.name}</span>
                    {c.subject && (
                      <span className="px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                        {subjectLabels[c.subject] ?? c.subject}
                      </span>
                    )}
                    {c.createdAt?.seconds && (
                      <span className="text-xs text-gray-400">
                        {new Date(c.createdAt.seconds * 1000).toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                    <a href={`mailto:${c.email}`} className="flex items-center gap-1.5 hover:text-green-600 transition-colors">
                      <Mail className="w-3.5 h-3.5" /> {c.email}
                    </a>
                    {c.phone && (
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" /> {c.phone}
                      </span>
                    )}
                    {c.company && (
                      <span className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5" /> {c.company}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{c.message}</p>
                </div>
                <button
                  onClick={() => handleDelete(c.docId)}
                  disabled={deleting === c.docId}
                  className="shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
