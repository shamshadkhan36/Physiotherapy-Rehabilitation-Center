import { NextRequest, NextResponse } from "next/server";
import { getAppointments, createAppointment } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const date = searchParams.get("date");
    const search = searchParams.get("search")?.toLowerCase().trim();

    let list = getAppointments();

    const todayStr = new Date().toISOString().split("T")[0];

    const stats = {
      total: list.length,
      today: list.filter((a) => a.date === todayStr).length,
      pending: list.filter((a) => a.status === "pending").length,
      confirmed: list.filter((a) => a.status === "confirmed").length,
      completed: list.filter((a) => a.status === "completed").length,
      cancelled: list.filter((a) => a.status === "cancelled").length,
    };

    if (status && status !== "all") {
      list = list.filter((a) => a.status === status);
    }

    if (date) {
      list = list.filter((a) => a.date === date);
    }

    if (search) {
      list = list.filter(
        (a) =>
          a.patientName.toLowerCase().includes(search) ||
          a.mobile.includes(search) ||
          a.id.toLowerCase().includes(search) ||
          a.treatment.toLowerCase().includes(search)
      );
    }

    return NextResponse.json({ appointments: list, stats });
  } catch (error) {
    console.error("Error retrieving appointments:", error);
    return NextResponse.json({ error: "Failed to retrieve appointments" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { patientName, mobile, age, gender, email, treatment, date, timeSlot, notes } = body;

    // Strict validation
    if (!patientName || !patientName.trim()) {
      return NextResponse.json({ error: "Patient name is required." }, { status: 400 });
    }

    const cleanMobile = (mobile || "").replace(/\D/g, "");
    if (!cleanMobile || cleanMobile.length < 10) {
      return NextResponse.json(
        { error: "Please provide a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    if (!treatment) {
      return NextResponse.json({ error: "Please select a treatment." }, { status: 400 });
    }

    if (!date) {
      return NextResponse.json({ error: "Please select an appointment date." }, { status: 400 });
    }

    if (!timeSlot) {
      return NextResponse.json({ error: "Please select an appointment time slot." }, { status: 400 });
    }

    const parsedAge = parseInt(age, 10);
    if (isNaN(parsedAge) || parsedAge <= 0 || parsedAge > 120) {
      return NextResponse.json({ error: "Please provide a valid age." }, { status: 400 });
    }

    const result = createAppointment({
      patientName: patientName.trim(),
      mobile: cleanMobile,
      age: parsedAge,
      gender: gender || "Other",
      email: (email || "").trim(),
      treatment,
      date,
      timeSlot,
      notes: (notes || "").trim(),
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 409 });
    }

    return NextResponse.json({ success: true, appointment: result.appointment }, { status: 201 });
  } catch (error) {
    console.error("Error booking appointment:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while booking. Please try again." },
      { status: 500 }
    );
  }
}
