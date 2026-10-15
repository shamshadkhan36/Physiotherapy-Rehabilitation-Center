"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Eye, Download, ShieldCheck, X, Sparkles } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { CLINIC_INFO } from "@/lib/content";

export default function BrochurePreviewSection() {
  const { lang, t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="py-16 sm:py-20 bg-slate-100/70 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Brochure Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                onClick={() => setModalOpen(true)}
                className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-xl border-4 border-white max-w-xs transition-transform hover:scale-[1.02]"
              >
                <div className="relative aspect-[768/1376] w-64 sm:w-72 bg-slate-200">
                  <Image
                    src="/images/brochure.jpg"
                    alt="Official Sankalp Foundation Patna Brochure"
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white p-4">
                    <Eye className="w-8 h-8 text-white" />
                    <span className="text-xs font-bold uppercase tracking-wider text-center">
                      {t("Click to View Full Brochure", "पूरा ब्रोशर देखने के लिए क्लिक करें")}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-[#0a2540] text-center text-white">
                  <span className="text-xs font-bold flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t("Official Clinic Leaflet", "आधिकारिक क्लिनिक विवरणिका")}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Information */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                <span>{t("Verified Clinic Identity", "सत्यापित स्थानीय क्लिनिक")}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0a2540]">
                {t(
                  "Sankalp Foundation's Dedicated Pledge for Patna",
                  "संकल्प फाउंडेशन का पटना के लिए सेवा संकल्प"
                )}
              </h3>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80">
                <p className="text-base sm:text-lg font-bold text-amber-950 font-hindi">
                  "{CLINIC_INFO.taglineHi}"
                </p>
                <p className="text-xs text-amber-800 mt-1 font-medium">
                  "{CLINIC_INFO.taglineEn}"
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {t(
                  "Our center was established with a singular mission: to bring authentic, high-quality physiotherapy care to patients in Bhupatipur, Mithapur, Sipara, and across Patna at genuinely accessible rates, starting at just ₹50.",
                  "हमारे केंद्र की स्थापना एक स्पष्ट उद्देश्य के साथ हुई है: भूपतिपुर, मीठापुर, सिपारा और पूरे पटना के मरीजों को मात्र ₹50 से शुरू होने वाली सुलभ व प्रामाणिक फिजियोथैरेपी सेवाएं उपलब्ध कराना।"
                )}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700 pt-2">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="font-bold text-[#0a2540] block">{t("Official Location", "आधिकारिक पता")}</span>
                  <p className="text-xs text-slate-600 mt-0.5">{CLINIC_INFO.locationShortEn}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="font-bold text-[#0a2540] block">{t("Direct Helplines", "हेल्पलाइन नंबर")}</span>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {CLINIC_INFO.phone1Display} / {CLINIC_INFO.phone2Display}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-[#0a2540] hover:bg-[#07192d] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all"
                >
                  <Eye className="w-4 h-4 text-teal-300" />
                  <span>{t("Enlarge Official Brochure", "मूल ब्रोशर बड़ा करके देखें")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brochure Zoom Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full max-h-[95vh] overflow-y-auto bg-white rounded-2xl p-2 sm:p-4 shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[768/1376] w-full rounded-xl overflow-hidden shadow-inner">
              <Image
                src="/images/brochure.jpg"
                alt="Sankalp Foundation Brochure Zoom"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
