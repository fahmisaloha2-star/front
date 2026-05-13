"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  FolderOpen,
  FileText,
  Calendar,
  Bell,
  Download,
  LogOut,
  Shield,
  Save,
  Loader2,
  Mail,
  Phone,
  MapPin,
  User as UserIcon,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api-client";
import { ImageDrop } from "@/components/ImageDrop";

type ProfileRecord = {
  user_id: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  address: string | null;
  avatar_url: string | null;
};

export function ClientSpacePage() {
  const { user, loading, isAdmin, signOut } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState<ProfileRecord | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [form, setForm] = useState({ full_name: "", phone: "", address: "", avatar_url: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/auth?redirect=/client");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const d = await api.get<{ profile: ProfileRecord | null }>("/api/profile", true);
        if (d.profile) {
          setProfile(d.profile);
          setForm({
            full_name: d.profile.full_name || "",
            phone: d.profile.phone || "",
            address: d.profile.address || "",
            avatar_url: d.profile.avatar_url || "",
          });
        }
      } catch (e) {
        toast.error((e as Error).message);
      } finally {
        setProfileLoading(false);
      }
    })();
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const patch: Record<string, string> = {};
      for (const k of ["full_name", "phone", "address", "avatar_url"] as const) {
        if (form[k]) patch[k] = form[k];
      }
      const d = await api.put<{ profile: ProfileRecord }>("/api/profile", patch);
      setProfile(d.profile);
      toast.success("Profile saved");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <div className="text-white/60">Loading…</div>
      </div>
    );
  }

  const name =
    profile?.full_name ||
    (user.user_metadata?.full_name as string) ||
    user.email?.split("@")[0] ||
    "client";

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <section className="bg-secondary text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,107,0,0.18),transparent_50%)]" />
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-1">Welcome back, {name}</h1>
              <p className="text-gray-300">Here&apos;s an overview of your projects</p>
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
                onClick={async () => {
                  await signOut();
                  router.push("/");
                }}
                className="bg-primary px-5 py-2 rounded-lg hover:brightness-110 transition flex items-center gap-2"
              >
                <LogOut size={16} /> Sign out
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ----- Profile section ----- */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl text-secondary mb-4">My profile</h2>
          {profileLoading ? (
            <div className="bg-white rounded-lg shadow p-8 flex justify-center">
              <Loader2 className="animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-semibold text-secondary mb-3">Avatar</h3>
                <ImageDrop
                  value={form.avatar_url || profile?.avatar_url || null}
                  onChange={async (url) => {
                    setForm((f) => ({ ...f, avatar_url: url || "" }));
                    if (url) {
                      try {
                        const d = await api.put<{ profile: ProfileRecord }>("/api/profile", {
                          avatar_url: url,
                        });
                        setProfile(d.profile);
                        toast.success("Avatar updated");
                      } catch (err) {
                        toast.error((err as Error).message);
                      }
                    }
                  }}
                  endpoint="/api/profile/avatar"
                  shape="circle"
                  height={200}
                />
              </div>

              <form
                onSubmit={handleSave}
                className="md:col-span-2 bg-white rounded-lg shadow p-6 space-y-4"
              >
                <Field
                  icon={<UserIcon size={16} />}
                  label="Full name"
                  value={form.full_name}
                  onChange={(v) => setForm({ ...form, full_name: v })}
                />
                <Field
                  icon={<Mail size={16} />}
                  label="Email"
                  value={user.email || ""}
                  disabled
                />
                <Field
                  icon={<Phone size={16} />}
                  label="Phone"
                  value={form.phone}
                  onChange={(v) => setForm({ ...form, phone: v })}
                />
                <Field
                  icon={<MapPin size={16} />}
                  label="Address"
                  value={form.address}
                  onChange={(v) => setForm({ ...form, address: v })}
                  textarea
                />
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-primary text-white px-5 py-2.5 rounded-lg hover:brightness-110 flex items-center gap-2 disabled:opacity-60"
                >
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  Save changes
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* ----- Stats + projects + documents (placeholder mock until DB models exist) ----- */}
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
                <div
                  className={`w-12 h-12 ${s.color} rounded-lg flex items-center justify-center mb-4`}
                >
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
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${p.progress}%` }}
                      />
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
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="text-primary" size={24} />
                      <div>
                        <div className="text-secondary">{d.name}</div>
                        <div className="text-sm text-gray-600">
                          {d.date} • {d.size}
                        </div>
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

function Field({
  icon,
  label,
  value,
  onChange,
  disabled,
  textarea,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange?: (v: string) => void;
  disabled?: boolean;
  textarea?: boolean;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1">
        {icon} {label}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-50 disabled:text-gray-500"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-50 disabled:text-gray-500"
        />
      )}
    </div>
  );
}
