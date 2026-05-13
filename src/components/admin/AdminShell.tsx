"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Tags,
  Wrench,
  Building2,
  Users,
  Megaphone,
  ShoppingBag,
  Settings,
  LogOut,
  Home,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/projects", label: "Projects", icon: Building2 },
  { href: "/admin/employers", label: "Team", icon: Users },
  { href: "/admin/announcements", label: "Announcements", icon: Megaphone },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut, user } = useAuth();

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-secondary text-white flex flex-col">
        <div className="px-6 py-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded flex items-center justify-center font-bold">
              MIS
            </div>
            <div>
              <div className="font-bold">MIS Admin</div>
              <div className="text-xs text-white/60">{user?.email}</div>
            </div>
          </Link>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname?.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  active
                    ? "bg-primary text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} /> {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-3 py-4 border-t border-white/10 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 text-white/70 hover:text-white rounded-lg"
          >
            <Home size={18} /> View site
          </Link>
          <button
            onClick={async () => {
              await signOut();
              router.push("/");
            }}
            className="w-full flex items-center gap-3 px-3 py-2 text-white/70 hover:text-white rounded-lg"
          >
            <LogOut size={18} /> Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-x-hidden">{children}</main>
    </div>
  );
}
