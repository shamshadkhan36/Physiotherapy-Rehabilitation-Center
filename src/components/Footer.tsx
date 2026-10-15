"use client";

import React from "react";
import Link from "next/link";
import { Phone, MapPin, Clock, MessageCircle, Heart, Shield } from "lucide-react";
import SankalpLogo from "./SankalpLogo";
import { useLanguage } from "./LanguageContext";
import { CLINIC_INFO, CONDITIONS_DATA } from "@/lib/content";

export default function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { href: "/", labelEn: "Home", labelHi: "मुख्य पृष्ठ" },
    { href: "/about", labelEn: "About Us", labelHi: "हमारे बारे में" },
    { href: "/services", labelEn: "Physiotherapy Services", labelHi: "फिजियोथैरेपी सेवाएं" },
    { href: "/conditions", labelEn: "Conditions We Treat", labelHi: "बीमारियां व दर्द" },
    { href: "/team", labelEn: "Our Team", labelHi: "हमारी टीम" },
    { href: "/book", labelEn: "Book an Appointment", labelHi: "अपॉइंटमेंट बुक करें" },
    { href: "/contact", labelEn: "Contact Us", labelHi: "संपर्क करें" },
    { href: "/admin", labelEn: "Admin Portal", labelHi: "एडमिन पोर्टल" },
  ];

  const featuredConditions = CONDITIONS_DATA.slice(0, 8);

  const whatsappMessage = encodeURIComponent(
    "Hello Sankalp Foundation, I have a query regarding physiotherapy treatment in Patna."
  );

  return (
    <footer className="bg-[#06182c] text-slate-300 pt-16 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Organization & Mission */}
          <div className="space-y-4">
            <SankalpLogo variant="white" size="md" />
            <p className="text-sm text-slate-400 leading-relaxed">
              {t(
                "Sankalp Foundation is a dedicated physiotherapy and rehabilitation center in Patna, committed to accessible, personalized, and patient-centered recovery care.",
                "संकल्प फाउंडेशन पटना में स्थित एक समर्पित फिजियोथैरेपी और रिहैबिलिटेशन सेंटर है, जो प्रत्येक मरीज को सुलभ और गुणवत्तापूर्ण देखभाल प्रदान करने के लिए प्रतिबद्ध है।"
              )}
            </p>

            <div className="pt-2">
              <div className="p-3.5 rounded-xl bg-teal-950/60 border border-teal-800/50">
                <div className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  {t(CLINIC_INFO.offerEn, CLINIC_INFO.offerHi)}
                </div>
                <p className="text-xs text-slate-300">
                  {t(CLINIC_INFO.offerSubEn, CLINIC_INFO.offerSubHi)}
                </p>
                <Link
                  href="/book?offer=50"
                  className="inline-block mt-2 text-xs font-bold text-teal-300 hover:text-white underline underline-offset-2"
                >
                  {t("Book ₹50 Session →", "₹50 का सत्र बुक करें →")}
                </Link>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-teal-500 rounded-sm"></span>
              {t("Quick Links", "त्वरित लिंक्स")}
            </h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-teal-400 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="text-teal-600 text-xs">›</span>
                    <span>{t(link.labelEn, link.labelHi)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Conditions We Treat */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-teal-500 rounded-sm"></span>
              {t("Conditions We Treat", "प्रमुख उपचार")}
            </h3>
            <ul className="space-y-2 text-sm">
              {featuredConditions.map((cond) => (
                <li key={cond.id}>
                  <Link
                    href={`/conditions#${cond.id}`}
                    className="hover:text-teal-400 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="text-teal-600 text-xs">›</span>
                    <span>{t(cond.nameEn, cond.nameHi)}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/conditions"
                  className="text-teal-400 font-semibold hover:underline text-xs inline-block mt-1"
                >
                  {t("View All 16 Conditions →", "सभी 16 बीमारियां देखें →")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-teal-500 rounded-sm"></span>
              {t("Clinic Contact", "क्लिनिक संपर्क")}
            </h3>

            <div className="flex items-start gap-3 text-sm text-slate-300">
              <MapPin className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
              <p className="leading-snug">{t(CLINIC_INFO.addressEn, CLINIC_INFO.addressHi)}</p>
            </div>

            <div className="space-y-2 text-sm">
              <a
                href={`tel:${CLINIC_INFO.phone1}`}
                className="flex items-center gap-3 text-slate-300 hover:text-teal-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>{CLINIC_INFO.phone1Display}</span>
              </a>
              <a
                href={`tel:${CLINIC_INFO.phone2}`}
                className="flex items-center gap-3 text-slate-300 hover:text-teal-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>{CLINIC_INFO.phone2Display}</span>
              </a>
            </div>

            <div className="flex items-start gap-3 text-sm text-slate-300 pt-1">
              <Clock className="w-4 h-4 text-teal-400 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-white">{t("Clinic Timings", "क्लिनिक का समय")}</p>
                <p className="text-xs text-slate-400">{t(CLINIC_INFO.timingsEn, CLINIC_INFO.timingsHi)}</p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t("Chat on WhatsApp", "व्हाट्सएप पर संपर्क करें")}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="pt-8 mt-8 border-t border-slate-800/80 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            © {new Date().getFullYear()} {CLINIC_INFO.nameEn} {CLINIC_INFO.centerTypeEn}. {t("All rights reserved.", "सर्वाधिकार सुरक्षित।")}
          </p>

          <p className="text-[11px] text-slate-500 max-w-xl text-center md:text-right">
            {t(
              "Medical Disclaimer: The information provided is for educational awareness. Physical diagnosis and personalized consultation are essential before initiating any rehabilitation program.",
              "चिकित्सीय अस्वीकरण: यह जानकारी केवल जन-जागरूकता के लिए है। किसी भी थेरेपी या पुनर्वास से पहले क्लिनिक में शारीरिक जांच अनिवार्य है।"
            )}
          </p>

          <div className="flex items-center gap-2 text-slate-400">
            <Link href="/admin" className="hover:text-teal-400 flex items-center gap-1 text-[11px]">
              <Shield className="w-3 h-3" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
