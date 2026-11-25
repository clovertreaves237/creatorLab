"use client";

import { Star, Quote } from "lucide-react";

/**
 * Sandcastles Testimonials Section
 * Pixel-perfect match of media_1795525799627_5a613dc5.jpg:
 * - Star Rating Badge: 5 blue stars + "4.92 / 5 Rating"
 * - Heading: "Trusted by 100k+ creators and brands" (with "100k+" in electric blue)
 * - 3 Glassmorphic Testimonial cards with blue double quotes icon
 */
export function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      quote:
        "I just got the free trial and it's amazing. I have been using it and you guys need to try it out like right now. It saved me honestly days worth of work to research and create contrarian and hot takes.",
      author: "Verified Creator",
      role: "Solo Tech Founder",
      views: "1.2M monthly views",
    },
    {
      id: 2,
      quote:
        "Can confirm CreatorLab is fire. I'm a neuroscientist and it works for my advanced science content and mental health content! I was very skeptical at first and even canceled my subscription with the v1 of the software, but then they updated to v2 and I never looked back!",
      author: "Neuroscience Creator",
      role: "Science & Education Lead",
      views: "4.8M monthly views",
    },
    {
      id: 3,
      quote:
        "Used V1 several times with awesome success. seriously 3x views on IG in just the first two videos created using this tool. More importantly, I can begin to tell you the amount of stress this has taken away for me in the creation/scripting process.",
      author: "Short-Form Strategist",
      role: "Agency Founder",
      views: "3x View Growth",
    },
  ];

  return (
    <section className="relative w-full max-w-6xl mx-auto px-4 py-20 transition-all duration-300">
      {/* Star rating pill matching Image 2 */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-accent/20 text-xs font-semibold text-pencil mb-6 shadow-sm">
          <div className="flex items-center gap-0.5 text-accent">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
            ))}
          </div>
          <span className="text-ink font-bold ml-1">4.92 / 5</span>
          <span className="text-pencil/70">Rating</span>
        </div>

        {/* Heading with 100k+ in blue */}
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-ink max-w-3xl leading-tight">
          Trusted by <span className="text-accent">100k+</span> creators and brands
        </h2>
      </div>

      {/* 3 Glassmorphic Cards matching Image 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="group relative rounded-2xl bg-white border border-line hover:border-accent/40 p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between"
            style={{
              boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(37, 99, 235, 0.08)",
            }}
          >
            <div>
              {/* Blue Double Quote Icon matching Image 2 */}
              <div className="text-accent mb-4 opacity-90 transition-transform">
                <Quote className="w-8 h-8 fill-accent/20 text-accent rotate-180" />
              </div>

              {/* Quote text */}
              <p className="text-xs sm:text-[13px] text-ink/90 font-normal leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-line flex items-center justify-between text-xs">
              <span className="font-semibold text-ink">{t.author}</span>
              <span className="text-[11px] text-accent font-medium">{t.views}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
