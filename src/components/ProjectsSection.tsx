import { Project } from '@/types';
import { PROJECTS as DEFAULT_PROJECTS } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';

interface ProjectsSectionProps {
  projects?: Project[];
}

export default function ProjectsSection({ projects = DEFAULT_PROJECTS }: ProjectsSectionProps) {
  const displayProjects = projects && projects.length > 0 ? projects : DEFAULT_PROJECTS;

  return (
    <section id="projects" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-10 scroll-mt-24">
      {/* Header Row */}
      <div className="pb-6 border-b border-graphite/10">
        <div className="space-y-3 max-w-3xl">
          <span className="text-xs sm:text-sm text-olive font-sans font-medium">Портфолио</span>
          <h2 className="font-serif text-3xl sm:text-5xl text-graphite font-normal">
            Проекты и концепции
          </h2>
          <p className="text-sm sm:text-base text-graphite/70 font-sans font-light leading-relaxed">
            Коллекция садов и пространств, созданных с заботой о характере места, инсоляции, почве и образе жизни владельцев.
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {displayProjects.map((project, idx) => (
          <ProjectCard
            key={project.slug}
            project={project}
            aspectRatio={idx % 3 === 0 ? 'wide' : 'square'}
          />
        ))}
      </div>
    </section>
  );
}

