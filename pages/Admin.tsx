
import React, { useState, useRef } from 'react';
// Add missing icons Heart and MessageCircle to the imports
import { 
  Plus, Trash2, Calendar, Layout, BookOpen, 
  Sparkles, Loader2, Mail, Lock, Unlock, 
  ArrowRight, Upload, ImageIcon, Film, X, FileText, CheckCircle, Clock, User,
  Heart, MessageCircle, Settings, Pencil, Star
} from 'lucide-react';
import { Project, BlogPost, Appointment, ProjectCategory, Language, AppSettings, Testimonial, ProjectMedia } from '../types';
import { CATEGORIES, TRANSLATIONS } from '../constants';

interface AdminProps {
  lang: Language;
  projects: Project[];
  posts: BlogPost[];
  appointments: Appointment[];
  testimonials: Testimonial[];
  onAddProject: (p: Project) => void;
  onUpdateProject: (p: Project) => void;
  onDeleteProject: (id: string) => void;
  onAddPost: (p: BlogPost) => void;
  onDeletePost: (id: string) => void;
  onAddTestimonial: (t: Testimonial) => void;
  onUpdateTestimonial: (t: Testimonial) => void;
  onDeleteTestimonial: (id: string) => void;
  onUpdateAppointment: (a: Appointment) => void;
  onDeleteAppointment: (id: string) => void;
  settings: AppSettings;
  onUpdateSettings: (s: AppSettings) => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

const ADMIN_CODE = "PANDA2025";

const Admin: React.FC<AdminProps> = ({ 
  lang, projects, posts, appointments, testimonials,
  onAddProject, onUpdateProject, onDeleteProject, onAddPost, onDeletePost,
  onAddTestimonial, onUpdateTestimonial, onDeleteTestimonial,
  onUpdateAppointment, onDeleteAppointment,
  settings, onUpdateSettings,
  isAdmin, setIsAdmin
}) => {
  const t = TRANSLATIONS[lang];
  const [tab, setTab] = useState<'projects' | 'blog' | 'appointments' | 'settings'>('projects');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Settings form states
  const [fbLink, setFbLink] = useState(settings.socialLinks.facebook);
  const [igLink, setIgLink] = useState(settings.socialLinks.instagram);
  const [waNumber, setWaNumber] = useState(settings.socialLinks.whatsapp);
  const [taglineFr, setTaglineFr] = useState(settings.logoTagline.fr);
  const [taglineEn, setTaglineEn] = useState(settings.logoTagline.en);
  const [taglineDe, setTaglineDe] = useState(settings.logoTagline.de);

  // Dynamic About settings states
  const [aboutImage, setAboutImage] = useState(settings.about?.image || "https://picsum.photos/seed/victor/800/1000");
  const [aboutTitleFr, setAboutTitleFr] = useState(settings.about?.title?.fr || TRANSLATIONS.fr.about.title);
  const [aboutTitleEn, setAboutTitleEn] = useState(settings.about?.title?.en || TRANSLATIONS.en.about.title);
  const [aboutTitleDe, setAboutTitleDe] = useState(settings.about?.title?.de || TRANSLATIONS.de.about.title);
  const [aboutBioFr, setAboutBioFr] = useState(settings.about?.bio?.fr || TRANSLATIONS.fr.about.bio);
  const [aboutBioEn, setAboutBioEn] = useState(settings.about?.bio?.en || TRANSLATIONS.en.about.bio);
  const [aboutBioDe, setAboutBioDe] = useState(settings.about?.bio?.de || TRANSLATIONS.de.about.bio);
  const [aboutPseudonymFr, setAboutPseudonymFr] = useState(settings.about?.pseudonym?.fr || TRANSLATIONS.fr.about.pseudonym);
  const [aboutPseudonymEn, setAboutPseudonymEn] = useState(settings.about?.pseudonym?.en || TRANSLATIONS.en.about.pseudonym);
  const [aboutPseudonymDe, setAboutPseudonymDe] = useState(settings.about?.pseudonym?.de || TRANSLATIONS.de.about.pseudonym);
  const [aboutQuoteFr, setAboutQuoteFr] = useState(settings.about?.quote?.fr || TRANSLATIONS.fr.about.quote);
  const [aboutQuoteEn, setAboutQuoteEn] = useState(settings.about?.quote?.en || TRANSLATIONS.en.about.quote);
  const [aboutQuoteDe, setAboutQuoteDe] = useState(settings.about?.quote?.de || TRANSLATIONS.de.about.quote);

  // Dynamic Services settings states
  const [servicesTitleFr, setServicesTitleFr] = useState(settings.services?.title?.fr || TRANSLATIONS.fr.services.title);
  const [servicesTitleEn, setServicesTitleEn] = useState(settings.services?.title?.en || TRANSLATIONS.en.services.title);
  const [servicesTitleDe, setServicesTitleDe] = useState(settings.services?.title?.de || TRANSLATIONS.de.services.title);
  const [servicesDescFr, setServicesDescFr] = useState(settings.services?.headerDesc?.fr || TRANSLATIONS.fr.services.headerDesc);
  const [servicesDescEn, setServicesDescEn] = useState(settings.services?.headerDesc?.en || TRANSLATIONS.en.services.headerDesc);
  const [servicesDescDe, setServicesDescDe] = useState(settings.services?.headerDesc?.de || TRANSLATIONS.de.services.headerDesc);

  const aboutFileInputRef = useRef<HTMLInputElement>(null);
  const homeAboutFileInputRef = useRef<HTMLInputElement>(null);

  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Dynamic Home Page Settings States
  // Hero Section
  const [heroTitleFr, setHeroTitleFr] = useState(settings.hero?.title?.fr || "PANDA_GRAPHIC");
  const [heroTitleEn, setHeroTitleEn] = useState(settings.hero?.title?.en || "PANDA_GRAPHIC");
  const [heroTitleDe, setHeroTitleDe] = useState(settings.hero?.title?.de || "PANDA_GRAPHIC");
  const [heroSubtitleFr, setHeroSubtitleFr] = useState(settings.hero?.subtitle?.fr || TRANSLATIONS.fr.hero.subtitle);
  const [heroSubtitleEn, setHeroSubtitleEn] = useState(settings.hero?.subtitle?.en || TRANSLATIONS.en.hero.subtitle);
  const [heroSubtitleDe, setHeroSubtitleDe] = useState(settings.hero?.subtitle?.de || TRANSLATIONS.de.hero.subtitle);
  const [heroCtaFr, setHeroCtaFr] = useState(settings.hero?.cta?.fr || TRANSLATIONS.fr.hero.cta);
  const [heroCtaEn, setHeroCtaEn] = useState(settings.hero?.cta?.en || TRANSLATIONS.en.hero.cta);
  const [heroCtaDe, setHeroCtaDe] = useState(settings.hero?.cta?.de || TRANSLATIONS.de.hero.cta);
  const [heroConsultationFr, setHeroConsultationFr] = useState(settings.hero?.consultation?.fr || TRANSLATIONS.fr.hero.consultation);
  const [heroConsultationEn, setHeroConsultationEn] = useState(settings.hero?.consultation?.en || TRANSLATIONS.en.hero.consultation);
  const [heroConsultationDe, setHeroConsultationDe] = useState(settings.hero?.consultation?.de || TRANSLATIONS.de.hero.consultation);

  // Home About Section
  const [homeAboutImage, setHomeAboutImage] = useState(settings.homeAbout?.image || "https://picsum.photos/seed/victor_arch/800/800");
  const [homeAboutTagFr, setHomeAboutTagFr] = useState(settings.homeAbout?.tag?.fr || TRANSLATIONS.fr.home.creativeSpirit);
  const [homeAboutTagEn, setHomeAboutTagEn] = useState(settings.homeAbout?.tag?.en || TRANSLATIONS.en.home.creativeSpirit);
  const [homeAboutTagDe, setHomeAboutTagDe] = useState(settings.homeAbout?.tag?.de || TRANSLATIONS.de.home.creativeSpirit);
  const [homeAboutTitleFr, setHomeAboutTitleFr] = useState(settings.homeAbout?.title?.fr || "Victor Gabriel Archange");
  const [homeAboutTitleEn, setHomeAboutTitleEn] = useState(settings.homeAbout?.title?.en || "Victor Gabriel Archange");
  const [homeAboutTitleDe, setHomeAboutTitleDe] = useState(settings.homeAbout?.title?.de || "Victor Gabriel Archange");
  const [homeAboutQuoteFr, setHomeAboutQuoteFr] = useState(settings.homeAbout?.quote?.fr || TRANSLATIONS.fr.home.aboutQuote);
  const [homeAboutQuoteEn, setHomeAboutQuoteEn] = useState(settings.homeAbout?.quote?.en || TRANSLATIONS.en.home.aboutQuote);
  const [homeAboutQuoteDe, setHomeAboutQuoteDe] = useState(settings.homeAbout?.quote?.de || TRANSLATIONS.de.home.aboutQuote);
  const [homeAboutBioFr, setHomeAboutBioFr] = useState(settings.homeAbout?.bio?.fr || TRANSLATIONS.fr.home.aboutBio);
  const [homeAboutBioEn, setHomeAboutBioEn] = useState(settings.homeAbout?.bio?.en || TRANSLATIONS.en.home.aboutBio);
  const [homeAboutBioDe, setHomeAboutBioDe] = useState(settings.homeAbout?.bio?.de || TRANSLATIONS.de.home.aboutBio);
  const [homeAboutBtnFr, setHomeAboutBtnFr] = useState(settings.homeAbout?.btn?.fr || TRANSLATIONS.fr.home.discoverPath);
  const [homeAboutBtnEn, setHomeAboutBtnEn] = useState(settings.homeAbout?.btn?.en || TRANSLATIONS.en.home.discoverPath);
  const [homeAboutBtnDe, setHomeAboutBtnDe] = useState(settings.homeAbout?.btn?.de || TRANSLATIONS.de.home.discoverPath);

  // Home Services Section
  const [homeServicesTagFr, setHomeServicesTagFr] = useState(settings.homeServices?.tag?.fr || TRANSLATIONS.fr.home.expertiseTitle);
  const [homeServicesTagEn, setHomeServicesTagEn] = useState(settings.homeServices?.tag?.en || TRANSLATIONS.en.home.expertiseTitle);
  const [homeServicesTagDe, setHomeServicesTagDe] = useState(settings.homeServices?.tag?.de || TRANSLATIONS.de.home.expertiseTitle);
  const [homeServicesTitleFr, setHomeServicesTitleFr] = useState(settings.homeServices?.title?.fr || TRANSLATIONS.fr.home.expertiseSubtitle);
  const [homeServicesTitleEn, setHomeServicesTitleEn] = useState(settings.homeServices?.title?.en || TRANSLATIONS.en.home.expertiseSubtitle);
  const [homeServicesTitleDe, setHomeServicesTitleDe] = useState(settings.homeServices?.title?.de || TRANSLATIONS.de.home.expertiseSubtitle);
  const [homeServicesBtnFr, setHomeServicesBtnFr] = useState(settings.homeServices?.btn?.fr || TRANSLATIONS.fr.home.viewServices);
  const [homeServicesBtnEn, setHomeServicesBtnEn] = useState(settings.homeServices?.btn?.en || TRANSLATIONS.en.home.viewServices);
  const [homeServicesBtnDe, setHomeServicesBtnDe] = useState(settings.homeServices?.btn?.de || TRANSLATIONS.de.home.viewServices);

  // Home Portfolio Section
  const [homePortfolioTagFr, setHomePortfolioTagFr] = useState(settings.homePortfolio?.tag?.fr || TRANSLATIONS.fr.home.portfolioSubtitle);
  const [homePortfolioTagEn, setHomePortfolioTagEn] = useState(settings.homePortfolio?.tag?.en || TRANSLATIONS.en.home.portfolioSubtitle);
  const [homePortfolioTagDe, setHomePortfolioTagDe] = useState(settings.homePortfolio?.tag?.de || TRANSLATIONS.de.home.portfolioSubtitle);
  const [homePortfolioTitleFr, setHomePortfolioTitleFr] = useState(settings.homePortfolio?.title?.fr || TRANSLATIONS.fr.home.portfolioTitle);
  const [homePortfolioTitleEn, setHomePortfolioTitleEn] = useState(settings.homePortfolio?.title?.en || TRANSLATIONS.en.home.portfolioTitle);
  const [homePortfolioTitleDe, setHomePortfolioTitleDe] = useState(settings.homePortfolio?.title?.de || TRANSLATIONS.de.home.portfolioTitle);
  const [homePortfolioBtnFr, setHomePortfolioBtnFr] = useState(settings.homePortfolio?.btn?.fr || TRANSLATIONS.fr.home.exploreGallery);
  const [homePortfolioBtnEn, setHomePortfolioBtnEn] = useState(settings.homePortfolio?.btn?.en || TRANSLATIONS.en.home.exploreGallery);
  const [homePortfolioBtnDe, setHomePortfolioBtnDe] = useState(settings.homePortfolio?.btn?.de || TRANSLATIONS.de.home.exploreGallery);

  // Home Blog Section
  const [homeBlogTagFr, setHomeBlogTagFr] = useState(settings.homeBlog?.tag?.fr || TRANSLATIONS.fr.home.blogSubtitle);
  const [homeBlogTagEn, setHomeBlogTagEn] = useState(settings.homeBlog?.tag?.en || TRANSLATIONS.en.home.blogSubtitle);
  const [homeBlogTagDe, setHomeBlogTagDe] = useState(settings.homeBlog?.tag?.de || TRANSLATIONS.de.home.blogSubtitle);
  const [homeBlogTitleFr, setHomeBlogTitleFr] = useState(settings.homeBlog?.title?.fr || TRANSLATIONS.fr.home.blogTitle);
  const [homeBlogTitleEn, setHomeBlogTitleEn] = useState(settings.homeBlog?.title?.en || TRANSLATIONS.en.home.blogTitle);
  const [homeBlogTitleDe, setHomeBlogTitleDe] = useState(settings.homeBlog?.title?.de || TRANSLATIONS.de.home.blogTitle);
  const [homeBlogDescFr, setHomeBlogDescFr] = useState(settings.homeBlog?.desc?.fr || TRANSLATIONS.fr.home.blogDesc);
  const [homeBlogDescEn, setHomeBlogDescEn] = useState(settings.homeBlog?.desc?.en || TRANSLATIONS.en.home.blogDesc);
  const [homeBlogDescDe, setHomeBlogDescDe] = useState(settings.homeBlog?.desc?.de || TRANSLATIONS.de.home.blogDesc);
  const [homeBlogBtnFr, setHomeBlogBtnFr] = useState(settings.homeBlog?.btn?.fr || TRANSLATIONS.fr.home.readArticles);
  const [homeBlogBtnEn, setHomeBlogBtnEn] = useState(settings.homeBlog?.btn?.en || TRANSLATIONS.en.home.readArticles);
  const [homeBlogBtnDe, setHomeBlogBtnDe] = useState(settings.homeBlog?.btn?.de || TRANSLATIONS.de.home.readArticles);

  // Home Testimonials Section
  const [homeTestimonialsTagFr, setHomeTestimonialsTagFr] = useState(settings.homeTestimonials?.tag?.fr || TRANSLATIONS.fr.home.testimonialsTitle);
  const [homeTestimonialsTagEn, setHomeTestimonialsTagEn] = useState(settings.homeTestimonials?.tag?.en || TRANSLATIONS.en.home.testimonialsTitle);
  const [homeTestimonialsTagDe, setHomeTestimonialsTagDe] = useState(settings.homeTestimonials?.tag?.de || TRANSLATIONS.de.home.testimonialsTitle);
  const [homeTestimonialsTitleFr, setHomeTestimonialsTitleFr] = useState(settings.homeTestimonials?.title?.fr || TRANSLATIONS.fr.home.testimonialsSubtitle);
  const [homeTestimonialsTitleEn, setHomeTestimonialsTitleEn] = useState(settings.homeTestimonials?.title?.en || TRANSLATIONS.en.home.testimonialsSubtitle);
  const [homeTestimonialsTitleDe, setHomeTestimonialsTitleDe] = useState(settings.homeTestimonials?.title?.de || TRANSLATIONS.de.home.testimonialsSubtitle);

  // Home CTA Section
  const [homeCtaTitleFr, setHomeCtaTitleFr] = useState(settings.homeCta?.title?.fr || TRANSLATIONS.fr.home.ctaTitle);
  const [homeCtaTitleEn, setHomeCtaTitleEn] = useState(settings.homeCta?.title?.en || TRANSLATIONS.en.home.ctaTitle);
  const [homeCtaTitleDe, setHomeCtaTitleDe] = useState(settings.homeCta?.title?.de || TRANSLATIONS.de.home.ctaTitle);
  const [homeCtaDescFr, setHomeCtaDescFr] = useState(settings.homeCta?.desc?.fr || TRANSLATIONS.fr.home.ctaDesc);
  const [homeCtaDescEn, setHomeCtaDescEn] = useState(settings.homeCta?.desc?.en || TRANSLATIONS.en.home.ctaDesc);
  const [homeCtaDescDe, setHomeCtaDescDe] = useState(settings.homeCta?.desc?.de || TRANSLATIONS.de.home.ctaDesc);
  const [homeCtaBtnFr, setHomeCtaBtnFr] = useState(settings.homeCta?.btn?.fr || TRANSLATIONS.fr.home.ctaButton);
  const [homeCtaBtnEn, setHomeCtaBtnEn] = useState(settings.homeCta?.btn?.en || TRANSLATIONS.en.home.ctaButton);
  const [homeCtaBtnDe, setHomeCtaBtnDe] = useState(settings.homeCta?.btn?.de || TRANSLATIONS.de.home.ctaButton);

  // Appointment edit states
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [editDate, setEditDate] = useState('');
  const [editTime, setEditTime] = useState('');
  const [editStatus, setEditStatus] = useState<'pending' | 'confirmed' | 'cancelled'>('pending');
  
  // Project form states
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newProjectProblem, setNewProjectProblem] = useState('');
  const [newProjectSolution, setNewProjectSolution] = useState('');
  const [newProjectCaseStudy, setNewProjectCaseStudy] = useState('');
  const [newProjectCategory, setNewProjectCategory] = useState<ProjectCategory>(ProjectCategory.GALLERY);
  const [galleryMedia, setGalleryMedia] = useState<ProjectMedia[]>([]);
  
