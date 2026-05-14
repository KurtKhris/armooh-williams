export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl: string | null;
  published: boolean;
  authorName: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface PostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl: string;
  published: boolean;
  authorName: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  imageUrl?: string;
}

export interface PracticeArea {
  id: string;
  title: string;
  description: string;
  icon: string;
  slug: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  practiceArea: string;
  message: string;
  preferredDate: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  eventDate: string;
  eventTime: string | null;
  location: string | null;
  imageUrl: string | null;
  published: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface EventFormData {
  title: string;
  slug: string;
  description: string;
  eventDate: string;
  eventTime: string;
  location: string;
  imageUrl: string;
  published: boolean;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
}
