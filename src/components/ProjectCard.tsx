import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  aspectRatio?: 'square' | 'wide' | 'tall';
}

export default function ProjectCard({ project, aspectRatio = 'wide' }: ProjectCardProps) {
  const aspectClasses = {
    square: 'aspect-square',
    wide: 'aspect-[16/10]',
    tall: 'aspect-[4/5]',
  };

  return (
    <Link href={`/projects/${project.slug}`} className="group block space-y-4">
      <div className={`relative overflow-hidden rounded-xl bg-sand/20 ${aspectClasses[aspectRatio]}`}>
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-graphite/10 group-hover:bg-transparent transition-colors duration-300" />
        
        {/* Status badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-[#FAF8F5]/90 backdrop-blur-md rounded-full text-xs font-sans text-graphite font-medium">
            {project.type}
          </span>
        </div>
      </div>

      <div className="space-y-1.5 px-1">
        <div className="flex items-center justify-between text-xs text-graphite/60 font-sans">
          <span>{project.year}</span>
          {project.location && <span>{project.location}</span>}
        </div>
        <h3 className="font-serif text-2xl text-graphite group-hover:text-olive transition-colors font-medium">
          {project.title}
        </h3>
        {project.subtitle && (
          <p className="text-xs text-graphite/70 font-sans leading-relaxed line-clamp-2">
            {project.subtitle}
          </p>
        )}
      </div>
    </Link>
  );
}
