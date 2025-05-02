import { LoginForm } from "@/components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BTL - Inicio de Sesión",
  keywords: ["BTL", "Inicio de Sesión", "Login"],
  description: "Página de inicio de sesión para BTL"
};

export default function LoginPage() {
  return (
    <div className="relative bg-[#005da8b3] max-h-screen overflow-hidden flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6 z-50">
        <LoginForm />
      </div>
      
      {/* Background TOP circles */}
      <div className="absolute z-30 block top-[-128] right-[-128] w-[256px] h-[256px] rounded-full bg-[#AA8E73]"></div>
      <div className="absolute z-20 block top-[-178] right-[-178] w-[356px] h-[356px] rounded-full bg-[#6F5E52]"></div>
      <div className="absolute z-10 block top-[-228] right-[-228] w-[456px] h-[456px] rounded-full bg-[#182A76]"></div>

      {/* Background BOTTOM circles */}
      <div className="absolute z-30 block bottom-[-128] left-[-128] w-[256px] h-[256px] rounded-full bg-[#AA8E73]"></div>
      <div className="absolute z-20 block bottom-[-178] left-[-178] w-[356px] h-[356px] rounded-full bg-[#6F5E52]"></div>
      <div className="absolute z-10 block bottom-[-228] left-[-228] w-[456px] h-[456px] rounded-full bg-[#182A76]"></div>
    </div>
  );
}
