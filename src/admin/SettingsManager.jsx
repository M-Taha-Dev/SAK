import { useState, useEffect } from "react";
import { Save, Mail, Loader2, CheckCircle } from "lucide-react";
import { getEmailSettings, updateEmailSettings } from "../lib/db";

export default function SettingsManager() {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getEmailSettings()
      .then((s) => setRecipientEmail(s.recipientEmail ?? ""))
      .catch((e) => setError("Failed to load settings: " + e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setError("");
    setSaving(true);
    setSaved(false);
    try {
      await updateEmailSettings({ recipientEmail });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      setError("Save failed: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-500 text-sm mt-0.5">Configure email notifications for contact form submissions.</p>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Email Notifications</p>

          <div className="mb-1">
            <label className="text-gray-600 text-xs font-medium mb-1.5 block">Sender Email</label>
            <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg">
              <Mail className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="text-sm text-gray-500">adminsak081@gmail.com</span>
              <span className="ml-auto text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">Fixed (EmailJS)</span>
            </div>
            <p className="text-xs text-gray-400 mt-1.5">Configured in your EmailJS Gmail service.</p>
          </div>

          <div className="mt-4">
            <label className="text-gray-600 text-xs font-medium mb-1.5 block">Recipient Email *</label>
            {loading ? (
              <div className="flex items-center gap-2 text-gray-400 text-sm py-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Loading…
              </div>
            ) : (
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => { setRecipientEmail(e.target.value); setSaved(false); }}
                placeholder="hasnain221059@gmail.com"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors"
              />
            )}
            <p className="text-xs text-gray-400 mt-1.5">This address receives an email for every contact form submission.</p>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
          <button
            onClick={handleSave}
            disabled={saving || loading || !recipientEmail.trim()}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving…" : "Save Changes"}
          </button>
          {saved && (
            <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
              <CheckCircle className="w-4 h-4" /> Saved
            </span>
          )}
        </div>
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
        <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2">EmailJS Setup Required</p>
        <ol className="text-sm text-amber-800 space-y-1 list-decimal list-inside">
          <li>Create a free account at <strong>emailjs.com</strong></li>
          <li>Add a <strong>Gmail service</strong> connected to <strong>adminsak081@gmail.com</strong></li>
          <li>Create an <strong>Email Template</strong> using the variables below</li>
          <li>Copy the Service ID, Template ID, and Public Key into <strong>.env</strong></li>
        </ol>
        <div className="mt-3 bg-amber-100 rounded-lg px-3 py-2 font-mono text-xs text-amber-900 space-y-0.5">
          <div>{"{{from_name}}"} — submitter name</div>
          <div>{"{{from_email}}"} — submitter email</div>
          <div>{"{{phone}}"} — phone number</div>
          <div>{"{{company}}"} — company name</div>
          <div>{"{{subject_label}}"} — subject</div>
          <div>{"{{message}}"} — message body</div>
          <div>{"{{to_email}}"} — recipient (set above)</div>
        </div>
      </div>
    </div>
  );
}
