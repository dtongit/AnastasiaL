import { createClient, isSupabaseConfigured } from './client';
import {
  LandingContent,
  Project,
  ContactRequest,
  ContactRequestStatus,
  HeroSectionData,
  ManifestoSectionData,
  ApproachSectionData,
  ServicesSectionData,
  BureauSectionData,
  CertificatesSectionData,
  FinalBannerSectionData,
  GlobalContactsData,
} from '@/types';
import {
  DEFAULT_LANDING_CONTENT,
  DEFAULT_HERO,
  DEFAULT_MANIFESTO,
  DEFAULT_APPROACH,
  DEFAULT_SERVICES_SECTION,
  DEFAULT_BUREAU,
  DEFAULT_CERTIFICATES,
  DEFAULT_FINAL_BANNER,
  DEFAULT_CONTACTS,
} from '@/data/landingDefaults';
import { PROJECTS as STATIC_PROJECTS } from '@/data/projects';

/**
 * Fetch full landing content from Supabase site_content table
 * with seamless fallback to static defaults
 */
export async function getLandingContent(): Promise<LandingContent> {
  if (!isSupabaseConfigured()) {
    return DEFAULT_LANDING_CONTENT;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase.from('site_content').select('*');

    if (error || !data || data.length === 0) {
      return DEFAULT_LANDING_CONTENT;
    }

    const contentMap: Record<string, any> = {};
    data.forEach((row: { key: string; data: any }) => {
      contentMap[row.key] = row.data;
    });

    return {
      hero: (contentMap.hero as HeroSectionData) || DEFAULT_HERO,
      manifesto: (contentMap.manifesto as ManifestoSectionData) || DEFAULT_MANIFESTO,
      approach: (contentMap.approach as ApproachSectionData) || DEFAULT_APPROACH,
      services: (contentMap.services as ServicesSectionData) || DEFAULT_SERVICES_SECTION,
      bureau: (contentMap.bureau as BureauSectionData) || DEFAULT_BUREAU,
      certificates: (contentMap.certificates as CertificatesSectionData) || DEFAULT_CERTIFICATES,
      finalBanner: (contentMap.finalBanner as FinalBannerSectionData) || DEFAULT_FINAL_BANNER,
      contacts: (contentMap.contacts as GlobalContactsData) || DEFAULT_CONTACTS,
    };
  } catch (err) {
    console.warn('Error fetching landing content from Supabase, using defaults:', err);
    return DEFAULT_LANDING_CONTENT;
  }
}

/**
 * Save / update a landing section into site_content
 */
export async function saveLandingSection(
  key:
    | 'hero'
    | 'manifesto'
    | 'approach'
    | 'services'
    | 'bureau'
    | 'certificates'
    | 'finalBanner'
    | 'contacts',
  data: any
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from('site_content')
      .upsert({
        key,
        data,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'key' });

    if (error) {
      console.error(`Error saving section ${key}:`, error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error(`Unexpected error saving section ${key}:`, err);
    return { success: false, error: err.message || 'Unknown error' };
  }
}

/**
 * Fetch projects from Supabase or fallback to static projects
 */
export async function getProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured()) {
    return STATIC_PROJECTS;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return STATIC_PROJECTS;
    }

    return data.map((row: any) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      subtitle: row.subtitle,
      type: row.type,
      location: row.location,
      area: row.area,
      year: row.year,
      status: row.status,
      coverImage: row.cover_image || row.coverImage,
      gallery: row.gallery || [],
      task: row.task,
      idea: row.idea,
      placeContext: row.place_context || row.placeContext,
      plants: row.plants || [],
      materials: row.materials || [],
      scope: row.scope || [],
      description: row.description,
      featured: Boolean(row.featured),
      display_order: row.display_order ?? 0,
    }));
  } catch (err) {
    console.warn('Error fetching projects from Supabase, using defaults:', err);
    return STATIC_PROJECTS;
  }
}

