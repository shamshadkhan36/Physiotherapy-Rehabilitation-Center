"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Stethoscope, FileText, Activity, ArrowRight } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { HOW_IT_WORKS_STEPS } from "@/lib/content";

const STEP_ICONS = [Calendar, Stethoscope, FileText, Activity];

export default function HowItWorksSection() {
  const { lang, t } = useLanguage();

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100/70 px-3 py-1 rounded-full border border-teal-200">
            {t("Streamlined Patient Journey", "उपचार की सरल प्रक्रिया")}
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a2540] tracking-tight mt-3">
            {t("How It Works: 4 Simple Steps", "कैसे काम करता है: 4 आसान चरण")}
          </h2>

          <p className="text-slate-600 text-base sm:text-lg mt-3">
            {t(
              "From booking to complete physical restoration, our structured approach ensures clarity, comfort, and clinical safety at every stage.",
              "अपॉइंटमेंट बुकिंग से लेकर पूर्ण रिकवरी तक, हमारी प्रक्रिया हर स्तर पर स्पष्टता, सुविधा और चिकित्सीय सुरक्षा सुनिश्चित करती है।"
            )}
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {HOW_IT_WORKS_STEPS.map((s, idx) => {
            const Icon = STEP_ICONS[idx] || Calendar;

            return (
              <div
                key={s.step}
                className="bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-teal-300 shadow-sm hover:shadow-card transition-all relative flex flex-col justify-between"
              >
                <div>
                  {/* Step Number Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-full bg-[#0a2540] text-white flex items-center justify-center font-black text-sm shadow">
                      0{s.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-teal-100/80 text-teal-700 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[#0a2540] mb-1">
                    {lang === "hi" ? s.titleHi : s.titleEn}
                  </h3>

                  <p className="text-xs text-teal-700 font-hindi mb-2.5">
                    {lang === "hi" ? s.titleEn : s.titleHi}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {t(s.descEn, s.descHi)}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center text-xs font-semibold text-teal-700">
                  <span>{t(`Phase ${s.step} of Care`, `चरण ${s.step}`)}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Box */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0a2540] to-teal-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h4 className="text-lg sm:text-xl font-bold">
              {t("Ready to begin your journey to pain-free movement?", "क्या आप दर्द से मुक्त जीवन की शुरुआत के लिए तैयार हैं?")}
            </h4>
            <p className="text-xs sm:text-sm text-teal-200 mt-1">
              {t("Same-day appointment slots available in Patna.", "पटना क्लिनिक में आज ही का अपॉइंटमेंट स्लॉट उपलब्ध है।")}
            </p>
          </div>

          <Link
            href="/book"
            className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#0a2540] font-black text-sm uppercase tracking-wide flex items-center gap-2 flex-shrink-0 shadow-md transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>{t("Book Your Session Now", "अभी अपना सत्र बुक करें")}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
