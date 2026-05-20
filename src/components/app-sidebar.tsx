"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "./ui/sidebar";
import SideBarMenuDropdown from "./miniblocks/SidebarDropdown";
import { useContext } from "react";
import { UserContext } from "@/context/user-context";
import SidebarUserDropdown from "./miniblocks/SidebarUserDropdown";
import { redirect } from "next/navigation";
import Link from "next/link";
import { DropdownMenuSeparator } from "./ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { ChevronRight, Settings } from "lucide-react";

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
    const suffix = ["th", "st", "nd", "rd"][
      utcDate % 10 > 3 || Math.floor(utcDate / 10) === 1 ? 0 : utcDate % 10
    ];
    return `${utcDate}${suffix} ${utcmonth}`;
  };
  const events =
    ctx?.events.map((eventsone, index) => ({
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
        <DropdownMenuSeparator className="bg-[#0b3869] mb-0" />
      </SidebarHeader>
      <SidebarContent>
        {ctx?.selectedEvent === 0 ? (
          <SidebarGroup className="flex justify-center text-center items-center h-full text-bp-warning/60">
            Nothing selected yet
          </SidebarGroup>
        ) : (
          <>
            {!ctx?.isSelected ? (
              <SidebarGroup className="flex justify-center text-center items-center h-full text-bp-warning/60">
                Loading...
              </SidebarGroup>
            ) : (
              <SidebarGroup className="flex h-full justify-start py-0">
                <SidebarGroupLabel className="text-bp-warning-darker">
                  City
                </SidebarGroupLabel>
                {ctx?.city.length === 0 && (
                  <Link
                    href={`/dashboard/${ctx?.events[Number(ctx?.selectedEvent) - 1]?.eventslug}/preview/edit`}
                    className="flex items-center gap-2 w-full rounded-md px-3 py-2 text-sm font-medium hover:bg-[#0b3869]/80 hover:text-bp-warning transition-colors bg-[#0b3869] data-[state=open]:bg-[#0b3869] data-[state=open]:text-bp-warning text-bp-warning"
                  >
                    Edit Preview
                  </Link>
                )}
                {ctx?.city.length !== 0 &&
                  ctx?.city.map((cityone, index) => (
                    <Collapsible className="group/collapsible" key={index}>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          className="w-full rounded-md hover:bg-[#0b3869]/80 active:bg-[#0b3869]/80 text-left text-bp-warning active:text-bp-warning hover:text-bp-warning"
                          render={
                            <CollapsibleTrigger>
                              <span>{cityone.name}</span>
                              <ChevronRight className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
                            </CollapsibleTrigger>
                          }
                        />
                        <CollapsibleContent className="">
                          <SidebarMenuSub className="border-l-[#0b3869]">
                            <SidebarMenuSubItem>
                              <SidebarMenuButton
                                className="w-full rounded-md hover:bg-[#0b3869]/80 active:bg-[#0b3869]/80 text-left text-bp-warning active:text-bp-warning hover:text-bp-warning"
                                render={
                                  <a
                                    href={`/dashboard/${ctx?.events[Number(ctx?.selectedEvent) - 1]?.eventslug}/${cityone.slug}/edit`}
                                    className="w-full"
                                  >
                                    <span className="flex items-center gap-2">
                                      <Settings /> Settings
                                    </span>
                                  </a>
                                }
                              />
                            </SidebarMenuSubItem>
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ))}
              </SidebarGroup>
            )}
            <DropdownMenuSeparator className="bg-[#0b3869] m-0" />
            <SidebarGroup className="flex justify-end py-0">
              <SidebarGroupLabel className="text-bp-warning-darker">
                Event Settings
              </SidebarGroupLabel>
              <Link
                href={`/dashboard/${ctx?.events[Number(ctx?.selectedEvent) - 1]?.eventslug}/edit`}
                className="flex items-center gap-2 w-full rounded-md px-3 py-2 text-sm font-medium hover:bg-[#0b3869]/80 hover:text-bp-warning transition-colors bg-[#0b3869] data-[state=open]:bg-[#0b3869] data-[state=open]:text-bp-warning text-bp-warning"
              >
                Edit Event
              </Link>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>
      <SidebarFooter className="my-1">
        <DropdownMenuSeparator className="bg-[#0b3869]" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarUserDropdown isMobile={isMobile} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
