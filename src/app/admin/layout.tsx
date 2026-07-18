"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { HiHome, HiBriefcase, HiPhoto, HiStar, HiUser, HiEnvelope, HiCog6Tooth, HiArrowRightOnRectangle, HiBars3, HiXMark } from "react-icons/hi2";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: HiHome },
  { href: "/admin/services", label: "Services", icon: HiBriefcase },
  { href: "/admin/gallery", label: "Gallery", icon: HiPhoto },
  { href: "/admin/google-reviews", label: "Reviews", icon: HiStar },
  { href: "/admin/about", label: "About", icon: HiUser },
  { href: "/admin/contacts", label: "Contacts", icon: HiEnvelope },
  { href: "/admin/settings", label: "Settings", icon: HiCog6Tooth },
];

const breadcrumbMap: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/services": "Services",
  "/admin/gallery": "Gallery",
  "/admin/google-reviews": "Reviews",
  "/admin/about": "About",
  "/admin/contacts": "Contacts",
  "/admin/settings": "Settings",
};

function SidebarSkeleton() {
  return (
    <div className="fixed inset-y-0 left-0 z-50 w-72 bg-[#0A0A0A] border-r border-white/[0.06] flex flex-col">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/[0.06]">
        <div className="w-10 h-10 rounded-xl bg-white/[0.04] animate-pulse" />
        <div className="space-y-2">
          <div className="w-28 h-4 rounded bg-white/[0.04] animate-pulse" />
          <div className="w-16 h-3 rounded bg-white/[0.04] animate-pulse" />
        </div>
      </div>
      <nav className="flex-1 py-4 px-3 space-y-1">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-10 rounded-xl bg-white/[0.03] animate-pulse" />
        ))}
      </nav>
      <div className="border-t border-white/[0.06] p-3 space-y-1">
        <div className="h-10 rounded-xl bg-white/[0.03] animate-pulse" />
        <div className="h-10 rounded-xl bg-white/[0.03] animate-pulse" />
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [verified, setVerified] = useState(false);
  const didVerify = useRef(false);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setVerified(true);
      return;
    }
    didVerify.current = false;
    setVerified(false);
    fetch("/api/auth/verify")
      .then((r) => r.json())
      .then((data) => {
        if (!data.authenticated) router.replace("/admin/login");
        else setVerified(true);
      })
      .catch(() => router.replace("/admin/login"));
  }, [pathname, router]);

  const handleLogout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }, [router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!verified) {
    return (
      <div className="flex h-screen bg-[#0A0A0A]">
        <SidebarSkeleton />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="relative">
            <Image src="/images/navibar.png" alt="Ashwak Photography" width={48} height={48} className="h-12 w-auto rounded-2xl animate-pulse" />
          </div>
          <p className="text-white/40 text-sm font-medium">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const currentLabel = Object.entries(breadcrumbMap).find(([key]) => pathname === key || (key !== "/admin" && pathname.startsWith(key)))?.[1];

  return (
    <div className="flex h-screen bg-[#0A0A0A]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0A0A0A] border-r border-white/[0.06] flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/[0.06]">
          <Image src="/images/navibar.png" alt="Ashwak Photography" width={40} height={40} className="h-10 w-auto rounded-lg" />
          <div>
            <h1 className="text-white font-semibold text-sm leading-tight">Ashwak Photography</h1>
            <p className="text-white/30 text-xs font-medium">Admin Panel</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden p-2 text-white/30 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors"
          >
            <HiXMark className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <p className="px-3 mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/20">
            Navigation
          </p>
          <div className="space-y-0.5">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    active
                      ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                      : "text-white/40 hover:text-white/80 hover:bg-white/[0.03]"
                  }`}
                >
                  <item.icon className={`w-5 h-5 transition-colors ${active ? "text-[#D4AF37]" : "text-white/20 group-hover:text-white/50"}`} />
                  {item.label}
                  {active && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom actions */}
        <div className="border-t border-white/[0.06] p-3 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white/70 hover:bg-white/[0.03] transition-all"
          >
            <HiArrowRightOnRectangle className="w-5 h-5" />
            View Website
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-500/[0.08] transition-all"
          >
            <HiArrowRightOnRectangle className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="flex items-center gap-4 px-6 py-3 bg-[#0A0A0A] border-b border-white/[0.06]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-white/40 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors"
          >
            <HiBars3 className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-white/20">Admin</span>
            {currentLabel && (
              <>
                <span className="text-white/10">/</span>
                <span className="text-white/50 font-medium">{currentLabel}</span>
              </>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}