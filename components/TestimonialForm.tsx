import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Language, Testimonial } from '../types';

interface TestimonialFormProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (testimonial: Testimonial) => Promise<void>;
}

export const TestimonialForm: React.FC<TestimonialFormProps> = ({
  lang,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [project, setProject] = useState('');
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Honeypot spam protection fields
  const [honeypot, setHoneypot] = useState('');

  const translations = {
    fr: {
      title: 'Votre Avis Client',
      subtitle: 'Partagez votre expérience avec Panda Graphique',
      nameLabel: 'Nom complet *',
      namePlaceholder: 'Sébastien Granger',
      emailLabel: 'Adresse email *',
      emailPlaceholder: 'sebastien@exemple.com',
      companyLabel: 'Poste / Entreprise',
      companyPlaceholder: 'Directeur Marketing chez Nova',
      projectLabel: 'Projet réalisé',
      projectPlaceholder: 'Identité de marque & Site Web',
      ratingLabel: 'Votre évaluation *',
      commentLabel: 'Votre témoignage *',
      commentPlaceholder: 'Quel a été votre ressenti de notre collaboration...',
      submitBtn: 'Soumettre mon témoignage',
      submitting: 'Envoi en cours...',
      successTitle: 'Merci pour votre confiance !',
      successText: 'Votre témoignage a été envoyé avec succès. Un administrateur va le relire et l\'approuver sous peu.',
      errorTitle: 'Une erreur est survenue',
      errorGeneric: 'Erreur lors de la soumission. Veuillez réessayer plus tard.',
      requiredFields: 'Veuillez remplir tous les champs obligatoires (*)',
      closeBtn: 'Fermer',
    },
    en: {
      title: 'Your Client Review',
      subtitle: 'Share your experience with Panda Graphique',
      nameLabel: 'Full Name *',
      namePlaceholder: 'Sébastien Granger',
      emailLabel: 'Email Address *',
      emailPlaceholder: 'sebastien@example.com',
      companyLabel: 'Role / Company',
      companyPlaceholder: 'Marketing Director at Nova',
      projectLabel: 'Project Realized',
      projectPlaceholder: 'Brand Identity & Website',
      ratingLabel: 'Your Rating *',
      commentLabel: 'Your Review *',
      commentPlaceholder: 'How did you find our collaboration...',
      submitBtn: 'Submit review',
      submitting: 'Submitting...',
      successTitle: 'Thank you for your trust!',
      successText: 'Your review has been successfully submitted. An administrator will review and approve it shortly.',
      errorTitle: 'An error occurred',
      errorGeneric: 'Error during submission. Please try again later.',
      requiredFields: 'Please fill in all required fields (*)',
      closeBtn: 'Close',
    },
    de: {
      title: 'Ihre Kundenbewertung',
      subtitle: 'Teilen Sie Ihre Erfahrungen mit Panda Graphique',
      nameLabel: 'Vollständiger Name *',
      namePlaceholder: 'Sébastien Granger',
      emailLabel: 'E-Mail-Adresse *',
      emailPlaceholder: 'sebastien@beispiel.de',
      companyLabel: 'Rolle / Unternehmen',
      companyPlaceholder: 'Marketingleiter bei Nova',
      projectLabel: 'Realisierte Projekt',
      projectPlaceholder: 'Markenidentität & Website',
      ratingLabel: 'Ihre Bewertung *',
      commentLabel: 'Ihre Rezension *',
      commentPlaceholder: 'Wie haben Sie unsere Zusammenarbeit empfunden...',
      submitBtn: 'Bewertung abschicken',
      submitting: 'Wird gesendet...',
      successTitle: 'Vielen Dank für Ihr Vertrauen!',
      successText: 'Ihre Bewertung wurde erfolgreich übermittelt. Ein Administrator wird sie in Kürze prüfen und genehmigen.',
      errorTitle: 'Ein Fehler ist aufgetreten',
      errorGeneric: 'Fehler bei der Übermittlung. Bitte versuchen Sie es später noch einmal.',
      requiredFields: 'Bitte füllen Sie alle Pflichtfelder aus (*)',
      closeBtn: 'Schließen',
    },
  };

  const t = translations[lang as keyof typeof translations] || translations.fr;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Form Validation
    if (!name.trim() || !email.trim() || !comment.trim()) {
      setErrorMessage(t.requiredFields);
      return;
    }

    setIsSubmitting(true);

    try {
      // Honeypot spam check - if bots fill this field, silently finish with "success" without saving
      if (honeypot) {
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate delay
        setIsSuccess(true);
        setIsSubmitting(false);
        return;
      }

      // Create structured testimonial payload
      const testimonialPayload: Testimonial = {
        id: `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: name.trim(),
        role: {
          fr: company.trim() || 'Client',
          en: company.trim() || 'Client',
          de: company.trim() || 'Client',
        },
        content: {
          fr: comment.trim(),
          en: comment.trim(),
          de: comment.trim(),
        },
        project: {
          fr: project.trim() || 'Collaboration',
          en: project.trim() || 'Collaboration',
          de: project.trim() || 'Zusammenarbeit',
        },
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=d4af37&textColor=0a0a0a`,
        email: email.trim(),
        company: company.trim(),
        rating: rating,
        is_approved: false, // Moderated by default
        created_at: new Date().toISOString(),
      };

      await onSubmit(testimonialPayload);
      setIsSuccess(true);
    } catch (err: any) {
      console.error('Error submitting testimonial:', err);
      setErrorMessage(err.message || t.errorGeneric);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setCompany('');
    setProject('');
    setRating(5);
    setComment('');
    setIsSuccess(false);
    setErrorMessage(null);
    setHoneypot('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-panda-black/80 backdrop-blur-md"
            id="testimonial-form-overlay"
          />

          {/* Form Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="bg-white dark:bg-panda-black border border-panda-black/10 dark:border-panda-white/10 w-full max-w-xl rounded-[2rem] shadow-2xl relative z-10 overflow-hidden"
            id="testimonial-form-modal"
          >
            {/* Header */}
            <div className="px-8 py-6 border-b border-panda-black/5 dark:border-panda-white/5 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-display uppercase tracking-tight text-panda-black dark:text-panda-white font-bold">
                  {t.title}
                </h3>
                <p className="text-xs text-panda-black/60 dark:text-panda-white/60">
                  {t.subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 bg-panda-black/5 dark:bg-panda-white/5 hover:bg-panda-gold hover:text-panda-black text-panda-black dark:text-panda-white rounded-full transition-all border border-panda-black/10 dark:border-panda-white/10"
                aria-label={t.closeBtn}
                id="testimonial-form-close-btn"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Body Content */}
            <div className="p-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
              {isSuccess ? (
                /* Success card view */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 flex flex-col items-center space-y-6"
                  id="testimonial-success-card"
                >
                  <div className="w-20 h-20 bg-panda-green/10 text-panda-green rounded-full flex items-center justify-center border border-panda-green/20">
                    <CheckCircle size={44} />
                  </div>
                  <h4 className="text-2xl font-display font-bold uppercase tracking-tight text-panda-black dark:text-panda-white">
                    {t.successTitle}
                  </h4>
                  <p className="text-sm text-panda-black/70 dark:text-panda-white/60 max-w-sm leading-relaxed">
                    {t.successText}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      handleReset();
                      onClose();
                    }}
                    className="px-8 py-4 bg-panda-gold text-panda-black font-black uppercase tracking-[0.2em] rounded-xl hover:bg-panda-gold/90 transition-all text-xs"
                    id="testimonial-success-close-btn"
                  >
                    {t.closeBtn}
                  </button>
                </motion.div>
              ) : (
                /* Standard submission form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-500/10 text-red-500 border border-red-500/20 p-4 rounded-xl flex items-center space-x-3 text-xs font-semibold"
                      id="testimonial-error-alert"
                    >
                      <AlertCircle size={16} className="shrink-0" />
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}

                  {/* Honeypot field (hidden from screen readers & users, but attractive to bots) */}
                  <div className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden">
                    <input
                      type="text"
                      name="website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      placeholder="Your website URL"
                      autoComplete="off"
                      tabIndex={-1}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-panda-black/50 dark:text-panda-white/50 block">
                        {t.nameLabel}
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t.namePlaceholder}
                        className="w-full bg-panda-black/5 dark:bg-panda-black/40 border border-panda-black/10 dark:border-panda-white/10 px-5 py-3.5 rounded-xl text-sm text-panda-black dark:text-panda-white outline-none focus:border-panda-gold transition-all"
                        id="testimonial-form-name-input"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-panda-black/50 dark:text-panda-white/50 block">
                        {t.emailLabel}
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.emailPlaceholder}
                        className="w-full bg-panda-black/5 dark:bg-panda-black/40 border border-panda-black/10 dark:border-panda-white/10 px-5 py-3.5 rounded-xl text-sm text-panda-black dark:text-panda-white outline-none focus:border-panda-gold transition-all"
                        id="testimonial-form-email-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Company / Role */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-panda-black/50 dark:text-panda-white/50 block">
                        {t.companyLabel}
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder={t.companyPlaceholder}
                        className="w-full bg-panda-black/5 dark:bg-panda-black/40 border border-panda-black/10 dark:border-panda-white/10 px-5 py-3.5 rounded-xl text-sm text-panda-black dark:text-panda-white outline-none focus:border-panda-gold transition-all"
                        id="testimonial-form-company-input"
                      />
                    </div>

                    {/* Project Name */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-panda-black/50 dark:text-panda-white/50 block">
                        {t.projectLabel}
                      </label>
                      <input
                        type="text"
                        value={project}
                        onChange={(e) => setProject(e.target.value)}
                        placeholder={t.projectPlaceholder}
                        className="w-full bg-panda-black/5 dark:bg-panda-black/40 border border-panda-black/10 dark:border-panda-white/10 px-5 py-3.5 rounded-xl text-sm text-panda-black dark:text-panda-white outline-none focus:border-panda-gold transition-all"
                        id="testimonial-form-project-input"
                      />
                    </div>
                  </div>

                  {/* Star Rating Interactive Selector */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-panda-black/50 dark:text-panda-white/50 block">
                      {t.ratingLabel}
                    </label>
                    <div className="flex items-center space-x-2 bg-panda-black/5 dark:bg-panda-black/40 px-5 py-3 rounded-xl border border-panda-black/10 dark:border-panda-white/10 w-fit">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(null)}
                          className="text-panda-black/25 dark:text-panda-white/25 hover:scale-125 hover:rotate-6 transition-all duration-150 p-1"
                          id={`testimonial-star-rating-btn-${star}`}
                        >
                          <Star
                            size={24}
                            className={`${
                              star <= (hoveredRating ?? rating)
                                ? 'fill-panda-gold text-panda-gold'
                                : 'text-panda-black/20 dark:text-panda-white/20'
                            } transition-colors`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-panda-black/50 dark:text-panda-white/50 block">
                      {t.commentLabel}
                    </label>
                    <textarea
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder={t.commentPlaceholder}
                      rows={4}
                      className="w-full bg-panda-black/5 dark:bg-panda-black/40 border border-panda-black/10 dark:border-panda-white/10 px-5 py-3.5 rounded-xl text-sm text-panda-black dark:text-panda-white outline-none focus:border-panda-gold transition-all resize-none"
                      id="testimonial-form-comment-textarea"
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-panda-gold hover:bg-panda-gold/90 text-panda-black font-black uppercase tracking-[0.3em] rounded-xl transition-all shadow-xl shadow-panda-gold/15 flex items-center justify-center space-x-2 disabled:opacity-75 disabled:cursor-not-allowed"
                    id="testimonial-form-submit-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>{t.submitting}</span>
                      </>
                    ) : (
                      <span>{t.submitBtn}</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
