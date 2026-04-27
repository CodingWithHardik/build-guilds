import { ChevronDown, ChevronUp, PlusIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SidebarMenuButton } from "../ui/sidebar";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState } from "react";

export default function SideBarMenuDropdown({
  events,
  isMobile,
  selectedEvent,
}: {
  events: {
    id: number;
    name: string;
    slug: string;
    domain: string;
    logo: string;
  }[];
  isMobile: boolean;
  selectedEvent: number;
}) {
  const [event, setEvent] = useState(selectedEvent);
  const handleSelectEvent = (id: number) => {
    setEvent(id);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <SidebarMenuButton className="w-full bg-[#0b3869] text-bp-warning rounded-md hover:bg-[#0b3869] active:bg-[#0b3869] active:text-bp-warning hover:text-bp-warning data-[state=open]:bg-[#0b3869] data-[state=open]:text-bp-warning h-auto p-2">
            {event === 0 ? (
              <div className="flex flex-row items-center gap-2 px-4">
                <p className="text-bp-warning">Select Event</p>
              </div>
            ) : (
              <>
                <Avatar className="rounded-md after:border-0">
                  <AvatarImage
                    src={events[Number(event) - 1]?.logo}
                    alt="@shadcn"
                    className="rounded-md"
                  />
                  <AvatarFallback className="rounded-md bg-red-500 text-white">
                    ?
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {events[Number(event) - 1]?.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {events[Number(event) - 1]?.domain}
                  </span>
                </div>
              </>
            )}
            <div className="ml-auto">
              <ChevronUp className="ml-auto" />
              <ChevronDown className="ml-auto" />
            </div>
          </SidebarMenuButton>
        }
      />
      <DropdownMenuContent
        className="w-[--radix-popper-anchor-width] bg-[#071930] border-none rounded-md"
        side={isMobile ? "bottom" : "right"}
        align="start"
      >
        <Label className="px-2 py-1 text-xs text-white">Events</Label>
        {events.map((event) => (
          <DropdownMenuItem
            key={event.id}
            className="text-bp-warning focus:text-bp-warning rounded-md focus:bg-[#0b3869]/60"
            onClick={() => handleSelectEvent(event.id)}
          >
            <Avatar className="rounded-md after:border-0">
              <AvatarImage
                src={event.logo}
                alt="@shadcn"
                className="rounded-md"
              />
              <AvatarFallback className="rounded-md bg-red-500 text-white">
                ?
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{event.name}</span>
              <span className="text-xs text-gray-400">{event.domain}</span>
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator className="bg-[#0b3869]" />
        <DropdownMenuItem className="flex flex-row items-center gap-2 text-bp-warning focus:text-bp-warning rounded-md focus:bg-[#0b3869]/60">
          <span className="size-4 shrink-0 flex items-center justify-center **:text-bp-warning!">
            <PlusIcon />
          </span>
          Add Event
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
