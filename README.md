# Sankalp Foundation — Physiotherapy & Rehabilitation Center, Patna

A modern, premium, accessible, and conversion-focused medical website built for **Sankalp Foundation Physiotherapy & Rehabilitation Center** in Bhupatipur, Patna, Bihar.

---

## 🏥 Clinical Information & Source of Truth

- **Organization Name:** Sankalp Foundation Physiotherapy & Rehabilitation Center  
  *(संकल्प फाउंडेशन फिजियोथैरेपी एंड रिहैबिलिटेशन सेंटर)*
- **Patna Clinic Location:**  
  Shakuntala Niwas, Surbhi Vihar, Gali No. 1, Bhupatipur, Near Krishi Anusandhan Kendra, Patna, Bihar – 800020  
  *(शकुंतला निवास, सुरभि विहार, गली नंबर - 1, भूपतिपुर, कृषि अनुसंधान केंद्र के पास, पटना – 800020)*
- **Contact Helplines:**  
  - `+91 9661980606`
  - `+91 7324010612`
- **WhatsApp Support:** `+91 9661980606`
- **Clinic Consultation Timings:**  
  - **Morning Shift:** 8:00 AM – 1:00 PM  
  - **Evening Shift:** 4:00 PM – 8:00 PM
- **Community Healthcare Initiative:**  
  **"Special Physiotherapy Service – Only ₹50"**  
  *(मात्र ₹50/- में विशेष फिजियोथैरेपी सेवा!)*
- **Motto / Promise:**  
  *"(संकल्प फाउंडेशन का वादा — पटना को बनाना है पूरी तरह दर्द-मुक्त)"*

---

## 🌟 Key Features

### 1. Authentic Visual Identity & Medical Aesthetics
- Crisp SVG vector reproduction of the official **Sankalp Foundation** logo (cupped hands supporting a caring family figure in deep navy `#0A2540` and medical teal `#0D9488`).
- High-contrast, clean typography optimized for elderly patients and family caregivers.
- Authentic brochure preview modal showing the original printed clinic leaflet for high local credibility.
- No artificial, generic template elements, exaggerated gradients, or false cure claims.

### 2. Complete English & Hindi (द्विभाषी) Language Engine
- Instant, persistent language switcher available in the top bar and mobile drawer.
- All 16 clinical conditions, 8 specialized therapies, trust badges, FAQs, and booking steps translated with natural Devanagari Hindi typography.

### 3. Online Appointment Booking System (5-Step Flow)
- **Step 1:** Select Treatment (including ₹50 Special Session, Spine, Knee, Neuro, Post-Op, Post-Fracture).
- **Step 2:** Interactive Date Picker (disables past dates and clinic holidays).
- **Step 3:** Slot Availability Engine (validates against database to prevent double bookings in Morning 8 AM – 1 PM and Evening 4 PM – 8 PM slots).
- **Step 4:** Patient Details (Name, 10-digit mobile phone, Age, Gender, optional email and symptom notes).
- **Step 5:** Instant Confirmation (Generates unique ID like `SKP-202610-XXXX`, celebratory confetti, printable slip, and **"Confirm on WhatsApp"** button with pre-filled message).

### 4. Direct WhatsApp Integration
- Floating WhatsApp button with pulsing unread indicator.
- Pre-filled WhatsApp messages for general inquiries, directions, and appointment confirmations.
- Sticky mobile bottom bar: `[ 📞 Call ]` `[ 💬 WhatsApp ]` `[ 📅 Book Appointment ]`.

### 5. Secure Medical SaaS Admin Portal (`/admin`)
- **Protected Access:** PIN-based authentication (Default PIN: `sankalp2026`).
- **Dashboard KPIs:** Today's Appointments, Upcoming, Pending Action, Confirmed, Completed.
- **Appointments Table:** Filter by status (Pending, Confirmed, Completed, Cancelled), filter by date, live patient search.
- **Interactive Actions:** One-click Confirm, Mark Done, Cancel, Reschedule date/time, Print slip, Call patient, and direct WhatsApp messaging.
- **Schedule Management:** Block specific dates / clinic holidays, manage morning and evening slots.
- **Data Export:** Instant CSV export for clinic records.

