export type ProjectStatus = "concept" | "documentation" | "in-progress" | "completed";

export type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  type: string;
  location?: string;
  area?: string;
  year?: string;
  status: ProjectStatus;
  coverImage: string;
  gallery: string[];
  task?: string;
  idea?: string;
  placeContext?: string;
  plants?: string[];
  materials?: string[];
  scope?: string[];
  description?: string;
  featured: boolean;
};

export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  result: string;
  duration?: string;
  included: string[];
};

export type Note = {
  slug: string;
  title: string;
  category: string;
  date: string;
  coverImage: string;
  excerpt: string;
  content: string;
};
