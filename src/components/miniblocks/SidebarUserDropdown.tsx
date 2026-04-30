import { useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SidebarMenuButton } from "../ui/sidebar";
import { UserContext } from "@/context/user-context";
import config from "../../../config.json";
import { Label } from "../ui/label";
import { ChevronDown, ChevronUp, LogOut, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

export default function SidebarUserDropdown({
  isMobile,
}: {
  isMobile: boolean;
}) {
  const ctx = useContext(UserContext);
  const handleLogout = async () => {
    ctx?.setEvents([]);
    ctx?.setUser({
      name: null,
      email: null,
      avatar: null,
    });
    redirect("/auth/login?logout=1");
  };
  const handleSettings = () => {
    redirect("/dashboard/settings")
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <SidebarMenuButton className="w-full bg-[#0b3869] text-bp-warning rounded-md hover:bg-[#0b3869] active:bg-[#0b3869] active:text-bp-warning hover:text-bp-warning data-[state=open]:bg-[#0b3869] data-[state=open]:text-bp-warning h-auto p-2">
            <Avatar className="rounded-md after:border-0">
              <AvatarImage
                src={ctx?.user?.avatar || config.defaultAvatar}
                alt="logo"
                className="rounded-md"
              />
              <AvatarFallback className="rounded-md bg-red-500 text-white">
                ?
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{ctx?.user?.name}</span>
              <span className="text-xs text-gray-400">{ctx?.user?.email}</span>
            </div>
          </SidebarMenuButton>
        }
      />
      <DropdownMenuContent
        className="w-[--radix-popper-anchor-width] bg-[#071930] border-none rounded-md"
        side={isMobile ? "bottom" : "right"}
        align="start"
      >
        <div className="px-4 py-2">
          <div className="flex items-center mt-1 gap-2">
            <Avatar className="rounded-md after:border-0">
              <AvatarImage
                src={ctx?.user?.avatar || config.defaultAvatar}
                alt="logo"
                className="rounded-md"
              />
              <AvatarFallback className="rounded-md bg-red-500 text-white">
                ?
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-bp-warning">
                {ctx?.user?.name}
              </span>
              <span className="text-xs text-gray-400">{ctx?.user?.email}</span>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator className="bg-[#0b3869]" />
        <DropdownMenuItem
          className="w-full rounded-md text-bp-warning focus:text-bp-warning focus:bg-[#0b3869]/90 focus:[&_svg]:stroke-bp-warning"
          onClick={handleSettings}
        >
          <Settings className="mr-2" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-[#0b3869]" />
        <DropdownMenuItem
          onClick={handleLogout}
          className="w-full rounded-md text-bp-warning focus:text-bp-warning focus:bg-[#0b3869]/90 focus:[&_svg]:stroke-bp-warning"
        >
          <LogOut className="mr-2" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
