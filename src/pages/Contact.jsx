import { useState, useEffect, useRef } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, User } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import { db } from "../lib/firebase";
import { getEmailSettings } from "../lib/db";
import AnimatedSection from "../components/AnimatedSection";
import { company } from "../data/content";

const EJS_SERVICE = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EJS_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const subjectLabels = {
  product: "Product Enquiry",
  custom: "Custom Formulation",
  technical: "Technical Support",
  distribution: "Distribution Partnership",
  other: "Other",
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});
  const recipientRef = useRef("adminsak081@gmail.com");

  useEffect(() => {
    getEmailSettings().then((s) => { recipientRef.current = s.recipientEmail; }).catch(() => {});
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setSending(true);
    try {
      await addDoc(collection(db, "contacts"), { ...form, createdAt: serverTimestamp() });
    } catch {
      // save to Firestore failed — continue anyway so user isn't left hanging
    }
    try {
      if (EJS_SERVICE && EJS_TEMPLATE && EJS_KEY) {
        await emailjs.send(
          EJS_SERVICE,
          EJS_TEMPLATE,
          {
            to_email: recipientRef.current,
            from_name: form.name,
            from_email: form.email,
            phone: form.phone || "—",
            company: form.company || "—",
            subject_label: subjectLabels[form.subject] || form.subject || "—",
            message: form.message,
          },
          EJS_KEY
        );
      }
    } catch {
      // email send failed silently — submission is already in Firestore
    } finally {
      setSending(false);
      setSubmitted(true);
    }
  };

  const handleChange = (ev) => {
    setForm({ ...form, [ev.target.name]: ev.target.value });
    if (errors[ev.target.name]) setErrors({ ...errors, [ev.target.name]: "" });
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#162032] border text-gray-900 dark:text-white text-sm placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-all duration-200 focus:border-green-500 focus:ring-1 focus:ring-green-500/30 ${
      errors[field] ? "border-red-400 dark:border-red-500/60" : "border-gray-300 dark:border-green-900/30"
    }`;

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-[#0a0f1a]">
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_rgba(22,163,74,0.1)_0%,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto text-center">
          <AnimatedSection>
            <span className="text-green-600 dark:text-green-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Let's Talk</span>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-5">Contact Us</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">Have a question, need a product recommendation, or want to discuss a custom formulation? Our team is ready to help.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <AnimatedSection direction="left" className="lg:col-span-2">
            <div className="space-y-6 sticky top-24">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Get in Touch</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Fill in the form and our technical team will respond within one business day. For urgent enquiries, please call us directly.</p>
              </div>
              <div className="space-y-4">
                {company.offices.map((o) => (
                  <div key={o.city} className="p-4 rounded-xl bg-white dark:bg-[#162032] border border-gray-200 dark:border-green-900/20 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                      <span className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wider">{o.city}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mb-1 pl-6">{o.address}</p>
                    {o.poc && (
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-xs mb-0.5 pl-6">
                        <User className="w-3 h-3 text-green-600 dark:text-green-400 shrink-0" />
                        <span className="font-medium text-gray-700 dark:text-gray-300">{o.poc}</span>
                      </div>
                    )}
                    {o.pocEmail && (
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-xs mb-0.5 pl-6">
                        <Mail className="w-3 h-3 text-green-600 dark:text-green-400 shrink-0" />
                        <a href={`mailto:${o.pocEmail}`} className="hover:text-green-600 dark:hover:text-green-400 transition-colors">{o.pocEmail}</a>
                      </div>
                    )}
                    {o.phone && <p className="text-gray-600 dark:text-gray-400 text-xs pl-6">☎ {o.phone}{o.cell ? ` | ${o.cell}` : ""}</p>}
                    {!o.phone && o.cell && <p className="text-gray-600 dark:text-gray-400 text-xs pl-6">☎ {o.cell}</p>}
                  </div>
                ))}
              </div>
              <div className="p-5 rounded-xl bg-green-50 dark:bg-[#0e1f0e] border border-green-200 dark:border-green-900/20">
                <h4 className="text-gray-900 dark:text-white font-semibold mb-3 text-sm">Business Hours</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Monday – Friday</span>
                    <span className="text-gray-700 dark:text-gray-200">9:00 – 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Saturday</span>
                    <span className="text-gray-700 dark:text-gray-200">9:00 – 13:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Sunday</span>
                    <span className="text-gray-400 dark:text-gray-500">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.1} className="lg:col-span-3">
            <div className="p-8 rounded-2xl bg-white dark:bg-[#162032] border border-gray-200 dark:border-green-900/20 shadow-sm dark:shadow-none">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-600/15 border border-green-300 dark:border-green-600/30 flex items-center justify-center mb-5">
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-gray-900 dark:text-white font-bold text-xl mb-2">Message Sent!</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs">Thank you for reaching out. We'll get back to you within one business day.</p>
                  <button onClick={() => { setSubmitted(false); setSending(false); setForm({ name: "", company: "", email: "", phone: "", subject: "", message: "" }); }}
                    className="mt-6 text-green-600 dark:text-green-400 text-sm font-semibold hover:text-green-700 dark:hover:text-green-300 transition-colors">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1.5 font-medium">Full Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} placeholder="John Smith" className={inputClass("name")} />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1.5 font-medium">Company</label>
                      <input name="company" value={form.company} onChange={handleChange} placeholder="Your company" className={inputClass("company")} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1.5 font-medium">Email Address *</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@company.com" className={inputClass("email")} />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1.5 font-medium">Phone Number</label>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+92 300 0000000" className={inputClass("phone")} />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1.5 font-medium">Subject</label>
                    <select name="subject" value={form.subject} onChange={handleChange} className={inputClass("subject")}>
                      <option value="">Select a subject</option>
                      <option value="product">Product Enquiry</option>
                      <option value="custom">Custom Formulation</option>
                      <option value="technical">Technical Support</option>
                      <option value="distribution">Distribution Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="mb-6">
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1.5 font-medium">Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={5}
                      placeholder="Tell us about your requirements..." className={`${inputClass("message")} resize-none`} />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>
                  <button type="submit" disabled={sending} className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-500 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-green-600/30">
                    <Send className="w-4 h-4" /> {sending ? "Sending…" : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
