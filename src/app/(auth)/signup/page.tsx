import { SignUpForm } from "@/components/auth/SignUpForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up — CreatorLab",
  description: "Create your CreatorLab account to explore curated creators and generate short-form scripts.",
};

export default function SignUpPage() {
  return <SignUpForm />;
}
