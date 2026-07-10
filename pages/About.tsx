
import React from 'react';
import { Language, AppSettings } from '../types';
import { TRANSLATIONS } from '../constants';
import { Quote, Award, Globe, Heart, Sparkles, Zap, Target } from 'lucide-react';

const About: React.FC<{ lang: Language; settings?: AppSettings }> = ({ lang, settings }) => {
  const t = TRANSLATIONS[lang];

  // Dynamic variables with fallback to static translations
  const title = settings?.about?.title?.[lang] || t.about.title;
  const bio = settings?.about?.bio?.[lang] || t.about.bio;
  const pseudonym = settings?.about?.pseudonym?.[lang] || t.about.pseudonym;
  const quote = settings?.about?.quote?.[lang] || t.about.quote;
  const image = settings?.about?.image || "https://picsum.photos/seed/victor/800/1000";

  // Split title for styling (accent on last word)
  const titleWords = title.split(' ');
  const titleMain = titleWords.length > 1 ? titleWords.slice(0, -1).join(' ') : title;
  const titleAccent = titleWords.length > 1 ? titleWords[titleWords.length - 1] : '';

  return (
    <div className="max-w-7xl mx-auto px-6 pt-28 md:pt-36 pb-20">
      {/* Intro Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-20 md:mb-40">
        <div className="relative animate-slide-up max-w-[450px] mx-auto lg:max-w-none w-full">
          <div className="absolute -inset-4 border-2 border-panda-gold translate-x-4 translate-y-4 sm:translate-x-8 sm:translate-y-8 -z-10 animate-float rounded-3xl" />
          <div className="relative overflow-hidden rounded-3xl aspect-[4/5] shadow-2xl border border-panda-white/10">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover grayscale hover:grayscale-0 hover:brightness-110 transition-all duration-[6000ms] ease-in-out transform hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-panda-black/60 to-transparent" />
            <div className="absolute bottom-10 left-10">
              <span className="bg-panda-gold text-panda-black px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">{t.about.founder}</span>
            </div>
          </div>
        </div>
        <div className="animate-slide-up animate-delay-200">
          <span className="text-panda-gold font-display text-xs tracking-[0.6em] uppercase mb-8 block">{t.about.creator}</span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold tracking-tighter mb-6 sm:mb-12 uppercase leading-none text-panda-black dark:text-panda-white">
            {titleMain} {titleAccent && <><br/> <span className="text-panda-gold">{titleAccent}</span></>}
          </h1>
          <div className="space-y-8 text-xl text-panda-black/70 dark:text-panda-white/70 leading-relaxed font-light font-sans">
            <p className="first-letter:text-5xl first-letter:text-panda-gold first-letter:font-display first-letter:mr-3 first-letter:float-left">
              {bio}
            </p>
            <p>
              {pseudonym}
            </p>
            <div className="pt-8 sm:pt-10 border-t border-panda-black/10 dark:border-panda-white/10 flex flex-col items-start relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-panda-black/5 dark:bg-panda-white/5">
              <Quote className="text-panda-gold/40 mb-4 sm:mb-6" size={40} />
              <p className="italic text-panda-black dark:text-panda-white font-medium text-lg sm:text-2xl leading-relaxed relative z-10">
                {quote}
              </p>
              <div className="absolute top-0 right-0 w-32 h-32 marble-texture opacity-10 rounded-bl-full pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Values / Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10 mb-20 md:mb-40 reveal">
        {[
          { icon: <Sparkles size={36} />, title: t.about.pillars.excellence.title, desc: t.about.pillars.excellence.desc },
          { icon: <Zap size={36} />, title: t.about.pillars.impact.title, desc: t.about.pillars.impact.desc },
          { icon: <Target size={36} />, title: t.about.pillars.strategy.title, desc: t.about.pillars.strategy.desc }
        ].map((item, i) => (
          <div key={i} className="p-6 sm:p-12 border border-panda-black/10 dark:border-panda-white/10 rounded-[1.5rem] sm:rounded-[2.5rem] bg-panda-black/5 dark:bg-panda-white/5 hover-gold-glow group transition-all duration-500">
            <div className="text-panda-gold mb-6 sm:mb-8 group-hover:scale-125 transition-transform duration-500">{item.icon}</div>
            <h3 className="text-xl sm:text-2xl font-display mb-3 sm:mb-4 uppercase tracking-tight text-panda-black dark:text-panda-white">{item.title}</h3>
            <p className="text-panda-black/70 dark:text-panda-white/50 leading-relaxed text-sm sm:text-base">{item.desc}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default About;
