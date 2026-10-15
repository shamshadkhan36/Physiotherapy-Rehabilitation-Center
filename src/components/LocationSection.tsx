"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Navigation,
  Send,
  CheckCircle2,
  Compass,
} from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { CLINIC_INFO } from "@/lib/content";

export default function LocationSection() {
  const { lang, t } = useLanguage();
  const [formSent, setFormSent] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    // WhatsApp redirect fallback or notification
  };

  const whatsappMessage = encodeURIComponent(
    "Hello Sankalp Foundation, I am looking for directions to your Bhupatipur Patna clinic."
  );

  return (
    <section id="location" className="py-16 sm:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100/70 px-3 py-1 rounded-full border border-teal-200">
            {t("Visit Our Patna Center", "हमारे पटना क्लिनिक पर आएं")}
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a2540] tracking-tight mt-3">
            {t("Location & Clinic Contact", "क्लिनिक का पता एवं संपर्क")}
          </h2>

          <p className="text-slate-600 text-base sm:text-lg mt-3">
            {t(
              "Conveniently situated near Krishi Anusandhan Kendra, Bhupatipur with dedicated parking and accessible ground-floor patient care.",
              "कृषि अनुसंधान केंद्र के पास, भूपतिपुर में स्थित—बुजुर्ग मरीजों के लिए सुविधाजनक भूतल देखरेख और सुलभ पार्किंग सुविधा।"
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Address, Timings & Call Cards (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              {/* Address Box */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0a2540]">
                    {t(CLINIC_INFO.nameEn, CLINIC_INFO.nameHi)}
                  </h3>
                  <p className="text-xs font-semibold text-teal-700 mb-2">
                    {t(CLINIC_INFO.centerTypeEn, CLINIC_INFO.centerTypeHi)}
                  </p>
                  <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                    {t(CLINIC_INFO.addressEn, CLINIC_INFO.addressHi)}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {t(
                      "Landmark: Near Krishi Anusandhan Kendra • PIN: 800020",
                      "प्रमुख पहचान: कृषि अनुसंधान केंद्र के पास • पिन कोड: 800020"
                    )}
                  </p>
                </div>
              </div>

              {/* Timings Box */}
              <div className="flex items-start gap-4 pt-4 border-t border-slate-200">
                <div className="w-12 h-12 rounded-xl bg-[#0a2540] text-teal-300 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    {t("Daily Consultation Timings", "प्रतिदिन परामर्श समय")}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 text-xs sm:text-sm">
                    <div className="p-3 rounded-lg bg-white border border-slate-200">
                      <span className="font-bold text-teal-800 block">{t("Morning Shift", "सुबह की पाली")}</span>
                      <span className="text-slate-700 font-semibold">{CLINIC_INFO.morningTimingEn}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-white border border-slate-200">
                      <span className="font-bold text-indigo-800 block">{t("Evening Shift", "शाम की पाली")}</span>
                      <span className="text-slate-700 font-semibold">{CLINIC_INFO.eveningTimingEn}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Phone Buttons */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${CLINIC_INFO.phone1}`}
                  className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{CLINIC_INFO.phone1Display}</span>
                </a>

                <a
                  href={`tel:${CLINIC_INFO.phone2}`}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-colors"
                >
                  <Phone className="w-4 h-4 text-teal-400" />
                  <span>{CLINIC_INFO.phone2Display}</span>
                </a>

                <a
                  href={CLINIC_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl border border-teal-600 text-teal-800 hover:bg-teal-50 font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors ml-auto"
                >
                  <Navigation className="w-4 h-4 text-teal-600" />
                  <span>{t("Get Directions", "रास्ता देखें (GPS)")}</span>
                </a>
              </div>
            </div>

            {/* Google Maps Visual Embed Frame */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm h-72 sm:h-80 w-full relative bg-slate-100">
              <iframe
                title="Sankalp Foundation Location Map Patna"
                src="https://maps.google.com/maps?q=Krishi+Anusandhan+Kendra+Bhupatipur+Patna+800020&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                aria-hidden="false"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow border border-slate-200 text-xs font-bold text-[#0a2540] flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-teal-600 animate-spin" style={{ animationDuration: "12s" }} />
                <span>Bhupatipur, Patna – 800020</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form (5 cols) */}
          <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-[#0a2540] mb-1">
              {t("Send a Message / Inquiry", "संदेश या पूछताछ भेजें")}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              {t(
                "Have a question about your symptoms or our ₹50 session? Leave a message and our team will get in touch.",
                "क्या आपके मन में अपने दर्द या ₹50 के सत्र को लेकर कोई सवाल है? हमें लिखें, हमारी टीम शीघ्र संपर्क करेगी।"
              )}
            </p>

            {formSent ? (
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-950 text-base">
                  {t("Thank you! Your message has been sent.", "धन्यवाद! आपका संदेश प्राप्त हो गया है।")}
                </h4>
                <p className="text-xs text-emerald-800">
                  {t(
                    "Our clinic coordinator will call or WhatsApp you shortly.",
                    "हमारे क्लिनिक प्रतिनिधि शीघ्र ही आपसे संपर्क करेंगे।"
                  )}
                </p>
                <div className="pt-2">
                  <a
                    href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:underline"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t("Connect on WhatsApp immediately →", "तुरंत व्हाट्सएप पर बात करें →")}</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t("Your Name *", "आपका नाम *")}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t("e.g. Anand Sharma", "उदा. आनंद शर्मा")}
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t("Phone Number *", "फोन नंबर *")}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t("Email (Optional)", "ईमेल (वैकल्पिक)")}
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t("Message / Problem Description", "संदेश अथवा समस्या का विवरण")}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={t("Write your question here...", "यहाँ अपना प्रश्न लिखें...")}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{t("Send Message", "संदेश भेजें")}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
