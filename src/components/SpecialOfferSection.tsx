"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Calendar, CheckCircle2, ShieldCheck } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { CLINIC_INFO } from "@/lib/content";

export default function SpecialOfferSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 bg-gradient-to-br from-amber-50/80 via-white to-teal-50/50 border-y border-amber-200/60">
      {/* Subtle decorative background circles */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 rounded-full bg-amber-200/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 rounded-full bg-teal-200/20 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-card border border-amber-200/80 p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left badge & copy */}
          <div className="flex-1 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs sm:text-sm font-bold">
              <Sparkles className="w-4 h-4 text-amber-600 animate-spin" style={{ animationDuration: "6s" }} />
              <span>{t("Community Healthcare Initiative Patna", "पटना जन-स्वास्थ्य सेवा पहल")}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0a2540] tracking-tight">
              {t("Special Physiotherapy Service – Only ₹50", "मात्र ₹50/- में विशेष फिजियोथैरेपी सेवा!")}
            </h2>

            <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed">
              {t(
                "Quality physiotherapy care at an affordable price. Experience comprehensive physical assessment, pain evaluation, and guided therapy by trained rehabilitation professionals.",
                "गुणवत्तापूर्ण फिजियोथैरेपी देखरेख अब हर मरीज की पहुंच में। अनुभवी फिजियोथैरेपिस्ट द्वारा शारीरिक मूल्यांकन, दर्द की गहन जांच और व्यक्तिगत थेरेपी मार्गदर्शन।"
              )}
            </p>

            {/* Checklist of what's included */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>{t("Complete Posture & Joint Range Assessment", "संपूर्ण पोस्चर व जोड़ों की जांच")}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>{t("Pain Level & Trigger Point Evaluation", "दर्द के स्रोत व नसों के तनाव का विश्लेषण")}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>{t("Initial Manual Therapy & Mobility Session", "शुरुआती मैनुअल थेरेपी व मोबिलिटी सत्र")}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>{t("Custom Home Care Recovery Advice", "घर पर करने योग्य सावधानियां व गाइडेंस")}</span>
              </div>
            </div>
          </div>

          {/* Right Pricing Card & CTA */}
          <div className="w-full lg:w-auto flex-shrink-0 flex flex-col items-center">
            <div className="w-full sm:w-80 bg-gradient-to-b from-[#0a2540] to-[#07192d] text-white rounded-2xl p-6 shadow-xl border border-slate-700 text-center relative overflow-hidden">
              {/* Rosette ribbon stamp */}
              <div className="inline-block px-3 py-1 bg-amber-400 text-[#0a2540] font-black text-xs uppercase tracking-wider rounded-full mb-3 shadow-sm">
                {t("Affordable Care Pledge", "सुलभ सेवा संकल्प")}
              </div>

              <div className="flex items-center justify-center gap-1 my-2">
                <span className="text-3xl font-bold text-amber-300">₹</span>
                <span className="text-6xl font-black tracking-tight text-white">50</span>
                <span className="text-slate-400 text-sm self-end pb-2 font-medium">/{t("session", "सत्र")}</span>
              </div>

              <p className="text-xs text-slate-300 mb-6">
                {t(CLINIC_INFO.taglineEn, CLINIC_INFO.taglineHi)}
              </p>

              <Link
                href="/book?treatment=special-offer-50"
                className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0a2540] font-extrabold text-sm uppercase tracking-wide transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>{t("BOOK YOUR ₹50 SESSION", "₹50 का सत्र बुक करें")}</span>
              </Link>

              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>{t("No hidden clinic charges", "कोई अतिरिक्त शुल्क नहीं")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
