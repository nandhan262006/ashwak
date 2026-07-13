"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiBriefcase, HiPhoto, HiStar, HiEnvelope, HiUser } from "react-icons/hi2";
import { Skeleton } from "@/components/admin/Skeleton";

interface DashboardData {
  services: { id: string; title: string; subtitle: string | null; image: string | null; sortOrder: number; isActive: boolean }[];
  servicesCount: number;
  gallery: { id: string; title: string; src: string; alt: string | null; span: string | null; isActive: boolean }[];
  galleryCount: number;
  googleReviews: { id: string; name: string; text: string; rating: number; date: string | null }[];
  reviewsCount: number;
  about: { title: string; content: string; image: string | null; tags: string | null } | null;
  contacts: { id: string; name: string; email: string; phone: string | null; date: string | null; eventType: string | null; message: string; isRead: boolean; createdAt: string }[];
  unreadContacts: number;
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((r) => r.json())
      .then((json) => {
        if (!json.error) setData(json);
      });
  }, []);

  const stats = data ? [
    { label: "Services", count: data.servicesCount ?? 0, href: "/admin/services", icon: HiBriefcase, gradient: "from-blue-500/20 to-blue-600/10 text-blue-400" },
    { label: "Gallery Items", count: data.galleryCount ?? 0, href: "/admin/gallery", icon: HiPhoto, gradient: "from-purple-500/20 to-purple-600/10 text-purple-400" },
    { label: "Reviews", count: data.reviewsCount ?? 0, href: "/admin/google-reviews", icon: HiStar, gradient: "from-yellow-500/20 to-yellow-600/10 text-yellow-400", badge: null },
    { label: "Messages", count: data.contacts?.length ?? 0, href: "/admin/contacts", icon: HiEnvelope, gradient: "from-green-500/20 to-green-600/10 text-green-400", badge: (data.unreadContacts ?? 0) > 0 ? data.unreadContacts! : null },
  ] : [];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-white/30 text-sm mt-1">Overview of your wedding photography business</p>
        </div>
      </div>

      {/* Stats */}
      {!data ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-5">
              <Skeleton className="w-8 h-8 rounded-xl mb-3" />
              <Skeleton className="w-12 h-8 rounded mb-1" />
              <Skeleton className="w-16 h-4 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="group relative bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-5 hover:border-[#D4AF37]/20 hover:shadow-lg hover:shadow-[#D4AF37]/5 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient.split(" ")[0]} ${stat.gradient.split(" ")[1]} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.gradient.split(" ")[2]}`} />
                </div>
                {stat.badge && (
                  <span className="px-2 py-0.5 text-xs font-bold bg-[#D4AF37] text-[#0A0A0A] rounded-full shadow-lg shadow-[#D4AF37]/30">
                    {stat.badge} new
                  </span>
                )}
              </div>
              <div className="text-3xl font-bold text-white tracking-tight">{stat.count}</div>
              <div className="text-white/30 text-sm mt-1">{stat.label}</div>
            </Link>
          ))}
        </div>
      )}

      {/* Content grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* About */}
        <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.1] transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
                <HiUser className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h2 className="text-lg font-semibold text-white">About Section</h2>
            </div>
            <Link href="/admin/about" className="text-[#D4AF37] text-sm font-medium hover:underline underline-offset-4">
              Edit
            </Link>
          </div>
          {!data ? (
            <div className="flex items-start gap-4">
              <Skeleton className="w-20 h-20 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="w-full h-4 rounded" />
                <Skeleton className="w-3/4 h-4 rounded" />
              </div>
            </div>
          ) : data.about ? (
            <div className="flex items-start gap-4">
              {data.about.image && (
                <Image src={data.about.image} alt={data.about.title} width={80} height={80} className="rounded-xl object-cover w-20 h-20" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-white/50 text-sm line-clamp-2">{data.about.content}</p>
                {data.about.tags && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {data.about.tags.split(",").slice(0, 3).map((tag: string) => (
                      <span key={tag} className="text-xs px-2.5 py-1 bg-white/[0.04] text-white/40 rounded-lg">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="text-white/20 text-sm">
              No about section yet.{" "}
              <Link href="/admin/about" className="text-[#D4AF37] hover:underline">
                Create one
              </Link>
            </p>
          )}
        </div>

        {/* Services */}
        <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.1] transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <HiBriefcase className="w-5 h-5 text-blue-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Services</h2>
            </div>
            <Link href="/admin/services" className="text-[#D4AF37] text-sm font-medium hover:underline underline-offset-4">
              Manage
            </Link>
          </div>
          {!data ? (
            <div className="grid grid-cols-2 gap-3">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-14 rounded-xl" />
              ))}
            </div>
          ) : data.services?.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {data.services.map((s) => (
                <Link
                  key={s.id}
                  href={`/admin/services/${s.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-[#D4AF37]/20 transition-colors"
                >
                  {s.image && (
                    <Image src={s.image} alt={s.title} width={40} height={40} className="rounded-lg object-cover w-10 h-10" />
                  )}
                  <div className="min-w-0">
                    <div className="text-white text-sm font-medium truncate">{s.title}</div>
                    <div className="text-white/25 text-xs">{s.isActive ? "Active" : "Draft"}</div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-white/20 text-sm">
              No services yet.{" "}
              <Link href="/admin/services/new" className="text-[#D4AF37] hover:underline">
                Add one
              </Link>
            </p>
          )}
        </div>

        {/* Gallery */}
        <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.1] transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <HiPhoto className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Gallery</h2>
            </div>
            <Link href="/admin/gallery" className="text-[#D4AF37] text-sm font-medium hover:underline underline-offset-4">
              Manage
            </Link>
          </div>
          {!data ? (
            <div className="grid grid-cols-3 gap-2">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-xl" />
              ))}
            </div>
          ) : data.gallery?.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {data.gallery.map((g) => (
                <Link
                  key={g.id}
                  href={`/admin/gallery/${g.id}`}
                  className="relative aspect-square rounded-xl overflow-hidden border border-white/[0.04] hover:border-[#D4AF37]/20 transition-colors group"
                >
                  <Image src={g.src} alt={g.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="100px" />
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-white/20 text-sm">
              No gallery images yet.{" "}
              <Link href="/admin/gallery/new" className="text-[#D4AF37] hover:underline">
                Add one
              </Link>
            </p>
          )}
        </div>

        {/* Reviews */}
        <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.1] transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                <HiStar className="w-5 h-5 text-yellow-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Google Reviews</h2>
            </div>
            <Link href="/admin/google-reviews" className="text-[#D4AF37] text-sm font-medium hover:underline underline-offset-4">
              Manage
            </Link>
          </div>
          {!data ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-14 rounded-xl" />
              ))}
            </div>
          ) : data.googleReviews?.length > 0 ? (
            <div className="space-y-3">
              {data.googleReviews.map((r) => (
                <Link
                  key={r.id}
                  href={`/admin/google-reviews/${r.id}`}
                  className="block p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-[#D4AF37]/20 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white text-sm font-medium">{r.name}</span>
                    <span className="text-yellow-400 text-xs">{"★".repeat(r.rating)}</span>
                    {r.date && <span className="text-white/20 text-xs ml-auto">{r.date}</span>}
                  </div>
                  <p className="text-white/40 text-xs line-clamp-1">{r.text}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-white/20 text-sm">
              No reviews yet.{" "}
              <Link href="/admin/google-reviews/new" className="text-[#D4AF37] hover:underline">
                Add one
              </Link>
            </p>
          )}
        </div>
      </div>

      {/* Contacts */}
      <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.1] transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
                <HiEnvelope className="w-5 h-5 text-pink-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Recent Messages</h2>
            </div>
            <Link href="/admin/contacts" className="text-[#D4AF37] text-sm font-medium hover:underline underline-offset-4">
              View All
            </Link>
          </div>
          {!data ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-12 rounded-xl" />
              ))}
            </div>
          ) : data.contacts?.length > 0 ? (
            <div className="space-y-2">
              {data.contacts.map((c) => (
                <Link
                  key={c.id}
                  href="/admin/contacts"
                  className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                    c.isRead
                      ? "bg-white/[0.02] border-white/[0.04] hover:border-[#D4AF37]/20"
                      : "bg-[#D4AF37]/[0.03] border-[#D4AF37]/15 hover:border-[#D4AF37]/30"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      c.isRead ? "bg-white/[0.04] text-white/30" : "bg-[#D4AF37]/20 text-[#D4AF37]"
                    }`}>
                      {c.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-white text-sm font-medium truncate">{c.name}</span>
                        {!c.isRead && <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />}
                      </div>
                      <div className="text-white/30 text-xs truncate">{c.eventType || c.email}</div>
                    </div>
                  </div>
                  <span className="text-white/20 text-xs shrink-0 ml-4">{new Date(c.createdAt).toLocaleDateString()}</span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-white/20 text-sm">No messages yet.</p>
          )}
        </div>
    </div>
  );
}
