"use client";

import { useState } from "react";
import { Plus, Minus, ArrowRight } from "lucide-react";

/**
 * Sandcastles FAQ Section
 * Exact recreation of media_1795525803303_39a32244.png:
 * - Left Column: "Still have questions?" + "Contact Us →" button
 * - Right Column: Filter tabs: [ General ] [ Billing ] [ Account ]
 * - Clean Accordions with + / - toggles matching Image 3
 */
export function FaqSection() {
  const [activeTab, setActiveTab] = useState<"general" | "billing" | "account">("general");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData = {
    general: [
      {
        q: "Who is CreatorLab for?",
        a: "CreatorLab is built for short-form video creators, agencies, brand marketers, and educators who want to identify high-performing content outliers, extract proven hook frameworks, and generate data-backed scripts in seconds without creative guesswork.",
      },
      {
        q: "Do I have to connect my social media accounts?",
        a: "No. You never need to connect or link your personal Instagram, TikTok, or YouTube accounts. CreatorLab indexes publicly accessible creator performance signals so your credentials remain completely private.",
      },
      {
        q: "How much does CreatorLab cost?",
        a: "CreatorLab offers a risk-free trial so you can experience full outlier analysis and script generation. Transparent monthly and annual plans are available for individual creators, teams, and enterprises.",
      },
      {
        q: "What are the usage limitations on my plan?",
        a: "Plans include generous daily script generations, unlimited database search across millions of analyzed videos, and multi-channel watchlist tracking with live metric updates.",
      },
    ],
    billing: [
      {
        q: "Can I cancel my subscription anytime?",
        a: "Yes, you can cancel your subscription at any time directly from your Account Settings with one click. You will retain access until the end of your current billing period.",
      },
      {
        q: "What payment methods are accepted?",
        a: "We support major credit cards (Visa, Mastercard, American Express) along with localized payment options to facilitate seamless checkout.",
      },
      {
        q: "Do you offer refunds?",
        a: "We provide a 7-day risk-free money-back guarantee if you are not completely satisfied with your experience.",
      },
    ],
    account: [
      {
        q: "How is my personal research data protected?",
        a: "Compliant with Cameroon Law No. 2024/017 on personal data protection and international privacy standards. Research notes entered for script synthesis are transmitted ephemerally to the Gemini API and immediately discarded. Notes are never saved to any database.",
      },
      {
        q: "Why must visitors register to view full creator lists?",
        a: "Visitor access is limited to prevent automated scraping and ensure API server stability for registered creators.",
      },
      {
        q: "Can I export or delete my generated scripts?",
        a: "Yes, all your generated scripts can be copied or downloaded directly, and you can permanently delete your generation history at any time.",
      },
    ],
  };

  const currentQuestions = faqData[activeTab];

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative w-full max-w-6xl mx-auto px-4 py-20 transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        
        {/* Left Column matching Image 3: Title + Contact Us Button */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-ink leading-tight">
            Still have questions?
          </h2>

          <div className="mt-8">
            <a
              href="mailto:support@creatorlab.app"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-paper-deep hover:bg-paper-deep border border-line text-ink text-xs font-semibold transition-all group"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right Column matching Image 3: Tab Pills & Accordions */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Tab Pill Capsule matching Image 3 */}
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white border border-line self-start">
            <button
              type="button"
              onClick={() => {
                setActiveTab("general");
                setOpenIndex(0);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === "general"
                  ? "bg-paper-deep text-ink shadow-sm border border-line"
                  : "text-pencil hover:text-ink"
              }`}
            >
              General
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("billing");
                setOpenIndex(0);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === "billing"
                  ? "bg-paper-deep text-ink shadow-sm border border-line"
                  : "text-pencil hover:text-ink"
              }`}
            >
              Billing
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("account");
                setOpenIndex(0);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === "account"
                  ? "bg-paper-deep text-ink shadow-sm border border-line"
                  : "text-pencil hover:text-ink"
              }`}
            >
              Account
            </button>
          </div>

          {/* Accordion List matching Image 3 */}
          <div className="divide-y divide-line text-left">
            {currentQuestions.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="py-4 sm:py-5">
                  <button
                    type="button"
                    onClick={() => toggleAccordion(idx)}
                    className="w-full flex items-center justify-between text-left group focus:outline-none"
                  >
                    <span className="text-sm sm:text-base font-semibold text-ink group-hover:text-accent transition-colors">
                      {item.q}
                    </span>
                    <div className="ml-4 w-7 h-7 rounded-full flex items-center justify-center text-pencil group-hover:text-ink shrink-0">
                      {isOpen ? (
                        <Minus className="w-4 h-4 text-accent" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="mt-3 text-xs sm:text-sm text-pencil leading-relaxed pr-6 animate-in fade-in duration-200">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
