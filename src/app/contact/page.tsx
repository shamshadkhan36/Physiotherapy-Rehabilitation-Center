"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import FloatingActions from "@/components/FloatingActions";
import LocationSection from "@/components/LocationSection";
import { LanguageProvider, useLanguage } from "@/components/LanguageContext";

function ContactContent() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      <Navbar />

      <main className="flex-1">
        {/* Banner */}
        <div className="bg-[#0a2540] text-white py-16 sm:py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-300 bg-teal-900/60 px-3.5 py-1.5 rounded-full border border-teal-700">
              {t("Get In Touch", "हमसे संपर्क करें")}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-4">
              {t("Contact Sankalp Foundation", "संकल्प फाउंडेशन से संपर्क करें")}
            </h1>
            <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
              {t(
                "Reach out by phone, WhatsApp, or visit our clinic in Bhupatipur, Patna. We are here to guide your recovery.",
                "फोन, व्हाट्सएप या सीधे हमारे भूपतिपुर पटना क्लिनिक पर आकर मिलें। हम आपकी सेवा में सदैव तत्पर हैं।"
              )}
            </p>
          </div>
        </div>

        {/* Location & Form Section */}
        <LocationSection />
      </main>

      <Footer />
      <MobileStickyBar />
      <FloatingActions />
    </div>
  );
}

export default function ContactPage() {
  return (
    <LanguageProvider>
      <ContactContent />
    </LanguageProvider>
  );
}
