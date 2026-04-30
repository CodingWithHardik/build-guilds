import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "@/context/user-context";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getUsers } from "@/lib/functions/users/getUsers";
import { getEvents } from "@/lib/functions/events/getEvents";

export const metadata: Metadata = {
  title: "Build Guild - Blueprint",
  description:
    "A website creator studio for building your Build Guild custom city website.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let userData: { email: string; name: string; isNew?: boolean } | null = null;
  let eventsData: { id: string; eventName: string; slug: string; description: string; startDate: Date; endDate: Date; logo: string }[] | null = null;
  const headerlist = await headers();
  const pathname = headerlist.get("x-pathname") || headerlist.get("x-next-pathname") || "/";
  if (!pathname.startsWith("/auth")) {
    const host = headerlist.get("host");
    const cookie = headerlist.get("cookie") ?? undefined;
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const data = await getUsers(protocol, host!, String(cookie));
    const eventsDataResponse = await getEvents(protocol, host!, String(cookie));
    if (!data?.ok || data?.status === 401) {
     redirect("/auth/login?logout=1");
    };
    userData = await data.json();
    eventsData = await eventsDataResponse.json();
    if (!userData?.email) redirect("/auth/login");
    if (userData?.isNew && !pathname.startsWith("/onboarding")) redirect("/onboarding");
    if (!userData?.isNew && pathname.startsWith("/onboarding")) redirect("/");
    if (!userData?.name && !userData?.isNew) redirect("/auth/login");
    if (!eventsDataResponse?.ok || eventsDataResponse?.status === 401) {
     redirect("/auth/login?logout=1");
    };
  }

  return (
    <html lang="en" className="font-rcbasic">
      <body className="grid-bg grainy-bg">
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <filter id="grainy" x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency=".3"
              numOctaves="2"
            />
            <feColorMatrix type="saturate" values="0" />
            <feBlend in="SourceGraphic" mode="multiply" />
          </filter>
        </svg>
        {pathname.startsWith("/auth") ? (
          children
        ) : (
          <UserProvider userdata={{ email: userData?.email!, name: userData?.name! }} eventsData={eventsData?.map(
            (items) => ({
              eventId: items.id,
              eventName: items.eventName,
              eventslug: items.slug,
              description: items.description,
              logo: items.logo,
              startDate: items.startDate.toString(),
              endDate: items.endDate.toString()
            })
          )!}>
            {children}
          </UserProvider>
        )}
      </body>
    </html>
  );
}
