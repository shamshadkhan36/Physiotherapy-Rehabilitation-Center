import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0a2540",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sankalpfoundationpatna.com"),
  title: "Sankalp Foundation | Physiotherapy & Rehabilitation Center Patna",
  description: "Professional Physiotherapy & Rehabilitation Center in Bhupatipur, Patna. Expert care for Back Pain, Knee Pain, Cervical, Paralysis, Sciatica, and Post-Op Rehab. Special session at only ₹50.",
  keywords: [
    "Physiotherapy in Patna",
    "Physiotherapy center in Patna",
    "Physiotherapist in Bhupatipur",
    "Physiotherapy near Bhupatipur",
    "Physiotherapy near Mithapur Patna",
    "Physiotherapy near Sipara",
    "Rehabilitation center in Patna",
    "Back pain physiotherapy Patna",
    "Knee pain physiotherapy Patna",
    "Cervical pain physiotherapy Patna",
    "Sciatica physiotherapy Patna",
    "Paralysis rehabilitation Patna",
    "Sankalp Foundation Patna",
  ],
  authors: [{ name: "Sankalp Foundation" }],
  openGraph: {
    title: "Sankalp Foundation | Physiotherapy & Rehabilitation Center Patna",
    description: "Professional Physiotherapy & Rehabilitation Care in Patna. Special Physiotherapy Service at ₹50. Book your appointment today.",
    type: "website",
    locale: "en_IN",
    url: "https://sankalpfoundationpatna.com",
    siteName: "Sankalp Foundation Physiotherapy & Rehabilitation Center",
    images: [
      {
        url: "/images/hero-rehab.jpg",
        width: 1200,
        height: 630,
        alt: "Sankalp Foundation Physiotherapy & Rehabilitation Center Patna",
      },
    ],
  },
  alternates: {
    canonical: "https://sankalpfoundationpatna.com",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": ["MedicalBusiness", "PhysiotherapyClinic"],
  name: "Sankalp Foundation Physiotherapy & Rehabilitation Center",
  alternateName: "संकल्प फाउंडेशन फिजियोथैरेपी एंड रिहैबिलिटेशन सेंटर",
  url: "https://sankalpfoundationpatna.com",
  logo: "https://sankalpfoundationpatna.com/images/brochure.jpg",
  image: "https://sankalpfoundationpatna.com/images/hero-rehab.jpg",
  description:
    "Professional physiotherapy and rehabilitation center in Bhupatipur, Patna. Expert care for Back Pain, Cervical, Knee Pain, Sciatica, Paralysis, and Post-Fracture Stiffness. Introductory session at ₹50.",
  telephone: ["+919661980606", "+917324010612"],
  priceRange: "₹50 - ₹500",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shakuntala Niwas, Surbhi Vihar, Gali No. 1, Bhupatipur, Near Krishi Anusandhan Kendra",
    addressLocality: "Patna",
    addressRegion: "Bihar",
    postalCode: "800020",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 25.5786,
    longitude: 85.1276,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "13:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "16:00",
      closes: "20:00",
    },
  ],
  medicalSpecialty: [
    "Physiotherapy",
    "Orthopedic",
    "Neurologic",
    "Rehabilitation",
  ],
  availableService: [
    { "@type": "MedicalProcedure", name: "Orthopedic Physiotherapy" },
    { "@type": "MedicalProcedure", name: "Neurological Rehabilitation" },
    { "@type": "MedicalProcedure", name: "Pain Management & Electrotherapy" },
    { "@type": "MedicalProcedure", name: "Post-Fracture Joint Mobilization" },
    { "@type": "MedicalProcedure", name: "Post-Operative Rehabilitation" },
    { "@type": "MedicalProcedure", name: "Mobility & Exercise Therapy" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Sans+Devanagari:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}
