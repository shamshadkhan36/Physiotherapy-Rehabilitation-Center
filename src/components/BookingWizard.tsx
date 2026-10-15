"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  MessageCircle,
  Printer,
  Sparkles,
  MapPin,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useLanguage } from "./LanguageContext";
import { CLINIC_INFO } from "@/lib/content";

interface SlotItem {
  time: string;
  available: boolean;
  reason: string;
}

const TREATMENTS_LIST = [
  {
    id: "special-offer-50",
    nameEn: "Special Physiotherapy Session (Only ₹50)",
    nameHi: "विशेष फिजियोथैरेपी सेवा (मात्र ₹50/-)",
    badge: "Special ₹50 Offer",
    price: "₹50",
  },
  {
    id: "cervical-pain",
    nameEn: "Cervical Pain & Neck Stiffness",
    nameHi: "गर्दन का दर्द व अकड़न (Cervical Pain)",
    price: "Standard",
  },
  {
    id: "back-pain-sciatica",
    nameEn: "Back Pain & Sciatica (कमर दर्द व सियाटिका)",
    nameHi: "कमर का दर्द व सियाटिका (Sciatica)",
    price: "Standard",
  },
  {
    id: "knee-pain-arthritis",
    nameEn: "Knee Pain & Arthritis (घुटनों का दर्द व गठिया)",
    nameHi: "घुटनों का दर्द व गठिया (Arthritis)",
    price: "Standard",
  },
  {
    id: "paralysis-facial-palsy",
    nameEn: "Paralysis & Facial Palsy Neuro-Rehab",
    nameHi: "फालिस, लकवा एवं चेहरे का फालिस (Neuro-Rehab)",
    price: "Specialized",
  },
  {
    id: "frozen-shoulder",
    nameEn: "Frozen Shoulder (कंधे का जाम होना)",
    nameHi: "कंधे का दर्द एवं कंधे का जाम होना",
    price: "Standard",
  },
  {
    id: "post-fracture-stiffness",
    nameEn: "Post-Fracture Joint Stiffness (फ्रेक्चर के बाद)",
    nameHi: "फ्रेक्चर के बाद जोड़ों का जाम होना",
    price: "Standard",
  },
  {
    id: "post-op-rehab",
    nameEn: "Post-Operative Rehabilitation (ऑपरेशन के बाद)",
    nameHi: "ऑपरेशन के बाद फिजियोथैरेपी पुनर्वास",
    price: "Specialized",
  },
  {
    id: "heel-pain",
    nameEn: "Heel Pain & Plantar Fasciitis (एड़ी का दर्द)",
    nameHi: "एड़ी का दर्द (Heel Pain)",
    price: "Standard",
  },
  {
    id: "tennis-elbow",
    nameEn: "Tennis Elbow (टेनिस एल्बो)",
    nameHi: "टेनिस एल्बो (Tennis Elbow)",
    price: "Standard",
  },
  {
    id: "muscle-strain",
    nameEn: "Muscle Pain & Strain (मांसपेशियों का खिंचाव)",
    nameHi: "मांसपेशियों का दर्द व खिंचाव",
    price: "Standard",
  },
  {
    id: "polio-rehab",
    nameEn: "Poliomyelitis Rehabilitation (पोलियो पुनर्वास)",
    nameHi: "पोलियोमाइलाइटिस पुनर्वास",
    price: "Specialized",
  },
  {
    id: "general-consultation",
    nameEn: "General Physiotherapy Consultation",
    nameHi: "सामान्य फिजियोथैरेपी परामर्श",
    price: "Standard",
  },
];

