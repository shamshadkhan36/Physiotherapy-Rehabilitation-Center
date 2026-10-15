"use client";

import React from "react";
import Link from "next/link";
import { Phone, MessageCircle, Calendar } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { CLINIC_INFO } from "@/lib/content";

export default function MobileStickyBar() {
  const { t } = useLanguage();

  const whatsappMessage = encodeURIComponent(
    "Hello Sankalp Foundation, I want to book an appointment for physiotherapy in Patna."
  );

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-2xl">
      <div className="grid grid-cols-3 gap-2">
        {/* Call Button */}
        <a
          href={`tel:${CLINIC_INFO.phone1}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors active:scale-95 text-center"
        >
          <Phone className="w-5 h-5 text-teal-700 mb-0.5" />
          <span className="text-[11px] font-bold leading-none">{t("Call", "कॉल")}</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors active:scale-95 text-center"
        >
          <MessageCircle className="w-5 h-5 text-emerald-600 mb-0.5" />
          <span className="text-[11px] font-bold leading-none">{t("WhatsApp", "व्हाट्सएप")}</span>
        </a>

        {/* Book Appointment Button */}
        <Link
          href="/book"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-md transition-colors active:scale-95 text-center"
        >
          <Calendar className="w-5 h-5 text-white mb-0.5" />
          <span className="text-[11px] font-bold leading-none">{t("Book Now", "बुक करें")}</span>
        </Link>
      </div>
    </div>
  );
}
