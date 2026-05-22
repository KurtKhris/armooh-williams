"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/uiSlice";

export default function AdminLoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        dispatch(showToast({ message: "Welcome back!", type: "success" }));
        router.push("/admin/dashboard");
      } else {
        const data = await res.json();
        dispatch(showToast({ message: data.error ?? "Invalid credentials", type: "error" }));
      }
    } catch {
      dispatch(showToast({ message: "Network error. Please try again.", type: "error" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero px-4">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white px-4 py-2 rounded-xl mb-4">
            <Image src="/aw_logo.png" alt="Armooh-Williams, PLLC" width={140} height={56} className="h-14 w-auto object-contain" />
          </div>
          <h1 className="font-heading text-3xl font-semibold text-white mb-1">Admin Portal</h1>
          <p className="font-body text-white/50 text-sm">Armooh-Williams, PLLC</p>
        </div>

        <div className="glass rounded-3xl p-8 border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-body text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@armooh-williams.com"
                  className="w-full pl-10 pr-4 py-3.5 bg-white/8 border border-white/12 rounded-xl text-white placeholder:text-white/25 font-body text-sm focus:outline-none focus:border-coral-500/60 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block font-body text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3.5 bg-white/8 border border-white/12 rounded-xl text-white placeholder:text-white/25 font-body text-sm focus:outline-none focus:border-coral-500/60 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/35 hover:text-white/70 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-coral-500 hover:bg-coral-600 disabled:opacity-60 text-white font-body font-semibold rounded-xl text-sm transition-colors duration-200 shadow-coral"
            >
              {loading ? "Signing In..." : "Sign In"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
