import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LogoBadge } from "@/components/brand/Logo";
import { SignInBackLink } from "@/components/layout/SignInBackLink";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 text-center max-w-md mx-auto min-h-[60vh]">
      <LogoBadge size={52} className="mb-4" />
      <h2 className="text-3xl font-extrabold text-ink tracking-tight mb-2">
        Page Not Found
      </h2>
      <p className="text-xs text-pencil mb-6">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link
        href="/niches"
        className="btn-primary-kinetic px-5 py-2.5 rounded-xl text-white text-xs font-semibold inline-flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Niches</span>
      </Link>
      <SignInBackLink />
    </div>
  );
}
