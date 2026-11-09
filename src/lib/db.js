import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { supabase } from "./supabase";

const col = (name) => collection(db, name);
const ref = (name, id) => doc(db, name, id);

const snap = async (name) => {
  const s = await getDocs(col(name));
  return s.docs.map((d) => ({ docId: d.id, ...d.data() }));
};

const snapOrdered = async (name, field) => {
  const s = await getDocs(col(name));
  const docs = s.docs.map((d) => ({ docId: d.id, ...d.data() }));
  return docs.sort((a, b) => (a[field] ?? 9999) - (b[field] ?? 9999));
};

const wrap = (label, fn) => async (...args) => {
  try {
    return await fn(...args);
  } catch (e) {
    console.error(`[db] ${label} failed:`, e.code, e.message);
    throw e;
  }
};

export const getTeam = wrap("getTeam", () => snapOrdered("team", "order"));
export const addTeamMember = wrap("addTeamMember", (data) => addDoc(col("team"), data));
export const updateTeamMember = wrap("updateTeamMember", (id, data) => updateDoc(ref("team", id), data));
export const deleteTeamMember = wrap("deleteTeamMember", (id) => deleteDoc(ref("team", id)));

export const getContacts = wrap("getContacts", () => snap("contacts"));
export const deleteContact = wrap("deleteContact", (id) => deleteDoc(ref("contacts", id)));

export const getNews = wrap("getNews", () => snap("news"));
export const addNewsArticle = wrap("addNewsArticle", (data) => addDoc(col("news"), data));
export const updateNewsArticle = wrap("updateNewsArticle", (id, data) => updateDoc(ref("news", id), data));
export const deleteNewsArticle = wrap("deleteNewsArticle", (id) => deleteDoc(ref("news", id)));

export const uploadResume = wrap("uploadResume", async (file) => {
  const ext = file.name.split(".").pop();
  const path = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from("sak").upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from("sak").getPublicUrl(path);
  return data.publicUrl;
});

export const addApplication = wrap("addApplication", (data) =>
  addDoc(col("applications"), { ...data, createdAt: serverTimestamp() })
);

export const getJobs = wrap("getJobs", () => snapOrdered("jobs", "order"));
export const addJob = wrap("addJob", (data) => addDoc(col("jobs"), data));
export const updateJob = wrap("updateJob", (id, data) => updateDoc(ref("jobs", id), data));
export const deleteJob = wrap("deleteJob", (id) => deleteDoc(ref("jobs", id)));

const SETTINGS_REF = () => doc(db, "settings", "email");
export const getEmailSettings = wrap("getEmailSettings", async () => {
  const d = await getDoc(SETTINGS_REF());
  return d.exists() ? d.data() : { recipientEmail: "info@sakchemicals.com" };
});
export const updateEmailSettings = wrap("updateEmailSettings", (data) =>
  setDoc(SETTINGS_REF(), data, { merge: true })
);
