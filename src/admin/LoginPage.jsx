import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { Lock } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setError("Invalid email or password.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">SAK Admin</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to manage content</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-sm"
        >
          {error && (
            <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div>
            <label className="text-gray-600 text-xs font-medium mb-1.5 block">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@sakchemicals.com"
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors"
            />
          </div>

          <div>
            <label className="text-gray-600 text-xs font-medium mb-1.5 block">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm mt-2"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
