"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { FolderOpen, FileText, Calendar, Bell, Download, LogOut, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function ClientSpacePage() {
  const { user, loading, isAdmin, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/auth?redirect=/client");
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <div className="text-white/60">Loading…</div>
      </div>
    );
  }

  const name = (user.user_metadata?.full_name as string) || user.email?.split("@")[0] || "client";

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <section className="bg-secondary text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,107,0,0.18),transparent_50%)]" />
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-1">Welcome back, {name}</h1>
              <p className="text-gray-300">Here's an overview of your projects</p>
            </div>
            <div className="flex gap-3">
              {isAdmin && (
                <button
                  onClick={() => router.push("/admin")}
                  className="bg-white/10 border border-white/20 px-4 py-2 rounded-lg hover:bg-white/20 transition flex items-center gap-2"
                >
                  <Shield size={16} /> Admin
                </button>
              )}
              <button
                onClick={async () => { await signOut(); router.push("/"); }}
                className="bg-primary px-5 py-2 rounded-lg hover:brightness-110 transition flex items-center gap-2"
              >
                <LogOut size={16} /> Sign out
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { icon: FolderOpen, label: "Active Projects", value: "3", color: "bg-blue-500" },
              { icon: FileText, label: "Documents", value: "24", color: "bg-green-500" },
              { icon: Calendar, label: "Appointments", value: "2", color: "bg-purple-500" },
              { icon: Bell, label: "Notifications", value: "5", color: "bg-primary" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-lg shadow"
              >
                <div className={`w-12 h-12 ${s.color} rounded-lg flex items-center justify-center mb-4`}>
                  <s.icon className="text-white" size={24} />
                </div>
                <div className="text-3xl text-secondary mb-1">{s.value}</div>
                <div className="text-gray-600">{s.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl text-secondary mb-6">Active Projects</h2>
              <div className="space-y-4">
                {[
                  { name: "Warehouse Expansion", status: "In Progress", progress: 65 },
                  { name: "Steel Frame Installation", status: "Planning", progress: 30 },
                  { name: "Metal Roof Replacement", status: "Nearing Completion", progress: 90 },
                ].map((p, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg text-secondary">{p.name}</h3>
                        <p className="text-sm text-gray-500">{p.status}</p>
                      </div>
                      <span className="text-sm text-gray-600">{p.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${p.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl text-secondary mb-6">Recent Documents</h2>
              <div className="space-y-3">
                {[
                  { name: "Project_Blueprint_Final.pdf", date: "2026-05-10", size: "2.4 MB" },
                  { name: "Invoice_MAY2026.pdf", date: "2026-05-08", size: "156 KB" },
                  { name: "Safety_Inspection_Report.pdf", date: "2026-05-05", size: "890 KB" },
                  { name: "Contract_Amendment.pdf", date: "2026-05-01", size: "345 KB" },
                ].map((d, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                    <div className="flex items-center gap-3">
                      <FileText className="text-primary" size={24} />
                      <div>
                        <div className="text-secondary">{d.name}</div>
                        <div className="text-sm text-gray-600">{d.date} • {d.size}</div>
                      </div>
                    </div>
                    <Download className="text-gray-400 hover:text-primary" size={20} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}