/**
 * Fetch single project by slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!isSupabaseConfigured()) {
    return STATIC_PROJECTS.find((p) => p.slug === slug) || null;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return STATIC_PROJECTS.find((p) => p.slug === slug) || null;
    }

    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      subtitle: data.subtitle,
      type: data.type,
      location: data.location,
      area: data.area,
      year: data.year,
      status: data.status,
      coverImage: data.cover_image || data.coverImage,
      gallery: data.gallery || [],
      task: data.task,
      idea: data.idea,
      placeContext: data.place_context || data.placeContext,
      plants: data.plants || [],
      materials: data.materials || [],
      scope: data.scope || [],
      description: data.description,
      featured: Boolean(data.featured),
      display_order: data.display_order ?? 0,
    };
  } catch {
    return STATIC_PROJECTS.find((p) => p.slug === slug) || null;
  }
}

/**
 * Upsert project into Supabase
 */
export async function saveProject(
  project: Partial<Project>
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const supabase = createClient();
    const dbPayload = {
      slug: project.slug,
      title: project.title,
      subtitle: project.subtitle,
      type: project.type,
      location: project.location,
      area: project.area,
      year: project.year,
      status: project.status || 'completed',
      cover_image: project.coverImage,
      gallery: project.gallery || [],
      task: project.task,
      idea: project.idea,
      place_context: project.placeContext,
      plants: project.plants || [],
      materials: project.materials || [],
      scope: project.scope || [],
      description: project.description,
      featured: project.featured ?? true,
      display_order: project.display_order ?? 0,
      updated_at: new Date().toISOString(),
    };

    if (project.id) {
      const { data, error } = await supabase
        .from('projects')
        .update(dbPayload)
        .eq('id', project.id)
        .select()
        .single();

      if (error) return { success: false, error: error.message };
      return { success: true, data };
    } else {
      const { data, error } = await supabase
        .from('projects')
        .insert([{ ...dbPayload, created_at: new Date().toISOString() }])
        .select()
        .single();

      if (error) return { success: false, error: error.message };
      return { success: true, data };
    }
  } catch (err: any) {
    return { success: false, error: err.message || 'Unknown error' };
  }
}

/**
 * Delete project
 */
export async function deleteProject(
  idOrSlug: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient();
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);

    const query = isUuid
      ? supabase.from('projects').delete().eq('id', idOrSlug)
      : supabase.from('projects').delete().eq('slug', idOrSlug);

    const { error } = await query;
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Upload an image file to Supabase Storage bucket 'site-assets'
 */
export async function uploadImage(
  file: File,
  folder: string = 'uploads'
): Promise<{ url?: string; error?: string }> {
  try {
    const supabase = createClient();
    const bucketName = 'site-assets';
    const ext = file.name.split('.').pop() || 'webp';
    const cleanFileName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .slice(0, 30);
    const fileName = `${folder}/${Date.now()}_${cleanFileName}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return { error: uploadError.message };
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    return { url: publicUrlData.publicUrl };
  } catch (err: any) {
    return { error: err.message || 'Upload failed' };
  }
}

/**
 * Save new contact form submission
 */
export async function submitContactLead(formData: {
  name: string;
  phone: string;
  email?: string;
  location?: string;
  service_type?: string;
  message?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient();
    const { error } = await supabase.from('contact_requests').insert([
      {
        name: formData.name,
        phone: formData.phone,
        email: formData.email || null,
        location: formData.location || null,
        service_type: formData.service_type || null,
        message: formData.message || null,
        status: 'new',
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.warn('Supabase lead submit error (saving locally/continuing):', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Get all contact requests for admin
 */
export async function getContactRequests(): Promise<ContactRequest[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('contact_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

/**
 * Update contact request status
 */
export async function updateContactStatus(
  id: string,
  status: ContactRequestStatus
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from('contact_requests')
      .update({ status })
      .eq('id', id);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Delete contact request
 */
export async function deleteContactRequest(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from('contact_requests')
      .delete()
      .eq('id', id);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
