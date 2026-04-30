import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Build Guild - Dashboard",
  description: "Dashboard for Build Guild custom city website builder.",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const head = await headers();
  const protocol = head.get("x-forwarded-proto") || "http";
  const host = head.get("host");
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "16rem",
          "--sidebar-width-mobile": "20rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar host={`${protocol}://${host}`} />
      <SidebarInset>
        <SidebarTrigger className="absolute top-4 left-4 z-50 md:hidden bg-bp-warning rounded-full border-2 border-[#0b3869] hover:bg-bp-warning hover:text-[#0b3869] text-[#0b3869]" />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}