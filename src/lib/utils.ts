import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

export function formatDate(dateString: string | Date): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function stripHtml(html: string): string {
  if (!html) return "";
  const decoded = html
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ');
  return decoded.replace(/<[^>]*>?/gm, '');
}

export function truncate(text: string, length: number): string {
  const plainText = stripHtml(text);
  if (plainText.length <= length) return plainText;
  return plainText.slice(0, length).trimEnd() + "…";
}

export const PRACTICE_AREAS = [
  { id: "corporate", title: "Corporate Law", icon: "building", slug: "corporate-law", description: "Expert guidance on business formation, mergers, acquisitions, and corporate governance." },
  { id: "litigation", title: "Litigation", icon: "gavel", slug: "litigation", description: "Aggressive, strategic representation in civil and commercial disputes at all court levels." },
  { id: "immigration", title: "Immigration Law", icon: "globe", slug: "immigration-law", description: "Comprehensive immigration services for individuals, families, and businesses worldwide." },
  { id: "family", title: "Family Law", icon: "heart", slug: "family-law", description: "Compassionate advocacy in divorce, custody, adoption, and all family-related legal matters." },
  { id: "realestate", title: "Real Estate Law", icon: "home", slug: "real-estate-law", description: "End-to-end legal support for residential, commercial, and investment real estate transactions." },
  { id: "international", title: "International Law", icon: "earth", slug: "international-law", description: "Cross-border legal solutions for multinational businesses and international individuals." },
  { id: "ip", title: "Intellectual Property", icon: "lightbulb", slug: "intellectual-property", description: "Protection of patents, trademarks, copyrights, and trade secrets on a global scale." },
  { id: "arbitration", title: "Arbitration", icon: "scale", slug: "arbitration", description: "Efficient alternative dispute resolution through expert arbitration and mediation services." },
] as const;

export const TESTIMONIALS = [
  { id: 1, name: "David Chen", role: "CEO, TechVentures International", content: "Armooh-Williams, PLLC provided exceptional guidance during our complex cross-border merger. Their expertise in international corporate law is unmatched. They delivered results that exceeded our expectations.", rating: 5, imageUrl: "" },
  { id: 2, name: "Amara Osei", role: "Founder, Osei Family Holdings", content: "When navigating a sensitive estate matter, the team handled everything with the utmost professionalism and discretion. I felt in capable hands from day one. Truly world-class legal counsel.", rating: 5, imageUrl: "" },
  { id: 3, name: "Sarah Mitchell", role: "COO, Mitchell & Partners LLC", content: "Their litigation team secured a landmark victory in our commercial dispute. Strategic, thorough, and relentlessly effective. They are the gold standard in corporate litigation.", rating: 5, imageUrl: "" },
  { id: 4, name: "Kwame Asante", role: "Entrepreneur & Investor", content: "The immigration team made my business visa process seamless. Their attention to detail and global network gave me confidence throughout. I highly recommend their services to any international entrepreneur.", rating: 5, imageUrl: "" },
  { id: 5, name: "Elena Vasquez", role: "Managing Director, Vasquez Capital", content: "Outstanding real estate legal services. They handled our multi-property portfolio acquisition with precision and speed. An indispensable partner for any serious real estate investor.", rating: 5, imageUrl: "" },
] as const;

export const STATS = [
  { value: 15, suffix: "+", label: "Years of Excellence" },
  { value: 500, suffix: "+", label: "Successful Cases" },
  { value: 40, suffix: "+", label: "Global Clients" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
] as const;

export const BLOG_CATEGORIES = [
  "All",
  "Corporate Law",
  "Immigration",
  "Litigation",
  "Real Estate",
  "Family Law",
  "International Law",
  "Legal Insights",
];
