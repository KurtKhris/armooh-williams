import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import PostEditor from "@/components/admin/PostEditor";

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

export default async function NewArticlePage() {
  const categories = await getCategories();
  return <PostEditor mode="create" categories={categories} />;
}
