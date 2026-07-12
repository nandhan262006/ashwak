"use client";

import WebsiteNavbar from "@/components/website/Navbar";
import WebsiteFooter from "@/components/website/Footer";

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WebsiteNavbar />
      <main className="min-h-screen">{children}</main>
      <WebsiteFooter />
    </>
  );
}
