"use client";

import React from "react";
import Link from "next/link";
import { Star, Quote, MessageSquare, Calendar } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { PATIENT_REVIEWS } from "@/lib/content";

export default function ReviewsSection() {
  const { lang, t } = useLanguage();

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
            <span>{t("Patient Perspectives", "मरीजों के अनुभव")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a2540] tracking-tight">
            {t("What Our Patients Say", "हमारे मरीजों के विचार")}
          </h2>

          <p className="text-slate-600 text-base sm:text-lg mt-3">
            {t(
              "Real recovery experiences from patients who visited Sankalp Foundation Patna for pain relief and rehabilitation.",
              "संकल्प फाउंडेशन पटना में फिजियोथैरेपी लेने वाले मरीजों के अनुभव एवं फीडबैक।"
            )}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PATIENT_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-card hover:border-teal-300 transition-all flex flex-col justify-between relative"
            >
              <div>
                <Quote className="w-8 h-8 text-teal-300 mb-3" />

                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic">
                  "{lang === "hi" ? rev.commentHi : rev.commentEn}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/80">
                <h4 className="font-bold text-[#0a2540] text-sm sm:text-base">{rev.name}</h4>
                <p className="text-xs text-teal-700 font-semibold">{rev.location}</p>
                <div className="mt-1 inline-block px-2 py-0.5 rounded bg-teal-100/70 text-teal-900 text-[11px] font-medium">
                  {lang === "hi" ? rev.treatmentHi : rev.treatmentEn}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Developer Transparency Notice */}
        <div className="mt-10 p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-center max-w-xl mx-auto">
          <p className="text-[11px] text-slate-500">
            {t(
              "Note: Testimonial placeholders reflect feedback structures collected post-therapy. The clinic can update them with real verified reviews.",
              "नोट: समीक्षा संरचना थेरेपी उपरांत मरीज फीडबैक पर आधारित है। क्लिनिक द्वारा सत्यापित मरीजों की समीक्षाएं जोड़ी जा सकती हैं।"
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
