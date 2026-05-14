import type { Metadata } from "next";
import AdminShell from "@/components/admin/AdminShell";
import { Toast } from "@/components/ui/FloatingWidgets";

export const metadata: Metadata = {
  title: "Admin Panel | Armooh-Williams, PLLC",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminShell>{children}</AdminShell>
      <Toast />
    </>
  );
}
