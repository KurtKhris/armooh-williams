import { db } from "@/lib/db";
import { postCategories } from "@/lib/schema";
import { asc } from "drizzle-orm";
import PostEditor from "@/components/admin/PostEditor";

async function getCategories(): Promise<string[]> {
  try {
    const rows = await db
      .select({ name: postCategories.name })
      .from(postCategories)
      .orderBy(asc(postCategories.name));
    return rows.map((r) => r.name);
  } catch {
    return [];
  }
}

export default async function NewArticlePage() {
  const categories = await getCategories();
  return <PostEditor mode="create" categories={categories} />;
}
