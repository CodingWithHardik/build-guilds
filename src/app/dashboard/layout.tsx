import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { Metadata } from "next";

export const metadata : Metadata = {
    title: "Build Guild - Dashboard",
    description: "Dashboard for Build Guild custom city website builder.",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex min-h-svh w-full">
        {children}
      </div>
    </SidebarProvider>
  );
}