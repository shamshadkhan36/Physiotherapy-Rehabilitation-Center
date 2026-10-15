"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  CheckCircle2,
  Stethoscope,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import FloatingActions from "@/components/FloatingActions";
import { LanguageProvider, useLanguage } from "@/components/LanguageContext";
import { SERVICES_DATA, CLINIC_INFO } from "@/lib/content";

function ServicesContent() {
  const { lang, t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      <Navbar />

      <main className="flex-1">
        {/* Services Banner */}
        <div className="bg-[#0a2540] text-white py-16 sm:py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-300 bg-teal-900/60 px-3.5 py-1.5 rounded-full border border-teal-700">
              {t("Specialized Clinical Treatments", "विशेषज्ञ फिजियोथैरेपी सेवाएं")}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-4">
              {t("Physiotherapy & Rehabilitation Services", "फिजियोथैरेपी एवं रिहैबिलिटेशन सेवाएं")}
            </h1>
            <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
              {t(
                "Scientific, individualized physical therapy treatments in Bhupatipur, Patna for acute pain, chronic arthritis, sports injuries, and neurological recovery.",
                "पटना के भूपतिपुर में जोड़ों के दर्द, पुरानी गठिया, स्ट्रोक और ऑपरेशन के बाद के लिए वैज्ञानिक एवं कस्टमाइज्ड फिजियोथैरेपी।"
              )}
            </p>
          </div>
        </div>

        {/* Detailed Services Listing */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {SERVICES_DATA.map((svc, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={svc.id}
                  id={svc.id}
                  className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm scroll-mt-24 transition-all hover:border-teal-300"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${isEven ? "" : "lg:grid-flow-dense"}`}>
                    {/* Visual */}
                    <div className={`lg:col-span-5 ${isEven ? "" : "lg:col-start-8"}`}>
                      <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3] bg-slate-200 border-2 border-white">
                        <Image
                          src={svc.image}
                          alt={svc.titleEn}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 500px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                        <span className="absolute bottom-3 left-3 text-white text-xs font-bold px-3 py-1 rounded bg-[#0a2540]/80 backdrop-blur-sm border border-white/20">
                          {lang === "hi" ? svc.titleHi : svc.titleEn}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`lg:col-span-7 ${isEven ? "" : "lg:col-start-1"}`}>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100/70 text-teal-800 text-xs font-bold uppercase tracking-wider mb-2">
                        <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
                        <span>{t("Clinical Protocol", "क्लिनिकल थेरेपी")}</span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a2540]">
                        {lang === "hi" ? svc.titleHi : svc.titleEn}
                      </h2>
                      <p className="text-xs font-bold text-teal-700 font-hindi mt-0.5">
                        {lang === "hi" ? svc.titleEn : svc.titleHi}
                      </p>

                      <p className="text-sm sm:text-base text-slate-700 mt-4 leading-relaxed">
                        {t(svc.fullDescEn, svc.fullDescHi)}
                      </p>

                      {/* Benefits & Suitable For Columns */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-200">
                        <div>
                          <h3 className="text-xs font-black uppercase text-teal-900 tracking-wider mb-2">
                            {t("Key Clinical Benefits", "प्रमुख चिकित्सीय लाभ")}
                          </h3>
                          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                            {(lang === "hi" ? svc.benefitsHi : svc.benefitsEn).map((b, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-xs font-black uppercase text-indigo-900 tracking-wider mb-2">
                            {t("Recommended For", "किनके लिए उपयुक्त")}
                          </h3>
                          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                            {(lang === "hi" ? svc.suitableForHi : svc.suitableForEn).map((s, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 flex-shrink-0 mt-2" />
                                <span>{s}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* CTA Buttons */}
                      <div className="mt-8 pt-4 flex flex-wrap items-center gap-3">
                        <Link
                          href={`/book?service=${svc.id}`}
                          className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all"
                        >
                          <Calendar className="w-4 h-4" />
                          <span>{t("Book This Treatment", "यह थेरेपी बुक करें")}</span>
                        </Link>

                        <a
                          href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(
                            `Hello Sankalp Foundation, I want to inquire about ${svc.titleEn}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-3 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors"
                        >
                          <MessageCircle className="w-4 h-4 text-emerald-600" />
                          <span>{t("Ask on WhatsApp", "व्हाट्सएप पर पूछें")}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
      <MobileStickyBar />
      <FloatingActions />
    </div>
  );
}

export default function ServicesPage() {
  return (
    <LanguageProvider>
      <ServicesContent />
    </LanguageProvider>
  );
}
