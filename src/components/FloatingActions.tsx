"use client";

import React, { useState } from "react";
import { MessageCircle, Phone, X } from "lucide-react";
import { CLINIC_INFO } from "@/lib/content";
import { useLanguage } from "./LanguageContext";

export default function FloatingActions() {
  const { t } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappMessage = encodeURIComponent(
    "Hello Sankalp Foundation, I want to inquire about physiotherapy appointment in Patna."
  );

  return (
    <div className="fixed right-4 bottom-20 md:bottom-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* WhatsApp Tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-slate-800 text-xs font-semibold py-2 px-3.5 rounded-2xl shadow-xl border border-slate-100 max-w-xs animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>{t("Need help? Chat with us on WhatsApp", "मदद चाहिए? व्हाट्सएप पर बात करें")}</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 ml-1"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Buttons Group */}
      <div className="flex flex-col gap-2.5">
        {/* Floating Phone Call */}
        <a
          href={`tel:${CLINIC_INFO.phone1}`}
          className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 text-white shadow-xl hover:bg-slate-800 hover:scale-105 transition-all group relative"
          aria-label="Call clinic directly"
        >
          <Phone className="w-5 h-5 text-teal-300" />
          <span className="absolute right-14 bg-slate-900 text-white text-xs px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-md font-medium">
            {t("Call Clinic", "कॉल करें")}
          </span>
        </a>

        {/* Floating WhatsApp */}
        <a
          href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-500 text-white shadow-xl hover:bg-emerald-600 hover:scale-110 active:scale-95 transition-all group relative border-2 border-white"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 text-[#0a2540] text-[10px] font-black rounded-full flex items-center justify-center shadow">
            1
          </span>
          <span className="absolute right-16 bg-slate-900 text-white text-xs px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-md font-medium hidden sm:inline-block">
            {t("WhatsApp Sankalp Clinic", "व्हाट्सएप संपर्क")}
          </span>
        </a>
      </div>
    </div>
  );
}
