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

type CityData = {
  id: string;
  slug: string;
  name: string;
  date: Date;
  location: string;
  venue: string;
  signuplink: string;
  slackChannel: string;
  domain: string;
  eventPlan: Array<EventPlan>;
  eventSponsors: Array<EventSponsors>;
};

type EventPlan = {
  startTime: string;
  endTime: string;
  title: string;
  description: string;
}

type EventSponsors = {
  logo: string;
  name: string;
}

type UserContextType = {
  user: UserData | null;
  setUser: (data: UserData) => void;
  events: EventData[];
  setEvents: (data: EventData[]) => void;
  selectedEvent: Number;
  setSelectedEvent: (data: Number) => void;
  city: CityData[] | [];
  setCity: (data: CityData[]) => void;
  isSelected: Boolean;
  setIsSelected: (data: Boolean) => void;
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
  const [selectedEvent, setSelectedEvent] = useState<Number>(0);
  const [city, setCity] = useState<CityData[] | []>([]);
  const [isSelected, setIsSelected] = useState<Boolean>(false);
  return (
    <UserContext.Provider value={{ user, setUser, events, setEvents, selectedEvent, setSelectedEvent, city, setCity, isSelected, setIsSelected }}>
      {children}
    </UserContext.Provider>
  );
}