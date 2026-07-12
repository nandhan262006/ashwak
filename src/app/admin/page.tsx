import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { HiBriefcase, HiPhoto, HiStar, HiEnvelope, HiDocumentText, HiUser } from "react-icons/hi2";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [services, servicesCount, gallery, galleryCount, googleReviews, reviewsCount, blogPosts, about, contacts, unreadContacts] = await Promise.all([
    prisma.service.findMany({ orderBy: { sortOrder: "asc" }, take: 6 }),
    prisma.service.count(),
    prisma.galleryImage.findMany({ orderBy: { sortOrder: "asc" }, take: 6 }),
    prisma.galleryImage.count(),
    prisma.googleReview.findMany({ orderBy: { sortOrder: "asc" }, take: 4 }),
    prisma.googleReview.count(),
    prisma.blogPost.findMany({ orderBy: { createdAt: "desc" }, take: 4 }),
    prisma.aboutSection.findFirst({ orderBy: { updatedAt: "desc" } }),
    prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.contactSubmission.count({ where: { isRead: false } }),
  ]);

  const stats = [
    { label: "Services", count: servicesCount, href: "/admin/services", icon: HiBriefcase, color: "from-blue-500/20 to-blue-600/20", iconColor: "text-blue-400" },
    { label: "Gallery", count: galleryCount, href: "/admin/gallery", icon: HiPhoto, color: "from-purple-500/20 to-purple-600/20", iconColor: "text-purple-400" },
    { label: "Reviews", count: reviewsCount, href: "/admin/google-reviews", icon: HiStar, color: "from-yellow-500/20 to-yellow-600/20", iconColor: "text-yellow-400" },
    { label: "Contacts", count: contacts.length, href: "/admin/contacts", icon: HiEnvelope, color: "from-green-500/20 to-green-600/20", iconColor: "text-green-400", badge: unreadContacts > 0 ? unreadContacts : null },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-white/40 text-sm mt-1">Welcome back to your admin panel</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group relative bg-[#111111] border border-white/5 rounded-2xl p-5 hover:border-[#D4AF37]/30 transition-all duration-300"
          >
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                {stat.badge && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-[#D4AF37] text-[#0c0c0c] rounded-full">
                    {stat.badge}
                  </span>
                )}
              </div>
              <div className="text-3xl font-bold text-white">{stat.count}</div>
              <div className="text-white/40 text-sm mt-1">{stat.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Content grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* About Section */}
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
                <HiUser className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h2 className="text-lg font-semibold text-white">About Section</h2>
            </div>
            <Link href="/admin/about" className="text-[#D4AF37] text-sm hover:underline">
              Edit
            </Link>
          </div>
          {about ? (
            <div className="flex items-start gap-4">
              {about.image && (
                <Image src={about.image} alt={about.title} width={80} height={80} className="rounded-xl object-cover w-20 h-20" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-white/60 text-sm line-clamp-2">{about.content}</p>
                {about.tags && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {about.tags.split(",").slice(0, 3).map((tag: string) => (
                      <span key={tag} className="text-xs px-2.5 py-1 bg-white/5 text-white/60 rounded-lg">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="text-white/30 text-sm">
              No about section yet.{" "}
              <Link href="/admin/about" className="text-[#D4AF37] hover:underline">
                Create one
              </Link>
            </p>
          )}
        </div>

        {/* Services */}
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <HiBriefcase className="w-5 h-5 text-blue-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Services</h2>
            </div>
            <Link href="/admin/services" className="text-[#D4AF37] text-sm hover:underline">
              Manage
            </Link>
          </div>
          {services.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {services.map((s) => (
                <Link
                  key={s.id}
                  href={`/admin/services/${s.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#0c0c0c] border border-white/5 hover:border-[#D4AF37]/30 transition-colors"
                >
                  {s.image && (
                    <Image src={s.image} alt={s.title} width={40} height={40} className="rounded-lg object-cover w-10 h-10" />
                  )}
                  <div className="min-w-0">
                    <div className="text-white text-sm font-medium truncate">{s.title}</div>
                    <div className="text-white/40 text-xs">{s.isActive ? "Active" : "Inactive"}</div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-white/30 text-sm">
              No services yet.{" "}
              <Link href="/admin/services/new" className="text-[#D4AF37] hover:underline">
                Add one
              </Link>
            </p>
          )}
        </div>

        {/* Gallery */}
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <HiPhoto className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Gallery</h2>
            </div>
            <Link href="/admin/gallery" className="text-[#D4AF37] text-sm hover:underline">
              Manage
            </Link>
          </div>
          {gallery.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {gallery.map((g) => (
                <Link
                  key={g.id}
                  href={`/admin/gallery/${g.id}`}
                  className="relative aspect-square rounded-xl overflow-hidden border border-white/5 hover:border-[#D4AF37]/30 transition-colors"
                >
                  <Image src={g.src} alt={g.title} fill className="object-cover" sizes="100px" />
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-white/30 text-sm">
              No gallery images yet.{" "}
              <Link href="/admin/gallery/new" className="text-[#D4AF37] hover:underline">
                Add one
              </Link>
            </p>
          )}
        </div>

        {/* Google Reviews */}
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                <HiStar className="w-5 h-5 text-yellow-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Google Reviews</h2>
            </div>
            <Link href="/admin/google-reviews" className="text-[#D4AF37] text-sm hover:underline">
              Manage
            </Link>
          </div>
          {googleReviews.length > 0 ? (
            <div className="space-y-3">
              {googleReviews.map((r) => (
                <Link
                  key={r.id}
                  href={`/admin/google-reviews/${r.id}`}
                  className="block p-3 rounded-xl bg-[#0c0c0c] border border-white/5 hover:border-[#D4AF37]/30 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white text-sm font-medium">{r.name}</span>
                    <span className="text-yellow-400 text-xs">{"★".repeat(r.rating)}</span>
                    {r.date && <span className="text-white/30 text-xs ml-auto">{r.date}</span>}
                  </div>
                  <p className="text-white/50 text-xs line-clamp-1">{r.text}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-white/30 text-sm">
              No reviews yet.{" "}
              <Link href="/admin/google-reviews/new" className="text-[#D4AF37] hover:underline">
                Add one
              </Link>
            </p>
          )}
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Blog Posts */}
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                <HiDocumentText className="w-5 h-5 text-green-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Blog Posts</h2>
            </div>
            <Link href="/admin/blog" className="text-[#D4AF37] text-sm hover:underline">
              Manage
            </Link>
          </div>
          {blogPosts.length > 0 ? (
            <div className="space-y-2">
              {blogPosts.map((p) => (
                <Link
                  key={p.id}
                  href={`/admin/blog/${p.id}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#0c0c0c] border border-white/5 hover:border-[#D4AF37]/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-white text-sm font-medium">{p.title}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${p.isPublished ? "bg-green-500/20 text-green-400" : "bg-white/10 text-white/40"}`}>
                      {p.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                  <span className="text-white/30 text-xs">{new Date(p.createdAt).toLocaleDateString()}</span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-white/30 text-sm">
              No blog posts yet.{" "}
              <Link href="/admin/blog/new" className="text-[#D4AF37] hover:underline">
                Write one
              </Link>
            </p>
          )}
        </div>

        {/* Recent Contacts */}
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
                <HiEnvelope className="w-5 h-5 text-pink-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Recent Contacts</h2>
            </div>
            <Link href="/admin/contacts" className="text-[#D4AF37] text-sm hover:underline">
              View All
            </Link>
          </div>
          {contacts.length > 0 ? (
            <div className="space-y-2">
              {contacts.map((c) => (
                <Link
                  key={c.id}
                  href="/admin/contacts"
                  className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                    c.isRead
                      ? "bg-[#0c0c0c] border-white/5 hover:border-[#D4AF37]/30"
                      : "bg-[#0c0c0c] border-[#D4AF37]/30 hover:border-[#D4AF37]/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-white text-sm font-medium">{c.name}</span>
                    {!c.isRead && <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />}
                    <span className="text-white/40 text-xs">{c.eventType}</span>
                  </div>
                  <span className="text-white/30 text-xs">{new Date(c.createdAt).toLocaleDateString()}</span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-white/30 text-sm">No contact submissions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