  // Testimonial form states
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [newTestimonialName, setNewTestimonialName] = useState('');
  const [newTestimonialRole, setNewTestimonialRole] = useState('');
  const [newTestimonialContent, setNewTestimonialContent] = useState('');
  const [newTestimonialProject, setNewTestimonialProject] = useState('');
  const [newTestimonialEmail, setNewTestimonialEmail] = useState('');
  const [newTestimonialRating, setNewTestimonialRating] = useState(5);
  const [newTestimonialIsApproved, setNewTestimonialIsApproved] = useState(false);

  const [previewMedia, setPreviewMedia] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  // Blog form states
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogMedia, setBlogMedia] = useState<string | null>(null);
  const [blogMediaType, setBlogMediaType] = useState<'image' | 'video'>('image');
  const blogFileInputRef = useRef<HTMLInputElement>(null);

  // Auth state
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === ADMIN_CODE) {
      setIsAdmin(true);
      setError(false);
    } else {
      setError(true);
      setCode('');
    }
  };

  const compressImage = (file: File, maxWidth = 1000, maxHeight = 1000, quality = 0.75): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Calculate new dimensions while maintaining aspect ratio
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(event.target?.result as string);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
        };
        img.onerror = () => {
          resolve(event.target?.result as string);
        };
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, target: 'project' | 'blog' | 'about' | 'homeAbout') => {
    const file = e.target.files?.[0];
    if (file) {
      const isVideo = file.type.startsWith('video/');
      if (isVideo) {
        // Enforce 400KB limit for videos due to Firestore document size constraint
        if (file.size > 400 * 1024) {
          alert(lang === 'fr' 
            ? "Le fichier vidéo est trop volumineux. Veuillez sélectionner une vidéo de moins de 400 Ko pour assurer sa sauvegarde dans la base de données." 
            : "The video file is too large. Please select a video under 400KB to ensure saving.");
          if (e.target) e.target.value = '';
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          if (target === 'project') {
            setMediaType('video');
            setPreviewMedia(reader.result as string);
          } else if (target === 'blog') {
            setBlogMediaType('video');
            setBlogMedia(reader.result as string);
          }
        };
        reader.readAsDataURL(file);
      } else {
        // Compress image to fit perfectly inside Firestore's 1MB limit
        try {
          const compressedBase64 = await compressImage(file, 800, 800, 0.65);
          if (target === 'project') {
            setMediaType('image');
            setPreviewMedia(compressedBase64);
          } else if (target === 'blog') {
            setBlogMediaType('image');
            setBlogMedia(compressedBase64);
          } else if (target === 'about') {
            setAboutImage(compressedBase64);
          } else if (target === 'homeAbout') {
            setHomeAboutImage(compressedBase64);
          }
        } catch (err) {
          console.error("Compression error, falling back to original:", err);
          const reader = new FileReader();
          reader.onloadend = () => {
            if (target === 'project') {
              setMediaType('image');
              setPreviewMedia(reader.result as string);
            } else if (target === 'blog') {
              setBlogMediaType('image');
              setBlogMedia(reader.result as string);
            } else if (target === 'about') {
              setAboutImage(reader.result as string);
            } else if (target === 'homeAbout') {
              setHomeAboutImage(reader.result as string);
            }
          };
          reader.readAsDataURL(file);
        }
      }
    }
  };

  const resetProjectForm = () => {
    setNewProjectTitle('');
    setNewProjectDesc('');
    setNewProjectProblem('');
    setNewProjectSolution('');
    setNewProjectCaseStudy('');
    setPreviewMedia(null);
    setEditingProject(null);
    setGalleryMedia([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (galleryFileInputRef.current) galleryFileInputRef.current.value = '';
  };

  const handleEditProject = (p: Project) => {
    setEditingProject(p);
    setNewProjectTitle(p.title[lang] || p.title.fr || '');
    setNewProjectDesc(p.description?.[lang] || p.description?.fr || '');
    setNewProjectProblem(p.problem?.[lang] || p.problem?.fr || '');
    setNewProjectSolution(p.solution?.[lang] || p.solution?.fr || '');
    setNewProjectCaseStudy(p.caseStudy?.[lang] || p.caseStudy?.fr || '');
    setNewProjectCategory(p.category);
    setPreviewMedia(p.image);
    setMediaType(p.mediaType || 'image');
    setGalleryMedia(p.gallery || []);
  };

  const handleCancelEditProject = () => {
    resetProjectForm();
  };

  const handleGalleryFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newItems: ProjectMedia[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const isVideo = file.type.startsWith('video/');
        
        if (isVideo) {
          if (file.size > 300 * 1024) {
            alert(lang === 'fr' 
              ? `Le fichier vidéo "${file.name}" est trop volumineux pour la galerie (max 300 Ko).`
              : `The video file "${file.name}" is too large for the gallery (max 300KB).`);
            continue;
          }
          
          const dataUrl = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          });
          
          newItems.push({ url: dataUrl, type: 'video' });
        } else {
          try {
            const compressed = await compressImage(file, 640, 640, 0.55);
            newItems.push({ url: compressed, type: 'image' });
          } catch (err) {
            console.error("Compression error for gallery file:", err);
            const dataUrl = await new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.readAsDataURL(file);
            });
            newItems.push({ url: dataUrl, type: 'image' });
          }
        }
      }
      
      if (newItems.length > 0) {
        if (galleryMedia.length + newItems.length > 6) {
          alert(lang === 'fr'
            ? "Vous ne pouvez pas ajouter plus de 6 médias dans la galerie."
            : "You cannot add more than 6 media items to the gallery.");
          const sliceCount = 6 - galleryMedia.length;
          if (sliceCount > 0) {
            setGalleryMedia(prev => [...prev, ...newItems.slice(0, sliceCount)]);
          }
        } else {
          setGalleryMedia(prev => [...prev, ...newItems]);
        }
      }
      
      if (e.target) e.target.value = '';
    }
  };

  const handleRemoveGalleryItem = (index: number) => {
    setGalleryMedia(prev => prev.filter((_, i) => i !== index));
  };

  const handleEditTestimonial = (t: Testimonial) => {
    setEditingTestimonial(t);
    setNewTestimonialName(t.name);
    setNewTestimonialRole(t.role[lang] || t.role.fr || '');
    setNewTestimonialContent(t.content[lang] || t.content.fr || '');
    setNewTestimonialProject(t.project?.[lang] || t.project?.fr || '');
    setNewTestimonialEmail(t.email || '');
    setNewTestimonialRating(t.rating ?? 5);
    setNewTestimonialIsApproved(t.is_approved !== false);
  };

  const handleCancelEditTestimonial = () => {
    setEditingTestimonial(null);
    setNewTestimonialName('');
    setNewTestimonialRole('');
    setNewTestimonialContent('');
    setNewTestimonialProject('');
    setNewTestimonialEmail('');
    setNewTestimonialRating(5);
    setNewTestimonialIsApproved(false);
  };

  const handleAddTestimonial = () => {
    if (!newTestimonialName || !newTestimonialContent) return;
    
    if (editingTestimonial) {
      const updated: Testimonial = {
        ...editingTestimonial,
        name: newTestimonialName,
        role: { fr: newTestimonialRole, en: newTestimonialRole, de: newTestimonialRole },
        content: { fr: newTestimonialContent, en: newTestimonialContent, de: newTestimonialContent },
        project: { fr: newTestimonialProject, en: newTestimonialProject, de: newTestimonialProject },
        email: newTestimonialEmail,
        rating: newTestimonialRating,
        is_approved: newTestimonialIsApproved
      };
      onUpdateTestimonial(updated);
      setEditingTestimonial(null);
    } else {
      const testimonial: Testimonial = {
        id: Date.now().toString(),
        name: newTestimonialName,
        role: { fr: newTestimonialRole, en: newTestimonialRole, de: newTestimonialRole },
        content: { fr: newTestimonialContent, en: newTestimonialContent, de: newTestimonialContent },
        project: { fr: newTestimonialProject, en: newTestimonialProject, de: newTestimonialProject },
        email: newTestimonialEmail,
        rating: newTestimonialRating,
        is_approved: newTestimonialIsApproved,
        created_at: new Date().toISOString()
      };
      onAddTestimonial(testimonial);
    }

    setNewTestimonialName('');
    setNewTestimonialRole('');
    setNewTestimonialContent('');
    setNewTestimonialProject('');
    setNewTestimonialEmail('');
    setNewTestimonialRating(5);
    setNewTestimonialIsApproved(false);
  };

  const handleDeleteTestimonial = (id: string) => {
    onDeleteTestimonial(id);
  };

  const resetBlogForm = () => {
    setBlogTitle('');
    setBlogContent('');
    setBlogMedia(null);
    if (blogFileInputRef.current) blogFileInputRef.current.value = '';
  };

  const handleAddProject = async () => {
    if (!newProjectTitle || !previewMedia) return;

    // Estimate total document size before saving
    const tempProject = {
      title: { fr: newProjectTitle, en: newProjectTitle, de: newProjectTitle },
      category: newProjectCategory,
      image: previewMedia,
      mediaType: mediaType,
      description: { fr: newProjectDesc, en: newProjectDesc, de: newProjectDesc },
      problem: { fr: newProjectProblem, en: newProjectProblem, de: newProjectProblem },
      solution: { fr: newProjectSolution, en: newProjectSolution, de: newProjectSolution },
      caseStudy: { fr: newProjectCaseStudy, en: newProjectCaseStudy, de: newProjectCaseStudy },
      gallery: galleryMedia
    };

    const estimatedSize = JSON.stringify(tempProject).length;
    const MAX_SIZE = 950 * 1024; // 950KB safe limit

    if (estimatedSize > MAX_SIZE) {
      alert(lang === 'fr'
        ? `Désolé, la taille totale du projet (${(estimatedSize / (1024 * 1024)).toFixed(2)} Mo) dépasse la limite de la base de données (1 Mo). Veuillez supprimer des médias de la galerie ou utiliser des images/vidéos plus légères.`
        : `Sorry, the total project size (${(estimatedSize / (1024 * 1024)).toFixed(2)} MB) exceeds the database limit (1 MB). Please remove some gallery media or use smaller files.`);
      return;
    }

    setIsGenerating(true);
    try {
      if (editingProject) {
        const updated: Project = {
          ...editingProject,
          title: { fr: newProjectTitle, en: newProjectTitle, de: newProjectTitle },
          category: newProjectCategory,
          image: previewMedia,
          mediaType: mediaType,
          description: { fr: newProjectDesc, en: newProjectDesc, de: newProjectDesc },
          problem: { fr: newProjectProblem, en: newProjectProblem, de: newProjectProblem },
          solution: { fr: newProjectSolution, en: newProjectSolution, de: newProjectSolution },
          caseStudy: { fr: newProjectCaseStudy, en: newProjectCaseStudy, de: newProjectCaseStudy },
          gallery: galleryMedia
        };
        onUpdateProject(updated);
        setEditingProject(null);
      } else {
        const project: Project = {
          id: Math.random().toString(36).substring(7),
          title: { fr: newProjectTitle, en: newProjectTitle, de: newProjectTitle },
          category: newProjectCategory,
          image: previewMedia,
          mediaType: mediaType,
          description: { fr: newProjectDesc, en: newProjectDesc, de: newProjectDesc },
          problem: { fr: newProjectProblem, en: newProjectProblem, de: newProjectProblem },
          solution: { fr: newProjectSolution, en: newProjectSolution, de: newProjectSolution },
          caseStudy: { fr: newProjectCaseStudy, en: newProjectCaseStudy, de: newProjectCaseStudy },
          gallery: galleryMedia
        };
        onAddProject(project);
      }
      resetProjectForm();
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddBlogPost = async () => {
    if (!blogTitle || !blogMedia) return;

    const tempPost = {
      title: { fr: blogTitle, en: blogTitle, de: blogTitle },
      content: { fr: blogContent, en: blogContent, de: blogContent },
      image: blogMedia,
      mediaType: blogMediaType,
      date: new Date().toLocaleDateString('fr-FR'),
      likes: 0,
      comments: []
    };

    const estimatedSize = JSON.stringify(tempPost).length;
    const MAX_SIZE = 950 * 1024;

    if (estimatedSize > MAX_SIZE) {
      alert(lang === 'fr'
        ? `L'article de blog est trop lourd (${(estimatedSize / (1024 * 1024)).toFixed(2)} Mo). Veuillez utiliser une image ou une vidéo plus légère (max 1 Mo).`
        : `The blog post is too large (${(estimatedSize / (1024 * 1024)).toFixed(2)} MB). Please use a lighter image or video (max 1 MB).`);
      return;
    }

    setIsGenerating(true);
    try {
      const post: BlogPost = {
        id: Math.random().toString(36).substring(7),
        title: { fr: blogTitle, en: blogTitle, de: blogTitle },
        content: { fr: blogContent, en: blogContent, de: blogContent },
        image: blogMedia,
        mediaType: blogMediaType,
        date: new Date().toLocaleDateString('fr-FR'),
        likes: 0,
        comments: []
      };

      onAddPost(post);
      resetBlogForm();
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEditAppointment = (app: Appointment) => {
    setEditingAppointment(app);
    setEditDate(app.date);
    setEditTime(app.time || '');
    setEditStatus(app.status);
  };

  const handleSaveAppointment = () => {
    if (!editingAppointment) return;
    const updated = {
      ...editingAppointment,
      date: editDate,
      time: editTime,
      status: editStatus
    };
    onUpdateAppointment(updated);
    setEditingAppointment(null);
    alert(t.admin.appointmentUpdated);
  };

  const handleSaveSettings = () => {
    onUpdateSettings({
      ...settings,
      socialLinks: {
        facebook: fbLink,
        instagram: igLink,
        whatsapp: waNumber
      },
      logoTagline: {
        fr: taglineFr,
        en: taglineEn,
        de: taglineDe
      },
      about: {
        image: aboutImage,
        title: { fr: aboutTitleFr, en: aboutTitleEn, de: aboutTitleDe },
        bio: { fr: aboutBioFr, en: aboutBioEn, de: aboutBioDe },
        pseudonym: { fr: aboutPseudonymFr, en: aboutPseudonymEn, de: aboutPseudonymDe },
        quote: { fr: aboutQuoteFr, en: aboutQuoteEn, de: aboutQuoteDe }
      },
      services: {
        title: { fr: servicesTitleFr, en: servicesTitleEn, de: servicesTitleDe },
        headerDesc: { fr: servicesDescFr, en: servicesDescEn, de: servicesDescDe }
      },
      hero: {
        title: { fr: heroTitleFr, en: heroTitleEn, de: heroTitleDe },
        subtitle: { fr: heroSubtitleFr, en: heroSubtitleEn, de: heroSubtitleDe },
        cta: { fr: heroCtaFr, en: heroCtaEn, de: heroCtaDe },
        consultation: { fr: heroConsultationFr, en: heroConsultationEn, de: heroConsultationDe }
      },
      homeAbout: {
        image: homeAboutImage,
        tag: { fr: homeAboutTagFr, en: homeAboutTagEn, de: homeAboutTagDe },
        title: { fr: homeAboutTitleFr, en: homeAboutTitleEn, de: homeAboutTitleDe },
        quote: { fr: homeAboutQuoteFr, en: homeAboutQuoteEn, de: homeAboutQuoteDe },
        bio: { fr: homeAboutBioFr, en: homeAboutBioEn, de: homeAboutBioDe },
        btn: { fr: homeAboutBtnFr, en: homeAboutBtnEn, de: homeAboutBtnDe }
      },
      homeServices: {
        tag: { fr: homeServicesTagFr, en: homeServicesTagEn, de: homeServicesTagDe },
        title: { fr: homeServicesTitleFr, en: homeServicesTitleEn, de: homeServicesTitleDe },
        btn: { fr: homeServicesBtnFr, en: homeServicesBtnEn, de: homeServicesBtnDe }
      },
      homePortfolio: {
        tag: { fr: homePortfolioTagFr, en: homePortfolioTagEn, de: homePortfolioTagDe },
        title: { fr: homePortfolioTitleFr, en: homePortfolioTitleEn, de: homePortfolioTitleDe },
        btn: { fr: homePortfolioBtnFr, en: homePortfolioBtnEn, de: homePortfolioBtnDe }
      },
      homeBlog: {
        tag: { fr: homeBlogTagFr, en: homeBlogTagEn, de: homeBlogTagDe },
        title: { fr: homeBlogTitleFr, en: homeBlogTitleEn, de: homeBlogTitleDe },
        desc: { fr: homeBlogDescFr, en: homeBlogDescEn, de: homeBlogDescDe },
        btn: { fr: homeBlogBtnFr, en: homeBlogBtnEn, de: homeBlogBtnDe }
      },
      homeTestimonials: {
        tag: { fr: homeTestimonialsTagFr, en: homeTestimonialsTagEn, de: homeTestimonialsTagDe },
        title: { fr: homeTestimonialsTitleFr, en: homeTestimonialsTitleEn, de: homeTestimonialsTitleDe }
      },
      homeCta: {
        title: { fr: homeCtaTitleFr, en: homeCtaTitleEn, de: homeCtaTitleDe },
        desc: { fr: homeCtaDescFr, en: homeCtaDescEn, de: homeCtaDescDe },
        btn: { fr: homeCtaBtnFr, en: homeCtaBtnEn, de: homeCtaBtnDe }
      }
    });
    alert(t.admin.settingsUpdated);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white dark:bg-panda-white/5 border border-panda-black/10 dark:border-panda-white/10 p-12 rounded-[2.5rem] text-center backdrop-blur-xl shadow-2xl">
          <div className="w-20 h-20 bg-panda-gold/10 text-panda-gold rounded-full flex items-center justify-center mx-auto mb-8 border border-panda-gold/20">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-display font-bold mb-2 uppercase tracking-tighter text-panda-black dark:text-panda-white">{t.admin.accessReserved}</h1>
          <p className="text-panda-black/40 dark:text-panda-white/40 text-sm mb-10 font-light">{t.admin.adminSpace}</p>
          <form onSubmit={handleAuth} className="space-y-6">
            <input 
              type="password"
              placeholder="••••••••"
              value={code}
              onChange={(e) => { setCode(e.target.value); setError(false); }}
              className={`w-full bg-panda-black/5 dark:bg-panda-black border px-6 py-4 rounded-xl outline-none text-center text-2xl tracking-[0.5em] transition-all text-panda-black dark:text-panda-white ${
                error ? 'border-red-500 animate-shake' : 'border-panda-black/10 dark:border-panda-white/10 focus:border-panda-gold'
              }`}
            />
            {error && <p className="text-red-500 text-xs font-bold uppercase tracking-widest">{t.admin.incorrectCode}</p>}
            <button className="w-full py-5 bg-panda-gold text-panda-black font-bold uppercase tracking-[0.3em] rounded-xl hover:bg-panda-gold/90 transition-all flex items-center justify-center space-x-3">
              <span>{t.admin.unlock}</span>
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 pt-28 md:pt-36 pb-20 animate-in fade-in duration-700 relative z-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
        <div className="flex items-center space-x-6">
          <div className="p-4 bg-panda-green/20 text-panda-green rounded-2xl border border-panda-green/30">
            <Unlock size={24} />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold uppercase tracking-tighter text-panda-black dark:text-panda-white">{t.admin.dashboard} <span className="text-panda-gold">Victor</span></h1>
            <p className="text-panda-black/40 dark:text-panda-white/40 font-light">{t.admin.management}</p>
          </div>
        </div>
        <div className="flex bg-panda-black/5 dark:bg-panda-white/5 p-1 rounded-2xl border border-panda-black/10 dark:border-panda-white/10 overflow-x-auto no-scrollbar">
          {[
            { id: 'projects', icon: <Layout size={18} />, label: t.nav.portfolio },
            { id: 'blog', icon: <BookOpen size={18} />, label: t.nav.blog },
            { id: 'appointments', icon: <Calendar size={18} />, label: t.nav.contact },
            { id: 'settings', icon: <Settings size={18} />, label: 'Settings' }
          ].map(t_item => (
            <button
              key={t_item.id}
              onClick={() => setTab(t_item.id as any)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all uppercase tracking-[0.2em] text-[10px] font-black whitespace-nowrap ${
                tab === t_item.id ? 'bg-panda-gold text-panda-black shadow-lg shadow-panda-gold/20' : 'hover:bg-panda-black/5 dark:hover:bg-panda-white/5 text-panda-black/40 dark:text-panda-white/40 hover:text-panda-black dark:hover:text-panda-white'
              }`}
            >
              {t_item.icon} <span>{t_item.label}</span>
            </button>
          ))}
        </div>
      </header>

      {tab === 'projects' && (
        <div className="space-y-12">
          <div className="bg-panda-black/5 dark:bg-panda-white/5 border border-panda-black/10 dark:border-panda-white/10 p-5 sm:p-10 rounded-[1.5rem] sm:rounded-[2.5rem]">
            <h3 className="text-2xl font-display font-bold mb-8 flex items-center space-x-3 uppercase tracking-tighter text-panda-black dark:text-panda-white">
              <Plus size={24} className="text-panda-gold" /> 
              <span>{editingProject ? (lang === 'fr' ? 'Modifier le projet' : 'Edit Project') : t.admin.addProject}</span>
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <input 
                  placeholder={t.admin.projectTitle} 
                  value={newProjectTitle}
                  onChange={(e) => setNewProjectTitle(e.target.value)}
                  className="w-full bg-white dark:bg-panda-black/50 border border-panda-black/10 dark:border-panda-white/10 p-5 rounded-2xl outline-none focus:border-panda-gold text-panda-black dark:text-panda-white" 
                />
                <select 
                  value={newProjectCategory}
                  onChange={(e) => setNewProjectCategory(e.target.value as ProjectCategory)}
                  className="w-full bg-white dark:bg-panda-black/50 border border-panda-black/10 dark:border-panda-white/10 p-5 rounded-2xl outline-none focus:border-panda-gold text-panda-black dark:text-panda-white"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <textarea 
                  placeholder={t.admin.shortDesc} 
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                  className="w-full bg-white dark:bg-panda-black/50 border border-panda-black/10 dark:border-panda-white/10 p-5 rounded-2xl outline-none focus:border-panda-gold h-24 text-panda-black dark:text-panda-white" 
                />
                <textarea 
                  placeholder="Le Problème (The Problem)" 
                  value={newProjectProblem}
                  onChange={(e) => setNewProjectProblem(e.target.value)}
                  className="w-full bg-white dark:bg-panda-black/50 border border-panda-black/10 dark:border-panda-white/10 p-5 rounded-2xl outline-none focus:border-panda-gold h-24 text-panda-black dark:text-panda-white" 
                />
                <textarea 
                  placeholder="La Solution (The Solution)" 
                  value={newProjectSolution}
                  onChange={(e) => setNewProjectSolution(e.target.value)}
                  className="w-full bg-white dark:bg-panda-black/50 border border-panda-black/10 dark:border-panda-white/10 p-5 rounded-2xl outline-none focus:border-panda-gold h-24 text-panda-black dark:text-panda-white" 
                />
                <textarea 
                  placeholder={t.admin.caseStudyProcess} 
                  value={newProjectCaseStudy}
                  onChange={(e) => setNewProjectCaseStudy(e.target.value)}
                  className="w-full bg-white dark:bg-panda-black/50 border border-panda-black/10 dark:border-panda-white/10 p-5 rounded-2xl outline-none focus:border-panda-gold h-40 text-panda-black dark:text-panda-white" 
                />
                <div className="flex gap-4">
                  <button 
                    onClick={handleAddProject}
                    disabled={!newProjectTitle || !previewMedia || isGenerating}
                    className="flex-1 py-5 bg-panda-gold text-panda-black font-black uppercase tracking-widest rounded-2xl disabled:opacity-30 flex items-center justify-center space-x-3"
                  >
                    {isGenerating ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : editingProject ? (
                      lang === 'fr' ? 'Enregistrer les modifications' : 'Save Changes'
                    ) : (
                      t.admin.publishProject
                    )}
                  </button>
                  {editingProject && (
                    <button 
                      onClick={handleCancelEditProject}
                      className="px-8 py-5 bg-panda-black/10 dark:bg-panda-white/10 text-panda-black dark:text-panda-white font-black uppercase tracking-widest rounded-2xl hover:bg-panda-black/20 dark:hover:bg-panda-white/20 transition-all"
                    >
                      {lang === 'fr' ? 'Annuler' : 'Cancel'}
                    </button>
                  )}
                </div>
              </div>
              <div className="flex flex-col space-y-6">
                <div>
                  <label className="text-xs uppercase font-black tracking-widest text-panda-black/60 dark:text-panda-white/60 mb-2 block">
                    {lang === 'fr' ? "Média principal (Couverture)" : "Main Media (Cover)"}
                  </label>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*,video/*" onChange={(e) => handleFileChange(e, 'project')} />
                  <div onClick={() => fileInputRef.current?.click()} className="h-[320px] border-2 border-dashed border-panda-black/10 dark:border-panda-white/10 rounded-[2.5rem] flex items-center justify-center bg-panda-black/30 overflow-hidden relative cursor-pointer hover:border-panda-gold/50 transition-all group">
                     {previewMedia ? (
                       <div className="w-full h-full relative">
                          {mediaType === 'image' ? <img src={previewMedia} className="w-full h-full object-cover" /> : <video src={previewMedia} className="w-full h-full object-cover" />}
                          <div className="absolute inset-0 bg-panda-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                             <Upload className="text-panda-gold" size={48} />
                          </div>
                       </div>
                     ) : (
                       <div className="text-center opacity-30 uppercase font-black tracking-widest text-[10px] space-y-4">
                          <ImageIcon size={48} className="mx-auto mb-4" />
                          <div>{t.admin.clickToLoadMedia}</div>
                       </div>
                     )}
                  </div>
                </div>

                {/* Galerie d'images et vidéos supplémentaires */}
                <div className="pt-6 border-t border-panda-black/10 dark:border-panda-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-xs uppercase font-black tracking-widest text-panda-black/60 dark:text-panda-white/60">
                      {lang === 'fr' ? 'Médias de la Galerie (Images & Vidéos)' : 'Gallery Media (Images & Videos)'}
                    </label>
                    <button 
                      type="button"
                      onClick={() => galleryFileInputRef.current?.click()}
                      className="text-xs bg-panda-gold/10 hover:bg-panda-gold/20 text-panda-gold font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1 uppercase tracking-wider animate-pulse-slow"
                    >
                      <Plus size={14} />
                      {lang === 'fr' ? 'Ajouter' : 'Add'}
                    </button>
                  </div>
                  
                  <input 
                    type="file" 
                    ref={galleryFileInputRef} 
                    className="hidden" 
                    accept="image/*,video/*" 
                    multiple 
                    onChange={handleGalleryFileChange} 
                  />

                  {galleryMedia.length > 0 ? (
                    <div className="grid grid-cols-4 gap-4 p-4 bg-panda-black/10 dark:bg-panda-black/40 rounded-[2rem] border border-panda-black/10 dark:border-panda-white/5 max-h-[220px] overflow-y-auto no-scrollbar">
                      {galleryMedia.map((media, idx) => (
                        <div key={idx} className="aspect-square rounded-2xl overflow-hidden relative border border-panda-white/10 group/item bg-panda-black">
                          {media.type === 'image' ? (
                            <img src={media.url} className="w-full h-full object-cover animate-fade-in" referrerPolicy="no-referrer" />
                          ) : (
                            <video src={media.url} className="w-full h-full object-cover animate-fade-in" muted playsInline />
                          )}
                          <button 
                            type="button"
                            onClick={() => handleRemoveGalleryItem(idx)}
                            className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all shadow-md"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 border border-dashed border-panda-black/10 dark:border-panda-white/10 rounded-[2rem] bg-panda-black/5 dark:bg-panda-black/20">
                      <p className="text-xs text-panda-black/40 dark:text-panda-white/40 font-light">
                        {lang === 'fr' ? 'Aucun média supplémentaire' : 'No extra media added yet'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {projects.map(p => (
               <div key={p.id} className="p-6 bg-panda-black/5 dark:bg-panda-white/5 border border-panda-black/10 dark:border-panda-white/10 rounded-3xl flex flex-col group relative overflow-hidden">
                 <div className="aspect-square rounded-2xl overflow-hidden mb-6 bg-panda-black">
                    {p.mediaType === 'image' ? <img src={p.image} className="w-full h-full object-cover" /> : <video src={p.image} className="w-full h-full object-cover" />}
                 </div>
                 <h4 className="font-bold text-lg mb-1 text-panda-black dark:text-panda-white">{p.title[lang]}</h4>
                 <span className="text-xs text-panda-gold uppercase tracking-widest font-black">{p.category}</span>
                 <div className="absolute top-8 right-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button 
                      onClick={() => handleEditProject(p)} 
                      className="p-3 bg-panda-gold/20 text-panda-gold rounded-xl hover:bg-panda-gold hover:text-panda-black transition-all shadow-xl"
                    >
                      <Pencil size={18} />
                    </button>
                    <button 
                      onClick={() => onDeleteProject(p.id)} 
                      className="p-3 bg-red-500/20 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-xl"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
               </div>
             ))}
          </div>
        </div>
      )}

      {tab === 'blog' && (
        <div className="space-y-12">
          <div className="bg-panda-black/5 dark:bg-panda-white/5 border border-panda-black/10 dark:border-panda-white/10 p-5 sm:p-10 rounded-[1.5rem] sm:rounded-[2.5rem]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
               <h3 className="text-2xl font-display font-bold flex items-center space-x-3 uppercase tracking-tighter text-panda-black dark:text-panda-white">
                 <BookOpen size={24} className="text-panda-gold" /> 
                 <span>{t.admin.newPost}</span>
               </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               <div className="space-y-6">
                 <input 
                    placeholder={t.admin.postTitle} 
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    className="w-full bg-white dark:bg-panda-black/50 border border-panda-black/10 dark:border-panda-white/10 p-5 rounded-2xl outline-none focus:border-panda-gold text-panda-black dark:text-panda-white" 
                 />
                 <textarea 
                    placeholder={t.admin.postContent} 
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    className="w-full bg-white dark:bg-panda-black/50 border border-panda-black/10 dark:border-panda-white/10 p-5 rounded-2xl outline-none focus:border-panda-gold h-64 text-panda-black dark:text-panda-white" 
                 />
                 <button 
                    onClick={handleAddBlogPost}
                    disabled={!blogTitle || !blogMedia || isGenerating}
                    className="w-full py-5 bg-panda-gold text-panda-black font-black uppercase tracking-widest rounded-2xl disabled:opacity-30 flex items-center justify-center space-x-3"
                 >
                   {isGenerating ? <Loader2 className="animate-spin" size={20} /> : t.admin.publishPost}
                 </button>
               </div>
               <div className="flex flex-col">
                 <input type="file" ref={blogFileInputRef} className="hidden" accept="image/*,video/*" onChange={(e) => handleFileChange(e, 'blog')} />
                 <div onClick={() => blogFileInputRef.current?.click()} className="flex-1 border-2 border-dashed border-panda-black/10 dark:border-panda-white/10 rounded-[2.5rem] flex items-center justify-center bg-panda-black/30 overflow-hidden relative cursor-pointer hover:border-panda-gold/50 transition-all group">
                   {blogMedia ? (
                     <div className="w-full h-full relative">
                        {blogMediaType === 'image' ? <img src={blogMedia} className="w-full h-full object-cover" /> : <video src={blogMedia} className="w-full h-full object-cover" />}
                        <div className="absolute inset-0 bg-panda-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                           <Upload className="text-panda-gold" size={48} />
                        </div>
                     </div>
                   ) : (
                     <div className="text-center opacity-30 uppercase font-black tracking-widest text-[10px] space-y-4">
                        <ImageIcon size={48} className="mx-auto mb-4" />
                        <div>{t.admin.coverMedia}</div>
                     </div>
                   )}
                 </div>
               </div>
            </div>
          </div>

          <div className="space-y-4">
             {posts.map(p => (
               <div key={p.id} className="flex items-center justify-between p-6 bg-panda-black/5 dark:bg-panda-white/5 border border-panda-black/10 dark:border-panda-white/10 rounded-3xl hover:border-panda-gold/30 transition-all group overflow-hidden">
                 <div className="flex items-center space-x-6">
                   <div className="w-20 h-20 rounded-xl overflow-hidden bg-panda-black border border-white/5">
                      {p.mediaType === 'image' ? <img src={p.image} className="w-full h-full object-cover" /> : <video src={p.image} className="w-full h-full object-cover" />}
                   </div>
                   <div>
                      <h4 className="font-bold text-lg text-panda-black dark:text-panda-white">{p.title[lang]}</h4>
                      <div className="flex items-center space-x-4 text-[10px] uppercase font-black tracking-widest text-panda-black/30 dark:text-panda-white/30">
                        <span className="flex items-center space-x-1"><Calendar size={10} /> <span>{p.date}</span></span>
                        <span className="flex items-center space-x-1"><Heart size={10} className="fill-panda-gold" /> <span>{p.likes} Likes</span></span>
                        <span className="flex items-center space-x-1"><MessageCircle size={10} /> <span>{p.comments.length} Commentaires</span></span>
                      </div>
                   </div>
                 </div>
                 <button onClick={() => onDeletePost(p.id)} className="p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-lg"><Trash2 size={20} /></button>
               </div>
             ))}
          </div>
        </div>
      )}

      {tab === 'appointments' && (
        <div className="space-y-6">
          {appointments.length === 0 ? (
            <div className="text-center py-40 bg-panda-black/5 dark:bg-panda-white/5 border border-dashed border-panda-black/10 dark:border-panda-white/10 rounded-[3rem]">
               <Calendar size={60} className="mx-auto mb-6 text-panda-black/10 dark:text-panda-white/10" />
               <p className="text-panda-black/40 dark:text-panda-white/40 uppercase tracking-widest font-black text-xs">{t.admin.noAppointments}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
               {appointments.map(app => (
                 <div key={app.id} className="p-8 bg-panda-black/5 dark:bg-panda-white/5 border border-panda-black/10 dark:border-panda-white/10 rounded-[2.5rem] flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-panda-black/10 dark:hover:bg-panda-white/10 transition-all group">
                    <div className="flex items-center space-x-6">
                       <div className="w-16 h-16 bg-panda-gold/10 rounded-2xl flex items-center justify-center text-panda-gold border border-panda-gold/20 group-hover:scale-110 transition-transform">
                          <User size={24} />
                       </div>
                       <div>
                          <h4 className="text-xl font-bold mb-1 text-panda-black dark:text-panda-white">{app.name}</h4>
                          <div className="flex flex-wrap gap-4 text-[10px] uppercase font-black tracking-widest">
                             <span className="flex items-center space-x-2 text-panda-black/60 dark:text-panda-white/60"><Mail size={12} /> <span>{app.email}</span></span>
                             <div className="flex items-center space-x-2 text-panda-gold bg-panda-gold/10 px-3 py-1 rounded-lg">
                               <Sparkles size={12} /> 
                               <span>{app.services && Array.isArray(app.services) ? app.services.join(', ') : 'Aucun service'}</span>
                             </div>
                          </div>
                       </div>
                    </div>
                    
                    <div className="flex items-center space-x-8">
                       <div className="text-right">
                          <div className="flex items-center space-x-2 text-panda-black/80 dark:text-panda-white/80 font-bold mb-1">
                             <Calendar size={14} className="text-panda-gold" />
                             <span>{new Date(app.date).toLocaleDateString()}</span>
                          </div>
                          <div className={`text-[9px] uppercase font-black tracking-widest flex items-center justify-end space-x-2 ${app.status === 'confirmed' ? 'text-panda-green' : 'text-amber-500'}`}>
                             {app.status === 'confirmed' ? <CheckCircle size={10} /> : <Clock size={10} />}
                             <span>{app.status === 'confirmed' ? t.admin.confirmed : t.admin.pending}</span>
                          </div>
                       </div>
                       <button className="p-4 bg-panda-black/5 dark:bg-panda-white/5 rounded-2xl hover:bg-panda-gold hover:text-panda-black transition-all text-panda-black dark:text-panda-white">
                          <FileText size={20} />
                       </button>
                    </div>
                 </div>
               ))}
            </div>
          )}
        </div>
      )}

      {tab === 'settings' && (
        <div className="max-w-2xl mx-auto space-y-12 animate-in slide-in-from-bottom-10 duration-700">
          {/* Testimonials Management */}
          {/* Testimonials Management */}
          <div className="bg-panda-white/5 dark:bg-panda-white/5 backdrop-blur-xl rounded-[1.5rem] sm:rounded-[3rem] p-6 sm:p-12 border border-panda-black/10 dark:border-panda-white/10" id="admin-testimonials-card">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-panda-gold/20 flex items-center justify-center">
                <MessageCircle className="text-panda-gold" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-panda-black dark:text-panda-white">
                  {editingTestimonial ? "Modifier le témoignage" : "Avis & Témoignages"}
                </h2>
                <p className="text-panda-black/60 dark:text-panda-white/60">Gérez, relisez et modérez les retours clients</p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Add/Edit Testimonial Form */}
              <div className="grid grid-cols-1 gap-4 bg-panda-black/5 dark:bg-panda-black/25 p-6 rounded-[2rem] border border-panda-black/5 dark:border-panda-white/5">
                <span className="text-[10px] font-black uppercase tracking-widest text-panda-gold mb-2 block">
                  {editingTestimonial ? "Formulaire d'Édition" : "Créer un Témoignage"}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Nom du client *" 
                    value={newTestimonialName}
                    onChange={(e) => setNewTestimonialName(e.target.value)}
                    className="w-full bg-white dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 p-4 rounded-xl outline-none focus:border-panda-gold text-panda-black dark:text-panda-white text-sm" 
                  />
                  <input 
                    type="email" 
                    placeholder="Adresse email *" 
                    value={newTestimonialEmail}
                    onChange={(e) => setNewTestimonialEmail(e.target.value)}
                    className="w-full bg-white dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 p-4 rounded-xl outline-none focus:border-panda-gold text-panda-black dark:text-panda-white text-sm" 
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Poste / Entreprise" 
                    value={newTestimonialRole}
                    onChange={(e) => setNewTestimonialRole(e.target.value)}
                    className="w-full bg-white dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 p-4 rounded-xl outline-none focus:border-panda-gold text-panda-black dark:text-panda-white text-sm" 
                  />
                  <input 
                    type="text" 
                    placeholder="Projet réalisé" 
                    value={newTestimonialProject}
                    onChange={(e) => setNewTestimonialProject(e.target.value)}
                    className="w-full bg-white dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 p-4 rounded-xl outline-none focus:border-panda-gold text-panda-black dark:text-panda-white text-sm" 
                  />
                </div>

                <textarea 
                  placeholder="Contenu du témoignage *" 
                  value={newTestimonialContent}
                  onChange={(e) => setNewTestimonialContent(e.target.value)}
                  className="w-full bg-white dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 p-4 rounded-xl outline-none focus:border-panda-gold h-28 text-panda-black dark:text-panda-white text-sm resize-none" 
                />

                {/* Stars and Moderation Controls */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-panda-black/40 dark:text-panda-white/40">Évaluation :</span>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setNewTestimonialRating(star)}
                          className="text-panda-black/25 dark:text-panda-white/25 hover:scale-110 transition-transform p-1 cursor-pointer"
                        >
                          <Star
                            size={18}
                            className={star <= newTestimonialRating ? "fill-panda-gold text-panda-gold" : "text-panda-black/20 dark:text-panda-white/20"}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="admin-is-approved"
                      checked={newTestimonialIsApproved}
                      onChange={(e) => setNewTestimonialIsApproved(e.target.checked)}
                      className="w-4 h-4 text-panda-gold bg-panda-black border-panda-black/10 rounded focus:ring-panda-gold cursor-pointer"
                    />
                    <label htmlFor="admin-is-approved" className="text-[10px] font-black uppercase tracking-wider text-panda-black/60 dark:text-panda-white/60 cursor-pointer select-none">
                      Approuvé & visible en ligne
                    </label>
                  </div>
                </div>

                <div className="flex gap-4 pt-2">
                  <button 
                    onClick={handleAddTestimonial}
                    className="flex-1 bg-panda-gold hover:bg-panda-gold/90 text-panda-black font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest cursor-pointer"
                  >
                    <Plus size={16} />
                    {editingTestimonial ? "Enregistrer les modifications" : "Ajouter le témoignage"}
                  </button>
                  {editingTestimonial && (
                    <button 
                      onClick={handleCancelEditTestimonial}
                      className="px-6 py-4 bg-panda-black/10 dark:bg-panda-white/10 text-panda-black dark:text-panda-white font-black rounded-xl hover:bg-panda-black/20 dark:hover:bg-panda-white/20 transition-all text-xs uppercase tracking-widest cursor-pointer"
                    >
                      Annuler
                    </button>
                  )}
                </div>
              </div>

              {/* Testimonials Moderation List */}
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                <span className="text-[10px] font-black uppercase tracking-widest text-panda-black/40 dark:text-panda-white/40 block mb-2">
                  Liste des avis clients ({testimonials.length})
                </span>
                {[...testimonials]
                  .sort((a, b) => {
                    // Place unapproved reviews at the top of the queue
                    const aApproved = a.is_approved !== false;
                    const bApproved = b.is_approved !== false;
                    if (!aApproved && bApproved) return -1;
                    if (aApproved && !bApproved) return 1;
                    return 0;
                  })
                  .map(testimonial => {
                    const rating = testimonial.rating ?? 5;
                    const isApproved = testimonial.is_approved !== false;
                    return (
                      <div key={testimonial.id} className="bg-white dark:bg-panda-black/30 border border-panda-black/10 dark:border-panda-white/10 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-panda-gold/50 transition-colors">
                        <div className="space-y-2 flex-1">
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <h4 className="font-bold text-panda-black dark:text-panda-white text-base leading-none">{testimonial.name}</h4>
                            
                            {/* Email Display */}
                            {testimonial.email && (
                              <span className="text-[10px] text-panda-black/40 dark:text-panda-white/40 font-mono">({testimonial.email})</span>
                            )}

                            {/* Status Badge */}
                            {isApproved ? (
                              <span className="flex items-center gap-1 text-[8px] font-bold text-panda-green bg-panda-green/10 border border-panda-green/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                <CheckCircle size={10} /> Approuvé
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-[8px] font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                <Clock size={10} /> En attente
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-xs">
                            <span className="text-panda-gold font-semibold">{testimonial.role[lang] || testimonial.role.fr}</span>
                            {testimonial.project?.[lang] && (
                              <span className="text-panda-black/40 dark:text-panda-white/40">• {testimonial.project[lang]}</span>
                            )}
                          </div>

                          {/* Render Rating Stars */}
                          <div className="flex items-center space-x-1 py-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={12} 
                                className={i < rating ? "fill-panda-gold text-panda-gold" : "text-panda-black/20 dark:text-panda-white/20"} 
                              />
                            ))}
                          </div>

                          <p className="text-xs text-panda-black/70 dark:text-panda-white/70 italic leading-relaxed">
                            "{testimonial.content[lang] || testimonial.content.fr}"
                          </p>
                        </div>

                        {/* Moderation Actions */}
                        <div className="flex items-center gap-2 self-end md:self-center">
                          {!isApproved && (
                            <button
                              onClick={() => onUpdateTestimonial({ ...testimonial, is_approved: true })}
                              className="px-3.5 py-2 bg-panda-green/10 hover:bg-panda-green border border-panda-green/30 text-panda-green hover:text-white font-bold text-[9px] uppercase tracking-widest rounded-lg transition-all cursor-pointer"
                              title="Approuver l'avis pour affichage public"
                            >
                              Approuver
                            </button>
                          )}
                          {isApproved && testimonial.email && (
                            <button
                              onClick={() => onUpdateTestimonial({ ...testimonial, is_approved: false })}
                              className="px-3.5 py-2 bg-amber-500/10 hover:bg-amber-500 border border-amber-500/30 text-amber-500 hover:text-panda-black font-bold text-[9px] uppercase tracking-widest rounded-lg transition-all cursor-pointer"
                              title="Désapprouver (retirer du site)"
                            >
                              Masquer
                            </button>
                          )}
                          <button 
                            onClick={() => handleEditTestimonial(testimonial)}
                            className="p-2.5 text-panda-gold hover:bg-panda-gold/10 rounded-lg border border-transparent hover:border-panda-gold/20 transition-all cursor-pointer"
                            title="Modifier"
                          >
                            <Pencil size={14} />
                          </button>
                          <button 
                            onClick={() => handleDeleteTestimonial(testimonial.id)}
                            className="p-2.5 text-red-500 hover:bg-red-500/10 rounded-lg border border-transparent hover:border-red-500/20 transition-all cursor-pointer"
                            title="Supprimer définitivement"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="bg-panda-black/5 dark:bg-panda-white/5 border border-panda-black/10 dark:border-panda-white/10 rounded-[1.5rem] sm:rounded-[3rem] p-6 sm:p-12 backdrop-blur-xl">
            <h2 className="text-2xl font-display font-bold mb-8 uppercase tracking-tighter text-panda-black dark:text-panda-white flex items-center gap-4">
              <Settings className="text-panda-gold" /> {t.admin.siteSettings}
            </h2>
            
            <div className="space-y-8">
              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-panda-gold">{t.admin.socialNetworks}</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-panda-black/40 dark:text-panda-white/40 ml-4">Facebook URL</label>
                    <input 
                      type="text" 
                      value={fbLink}
                      onChange={(e) => setFbLink(e.target.value)}
                      className="w-full bg-panda-black/5 dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 px-6 py-4 rounded-2xl outline-none focus:border-panda-gold transition-all text-panda-black dark:text-panda-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-panda-black/40 dark:text-panda-white/40 ml-4">Instagram URL</label>
                    <input 
                      type="text" 
                      value={igLink}
                      onChange={(e) => setIgLink(e.target.value)}
                      className="w-full bg-panda-black/5 dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 px-6 py-4 rounded-2xl outline-none focus:border-panda-gold transition-all text-panda-black dark:text-panda-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-panda-black/40 dark:text-panda-white/40 ml-4">WhatsApp Number</label>
                    <input 
                      type="text" 
                      value={waNumber}
                      onChange={(e) => setWaNumber(e.target.value)}
                      className="w-full bg-panda-black/5 dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 px-6 py-4 rounded-2xl outline-none focus:border-panda-gold transition-all text-panda-black dark:text-panda-white"
                    />
                  </div>
                </div>
              </div>

              {/* Tagline */}
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-panda-gold">{t.admin.tagline}</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-panda-black/40 dark:text-panda-white/40 ml-4">Français</label>
                    <input 
                      type="text" 
                      value={taglineFr}
                      onChange={(e) => setTaglineFr(e.target.value)}
                      className="w-full bg-panda-black/5 dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 px-6 py-4 rounded-2xl outline-none focus:border-panda-gold transition-all text-panda-black dark:text-panda-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-panda-black/40 dark:text-panda-white/40 ml-4">English</label>
                    <input 
                      type="text" 
                      value={taglineEn}
                      onChange={(e) => setTaglineEn(e.target.value)}
                      className="w-full bg-panda-black/5 dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 px-6 py-4 rounded-2xl outline-none focus:border-panda-gold transition-all text-panda-black dark:text-panda-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-panda-black/40 dark:text-panda-white/40 ml-4">Deutsch</label>
                    <input 
                      type="text" 
                      value={taglineDe}
                      onChange={(e) => setTaglineDe(e.target.value)}
                      className="w-full bg-panda-black/5 dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 px-6 py-4 rounded-2xl outline-none focus:border-panda-gold transition-all text-panda-black dark:text-panda-white"
                    />
                  </div>
                </div>
              </div>

              {/* About Page Management */}
              <div className="space-y-6 pt-8 border-t border-panda-black/10 dark:border-panda-white/10">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-panda-gold">Page À Propos (Dynamique)</h3>
                
                {/* Profile Image Section */}
                <div className="space-y-3 bg-panda-black/5 dark:bg-panda-black/40 p-6 rounded-3xl border border-panda-black/10 dark:border-panda-white/10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-panda-black/40 dark:text-panda-white/40 block">Photo du créateur</span>
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <img src={aboutImage} alt="Profile preview" className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover border border-panda-black/10 dark:border-panda-white/10" />
                    <div className="flex-1 space-y-2 text-center sm:text-left">
                      <button 
                        type="button"
                        onClick={() => aboutFileInputRef.current?.click()}
                        className="px-6 py-3 bg-panda-gold/10 border border-panda-gold/30 hover:bg-panda-gold text-panda-gold hover:text-panda-black font-bold text-xs uppercase tracking-widest rounded-xl transition-all"
                      >
                        Changer la Photo
                      </button>
                      <input 
                        type="file" 
                        ref={aboutFileInputRef}
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'about')}
                        className="hidden" 
                      />
                      <p className="text-[10px] text-panda-black/40 dark:text-panda-white/40">Fichier image compressé pour s'adapter à la base de données.</p>
                    </div>
                  </div>
                </div>

                {/* About Title (Multilingual) */}
                <div className="space-y-4 bg-panda-black/5 dark:bg-panda-black/40 p-6 rounded-3xl border border-panda-black/10 dark:border-panda-white/10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-panda-black/40 dark:text-panda-white/40 block">Titre (Nom complet / Marque)</span>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-panda-gold">Français</label>
                      <input type="text" value={aboutTitleFr} onChange={(e) => setAboutTitleFr(e.target.value)} className="w-full bg-white dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 px-4 py-3 rounded-xl text-sm text-panda-black dark:text-panda-white outline-none focus:border-panda-gold" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-panda-gold">English</label>
                      <input type="text" value={aboutTitleEn} onChange={(e) => setAboutTitleEn(e.target.value)} className="w-full bg-white dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 px-4 py-3 rounded-xl text-sm text-panda-black dark:text-panda-white outline-none focus:border-panda-gold" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-panda-gold">Deutsch</label>
                      <input type="text" value={aboutTitleDe} onChange={(e) => setAboutTitleDe(e.target.value)} className="w-full bg-white dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 px-4 py-3 rounded-xl text-sm text-panda-black dark:text-panda-white outline-none focus:border-panda-gold" />
                    </div>
                  </div>
                </div>

                {/* About Bio (Multilingual) */}
                <div className="space-y-4 bg-panda-black/5 dark:bg-panda-black/40 p-6 rounded-3xl border border-panda-black/10 dark:border-panda-white/10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-panda-black/40 dark:text-panda-white/40 block">Biographie (Texte principal)</span>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-panda-gold">Français</label>
                      <textarea value={aboutBioFr} onChange={(e) => setAboutBioFr(e.target.value)} className="w-full bg-white dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 px-4 py-3 rounded-xl text-sm text-panda-black dark:text-panda-white outline-none focus:border-panda-gold h-24" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-panda-gold">English</label>
                      <textarea value={aboutBioEn} onChange={(e) => setAboutBioEn(e.target.value)} className="w-full bg-white dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 px-4 py-3 rounded-xl text-sm text-panda-black dark:text-panda-white outline-none focus:border-panda-gold h-24" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-panda-gold">Deutsch</label>
                      <textarea value={aboutBioDe} onChange={(e) => setAboutBioDe(e.target.value)} className="w-full bg-white dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 px-4 py-3 rounded-xl text-sm text-panda-black dark:text-panda-white outline-none focus:border-panda-gold h-24" />
                    </div>
                  </div>
                </div>

                {/* About Pseudonym (Multilingual) */}
                <div className="space-y-4 bg-panda-black/5 dark:bg-panda-black/40 p-6 rounded-3xl border border-panda-black/10 dark:border-panda-white/10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-panda-black/40 dark:text-panda-white/40 block">Pseudonyme & Approche</span>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-panda-gold">Français</label>
                      <textarea value={aboutPseudonymFr} onChange={(e) => setAboutPseudonymFr(e.target.value)} className="w-full bg-white dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 px-4 py-3 rounded-xl text-sm text-panda-black dark:text-panda-white outline-none focus:border-panda-gold h-20" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-panda-gold">English</label>
                      <textarea value={aboutPseudonymEn} onChange={(e) => setAboutPseudonymEn(e.target.value)} className="w-full bg-white dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 px-4 py-3 rounded-xl text-sm text-panda-black dark:text-panda-white outline-none focus:border-panda-gold h-20" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-panda-gold">Deutsch</label>
                      <textarea value={aboutPseudonymDe} onChange={(e) => setAboutPseudonymDe(e.target.value)} className="w-full bg-white dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 px-4 py-3 rounded-xl text-sm text-panda-black dark:text-panda-white outline-none focus:border-panda-gold h-20" />
                    </div>
                  </div>
                </div>

                {/* About Quote (Multilingual) */}
                <div className="space-y-4 bg-panda-black/5 dark:bg-panda-black/40 p-6 rounded-3xl border border-panda-black/10 dark:border-panda-white/10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-panda-black/40 dark:text-panda-white/40 block">Citation / Mantra</span>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-panda-gold">Français</label>
                      <textarea value={aboutQuoteFr} onChange={(e) => setAboutQuoteFr(e.target.value)} className="w-full bg-white dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 px-4 py-3 rounded-xl text-sm text-panda-black dark:text-panda-white outline-none focus:border-panda-gold h-20" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-panda-gold">English</label>
                      <textarea value={aboutQuoteEn} onChange={(e) => setAboutQuoteEn(e.target.value)} className="w-full bg-white dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 px-4 py-3 rounded-xl text-sm text-panda-black dark:text-panda-white outline-none focus:border-panda-gold h-20" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-panda-gold">Deutsch</label>
                      <textarea value={aboutQuoteDe} onChange={(e) => setAboutQuoteDe(e.target.value)} className="w-full bg-white dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 px-4 py-3 rounded-xl text-sm text-panda-black dark:text-panda-white outline-none focus:border-panda-gold h-20" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Services Page Management */}
              <div className="space-y-6 pt-8 border-t border-panda-black/10 dark:border-panda-white/10">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-panda-gold">Page Services (Dynamique)</h3>
                
                {/* Services Page Title */}
                <div className="space-y-4 bg-panda-black/5 dark:bg-panda-black/40 p-6 rounded-3xl border border-panda-black/10 dark:border-panda-white/10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-panda-black/40 dark:text-panda-white/40 block">Titre principal de la page</span>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-panda-gold">Français</label>
                      <input type="text" value={servicesTitleFr} onChange={(e) => setServicesTitleFr(e.target.value)} className="w-full bg-white dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 px-4 py-3 rounded-xl text-sm text-panda-black dark:text-panda-white outline-none focus:border-panda-gold" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-panda-gold">English</label>
                      <input type="text" value={servicesTitleEn} onChange={(e) => setServicesTitleEn(e.target.value)} className="w-full bg-white dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 px-4 py-3 rounded-xl text-sm text-panda-black dark:text-panda-white outline-none focus:border-panda-gold" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-panda-gold">Deutsch</label>
                      <input type="text" value={servicesTitleDe} onChange={(e) => setServicesTitleDe(e.target.value)} className="w-full bg-white dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 px-4 py-3 rounded-xl text-sm text-panda-black dark:text-panda-white outline-none focus:border-panda-gold" />
                    </div>
                  </div>
                </div>

                {/* Services Page Header Description */}
                <div className="space-y-4 bg-panda-black/5 dark:bg-panda-black/40 p-6 rounded-3xl border border-panda-black/10 dark:border-panda-white/10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-panda-black/40 dark:text-panda-white/40 block">Description d'en-tête de la page</span>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-panda-gold">Français</label>
                      <textarea value={servicesDescFr} onChange={(e) => setServicesDescFr(e.target.value)} className="w-full bg-white dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 px-4 py-3 rounded-xl text-sm text-panda-black dark:text-panda-white outline-none focus:border-panda-gold h-20" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-panda-gold">English</label>
                      <textarea value={servicesDescEn} onChange={(e) => setServicesDescEn(e.target.value)} className="w-full bg-white dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 px-4 py-3 rounded-xl text-sm text-panda-black dark:text-panda-white outline-none focus:border-panda-gold h-20" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-panda-gold">Deutsch</label>
                      <textarea value={servicesDescDe} onChange={(e) => setServicesDescDe(e.target.value)} className="w-full bg-white dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 px-4 py-3 rounded-xl text-sm text-panda-black dark:text-panda-white outline-none focus:border-panda-gold h-20" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Home Page Sections Customizer */}
              <div className="space-y-6 pt-8 border-t border-panda-black/10 dark:border-panda-white/10">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-panda-gold">Page d'Accueil (Section par Section)</h3>
                <p className="text-xs text-panda-black/40 dark:text-panda-white/40 mb-4">Gérez le contenu de chaque section de la page d'accueil de manière autonome.</p>

                {/* Collapsible Accordion Group */}
                <div className="space-y-4">
                  {[
                    {
                      id: 'hero',
                      title: 'Section Hero (Bannière Principale)',
                      fields: [
                        { label: 'Titre principal', type: 'text', valueFr: heroTitleFr, setFr: setHeroTitleFr, valueEn: heroTitleEn, setEn: setHeroTitleEn, valueDe: heroTitleDe, setDe: setHeroTitleDe },
                        { label: 'Sous-titre / Slogan', type: 'text', valueFr: heroSubtitleFr, setFr: setHeroSubtitleFr, valueEn: heroSubtitleEn, setEn: setHeroSubtitleEn, valueDe: heroSubtitleDe, setDe: setHeroSubtitleDe },
                        { label: 'Texte Bouton CTA', type: 'text', valueFr: heroCtaFr, setFr: setHeroCtaFr, valueEn: heroCtaEn, setEn: setHeroCtaEn, valueDe: heroCtaDe, setDe: setHeroCtaDe },
                        { label: 'Lien Consultation / Texte secondaire', type: 'text', valueFr: heroConsultationFr, setFr: setHeroConsultationFr, valueEn: heroConsultationEn, setEn: setHeroConsultationEn, valueDe: heroConsultationDe, setDe: setHeroConsultationDe }
                      ]
                    },
                    {
                      id: 'homeAbout',
                      title: 'Section À Propos (Présentation de Victor)',
                      isAbout: true,
                      fields: [
                        { label: 'Surtitre / Badge', type: 'text', valueFr: homeAboutTagFr, setFr: setHomeAboutTagFr, valueEn: homeAboutTagEn, setEn: setHomeAboutTagEn, valueDe: homeAboutTagDe, setDe: setHomeAboutTagDe },
                        { label: 'Nom principal', type: 'text', valueFr: homeAboutTitleFr, setFr: setHomeAboutTitleFr, valueEn: homeAboutTitleEn, setEn: setHomeAboutTitleEn, valueDe: homeAboutTitleDe, setDe: setHomeAboutTitleDe },
                        { label: 'Petite citation en exergue', type: 'text', valueFr: homeAboutQuoteFr, setFr: setHomeAboutQuoteFr, valueEn: homeAboutQuoteEn, setEn: setHomeAboutQuoteEn, valueDe: homeAboutQuoteDe, setDe: setHomeAboutQuoteDe },
                        { label: 'Biographie ou description détaillée', type: 'textarea', valueFr: homeAboutBioFr, setFr: setHomeAboutBioFr, valueEn: homeAboutBioEn, setEn: setHomeAboutBioEn, valueDe: homeAboutBioDe, setDe: setHomeAboutBioDe },
                        { label: 'Texte du bouton', type: 'text', valueFr: homeAboutBtnFr, setFr: setHomeAboutBtnFr, valueEn: homeAboutBtnEn, setEn: setHomeAboutBtnEn, valueDe: homeAboutBtnDe, setDe: setHomeAboutBtnDe }
                      ]
                    },
                    {
                      id: 'homeServices',
                      title: 'Section Expertises (Nos Services)',
                      fields: [
                        { label: 'Surtitre / Badge', type: 'text', valueFr: homeServicesTagFr, setFr: setHomeServicesTagFr, valueEn: homeServicesTagEn, setEn: setHomeServicesTagEn, valueDe: homeServicesTagDe, setDe: setHomeServicesTagDe },
                        { label: 'Titre principal', type: 'text', valueFr: homeServicesTitleFr, setFr: setHomeServicesTitleFr, valueEn: homeServicesTitleEn, setEn: setHomeServicesTitleEn, valueDe: homeServicesTitleDe, setDe: setHomeServicesTitleDe },
                        { label: 'Texte du bouton', type: 'text', valueFr: homeServicesBtnFr, setFr: setHomeServicesBtnFr, valueEn: homeServicesBtnEn, setEn: setHomeServicesBtnEn, valueDe: homeServicesBtnDe, setDe: setHomeServicesBtnDe }
                      ]
                    },
                    {
                      id: 'homePortfolio',
                      title: 'Section Portfolio (Galerie de Projets)',
                      fields: [
                        { label: 'Surtitre / Badge', type: 'text', valueFr: homePortfolioTagFr, setFr: setHomePortfolioTagFr, valueEn: homePortfolioTagEn, setEn: setHomePortfolioTagEn, valueDe: homePortfolioTagDe, setDe: setHomePortfolioTagDe },
                        { label: 'Titre principal', type: 'text', valueFr: homePortfolioTitleFr, setFr: setHomePortfolioTitleFr, valueEn: homePortfolioTitleEn, setEn: setHomePortfolioTitleEn, valueDe: homePortfolioTitleDe, setDe: setHomePortfolioTitleDe },
                        { label: 'Texte du bouton', type: 'text', valueFr: homePortfolioBtnFr, setFr: setHomePortfolioBtnFr, valueEn: homePortfolioBtnEn, setEn: setHomePortfolioBtnEn, valueDe: homePortfolioBtnDe, setDe: setHomePortfolioBtnDe }
                      ]
                    },
                    {
                      id: 'homeBlog',
                      title: 'Section Actualités (Le Journal)',
                      fields: [
                        { label: 'Surtitre / Badge', type: 'text', valueFr: homeBlogTagFr, setFr: setHomeBlogTagFr, valueEn: homeBlogTagEn, setEn: setHomeBlogTagEn, valueDe: homeBlogTagDe, setDe: setHomeBlogTagDe },
                        { label: 'Titre principal', type: 'text', valueFr: homeBlogTitleFr, setFr: setHomeBlogTitleFr, valueEn: homeBlogTitleEn, setEn: setHomeBlogTitleEn, valueDe: homeBlogTitleDe, setDe: setHomeBlogTitleDe },
                        { label: 'Description', type: 'textarea', valueFr: homeBlogDescFr, setFr: setHomeBlogDescFr, valueEn: homeBlogDescEn, setEn: setHomeBlogDescEn, valueDe: homeBlogDescDe, setDe: setHomeBlogDescDe },
                        { label: 'Texte du bouton', type: 'text', valueFr: homeBlogBtnFr, setFr: setHomeBlogBtnFr, valueEn: homeBlogBtnEn, setEn: setHomeBlogBtnEn, valueDe: homeBlogBtnDe, setDe: setHomeBlogBtnDe }
                      ]
                    },
                    {
                      id: 'homeTestimonials',
                      title: 'Section Témoignages (Avis Clients)',
                      fields: [
                        { label: 'Surtitre / Badge', type: 'text', valueFr: homeTestimonialsTagFr, setFr: setHomeTestimonialsTagFr, valueEn: homeTestimonialsTagEn, setEn: setHomeTestimonialsTagEn, valueDe: homeTestimonialsTagDe, setDe: setHomeTestimonialsTagDe },
                        { label: 'Titre principal', type: 'text', valueFr: homeTestimonialsTitleFr, setFr: setHomeTestimonialsTitleFr, valueEn: homeTestimonialsTitleEn, setEn: setHomeTestimonialsTitleEn, valueDe: homeTestimonialsTitleDe, setDe: setHomeTestimonialsTitleDe }
                      ]
                    },
                    {
                      id: 'homeCta',
                      title: 'Section Appel à l\'Action (CTA Bas de Page)',
                      fields: [
                        { label: 'Titre principal', type: 'text', valueFr: homeCtaTitleFr, setFr: setHomeCtaTitleFr, valueEn: homeCtaTitleEn, setEn: setHomeCtaTitleEn, valueDe: homeCtaTitleDe, setDe: setHomeCtaTitleDe },
                        { label: 'Description', type: 'textarea', valueFr: homeCtaDescFr, setFr: setHomeCtaDescFr, valueEn: homeCtaDescEn, setEn: setHomeCtaDescEn, valueDe: homeCtaDescDe, setDe: setHomeCtaDescDe },
                        { label: 'Texte du bouton', type: 'text', valueFr: homeCtaBtnFr, setFr: setHomeCtaBtnFr, valueEn: homeCtaBtnEn, setEn: setHomeCtaBtnEn, valueDe: homeCtaBtnDe, setDe: setHomeCtaBtnDe }
                      ]
                    }
                  ].map(sec => (
                    <div key={sec.id} className="border border-panda-black/10 dark:border-panda-white/10 rounded-2xl overflow-hidden transition-all bg-panda-black/5 dark:bg-panda-black/30">
                      <button
                        type="button"
                        onClick={() => setExpandedSection(expandedSection === sec.id ? null : sec.id)}
                        className="w-full flex items-center justify-between p-6 hover:bg-panda-black/5 dark:hover:bg-panda-white/5 transition-all text-left"
                      >
                        <span className="font-bold text-sm tracking-tight text-panda-black dark:text-panda-white">{sec.title}</span>
                        <Pencil size={14} className={`transition-all text-panda-gold ${expandedSection === sec.id ? 'rotate-45' : ''}`} />
                      </button>

                      {expandedSection === sec.id && (
                        <div className="p-6 border-t border-panda-black/10 dark:border-panda-white/10 bg-white dark:bg-panda-black/40 space-y-6">
                          {sec.isAbout && (
                            <div className="space-y-3 bg-panda-black/5 dark:bg-panda-black/40 p-4 rounded-2xl border border-panda-black/10 dark:border-panda-white/10">
                              <span className="text-[10px] font-black uppercase tracking-widest text-panda-black/40 dark:text-panda-white/40 block">Photo de présentation d'accueil</span>
                              <div className="flex flex-col sm:flex-row items-center gap-4">
                                <img src={homeAboutImage} alt="Home About Preview" className="w-20 h-20 rounded-xl object-cover border border-panda-black/10 dark:border-panda-white/10" />
                                <div className="space-y-1">
                                  <button
                                    type="button"
                                    onClick={() => homeAboutFileInputRef.current?.click()}
                                    className="px-4 py-2 bg-panda-gold/10 border border-panda-gold/30 hover:bg-panda-gold text-panda-gold hover:text-panda-black font-bold text-[10px] uppercase tracking-widest rounded-lg transition-all"
                                  >
                                    Uploader l'image
                                  </button>
                                  <input
                                    type="file"
                                    ref={homeAboutFileInputRef}
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, 'homeAbout')}
                                    className="hidden"
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {sec.fields.map((f, fIdx) => (
                            <div key={fIdx} className="space-y-4 p-4 bg-panda-black/5 dark:bg-panda-black/20 rounded-2xl border border-panda-black/5 dark:border-panda-white/5">
                              <span className="text-[10px] font-black uppercase tracking-widest text-panda-black/40 dark:text-panda-white/40 block">{f.label}</span>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-1">
                                  <label className="text-[9px] uppercase tracking-wider text-panda-gold">Français</label>
                                  {f.type === 'textarea' ? (
                                    <textarea value={f.valueFr} onChange={(e) => f.setFr(e.target.value)} className="w-full bg-white dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 px-3 py-2 rounded-xl text-xs text-panda-black dark:text-panda-white outline-none focus:border-panda-gold h-20" />
                                  ) : (
                                    <input type="text" value={f.valueFr} onChange={(e) => f.setFr(e.target.value)} className="w-full bg-white dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 px-3 py-2 rounded-xl text-xs text-panda-black dark:text-panda-white outline-none focus:border-panda-gold" />
                                  )}
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[9px] uppercase tracking-wider text-panda-gold">English</label>
                                  {f.type === 'textarea' ? (
                                    <textarea value={f.valueEn} onChange={(e) => f.setEn(e.target.value)} className="w-full bg-white dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 px-3 py-2 rounded-xl text-xs text-panda-black dark:text-panda-white outline-none focus:border-panda-gold h-20" />
                                  ) : (
                                    <input type="text" value={f.valueEn} onChange={(e) => f.setEn(e.target.value)} className="w-full bg-white dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 px-3 py-2 rounded-xl text-xs text-panda-black dark:text-panda-white outline-none focus:border-panda-gold" />
                                  )}
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[9px] uppercase tracking-wider text-panda-gold">Deutsch</label>
                                  {f.type === 'textarea' ? (
                                    <textarea value={f.valueDe} onChange={(e) => f.setDe(e.target.value)} className="w-full bg-white dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 px-3 py-2 rounded-xl text-xs text-panda-black dark:text-panda-white outline-none focus:border-panda-gold h-20" />
                                  ) : (
                                    <input type="text" value={f.valueDe} onChange={(e) => f.setDe(e.target.value)} className="w-full bg-white dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 px-3 py-2 rounded-xl text-xs text-panda-black dark:text-panda-white outline-none focus:border-panda-gold" />
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleSaveSettings}
                className="w-full py-6 bg-panda-gold text-panda-black font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-panda-gold/90 transition-all shadow-xl shadow-panda-gold/20 flex items-center justify-center gap-3"
              >
                <CheckCircle size={20} />
                {t.admin.saveSettings}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
