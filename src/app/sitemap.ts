import type { MetadataRoute } from 'next'
import { db } from '@/lib/db'
import { posts, practiceAreas, postCategories } from '@/lib/schema'
import { eq } from 'drizzle-orm'
import { slugify } from '@/lib/utils'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://armooh-williams.com'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/about/the-firm`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/capabilities`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/people`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/principal-attorney`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/news`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/insights`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/events`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE_URL}/contact`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/disclaimer`, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const [publishedPosts, publishedAreas, categories] = await Promise.all([
    db
      .select({ slug: posts.slug, updatedAt: posts.updatedAt })
      .from(posts)
      .where(eq(posts.published, true))
      .catch(() => []),
    db
      .select({ slug: practiceAreas.slug, updatedAt: practiceAreas.updatedAt })
      .from(practiceAreas)
      .where(eq(practiceAreas.published, true))
      .catch(() => []),
    db
      .select({ name: postCategories.name })
      .from(postCategories)
      .catch(() => []),
  ])

  const postRoutes: MetadataRoute.Sitemap = publishedPosts.flatMap((post) => [
    {
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/news/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ])

  const areaRoutes: MetadataRoute.Sitemap = publishedAreas.map((area) => ({
    url: `${BASE_URL}/capabilities/${area.slug}`,
    lastModified: area.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/insights/${slugify(cat.name)}`,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...postRoutes, ...areaRoutes, ...categoryRoutes]
}
