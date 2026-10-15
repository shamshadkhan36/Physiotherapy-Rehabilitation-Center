"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Target,
  Sparkles,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Users,
  Compass,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import FloatingActions from "@/components/FloatingActions";
import { LanguageProvider, useLanguage } from "@/components/LanguageContext";
import { CLINIC_INFO } from "@/lib/content";

function AboutContent() {
  const { lang, t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      <Navbar />

      <main className="flex-1">
        {/* About Hero Banner */}
        <div className="bg-[#0a2540] text-white py-16 sm:py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-300 bg-teal-900/60 px-3.5 py-1.5 rounded-full border border-teal-700">
              {t("About Sankalp Foundation", "संकल्प फाउंडेशन के बारे में")}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-4">
              {t("Dedicated to a Pain-Free Patna", "दर्द-मुक्त पटना के लिए समर्पित संस्थान")}
            </h1>
            <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed font-hindi">
              {CLINIC_INFO.taglineHi}
            </p>
          </div>
        </div>

        {/* Narrative & Organization Context */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                  {t("Our Identity & Purpose", "हमारी पहचान व उद्देश्य")}
                </span>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a2540]">
                  {t(
                    "Accessible, Evidence-Based Rehabilitation for Every Citizen",
                    "प्रत्येक नागरिक के लिए सुलभ और वैज्ञानिक पुनर्वास देखरेख"
                  )}
                </h2>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {t(
                    "Sankalp Foundation is a physiotherapy and rehabilitation center serving patients in Patna with a focus on accessible, personalized and patient-centered rehabilitation care.",
                    "संकल्प फाउंडेशन पटना में स्थित एक विशेष फिजियोथैरेपी और रिहैबिलिटेशन सेंटर है, जो मरीजों को सुलभ, व्यक्तिगत और मरीज-केंद्रित पुनर्वास सेवाएं प्रदान करता है।"
                  )}
                </p>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {t(
                    "Located in Bhupatipur near Krishi Anusandhan Kendra, our center bridges the gap between expensive tertiary hospital therapies and local neighborhood care. We believe high-quality physiotherapy should not be a luxury—hence our landmark ₹50 community introductory service.",
                    "कृषि अनुसंधान केंद्र, भूपतिपुर के पास स्थित हमारा केंद्र आधुनिक चिकित्सीय तकनीकों को जन-साधारण तक पहुंचाता है। हम मानते हैं कि उच्चस्तरीय फिजियोथैरेपी हर किसी की पहुंच में होनी चाहिए—इसीलिए हमने मात्र ₹50 की विशेष परिचयात्मक सेवा शुरू की है।"
                  )}
                </p>

                <div className="pt-2">
                  <Link
                    href="/book"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{t("Book a Consultation", "परामर्श बुक करें")}</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-slate-100 aspect-[4/3] bg-slate-200">
                  <Image
                    src="/images/clinic-interior.jpg"
                    alt="Sankalp Foundation Physiotherapy Clinic Interior"
                    fill
                    className="object-cover"
                    sizes="600px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white p-2">
                    <p className="font-bold text-sm">
                      {t("Clean, Patient-Friendly Facility", "स्वच्छ एवं मरीज-अनुकूल क्लिनिक")}
                    </p>
                    <p className="text-xs text-slate-300">
                      {t("Ground floor access, sanitized treatment beds, senior-friendly ramp", "भूतल पर सुलभ प्रवेश, सैनिटाइज्ड थेरेपी बेड, वरिष्ठ नागरिकों हेतु आसान पहुंच")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision & Rehabilitation Philosophy */}
        <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Mission */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0a2540]">
                  {t("Our Mission", "हमारा मिशन")}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t(
                    "To empower patients suffering from acute and chronic pain, joint stiffness, and neurological impairments through personalized, evidence-based physiotherapy that restores mobility, dignity, and independence.",
                    "दर्द, जोड़ों की अकड़न और नसों की कमजोरी से जूझ रहे मरीजों को वैज्ञानिक फिजियोथैरेपी द्वारा पुनः आत्मनिर्भर और स्वस्थ जीवन प्रदान करना।"
                  )}
                </p>
              </div>

              {/* Vision */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0a2540]">
                  {t("Our Vision", "हमारा विजन")}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t(
                    "To establish Sankalp Foundation as Patna's most trusted, empathetic, and accessible rehabilitation destination, ensuring that quality therapeutic care is never hindered by financial constraints.",
                    "संकल्प फाउंडेशन को पटना का सबसे विश्वसनीय और सुलभ पुनर्वास केंद्र बनाना, जहाँ आर्थिक बाधाओं के बिना हर मरीज को सर्वोत्तम फिजियोथैरेपी मिल सके।"
                  )}
                </p>
              </div>

              {/* Rehabilitation Philosophy */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0a2540]">
                  {t("Rehabilitation Philosophy", "पुनर्वास दर्शन")}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t(
                    "We do not treat symptoms in isolation. We evaluate whole-body biomechanics, identify root compensatory patterns, and prescribe targeted active exercises so the patient stays pain-free for the long term.",
                    "हम केवल दर्द दबाने का नहीं, बल्कि दर्द के मूल कारण को दूर करने का काम करते हैं ताकि मरीज भविष्य में भी पूरी तरह चुस्त और सक्रिय रहे।"
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Founder & Clinical Leadership Placeholders (Transparently marked) */}
        <section className="py-16 sm:py-20 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                {t("Leadership & Clinical Team", "संस्थापक व फिजियोथैरेपी टीम")}
              </span>

              <h2 className="text-3xl font-extrabold text-[#0a2540] mt-3">
                {t("Clinical Transparency & Governance", "क्लिनिकल पारदर्शिता व नेतृत्व")}
              </h2>

              <p className="text-slate-500 text-sm mt-2">
                {t(
                  "Sankalp Foundation operates under strict medical transparency. Below are the reserved profiles for our clinical heads.",
                  "संकल्प फाउंडेशन पूर्ण चिकित्सीय पारदर्शिता के साथ कार्य करता है। आधिकारिक विवरण नीचे आरक्षित हैं।"
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Founder Placeholder */}
              <div className="p-6 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50 space-y-3">
                <div className="flex items-center gap-2 text-teal-800 text-xs font-bold uppercase">
                  <Users className="w-4 h-4" />
                  <span>{t("Founder & Managing Trustee", "संस्थापक एवं ट्रस्टी")}</span>
                </div>
                <h4 className="text-lg font-bold text-slate-800">
                  [Founder Information / संस्थापक विवरण]
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t(
                    "Dedicated profile reserved for Founder's bio, community vision, and social healthcare initiatives. Information will be updated upon official administrative submission.",
                    "संस्थापक की जीवनी, सामाजिक दृष्टि और स्वास्थ्य पहलों का विवरण क्लिनिक प्रबंधन द्वारा अनुमोदन उपरांत यहाँ प्रदर्शित किया जाएगा।"
                  )}
                </p>
                <div className="pt-2 text-[11px] text-teal-700 font-semibold">
                  • Verified Patna healthcare initiative
                </div>
              </div>

              {/* Lead Doctor Placeholder */}
              <div className="p-6 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50 space-y-3">
                <div className="flex items-center gap-2 text-teal-800 text-xs font-bold uppercase">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t("Senior Consultant Physiotherapist", "वरिष्ठ कंसल्टेंट फिजियोथैरेपिस्ट")}</span>
                </div>
                <h4 className="text-lg font-bold text-slate-800">
                  [Doctor Credentials / डॉक्टर योग्यता व अनुभव]
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t(
                    "Designation: BPT, MPT / Certified Rehabilitation Specialist. Full clinical degrees, registered council affiliations, and specializations will be displayed once verified.",
                    "डिग्री (BPT, MPT), काउंसिल रजिस्ट्रेशन और स्पेशलाइजेशन का विवरण क्लिनिक प्रबंधन द्वारा आधिकारिक सत्यापन के पश्चात यहाँ उपलब्ध होगा।"
                  )}
                </p>
                <div className="pt-2 text-[11px] text-teal-700 font-semibold">
                  • In-person clinical assessment available daily
                </div>
              </div>
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

export default function AboutPage() {
  return (
    <LanguageProvider>
      <AboutContent />
    </LanguageProvider>
  );
}
