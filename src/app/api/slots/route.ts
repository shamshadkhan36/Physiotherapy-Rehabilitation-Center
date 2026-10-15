import { NextRequest, NextResponse } from "next/server";
import { getSettings, getAppointments } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json({ error: "Date parameter is required" }, { status: 400 });
    }

    const settings = getSettings();
    const appointments = getAppointments();

    const isDateBlocked = settings.blockedDates.includes(date);
    const blockedSlotsForDate = settings.blockedSlots[date] || [];

    // Find all active booked slots on this date
    const bookedSlots = appointments
      .filter(
        (app) =>
          app.date === date &&
          (app.status === "pending" || app.status === "confirmed")
      )
      .map((app) => app.timeSlot);

    const mapSlot = (timeSlot: string) => {
      const isBooked = bookedSlots.includes(timeSlot);
      const isBlocked = isDateBlocked || blockedSlotsForDate.includes(timeSlot);
      return {
        time: timeSlot,
        available: !isBooked && !isBlocked,
        reason: isBlocked ? "Blocked / Holiday" : isBooked ? "Booked" : "Available",
      };
    };

    return NextResponse.json({
      date,
      isDateBlocked,
      morningSlots: settings.morningSlots.map(mapSlot),
      eveningSlots: settings.eveningSlots.map(mapSlot),
      totalSlots: settings.morningSlots.length + settings.eveningSlots.length,
      availableCount:
        settings.morningSlots.map(mapSlot).filter((s) => s.available).length +
        settings.eveningSlots.map(mapSlot).filter((s) => s.available).length,
    });
  } catch (error) {
    console.error("Error fetching slots:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
