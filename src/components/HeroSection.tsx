"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { CLINIC_INFO } from "@/lib/content";

export default function HeroSection() {
  const { lang, t } = useLanguage();

  const whatsappMessage = encodeURIComponent(
    "Hello Sankalp Foundation, I want to book a physiotherapy consultation at your Bhupatipur clinic."
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/60 via-white to-slate-50 pt-8 pb-16 sm:pb-24 border-b border-slate-200">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-teal-100/40 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-sky-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content (7 Cols on desktop) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/80 border border-teal-200 text-teal-900 text-xs sm:text-sm font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>
              <span>{t("Trusted Medical Rehabilitation in Patna", "पटना का विश्वसनीय फिजियोथैरेपी केंद्र")}</span>
            </div>

            {/* Main Headings */}
            <div className="space-y-2">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <span className="text-teal-600 text-base">✦</span>
                <span className="font-hindi text-xl sm:text-2xl font-bold text-[#0a2540]">
                  संकल्प फाउंडेशन
                </span>
                <span className="text-teal-600 text-base">✦</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black text-[#0a2540] tracking-tight leading-[1.15]">
                {t(
                  "Professional Physiotherapy & Rehabilitation Care in Patna",
                  "पटना में पेशेवर फिजियोथैरेपी एवं रिहैबिलिटेशन सेंटर"
                )}
              </h1>
            </div>

            {/* Supporting Text */}
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t(
                "Personalized physiotherapy and rehabilitation programs designed to help you reduce pain, improve mobility and regain confidence in everyday movement.",
                "व्यक्तिगत फिजियोथैरेपी और पुनर्वास कार्यक्रम—जो जोड़ों के दर्द से राहत दिलाने, चलने-फिरने की क्षमता सुधारने और रोजमर्रा के जीवन में आत्मविश्वास लौटाने के लिए समर्पित हैं।"
              )}
            </p>

            {/* Clinic Promise Banner from Brochure */}
            <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200/80 max-w-xl mx-auto lg:mx-0 flex items-center gap-3 text-left">
              <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-amber-950 font-hindi">
                  {CLINIC_INFO.taglineHi}
                </p>
                <p className="text-[11px] text-amber-800 font-medium">
                  {CLINIC_INFO.taglineEn}
                </p>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              {/* Primary CTA */}
              <Link
                href="/book"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm sm:text-base tracking-wide uppercase shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5"
              >
                <Calendar className="w-5 h-5" />
                <span>{t("BOOK AN APPOINTMENT", "अपॉइंटमेंट बुक करें")}</span>
              </Link>

              {/* Secondary CTA */}
              <a
                href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-2 border-emerald-300 font-bold text-sm sm:text-base tracking-wide uppercase transition-all flex items-center justify-center gap-2.5"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <span>{t("WHATSAPP US", "व्हाट्सएप करें")}</span>
              </a>
            </div>

            {/* Quick Contact & Address Snippet */}
            <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm text-slate-600">
              <a
                href={`tel:${CLINIC_INFO.phone1}`}
                className="flex items-center gap-2 hover:text-teal-700 font-semibold text-slate-800"
              >
                <Phone className="w-4 h-4 text-teal-600" />
                <span>{CLINIC_INFO.phone1Display}</span>
              </a>

              <a
                href={`tel:${CLINIC_INFO.phone2}`}
                className="hidden sm:flex items-center gap-2 hover:text-teal-700 font-semibold text-slate-800"
              >
                <Phone className="w-4 h-4 text-teal-600" />
                <span>{CLINIC_INFO.phone2Display}</span>
              </a>

              <div className="flex items-center gap-1.5 text-slate-700">
                <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>{t(CLINIC_INFO.locationShortEn, CLINIC_INFO.locationShortHi)}</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual (5 Cols on desktop) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Professional Photo Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-[4/5] sm:aspect-[4/4.5]">
                <Image
                  src="/images/hero-rehab.jpg"
                  alt="Professional physiotherapist assisting patient with mobility rehabilitation"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/80 via-transparent to-transparent" />

                {/* Overlay Badge at bottom of image */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-black uppercase text-teal-700 tracking-wider block">
                      {t("Clinic Timing", "क्लिनिक समय")}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#0a2540]">
                      {t("8 AM – 1 PM & 4 PM – 8 PM", "सुबह 8 से 1 | शाम 4 से 8")}
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      {t("Shakuntala Niwas, Bhupatipur Patna", "शकुंतला निवास, भूपतिपुर पटना")}
                    </span>
                  </div>

                  <Link
                    href="/book"
                    className="p-2.5 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition-colors shadow"
                  >
                    <Calendar className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              {/* Floating Rosette ₹50 Badge */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-gradient-to-br from-amber-400 to-amber-500 text-[#0a2540] p-3 sm:p-4 rounded-2xl shadow-xl border-2 border-white transform -rotate-3 hover:rotate-0 transition-transform">
                <span className="block text-[10px] sm:text-xs font-black uppercase tracking-wider">
                  {t("Special Service", "विशेष सेवा")}
                </span>
                <span className="text-2xl sm:text-3xl font-black tracking-tight leading-none">
                  ₹50/-
                </span>
                <span className="block text-[9px] font-bold text-amber-950 mt-0.5">
                  {t("Affordable Care", "सुलभ परामर्श")}
                </span>
              </div>

              {/* Floating Verified Badge */}
              <div className="hidden sm:flex absolute -bottom-4 -right-4 bg-white p-3.5 rounded-2xl shadow-xl border border-slate-100 items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    {t("Safe Healthcare", "प्रमाणित स्वास्थ्य सेवा")}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {t("Senior Patient Friendly", "वरिष्ठ नागरिकों हेतु सुलभ")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
