'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import {
  Globe, Plane, GraduationCap, Phone, Mail, MapPin, Download,
  ChevronDown, ChevronRight, Clock, DollarSign, Building2, BookOpen,
  Star, ArrowRight, FileText, ExternalLink, Menu, X, Users,
  Award, Shield, Headphones, CheckCircle2, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { countries, type Country } from '@/lib/countries';

/* ─── Particle Background ─── */
function ParticleBackground() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 4 + 4,
    delay: Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-emerald-400/30"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ─── 3D Globe ─── */
function Globe3D() {
  const dots = Array.from({ length: 40 }, (_, i) => {
    const phi = Math.acos(-1 + (2 * i) / 40);
    const theta = Math.sqrt(40 * Math.PI) * phi;
    const x = 80 * Math.cos(theta) * Math.sin(phi);
    const y = 80 * Math.sin(theta) * Math.sin(phi);
    const z = 80 * Math.cos(phi);
    return { id: i, x, y, z };
  });

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 animate-spin-slow" style={{ transformStyle: 'preserve-3d' }}>
      {/* Globe rings */}
      <div className="absolute inset-0 rounded-full border border-emerald-400/20" />
      <div className="absolute inset-4 rounded-full border border-emerald-400/15" />
      <div className="absolute inset-8 rounded-full border border-emerald-400/10" />
      
      {/* Orbit rings */}
      <div className="absolute inset-0 rounded-full border border-emerald-400/15" style={{ transform: 'rotateX(60deg)' }} />
      <div className="absolute inset-0 rounded-full border border-emerald-400/15" style={{ transform: 'rotateX(-60deg)' }} />
      <div className="absolute inset-0 rounded-full border border-emerald-400/10" style={{ transform: 'rotateY(60deg)' }} />

      {/* Dots on globe surface */}
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate3d(${dot.x}px, ${dot.y}px, ${dot.z}px)`,
            opacity: dot.z > 0 ? 0.8 : 0.2,
          }}
        />
      ))}

      {/* Center glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/10 to-teal-500/5 blur-xl" />
    </div>
  );
}

/* ─── Floating Country Flags ─── */
function FloatingFlags() {
  const flags = countries.map((c, i) => ({
    flag: c.flag,
    delay: i * 0.5,
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 80,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {flags.map((f, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl md:text-3xl"
          style={{ left: `${f.x}%`, top: `${f.y}%` }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5 + i * 0.3,
            repeat: Infinity,
            delay: f.delay,
            ease: 'easeInOut',
          }}
        >
          {f.flag}
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Hero Section ─── */
function HeroSection() {
  const [currentCountry, setCurrentCountry] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCountry((prev) => (prev + 1) % countries.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950">
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <ParticleBackground />
        <FloatingFlags />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-8"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4" />
            Your Gateway to World-Class Education
            <Sparkles className="w-4 h-4" />
          </motion.div>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent animate-gradient-shift">
            Sky Consultants KP
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-slate-300 mb-4 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Your Trusted Partner for Study Abroad
        </motion.p>

        <motion.div
          className="h-8 mb-8 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCountry}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-semibold"
            >
              <span className="mr-2">{countries[currentCountry].flag}</span>
              <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                Study in {countries[currentCountry].name}
              </span>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-emerald-500/25 animate-pulse-glow"
            onClick={() => document.getElementById('countries')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Countries
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 px-8 py-6 text-lg rounded-full"
            onClick={() => window.open('/api/pdf', '_blank')}
          >
            <FileText className="mr-2 w-5 h-5" />
            Download PDF
          </Button>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className="relative max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-emerald-500/10 border border-emerald-500/20">
            <img
              src="/hero-image.png"
              alt="Sky Consultants KP - Study Abroad"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
          </div>
          {/* Floating badges around image */}
          <motion.div
            className="absolute -top-4 -right-4 md:top-4 md:-right-8 glass rounded-xl px-4 py-2 text-emerald-400 font-semibold text-sm"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            🌍 10+ Countries
          </motion.div>
          <motion.div
            className="absolute -bottom-4 -left-4 md:bottom-4 md:-left-8 glass rounded-xl px-4 py-2 text-teal-400 font-semibold text-sm"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            🎓 No IELTS Required
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-emerald-400/60" />
      </motion.div>
    </section>
  );
}

/* ─── Stats Section ─── */
function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { icon: Globe, value: '10+', label: 'Countries', color: 'text-emerald-400' },
    { icon: GraduationCap, value: '50+', label: 'Top Universities', color: 'text-teal-400' },
    { icon: Users, value: '1000+', label: 'Students Helped', color: 'text-cyan-400' },
    { icon: Award, value: '98%', label: 'Visa Success Rate', color: 'text-amber-400' },
  ];

  return (
    <section ref={ref} className="relative py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-800/50 border border-slate-700/50 mb-4 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-all duration-300">
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 3D Country Card ─── */
function CountryCard({ country, index, onClick }: { country: Country; index: number; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX((y - centerY) / 10);
    setRotateY((centerX - x) / 10);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
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
          className="preserve-3d relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700/50 hover:border-emerald-500/50 transition-colors duration-300"
          animate={{
            rotateX: rotateX,
            rotateY: rotateY,
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Gradient top bar */}
          <div className={`h-1.5 bg-gradient-to-r ${country.gradient}`} />
          
          <div className="p-6">
            {/* Country header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{country.flag}</span>
              <div>
                <h3 className="text-xl font-bold text-white">{country.name}</h3>
                <p className="text-slate-400 text-sm">Study Visa Available</p>
              </div>
            </div>

            {/* Key info */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-300">{country.visa.totalCost}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="text-slate-300">{country.visa.processTime}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-slate-300">{country.visa.intake}</span>
              </div>
            </div>

            {/* Quick badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs">
                No IELTS
              </Badge>
              <Badge variant="secondary" className="bg-teal-500/10 text-teal-400 border-teal-500/20 text-xs">
                Scholarships
              </Badge>
            </div>

            {/* CTA */}
            <div className="flex items-center text-emerald-400 text-sm font-medium group-hover:gap-3 transition-all">
              View Details
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Shine effect on hover */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                background: `radial-gradient(circle at ${50 + rotateY * 5}% ${50 - rotateX * 5}%, rgba(16, 185, 129, 0.1) 0%, transparent 60%)`,
              }}
            />
          )}
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar bg-slate-900 border-slate-700 text-white p-0">
        <DialogTitle className="sr-only">{country.name} Study Visa Details</DialogTitle>
        
        {/* Header */}
        <div className={`relative p-6 md:p-8 bg-gradient-to-br ${country.gradient} rounded-t-lg`}>
          <div className="absolute inset-0 bg-black/40 rounded-t-lg" />
          <div className="relative z-10 flex items-center gap-4">
            <span className="text-5xl md:text-6xl">{country.flag}</span>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">{country.name}</h2>
              <p className="text-white/80 text-lg">Study Visa Details</p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          {/* Tabs for organized content */}
          <Tabs defaultValue="visa" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800 border border-slate-700">
              <TabsTrigger value="visa" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">Visa</TabsTrigger>
              <TabsTrigger value="expenses" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">Expenses</TabsTrigger>
              <TabsTrigger value="requirements" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">Requirements</TabsTrigger>
              <TabsTrigger value="universities" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">Universities</TabsTrigger>
            </TabsList>

            <TabsContent value="visa" className="mt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: DollarSign, label: 'Total Cost', value: country.visa.totalCost, color: 'text-emerald-400' },
                  { icon: Clock, label: 'Process Time', value: country.visa.processTime, color: 'text-teal-400' },
                  { icon: BookOpen, label: 'Intake & Deadline', value: country.visa.intake, color: 'text-cyan-400' },
                  { icon: Building2, label: 'University Fee', value: country.visa.universityFee, color: 'text-amber-400' },
                  { icon: DollarSign, label: 'Bank Statement', value: country.visa.bankStatement, color: 'text-purple-400' },
                ].map((item, i) => (
                  item.value ? (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                      <item.icon className={`w-5 h-5 ${item.color} shrink-0 mt-0.5`} />
                      <div>
                        <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">{item.label}</p>
                        <p className="text-slate-200 text-sm font-medium">{item.value}</p>
                      </div>
                    </div>
                  ) : null
                ))}
              </div>
              {country.visa.otherDetails && (
                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                  <p className="text-emerald-400 text-sm font-medium mb-1">Important Note</p>
                  <p className="text-slate-300 text-sm">{country.visa.otherDetails}</p>
                </div>
              )}
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Requirements</p>
                <p className="text-slate-300 text-sm">{country.visa.requirements}</p>
              </div>
            </TabsContent>

            <TabsContent value="expenses" className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Application Fee', value: country.expenses.applicationFee },
                  { label: 'Visa Fee', value: country.expenses.visaFee },
                  { label: 'Travel Insurance', value: country.expenses.travelInsurance },
                  { label: 'Airline Ticket', value: country.expenses.ticket },
                  { label: 'Living Expenses', value: country.expenses.livingExpenses },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                    <span className="text-slate-400 text-sm">{item.label}</span>
                    <span className="text-emerald-400 font-semibold text-sm">{item.value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="requirements" className="mt-6 space-y-6">
              {/* UG Requirements */}
              <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-emerald-400" />
                  Undergraduate (UG) Requirements
                </h4>
                <div className="space-y-3">
                  {[
                    { label: 'Percentage Required', value: country.ug.percentage },
                    { label: 'IELTS', value: country.ug.ielts },
                    { label: 'Gap Policy', value: country.ug.gap },
                    { label: 'Tuition Fee', value: country.ug.tuition },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-400 text-xs uppercase tracking-wider">{item.label}: </span>
                        <span className="text-slate-200 text-sm">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="bg-slate-700" />

              {/* PG Requirements */}
              <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-teal-400" />
                  Postgraduate (PG) Requirements
                </h4>
                <div className="space-y-3">
                  {[
                    { label: 'Percentage Required', value: country.pg.percentage },
                    { label: 'IELTS', value: country.pg.ielts },
                    { label: 'Gap Policy', value: country.pg.gap },
                    { label: 'Tuition Fee', value: country.pg.tuition },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-400 text-xs uppercase tracking-wider">{item.label}: </span>
                        <span className="text-slate-200 text-sm">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="universities" className="mt-6 space-y-3">
              {country.universities.map((uni, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-emerald-500/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h5 className="text-white font-semibold text-sm mb-1">{uni.name}</h5>
                      <p className="text-slate-400 text-xs">{uni.majors}</p>
                    </div>
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 whitespace-nowrap text-xs">
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleCardClick = useCallback((country: Country) => {
    setSelectedCountry(country);
    setDialogOpen(true);
  }, []);

  return (
    <section id="countries" ref={ref} className="relative py-20 md:py-28 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 mb-4">
            <Globe className="w-3 h-3 mr-1" />
            Study Destinations
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Dream Country
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            We send students to top universities across 10+ countries. Explore each destination&apos;s visa details, costs, and requirements.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {countries.map((country, i) => (
            <CountryCard
              key={country.name}
              country={country}
              index={i}
              onClick={() => handleCardClick(country)}
            />
          ))}
        </div>
      </div>

      <CountryDetailDialog
        country={selectedCountry}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </section>
  );
}

/* ─── Why Choose Us ─── */
function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: Shield,
      title: 'Trusted & Verified',
      description: 'Fully registered and verified consultancy with transparent processes and no hidden fees.',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Dedicated support from application to visa approval. We are with you every step of the way.',
      color: 'from-teal-500 to-cyan-500',
    },
    {
      icon: GraduationCap,
      title: 'No IELTS Required',
      description: 'Most of our partner universities accept MOI (Medium of Instruction) instead of IELTS.',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: DollarSign,
      title: 'Affordable Options',
      description: 'From budget-friendly Serbia (10 Lac) to premium Germany (65 Lac) — we have options for everyone.',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: Award,
      title: 'Scholarship Assistance',
      description: 'Get help with fully funded scholarships in Italy, fee waivers in Turkey, and more.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Plane,
      title: 'End-to-End Service',
      description: 'From document preparation to visa filing, university selection to travel arrangements — we handle it all.',
      color: 'from-rose-500 to-red-500',
    },
  ];

  return (
    <section ref={ref} className="relative py-20 md:py-28 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 mb-4">
            <Star className="w-3 h-3 mr-1" />
            Why Sky Consultants KP
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Why Students{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Trust Us
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            We make your study abroad dream a reality with expert guidance and proven results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <Card className="bg-slate-800/50 border-slate-700/50 hover:border-emerald-500/30 transition-all duration-300 h-full overflow-hidden">
                <CardContent className="p-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
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

/* ─── Cost Comparison Section ─── */
function CostComparison() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const sortedByCost = [...countries].sort((a, b) => {
    const getMinCost = (c: Country) => {
      const match = c.visa.totalCost.match(/(\d+)/);
      return match ? parseInt(match[1]) : 0;
    };
    return getMinCost(a) - getMinCost(b);
  });

  const maxCost = 65;

  return (
    <section ref={ref} className="relative py-20 md:py-28 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 mb-4">
            <DollarSign className="w-3 h-3 mr-1" />
            Cost Comparison
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Compare{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Study Costs
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Find the best destination that fits your budget. Costs range from 6 Lac to 65 Lac PKR.
          </p>
        </motion.div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {sortedByCost.map((country, i) => {
            const match = country.visa.totalCost.match(/(\d+)/);
            const cost = match ? parseInt(match[1]) : 0;
            const percentage = (cost / maxCost) * 100;

            return (
              <motion.div
                key={country.name}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl w-8 text-center">{country.flag}</span>
                  <span className="text-white font-medium w-24 text-sm">{country.name}</span>
                  <div className="flex-1 h-10 bg-slate-800/50 rounded-lg overflow-hidden relative border border-slate-700/50 group-hover:border-emerald-500/30 transition-colors">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${country.gradient} rounded-lg flex items-center px-4`}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.08, ease: 'easeOut' }}
                    >
                      <span className="text-white text-xs font-semibold whitespace-nowrap drop-shadow-lg">
                        {country.visa.totalCost}
                      </span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── PDF Download Section ─── */
function PDFDownloadSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-20 md:py-28 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
          
          <div className="relative p-8 md:p-12 text-center">
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <FileText className="w-10 h-10 text-white" />
            </motion.div>
            
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Download Complete Visa Guide
            </h3>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Get detailed information about study visa requirements, costs, universities, and everything you need for all 10 countries.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-emerald-700 hover:bg-white/90 px-8 py-6 text-lg rounded-full font-semibold shadow-xl"
                onClick={() => window.open('/api/pdf', '_blank')}
              >
                <Download className="mr-2 w-5 h-5" />
                View / Download PDF
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full"
                onClick={() => {
                  const a = document.createElement('a');
                  a.href = '/api/pdf';
                  a.download = 'Study_Visa_Details_Sky_Consultants_KP.pdf';
                  a.click();
                }}
              >
                <ExternalLink className="mr-2 w-5 h-5" />
                Save to Device
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Contact & Footer ─── */
function ContactFooter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <footer ref={ref} className="relative bg-slate-950 border-t border-slate-800">
      {/* Contact CTA */}
      <div className="relative py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 mb-4">
              <Phone className="w-3 h-3 mr-1" />
              Get In Touch
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Start Your{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Journey Today
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Ready to study abroad? Contact us now and let us help you achieve your dreams.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            {/* Phone */}
            <motion.a
              href="tel:03075977094"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group flex flex-col items-center p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                <Phone className="w-6 h-6 text-emerald-400" />
              </div>
              <h4 className="text-white font-semibold mb-1">Call / WhatsApp</h4>
              <p className="text-emerald-400 font-medium">0307 5977094</p>
            </motion.a>

            {/* Email */}
            <motion.a
              href="mailto:skyconsultantskp@gmail.com"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group flex flex-col items-center p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-teal-500/50 hover:bg-teal-500/5 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-teal-500/10 flex items-center justify-center mb-4 group-hover:bg-teal-500/20 transition-colors">
                <Mail className="w-6 h-6 text-teal-400" />
              </div>
              <h4 className="text-white font-semibold mb-1">Email</h4>
              <p className="text-teal-400 font-medium text-sm">skyconsultantskp@gmail.com</p>
            </motion.a>

            {/* Location */}
            <motion.a
              href="https://share.google/FwOt9nAEN2UWzM243"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group flex flex-col items-center p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                <MapPin className="w-6 h-6 text-cyan-400" />
              </div>
              <h4 className="text-white font-semibold mb-1">Live Location</h4>
              <p className="text-cyan-400 font-medium text-sm flex items-center gap-1">
                View on Map <ExternalLink className="w-3 h-3" />
              </p>
            </motion.a>
          </div>

          {/* WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <a
              href="https://wa.me/923075977094"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold text-lg shadow-xl shadow-green-500/20 hover:shadow-green-500/40 hover:scale-105 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Chat on WhatsApp
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-bold">Sky Consultants KP</p>
                <p className="text-slate-500 text-xs">Your Gateway to World-Class Education</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-sm text-slate-400">
              <a href="tel:03075977094" className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
                <Phone className="w-3.5 h-3.5" />
                0307 5977094
              </a>
              <a href="mailto:skyconsultantskp@gmail.com" className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
                <Mail className="w-3.5 h-3.5" />
                skyconsultantskp@gmail.com
              </a>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-800/50 text-center">
            <p className="text-slate-500 text-xs">
              &copy; {new Date().getFullYear()} Sky Consultants KP. All rights reserved.
            </p>
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
    { label: 'Countries', href: '#countries' },
    { label: 'Download PDF', href: '#download' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/50 shadow-xl' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#home" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg hidden sm:block">Sky Consultants KP</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-300 hover:text-emerald-400 transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <Button
              size="sm"
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-full"
              onClick={() => window.open('https://wa.me/923075977094', '_blank')}
            >
              <Phone className="w-3.5 h-3.5 mr-1" />
              Contact Us
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-slate-300 hover:text-emerald-400 transition-colors py-2 text-sm font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button
                size="sm"
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full"
                onClick={() => {
                  window.open('https://wa.me/923075977094', '_blank');
                  setMenuOpen(false);
                }}
              >
                <Phone className="w-3.5 h-3.5 mr-1" />
                Contact Us
              </Button>
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
    <div className="min-h-screen flex flex-col bg-slate-950">
      <StickyNav />
      <main className="flex-1">
        <div id="home">
          <HeroSection />
        </div>
        <StatsSection />
        <div id="countries">
          <CountriesSection />
        </div>
        <CostComparison />
        <WhyChooseUs />
        <div id="download">
          <PDFDownloadSection />
        </div>
      </main>
      <div id="contact">
        <ContactFooter />
      </div>
    </div>
  );
}
