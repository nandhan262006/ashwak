import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
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

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Link href="/admin/services" className="rounded-lg bg-dark-card border border-gold/20 p-4 hover:border-gold/50 transition-colors">
          <div className="text-cream/50 text-xs uppercase tracking-wider">Services</div>
          <div className="text-2xl font-bold text-gold mt-1">{servicesCount}</div>
        </Link>
        <Link href="/admin/gallery" className="rounded-lg bg-dark-card border border-gold/20 p-4 hover:border-gold/50 transition-colors">
          <div className="text-cream/50 text-xs uppercase tracking-wider">Gallery</div>
          <div className="text-2xl font-bold text-gold mt-1">{galleryCount}</div>
        </Link>
        <Link href="/admin/google-reviews" className="rounded-lg bg-dark-card border border-gold/20 p-4 hover:border-gold/50 transition-colors">
          <div className="text-cream/50 text-xs uppercase tracking-wider">Reviews</div>
          <div className="text-2xl font-bold text-gold mt-1">{reviewsCount}</div>
        </Link>
        <Link href="/admin/contacts" className="rounded-lg bg-dark-card border border-gold/20 p-4 hover:border-gold/50 transition-colors">
          <div className="text-cream/50 text-xs uppercase tracking-wider">Contacts</div>
          <div className="text-2xl font-bold text-gold mt-1">{contacts.length}</div>
          {unreadContacts > 0 && <span className="text-xs text-red-400">{unreadContacts} unread</span>}
        </Link>
      </div>

      {/* About Section */}
      <div className="rounded-lg bg-dark-card border border-gold/20 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">About Section</h2>
          <Link href="/admin/about" className="text-gold text-sm hover:underline">Edit →</Link>
        </div>
        {about ? (
          <div className="flex items-start gap-4">
            {about.image && (
              <Image src={about.image} alt={about.title} width={120} height={80} className="rounded object-cover h-20" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-cream/70 text-sm line-clamp-2">{about.content}</p>
              {about.tags && (
                <div className="flex gap-2 mt-2">
                  {about.tags.split(",").slice(0, 4).map((tag: string) => (
                    <span key={tag} className="text-xs px-2 py-0.5 border border-gold/30 text-gold">{tag.trim()}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="text-cream/40 text-sm">No about section yet. <Link href="/admin/about" className="text-gold hover:underline">Create one</Link></p>
        )}
      </div>

      {/* Services */}
      <div className="rounded-lg bg-dark-card border border-gold/20 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Services</h2>
          <Link href="/admin/services" className="text-gold text-sm hover:underline">Manage →</Link>
        </div>
        {services.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {services.map((s) => (
              <Link key={s.id} href={`/admin/services/${s.id}`} className="flex items-center gap-3 p-3 rounded bg-dark-surface border border-cream/5 hover:border-gold/30 transition-colors">
                {s.image && <Image src={s.image} alt={s.title} width={48} height={48} className="rounded object-cover h-12 w-12" />}
                <div className="min-w-0">
                  <div className="text-cream text-sm font-medium truncate">{s.title}</div>
                  <div className="text-cream/40 text-xs">{s.isActive ? "Active" : "Inactive"}</div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-cream/40 text-sm">No services yet. <Link href="/admin/services/new" className="text-gold hover:underline">Add one</Link></p>
        )}
      </div>

      {/* Gallery */}
      <div className="rounded-lg bg-dark-card border border-gold/20 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Gallery</h2>
          <Link href="/admin/gallery" className="text-gold text-sm hover:underline">Manage →</Link>
        </div>
        {gallery.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {gallery.map((g) => (
              <Link key={g.id} href={`/admin/gallery/${g.id}`} className="relative aspect-square rounded overflow-hidden border border-cream/5 hover:border-gold/30 transition-colors">
                <Image src={g.src} alt={g.title} fill className="object-cover" sizes="80px" />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-cream/40 text-sm">No gallery images yet. <Link href="/admin/gallery/new" className="text-gold hover:underline">Add one</Link></p>
        )}
      </div>

      {/* Google Reviews */}
      <div className="rounded-lg bg-dark-card border border-gold/20 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Google Reviews</h2>
          <Link href="/admin/google-reviews" className="text-gold text-sm hover:underline">Manage →</Link>
        </div>
        {googleReviews.length > 0 ? (
          <div className="space-y-3">
            {googleReviews.map((r) => (
              <Link key={r.id} href={`/admin/google-reviews/${r.id}`} className="block p-3 rounded bg-dark-surface border border-cream/5 hover:border-gold/30 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-cream text-sm font-medium">{r.name}</span>
                  <span className="text-gold text-xs">{"★".repeat(r.rating)}</span>
                  {r.date && <span className="text-cream/30 text-xs ml-auto">{r.date}</span>}
                </div>
                <p className="text-cream/50 text-xs line-clamp-1">{r.text}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-cream/40 text-sm">No reviews yet. <Link href="/admin/google-reviews/new" className="text-gold hover:underline">Add one</Link></p>
        )}
      </div>

      {/* Recent Blog Posts */}
      <div className="rounded-lg bg-dark-card border border-gold/20 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Blog Posts</h2>
          <Link href="/admin/blog" className="text-gold text-sm hover:underline">Manage →</Link>
        </div>
        {blogPosts.length > 0 ? (
          <div className="space-y-2">
            {blogPosts.map((p) => (
              <Link key={p.id} href={`/admin/blog/${p.id}`} className="flex items-center justify-between p-3 rounded bg-dark-surface border border-cream/5 hover:border-gold/30 transition-colors">
                <div>
                  <span className="text-cream text-sm font-medium">{p.title}</span>
                  <span className={`ml-2 text-xs ${p.isPublished ? "text-green-400" : "text-cream/30"}`}>{p.isPublished ? "Published" : "Draft"}</span>
                </div>
                <span className="text-cream/30 text-xs">{new Date(p.createdAt).toLocaleDateString()}</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-cream/40 text-sm">No blog posts yet. <Link href="/admin/blog/new" className="text-gold hover:underline">Write one</Link></p>
        )}
      </div>

      {/* Recent Contacts */}
      <div className="rounded-lg bg-dark-card border border-gold/20 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Recent Contacts</h2>
          <Link href="/admin/contacts" className="text-gold text-sm hover:underline">View All →</Link>
        </div>
        {contacts.length > 0 ? (
          <div className="space-y-2">
            {contacts.map((c) => (
              <Link key={c.id} href="/admin/contacts" className={`flex items-center justify-between p-3 rounded border transition-colors ${c.isRead ? "bg-dark-surface border-cream/5 hover:border-gold/30" : "bg-dark-surface border-gold/30 hover:border-gold/50"}`}>
                <div>
                  <span className="text-cream text-sm font-medium">{c.name}</span>
                  {!c.isRead && <span className="ml-2 w-2 h-2 inline-block rounded-full bg-gold" />}
                  <span className="text-cream/40 text-xs ml-2">{c.eventType}</span>
                </div>
                <span className="text-cream/30 text-xs">{new Date(c.createdAt).toLocaleDateString()}</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-cream/40 text-sm">No contact submissions yet.</p>
        )}
      </div>
    </div>
  );
}
