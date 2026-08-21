'use client';

import { useState } from 'react';
import { Project, ProjectStatus } from '@/types';
import { saveProject, deleteProject } from '@/lib/supabase/queries';
import ImageUploadField from './ImageUploadField';
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
  Eye,
  ArrowUp,
  ArrowDown,
  Layers,
  Image as ImageIcon,
} from 'lucide-react';
import Link from 'next/link';

interface ProjectsManagerProps {
  initialProjects: Project[];
}

export default function ProjectsManager({ initialProjects }: ProjectsManagerProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Tag list helpers
  const [tagInput, setTagInput] = useState<{ plants: string; materials: string; scope: string }>({
    plants: '',
    materials: '',
    scope: '',
  });

  const handleCreateNew = () => {
    const newProject: Partial<Project> = {
      slug: `new-project-${Date.now()}`,
      title: 'Новый проект сада',
      subtitle: 'Краткое описание характера проекта',
      type: 'Частный сад',
      location: 'Московская область',
      area: '25 соток',
      year: '2026',
      status: 'in-progress' as ProjectStatus,
      coverImage: '/images/cv_1_toskana.webp',
      gallery: ['/images/cv_1_toskana.webp'],
      task: 'Формирование концепции сада...',
      idea: 'Природные растительные матрицы...',
      placeContext: 'Солнечный участок с легким уклоном',
      plants: ['Шалфей дубравный', 'Котовник Фассена', 'Вейник'],
      materials: ['Песчаник', 'Лиственница', 'Гравий'],
      scope: ['Эскизный проект', 'Дендроплан', 'Авторский надзор'],
      description: 'Гармоничный сад, созданный для комфортной загородной жизни.',
      featured: true,
      display_order: projects.length,
    };
    setEditingProject(newProject);
  };

  const handleEdit = (p: Project) => {
    setEditingProject({ ...p });
  };

  const handleSaveEditing = async () => {
    if (!editingProject || !editingProject.title || !editingProject.slug) {
      setFeedback({ type: 'error', message: 'Укажите название и URL-идентификатор (slug)' });
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    const res = await saveProject(editingProject);
    setIsSaving(false);

    if (res.success) {
      setFeedback({ type: 'success', message: 'Проект успешно сохранен!' });
      // Update local state
      const saved = res.data || editingProject;
      setProjects((prev) => {
        const idx = prev.findIndex((p) => (p.id && p.id === saved.id) || p.slug === saved.slug);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], ...saved };
          return next;
        }
        return [...prev, saved as Project];
      });
      setEditingProject(null);
    } else {
      setFeedback({ type: 'error', message: res.error || 'Ошибка при сохранении проекта' });
    }
  };

  const handleDelete = async (project: Project) => {
    if (!confirm(`Вы действительно хотите удалить проект «${project.title}»?`)) return;

    setIsSaving(true);
    const res = await deleteProject(project.id || project.slug);
    setIsSaving(false);

    if (res.success) {
      setProjects((prev) => prev.filter((p) => p.slug !== project.slug));
      setFeedback({ type: 'success', message: `Проект «${project.title}» удален.` });
      if (editingProject?.slug === project.slug) {
        setEditingProject(null);
      }
    } else {
      setFeedback({ type: 'error', message: res.error || 'Ошибка удаления' });
    }
  };

  const handleAddGalleryImage = (url: string) => {
    if (!url || !editingProject) return;
    const current = editingProject.gallery || [];
    setEditingProject({ ...editingProject, gallery: [...current, url] });
  };

  const handleRemoveGalleryImage = (index: number) => {
    if (!editingProject) return;
    const current = editingProject.gallery || [];
    setEditingProject({
      ...editingProject,
      gallery: current.filter((_, i) => i !== index),
    });
  };

  const handleAddTag = (field: 'plants' | 'materials' | 'scope') => {
    const val = tagInput[field].trim();
    if (!val || !editingProject) return;
    const current = editingProject[field] || [];
    setEditingProject({ ...editingProject, [field]: [...current, val] });
    setTagInput({ ...tagInput, [field]: '' });
  };

  const handleRemoveTag = (field: 'plants' | 'materials' | 'scope', index: number) => {
    if (!editingProject) return;
    const current = editingProject[field] || [];
    setEditingProject({
      ...editingProject,
      [field]: current.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-8">
      {/* Top action bar */}
      <div className="bg-white rounded-3xl border border-sand/50 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl text-graphite font-medium">
            Управление портфолио ({projects.length} проектов)
          </h2>
          <p className="text-xs sm:text-sm text-graphite/60 font-sans mt-1">
            Добавляйте новые объекты, меняйте описания, галереи и состав растений
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="px-6 py-2.5 rounded-full bg-olive text-milk font-sans text-xs font-semibold hover:bg-olive/90 transition-all flex items-center gap-2 shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Добавить проект
        </button>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 text-xs font-sans ${
            feedback.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Editor Modal / Drawer if editing */}
      {editingProject && (
        <div className="bg-white rounded-3xl border-2 border-olive/30 p-6 sm:p-10 space-y-8 shadow-xl relative">
          <div className="flex items-center justify-between pb-6 border-b border-sand/40">
            <div className="space-y-1">
              <span className="text-xs text-olive font-mono font-medium">Редактирование</span>
              <h3 className="font-serif text-2xl sm:text-3xl text-graphite font-medium">
                {editingProject.title || 'Новый проект'}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleSaveEditing}
                disabled={isSaving}
                className="px-6 py-2 rounded-full bg-olive text-milk font-sans text-xs font-semibold hover:bg-olive/90 transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Сохранение...' : 'Сохранить'}
              </button>
              <button
                onClick={() => setEditingProject(null)}
                className="p-2 rounded-full border border-sand hover:bg-sand/20 text-graphite"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title & Slug */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-graphite font-sans">
                Название проекта
              </label>
              <input
                type="text"
                value={editingProject.title || ''}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, title: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-sand/60 font-serif text-lg text-graphite focus:outline-none focus:border-olive"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-graphite font-sans">
                URL-идентификатор (slug, латиницей)
              </label>
              <input
                type="text"
                value={editingProject.slug || ''}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    slug: e.target.value
                      .toLowerCase()
                      .replace(/\s+/g, '-')
                      .replace(/[^a-z0-9-]/g, ''),
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-sand/60 font-mono text-xs text-graphite focus:outline-none focus:border-olive"
              />
            </div>

            {/* Subtitle */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-xs font-medium text-graphite font-sans">
                Подзаголовок (характер сада)
              </label>
              <input
                type="text"
                value={editingProject.subtitle || ''}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, subtitle: e.target.value })
                }
                className="w-full px-4 py-2 rounded-xl border border-sand/60 font-sans text-xs focus:outline-none focus:border-olive"
              />
            </div>

            {/* Meta attributes */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-graphite font-sans">
                Тип объекта
              </label>
              <input
                type="text"
                value={editingProject.type || ''}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, type: e.target.value })
                }
                placeholder="Частный сад / Общественное пространство"
                className="w-full px-4 py-2 rounded-xl border border-sand/60 font-sans text-xs focus:outline-none focus:border-olive"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-graphite font-sans">
                Статус проекта
              </label>
              <select
                value={editingProject.status || 'completed'}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    status: e.target.value as ProjectStatus,
                  })
                }
                className="w-full px-4 py-2 rounded-xl border border-sand/60 font-sans text-xs focus:outline-none focus:border-olive bg-white"
              >
                <option value="completed">Завершён (completed)</option>
                <option value="in-progress">В процессе реализации (in-progress)</option>
                <option value="documentation">Рабочая документация (documentation)</option>
                <option value="concept">Концепция (concept)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-graphite font-sans">
                Период / Год
              </label>
              <input
                type="text"
                value={editingProject.year || ''}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, year: e.target.value })
                }
                placeholder="2025–2026"
                className="w-full px-4 py-2 rounded-xl border border-sand/60 font-sans text-xs focus:outline-none focus:border-olive"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-graphite font-sans">
                Площадь
              </label>
              <input
                type="text"
                value={editingProject.area || ''}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, area: e.target.value })
                }
                placeholder="25 соток / 1500 м²"
                className="w-full px-4 py-2 rounded-xl border border-sand/60 font-sans text-xs focus:outline-none focus:border-olive"
              />
            </div>

            {/* Cover photo */}
            <div className="space-y-2 md:col-span-2">
              <ImageUploadField
                label="Главная обложка проекта"
                value={editingProject.coverImage || ''}
                onChange={(url) =>
                  setEditingProject({ ...editingProject, coverImage: url })
                }
                folder="projects"
                aspectHint="16:9 или 4:3"
              />
            </div>

            {/* Gallery Images */}
            <div className="space-y-3 md:col-span-2 pt-4 border-t border-sand/30">
              <label className="block text-xs font-medium text-graphite font-sans">
                Галерея фотографий проекта ({editingProject.gallery?.length || 0} фото)
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {editingProject.gallery?.map((imgUrl, gIdx) => (
                  <div key={gIdx} className="relative aspect-[16/10] rounded-xl overflow-hidden border border-sand/50 group bg-sand/10">
                    <img src={imgUrl} alt="gallery" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(gIdx)}
                      className="absolute top-2 right-2 p-1 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <ImageUploadField
                label="Добавить дополнительное фото в галерею"
                value=""
                onChange={handleAddGalleryImage}
                folder="projects/gallery"
              />
            </div>

            {/* Task & Idea */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-graphite font-sans">
                Задача сада
              </label>
              <textarea
                rows={3}
                value={editingProject.task || ''}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, task: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl border border-sand/60 font-sans text-xs focus:outline-none focus:border-olive"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-graphite font-sans">
                Концептуальная идея
              </label>
              <textarea
                rows={3}
                value={editingProject.idea || ''}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, idea: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl border border-sand/60 font-sans text-xs focus:outline-none focus:border-olive"
              />
            </div>

            {/* Context & Description */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-graphite font-sans">
                Контекст места и рельеф
              </label>
              <textarea
                rows={3}
                value={editingProject.placeContext || ''}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, placeContext: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl border border-sand/60 font-sans text-xs focus:outline-none focus:border-olive"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-graphite font-sans">
                Итоговое описание
              </label>
              <textarea
                rows={3}
                value={editingProject.description || ''}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, description: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl border border-sand/60 font-sans text-xs focus:outline-none focus:border-olive"
              />
            </div>

            {/* Tags: Plants, Materials, Scope */}
            <div className="space-y-2 md:col-span-2 pt-4 border-t border-sand/30">
              <h4 className="text-xs font-medium text-graphite font-sans mb-2">
                Списки растений, материалов и состава работ
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Plants */}
                <div className="p-4 rounded-2xl bg-milk-light/60 border border-sand/40 space-y-3">
                  <span className="text-xs font-medium text-olive font-sans block">Растения</span>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      placeholder="Напр. Шалфей"
                      value={tagInput.plants}
                      onChange={(e) => setTagInput({ ...tagInput, plants: e.target.value })}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddTag('plants')}
                      className="flex-1 px-2.5 py-1 rounded-lg border border-sand/50 text-xs font-sans"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddTag('plants')}
                      className="px-2 py-1 rounded-lg bg-olive text-milk text-xs"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                    {editingProject.plants?.map((plant, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sand/30 text-graphite text-[11px]"
                      >
                        {plant}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag('plants', idx)}
                          className="hover:text-red-600"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Materials */}
                <div className="p-4 rounded-2xl bg-milk-light/60 border border-sand/40 space-y-3">
                  <span className="text-xs font-medium text-graphite font-sans block">
                    Материалы
                  </span>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      placeholder="Напр. Песчаник"
                      value={tagInput.materials}
                      onChange={(e) => setTagInput({ ...tagInput, materials: e.target.value })}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddTag('materials')}
                      className="flex-1 px-2.5 py-1 rounded-lg border border-sand/50 text-xs font-sans"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddTag('materials')}
                      className="px-2 py-1 rounded-lg bg-olive text-milk text-xs"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                    {editingProject.materials?.map((mat, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sand/30 text-graphite text-[11px]"
                      >
                        {mat}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag('materials', idx)}
                          className="hover:text-red-600"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Scope */}
                <div className="p-4 rounded-2xl bg-milk-light/60 border border-sand/40 space-y-3">
                  <span className="text-xs font-medium text-sand-dark font-sans block">
                    Состав работ
                  </span>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      placeholder="Напр. Дендроплан"
                      value={tagInput.scope}
                      onChange={(e) => setTagInput({ ...tagInput, scope: e.target.value })}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddTag('scope')}
                      className="flex-1 px-2.5 py-1 rounded-lg border border-sand/50 text-xs font-sans"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddTag('scope')}
                      className="px-2 py-1 rounded-lg bg-olive text-milk text-xs"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                    {editingProject.scope?.map((sc, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sand/30 text-graphite text-[11px]"
                      >
                        {sc}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag('scope', idx)}
                          className="hover:text-red-600"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Projects List Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.slug}
            className="bg-white rounded-3xl border border-sand/50 p-6 flex flex-col justify-between space-y-4 hover:border-olive/50 transition-all shadow-sm group"
          >
            <div className="space-y-4">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-sand/20">
                <img
                  src={proj.coverImage}
                  alt={proj.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-graphite/80 backdrop-blur-sm text-milk text-[11px] font-sans">
                  {proj.type}
                </span>
                <span
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-sans font-medium ${
                    proj.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {proj.status === 'completed' ? 'Завершён' : 'В работе'}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl text-graphite font-medium group-hover:text-olive transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs text-graphite/60 font-sans mt-1 line-clamp-2">
                  {proj.subtitle || proj.description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-sand/30">
              <span className="text-[11px] font-mono text-graphite/40">/{proj.slug}</span>
              <div className="flex items-center gap-2">
                <Link
                  href={`/projects/${proj.slug}`}
                  target="_blank"
                  className="p-2 rounded-xl border border-sand/50 hover:bg-sand/20 text-graphite"
                  title="Открыть на сайте"
                >
                  <Eye className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleEdit(proj)}
                  className="px-3.5 py-1.5 rounded-xl bg-sand/30 hover:bg-sand text-graphite text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  Редактировать
                </button>
                <button
                  onClick={() => handleDelete(proj)}
                  className="p-2 rounded-xl border border-sand/50 hover:bg-red-50 hover:text-red-600 text-graphite/40 transition-colors"
                  title="Удалить"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
