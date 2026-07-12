"use client";

import { useState, useEffect } from "react";
import { useScrollReveal } from "./useScrollReveal";

interface Review {
  name: string;
  text: string;
  rating: number;
  date: string | null;
}

const defaultReviews: Review[] = [
  { name: "Priya & Rahul", rating: 5, text: "Kranthi captured our wedding beautifully. Every photo tells a story. The candid shots were absolutely stunning!", date: "December 2025" },
  { name: "Ananya & Vikram", rating: 5, text: "Best wedding photographer in Nellore! The cinematic video was beyond our expectations. Highly recommend!", date: "November 2025" },
  { name: "Meera & Arjun", rating: 5, text: "The pre-wedding shoot was magical. Kranthi has an incredible eye for detail and makes you feel so comfortable.", date: "October 2025" },
  { name: "Divya & Sanjay", rating: 5, text: "From candid moments to grand portraits, every frame was perfect. The drone shots added a whole new dimension!", date: "September 2025" },
  { name: "Lakshmi & Ravi", rating: 5, text: "Our wedding album is absolutely gorgeous. Kranthi truly knows how to capture emotions and beautiful moments.", date: "August 2025" },
  { name: "Swathi & Kiran", rating: 5, text: "Professional, creative, and passionate. The reception coverage was fantastic. We love every single photo!", date: "July 2025" },
  { name: "Nisha & Karthik", rating: 5, text: "The engagement shoot was so much fun! Kranthi made us feel like models. Beautiful timeless photos.", date: "June 2025" },
  { name: "Revathi & Suresh", rating: 5, text: "Incredible service from start to finish. The traditional ceremony coverage was breathtaking. Worth every rupee!", date: "May 2025" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < rating ? "#D4AF37" : "none"} stroke={i < rating ? "#D4AF37" : "#666"} strokeWidth="1.5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex-shrink-0 w-80 bg-dark-card/80 gold-border gold-glow p-6 mx-3">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-lg">
          {review.name.charAt(0)}
        </div>
        <div>
          <div className="text-cream text-sm font-semibold">{review.name}</div>
          {review.date && <div className="text-cream/40 text-xs">{review.date}</div>}
        </div>
      </div>
      <StarRating rating={review.rating} />
      <p className="text-cream/70 text-sm leading-relaxed mt-3">{review.text}</p>
      <div className="flex items-center gap-1.5 mt-4">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        <span className="text-cream/50 text-xs">Google Review</span>
      </div>
    </div>
  );
}

export default function GoogleReviews() {
  const sectionRef = useScrollReveal();
  const [reviews, setReviews] = useState<Review[]>(defaultReviews);

  useEffect(() => {
    fetch("/api/admin/google-reviews")
      .then((r) => r.json())
      .then((data: unknown) => {
        if (!Array.isArray(data)) return;
        const active = data.filter(
          (r): r is Review & { isActive: boolean } =>
            typeof r === "object" && r !== null && "isActive" in r && Boolean((r as { isActive: unknown }).isActive)
        );
        if (active.length > 0) setReviews(active);
      })
      .catch(() => {});
  }, []);

  const allReviews = [...reviews, ...reviews];

  return (
    <section className="py-24 bg-dark-surface overflow-hidden">
      <div ref={sectionRef} className="fade-in-up max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Google Reviews</span>
          </h2>
          <div className="w-20 h-0.5 bg-gold mx-auto mb-4" />
          <div className="flex items-center justify-center gap-2 text-cream/60">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-sm">4.9/5 on Google</span>
            <span className="text-gold ml-1">{reviews.length > 0 ? `${reviews.length}+ Reviews` : "500+ Reviews"}</span>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark-surface to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark-surface to-transparent z-10" />
        <div className="flex animate-scroll">
          {allReviews.map((review, i) => (
            <ReviewCard key={`${review.name}-${i}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
