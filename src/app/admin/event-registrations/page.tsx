import { db } from "@/lib/db";
import { eventRegistrations, events } from "@/lib/schema";
import { desc, eq } from "drizzle-orm";
import { Calendar, User, Mail, Phone, MessageSquare } from "lucide-react";
import DeleteRegistrationButton from "./DeleteRegistrationButton";

export const revalidate = 0;

async function getRegistrations() {
  try {
    return await db
      .select({
        id: eventRegistrations.id,
        firstName: eventRegistrations.firstName,
        lastName: eventRegistrations.lastName,
        email: eventRegistrations.email,
        phone: eventRegistrations.phone,
        message: eventRegistrations.message,
        createdAt: eventRegistrations.createdAt,
        eventTitle: events.title,
      })
      .from(eventRegistrations)
      .leftJoin(events, eq(eventRegistrations.eventId, events.id))
      .orderBy(desc(eventRegistrations.createdAt));
  } catch {
    return [];
  }
}

function formatDate(dateStr: string | Date) {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", { 
      year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" 
    });
  } catch {
    return String(dateStr);
  }
}

export default async function EventRegistrationsAdminPage() {
  const allRegistrations = await getRegistrations();

  return (
    <main className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading text-3xl font-semibold text-white mb-1">Event RSVPs</h1>
              <p className="font-body text-white/50 text-sm">{allRegistrations.length} total registrations</p>
            </div>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/8 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="text-left px-5 py-3.5 font-body text-xs font-semibold text-white/40 uppercase tracking-widest">Attendee</th>
                  <th className="text-left px-4 py-3.5 font-body text-xs font-semibold text-white/40 uppercase tracking-widest hidden md:table-cell">Contact Info</th>
                  <th className="text-left px-4 py-3.5 font-body text-xs font-semibold text-white/40 uppercase tracking-widest">Event</th>
                  <th className="text-left px-4 py-3.5 font-body text-xs font-semibold text-white/40 uppercase tracking-widest hidden lg:table-cell">Date Registered</th>
                  <th className="text-right px-5 py-3.5 font-body text-xs font-semibold text-white/40 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6">
                {allRegistrations.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-10 text-center font-body text-white/40 text-sm">
                      No registrations found.
                    </td>
                  </tr>
                )}
                {allRegistrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-white/4 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 font-body text-sm text-white transition-colors">
                        <User size={13} className="text-white/40" />
                        {reg.firstName} {reg.lastName}
                      </div>
                      {reg.message && (
                        <div className="flex items-start gap-1.5 font-body text-xs text-white/40 mt-1.5 max-w-[200px]">
                          <MessageSquare size={11} className="mt-0.5 shrink-0" />
                          <span className="line-clamp-2 italic">&quot;{reg.message}&quot;</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <div className="flex flex-col gap-1.5 font-body text-xs text-white/55">
                        <span className="flex items-center gap-1.5">
                          <Mail size={11} className="text-coral-500" />
                          <a href={`mailto:${reg.email}`} className="hover:text-coral-500 hover:underline">{reg.email}</a>
                        </span>
                        {reg.phone && (
                          <span className="flex items-center gap-1.5">
                            <Phone size={11} className="text-coral-500" />
                            <a href={`tel:${reg.phone}`} className="hover:text-coral-500 hover:underline">{reg.phone}</a>
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-body text-sm font-medium text-teal-300">
                        {reg.eventTitle || <span className="text-white/30 italic">Unknown Event</span>}
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="flex items-center gap-1.5 font-body text-xs text-white/55">
                        <Calendar size={11} className="text-white/30" />
                        {formatDate(reg.createdAt)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <DeleteRegistrationButton id={reg.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </main>
  );
}
