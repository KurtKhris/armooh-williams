"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Newspaper, Calendar, Mail, LogOut, Plus, ExternalLink, Settings, Globe, Scale, FileText, Star, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Newspaper, label: "News", href: "/admin/news" },
  { icon: Calendar, label: "Events", href: "/admin/events" },
  { icon: Users, label: "Event RSVPs", href: "/admin/event-registrations" },
  { icon: Scale, label: "Capabilities", href: "/admin/practice-areas" },
  { icon: Star, label: "Testimonials", href: "/admin/testimonials" },
  { icon: Mail, label: "Contacts", href: "/admin/contacts" },
  { icon: FileText, label: "Legal Pages", href: "/admin/legal-pages" },
  { icon: Globe, label: "Site Settings", href: "/admin/site-settings" },
  { icon: Settings, label: "Account", href: "/admin/settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/login", { method: "DELETE" });
    router.push("/admin/login");
  };

  return (
    <aside className="w-64 shrink-0 flex flex-col bg-[#071a1f] border-r border-white/8 overflow-y-auto scrollbar-admin">
      {/* Logo */}
      <div className="p-5 border-b border-white/8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-coral-500/30 bg-white shrink-0">
            <Image src="/logo.png" alt="Armooh-Williams, PLLC" width={40} height={40} className="w-full h-full object-contain p-0.5" />
          </div>
          <div>
            <p className="font-heading text-white text-sm font-semibold leading-none">Armooh-Williams</p>
            <p className="font-body text-coral-500 text-[10px] tracking-[0.15em] uppercase mt-0.5">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Quick create shortcuts */}
      <div className="px-4 pt-4 space-y-2">
        <Link
          href="/admin/news/new"
          className="flex items-center gap-2 w-full px-4 py-2.5 bg-coral-500/20 hover:bg-coral-500/30 border border-coral-500/30 rounded-xl text-coral-500 font-body text-sm font-semibold transition-colors duration-200"
        >
          <Plus size={15} />
          New Article
        </Link>
        <Link
          href="/admin/events/new"
          className="flex items-center gap-2 w-full px-4 py-2.5 bg-teal-800/20 hover:bg-teal-800/30 border border-teal-800/30 rounded-xl text-teal-300 font-body text-sm font-semibold transition-colors duration-200"
        >
          <Plus size={15} />
          New Event
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ icon: Icon, label, href }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl font-body text-sm font-medium transition-all duration-200 group relative",
                active
                  ? "bg-coral-500/15 text-white border border-coral-500/25"
                  : "text-white/55 hover:text-white hover:bg-white/6"
              )}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-coral-500 rounded-r-full"
                />
              )}
              <Icon size={17} className={active ? "text-coral-500" : "text-white/40 group-hover:text-white/70 transition-colors"} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer actions */}
      <div className="p-4 border-t border-white/8 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-body text-sm text-white/50 hover:text-white hover:bg-white/6 transition-all duration-200"
        >
          <ExternalLink size={15} />
          View Website
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl font-body text-sm text-white/50 hover:text-red-400 hover:bg-red-500/8 transition-all duration-200 text-left"
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}