import { notFound } from 'next/navigation';
import { getProjectBySlug, getProjects } from '@/lib/supabase/queries';
import { PROJECTS as STATIC_PROJECTS } from '@/data/projects';
import ProjectDetailClient from '@/components/ProjectDetailClient';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return (projects && projects.length > 0 ? projects : STATIC_PROJECTS).map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: 'Проект не найден' };

  return {
    title: `${project.title} — Проект бюро «Место силы»`,
    description: project.subtitle || project.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const allProjects = await getProjects();
  const projectIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject =
    allProjects.length > 1
      ? allProjects[(projectIndex + 1) % allProjects.length]
      : project;

  return (
    <ProjectDetailClient
      initialProject={project}
      nextProject={nextProject}
    />
  );
}
