import { apiAuth } from "@/lib/apiAuth";
import { sanitizeInput } from "@/lib/functions/sanitization";
import { prisma } from "@/lib/prisma";
import { requestDataStorage } from "@/lib/requestData";
import { NextResponse, type NextRequest } from "next/server";

export const POST = apiAuth(async (request: NextRequest) => {
  const requestData = requestDataStorage.getStore();
  if (!requestData?.email || !requestData.id || !requestData.role)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { name, slug, description, startDate, endDate, emailSlug } =
    await request.json();
  if (!name || !slug || !description || !startDate || !endDate || !emailSlug) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 },
    );
  }
  if (/^[a-z0-9-]+$/.test(slug) === false)
    return NextResponse.json({ error: "Invalid slug format" }, { status: 400 });
  const mainslug = slug
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  const emailSlugFormatted = emailSlug
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  const existingEvent = await prisma.event.findUnique({
    where: {
      slug: mainslug,
    },
  });
  if (existingEvent) {
    return NextResponse.json(
      { error: "Event already exists" },
      { status: 400 },
    );
  }
  const utcStartDate = new Date(startDate).toUTCString();
  const utcEndDate = new Date(endDate).toUTCString();
  const event = await prisma.event.create({
    data: {
      eventName: sanitizeInput(name),
      slug: sanitizeInput(mainslug, { lowercase: true }),
      description: sanitizeInput(description, { preserveNewLines: true }),
      startDate: new Date(utcStartDate),
      endDate: new Date(utcEndDate),
      emailSlug: sanitizeInput(emailSlugFormatted, { lowercase: true }),
      users: {
        create: {
          user: {
            connect: {
              email: sanitizeInput(requestData.email, { lowercase: true }),
            },
          },
          role: "LEADERSHIP",
        },
      },
    },
  });
  const eventId = event.id;
  await prisma.eventCities.create({
    data: {
      cityslug: `${mainslug}-city`,
      verificationEmail: "bla@bla.com",
      isVerified: true,
      event: {
        connect: {
          id: eventId,
        },
      },
      CityUsers: {
        create: {
          role: "ORGANIZER",
          user: {
            connect: {
              id: requestData.id,
            },
          },
        },
      },
      details: {
        create: {
          date: new Date(),
          location: "India",
          name: "Build Guild Kanpur45",
          signuplink: "https://example.com",
          slackChannel: "kd",
          slug: `${mainslug}-city`,
          venue: "TBD",
          domain: {
            create: {
              name: `${mainslug}-city.buildguilds.com`,
              expiryDate: new Date(),
              verificationToken: "bla",
              verified: true,
            },
          },
          eventPlan: {
            create: {
              title: "js",
              description: "ks",
              endTime: new Date(),
              startTime: new Date(),
            },
          },
          eventSponsors: {
            create: {
              logo: "sl",
              name: "bla",
            },
          },
        },
      },
    },
  });
  return NextResponse.json(
    { message: "Event created successfully", eventId },
    { status: 201 },
  );
});
