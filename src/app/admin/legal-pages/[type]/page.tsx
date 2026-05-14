import { notFound } from "next/navigation";
import LegalPageEditor from "./LegalPageEditor";
import { db } from "@/lib/db";
import { legalPages } from "@/lib/schema";
import { eq } from "drizzle-orm";

const VALID_TYPES = ["privacy", "terms", "disclaimer"] as const;
type LegalType = (typeof VALID_TYPES)[number];

const TYPE_LABELS: Record<LegalType, string> = {
  privacy: "Privacy Policy",
  terms: "Terms of Service",
  disclaimer: "Disclaimer",
};

export default async function LegalPageEditorPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  if (!VALID_TYPES.includes(type as LegalType)) notFound();
  const legalType = type as LegalType;

  let page = { type: legalType, title: TYPE_LABELS[legalType], content: "" };
  try {
    const [existing] = await db.select().from(legalPages).where(eq(legalPages.type, legalType));
    if (existing) page = existing;
  } catch {
    // table may not exist yet; use defaults
  }

  return <LegalPageEditor type={legalType} initial={page} label={TYPE_LABELS[legalType]} />;
}