### 6. Local SEO & Medical Search Engine Optimization
- Canonical URLs, metadata titles, and keyword targeting (`Physiotherapy in Patna`, `Physiotherapy center in Bhupatipur`, `Rehabilitation center in Patna`).
- Structured Data: `MedicalBusiness` & `PhysiotherapyClinic` JSON-LD schema with clinic geocoordinates, opening hours, address, and telephonic identifiers.
- Auto-generated `sitemap.xml` and `robots.txt`.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom medical theme palette
- **Icons:** Lucide React
- **Celebration Effects:** Canvas-Confetti
- **Storage:** Persistent JSON database (`data/appointments.json`, `data/settings.json`)

---

## 🚀 Running the Project

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Launch
```bash
npm run build
npm run start
```

### Accessing the Admin Portal
1. Navigate to [http://localhost:3000/admin](http://localhost:3000/admin)
2. Enter the PIN: `sankalp2026`
3. Manage bookings, schedule clinic holidays, and export records.

---

## 📁 Project Structure

```
├── data/
│   ├── appointments.json          # Persistent appointment store
│   └── settings.json              # Clinic settings & holiday blocks
├── public/
│   └── images/                    # Authentic clinic brochure & medical photos
├── src/
│   ├── app/
│   │   ├── about/page.tsx         # About Us & Clinical Philosophy
│   │   ├── admin/page.tsx         # Medical SaaS Admin Dashboard
│   │   ├── api/                   # Slots, Appointments, Admin login & Settings APIs
│   │   ├── book/page.tsx          # Dedicated 5-step booking page
│   │   ├── conditions/page.tsx    # 16 Conditions We Treat directory
│   │   ├── contact/page.tsx       # Contact, Map & Inquiry form
│   │   ├── services/page.tsx      # 8 Specialized Physiotherapy therapies
│   │   ├── team/page.tsx          # Clinical Team with transparent placeholders
│   │   ├── globals.css            # Base styles & accessibility focus rings
│   │   ├── layout.tsx             # Root layout with Schema.org JSON-LD
│   │   ├── page.tsx               # Home Page
│   │   ├── robots.ts              # Robots.txt generator
│   │   └── sitemap.ts             # Sitemap.xml generator
│   ├── components/
│   │   ├── BookingWizard.tsx      # 5-step interactive appointment wizard
│   │   ├── BrochurePreviewSection.tsx # Authentic brochure preview & zoom
│   │   ├── ConditionsSection.tsx  # Conditions filterable cards & modals
│   │   ├── FaqSection.tsx         # Interactive bilingual FAQs
│   │   ├── FloatingActions.tsx    # Floating WhatsApp & Call buttons
│   │   ├── Footer.tsx             # Medical footer with disclaimer
│   │   ├── HeroSection.tsx        # High-impact medical hero
│   │   ├── HowItWorksSection.tsx  # 4-step rehabilitation process
│   │   ├── LanguageContext.tsx    # English/Hindi language provider
│   │   ├── LocationSection.tsx    # Google Maps & Bhupatipur address
│   │   ├── MobileStickyBar.tsx    # Sticky mobile action bar
│   │   ├── Navbar.tsx             # Navigation with phone & language toggles
│   │   ├── ReviewsSection.tsx     # Transparent patient review cards
│   │   ├── SankalpLogo.tsx        # Vector SVG matching brochure emblem
│   │   ├── ServicesSection.tsx    # 8 services showcase cards
│   │   ├── SpecialOfferSection.tsx# ₹50 Special Session banner
│   │   └── TrustSection.tsx       # Trust indicators without false claims
│   └── lib/
│       ├── content.ts             # Comprehensive bilingual content dictionary
│       └── db.ts                  # Backend file database with slot locking
```
