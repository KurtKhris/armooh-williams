"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Lock, Mail, User, Eye, EyeOff } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/uiSlice";

interface AdminProfile {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export default function AdminSettingsPage() {
  const dispatch = useAppDispatch();
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/profile")
      .then((r) => r.json())
      .then((data) => {
        setProfile(data);
        setName(data.name ?? "");
        setEmail(data.email ?? "");
      })
      .catch(() => {});
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword && newPassword !== confirmPassword) {
      dispatch(showToast({ message: "New passwords do not match.", type: "error" }));
      return;
    }

    setSaving(true);
    try {
      const body: Record<string, string> = { name, email };
      if (newPassword) {
        body.currentPassword = currentPassword;
        body.newPassword = newPassword;
      }

      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        setProfile((prev) => prev ? { ...prev, name: data.name, email: data.email } : prev);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        dispatch(showToast({ message: "Profile updated successfully.", type: "success" }));
      } else {
        dispatch(showToast({ message: data.error ?? "Failed to update profile.", type: "error" }));
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="p-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-semibold text-white mb-1">Account Settings</h1>
            <p className="font-body text-white/50 text-sm">Update your admin profile and password.</p>
          </div>

          {/* Avatar / identity card */}
          {profile && (
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/8 mb-6">
              <div className="w-14 h-14 rounded-full bg-coral-500/20 border border-coral-500/30 flex items-center justify-center shrink-0">
                <span className="font-heading text-2xl font-bold text-coral-500">
                  {profile.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-heading text-white font-semibold text-lg">{profile.name}</p>
                <p className="font-body text-white/50 text-sm">{profile.email}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-5">
            {/* Profile info */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/8 space-y-4">
              <h2 className="font-heading text-white text-base font-semibold flex items-center gap-2">
                <User size={16} className="text-coral-500" /> Profile
              </h2>

              <div>
                <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Display Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-white/8 border border-white/10 rounded-xl text-white placeholder:text-white/25 font-body text-sm focus:outline-none focus:border-coral-500/50 transition-colors"
                />
              </div>

              <div>
                <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
                  <span className="flex items-center gap-1.5"><Mail size={11} />Email Address</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@armooh-williams.com"
                  className="w-full px-4 py-3 bg-white/8 border border-white/10 rounded-xl text-white placeholder:text-white/25 font-body text-sm focus:outline-none focus:border-coral-500/50 transition-colors"
                />
              </div>
            </div>

            {/* Password change */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/8 space-y-4">
              <h2 className="font-heading text-white text-base font-semibold flex items-center gap-2">
                <Lock size={16} className="text-coral-500" /> Change Password
              </h2>
              <p className="font-body text-white/40 text-xs">Leave blank to keep your current password.</p>

              <div>
                <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 pr-10 py-3 bg-white/8 border border-white/10 rounded-xl text-white placeholder:text-white/25 font-body text-sm focus:outline-none focus:border-coral-500/50 transition-colors"
                  />
                  <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/35 hover:text-white/70 transition-colors">
                    {showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">New Password</label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="w-full px-4 pr-10 py-3 bg-white/8 border border-white/10 rounded-xl text-white placeholder:text-white/25 font-body text-sm focus:outline-none focus:border-coral-500/50 transition-colors"
                  />
                  <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/35 hover:text-white/70 transition-colors">
                    {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 bg-white/8 border rounded-xl text-white placeholder:text-white/25 font-body text-sm focus:outline-none transition-colors ${
                    confirmPassword && confirmPassword !== newPassword
                      ? "border-red-500/50 focus:border-red-500/70"
                      : "border-white/10 focus:border-coral-500/50"
                  }`}
                />
                {confirmPassword && confirmPassword !== newPassword && (
                  <p className="font-body text-red-400 text-xs mt-1.5">Passwords do not match</p>
                )}
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={saving}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-3 bg-coral-500 hover:bg-coral-600 disabled:opacity-60 text-white font-body font-semibold text-sm rounded-xl transition-colors shadow-coral"
            >
              <Save size={15} />
              {saving ? "Saving..." : "Save Changes"}
            </motion.button>
          </form>
        </div>
    </main>
  );
}
