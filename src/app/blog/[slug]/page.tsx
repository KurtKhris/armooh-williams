import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { WhatsAppButton, ScrollToTop, Toast } from "@/components/ui/FloatingWidgets";
import ConsultationModal from "@/components/sections/ConsultationModal";
import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { Clock, Tag, ArrowLeft, User } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  try {
    const [post] = await db.select().from(posts).where(eq(posts.slug, slug));
    return post ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt || post.content.slice(0, 160),
    openGraph: { title: post.title, description: post.excerpt || undefined, images: post.imageUrl ? [post.imageUrl] : [] },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post || !post.published) notFound();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-28 pb-12 gradient-hero">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-white font-body text-sm transition-colors mb-8">
              <ArrowLeft size={15} /> Back to Blog
            </Link>
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm font-body">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-coral-500/20 text-coral-500 font-semibold">
                <Tag size={11} />{post.category}
              </span>
              <span className="flex items-center gap-1.5 text-white/50">
                <Clock size={11} />{formatDate(post.createdAt.toISOString())}
              </span>
              <span className="flex items-center gap-1.5 text-white/50">
                <User size={11} />{post.authorName}
              </span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-semibold text-white leading-tight mb-6">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="font-body text-white/60 text-lg leading-relaxed">{post.excerpt}</p>
            )}
          </div>
        </section>

        {/* Featured image */}
        {post.imageUrl && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-0">
            <div className="rounded-3xl overflow-hidden h-72 sm:h-96">
              <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        {/* Content */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-4 gap-10">
              <article className="lg:col-span-3 prose prose-lg max-w-none font-body text-brand-dark/80 leading-relaxed">
                {/* Render content — in production, use a markdown renderer */}
                <div className="whitespace-pre-wrap font-body text-brand-dark/75 leading-[1.85] text-base">
                  {post.content}
                </div>
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-28 space-y-5">
                  <div className="p-5 rounded-2xl bg-linear-to-br from-teal-800 to-teal-950 border border-white/10">
                    <h3 className="font-heading text-lg font-semibold text-white mb-3">Need Legal Advice?</h3>
                    <p className="font-body text-white/60 text-sm mb-4">Schedule a confidential consultation with our attorneys.</p>
                    <Link href="/contact" className="block w-full text-center py-2.5 bg-coral-500 hover:bg-coral-600 text-white font-body font-semibold text-sm rounded-xl transition-colors">
                      Book Consultation
                    </Link>
                  </div>

                  <div className="p-5 rounded-2xl bg-brand-gray/50 border border-brand-gray">
                    <h4 className="font-heading text-base font-semibold text-brand-dark mb-2">About the Author</h4>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-teal-800 flex items-center justify-center text-white font-heading font-bold text-lg shrink-0">
                        {post.authorName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-body text-sm font-semibold text-brand-dark">{post.authorName}</p>
                        <p className="font-body text-xs text-brand-dark/55">Armooh-Williams, PLLC</p>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Back to blog */}
        <section className="py-10 bg-brand-gray/30 border-t border-brand-gray">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-teal-800 hover:text-coral-500 font-body font-semibold text-sm transition-colors">
              <ArrowLeft size={15} /> Back to All Articles
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <ConsultationModal />
      <WhatsAppButton />
      <ScrollToTop />
      <Toast />
    </>
  );
}
