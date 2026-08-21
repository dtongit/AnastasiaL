import { Project, Service } from './index';

export interface HeroSectionData {
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  badges: string[];
  bgImage: string;
}

export interface ManifestoFeature {
  title: string;
  text: string;
}

export interface ManifestoSectionData {
  badge: string;
  title: string;
  description: string;
  features: ManifestoFeature[];
}

export interface PillarCard {
  id: string;
  num: string;
  title: string;
  text: string;
  icon: 'Sun' | 'Leaf' | 'Clock' | 'Layers' | 'ShieldCheck';
  bgClass?: string;
  borderClass?: string;
  iconBg?: string;
  iconColor?: string;
  colSpan?: string;
}

export interface ApproachSectionData {
  badge: string;
  title: string;
  description: string;
  image: string;
  subBadge: string;
  subTitle: string;
  pillars: PillarCard[];
}

export interface AdditionalServiceItem {
  title: string;
  icon: 'Compass' | 'Sprout' | 'Droplets' | 'Lightbulb' | 'Grid3X3';
  bgCircle?: string;
  iconColor?: string;
}

export interface ChecklistItem {
  step: string;
  title: string;
  text: string;
}

export interface ServicesSectionData {
  badge: string;
  title: string;
  services: Service[];
  additionalTitle: string;
  additionalSubtitle: string;
  additionalServices: AdditionalServiceItem[];
  checklistTitle: string;
  checklist: ChecklistItem[];
}

export interface BureauSectionData {
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  role: string;
  name: string;
  subheading: string;
  paragraphs: string[];
}

export interface CertificateVoucher {
  id: string;
  num: string;
  title: string;
  description: string;
  items: string[];
  deliveryNote: string;
  variant: 'light' | 'dark';
}

export interface CertificatesSectionData {
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  subTitle: string;
  vouchers: CertificateVoucher[];
}

export interface FinalBannerSectionData {
  title: string;
  bgImage: string;
}

export interface GlobalContactsData {
  phone: string;
  phoneRaw: string;
  email: string;
  whatsapp: string;
  telegram?: string;
  instagram?: string;
  copyright: string;
}

export interface LandingContent {
  hero: HeroSectionData;
  manifesto: ManifestoSectionData;
  approach: ApproachSectionData;
  services: ServicesSectionData;
  bureau: BureauSectionData;
  certificates: CertificatesSectionData;
  finalBanner: FinalBannerSectionData;
  contacts: GlobalContactsData;
}

export type ContactRequestStatus = 'new' | 'in_progress' | 'completed' | 'archived';

export interface ContactRequest {
  id: string;
  name: string;
  phone: string;
  email?: string;
  location?: string;
  service_type?: string;
  message?: string;
  status: ContactRequestStatus;
  created_at: string;
}
