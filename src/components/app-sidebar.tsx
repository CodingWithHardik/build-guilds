"use client";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, useSidebar } from "./ui/sidebar"
import SideBarMenuDropdown from "./miniblocks/SidebarDropdown"
import { useContext } from "react";
import { UserContext } from "@/context/user-context";
import SidebarUserDropdown from "./miniblocks/SidebarUserDropdown";

export function AppSidebar({ host }: { host: string }) {
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar();
  const ctx = useContext(UserContext);
  const date = (dataget: string) => {
    const date = new Date(dataget);
    const utcDate = date.getUTCDate();
    const utcmonth = date.toLocaleString("en-GB", { month: "long" });
    const suffix = ["th", "st", "nd", "rd"][(utcDate % 10 > 3 || Math.floor(utcDate / 10) === 1) ? 0 : (utcDate % 10)];
    return `${utcDate}${suffix} ${utcmonth}`;
  }
  const events = ctx?.events.map((eventsone, index) => ({
    id: index + 1,
    name: eventsone.eventName,
    slug: eventsone.eventslug,
    domain: `${host}/${eventsone.eventslug}/preview`,
    logo: eventsone.logo,
    description: eventsone.description,
    startDate: eventsone.startDate,
    endDate: eventsone.endDate,
    subheading: `${date(eventsone.startDate)} - ${date(eventsone.endDate)}`,
  })) ?? [];
  return (
    <Sidebar>
        <SidebarHeader className="my-1">
            <SidebarMenu>
                <SidebarMenuItem>
                    <SideBarMenuDropdown events={events} isMobile={isMobile} />
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>

        </SidebarContent>
        <SidebarFooter className="my-1">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarUserDropdown isMobile={isMobile} />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}