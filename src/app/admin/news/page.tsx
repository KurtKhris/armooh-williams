import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { Plus, Pencil, Eye, EyeOff } from "lucide-react";
import { formatDate } from "@/lib/utils";
import DeleteNewsButton from "./DeleteNewsButton";

async function getPosts() {
  try {
    return await db.select().from(posts).orderBy(desc(posts.createdAt));
  } catch {
    return [];
  }
}

export default async function NewsAdminPage() {
  const allPosts = await getPosts();

  return (
    <main className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading text-3xl font-semibold text-white mb-1">News Articles</h1>
              <p className="font-body text-white/50 text-sm">{allPosts.length} total articles</p>
            </div>
            <Link
              href="/admin/news/new"
              className="flex items-center gap-2 px-5 py-2.5 bg-coral-500 hover:bg-coral-600 text-white font-body font-semibold text-sm rounded-xl transition-colors shadow-coral"
            >
              <Plus size={16} />
              New Article
            </Link>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/8 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="text-left px-5 py-3.5 font-body text-xs font-semibold text-white/40 uppercase tracking-widest">Title</th>
                  <th className="text-left px-4 py-3.5 font-body text-xs font-semibold text-white/40 uppercase tracking-widest hidden md:table-cell">Category</th>
                  <th className="text-left px-4 py-3.5 font-body text-xs font-semibold text-white/40 uppercase tracking-widest hidden lg:table-cell">Date</th>
                  <th className="text-left px-4 py-3.5 font-body text-xs font-semibold text-white/40 uppercase tracking-widest">Status</th>
                  <th className="text-right px-5 py-3.5 font-body text-xs font-semibold text-white/40 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6">
                {allPosts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-10 text-center font-body text-white/40 text-sm">
                      No articles yet.{" "}
                      <Link href="/admin/news/new" className="text-coral-500 hover:underline">Create your first article</Link>.
                    </td>
                  </tr>
                )}
                {allPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-white/4 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="font-body text-sm text-white group-hover:text-coral-500 transition-colors line-clamp-1 max-w-xs">
                        {post.title}
                      </div>
                      <div className="font-body text-xs text-white/35 mt-0.5">/news/{post.slug}</div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="font-body text-xs text-white/55 bg-white/8 px-2.5 py-1 rounded-lg">{post.category}</span>
                    </td>
                    <td className="px-4 py-4 font-body text-xs text-white/40 hidden lg:table-cell">
                      {formatDate(post.createdAt.toISOString())}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-body font-medium ${post.published ? "bg-emerald-400/15 text-emerald-400" : "bg-amber-400/15 text-amber-400"}`}>
                        {post.published ? <Eye size={10} /> : <EyeOff size={10} />}
                        {post.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/news/${post.id}`}
                          className="shrink-0 p-2 rounded-xl hover:bg-white/8 text-white/50 hover:text-white transition-colors"
                          title="Edit"
                        >
                          <Pencil size={15} />
                        </Link>
                        <DeleteNewsButton id={post.id} />
                      </div>
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
