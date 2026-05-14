import Link from "next/link";
import { FileText, Pencil } from "lucide-react";

const LEGAL_PAGES = [
  { type: "privacy", label: "Privacy Policy", description: "How you collect, use, and protect user data." },
  { type: "terms", label: "Terms of Service", description: "Rules and agreements for using the website." },
  { type: "disclaimer", label: "Disclaimer", description: "Limitations of liability and legal notices." },
];

export default function LegalPagesAdminPage() {
  return (
    <main className="p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-semibold text-white mb-1">Legal Pages</h1>
          <p className="font-body text-white/50 text-sm">Edit the content of your legal pages.</p>
        </div>

        <div className="space-y-3">
          {LEGAL_PAGES.map((page) => (
            <div
              key={page.type}
              className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/8 hover:border-white/15 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-coral-500/15 flex items-center justify-center shrink-0">
                <FileText size={16} className="text-coral-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body font-semibold text-white text-sm">{page.label}</p>
                <p className="font-body text-white/40 text-xs mt-0.5">{page.description}</p>
              </div>
              <Link
                href={`/admin/legal-pages/${page.type}`}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/8 hover:bg-coral-500/20 border border-white/10 hover:border-coral-500/30 text-white/60 hover:text-coral-500 font-body text-xs transition-all duration-200"
              >
                <Pencil size={12} />
                Edit
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
