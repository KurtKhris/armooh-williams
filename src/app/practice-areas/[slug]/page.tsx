import { redirect } from "next/navigation";

export default async function PracticeAreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/capabilities/${slug}`);
}
