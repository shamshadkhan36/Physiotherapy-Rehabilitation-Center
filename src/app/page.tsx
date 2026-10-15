"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustSection from "@/components/TrustSection";
import SpecialOfferSection from "@/components/SpecialOfferSection";
import ConditionsSection from "@/components/ConditionsSection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import BrochurePreviewSection from "@/components/BrochurePreviewSection";
import ReviewsSection from "@/components/ReviewsSection";
import FaqSection from "@/components/FaqSection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import FloatingActions from "@/components/FloatingActions";
import { LanguageProvider } from "@/components/LanguageContext";

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-white text-slate-800">
        <Navbar />
        <main className="flex-1">
          <HeroSection />
          <TrustSection />
          <SpecialOfferSection />
          <ConditionsSection limit={8} />
          <ServicesSection limit={6} />
          <HowItWorksSection />
          <BrochurePreviewSection />
          <ReviewsSection />
          <FaqSection />
          <LocationSection />
        </main>
        <Footer />
        <MobileStickyBar />
        <FloatingActions />
      </div>
    </LanguageProvider>
  );
}
