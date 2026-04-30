"use client";

import { createContext, useState } from "react";

type UserData = {
  name: string | null;
  email: string | null;
  avatar: string | null;
};

type EventData = {
  eventId: string;
  eventName: string;
  eventslug: string;
  description: string;
  logo: string;
  startDate: string;
  endDate: string;
};

type UserContextType = {
  user: UserData | null;
  setUser: (data: UserData) => void;
  events: EventData[];
  setEvents: (data: EventData[]) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({
  children,
  userdata,
  eventsData,
}: {
  children: React.ReactNode;
  userdata: UserData;
  eventsData?: EventData[];
}) {
  const [user, setUser] = useState<UserData | null>(userdata);
  const [events, setEvents] = useState<EventData[]>(eventsData || []);
  return (
    <UserContext.Provider value={{ user, setUser, events, setEvents }}>
      {children}
    </UserContext.Provider>
  );
}