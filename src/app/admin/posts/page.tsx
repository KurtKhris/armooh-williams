import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { Plus, Pencil, Eye, EyeOff } from "lucide-react";
import { formatDate } from "@/lib/utils";

async function getPosts() {
  try {
    return await db.select().from(posts).orderBy(desc(posts.createdAt));
  } catch {
    return [];
  }
}

export default async function PostsPage() {
  const allPosts = await getPosts();

  return (
    <main className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading text-3xl font-semibold text-white mb-1">Blog Posts</h1>
              <p className="font-body text-white/50 text-sm">{allPosts.length} total articles</p>
            </div>
            <Link
              href="/admin/posts/new"
              className="flex items-center gap-2 px-5 py-2.5 bg-coral-500 hover:bg-coral-600 text-white font-body font-semibold text-sm rounded-xl transition-colors shadow-coral"
            >
              <Plus size={16} />
              New Post
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
                      No posts yet.{" "}
                      <Link href="/admin/posts/new" className="text-coral-500 hover:underline">Create your first post</Link>.
                    </td>
                  </tr>
                )}
                {allPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-white/4 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="font-body text-sm text-white group-hover:text-coral-500 transition-colors line-clamp-1 max-w-xs">
                        {post.title}
                      </div>
                      <div className="font-body text-xs text-white/35 mt-0.5">/blog/{post.slug}</div>
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
                      <Link
                        href={`/admin/posts/${post.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/8 hover:bg-coral-500/20 border border-white/10 hover:border-coral-500/30 text-white/60 hover:text-coral-500 font-body text-xs transition-all duration-200"
                      >
                        <Pencil size={11} />
                        Edit
                      </Link>
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