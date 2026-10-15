"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ShieldAlert,
  Disc,
  Footprints,
  Zap,
  Compass,
  Layers,
  Hammer,
  Flame,
  Shield,
  RotateCw,
  ChevronRight,
  X,
  Stethoscope,
  Calendar,
} from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { CONDITIONS_DATA, ConditionItem } from "@/lib/content";

const ICON_MAP: Record<string, any> = {
  Activity,
  ShieldAlert,
  Disc,
  Footprints,
  Zap,
  Compass,
  Layers,
  Hammer,
  Flame,
  Shield,
  RotateCw,
};

export default function ConditionsSection({ limit }: { limit?: number }) {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedCondition, setSelectedCondition] = useState<ConditionItem | null>(null);

  const categories = [
    { id: "all", labelEn: "All Conditions", labelHi: "सभी समस्याएं" },
    { id: "spine", labelEn: "Spine & Neck", labelHi: "रीढ़ व गर्दन" },
    { id: "joint", labelEn: "Joints & Bones", labelHi: "जोड़ व हड्डियां" },
    { id: "neuro", labelEn: "Neuro & Paralysis", labelHi: "न्यूरो व लकवा" },
    { id: "muscle", labelEn: "Muscles & Tendons", labelHi: "मांसपेशियां" },
    { id: "rehab", labelEn: "Post-Surgical / Trauma", labelHi: "ऑपरेशन / फ्रेक्चर बाद" },
  ];

  let filtered =
    activeCategory === "all"
      ? CONDITIONS_DATA
      : CONDITIONS_DATA.filter((c) => c.category === activeCategory);

  if (limit) {
    filtered = filtered.slice(0, limit);
  }

  return (
    <section id="conditions" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
            <span>{t("Evidence-Based Clinical Rehabilitation", "प्रमाणित फिजियोथैरेपी उपचार")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a2540] tracking-tight">
            {t("Conditions We Treat", "प्रमुख समस्याएं जिनका हम उपचार करते हैं")}
          </h2>

          <p className="text-slate-600 text-base sm:text-lg mt-3">
            {t(
              "Personalized, goal-oriented physiotherapy programs for spine, joints, nerves, and recovery stiffness.",
              "रीढ़ की हड्डी, जोड़ों, नसों के दर्द और चोट के बाद की जकड़न के लिए वैज्ञानिक फिजियोथैरेपी।"
            )}
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#0a2540] text-white shadow-sm"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {t(cat.labelEn, cat.labelHi)}
              </button>
            ))}
          </div>
        </div>

        {/* Condition Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((item) => {
            const IconComponent = ICON_MAP[item.iconName] || Activity;

            return (
              <div
                key={item.id}
                className="group bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-teal-300 shadow-sm hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-teal-100/70 text-teal-700 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white transition-all">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-[#0a2540] group-hover:text-teal-700 transition-colors">
                    {lang === "hi" ? item.nameHi : item.nameEn}
                  </h3>

                  <p className="text-xs text-slate-500 font-hindi mt-0.5">
                    {lang === "hi" ? item.nameEn : item.nameHi}
                  </p>

                  <p className="text-sm text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                    {t(item.shortDescEn, item.shortDescHi)}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setSelectedCondition(item)}
                    className="text-teal-700 hover:text-teal-900 flex items-center gap-1 group-hover:underline"
                  >
                    <span>{t("Learn More", "विस्तार से जानें")}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <Link
                    href={`/book?treatment=${item.id}`}
                    className="px-2.5 py-1 rounded-md bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-colors"
                  >
                    {t("Book", "बुक करें")}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {limit && (
          <div className="text-center mt-12">
            <Link
              href="/conditions"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-teal-600 text-teal-800 hover:bg-teal-50 font-bold text-sm transition-all"
            >
              <span>{t("View All 16 Conditions & Treatment Plans →", "सभी 16 बीमारियों की सूची देखें →")}</span>
            </Link>
          </div>
        )}
      </div>

      {/* Condition Detail Modal */}
      {selectedCondition && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-4">
              <div>
                <span className="text-xs font-bold uppercase text-teal-700 tracking-wider">
                  {t("Condition & Rehabilitation Overview", "रोग व फिजियोथैरेपी विवरण")}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#0a2540]">
                  {lang === "hi" ? selectedCondition.nameHi : selectedCondition.nameEn}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCondition(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900 mb-1">
                  {t("Understanding This Condition", "समस्या का कारण व प्रभाव")}
                </h4>
                <p className="leading-relaxed">
                  {t(selectedCondition.fullDescEn, selectedCondition.fullDescHi)}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">
                  {t("Common Symptoms Observed", "प्रमुख लक्षण")}
                </h4>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  {(lang === "hi" ? selectedCondition.symptomsHi : selectedCondition.symptomsEn).map(
                    (sym, idx) => (
                      <li key={idx}>{sym}</li>
                    )
                  )}
                </ul>
              </div>

              <div className="bg-teal-50/70 p-4 rounded-xl border border-teal-200">
                <h4 className="font-bold text-teal-900 mb-1 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-teal-600" />
                  <span>{t("Our Physiotherapy Protocol", "हमारी फिजियोथैरेपी पद्धति")}</span>
                </h4>
                <p className="text-teal-950 text-xs sm:text-sm leading-relaxed">
                  {t(selectedCondition.rehabApproachEn, selectedCondition.rehabApproachHi)}
                </p>
              </div>

              <div className="text-[11px] text-slate-400 italic">
                {t(
                  "Note: Individual treatment plans vary based on physical examination and doctor reports.",
                  "नोट: प्रत्येक मरीज की थेरेपी योजना जांच और रिपोर्ट के आधार पर तय की जाती है।"
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 mt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedCondition(null)}
                className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-semibold text-xs"
              >
                {t("Close", "बंद करें")}
              </button>

              <Link
                href={`/book?treatment=${selectedCondition.id}`}
                onClick={() => setSelectedCondition(null)}
                className="px-5 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>{t("Book Appointment for this Condition", "इसके लिए अपॉइंटमेंट बुक करें")}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
