"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ChevronRight, Calendar, ArrowRight } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { SERVICES_DATA } from "@/lib/content";

export default function ServicesSection({ limit }: { limit?: number }) {
  const { lang, t } = useLanguage();

  const services = limit ? SERVICES_DATA.slice(0, limit) : SERVICES_DATA;

  return (
    <section id="services" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100/70 px-3 py-1 rounded-full border border-teal-200">
            {t("Comprehensive Care Portfolio", "संपूर्ण पुनर्वास सेवाएं")}
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a2540] tracking-tight mt-3">
            {t("Physiotherapy & Rehabilitation Services", "फिजियोथैरेपी एवं रिहैबिलिटेशन सेवाएं")}
          </h2>

          <p className="text-slate-600 text-base sm:text-lg mt-3">
            {t(
              "Modern physical therapies, manual techniques, and recovery equipment tailored to restore natural movement and pain-free living.",
              "आधुनिक मशीनों और हाथों से की जाने वाली मैनुअल थेरेपी द्वारा शारीरिक गतिशीलता और दर्द-मुक्त जीवन की पुनर्स्थापना।"
            )}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-card border border-slate-200 hover:border-teal-300 transition-all flex flex-col group"
            >
              {/* Service Image */}
              <div className="relative h-48 w-full bg-slate-200 overflow-hidden">
                <Image
                  src={svc.image}
                  alt={svc.titleEn}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-white text-xs font-bold px-2.5 py-1 rounded bg-[#0a2540]/80 backdrop-blur-sm border border-white/20">
                  {lang === "hi" ? svc.titleHi : svc.titleEn}
                </span>
              </div>

              {/* Service Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#0a2540] group-hover:text-teal-700 transition-colors">
                    {lang === "hi" ? svc.titleHi : svc.titleEn}
                  </h3>
                  <p className="text-xs font-semibold text-teal-700 mt-0.5 font-hindi">
                    {lang === "hi" ? svc.titleEn : svc.titleHi}
                  </p>

                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                    {t(svc.shortDescEn, svc.shortDescHi)}
                  </p>

                  {/* Highlights checklist */}
                  <div className="mt-4 space-y-2">
                    {(lang === "hi" ? svc.benefitsHi : svc.benefitsEn).slice(0, 3).map((b, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/services#${svc.id}`}
                    className="text-xs font-bold text-slate-700 hover:text-teal-700 flex items-center gap-1 group-hover:underline"
                  >
                    <span>{t("Full Details", "विस्तृत विवरण")}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-teal-600" />
                  </Link>

                  <Link
                    href={`/book?service=${svc.id}`}
                    className="px-3.5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{t("Book Session", "सत्र बुक करें")}</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {limit && (
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0a2540] hover:bg-[#07192d] text-white font-bold text-sm shadow-md transition-all"
            >
              <span>{t("Explore All 8 Specialized Services", "सभी 8 विशेष सेवाएं देखें")}</span>
              <ArrowRight className="w-4 h-4 text-teal-300" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