export default function BookingWizard() {
  const { lang, t } = useLanguage();
  const searchParams = useSearchParams();

  // Step state (1 to 5)
  const [step, setStep] = useState(1);

  // Form states
  const [selectedTreatment, setSelectedTreatment] = useState(
    searchParams.get("treatment") === "special-offer-50" || searchParams.get("offer") === "50"
      ? TREATMENTS_LIST[0].nameEn
      : TREATMENTS_LIST[0].nameEn
  );

  // Format today's date YYYY-MM-DD
  const getTodayDateStr = () => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  };

  const [selectedDate, setSelectedDate] = useState(getTodayDateStr());
  const [selectedSlot, setSelectedSlot] = useState("");

  // Slots fetching
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [morningSlots, setMorningSlots] = useState<SlotItem[]>([]);
  const [eveningSlots, setEveningSlots] = useState<SlotItem[]>([]);
  const [isDateBlocked, setIsDateBlocked] = useState(false);

  // Patient info
  const [patientName, setPatientName] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"Male" | "Female" | "Other">("Male");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  // Handle URL param pre-selection
  useEffect(() => {
    const trParam = searchParams.get("treatment");
    const offerParam = searchParams.get("offer");
    if (offerParam === "50" || trParam === "special-offer-50") {
      setSelectedTreatment(TREATMENTS_LIST[0].nameEn);
    } else if (trParam) {
      const match = TREATMENTS_LIST.find((t) => t.id === trParam);
      if (match) setSelectedTreatment(match.nameEn);
    }
  }, [searchParams]);

  // Fetch slots whenever selectedDate changes
  useEffect(() => {
    if (!selectedDate) return;

    let isMounted = true;
    setLoadingSlots(true);
    setSelectedSlot("");

    fetch(`/api/slots?date=${selectedDate}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.error) {
          setIsDateBlocked(true);
          setMorningSlots([]);
          setEveningSlots([]);
        } else {
          setIsDateBlocked(data.isDateBlocked);
          setMorningSlots(data.morningSlots || []);
          setEveningSlots(data.eveningSlots || []);
        }
      })
      .catch((err) => {
        console.error("Error loading slots:", err);
      })
      .finally(() => {
        if (isMounted) setLoadingSlots(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedDate]);

  // Submit appointment
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!patientName.trim()) {
      setErrorMsg(t("Please enter patient's full name.", "कृपया मरीज का पूरा नाम दर्ज करें।"));
      return;
    }

    const cleanMobile = mobile.replace(/\D/g, "");
    if (cleanMobile.length < 10) {
      setErrorMsg(
        t(
          "Please enter a valid 10-digit mobile number.",
          "कृपया वैध 10-अंकों का मोबाइल नंबर दर्ज करें।"
        )
      );
      return;
    }

    if (!age || parseInt(age, 10) <= 0) {
      setErrorMsg(t("Please enter a valid age.", "कृपया मरीज की सही उम्र दर्ज करें।"));
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName,
          mobile: cleanMobile,
          age: parseInt(age, 10),
          gender,
          email,
          treatment: selectedTreatment,
          date: selectedDate,
          timeSlot: selectedSlot,
          notes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to book appointment");
      }

      setConfirmedBooking(data.appointment);
      setStep(5);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // Confetti is optional visual flair
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to book. Please choose another time slot.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Next and Prev handlers
  const handleNextFromTreatment = () => {
    if (!selectedTreatment) return;
    setStep(2);
  };

  const handleNextFromDate = () => {
    if (!selectedDate) return;
    setStep(3);
  };

  const handleNextFromSlot = () => {
    if (!selectedSlot) return;
    setStep(4);
  };

  // WhatsApp confirmation url builder
  const getConfirmationWhatsAppUrl = () => {
    if (!confirmedBooking) return "#";
    const text = `Hello Sankalp Foundation Patna,
I have booked a physiotherapy appointment.

*Appointment ID:* ${confirmedBooking.id}
*Patient Name:* ${confirmedBooking.patientName}
*Treatment:* ${confirmedBooking.treatment}
*Date:* ${confirmedBooking.date}
*Time:* ${confirmedBooking.timeSlot}
*Clinic Address:* ${CLINIC_INFO.addressEn}

Please confirm my appointment. Thank you!`;

    return `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-card border border-slate-200 overflow-hidden max-w-3xl mx-auto">
      {/* Top Wizard Progress Bar */}
      <div className="bg-[#0a2540] text-white p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-teal-500/20 text-teal-300">
              <CalendarIcon className="w-5 h-5 text-teal-400" />
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                {t("Online Appointment Booking", "ऑनलाइन अपॉइंटमेंट बुकिंग")}
              </h2>
              <p className="text-xs text-slate-300">
                {t(
                  "Book your visit in 4 simple steps • Patna Clinic",
                  "4 आसान चरणों में अपॉइंटमेंट बुक करें • पटना क्लिनिक"
                )}
              </p>
            </div>
          </div>

          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-900 border border-teal-700 text-teal-300">
            {step === 5 ? t("Confirmed", "कन्फर्म") : `${t("Step", "चरण")} ${step} / 4`}
          </span>
        </div>

        {/* Step indicator pills */}
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          {[
            { num: 1, labelEn: "Treatment", labelHi: "उपचार" },
            { num: 2, labelEn: "Date", labelHi: "तारीख" },
            { num: 3, labelEn: "Time Slot", labelHi: "समय" },
            { num: 4, labelEn: "Details", labelHi: "विवरण" },
          ].map((item) => (
            <div
              key={item.num}
              className={`py-1.5 px-1 rounded-md text-[11px] font-semibold transition-all ${
                step === item.num
                  ? "bg-teal-500 text-white shadow-sm"
                  : step > item.num
                  ? "bg-teal-900/80 text-teal-300"
                  : "bg-slate-800 text-slate-400"
              }`}
            >
              {item.num}. {t(item.labelEn, item.labelHi)}
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {/* ================= STEP 1: SELECT TREATMENT ================= */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-[#0a2540] flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-teal-600" />
                <span>{t("Select Required Treatment / Therapy", "उपचार या थेरेपी का चयन करें")}</span>
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                {t(
                  "Choose the reason for your visit or select the ₹50 special introductory consultation.",
                  "अपनी परेशानी या जरूरत के अनुसार विकल्प चुनें अथवा ₹50 का विशेष परिचयात्मक सत्र चुनें।"
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-1">
              {TREATMENTS_LIST.map((tr) => {
                const isSelected = selectedTreatment === tr.nameEn;
                const isSpecial50 = tr.id === "special-offer-50";

                return (
                  <button
                    key={tr.id}
                    type="button"
                    onClick={() => setSelectedTreatment(tr.nameEn)}
                    className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                      isSelected
                        ? "border-teal-600 bg-teal-50/70 shadow-sm ring-2 ring-teal-500/20"
                        : isSpecial50
                        ? "border-amber-300 bg-amber-50/50 hover:border-amber-400"
                        : "border-slate-200 hover:border-teal-300 hover:bg-slate-50"
                    }`}
                  >
                    <div>
                      {isSpecial50 && (
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-400 text-amber-950 mb-1.5">
                          ⭐ {t("Special ₹50 Offer", "विशेष ₹50 सेवा")}
                        </span>
                      )}
                      <p className="font-bold text-sm text-[#0a2540]">
                        {lang === "hi" ? tr.nameHi : tr.nameEn}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5 font-hindi">
                        {lang === "hi" ? tr.nameEn : tr.nameHi}
                      </p>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-semibold text-teal-700">
                        {isSpecial50 ? "₹50 Only" : t("Professional Assessment", "विशेषज्ञ जांच")}
                      </span>
                      {isSelected ? (
                        <span className="w-4 h-4 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </span>
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-slate-300"></span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleNextFromTreatment}
                disabled={!selectedTreatment}
                className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm flex items-center gap-2 shadow-sm transition-all disabled:opacity-50"
              >
                <span>{t("Continue to Date Selection", "तारीख चुनने के लिए आगे बढ़ें")}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: SELECT DATE ================= */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-[#0a2540] flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-teal-600" />
                <span>{t("Select Appointment Date", "अपॉइंटमेंट की तारीख चुनें")}</span>
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                {t("Selected Treatment:", "चुना गया उपचार:")}{" "}
                <strong className="text-teal-700">{selectedTreatment}</strong>
              </p>
            </div>

            {/* Quick date shortcuts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[0, 1, 2, 3].map((daysAhead) => {
                const target = new Date();
                target.setDate(target.getDate() + daysAhead);
                const dateStr = target.toISOString().split("T")[0];
                const isSelected = selectedDate === dateStr;

                const dayName = target.toLocaleDateString("en-IN", { weekday: "short" });
                const dateNum = target.getDate();
                const monthName = target.toLocaleDateString("en-IN", { month: "short" });

                return (
                  <button
                    key={dateStr}
                    type="button"
                    onClick={() => setSelectedDate(dateStr)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      isSelected
                        ? "border-teal-600 bg-teal-50 text-teal-900 shadow-sm ring-2 ring-teal-500/20 font-bold"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="text-xs uppercase text-slate-500 font-semibold">{dayName}</div>
                    <div className="text-2xl font-black text-[#0a2540] my-0.5">{dateNum}</div>
                    <div className="text-xs text-slate-500">{monthName}</div>
                  </button>
                );
              })}
            </div>

            {/* Custom Date Picker */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {t("Or Choose Any Upcoming Date:", "अथवा कोई अन्य तारीख चुनें:")}
              </label>
              <input
                type="date"
                min={getTodayDateStr()}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3 bg-white border border-slate-300 rounded-lg text-slate-800 font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-sm flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{t("Back", "पीछे")}</span>
              </button>

              <button
                type="button"
                onClick={handleNextFromDate}
                disabled={!selectedDate}
                className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm flex items-center gap-2 shadow-sm transition-all disabled:opacity-50"
              >
                <span>{t("Check Available Slots", "समय स्लॉट देखें")}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: SELECT TIME SLOT ================= */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-[#0a2540] flex items-center gap-2">
                <Clock className="w-5 h-5 text-teal-600" />
                <span>{t("Select Available Time Slot", "उपलब्ध समय स्लॉट चुनें")}</span>
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                {t("Date:", "तारीख:")}{" "}
                <strong className="text-teal-700">{selectedDate}</strong> •{" "}
                {t("Clinic Timings: Morning 8 AM – 1 PM & Evening 4 PM – 8 PM", "क्लिनिक समय: सुबह 8 AM – 1 PM एवं शाम 4 PM – 8 PM")}
              </p>
            </div>

            {loadingSlots ? (
              <div className="py-12 text-center text-slate-500 space-y-2">
                <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-sm font-medium">{t("Checking slot availability...", "स्लॉट उपलब्धता जांची जा रही है...")}</p>
              </div>
            ) : isDateBlocked ? (
              <div className="p-6 rounded-xl bg-amber-50 border border-amber-200 text-center space-y-3">
                <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
                <h4 className="font-bold text-amber-900">{t("Clinic Holiday / Date Blocked", "इस तारीख को क्लिनिक अवकाश है")}</h4>
                <p className="text-xs text-amber-800">
                  {t(
                    "Appointments are closed for this date. Please select another date.",
                    "इस तारीख के लिए अपॉइंटमेंट बंद हैं। कृपया दूसरी तारीख चुनें।"
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg text-xs font-bold"
                >
                  {t("Change Date", "तारीख बदलें")}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Morning Slots (8:00 AM – 1:00 PM) */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-black uppercase tracking-wider text-teal-800 bg-teal-100 px-2.5 py-1 rounded-md">
                      {t("Morning Shift (8:00 AM – 1:00 PM)", "सुबह की पाली (8:00 AM – 1:00 PM)")}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                    {morningSlots.map((s) => {
                      const isSelected = selectedSlot === s.time;
                      return (
                        <button
                          key={s.time}
                          type="button"
                          disabled={!s.available}
                          onClick={() => setSelectedSlot(s.time)}
                          className={`py-2.5 px-2 rounded-lg text-xs font-bold transition-all text-center ${
                            isSelected
                              ? "bg-teal-600 text-white shadow-md ring-2 ring-teal-400"
                              : s.available
                              ? "bg-white border border-slate-300 text-slate-800 hover:border-teal-500 hover:bg-teal-50"
                              : "bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed line-through"
                          }`}
                        >
                          {s.time}
                          {!s.available && (
                            <span className="block text-[9px] font-normal no-underline text-rose-500 mt-0.5">
                              {t("Booked", "बुक है")}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Evening Slots (4:00 PM – 8:00 PM) */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-black uppercase tracking-wider text-indigo-800 bg-indigo-100 px-2.5 py-1 rounded-md">
                      {t("Evening Shift (4:00 PM – 8:00 PM)", "शाम की पाली (4:00 PM – 8:00 PM)")}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {eveningSlots.map((s) => {
                      const isSelected = selectedSlot === s.time;
                      return (
                        <button
                          key={s.time}
                          type="button"
                          disabled={!s.available}
                          onClick={() => setSelectedSlot(s.time)}
                          className={`py-2.5 px-2 rounded-lg text-xs font-bold transition-all text-center ${
                            isSelected
                              ? "bg-teal-600 text-white shadow-md ring-2 ring-teal-400"
                              : s.available
                              ? "bg-white border border-slate-300 text-slate-800 hover:border-teal-500 hover:bg-teal-50"
                              : "bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed line-through"
                          }`}
                        >
                          {s.time}
                          {!s.available && (
                            <span className="block text-[9px] font-normal no-underline text-rose-500 mt-0.5">
                              {t("Booked", "बुक है")}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-sm flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{t("Back", "पीछे")}</span>
              </button>

              <button
                type="button"
                onClick={handleNextFromSlot}
                disabled={!selectedSlot}
                className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm flex items-center gap-2 shadow-sm transition-all disabled:opacity-50"
              >
                <span>{t("Enter Patient Details", "मरीज का विवरण भरें")}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 4: PATIENT DETAILS ================= */}
        {step === 4 && (
          <form onSubmit={handleBookingSubmit} className="space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-[#0a2540] flex items-center gap-2">
                <User className="w-5 h-5 text-teal-600" />
                <span>{t("Patient Information", "मरीज की जानकारी")}</span>
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                {t(
                  "Please provide accurate details so clinic staff can prepare your record and confirm via WhatsApp/Call.",
                  "कृपया सही जानकारी दें ताकि क्लिनिक स्टाफ आपका रिकॉर्ड तैयार कर सके और पुष्टि कर सके।"
                )}
              </p>
            </div>

            {/* Selected Summary Card */}
            <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-slate-500 block">{t("Treatment:", "उपचार:")}</span>
                <span className="font-bold text-teal-950 text-sm">{selectedTreatment}</span>
              </div>
              <div>
                <span className="text-slate-500 block">{t("Date & Time:", "तारीख व समय:")}</span>
                <span className="font-bold text-teal-950 text-sm">
                  {selectedDate} at {selectedSlot}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="text-xs font-bold text-teal-700 hover:underline"
              >
                {t("Change Slot", "समय बदलें")}
              </button>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {t("Patient Full Name *", "मरीज का पूरा नाम *")}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t("e.g. Ramesh Kumar", "उदा. रमेश कुमार")}
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              {/* Mobile Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {t("Mobile Number *", "मोबाइल नंबर *")}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3.5 text-xs font-bold text-slate-400">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="9876543210"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full pl-12 pr-3 py-3 bg-white border border-slate-300 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Age */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {t("Patient Age *", "मरीज की उम्र *")}
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  max={120}
                  placeholder="e.g. 52"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {t("Gender *", "लिंग *")}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Male", "Female", "Other"] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`py-2.5 rounded-lg text-xs font-bold border transition-colors ${
                        gender === g
                          ? "bg-teal-600 text-white border-teal-600"
                          : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {g === "Male"
                        ? t("Male", "पुरुष")
                        : g === "Female"
                        ? t("Female", "महिला")
                        : t("Other", "अन्य")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email (Optional) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {t("Email Address (Optional)", "ईमेल (वैकल्पिक)")}
                </label>
                <input
                  type="email"
                  placeholder="patient@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              {/* Problem / Symptoms Notes */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {t("Briefly describe pain or condition (Optional)", "अपनी समस्या या दर्द का संक्षिप्त विवरण (वैकल्पिक)")}
                </label>
                <textarea
                  rows={2}
                  placeholder={t(
                    "e.g. Knee pain while walking, past fracture, neck stiffness...",
                    "उदा. चलने में घुटने में दर्द, पुरानी चोट, गर्दन की अकड़न..."
                  )}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-800 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-sm flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{t("Back", "पीछे")}</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm flex items-center gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t("Confirming Booking...", "बुकिंग की जा रही है...")}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>{t("CONFIRM APPOINTMENT", "अपॉइंटमेंट कन्फर्म करें")}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* ================= STEP 5: APPOINTMENT CONFIRMATION ================= */}
        {step === 5 && confirmedBooking && (
          <div className="text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
            {/* Success icon */}
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner border-4 border-white ring-4 ring-emerald-100">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                ✓ {t("Booking Successful", "बुकिंग सफल")}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0a2540]">
                {t("Your appointment has been booked successfully.", "आपका अपॉइंटमेंट सफलतापूर्वक बुक हो गया है।")}
              </h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                {t(
                  "We look forward to welcoming you at Sankalp Foundation Patna. Please save your Appointment ID.",
                  "संकल्प फाउंडेशन पटना में आपका स्वागत है। कृपया अपना अपॉइंटमेंट आईडी सुरक्षित रखें।"
                )}
              </p>
            </div>

            {/* Printable Slip Card */}
            <div
              id="appointment-slip"
              className="bg-slate-50 rounded-2xl p-6 border-2 border-dashed border-teal-200 text-left max-w-lg mx-auto shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[10px] font-black uppercase text-teal-800 tracking-wider">
                    {CLINIC_INFO.nameEn}
                  </span>
                  <div className="text-xs text-slate-500">{CLINIC_INFO.centerTypeEn}</div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-semibold text-slate-500 block">
                    {t("Appointment ID", "अपॉइंटमेंट आईडी")}
                  </span>
                  <span className="text-base font-extrabold text-teal-700 tracking-wide font-mono">
                    {confirmedBooking.id}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-500 block text-[11px]">{t("Patient Name", "मरीज का नाम")}</span>
                  <strong className="text-slate-900">{confirmedBooking.patientName}</strong>
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px]">{t("Mobile Number", "मोबाइल नंबर")}</span>
                  <strong className="text-slate-900">+91 {confirmedBooking.mobile}</strong>
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px]">{t("Date & Slot", "तारीख व समय")}</span>
                  <strong className="text-teal-700">
                    {confirmedBooking.date} • {confirmedBooking.timeSlot}
                  </strong>
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px]">{t("Age / Gender", "उम्र / लिंग")}</span>
                  <strong className="text-slate-900">
                    {confirmedBooking.age} Yrs / {confirmedBooking.gender}
                  </strong>
                </div>

                <div className="col-span-2 pt-2 border-t border-slate-200">
                  <span className="text-slate-500 block text-[11px]">{t("Treatment", "उपचार")}</span>
                  <strong className="text-[#0a2540]">{confirmedBooking.treatment}</strong>
                </div>

                <div className="col-span-2">
                  <span className="text-slate-500 block text-[11px]">{t("Clinic Location", "क्लिनिक का पता")}</span>
                  <p className="text-xs text-slate-700 leading-snug">{CLINIC_INFO.addressEn}</p>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={getConfirmationWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{t("Confirm on WhatsApp", "व्हाट्सएप पर पुष्टि करें")}</span>
              </a>

              <a
                href={`tel:${CLINIC_INFO.phone1}`}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#0a2540] hover:bg-[#07192d] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4 text-teal-400" />
                <span>{t("Call Clinic", "क्लिनिक को कॉल करें")}</span>
              </a>

              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-sm flex items-center justify-center gap-2 transition-all"
              >
                <Printer className="w-4 h-4 text-slate-500" />
                <span>{t("Print Slip", "पर्ची प्रिंट करें")}</span>
              </button>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setConfirmedBooking(null);
                  setPatientName("");
                  setMobile("");
                  setNotes("");
                }}
                className="text-xs font-semibold text-teal-700 hover:underline"
              >
                + {t("Book Another Appointment", "दूसरा अपॉइंटमेंट बुक करें")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
