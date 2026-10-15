"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  Clock,
  MapPin,
  Calendar,
  MessageCircle,
  Menu,
  X,
  Languages,
  Shield,
} from "lucide-react";
import SankalpLogo from "./SankalpLogo";
import { useLanguage } from "./LanguageContext";
import { CLINIC_INFO } from "@/lib/content";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();
  const pathname = usePathname();

  const navLinks = [
    { href: "/", labelEn: "Home", labelHi: "मुख्य पृष्ठ" },
    { href: "/about", labelEn: "About Us", labelHi: "हमारे बारे में" },
    { href: "/services", labelEn: "Services", labelHi: "सेवाएं" },
    { href: "/conditions", labelEn: "Conditions", labelHi: "बीमारियां व दर्द" },
    { href: "/team", labelEn: "Our Team", labelHi: "हमारी टीम" },
    { href: "/contact", labelEn: "Contact", labelHi: "संपर्क" },
  ];

  const whatsappMessage = encodeURIComponent(
    "Hello Sankalp Foundation, I would like to inquire about physiotherapy appointment at your Patna clinic."
  );

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top Notice & Emergency Bar */}
      <div className="bg-[#0a2540] text-slate-200 text-xs py-2 px-4 border-b border-slate-700/60">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center flex-wrap gap-4 sm:gap-6">
            <a
              href={`tel:${CLINIC_INFO.phone1}`}
              className="flex items-center gap-1.5 hover:text-teal-300 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span>{CLINIC_INFO.phone1Display}</span>
            </a>
            <a
              href={`tel:${CLINIC_INFO.phone2}`}
              className="hidden sm:flex items-center gap-1.5 hover:text-teal-300 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span>{CLINIC_INFO.phone2Display}</span>
            </a>
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              <span>{t(CLINIC_INFO.timingsEn, CLINIC_INFO.timingsHi)}</span>
            </span>
            <span className="hidden lg:inline-flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              <span>{t(CLINIC_INFO.locationShortEn, CLINIC_INFO.locationShortHi)}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Special Offer Pill */}
            <Link
              href="/book?offer=50"
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[11px] font-semibold hover:bg-amber-500/30 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              <span>{t("Introductory Session: ₹50", "विशेष सत्र: मात्र ₹50")}</span>
            </Link>

            {/* Language Switcher Button */}
            <button
              onClick={toggleLang}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-teal-800/60 hover:bg-teal-700/80 text-white font-medium border border-teal-600/50 text-xs transition-colors"
              title="Change Language / भाषा बदलें"
            >
              <Languages className="w-3.5 h-3.5 text-teal-300" />
              <span>{lang === "en" ? "हिंदी" : "English"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <SankalpLogo size="md" />

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-teal-700 bg-teal-50"
                    : "text-slate-700 hover:text-teal-700 hover:bg-slate-100/70"
                }`}
              >
                {t(link.labelEn, link.labelHi)}
              </Link>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>{t("WhatsApp Us", "व्हाट्सएप करें")}</span>
          </a>

          {/* Book Appointment CTA */}
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-sm hover:shadow transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>{t("Book Appointment", "अपॉइंटमेंट बुक करें")}</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 xl:hidden">
          <Link
            href="/book"
            className="md:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-teal-600 hover:bg-teal-700"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t("Book", "बुक करें")}</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:text-teal-600 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-1.5 mb-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                    isActive
                      ? "text-teal-700 bg-teal-50"
                      : "text-slate-800 hover:text-teal-700 hover:bg-slate-50"
                  }`}
                >
                  {t(link.labelEn, link.labelHi)}
                </Link>
              );
            })}
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:text-teal-700 hover:bg-slate-50 flex items-center gap-2"
            >
              <Shield className="w-4 h-4 text-slate-400" />
              <span>{t("Staff / Admin Portal", "स्टाफ व एडमिन लॉगिन")}</span>
            </Link>
          </nav>

          <div className="flex flex-col gap-2.5 pt-3 border-t border-slate-100">
            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 px-4 rounded-xl text-center font-bold text-white bg-teal-600 hover:bg-teal-700 flex items-center justify-center gap-2 shadow-sm"
            >
              <Calendar className="w-5 h-5" />
              <span>{t("Book an Appointment", "अपॉइंटमेंट बुक करें")}</span>
            </Link>

            <a
              href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl text-center font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 text-emerald-600" />
              <span>{t("WhatsApp Us Now", "व्हाट्सएप पर बात करें")}</span>
            </a>

            <a
              href={`tel:${CLINIC_INFO.phone1}`}
              className="w-full py-3 px-4 rounded-xl text-center font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5 text-teal-600" />
              <span>{t("Call: +91 9661980606", "कॉल करें: +91 9661980606")}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
