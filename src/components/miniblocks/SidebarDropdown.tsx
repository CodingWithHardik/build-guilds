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
import { useContext, useEffect, useState } from "react";
import { format, set } from "date-fns";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Field, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { UserContext } from "@/context/user-context";
import config from "../../../config.json"

export default function SideBarMenuDropdown({
  events,
  isMobile,
}: {
  events: {
    id: number;
    name: string;
    slug: string;
    domain: string;
    logo: string;
    description: string;
    startDate: string;
    endDate: string;
    subheading: string;
  }[];
  isMobile: boolean;
}) {
  const ctx = useContext(UserContext);
  const [event, setEvent] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [data, setData] = useState({
    name: "",
    username: "",
    description: "",
    logo: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
  });

  const [datepopupOpen1, setDatePopupOpen1] = useState(false);
  const [datepopupOpen2, setDatePopupOpen2] = useState(false);

  const [loading, setLoading] = useState(false);

  const [isUserNameValidMsg, setIsUserNameValidMsg] = useState<boolean | null>(
    null,
  );
  const [debouncedUsername, setDebouncedUsername] = useState(data.username);

  const [error, setError] = useState(undefined as string | undefined);
  useEffect(() => {
    if (typeof window !== "undefined" && ctx?.user?.email) {
      const selectedEvent = localStorage.getItem(
        `${ctx?.user?.email}_selectedEvent`,
      );
      if (selectedEvent) {
        setEvent(Number(selectedEvent));
      }
    }
  }, [ctx?.user?.email]);
  const handleSelectEvent = (id: number) => {
    setEvent(id);
    localStorage.setItem(`${ctx?.user?.email}_selectedEvent`, String(id));
  };

  const handlepopover = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (String(error)?.length > 1) {
      setLoading(false);
    }
    if (!data.name || !data.username || !data.description || !data.startDate || !data.endDate) {
      setError("Please fill all the fields");
      setLoading(false);
      return;
    }
    if (!isUserNameValidMsg) {
      setError("Please enter a valid username");
      setLoading(false);
      return;
    }
    const startDate = new Date(data.startDate!);
    const endDate = new Date(data.endDate!);
    if (startDate >= endDate) {
      setError("Start date must be before end date");
      setLoading(false);
      return;
    }
    const res = await fetch("/api/events/createEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        slug: data.username,
        description: data.description,
        logo: data.logo,
        startDate: startDate,
        endDate: endDate,
      }),
    });
    if (!res.ok) {
      setError("Error creating event");
      setLoading(false);
      return;
    }
    if (res.status === 401) {
      setError("Please re-login to create event");
      setLoading(false);
      return;
    }
    const responseData = await res.json();
    if (res.status === 400) {
      setError(responseData.error);
      setLoading(false);
      return;
    }
    if (res.status === 201) {
      setError(undefined);
      ctx?.setEvents([
        {
          eventId: responseData.id,
          eventName: data.name,
          eventslug: data.username,
          description: data.description,
          startDate: String(data.startDate),
          endDate: String(data.endDate),
          logo: data.logo.length > 0 ? data.logo : config.eventLogo,
        },
        ...ctx?.events,
      ])
      setData({
        name: "",
        username: "",
        description: "",
        logo: "",
        startDate: undefined,
        endDate: undefined,
      });
      setDialogOpen(false);
      setLoading(false);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedUsername(data.username);
    }, 600);
    return () => clearTimeout(timer);
  }, [data.username]);

  useEffect(() => {
    if (debouncedUsername.length < 1) {
      setIsUserNameValidMsg(null);
      return;
    }
    const check = async () => {
      setIsUserNameValidMsg(null);
      if (/^[a-z0-9-]+$/.test(debouncedUsername.toLowerCase()) === false) {
        setError(
          "Please don't use special characters and spaces in the username",
        );
        return;
      }
      const res = await fetch(`/api/events/checkEventSlug`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug: debouncedUsername.toLowerCase() }),
      });
      if (!res.ok) {
        setError("Error checking username");
        return;
      }
      if (res.status === 401) {
        setError("Please re-login to check username");
        return;
      }
      const resjs = await res.json();
      if (res.status === 400) {
        setError(resjs.error);
        return;
      }
      setError(undefined);
      setIsUserNameValidMsg(resjs.valid);
    };
    check();
  }, [debouncedUsername]);
  return (
    <>
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
                      src={events.find((e) => e.id === event)?.logo}
                      alt="logo"
                      className="rounded-md"
                    />
                    <AvatarFallback className="rounded-md bg-red-500 text-white">
                      ?
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {events.find((e) => e.id === event)?.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {events.find((e) => e.id === event)?.subheading}
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
          <Label className="px-2 py-1 text-xs text-bp-warning-darker">
            Events
          </Label>
          {events.map((event) => (
            <DropdownMenuItem
              key={event.id}
              className="
              group text-bp-warning focus:text-bp-warning rounded-md focus:bg-[#0b3869]/60
              [&_span.name]:text-bp-warning
              [&_span.domain]:text-gray-400
              focus:[&_span.name]:text-bp-warning
              focus:[&_span.domain]:text-gray-400
              active:[&_span.name]:text-bp-warning
              active:[&_span.domain]:text-gray-400
            "
              onClick={() => handleSelectEvent(event.id)}
            >
              <Avatar className="rounded-md after:border-0">
                <AvatarImage
                  src={event.logo}
                  alt="logo"
                  className="rounded-md"
                />
                <AvatarFallback className="rounded-md bg-red-500 text-white">
                  ?
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="name text-sm font-medium group-focus:text-bp-warning">
                  {event.name}
                </span>
                <span className="domain text-xs text-gray-400 group-focus:text-gray-400">
                  {event.subheading}
                </span>
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator className="bg-[#0b3869]" />
          <DropdownMenuItem
            className="flex flex-row items-center gap-2 text-bp-warning focus:text-bp-warning rounded-md focus:bg-[#0b3869]/60"
            onClick={() => setDialogOpen(true)}
          >
            <span className="size-4 shrink-0 flex items-center justify-center **:text-bp-warning!">
              <PlusIcon />
            </span>
            Add Event
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-sm rounded-md ring-4 ring-[#071930] bg-[#0b3869] border-none [&>button]:text-bp-warning [&>button]:hover:text-bp-warning-darker [&>button]:hover:bg-[#0b3869]/60 [&>button]:bg-[#0b3869]">
          <DialogHeader>
            <DialogTitle className="text-bp-warning text-center text-4xl font-bold font-rcfull">
              Create Event
            </DialogTitle>
            <DialogDescription className="text-gray-400 text-center text-sm mb-4">
              Create Event so organizers can manage or create thier city website
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlepopover}>
            <FieldGroup className="gap-4">
              <Field className="flex w-full flex-col gap-2">
                <Label className="text-left text-sm font-medium text-bp-warning-darker">
                  Event Name
                </Label>
                <Input
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full rounded-md border border-gray-500 px-3 py-2 focus:outline-none bg-white/10 placeholder:text-white text-white"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </Field>
              <Field className="flex w-full flex-col gap-2">
                <Label className="text-left text-sm font-medium text-bp-warning-darker">
                  Event Username
                </Label>
                <Input
                  type="text"
                  required
                  placeholder="username"
                  className="w-full rounded-md border border-gray-500 px-3 py-2 focus:outline-none bg-white/10 placeholder:text-white text-white"
                  value={data.username}
                  onChange={(e) =>
                    setData({ ...data, username: e.target.value })
                  }
                />
                {data.username.length > 0 && (
                  <p
                    className={cn(
                      "text-xs mt-1",
                      isUserNameValidMsg ? "text-green-500" : "text-red-500",
                    )}
                  >
                    {isUserNameValidMsg
                      ? "Username is valid"
                      : "Username is not valid"}
                  </p>
                )}
              </Field>
              <Field className="flex w-full flex-col gap-2">
                <Label className="text-left text-sm font-medium text-bp-warning-darker">
                  Event Description
                </Label>
                <Textarea
                  required
                  placeholder="Event description"
                  className="w-full rounded-md border border-gray-500 px-3 py-2 focus:outline-none bg-white/10 placeholder:text-white text-white "
                  value={data.description}
                  onChange={(e) => setData({ ...data, description: e.target.value })}
                />
              </Field>
              <Field className="flex w-full flex-col gap-2">
                <Label className="text-left text-sm font-medium text-bp-warning-darker">
                  Start Date
                </Label>
                <Popover onOpenChange={setDatePopupOpen1} open={datepopupOpen1}>
                  <PopoverTrigger
                    render={
                      <Button className="justify-start w-full rounded-md border border-gray-500 focus:outline-none bg-white/10 text-white hover:bg-white/10 data-[state=open]:bg-white/10 focus-visible::ring-3 focus-visible:ring-ring/30 focus-visible:border-ring">
                        {data.startDate ? (
                          format(data.startDate, "PPP")
                        ) : (
                          <span>Pick a start date</span>
                        )}
                      </Button>
                    }
                  />
                  <PopoverContent className="w-auto p-0 mx-auto bg-[#0b3869] rounded-md">
                    <Calendar
                      mode="single"
                      selected={data.startDate}
                      onSelect={(date) => {
                        setData({ ...data, startDate: date });
                        setDatePopupOpen1(false);
                      }}
                      defaultMonth={data.startDate}
                      className={cn("p-3 bg-[#0b3869] rounded-lg")}
                      classNames={{
                        caption_label:
                          "text-sm font-medium text-bp-warning-darker",
                        weekday:
                          "text-bp-warning-darker rounded-md w-9 font-normal text-[0.8rem]",
                        day: cn(
                          buttonVariants({ variant: "ghost" }),
                          "h-9 w-9 font-normal text-bp-warning ring-0 border-none",
                          "[&_button[data-selected-single='true']]:bg-bp-warning-darker [&_button[data-selected-single='true']]:text-[#0b3869]",
                          "[&_button:hover]:bg-bp-warning/60 [&_button:hover]:text-[#0b3869] hover:bg-bp-warning/60",
                        ),
                        outside: "text-bp-warning-darker",
                        today: "bg-[#0b3869] text-bp-warning",
                        button_next: "text-bp-warning-darker",
                        button_previous: "text-bp-warning-darker",
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </Field>
              <Field className="flex w-full flex-col gap-2">
                <Label className="text-left text-sm font-medium text-bp-warning-darker">
                  End Date
                </Label>
                <Popover onOpenChange={setDatePopupOpen2} open={datepopupOpen2}>
                  <PopoverTrigger
                    render={
                      <Button className="justify-start w-full rounded-md border border-gray-500 focus:outline-none bg-white/10 text-white hover:bg-white/10 data-[state=open]:bg-white/10 focus-visible::ring-3 focus-visible:ring-ring/30 focus-visible:border-ring">
                        {data.endDate ? (
                          format(data.endDate, "PPP")
                        ) : (
                          <span>Pick an end date</span>
                        )}
                      </Button>
                    }
                  />
                  <PopoverContent className="w-auto p-0 mx-auto bg-[#0b3869] rounded-md">
                    <Calendar
                      mode="single"
                      selected={data.endDate}
                      onSelect={(date) => {
                        setData({ ...data, endDate: date });
                        setDatePopupOpen2(false);
                      }}
                      defaultMonth={data.endDate}
                      className={cn("p-3 bg-[#0b3869] rounded-lg")}
                      classNames={{
                        caption_label:
                          "text-sm font-medium text-bp-warning-darker",
                        weekday:
                          "text-bp-warning-darker rounded-md w-9 font-normal text-[0.8rem]",
                        day: cn(
                          buttonVariants({ variant: "ghost" }),
                          "h-9 w-9 font-normal text-bp-warning ring-0 border-none",
                          "[&_button[data-selected-single='true']]:bg-bp-warning-darker [&_button[data-selected-single='true']]:text-[#0b3869]",
                          "[&_button:hover]:bg-bp-warning/60 [&_button:hover]:text-[#0b3869] hover:bg-bp-warning/60",
                        ),
                        outside: "text-bp-warning-darker",
                        today: "bg-[#0b3869] text-bp-warning",
                        button_next: "text-bp-warning-darker",
                        button_previous: "text-bp-warning-darker",
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </Field>
              <Field className="flex w-full flex-col gap-2">
                <p className="text-sm mt-1 text-red-500 font-medium ">
                  {error ? error : null}
                </p>
              </Field>
            </FieldGroup>
            <DialogFooter className="my-4">
              <Button
                type="submit"
                className="rounded-md bg-bp-warning-darker hover:bg-bp-warning/90 text-[#0b3869] font-medium"
                disabled={loading}
              >
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
