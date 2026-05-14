import { db } from "@/lib/db";
import { contactSubmissions } from "@/lib/schema";
import { desc } from "drizzle-orm";
import { formatDate } from "@/lib/utils";
import { Mail, Phone, Calendar } from "lucide-react";

async function getContacts() {
  try {
    return await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  } catch {
    return [];
  }
}

export default async function ContactsPage() {
  const contacts = await getContacts();

  return (
    <main className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-semibold text-white mb-1">Contact Inquiries</h1>
            <p className="font-body text-white/50 text-sm">{contacts.length} total submissions</p>
          </div>

          <div className="space-y-4">
            {contacts.length === 0 && (
              <div className="p-12 text-center rounded-2xl bg-white/5 border border-white/8">
                <Mail size={36} className="text-white/20 mx-auto mb-3" />
                <p className="font-body text-white/40 text-sm">No contact submissions yet.</p>
              </div>
            )}
            {contacts.map((c) => (
              <div key={c.id} className="p-6 rounded-2xl bg-white/5 border border-white/8 hover:border-white/15 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="font-heading text-lg font-semibold text-white">{c.firstName} {c.lastName}</h3>
                      {c.practiceArea && (
                        <span className="px-2.5 py-0.5 rounded-full bg-teal-800/40 text-teal-300 text-xs font-body">{c.practiceArea}</span>
                      )}
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-body font-medium ${c.status === "new" ? "bg-coral-500/20 text-coral-500" : "bg-white/10 text-white/50"}`}>
                        {c.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4 text-sm font-body text-white/55">
                      <div className="flex items-center gap-2">
                        <Mail size={13} className="text-coral-500" />
                        <a href={`mailto:${c.email}`} className="hover:text-white transition-colors">{c.email}</a>
                      </div>
                      {c.phone && (
                        <div className="flex items-center gap-2">
                          <Phone size={13} className="text-coral-500" />
                          <a href={`tel:${c.phone}`} className="hover:text-white transition-colors">{c.phone}</a>
                        </div>
                      )}
                      {c.preferredDate && (
                        <div className="flex items-center gap-2">
                          <Calendar size={13} className="text-coral-500" />
                          <span>Preferred: {c.preferredDate}</span>
                        </div>
                      )}
                    </div>

                    {c.message && (
                      <p className="font-body text-sm text-white/60 bg-white/4 rounded-xl p-4 leading-relaxed">
                        {c.message}
                      </p>
                    )}
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="font-body text-xs text-white/35">{formatDate(c.createdAt.toISOString())}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </main>
  );
}