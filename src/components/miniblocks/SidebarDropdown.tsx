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
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Field, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { UserContext } from "@/context/user-context";
import config from "../../../config.json";
import { sanitizeHref, sanitizeInput } from "@/lib/functions/sanitization";

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
    emailSlug: "",
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
        ctx?.setSelectedEvent(Number(selectedEvent));
        const city = async (id: number) => {
          if (id === 0) return;
          const cityget = await fetch(`/api/city/getCity`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-csrf-token": ctx?.csrfToken || "",
            },
            body: JSON.stringify({
              eventId: ctx?.events[Number(id) - 1]?.eventId || "",
            }),
          });

          const cityjs = await cityget.json();
          const citydetails = cityjs.map((city: any) => ({
            id: city.id,
            slug: sanitizeInput(city.cityslug, { lowercase: true }),
            name: sanitizeInput(city.details.name),
            date: new Date(city.details.date),
            location: sanitizeInput(city.details.location),
            venue: sanitizeInput(city.details.venue),
            signuplink: sanitizeHref(city.details.signuplink, {
              fallback: "https://buildguild.tech/",
              onlyEndWithHref: false,
            }),
            slackChannel: sanitizeInput(city.details.slackChannel),
            domain: {
              name: sanitizeInput(city.details.domain.name),
              expiryDate: new Date(city.details.domain.expiryDate),
              verificationToken: sanitizeInput(
                city.details.domain.verificationToken,
              ),
              verified: city.details.domain.verified,
            },
            eventPlan: city.details.eventPlan.map((value: any) => ({
              title: sanitizeInput(value.title),
              description: sanitizeInput(value.description),
              endTime: new Date(value.endTime),
              startTime: new Date(value.startTime),
            })),
            eventSponsors: city.details.eventSponsors.map((value: any) => ({
              logo: sanitizeHref(value.logo, {
                fallback: "https://assets.hackclub.com/icon-rounded.svg",
                onlyEndWithHref: false,
              }),
              name: sanitizeInput(value.name),
            })),
          }));
          ctx?.setCity(citydetails || []);
          ctx?.setIsSelected(true);
        };
        if (ctx?.events.length === 0) {
          ctx?.setCity([]);
          ctx?.setIsSelected(true);
        } else {
          city(Number(selectedEvent));
        }
        setEvent(Number(sanitizeInput(selectedEvent)));
      }
    }
  }, [ctx?.user?.email]);
  const handleSelectEvent = (id: number) => {
    setEvent(Number(sanitizeInput(id.toString())));
    ctx?.setIsSelected(false);
    const city = async (id: number) => {
      if (id === 0) return;
      const cityget = await fetch(`/api/city/getCity`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": ctx?.csrfToken || "",
        },
        body: JSON.stringify({
          eventId: ctx?.events[Number(id) - 1]?.eventId || "",
        }),
      });
      const cityjs = await cityget.json();
      const citydetails = cityjs.map((city: any) => ({
        id: city.id,
        slug: sanitizeInput(city.cityslug, { lowercase: true }),
        name: sanitizeInput(city.details.name),
        date: new Date(city.details.date),
        location: sanitizeInput(city.details.location),
        venue: sanitizeInput(city.details.venue),
        signuplink: sanitizeHref(city.details.signuplink, {
          fallback: "https://buildguild.tech/",
          onlyEndWithHref: false,
        }),
        slackChannel: sanitizeInput(city.details.slackChannel),
        domain: {
          name: sanitizeInput(city.details.domain.name),
          expiryDate: new Date(city.details.domain.expiryDate),
          verificationToken: sanitizeInput(
            city.details.domain.verificationToken,
          ),
          verified: city.details.domain.verified,
        },
        eventPlan: city.details.eventPlan.map((value: any) => ({
          title: sanitizeInput(value.title),
          description: sanitizeInput(value.description),
          endTime: new Date(value.endTime),
          startTime: new Date(value.startTime),
        })),
        eventSponsors: city.details.eventSponsors.map((value: any) => ({
          logo: sanitizeHref(value.logo, {
            fallback: "https://assets.hackclub.com/icon-rounded.svg",
            onlyEndWithHref: false,
          }),
          name: sanitizeInput(value.name),
        })),
      }));
      ctx?.setCity(citydetails || []);
      ctx?.setIsSelected(true);
    };
    if (ctx?.events.length === 0) {
      ctx?.setCity([]);
      ctx?.setIsSelected(true);
    } else {
      city(Number(id));
    }
    localStorage.setItem(`${ctx?.user?.email}_selectedEvent`, String(id));
    ctx?.setSelectedEvent(Number(id));
  };

  const handlepopover = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (error && String(error)?.length > 1) {
      setLoading(false);
      return;
    }
    if (
      !data.name ||
      !data.username ||
      !data.description ||
      !data.startDate ||
      !data.endDate
    ) {
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
        "x-csrf-token": ctx?.csrfToken || "",
      },
      body: JSON.stringify({
        name: sanitizeInput(data.name),
        slug: sanitizeInput(data.username, {lowercase: true}),
        description: sanitizeInput(data.description, {preserveNewLines: true}),
        logo: sanitizeHref(data.logo, { allowedDomain: "cdn.hackclub.com", onlyEndWithHref: false, fallback: config.eventLogo }),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        emailSlug: sanitizeInput(data.emailSlug, {lowercase: true}),
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
          eventId: responseData.eventId,
          eventName: sanitizeInput(data.name),
          eventslug: sanitizeInput(data.username, {lowercase: true}),
          description: sanitizeInput(data.description, {preserveNewLines: true}),
          startDate: new Date(data.startDate).toString(),
          endDate: new Date(data.endDate).toString(),
          logo: sanitizeHref(data.logo, { allowedDomain: "cdn.hackclub.com", onlyEndWithHref: false, fallback: config.eventLogo }),
        },
        ...ctx?.events,
      ]);
      setData({
        name: "",
        username: "",
        description: "",
        emailSlug: "",
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
      setDebouncedUsername(sanitizeInput(data.username, {lowercase: true}));
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
          "x-csrf-token": ctx?.csrfToken || "",
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
          <form onSubmit={handlepopover} id="createEventForm">
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
                  onChange={(e) => setData({ ...data, name: sanitizeInput(e.target.value) })}
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
                    setData({ ...data, username: sanitizeInput(e.target.value, {lowercase: true}) })
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
                  Event Email Username
                </Label>

                <div className="flex items-center w-full rounded-md border border-gray-500 bg-white/10 overflow-hidden focus-within:ring-2 focus-within:ring-gray-500">
                  <span className="px-3 py-2 text-white/50 text-sm select-none bg-white/5 border-r border-gray-500 whitespace-nowrap">
                    @
                  </span>
                  <Input
                    type="text"
                    required
                    placeholder="Event Name"
                    className="flex-1 min-w-0 px-3 py-2 bg-transparent focus:outline-none placeholder:text-white/40 text-white text-sm rounded-none border-none"
                    value={data.emailSlug}
                    onChange={(e) =>
                      setData({ ...data, emailSlug: sanitizeInput(e.target.value, {lowercase: true}) })
                    }
                  />
                  <span className="px-3 py-2 text-white/50 text-sm select-none bg-white/5 border-l border-gray-500 whitespace-nowrap">
                    .hackclub.com
                  </span>
                </div>
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
                  onChange={(e) =>
                    setData({ ...data, description: sanitizeInput(e.target.value, {preserveNewLines: true}) })
                  }
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
                      onSelect={(date: Date | undefined) => {
                        setData({ ...data, startDate: new Date(date || "") });
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
                      onSelect={(date: Date | undefined) => {
                        setData({ ...data, endDate: new Date(date || "") });
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
                form="createEventForm"
              >
                {loading ? "Creating..." : "Create Event"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
