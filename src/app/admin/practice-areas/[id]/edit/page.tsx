import { db } from "@/lib/db";
import { practiceAreas } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import PracticeAreaForm from "../../PracticeAreaForm";

export default async function EditPracticeAreaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [area] = await db.select().from(practiceAreas).where(eq(practiceAreas.id, id));
  if (!area) notFound();
  return <PracticeAreaForm initial={area} id={id} />;
}
