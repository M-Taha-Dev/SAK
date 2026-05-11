import { useState } from "react";
import { X, Upload, CheckCircle, Send, FileText } from "lucide-react";
import emailjs from "@emailjs/browser";
import { uploadResume, addApplication } from "../lib/db";

const EJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EJS_ADMIN    = import.meta.env.VITE_EMAILJS_JOB_ADMIN_TEMPLATE_ID;
const EJS_CONFIRM  = import.meta.env.VITE_EMAILJS_JOB_CONFIRM_TEMPLATE_ID;
const EJS_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const ADMIN_EMAIL  = "hr@sakchemicals.com";

const MAX_SIZE     = 5 * 1024 * 1024; // 5 MB
const ALLOWED      = ["application/pdf", "application/msword",
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

export default function JobApplicationModal({ job, onClose }) {
  const [form, setForm]     = useState({ name: "", email: "", phone: "", position: job?.title ?? "", coverLetter: "" });
  const [file, setFile]     = useState(null);
  const [fileError, setFE]  = useState("");
  const [errors, setErrors] = useState({});
  const [sending, setSend]  = useState(false);
  const [status, setStatus] = useState("");   // progress label
  const [done, setDone]     = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = "Full name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!file)              e.file  = "Please attach your resume";
    return e;
  };

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (!ALLOWED.includes(f.type))  { setFE("Only PDF, DOC or DOCX accepted"); setFile(null); return; }
    if (f.size > MAX_SIZE)          { setFE("File must be under 5 MB");          setFile(null); return; }
    setFE(""); setFile(f);
    if (errors.file) setErrors(err => ({ ...err, file: "" }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(err => ({ ...err, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({}); setSend(true);

    // 1. Upload resume to Firebase Storage
    let resumeUrl = "";
    try {
      setStatus("Uploading resume…");
      resumeUrl = await uploadResume(file);
    } catch {
      setSend(false); setStatus("");
      setErrors(err => ({ ...err, file: "Upload failed — please try again." }));
      return;
    }

    // 2. Save to Firestore (non-fatal)
    try {
      await addApplication({ ...form, resumeUrl, jobId: job?.docId ?? null });
    } catch { /* continue */ }

    setStatus("Sending…");

    // 3. Admin notification email
    try {
      if (EJS_SERVICE && EJS_ADMIN && EJS_KEY) {
        await emailjs.send(EJS_SERVICE, EJS_ADMIN, {
          to_email:       ADMIN_EMAIL,
          applicant_name:  form.name,
          applicant_email: form.email,
          applicant_phone: form.phone,
          position:        form.position || "—",
          cover_letter:    form.coverLetter || "—",
          resume_url:      resumeUrl,
        }, EJS_KEY);
      }
    } catch { /* non-fatal */ }

    // 4. Applicant confirmation email
    try {
      if (EJS_SERVICE && EJS_CONFIRM && EJS_KEY) {
        await emailjs.send(EJS_SERVICE, EJS_CONFIRM, {
          to_email:       form.email,
          applicant_name:  form.name,
          position:        form.position || "the advertised position",
        }, EJS_KEY);
      }
    } catch { /* non-fatal */ }

    setSend(false); setStatus(""); setDone(true);
  };

  const inp = (field) =>
    `w-full px-4 py-3 rounded-xl border text-gray-900 text-sm placeholder-gray-400 outline-none transition-all duration-200 focus:border-green-500 focus:ring-1 focus:ring-green-500/30 ${
      errors[field] ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"
    }`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg my-auto">

        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h3 className="font-bold text-gray-900 text-lg leading-tight">Apply for this Position</h3>
            {job?.title && <p className="text-green-600 text-sm font-medium mt-0.5">{job.title}</p>}
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        {done ? (
          /* Success state */
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 border border-green-300 flex items-center justify-center mb-5">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-gray-900 font-bold text-xl mb-2">Application Submitted!</h3>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              Thank you, <span className="font-semibold text-gray-700">{form.name}</span>. We've received your application and sent a confirmation to{" "}
              <span className="font-semibold text-gray-700">{form.email}</span>. We'll be in touch if your profile is a match.
            </p>
            <button
              onClick={onClose}
              className="mt-8 px-6 py-2.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-500 rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="px-6 py-6 flex flex-col gap-4">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Full Name *</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Muhammad Ali" className={inp("name")} />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Phone Number *</label>
                <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+92 300 0000000" className={inp("phone")} />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email Address *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" className={inp("email")} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Position Applied For</label>
              <input
                name="position"
                value={form.position}
                onChange={handleChange}
                placeholder="e.g. Technical Sales Executive"
                className={inp("position") + (job?.title ? " text-gray-500 cursor-default" : "")}
                readOnly={!!job?.title}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Cover Letter <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                name="coverLetter"
                value={form.coverLetter}
                onChange={handleChange}
                rows={4}
                placeholder="Briefly tell us why you're a great fit for this role…"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 outline-none transition-all duration-200 focus:border-green-500 focus:ring-1 focus:ring-green-500/30 resize-none"
              />
            </div>

            {/* Resume upload */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Resume / CV *</label>
              <label className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 ${
                fileError || errors.file
                  ? "border-red-400 bg-red-50"
                  : file
                  ? "border-green-400 bg-green-50"
                  : "border-gray-300 bg-gray-50 hover:border-green-400 hover:bg-green-50/60"
              }`}>
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleFile} className="hidden" />
                {file ? (
                  <>
                    <FileText className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-green-700 truncate">{file.name}</p>
                      <p className="text-xs text-green-600">{(file.size / 1024).toFixed(0)} KB</p>
                    </div>
                    <span className="text-xs text-green-600 font-semibold flex-shrink-0">Change</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Click to upload resume</p>
                      <p className="text-xs text-gray-400">PDF, DOC or DOCX — max 5 MB</p>
                    </div>
                  </>
                )}
              </label>
              {(fileError || errors.file) && (
                <p className="text-red-500 text-xs mt-1">{fileError || errors.file}</p>
              )}
            </div>

            {status && (
              <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                {status}
              </div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-500 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-green-600/30 mt-1"
            >
              <Send className="w-4 h-4" />
              {sending ? (status || "Submitting…") : "Submit Application"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
