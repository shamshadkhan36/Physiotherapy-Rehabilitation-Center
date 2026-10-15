"use client";

import React from "react";
import Image from "next/image";
import Link from "next/image";
import {
  Users,
  ShieldCheck,
  Award,
  Calendar,
  MessageCircle,
  AlertCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import FloatingActions from "@/components/FloatingActions";
import { LanguageProvider, useLanguage } from "@/components/LanguageContext";
import { TEAM_MEMBERS, CLINIC_INFO } from "@/lib/content";

function TeamContent() {
  const { lang, t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      <Navbar />

      <main className="flex-1">
        {/* Banner */}
        <div className="bg-[#0a2540] text-white py-16 sm:py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-300 bg-teal-900/60 px-3.5 py-1.5 rounded-full border border-teal-700">
              {t("Qualified Rehabilitation Practitioners", "अनुभवी फिजियोथैरेपी टीम")}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-4">
              {t("Meet Our Clinical Team", "हमारी चिकित्सीय टीम से मिलें")}
            </h1>
            <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
              {t(
                "Compassionate professionals dedicated to patient-centered rehabilitation, individualized attention, and elderly mobility care in Patna.",
                "वरिष्ठ नागरिकों और प्रत्येक मरीज के प्रति संवेदनशील, समर्पित और वैज्ञानिक दृष्टिकोण से उपचार करने वाली टीम।"
              )}
            </p>
          </div>
        </div>

        {/* Notice of Transparency */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs sm:text-sm flex items-start gap-3 shadow-md">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">
                {t("Client Transparency Notice:", "पारदर्शिता सूचना:")}
              </strong>
              <span>
                {t(
                  "Practitioner cards below represent professional clinic role placeholders. Doctor names, council registration numbers, and degree certificates will be updated once verified by Sankalp Foundation clinic management.",
                  "नीचे दिए गए प्रोफाइल क्लिनिकल भूमिकाओं के प्रारूप हैं। डॉक्टरों के वास्तविक नाम, राज्य मेडिकल काउंसिल पंजीयन संख्या और डिग्री का आधिकारिक विवरण क्लिनिक प्रबंधन द्वारा सत्यापन के बाद अपडेट किया जाएगा।"
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Team Cards Grid */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TEAM_MEMBERS.map((member) => (
                <div
                  key={member.id}
                  className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:border-teal-300 shadow-sm hover:shadow-card transition-all flex flex-col group"
                >
                  <div className="relative h-64 w-full bg-slate-200 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/80 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded bg-teal-800/90 text-teal-200 border border-teal-500/30">
                      {lang === "hi" ? member.roleHi : member.roleEn}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-[#0a2540]">{member.name}</h3>
                      <p className="text-xs font-semibold text-teal-700 mt-0.5">
                        {member.qualification}
                      </p>

                      <div className="mt-2 text-xs font-medium text-slate-500 bg-white p-2 rounded-lg border border-slate-100">
                        {member.experiencePlaceholder}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                        {lang === "hi" ? member.bioHi : member.bioEn}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">Patna Center</span>
                      <a
                        href="/book"
                        className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold transition-colors"
                      >
                        {t("Book Visit", "मुलाकात तय करें")}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Clinic Values Card */}
            <div className="mt-16 p-8 rounded-3xl bg-slate-50 border border-slate-200 text-center max-w-3xl mx-auto">
              <h3 className="text-xl font-bold text-[#0a2540]">
                {t("Patient-Centric Clinical Ethics", "मरीज-हितैषी चिकित्सीय मूल्य")}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {t(
                  "At Sankalp Foundation, every patient receives unhurried attention. We prioritize gentle pain relief, patient dignity, and practical home exercises over rushed sessions or unnecessary procedures.",
                  "संकल्प फाउंडेशन में हर मरीज को पूरा समय और ध्यान दिया जाता है। हम बिना जल्दबाजी के, सहजता और सम्मान के साथ स्थायी आराम सुनिश्चित करने को प्राथमिकता देते हैं।"
                )}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileStickyBar />
      <FloatingActions />
    </div>
  );
}

export default function TeamPage() {
  return (
    <LanguageProvider>
      <TeamContent />
    </LanguageProvider>
  );
}
