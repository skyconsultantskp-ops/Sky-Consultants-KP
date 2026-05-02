'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import {
  Globe, Plane, GraduationCap, Phone, Mail, MapPin,
  ChevronDown, Clock, DollarSign, Building2, BookOpen,
  Star, ArrowRight, ExternalLink, Menu, X, Users,
  Award, Shield, Headphones, CheckCircle2, Sparkles,
  FileCheck, Languages, Wallet, Handshake, Zap, TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { countries, type Country } from '@/lib/countries';

/* ─── Animated Counter ─── */
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Animated Mesh Background ─── */
function MeshBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <motion.div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 70%)' }}
        animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.4) 0%, transparent 70%)' }}
        animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-40 left-1/3 w-[400px] h-[400px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)' }}
        animate={{ x: [0, 40, 0], y: [0, -60, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />
    </div>
  );
}

/* ─── Connection Lines SVG ─── */
function ConnectionLines() {
  const points = countries.map((_, i) => {
    const angle = (i / countries.length) * Math.PI * 2 - Math.PI / 2;
    const rx = 35 + Math.random() * 10;
    const ry = 30 + Math.random() * 10;
    return { x: 50 + rx * Math.cos(angle), y: 50 + ry * Math.sin(angle) };
  });

  return (
    <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      {points.map((p, i) => (
        <g key={i}>
          {points.map((p2, j) => (
            i < j && Math.random() > 0.6 ? (
              <motion.line
                key={`${i}-${j}`}
                x1={p.x} y1={p.y} x2={p2.x} y2={p2.y}
                stroke="rgb(16, 185, 129)"
                strokeWidth="0.15"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 + j * 0.1, ease: 'easeInOut' }}
              />
            ) : null
          ))}
          <motion.circle
            cx={p.x} cy={p.y} r="0.8"
            fill="rgb(16, 185, 129)"
            animate={{ r: [0.8, 1.5, 0.8], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
          />
        </g>
      ))}
    </svg>
  );
}

/* ─── Typewriter Text ─── */
function TypewriterText({ texts, className }: { texts: string[]; className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[currentIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(current.slice(0, displayText.length + 1));
        if (displayText.length === current.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(current.slice(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 30 : 80);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, texts]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="text-emerald-400"
      >
        |
      </motion.span>
    </span>
  );
}

/* ─── Hero Section ─── */
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.7], [1, 0.9]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#060d1b]">
      <motion.div style={{ y, opacity, scale }} className="absolute inset-0">
        <MeshBackground />
        <ConnectionLines />
      </motion.div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
      }} />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#060d1b] to-transparent z-10" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium backdrop-blur-sm">
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <Globe className="w-4 h-4" />
            </motion.span>
            Trusted by 1000+ Students Across Pakistan
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-8xl font-extrabold text-white mb-6 leading-[0.95] tracking-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <span className="block">Your Future</span>
          <span className="block mt-2 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Starts Here
          </span>
        </motion.h1>

        {/* Typewriter subheading */}
        <motion.div
          className="h-10 mb-8 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-xl md:text-2xl text-slate-300 font-light">
            Study in{' '}
            <TypewriterText
              texts={countries.map(c => c.name)}
              className="text-emerald-400 font-semibold"
            />
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-base md:text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="text-white font-semibold">Sky Consultants KP</span> is your gateway to world-class education in{' '}
          <span className="text-emerald-400">10+ countries</span>. No IELTS, low costs, full support.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <Button
            size="lg"
            className="group relative bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white px-8 py-7 text-base font-semibold rounded-2xl shadow-xl shadow-emerald-500/20 overflow-hidden"
            onClick={() => document.getElementById('countries')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Destinations
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800/50 hover:text-white hover:border-emerald-500/50 px-8 py-7 text-base rounded-2xl backdrop-blur-sm"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Phone className="mr-2 w-4 h-4" />
            Get Free Consultation
          </Button>
        </motion.div>

        {/* Floating stats pills */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {[
            { icon: Globe, text: '10+ Countries' },
            { icon: GraduationCap, text: 'No IELTS Required' },
            { icon: Shield, text: 'Visa Guaranteed' },
            { icon: DollarSign, text: 'From 6 Lac Only' },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm backdrop-blur-sm"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            >
              <item.icon className="w-4 h-4 text-emerald-400" />
              {item.text}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-emerald-500/40 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Stats Section ─── */
function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const stats = [
    { icon: Globe, value: 10, suffix: '+', label: 'Countries', color: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-500/10' },
    { icon: Building2, value: 50, suffix: '+', label: 'Top Universities', color: 'from-teal-500 to-cyan-500', bg: 'bg-teal-500/10' },
    { icon: Users, value: 1000, suffix: '+', label: 'Students Helped', color: 'from-cyan-500 to-blue-500', bg: 'bg-cyan-500/10' },
    { icon: TrendingUp, value: 98, suffix: '%', label: 'Visa Success Rate', color: 'from-amber-500 to-orange-500', bg: 'bg-amber-500/10' },
  ];

  return (
    <section ref={ref} className="relative py-20 bg-[#060d1b]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group relative"
            >
              <div className="relative p-6 md:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/30 transition-all duration-500 text-center overflow-hidden">
                {/* Glow effect */}
                <div className={`absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`} />
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${stat.bg} mb-4`}>
                  <stat.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="text-3xl md:text-4xl font-extrabold text-white mb-1 tracking-tight">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-slate-500 text-sm font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works ─── */
function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const steps = [
    { step: '01', icon: Handshake, title: 'Free Consultation', desc: 'Book a free session with our expert counselors to discuss your study goals and budget.' },
    { step: '02', icon: FileCheck, title: 'Document Preparation', desc: 'We handle all documentation — attestation, translations, MOFA, IBCC, HEC verification.' },
    { step: '03', icon: Building2, title: 'University Application', desc: 'We apply to top universities matching your profile and secure your admission letter.' },
    { step: '04', icon: Plane, title: 'Visa & Travel', desc: 'From visa filing to travel arrangements — we ensure a smooth journey to your destination.' },
  ];

  return (
    <section ref={ref} className="relative py-24 bg-[#060d1b]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Zap className="w-3 h-3" /> Our Process
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            How It <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-lg mx-auto">From your first call to landing abroad — we handle everything.</p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
            {steps.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group relative"
              >
                <div className="relative p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/30 transition-all duration-500 text-center">
                  {/* Step number */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                    <span className="text-emerald-400 text-xs font-bold">{item.step}</span>
                  </div>
                  <div className="pt-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 mb-4 group-hover:scale-110 group-hover:border-emerald-500/40 transition-all duration-300">
                      <item.icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 3D Country Card ─── */
function CountryCard({ country, index, onClick }: { country: Country; index: number; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const [isHovered, setIsHovered] = useState(false);

  // Holographic shine background - must be called at top level (not conditionally)
  const shineBackground = useTransform(
    [mouseX, mouseY],
    ([x, y]) => {
      if (!isHovered) return 'transparent';
      return `radial-gradient(400px circle at ${x}px ${y}px, rgba(16,185,129,0.08), transparent 60%)`;
    }
  );

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
    rotateX.set((y - rect.height / 2) / 8);
    rotateY.set((rect.width / 2 - x) / 8);
  }, [mouseX, mouseY, rotateX, rotateY]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  }, [rotateX, rotateY]);

  // Extract cost range for mini display
  const costNum = country.visa.totalCost.match(/(\d+)[–\-](\d+)/);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <div
        ref={cardRef}
        className="perspective-1000 cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        <motion.div
          className="preserve-3d relative rounded-2xl overflow-hidden border transition-all duration-300"
          style={{
            rotateX,
            rotateY,
            borderColor: isHovered ? 'rgba(16,185,129,0.4)' : 'rgba(51,65,85,0.5)',
            background: 'linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.8) 100%)',
          }}
          animate={{ scale: isHovered ? 1.03 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          {/* Top gradient bar */}
          <div className={`h-1 bg-gradient-to-r ${country.gradient}`} />

          {/* Holographic shine on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-20 rounded-2xl"
            style={{ background: shineBackground }}
          />

          <div className="p-5 relative z-10">
            {/* Country header */}
            <div className="flex items-center gap-3 mb-4">
              <motion.span
                className="text-4xl"
                animate={isHovered ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                {country.flag}
              </motion.span>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-white truncate">{country.name}</h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="w-3 h-3" />
                  {country.visa.processTime}
                </div>
              </div>
            </div>

            {/* Cost highlight */}
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
              <div className="flex items-baseline gap-1">
                <span className="text-xs text-slate-500">From</span>
                <span className="text-xl font-extrabold text-emerald-400">
                  {costNum ? costNum[1] : country.visa.totalCost}
                </span>
                {costNum && <span className="text-xs text-slate-500">– {costNum[2]} Lac PKR</span>}
              </div>
            </div>

            {/* Key details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <BookOpen className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span className="truncate">{country.visa.intake}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <DollarSign className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">Bank: {country.visa.bankStatement}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-medium border border-emerald-500/10">
                No IELTS
              </span>
              <span className="px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-400 text-[10px] font-medium border border-teal-500/10">
                Scholarships
              </span>
              <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 text-[10px] font-medium border border-cyan-500/10">
                {country.universities.length} Universities
              </span>
            </div>

            {/* CTA */}
            <div className="flex items-center justify-between text-emerald-400 text-sm font-medium">
              <span>View Details</span>
              <motion.div
                animate={isHovered ? { x: 4 } : { x: 0 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── Country Detail Dialog ─── */
function CountryDetailDialog({ country, open, onClose }: { country: Country | null; open: boolean; onClose: () => void }) {
  if (!country) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar bg-[#0a1628] border-slate-800 text-white p-0 rounded-2xl">
        <DialogTitle className="sr-only">{country.name} Study Visa Details</DialogTitle>

        {/* Header */}
        <div className="relative p-6 md:p-8 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${country.gradient} opacity-20`} />
          <div className="absolute inset-0 bg-[#0a1628]/60" />
          <div className="relative z-10 flex items-center gap-4">
            <motion.span
              className="text-5xl md:text-6xl"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
            >
              {country.flag}
            </motion.span>
            <div>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">{country.name}</h2>
              <p className="text-slate-400 text-sm md:text-base">Complete Study Visa Guide</p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <Tabs defaultValue="visa" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-900/80 border border-slate-800 rounded-xl h-12">
              <TabsTrigger value="visa" className="data-[state=active]:bg-emerald-500/15 data-[state=active]:text-emerald-400 rounded-lg text-xs md:text-sm">Visa</TabsTrigger>
              <TabsTrigger value="expenses" className="data-[state=active]:bg-emerald-500/15 data-[state=active]:text-emerald-400 rounded-lg text-xs md:text-sm">Expenses</TabsTrigger>
              <TabsTrigger value="requirements" className="data-[state=active]:bg-emerald-500/15 data-[state=active]:text-emerald-400 rounded-lg text-xs md:text-sm">Requirements</TabsTrigger>
              <TabsTrigger value="universities" className="data-[state=active]:bg-emerald-500/15 data-[state=active]:text-emerald-400 rounded-lg text-xs md:text-sm">Universities</TabsTrigger>
            </TabsList>

            <TabsContent value="visa" className="mt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { icon: DollarSign, label: 'Total Cost', value: country.visa.totalCost, color: 'text-emerald-400' },
                  { icon: Clock, label: 'Process Time', value: country.visa.processTime, color: 'text-teal-400' },
                  { icon: BookOpen, label: 'Intake & Deadline', value: country.visa.intake, color: 'text-cyan-400' },
                  { icon: Building2, label: 'University Fee', value: country.visa.universityFee, color: 'text-amber-400' },
                  { icon: DollarSign, label: 'Bank Statement', value: country.visa.bankStatement, color: 'text-purple-400' },
                ].map((item, i) => (
                  item.value ? (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                      <item.icon className={`w-4 h-4 ${item.color} shrink-0 mt-0.5`} />
                      <div>
                        <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-0.5">{item.label}</p>
                        <p className="text-slate-200 text-sm font-medium">{item.value}</p>
                      </div>
                    </div>
                  ) : null
                ))}
              </div>
              {country.visa.otherDetails && (
                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                  <p className="text-emerald-400 text-xs font-semibold mb-1">Important Note</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{country.visa.otherDetails}</p>
                </div>
              )}
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-2">Document Requirements</p>
                <p className="text-slate-300 text-sm leading-relaxed">{country.visa.requirements}</p>
              </div>
            </TabsContent>

            <TabsContent value="expenses" className="mt-6 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: 'Application Fee', value: country.expenses.applicationFee },
                  { label: 'Visa Fee', value: country.expenses.visaFee },
                  { label: 'Travel Insurance', value: country.expenses.travelInsurance },
                  { label: 'Airline Ticket', value: country.expenses.ticket },
                  { label: 'Living Expenses', value: country.expenses.livingExpenses },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                    <span className="text-slate-400 text-sm">{item.label}</span>
                    <span className="text-emerald-400 font-semibold text-sm">{item.value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="requirements" className="mt-6 space-y-5">
              {[
                { title: 'Undergraduate (UG)', data: country.ug, color: 'text-emerald-400' },
                { title: 'Postgraduate (PG)', data: country.pg, color: 'text-teal-400' },
              ].map((section, si) => (
                <div key={si} className="p-5 rounded-xl bg-slate-900/50 border border-slate-800">
                  <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                    <GraduationCap className={`w-4 h-4 ${section.color}`} />
                    {section.title} Requirements
                  </h4>
                  <div className="space-y-3">
                    {[
                      { label: 'Percentage', value: section.data.percentage },
                      { label: 'IELTS', value: section.data.ielts },
                      { label: 'Gap Policy', value: section.data.gap },
                      { label: 'Tuition', value: section.data.tuition },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className={`w-4 h-4 ${section.color} shrink-0 mt-0.5`} />
                        <div>
                          <span className="text-slate-500 text-[10px] uppercase tracking-widest">{item.label}: </span>
                          <span className="text-slate-200 text-sm">{item.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {0 === 1 && <Separator className="bg-slate-800" />}
            </TabsContent>

            <TabsContent value="universities" className="mt-6 space-y-3">
              {country.universities.map((uni, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/20 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h5 className="text-white font-semibold text-sm mb-0.5">{uni.name}</h5>
                      <p className="text-slate-500 text-xs">{uni.majors}</p>
                    </div>
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/15 whitespace-nowrap text-[10px] shrink-0">
                      {uni.fee}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ─── Countries Section ─── */
function CountriesSection() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'budget' | 'mid' | 'premium'>('all');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const handleCardClick = useCallback((country: Country) => {
    setSelectedCountry(country);
    setDialogOpen(true);
  }, []);

  const filteredCountries = countries.filter((c) => {
    const match = c.visa.totalCost.match(/(\d+)/);
    const cost = match ? parseInt(match[1]) : 0;
    if (filter === 'budget') return cost <= 15;
    if (filter === 'mid') return cost > 15 && cost <= 45;
    if (filter === 'premium') return cost > 45;
    return true;
  });

  return (
    <section id="countries" ref={ref} className="relative py-24 bg-[#0a1628]">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-emerald-500/3 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 left-0 w-[400px] h-[400px] bg-teal-500/3 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Globe className="w-3 h-3" /> Study Destinations
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Choose Your <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Dream Country</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-lg mx-auto">
            Explore visa details, costs, and university options for 10+ countries.
          </p>
        </motion.div>

        {/* Budget filter tabs */}
        <motion.div
          className="flex items-center justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            { key: 'all' as const, label: 'All Countries' },
            { key: 'budget' as const, label: 'Budget (≤15 Lac)' },
            { key: 'mid' as const, label: 'Mid Range' },
            { key: 'premium' as const, label: 'Premium (45+ Lac)' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                filter === tab.key
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-900/50 text-slate-400 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredCountries.map((country, i) => (
              <CountryCard
                key={country.name}
                country={country}
                index={i}
                onClick={() => handleCardClick(country)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredCountries.length === 0 && (
          <div className="text-center py-12 text-slate-500">No countries found for this filter.</div>
        )}
      </div>

      <CountryDetailDialog
        country={selectedCountry}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </section>
  );
}

/* ─── Cost Comparison Section ─── */
function CostComparison() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const sortedByCost = [...countries].sort((a, b) => {
    const getMinCost = (c: Country) => {
      const match = c.visa.totalCost.match(/(\d+)/);
      return match ? parseInt(match[1]) : 0;
    };
    return getMinCost(a) - getMinCost(b);
  });

  const maxCost = 65;

  return (
    <section ref={ref} className="relative py-24 bg-[#060d1b]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Wallet className="w-3 h-3" /> Cost Comparison
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Find Your <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Budget Fit</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-lg mx-auto">From 6 Lac to 65 Lac — there&apos;s a destination for every budget.</p>
        </motion.div>

        <div className="space-y-3">
          {sortedByCost.map((country, i) => {
            const match = country.visa.totalCost.match(/(\d+)/);
            const cost = match ? parseInt(match[1]) : 0;
            const percentage = (cost / maxCost) * 100;

            return (
              <motion.div
                key={country.name}
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group flex items-center gap-3 md:gap-4"
              >
                <span className="text-2xl w-8 text-center shrink-0">{country.flag}</span>
                <span className="text-white font-semibold w-20 md:w-28 text-xs md:text-sm shrink-0">{country.name}</span>
                <div className="flex-1 h-9 bg-slate-900/60 rounded-xl overflow-hidden relative border border-slate-800 group-hover:border-emerald-500/20 transition-all duration-300">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${country.gradient} rounded-xl flex items-center px-3 md:px-4`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${Math.max(percentage, 12)}%` } : { width: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <span className="text-white text-[10px] md:text-xs font-bold whitespace-nowrap drop-shadow-lg">
                      {country.visa.totalCost}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Why Choose Us — Bento Grid ─── */
function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const features = [
    {
      icon: Shield, title: 'Trusted & Verified',
      description: 'Fully registered consultancy with transparent processes. No hidden fees, no false promises.',
      color: 'from-emerald-500 to-teal-500', span: 'md:col-span-2'
    },
    {
      icon: Headphones, title: '24/7 Support',
      description: 'Dedicated support from application to visa approval and beyond.',
      color: 'from-teal-500 to-cyan-500', span: ''
    },
    {
      icon: Languages, title: 'No IELTS Required',
      description: 'Most partner universities accept MOI (Medium of Instruction) instead of IELTS.',
      color: 'from-cyan-500 to-blue-500', span: ''
    },
    {
      icon: Wallet, title: 'Affordable Options',
      description: 'From budget-friendly Turkey & Serbia to premium Germany — options for every budget.',
      color: 'from-amber-500 to-orange-500', span: ''
    },
    {
      icon: Award, title: 'Scholarship Assistance',
      description: 'Fully funded scholarships in Italy, fee waivers in Turkey & France, and more.',
      color: 'from-purple-500 to-pink-500', span: ''
    },
    {
      icon: Plane, title: 'End-to-End Service',
      description: 'Document prep → university application → visa filing → travel arrangements. We handle it all.',
      color: 'from-rose-500 to-red-500', span: 'md:col-span-2'
    },
  ];

  return (
    <section ref={ref} className="relative py-24 bg-[#0a1628]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Star className="w-3 h-3" /> Why Sky Consultants KP
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Why Students <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Trust Us</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`group ${feature.span}`}
            >
              <Card className="bg-slate-900/40 border-slate-800 hover:border-emerald-500/20 transition-all duration-500 h-full overflow-hidden rounded-2xl">
                <CardContent className="p-6 md:p-7">
                  <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-r ${feature.color} mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const testimonials = [
    { name: 'Ahmed Khan', country: 'Italy', flag: '🇮🇹', text: 'Sky Consultants made my dream of studying in Italy come true! Got a fully funded scholarship with their help. Amazing service!' },
    { name: 'Fatima Zahra', country: 'Turkey', flag: '🇹🇷', text: 'No IELTS was required and the whole process was so smooth. I got admission within 3 months. Highly recommended!' },
    { name: 'Usman Ali', country: 'Germany', flag: '🇩🇪', text: 'Free tuition in Germany! The team handled all my documents and visa process. Now I\'m studying engineering in Munich.' },
    { name: 'Ayesha Bibi', country: 'UK', flag: '🇬🇧', text: 'From KPK to London! The counselors were supportive throughout. They even helped with my accommodation.' },
    { name: 'Bilal Shah', country: 'Serbia', flag: '🇷🇸', text: 'Most affordable option! Only 10 Lac total cost and now I\'m studying medicine in Belgrade. Best decision ever.' },
    { name: 'Sana Gul', country: 'South Korea', flag: '🇰🇷', text: 'The scholarship in Korea covers everything — tuition, accommodation, and even a stipend. Thank you Sky Consultants!' },
  ];

  return (
    <section ref={ref} className="relative py-24 bg-[#060d1b] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Users className="w-3 h-3" /> Student Stories
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Hear From <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Our Students</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group"
            >
              <div className="h-full p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-emerald-500/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center text-lg">
                    {t.flag}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.name}</p>
                    <p className="text-emerald-400 text-xs">Studying in {t.country}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Section ─── */
function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative py-24 bg-[#0a1628] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 via-transparent to-teal-600/10" />
        <motion.div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-emerald-500/5"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-teal-500/5"
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 mb-8 shadow-xl shadow-emerald-500/20"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <GraduationCap className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 tracking-tight">
            Ready to Study Abroad?
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto">
            Take the first step towards your international education. Our expert counselors are ready to guide you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/923075977094"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold text-base shadow-xl shadow-green-500/20 hover:shadow-green-500/40 hover:scale-105 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us Now
            </a>
            <a
              href="tel:03075977094"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-slate-800 text-white font-semibold text-base border border-slate-700 hover:border-emerald-500/40 hover:bg-slate-700/80 transition-all duration-300"
            >
              <Phone className="w-5 h-5 text-emerald-400" />
              Call: 0307 5977094
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Contact & Footer ─── */
function ContactFooter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <footer id="contact" ref={ref} className="relative bg-[#040a15] border-t border-slate-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Phone */}
          <motion.a
            href="tel:03075977094"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group flex items-center gap-4 p-5 rounded-2xl bg-slate-900/30 border border-slate-800 hover:border-emerald-500/30 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">
              <Phone className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="min-w-0">
              <p className="text-slate-500 text-xs uppercase tracking-wider">Call / WhatsApp</p>
              <p className="text-white text-sm font-semibold truncate">0307 5977094</p>
            </div>
          </motion.a>
          {/* Email */}
          <motion.a
            href="mailto:skyconsultantskp@gmail.com"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group flex items-center gap-4 p-5 rounded-2xl bg-slate-900/30 border border-slate-800 hover:border-teal-500/30 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center shrink-0 group-hover:bg-teal-500/20 transition-colors">
              <Mail className="w-5 h-5 text-teal-400" />
            </div>
            <div className="min-w-0">
              <p className="text-slate-500 text-xs uppercase tracking-wider">Email</p>
              <p className="text-white text-sm font-semibold truncate">skyconsultantskp@gmail.com</p>
            </div>
          </motion.a>
          {/* Location */}
          <motion.a
            href="https://share.google/FwOt9nAEN2UWzM243"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group flex items-center gap-4 p-5 rounded-2xl bg-slate-900/30 border border-slate-800 hover:border-cyan-500/30 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 transition-colors">
              <MapPin className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="min-w-0">
              <p className="text-slate-500 text-xs uppercase tracking-wider">Live Location</p>
              <p className="text-white text-sm font-semibold truncate">View on Google Maps</p>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500 shrink-0 ml-auto" />
          </motion.a>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <Plane className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Sky Consultants KP</p>
                <p className="text-slate-600 text-[10px]">Your Gateway to World-Class Education</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs text-slate-500">
              <a href="tel:03075977094" className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
                <Phone className="w-3 h-3" /> 0307 5977094
              </a>
              <a href="mailto:skyconsultantskp@gmail.com" className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
                <Mail className="w-3 h-3" /> skyconsultantskp@gmail.com
              </a>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-slate-700 text-[10px]">&copy; {new Date().getFullYear()} Sky Consultants KP. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Sticky Navigation ─── */
function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Process', href: '#process' },
    { label: 'Countries', href: '#countries' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#060d1b]/90 backdrop-blur-xl border-b border-slate-800/50 shadow-2xl shadow-black/20' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-emerald-500/20 transition-shadow">
              <Plane className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-sm hidden sm:block tracking-tight">Sky Consultants KP</span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://wa.me/923075977094"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold shadow-lg shadow-emerald-500/15 hover:shadow-emerald-500/30 transition-shadow"
            >
              <Phone className="w-3.5 h-3.5" />
              Contact
            </a>
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#060d1b]/95 backdrop-blur-xl border-b border-slate-800"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-slate-300 hover:text-emerald-400 hover:bg-emerald-500/5 rounded-lg px-4 py-3 text-sm font-medium transition-all"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://wa.me/923075977094"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center mt-3 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold"
                onClick={() => setMenuOpen(false)}
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#060d1b]">
      <StickyNav />
      <main className="flex-1">
        <div id="home"><HeroSection /></div>
        <StatsSection />
        <div id="process"><HowItWorks /></div>
        <CountriesSection />
        <CostComparison />
        <WhyChooseUs />
        <Testimonials />
        <CTASection />
      </main>
      <ContactFooter />
    </div>
  );
}
