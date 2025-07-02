import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-2 md:p-6 flex-col gap-8">
      <div className="w-full max-w-full flex items-center justify-center">
        <SignupForm />
      </div>
    </div>
  );
}
