"use client";

import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import FloatingActions from "@/components/FloatingActions";
import BookingWizard from "@/components/BookingWizard";
import { LanguageProvider, useLanguage } from "@/components/LanguageContext";
import { CLINIC_INFO } from "@/lib/content";
import { Phone, MapPin, Clock, MessageCircle, ShieldCheck } from "lucide-react";

function BookContent() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      <main className="flex-1 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100 px-3.5 py-1.5 rounded-full border border-teal-200">
              {t("Online Clinic Appointment", "ऑनलाइन अपॉइंटमेंट बुकिंग")}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0a2540] tracking-tight mt-3">
              {t("Book Your Physiotherapy Session", "अपना फिजियोथैरेपी सत्र बुक करें")}
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              {t(
                "Select your treatment, pick a morning or evening time slot, and receive instant confirmation with WhatsApp support.",
                "उपचार चुनें, सुबह या शाम का सुविधाजनक समय चुनें और व्हाट्सएप पर तुरंत पुष्टि पाएं।"
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: The 5-Step Booking Wizard (8 cols) */}
            <div className="lg:col-span-8">
              <Suspense
                fallback={
                  <div className="p-12 text-center bg-white rounded-2xl shadow-card border border-slate-200">
                    <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-sm text-slate-500 mt-3">Loading booking system...</p>
                  </div>
                }
              >
                <BookingWizard />
              </Suspense>
            </div>

            {/* Right Column: Clinic Info & Help Card (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Assistance Box */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-[#0a2540] flex items-center gap-2">
                  <Phone className="w-4 h-4 text-teal-600" />
                  <span>{t("Need Help Booking?", "बुकिंग में सहायता चाहिए?")}</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t(
                    "Prefer to speak with our receptionist directly? Call our Patna helpline numbers for immediate assistance.",
                    "क्या आप फोन पर बात करके अपॉइंटमेंट लेना चाहते हैं? हमारे हेल्पलाइन नंबर पर तुरंत कॉल करें।"
                  )}
                </p>

                <div className="space-y-2 pt-1">
                  <a
                    href={`tel:${CLINIC_INFO.phone1}`}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 font-bold text-xs sm:text-sm transition-colors"
                  >
                    <Phone className="w-4 h-4 text-teal-600" />
                    <span>{CLINIC_INFO.phone1Display}</span>
                  </a>

                  <a
                    href={`tel:${CLINIC_INFO.phone2}`}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 font-bold text-xs sm:text-sm transition-colors"
                  >
                    <Phone className="w-4 h-4 text-teal-600" />
                    <span>{CLINIC_INFO.phone2Display}</span>
                  </a>
                </div>

                <div className="pt-2">
                  <a
                    href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(
                      "Hello Sankalp Foundation, I need help booking an appointment."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>{t("WhatsApp Assistance", "व्हाट्सएप पर सहायता")}</span>
                  </a>
                </div>
              </div>

              {/* Clinic Timings & Location Summary */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-[#0a2540] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-600" />
                  <span>{t("Clinic Schedule", "क्लिनिक का समय")}</span>
                </h3>

                <div className="text-xs space-y-2">
                  <div className="flex justify-between p-2 rounded bg-slate-50">
                    <span className="font-semibold text-slate-600">{t("Morning:", "सुबह:")}</span>
                    <strong className="text-slate-900">{CLINIC_INFO.morningTimingEn}</strong>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-slate-50">
                    <span className="font-semibold text-slate-600">{t("Evening:", "शाम:")}</span>
                    <strong className="text-slate-900">{CLINIC_INFO.eveningTimingEn}</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-start gap-2 text-xs text-slate-600">
                    <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span>{t(CLINIC_INFO.addressEn, CLINIC_INFO.addressHi)}</span>
                  </div>
                </div>
              </div>

              {/* Elderly Patient Friendly Guarantee */}
              <div className="bg-teal-900 text-white rounded-2xl p-6 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-teal-300 text-xs font-bold uppercase">
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  <span>{t("Patient Guarantee", "मरीज सुविधा गारंटी")}</span>
                </div>
                <h4 className="font-bold text-sm">
                  {t("Dedicated Senior Citizen Care", "वरिष्ठ नागरिकों की विशेष देखरेख")}
                </h4>
                <p className="text-xs text-teal-200 leading-relaxed">
                  {t(
                    "Wheelchair accessible entry, dedicated companion seating, and unhurried clinical attention for elderly patients.",
                    "सुलभ प्रवेश, परिजनों के बैठने की सुविधाजनक व्यवस्था और बुजुर्ग मरीजों के लिए विशेष ध्यान।"
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileStickyBar />
      <FloatingActions />
    </div>
  );
}

export default function BookPage() {
  return (
    <LanguageProvider>
      <BookContent />
    </LanguageProvider>
  );
}
