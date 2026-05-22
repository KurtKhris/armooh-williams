import { db } from "@/lib/db";
import { practiceAreas } from "@/lib/schema";
import type { PracticeArea } from "@/lib/schema";
import { asc } from "drizzle-orm";
import PracticeAreasList from "./PracticeAreasList";

export default async function PracticeAreasAdminPage() {
  let areas: PracticeArea[] = [];
  try {
    areas = await db
      .select()
      .from(practiceAreas)
      .orderBy(asc(practiceAreas.sortOrder), asc(practiceAreas.createdAt));
  } catch {
    areas = [];
  }

  return (
    <main className="p-8">
      <div className="max-w-4xl mx-auto">
        <PracticeAreasList initial={areas} />
      </div>
    </main>
  );
}
