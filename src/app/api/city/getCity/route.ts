import { apiAuth } from "@/lib/apiAuth";
import { prisma } from "@/lib/prisma";
import { requestDataStorage } from "@/lib/requestData";
import { NextResponse, type NextRequest } from "next/server";

export const POST = apiAuth(async (request: NextRequest) => {
    const requestData = requestDataStorage.getStore();
    if (!requestData?.email || !requestData.id || !requestData.role) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { eventId } = await request.json();
    if (!eventId || typeof eventId !== "string") return NextResponse.json({ error: "Invalid event ID" }, { status: 400 });
    const data = await prisma.eventCities.findMany({
        where: {
            eventId: eventId,
            CityUsers: {
                some: {
                    userId: requestData.id
                }
            }
        },
        select: {
            id: true,
            cityslug: true,
            isVerified: true,
            verificationEmail: true,
            eventId: true,
            details: {
                select: {
                    id: true,
                    name: true,
                    date: true,
                    location: true,
                    signuplink: true,
                    slackChannel: true,
                    slug: true,
                    venue: true,
                    domain: true,
                    eventPlan: true,
                    eventSponsors: true,
                }
            }
            
        }
    })
    return NextResponse.json(data)
})