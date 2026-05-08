import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";

export default function AdminApp() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  if (user === undefined) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return user ? <Dashboard user={user} /> : <LoginPage />;
}
