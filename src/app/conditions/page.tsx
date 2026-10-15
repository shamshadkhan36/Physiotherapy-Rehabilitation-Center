"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import FloatingActions from "@/components/FloatingActions";
import ConditionsSection from "@/components/ConditionsSection";
import SpecialOfferSection from "@/components/SpecialOfferSection";
import { LanguageProvider, useLanguage } from "@/components/LanguageContext";

function ConditionsContent() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      <Navbar />

      <main className="flex-1">
        {/* Banner */}
        <div className="bg-[#0a2540] text-white py-16 sm:py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-300 bg-teal-900/60 px-3.5 py-1.5 rounded-full border border-teal-700">
              {t("Specialized Condition Directory", "समस्या एवं उपचार निर्देशिका")}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-4">
              {t("Conditions We Treat", "प्रमुख बीमारियां व दर्द जिनका हम उपचार करते हैं")}
            </h1>
            <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
              {t(
                "Explore all 16 musculoskeletal and neurological conditions treated at Sankalp Foundation Patna. Click any condition to view detailed clinical symptoms and rehabilitation protocols.",
                "संकल्प फाउंडेशन पटना में उपचार की जाने वाली सभी 16 प्रमुख शारीरिक व नसों की समस्याओं का संपूर्ण विवरण। किसी भी कार्ड पर क्लिक करके लक्षण व फिजियोथैरेपी तकनीकें देखें।"
              )}
            </p>
          </div>
        </div>

        {/* All Conditions Grid */}
        <ConditionsSection />

        {/* ₹50 Special Offer spotlight */}
        <SpecialOfferSection />
      </main>

      <Footer />
      <MobileStickyBar />
      <FloatingActions />
    </div>
  );
}

export default function ConditionsPage() {
  return (
    <LanguageProvider>
      <ConditionsContent />
    </LanguageProvider>
  );
}
