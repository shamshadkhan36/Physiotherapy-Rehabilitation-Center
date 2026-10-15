import { NextRequest, NextResponse } from "next/server";
import { updateAppointmentStatus, deleteAppointment } from "@/lib/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { status, rescheduleDate, rescheduleTime } = body;

    if (!status) {
      return NextResponse.json({ error: "Status is required." }, { status: 400 });
    }

    const result = updateAppointmentStatus(id, status, rescheduleDate, rescheduleTime);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, appointment: result.appointment });
  } catch (error) {
    console.error("Error updating appointment:", error);
    return NextResponse.json({ error: "Failed to update appointment." }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const ok = deleteAppointment(id);
    if (!ok) {
      return NextResponse.json({ error: "Appointment not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Appointment deleted successfully." });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return NextResponse.json({ error: "Failed to delete appointment." }, { status: 500 });
  }
}
