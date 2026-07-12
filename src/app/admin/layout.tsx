"use client";

import { useEffect, useCallback, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { HiHome, HiBriefcase, HiPhoto, HiStar, HiUser, HiDocumentText, HiEnvelope, HiCog6Tooth, HiArrowRightOnRectangle, HiBars3, HiXMark } from "react-icons/hi2";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: HiHome },
  { href: "/admin/services", label: "Services", icon: HiBriefcase },
  { href: "/admin/gallery", label: "Gallery", icon: HiPhoto },
  { href: "/admin/google-reviews", label: "Reviews", icon: HiStar },
  { href: "/admin/about", label: "About", icon: HiUser },
  { href: "/admin/blog", label: "Blog", icon: HiDocumentText },
  { href: "/admin/contacts", label: "Contacts", icon: HiEnvelope },
  { href: "/admin/settings", label: "Settings", icon: HiCog6Tooth },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") return;
    fetch("/api/auth/verify")
      .then((r) => r.json())
      .then((data) => {
        if (!data.authenticated) router.replace("/admin/login");
      })
      .catch(() => router.replace("/admin/login"));
  }, [pathname, router]);

  const handleNavigate = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const handleLogout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }, [router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div className="flex h-screen bg-[#0c0c0c]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#111111] border-r border-white/5 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8960E] flex items-center justify-center">
            <span className="text-[#0c0c0c] font-bold text-lg">K</span>
          </div>
          <div>
            <h1 className="text-white font-semibold text-sm leading-tight">Wedding by Kranthi</h1>
            <p className="text-white/40 text-xs">Admin Panel</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden p-1 text-white/40 hover:text-white"
          >
            <HiXMark className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavigate}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20"
                    : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive(item.href) ? "text-[#D4AF37]" : ""}`} />
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Bottom actions */}
        <div className="border-t border-white/5 p-3 space-y-1">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all"
          >
            <HiArrowRightOnRectangle className="w-5 h-5" />
            View Site
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <HiArrowRightOnRectangle className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar (mobile) */}
        <header className="lg:hidden flex items-center gap-4 px-4 py-3 bg-[#111111] border-b border-white/5">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg"
          >
            <HiBars3 className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8960E] flex items-center justify-center">
              <span className="text-[#0c0c0c] font-bold text-sm">K</span>
            </div>
            <span className="text-white font-medium text-sm">Admin</span>
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
