"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shield,
  Calendar,
  Clock,
  User,
  Phone,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Download,
  Printer,
  RefreshCw,
  LogOut,
  Plus,
  Trash2,
  Lock,
  MessageCircle,
  Edit,
  ExternalLink,
} from "lucide-react";
import SankalpLogo from "@/components/SankalpLogo";
import { CLINIC_INFO } from "@/lib/content";

interface Appointment {
  id: string;
  patientName: string;
  mobile: string;
  age: number;
  gender: string;
  email?: string;
  treatment: string;
  date: string;
  timeSlot: string;
  notes?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPin, setAdminPin] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // Dashboard data
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  });
  const [loading, setLoading] = useState(false);

  // Filters
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // Tabs: 'appointments' | 'schedule' | 'settings'
  const [activeTab, setActiveTab] = useState<"appointments" | "schedule" | "settings">("appointments");

  // Schedule management states
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [newBlockedDate, setNewBlockedDate] = useState("");
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsNotice, setSettingsNotice] = useState("");

  // Reschedule Modal
  const [rescheduleModalApp, setRescheduleModalApp] = useState<Appointment | null>(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  // Check auth on mount
  useEffect(() => {
    const isAuth = sessionStorage.getItem("sankalp_admin_auth");
    if (isAuth === "true") {
      setIsAuthenticated(true);
      fetchDashboardData();
      fetchSettings();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: adminPin }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Invalid PIN");
      }

      sessionStorage.setItem("sankalp_admin_auth", "true");
      setIsAuthenticated(true);
      fetchDashboardData();
      fetchSettings();
    } catch (err: any) {
      setLoginError(err.message || "Login failed");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("sankalp_admin_auth");
    setIsAuthenticated(false);
    setAdminPin("");
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/appointments");
      const data = await res.json();
      if (data.appointments) {
        setAppointments(data.appointments);
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Error fetching appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.settings) {
        setBlockedDates(data.settings.blockedDates || []);
      }
    } catch (err) {
      console.error("Error fetching settings:", err);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: Appointment["status"]) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchDashboardData();
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleConfirmReschedule = async () => {
    if (!rescheduleModalApp || !newDate || !newTime) return;

    try {
      const res = await fetch(`/api/appointments/${rescheduleModalApp.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "confirmed",
          rescheduleDate: newDate,
          rescheduleTime: newTime,
        }),
      });

      if (res.ok) {
        setRescheduleModalApp(null);
        fetchDashboardData();
      } else {
        const d = await res.json();
        alert(d.error || "Could not reschedule to this slot.");
      }
    } catch (err) {
      console.error("Reschedule error:", err);
    }
  };

  const handleBlockDate = async () => {
    if (!newBlockedDate) return;
    if (blockedDates.includes(newBlockedDate)) {
      alert("This date is already blocked.");
      return;
    }

    const updated = [...blockedDates, newBlockedDate];
    setSavingSettings(true);
    try {
      await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blockedDates: updated }),
      });
      setBlockedDates(updated);
      setNewBlockedDate("");
      setSettingsNotice("Date blocked successfully.");
      setTimeout(() => setSettingsNotice(""), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSavingSettings(false);
    }
  };

  const handleUnblockDate = async (dateToUnblock: string) => {
    const updated = blockedDates.filter((d) => d !== dateToUnblock);
    setSavingSettings(true);
    try {
      await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blockedDates: updated }),
      });
      setBlockedDates(updated);
      setSettingsNotice("Date unblocked.");
      setTimeout(() => setSettingsNotice(""), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSavingSettings(false);
    }
  };

  const exportToCSV = () => {
    if (appointments.length === 0) return;

    const headers = [
      "Appointment ID",
      "Patient Name",
      "Mobile",
      "Age",
      "Gender",
      "Treatment",
      "Date",
      "Time Slot",
      "Status",
      "Created At",
    ];

    const rows = filteredAppointments.map((a) => [
      a.id,
      `"${a.patientName}"`,
      a.mobile,
      a.age,
      a.gender,
      `"${a.treatment}"`,
      a.date,
      a.timeSlot,
      a.status,
      a.createdAt,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sankalp_appointments_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered appointments
  const filteredAppointments = appointments.filter((app) => {
    if (statusFilter !== "all" && app.status !== statusFilter) return false;
    if (dateFilter && app.date !== dateFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = app.patientName.toLowerCase().includes(q);
      const matchPhone = app.mobile.includes(q);
      const matchId = app.id.toLowerCase().includes(q);
      const matchTreatment = app.treatment.toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchId && !matchTreatment) return false;
    }
    return true;
  });

  // ================= LOGIN SCREEN =================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl border border-slate-100">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Shield className="w-8 h-8 text-teal-600" />
            </div>
            <h1 className="text-xl font-black text-[#0a2540]">
              Sankalp Foundation Admin Portal
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Physiotherapy Clinic Management System • Patna Center
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Enter Clinic Admin PIN:
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  placeholder="Enter PIN (e.g. sankalp2026)"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono tracking-widest text-center focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5 text-center">
                Default PIN for demonstration: <code className="text-teal-700 font-bold">sankalp2026</code>
              </p>
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              {loggingIn ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Access Admin Dashboard</span>
              )}
            </button>

            <div className="pt-4 text-center">
              <Link href="/" className="text-xs text-slate-500 hover:text-teal-700">
                ← Return to Public Website
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ================= AUTHENTICATED DASHBOARD =================
  return (
    <div className="min-h-screen bg-slate-100/80">
      {/* Top Admin Header */}
      <header className="bg-[#0a2540] text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" target="_blank" className="flex items-center gap-2 group">
              <span className="font-bold text-white text-base sm:text-lg">
                Sankalp Foundation
              </span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-teal-800 text-teal-200 border border-teal-600">
                Admin Panel
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-teal-300 hover:text-white px-2.5 py-1 rounded bg-teal-900/60"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-900/60 hover:bg-rose-800 border border-rose-700/60 text-white text-xs font-semibold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-700/60 flex space-x-1 sm:space-x-4">
          <button
            onClick={() => setActiveTab("appointments")}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === "appointments"
                ? "border-teal-400 text-teal-300"
                : "border-transparent text-slate-300 hover:text-white"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Appointments Manager ({stats.total})</span>
          </button>

          <button
            onClick={() => setActiveTab("schedule")}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === "schedule"
                ? "border-teal-400 text-teal-300"
                : "border-transparent text-slate-300 hover:text-white"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Clinic Timings & Holidays ({blockedDates.length})</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Today's Patients
            </span>
            <div className="text-2xl sm:text-3xl font-black text-teal-700 mt-1">
              {stats.today}
            </div>
            <span className="text-[11px] text-slate-400">Scheduled for today</span>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Pending Action
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-600 mt-1">
              {stats.pending}
            </div>
            <span className="text-[11px] text-slate-400">Needs staff confirmation</span>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Confirmed
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1">
              {stats.confirmed}
            </div>
            <span className="text-[11px] text-slate-400">Slot reserved</span>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Completed
            </span>
            <div className="text-2xl sm:text-3xl font-black text-indigo-700 mt-1">
              {stats.completed}
            </div>
            <span className="text-[11px] text-slate-400">Session fulfilled</span>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm col-span-2 sm:col-span-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Records
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#0a2540] mt-1">
              {stats.total}
            </div>
            <span className="text-[11px] text-slate-400">All registered visits</span>
          </div>
        </div>

        {/* ================= TAB 1: APPOINTMENTS ================= */}
        {activeTab === "appointments" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Table Control Bar */}
            <div className="p-4 sm:p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                {/* Status tabs */}
                {[
                  { id: "all", label: "All" },
                  { id: "pending", label: "Pending" },
                  { id: "confirmed", label: "Confirmed" },
                  { id: "completed", label: "Completed" },
                  { id: "cancelled", label: "Cancelled" },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setStatusFilter(st.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      statusFilter === st.id
                        ? "bg-[#0a2540] text-white"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                {/* Search query input */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search name, phone, ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium w-44 sm:w-56 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                {/* Filter by date */}
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="py-1.5 px-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:outline-none"
                />
                {dateFilter && (
                  <button
                    onClick={() => setDateFilter("")}
                    className="text-xs text-rose-600 font-bold hover:underline"
                  >
                    Clear Date
                  </button>
                )}

                {/* Export CSV button */}
                <button
                  onClick={exportToCSV}
                  className="px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>

                {/* Refresh button */}
                <button
                  onClick={fetchDashboardData}
                  className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                  title="Refresh"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                </button>
              </div>
            </div>

            {/* Appointments Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">Appointment ID</th>
                    <th className="py-3 px-4">Patient Details</th>
                    <th className="py-3 px-4">Treatment</th>
                    <th className="py-3 px-4">Date & Slot</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400">
                        No appointments found matching current filters.
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map((app) => {
                      const whatsappText = encodeURIComponent(
                        `Hello ${app.patientName}, your physiotherapy appointment (ID: ${app.id}) for ${app.treatment} at Sankalp Foundation Patna on ${app.date} at ${app.timeSlot} is confirmed. Clinic Address: ${CLINIC_INFO.addressEn}. Phone: ${CLINIC_INFO.phone1Display}`
                      );

                      return (
                        <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                          {/* ID */}
                          <td className="py-3.5 px-4 font-mono font-bold text-teal-800">
                            {app.id}
                            <span className="block text-[10px] text-slate-400 font-sans font-normal">
                              {new Date(app.createdAt).toLocaleDateString()}
                            </span>
                          </td>

                          {/* Patient */}
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900 text-sm">{app.patientName}</div>
                            <div className="text-slate-500 text-[11px] flex items-center gap-2 mt-0.5">
                              <span>+91 {app.mobile}</span>
                              <span>•</span>
                              <span>
                                {app.age} Yrs / {app.gender}
                              </span>
                            </div>
                            {app.notes && (
                              <div className="text-[11px] text-slate-600 bg-slate-100 p-1.5 rounded mt-1.5 max-w-xs">
                                <strong>Note:</strong> {app.notes}
                              </div>
                            )}
                          </td>

                          {/* Treatment */}
                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-slate-800">{app.treatment}</span>
                          </td>

                          {/* Date & Time */}
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-[#0a2540] block">{app.date}</span>
                            <span className="text-xs text-teal-700 font-semibold">{app.timeSlot}</span>
                          </td>

                          {/* Status */}
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                app.status === "confirmed"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : app.status === "pending"
                                  ? "bg-amber-100 text-amber-900"
                                  : app.status === "completed"
                                  ? "bg-indigo-100 text-indigo-900"
                                  : "bg-rose-100 text-rose-900"
                              }`}
                            >
                              {app.status}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* WhatsApp button */}
                              <a
                                href={`https://wa.me/91${app.mobile}?text=${whatsappText}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                title="WhatsApp Patient"
                              >
                                <MessageCircle className="w-4 h-4" />
                              </a>

                              {/* Call button */}
                              <a
                                href={`tel:+91${app.mobile}`}
                                className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
                                title="Call Patient"
                              >
                                <Phone className="w-4 h-4" />
                              </a>

                              {/* Confirm button */}
                              {app.status === "pending" && (
                                <button
                                  onClick={() => handleUpdateStatus(app.id, "confirmed")}
                                  className="px-2 py-1 rounded bg-teal-600 hover:bg-teal-700 text-white font-bold text-[10px]"
                                  title="Confirm Appointment"
                                >
                                  Confirm
                                </button>
                              )}

                              {/* Complete button */}
                              {app.status === "confirmed" && (
                                <button
                                  onClick={() => handleUpdateStatus(app.id, "completed")}
                                  className="px-2 py-1 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px]"
                                  title="Mark as Completed"
                                >
                                  Done
                                </button>
                              )}

                              {/* Reschedule button */}
                              <button
                                onClick={() => {
                                  setRescheduleModalApp(app);
                                  setNewDate(app.date);
                                  setNewTime(app.timeSlot);
                                }}
                                className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
                                title="Reschedule Date/Time"
                              >
                                <Edit className="w-4 h-4" />
                              </button>

                              {/* Cancel button */}
                              {app.status !== "cancelled" && (
                                <button
                                  onClick={() => handleUpdateStatus(app.id, "cancelled")}
                                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50"
                                  title="Cancel Appointment"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 2: SCHEDULE & HOLIDAYS ================= */}
        {activeTab === "schedule" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#0a2540] mb-1">
                Block Dates & Clinic Holidays
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Block specific calendar dates so patients cannot book online appointments during clinic holidays or doctor leave.
              </p>

              {settingsNotice && (
                <div className="mb-4 p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
                  {settingsNotice}
                </div>
              )}

              {/* Add blocked date form */}
              <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md">
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={newBlockedDate}
                  onChange={(e) => setNewBlockedDate(e.target.value)}
                  className="w-full sm:w-auto flex-1 p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
                <button
                  onClick={handleBlockDate}
                  disabled={!newBlockedDate || savingSettings}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                  <span>Block Date</span>
                </button>
              </div>

              {/* Current blocked dates list */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  Currently Blocked Dates:
                </h4>

                {blockedDates.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No dates currently blocked.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {blockedDates.map((dateStr) => (
                      <span
                        key={dateStr}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 text-xs font-mono font-semibold"
                      >
                        <span>{dateStr}</span>
                        <button
                          onClick={() => handleUnblockDate(dateStr)}
                          className="text-rose-500 hover:text-rose-700"
                          title="Unblock date"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Standard Clinic Hours Reference */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#0a2540] mb-2">
                Configured Daily Timings
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-teal-50 border border-teal-200">
                  <span className="font-bold text-teal-900 block mb-1">Morning Shift Slots:</span>
                  <p className="text-teal-800">
                    8:00 AM, 8:30 AM, 9:00 AM, 9:30 AM, 10:00 AM, 10:30 AM, 11:00 AM, 11:30 AM, 12:00 PM, 12:30 PM (10 slots)
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200">
                  <span className="font-bold text-indigo-900 block mb-1">Evening Shift Slots:</span>
                  <p className="text-indigo-800">
                    4:00 PM, 4:30 PM, 5:00 PM, 5:30 PM, 6:00 PM, 6:30 PM, 7:00 PM, 7:30 PM (8 slots)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Reschedule Modal */}
      {rescheduleModalApp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-[#0a2540] mb-2">Reschedule Appointment</h3>
            <p className="text-xs text-slate-500 mb-4">
              Patient: <strong>{rescheduleModalApp.patientName}</strong> ({rescheduleModalApp.id})
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">New Date:</label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">New Time Slot:</label>
                <select
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none"
                >
                  <optgroup label="Morning Shift">
                    {[
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
                    ].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Evening Shift">
                    {[
                      "04:00 PM",
                      "04:30 PM",
                      "05:00 PM",
                      "05:30 PM",
                      "06:00 PM",
                      "06:30 PM",
                      "07:00 PM",
                      "07:30 PM",
                    ].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-6 mt-4 border-t border-slate-100">
              <button
                onClick={() => setRescheduleModalApp(null)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReschedule}
                className="px-5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs"
              >
                Save New Time
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
