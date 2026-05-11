import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { Users, Newspaper, LogOut, Briefcase } from "lucide-react";
import TeamManager from "./TeamManager";
import NewsManager from "./NewsManager";
import JobsManager from "./JobsManager";

const TABS = [
  { id: "team", label: "Team", Icon: Users },
  { id: "news", label: "News", Icon: Newspaper },
  { id: "jobs", label: "Jobs", Icon: Briefcase },
];

export default function Dashboard({ user }) {
  const [activeTab, setActiveTab] = useState("team");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-gray-900 font-bold text-lg">
              SAK <span className="text-green-600 font-light">Admin</span>
            </span>
            <nav className="flex gap-1">
              {TABS.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === id
                      ? "bg-green-50 text-green-600"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-xs hidden sm:block">{user.email}</span>
            <button
              onClick={() => signOut(auth)}
              className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:block">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "team" && <TeamManager />}
        {activeTab === "news" && <NewsManager />}
        {activeTab === "jobs" && <JobsManager />}
      </main>
    </div>
  );
}
