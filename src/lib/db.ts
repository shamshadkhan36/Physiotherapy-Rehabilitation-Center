import fs from "fs";
import path from "path";

export interface Appointment {
  id: string;
  patientName: string;
  mobile: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  email?: string;
  treatment: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "09:30 AM"
  notes?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface ClinicSettings {
  adminPin: string;
  morningSlots: string[];
  eveningSlots: string[];
  blockedDates: string[];
  blockedSlots: Record<string, string[]>; // date -> slots
  consultationFee: number;
  specialOfferFee: number;
}

const DATA_DIR = path.join(process.cwd(), "data");
const APPOINTMENTS_FILE = path.join(DATA_DIR, "appointments.json");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");

const DEFAULT_MORNING_SLOTS = [
  "08:00 AM",
  "08:30 AM",
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
];

const DEFAULT_EVENING_SLOTS = [
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
  "07:00 PM",
  "07:30 PM",
];

const DEFAULT_SETTINGS: ClinicSettings = {
  adminPin: "sankalp2026",
  morningSlots: DEFAULT_MORNING_SLOTS,
  eveningSlots: DEFAULT_EVENING_SLOTS,
  blockedDates: [],
  blockedSlots: {},
  consultationFee: 300,
  specialOfferFee: 50,
};

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(SETTINGS_FILE)) {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(DEFAULT_SETTINGS, null, 2), "utf-8");
  }

  if (!fs.existsSync(APPOINTMENTS_FILE)) {
    // Seed initial realistic data for demonstration
    const sampleAppointments: Appointment[] = [
      {
        id: "SKP-202610-8421",
        patientName: "Rameshwar Prasad Singh",
        mobile: "9431012345",
        age: 62,
        gender: "Male",
        treatment: "Back Pain & Sciatica (कमर दर्द व सियाटिका)",
        date: new Date().toISOString().split("T")[0],
        timeSlot: "09:30 AM",
        notes: "Severe lower back stiffness radiating to left leg for 3 months.",
        status: "confirmed",
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "SKP-202610-7219",
        patientName: "Shanti Devi",
        mobile: "9835098765",
        age: 58,
        gender: "Female",
        treatment: "Knee Pain & Arthritis (घुटनों का दर्द व गठिया)",
        date: new Date().toISOString().split("T")[0],
        timeSlot: "11:00 AM",
        notes: "Difficulty walking stairs, bilateral knee crepitus.",
        status: "pending",
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "SKP-202610-3104",
        patientName: "Amit Kumar Sinha",
        mobile: "7004123456",
        age: 38,
        gender: "Male",
        treatment: "Cervical Pain (गर्दन का दर्द - IT Neck Strain)",
        date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
        timeSlot: "05:00 PM",
        notes: "Neck spasm and shoulder tightness from prolonged desk posture.",
        status: "confirmed",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "SKP-202610-1598",
        patientName: "Rajesh Ranjan",
        mobile: "9122334455",
        age: 49,
        gender: "Male",
        treatment: "Post-Fracture Stiffness (फ्रेक्चर के बाद जोड़ों का जाम होना)",
        date: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
        timeSlot: "10:00 AM",
        notes: "Right wrist immobilization stiffness post plaster removal.",
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(sampleAppointments, null, 2), "utf-8");
  }
}

export function getSettings(): ClinicSettings {
  ensureDataDir();
  try {
    const raw = fs.readFileSync(SETTINGS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: Partial<ClinicSettings>): ClinicSettings {
  ensureDataDir();
  const current = getSettings();
  const updated = { ...current, ...settings };
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(updated, null, 2), "utf-8");
  return updated;
}

export function getAppointments(): Appointment[] {
  ensureDataDir();
  try {
    const raw = fs.readFileSync(APPOINTMENTS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveAppointments(list: Appointment[]) {
  ensureDataDir();
  fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(list, null, 2), "utf-8");
}

export function isSlotAvailable(date: string, timeSlot: string, excludeId?: string): boolean {
  const settings = getSettings();

  // If entire date is blocked
  if (settings.blockedDates.includes(date)) {
    return false;
  }

  // If specific slot on this date is blocked by admin
  const dateBlockedSlots = settings.blockedSlots[date] || [];
  if (dateBlockedSlots.includes(timeSlot)) {
    return false;
  }

  // Check existing appointments that are active (pending or confirmed)
  const appointments = getAppointments();
  const collision = appointments.find(
    (app) =>
      app.date === date &&
      app.timeSlot === timeSlot &&
      (app.status === "pending" || app.status === "confirmed") &&
      app.id !== excludeId
  );

  return !collision;
}

export function createAppointment(data: Omit<Appointment, "id" | "createdAt" | "updatedAt" | "status">): {
  success: boolean;
  appointment?: Appointment;
  error?: string;
} {
  if (!isSlotAvailable(data.date, data.timeSlot)) {
    return {
      success: false,
      error: "This time slot has just been booked or is unavailable. Please choose another slot.",
    };
  }

  const appointments = getAppointments();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const now = new Date();
  const yearMonth = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}`;
  const id = `SKP-${yearMonth}-${randomSuffix}`;

  const newAppointment: Appointment = {
    id,
    ...data,
    status: "pending",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };

  appointments.unshift(newAppointment);
  saveAppointments(appointments);

  return { success: true, appointment: newAppointment };
}

export function updateAppointmentStatus(
  id: string,
  status: Appointment["status"],
  rescheduleDate?: string,
  rescheduleTime?: string
): { success: boolean; appointment?: Appointment; error?: string } {
  const appointments = getAppointments();
  const index = appointments.findIndex((a) => a.id === id);

  if (index === -1) {
    return { success: false, error: "Appointment not found." };
  }

  const existing = appointments[index];

  if (rescheduleDate && rescheduleTime) {
    if (!isSlotAvailable(rescheduleDate, rescheduleTime, id)) {
      return {
        success: false,
        error: "Selected reschedule slot is not available. Please pick another time.",
      };
    }
    existing.date = rescheduleDate;
    existing.timeSlot = rescheduleTime;
  }

  existing.status = status;
  existing.updatedAt = new Date().toISOString();

  appointments[index] = existing;
  saveAppointments(appointments);

  return { success: true, appointment: existing };
}

export function deleteAppointment(id: string): boolean {
  const appointments = getAppointments();
  const filtered = appointments.filter((a) => a.id !== id);
  if (filtered.length === appointments.length) return false;
  saveAppointments(filtered);
  return true;
}
