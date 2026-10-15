"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { FAQS_DATA } from "@/lib/content";

export default function FaqSection() {
  const { lang, t } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
            <span>{t("Patient Inquiries", "मरीजों के सामान्य प्रश्न")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a2540] tracking-tight">
            {t("Frequently Asked Questions", "अक्सर पूछे जाने वाले सवाल (FAQs)")}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base mt-2">
            {t(
              "Clear answers about our physiotherapy therapies, appointment procedures, timings, and Patna clinic location.",
              "फिजियोथैरेपी प्रक्रिया, अपॉइंटमेंट, क्लिनिक समय और स्थान से संबंधित स्पष्ट जानकारी।"
            )}
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#0a2540] hover:text-teal-700 transition-colors"
                >
                  <span>{lang === "hi" ? faq.qHi : faq.qEn}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-teal-600 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    <p>{lang === "hi" ? faq.aHi : faq.aEn}</p>
                    <p className="mt-2 text-xs text-slate-400 italic">
                      {lang === "hi" ? faq.aEn : faq.aHi}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
