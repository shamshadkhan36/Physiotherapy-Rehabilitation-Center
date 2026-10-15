"use client";

import React from "react";
import { ShieldCheck, UserCheck, HeartHandshake, Activity } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { TRUST_POINTS } from "@/lib/content";

const TRUST_ICONS: Record<string, any> = {
  ShieldCheck,
  UserCheck,
  HeartHandshake,
  Activity,
};

export default function TrustSection() {
  const { lang, t } = useLanguage();

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_POINTS.map((item) => {
            const Icon = TRUST_ICONS[item.iconName] || ShieldCheck;

            return (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/90 hover:border-teal-300 hover:bg-teal-50/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition-all shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#0a2540] group-hover:text-teal-800 transition-colors">
                  {lang === "hi" ? item.titleHi : item.titleEn}
                </h3>

                <p className="text-xs text-slate-500 font-hindi mt-0.5">
                  {lang === "hi" ? item.titleEn : item.titleHi}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                  {t(item.descEn, item.descHi)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
