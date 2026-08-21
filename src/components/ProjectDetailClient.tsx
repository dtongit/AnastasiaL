'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { getProjectBySlug } from '@/lib/supabase/queries';
import { Project } from '@/types';
import { getImagePath } from '@/utils/image';
import ContactForm from '@/components/ContactForm';

interface ProjectDetailClientProps {
  initialProject: Project;
  nextProject?: Project;
}

export default function ProjectDetailClient({
  initialProject,
  nextProject,
}: ProjectDetailClientProps) {
  const [project, setProject] = useState<Project>(initialProject);

  useEffect(() => {
    async function loadLiveProject() {
      try {
        const live = await getProjectBySlug(initialProject.slug);
        if (live) {
          setProject(live);
        }
      } catch (err) {
        console.warn('Could not load live project:', err);
      }
    }

    loadLiveProject();
  }, [initialProject.slug]);

  return (
    <div className="space-y-16 pb-20">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-4">
        <Link
          href="/#projects"
          className="inline-flex items-center text-xs sm:text-sm text-graphite/70 hover:text-graphite font-sans font-medium transition-colors"
        >
          <span>← Все проекты</span>
        </Link>
      </div>

      {/* Hero Cover */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden shadow-sm bg-sand/20">
          <Image
            src={getImagePath(project.coverImage)}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>

      {/* Title & Metadata */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-graphite/10 pb-12">
          <div className="lg:col-span-8 space-y-4">
            <span className="inline-block px-3 py-1 bg-sand/30 text-graphite text-xs font-sans rounded-full font-medium">
              {project.type}
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl text-graphite font-normal">
              {project.title}
            </h1>
            {project.subtitle && (
              <p className="text-lg text-graphite/70 font-sans font-light leading-relaxed">
                {project.subtitle}
              </p>
            )}
          </div>

          <div className="lg:col-span-4 bg-[#FAF8F5] p-6 rounded-xl border border-sand/40 space-y-4 text-xs sm:text-sm font-sans">
            <div className="flex justify-between border-b border-graphite/10 pb-2">
              <span className="text-graphite/60">Период:</span>
              <span className="font-medium text-graphite">{project.year || 'Уточняется'}</span>
            </div>
            {project.location && (
              <div className="flex justify-between border-b border-graphite/10 pb-2">
                <span className="text-graphite/60">Регион:</span>
                <span className="font-medium text-graphite">{project.location}</span>
              </div>
            )}
            {project.area && (
              <div className="flex justify-between border-b border-graphite/10 pb-2">
                <span className="text-graphite/60">Площадь:</span>
                <span className="font-medium text-graphite">{project.area}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-graphite/60">Статус:</span>
              <span className="font-medium text-olive">
                {project.status === 'completed'
                  ? 'Завершён'
                  : project.status === 'in-progress'
                  ? 'В процессе'
                  : 'Концепция / Проектирование'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Task & Context */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {project.task && (
            <div className="space-y-3 bg-[#FAF8F5] p-8 rounded-xl border border-sand/30">
              <span className="text-xs sm:text-sm font-medium text-olive font-sans">Задача</span>
              <h2 className="font-serif text-2xl text-graphite">Задача сада</h2>
              <p className="text-sm text-graphite/80 font-sans font-light leading-relaxed">
                {project.task}
              </p>
            </div>
          )}

          {project.idea && (
            <div className="space-y-3 bg-[#FAF8F5] p-8 rounded-xl border border-sand/30">
              <span className="text-xs sm:text-sm font-medium text-olive font-sans">Идея</span>
              <h2 className="font-serif text-2xl text-graphite">Концептуальное решение</h2>
              <p className="text-sm text-graphite/80 font-sans font-light leading-relaxed">
                {project.idea}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Plants & Materials */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {project.plants && project.plants.length > 0 && (
            <div className="space-y-4 p-6 border border-graphite/10 rounded-xl bg-white/50">
              <h3 className="font-serif text-xl text-graphite font-medium">Растения</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-graphite/80 font-sans">
                {project.plants.map((plant, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-olive shrink-0" />
                    <span>{plant}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.materials && project.materials.length > 0 && (
            <div className="space-y-4 p-6 border border-graphite/10 rounded-xl bg-white/50">
              <h3 className="font-serif text-xl text-graphite font-medium">Материалы и покрытия</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-graphite/80 font-sans">
                {project.materials.map((mat, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sand shrink-0" />
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.scope && project.scope.length > 0 && (
            <div className="space-y-4 p-6 border border-graphite/10 rounded-xl bg-white/50">
              <h3 className="font-serif text-xl text-graphite font-medium">Состав работы</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-graphite/80 font-sans">
                {project.scope.map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-olive shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-8">
          <h2 className="font-serif text-3xl text-graphite">Галерея и эскизы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.gallery.map((imgUrl, i) => (
              <div key={i} className="relative aspect-[16/10] rounded-xl overflow-hidden bg-sand/20 shadow-sm">
                <Image
                  src={getImagePath(imgUrl)}
                  alt={`${project.title} - фото ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next Project Link */}
      {nextProject && (
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8">
          <div className="p-8 bg-[#FAF8F5] rounded-2xl border border-sand/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs sm:text-sm text-graphite/50 font-sans font-medium">Следующий проект</span>
              <h3 className="font-serif text-3xl text-graphite mt-1">{nextProject.title}</h3>
            </div>
            <Link
              href={`/projects/${nextProject.slug}`}
              className="px-6 py-3 rounded-full bg-graphite text-milk text-xs sm:text-sm font-sans font-medium hover:bg-olive transition-colors inline-flex items-center"
            >
              <span>Смотреть проект</span>
            </Link>
          </div>
        </div>
      )}

      {/* Contact CTA */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12">
        <div className="max-w-3xl space-y-3 mb-8">
          <span className="text-xs sm:text-sm font-medium text-olive font-sans">Ваш участок</span>
          <h2 className="font-serif text-3xl sm:text-5xl text-graphite">
            Обсудить похожую задачу для вашего сада
          </h2>
        </div>
        <ContactForm showTitle={false} />
      </div>
    </div>
  );
}
