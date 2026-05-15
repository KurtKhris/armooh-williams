import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import PostEditor from "@/components/admin/PostEditor";
import type { Post } from "@/types";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function getPost(id: string) {
  if (!UUID_RE.test(id)) return null;
  const [post] = await db.select().from(posts).where(eq(posts.id, id));
  return post ?? null;
}

async function getCategories(): Promise<string[]> {
  try {
    const rows = await db
      .selectDistinct({ category: posts.category })
      .from(posts)
      .orderBy(posts.category);
    return rows.map((r) => r.category).filter(Boolean) as string[];
  } catch {
    return [];
  }
}

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [post, categories] = await Promise.all([getPost(id), getCategories()]);
  if (!post) notFound();

  const serialized: Post = {
    ...post,
    imageUrl: post.imageUrl ?? null,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  };

  return <PostEditor mode="edit" post={serialized} categories={categories} />;
}
