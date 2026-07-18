"use client";

import { useState, type FormEvent } from "react";
import { useScrollReveal } from "./useScrollReveal";

export default function Contact() {
  const sectionRef = useScrollReveal();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: form.get("name"),
          phone: form.get("phone"),
          email: form.get("email"),
          date: form.get("date"),
          eventType: form.get("eventType"),
          message: form.get("message"),
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send inquiry");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-dark">
      <div ref={sectionRef} className="fade-in-up max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-gold text-sm uppercase tracking-[0.3em] mb-3">Get in Touch</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-gradient">Contact Us</span>
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="bg-dark-card border border-gold/10 p-8">
              <h3 className="text-xl font-semibold text-cream mb-6">Contact Information</h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/20 flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-cream/50 text-xs uppercase tracking-wider mb-0.5">Phone</div>
                    <a href="tel:+916301658390" className="text-cream hover:text-gold transition-colors">
                      +91 63016 58390
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/20 flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <path d="M22 6l-10 7L2 6" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-cream/50 text-xs uppercase tracking-wider mb-0.5">Email</div>
                    <a href="mailto:info@ashwakphotography.in" className="text-cream hover:text-gold transition-colors">
                      info@ashwakphotography.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/20 flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-cream/50 text-xs uppercase tracking-wider mb-0.5">Location</div>
                    <span className="text-cream">Peralal, Chirala</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/20 flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#D4AF37">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-cream/50 text-xs uppercase tracking-wider mb-0.5">Follow Us</div>
                    <a
                      href="https://www.facebook.com/krantiphotography"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cream hover:text-gold transition-colors"
                    >
                      Facebook
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-dark-card border border-gold/10 p-8">
            {submitted ? (
              <div className="text-center py-16">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" className="mx-auto mb-4">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </svg>
                <h3 className="text-xl font-semibold text-gold mb-2">Thank You!</h3>
                <p className="text-cream/60">We&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-cream/50 text-xs uppercase tracking-wider mb-1.5">Name *</label>
                  <input
                    name="name"
                    required
                    className="w-full bg-dark-surface border border-cream/10 text-cream px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-cream/50 text-xs uppercase tracking-wider mb-1.5">Phone *</label>
                    <input
                      name="phone"
                      required
                      className="w-full bg-dark-surface border border-cream/10 text-cream px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-cream/50 text-xs uppercase tracking-wider mb-1.5">Email *</label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full bg-dark-surface border border-cream/10 text-cream px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-cream/50 text-xs uppercase tracking-wider mb-1.5">Event Date</label>
                    <input
                      name="date"
                      type="date"
                      className="w-full bg-dark-surface border border-cream/10 text-cream px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-cream/50 text-xs uppercase tracking-wider mb-1.5">Event Type *</label>
                    <select
                      name="eventType"
                      required
                      className="w-full bg-dark-surface border border-cream/10 text-cream px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors"
                    >
                      <option value="">Select</option>
                      <option value="wedding">Wedding</option>
                      <option value="prewedding">Pre-Wedding</option>
                      <option value="engagement">Engagement</option>
                      <option value="reception">Reception</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-cream/50 text-xs uppercase tracking-wider mb-1.5">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full bg-dark-surface border border-cream/10 text-cream px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gold text-dark font-semibold py-3 hover:bg-gold-light transition-colors disabled:opacity-50"
                >
                  {submitting ? "Sending..." : "Send Inquiry"}
                </button>
                {error && (
                  <p className="text-red-400 text-sm text-center mt-2">{error}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="relative border border-gold/10 overflow-hidden">
          <iframe
            src="https://www.google.com/maps?q=15.8325368,80.3616267&z=17&output=embed"
            width="100%"
            height="350"
            style={{ border: 0, filter: "grayscale(0.6) contrast(1.1) sepia(0.3)" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ashwak Photography Location"
          />
          <a
            href="https://maps.app.goo.gl/H91ET7VzCjv4rLbC7"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 right-3 bg-[#D4AF37] hover:bg-[#C4A030] text-[#0A0A0A] text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg transition-colors"
          >
            Open in Maps
          </a>
        </div>
      </div>
    </section>
  );
}
