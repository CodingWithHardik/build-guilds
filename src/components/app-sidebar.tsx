"use client";
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Sidebar, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "./ui/sidebar"
import { Label } from "./ui/label"
import Image from "next/image"
import SideBarMenuDropdown from "./miniblocks/SidebarDropdown"

export function AppSidebar() {
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar();
    const events = [
    {
      "id": 1,
      "name": "Build Guild",
      "slug": "build-guild",
      "domain": "buildguild.com",
      "logo": "https://avatars.githubusercontent.com/u/113587014?v=4"
    },
    {
      "id": 2,
      "name": "Build Guild",
      "slug": "build-guild",
      "domain": "buildguild.com",
      "logo": "https://avatars.githubusercontent.com/u/112583033?v=4"
    }
  ]
  return (
    <Sidebar>
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SideBarMenuDropdown events={events} isMobile={isMobile} selectedEvent={0} />
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
    </Sidebar>
  )
}