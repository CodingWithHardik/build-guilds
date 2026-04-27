import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Build Guild - Dashboard",
  description: "Dashboard for Build Guild custom city website builder.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "16rem",
          "--sidebar-width-mobile": "20rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <div className="flex min-h-screen w-full">
        <SidebarTrigger className="absolute top-4 left-4 z-50 md:hidden" />
        {children}
      </div>
    </SidebarProvider>
  );
}
