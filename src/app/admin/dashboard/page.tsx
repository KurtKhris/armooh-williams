import { db } from "@/lib/db";
import { posts, contactSubmissions, events } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import { Newspaper, Mail, Calendar, TrendingUp } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

async function getDashboardData() {
  try {
    const [allPosts, publishedPosts, allEvents, publishedEvents, contacts] = await Promise.all([
      db.select().from(posts).orderBy(desc(posts.createdAt)).limit(5),
      db.select().from(posts).where(eq(posts.published, true)),
      db.select().from(events).orderBy(desc(events.createdAt)).limit(5),
      db.select().from(events).where(eq(events.published, true)),
      db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt)).limit(5),
    ]);
    return { allPosts, publishedCount: publishedPosts.length, allEvents, publishedEventsCount: publishedEvents.length, contacts };
  } catch {
    return { allPosts: [], publishedCount: 0, allEvents: [], publishedEventsCount: 0, contacts: [] };
  }
}

export default async function DashboardPage() {
  const { allPosts, publishedCount, allEvents, publishedEventsCount, contacts } = await getDashboardData();

  const stats = [
    { icon: Newspaper, label: "News Articles", value: allPosts.length, sub: `${publishedCount} published`, color: "text-coral-500 bg-coral-500/20" },
    { icon: Calendar, label: "Events", value: allEvents.length, sub: `${publishedEventsCount} published`, color: "text-teal-300 bg-teal-800/30" },
    { icon: Mail, label: "Inquiries", value: contacts.length, sub: "Contact submissions", color: "text-teal-300 bg-teal-400/20" },
    { icon: TrendingUp, label: "Drafts", value: (allPosts.length - publishedCount) + (allEvents.length - publishedEventsCount), sub: "Unpublished items", color: "text-brand-gold bg-brand-gold/20" },
  ];

  return (
    <main className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-semibold text-white mb-1">Dashboard</h1>
            <p className="font-body text-white/50 text-sm">Welcome back to the Armooh-Williams admin panel.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map(({ icon: Icon, label, value, sub, color }) => (
              <div key={label} className="p-5 rounded-2xl bg-white/5 border border-white/8 hover:border-white/15 transition-colors">
                <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-4`}>
                  <Icon size={18} />
                </div>
                <p className="font-heading text-3xl font-bold text-white mb-1">{value}</p>
                <p className="font-body text-white/60 text-sm font-medium">{label}</p>
                <p className="font-body text-white/35 text-xs mt-0.5">{sub}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent News */}
            <div className="rounded-2xl bg-white/5 border border-white/8 overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-white/8">
                <h2 className="font-heading text-lg font-semibold text-white">Recent News</h2>
                <Link href="/admin/news" className="font-body text-xs text-coral-500 hover:underline">View all</Link>
              </div>
              <div className="divide-y divide-white/6">
                {allPosts.length === 0 && (
                  <p className="p-5 font-body text-white/40 text-sm">No articles yet. <Link href="/admin/news/new" className="text-coral-500 hover:underline">Create one</Link>.</p>
                )}
                {allPosts.map((post) => (
                  <div key={post.id} className="p-4 flex items-center justify-between gap-4 hover:bg-white/4 transition-colors">
                    <div className="min-w-0">
                      <Link href={`/admin/news/${post.id}`} className="font-body text-sm text-white hover:text-coral-500 transition-colors truncate block">
                        {post.title}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-body font-medium ${post.published ? "bg-teal-500/15 text-teal-400" : "bg-brand-gold/15 text-brand-gold"}`}>
                          {post.published ? "Published" : "Draft"}
                        </span>
                        <span className="font-body text-white/35 text-xs">{formatDate(post.createdAt.toISOString())}</span>
                      </div>
                    </div>
                    <Link href={`/admin/news/${post.id}`} className="shrink-0 px-3 py-1.5 rounded-lg bg-white/8 hover:bg-white/15 text-white/60 hover:text-white font-body text-xs transition-colors">
                      Edit
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Contacts */}
            <div className="rounded-2xl bg-white/5 border border-white/8 overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-white/8">
                <h2 className="font-heading text-lg font-semibold text-white">Recent Inquiries</h2>
                <Link href="/admin/contacts" className="font-body text-xs text-coral-500 hover:underline">View all</Link>
              </div>
              <div className="divide-y divide-white/6">
                {contacts.length === 0 && (
                  <p className="p-5 font-body text-white/40 text-sm">No inquiries yet.</p>
                )}
                {contacts.map((c) => (
                  <div key={c.id} className="p-4 hover:bg-white/4 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-body text-sm text-white font-medium">{c.firstName} {c.lastName}</p>
                        <p className="font-body text-xs text-white/40 mt-0.5">{c.email}</p>
                        {c.practiceArea && (
                          <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-teal-800/40 text-teal-300 text-xs font-body">
                            {c.practiceArea}
                          </span>
                        )}
                      </div>
                      <span className="font-body text-white/30 text-xs shrink-0">{formatDate(c.createdAt.toISOString())}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Events */}
          <div className="mt-6 rounded-2xl bg-white/5 border border-white/8 overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-white/8">
              <h2 className="font-heading text-lg font-semibold text-white">Recent Events</h2>
              <Link href="/admin/events" className="font-body text-xs text-coral-500 hover:underline">View all</Link>
            </div>
            <div className="divide-y divide-white/6">
              {allEvents.length === 0 && (
                <p className="p-5 font-body text-white/40 text-sm">No events yet. <Link href="/admin/events/new" className="text-coral-500 hover:underline">Create one</Link>.</p>
              )}
              {allEvents.map((event) => (
                <div key={event.id} className="p-4 flex items-center justify-between gap-4 hover:bg-white/4 transition-colors">
                  <div className="min-w-0 flex items-center gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-teal-800/30 border border-teal-800/20 flex flex-col items-center justify-center text-white">
                      <span className="font-body text-[9px] font-semibold tracking-widest opacity-70">
                        {(() => { try { return new Date(event.eventDate).toLocaleDateString("en-US", { month: "short" }).toUpperCase(); } catch { return ""; } })()}
                      </span>
                      <span className="font-heading text-sm font-bold leading-none">
                        {(() => { try { return new Date(event.eventDate).getDate(); } catch { return ""; } })()}
                      </span>
                    </div>
                    <div>
                      <Link href={`/admin/events/${event.id}`} className="font-body text-sm text-white hover:text-coral-500 transition-colors truncate block">
                        {event.title}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-body font-medium ${event.published ? "bg-teal-500/15 text-teal-400" : "bg-brand-gold/15 text-brand-gold"}`}>
                          {event.published ? "Published" : "Draft"}
                        </span>
                        {event.location && (
                          <span className="font-body text-white/35 text-xs">{event.location}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Link href={`/admin/events/${event.id}`} className="shrink-0 px-3 py-1.5 rounded-lg bg-white/8 hover:bg-white/15 text-white/60 hover:text-white font-body text-xs transition-colors">
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
    </main>
  );
}