import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/schema";
import { eq } from "drizzle-orm";
import TestimonialEditor from "../TestimonialEditor";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, id));
  if (!testimonial) notFound();
  return <TestimonialEditor testimonial={testimonial} mode="edit" />;
}
