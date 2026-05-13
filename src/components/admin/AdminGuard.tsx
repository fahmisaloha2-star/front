"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading, isAdmin } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) router.push("/auth?redirect=/admin");
    else if (!isAdmin) router.push("/");
  }, [user, isAdmin, loading, router]);

  if (loading || !user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <div className="text-white/60">Checking permissions…</div>
      </div>
    );
  }
  return <>{children}</>;
}
