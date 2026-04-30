import { apiAuth } from "@/lib/apiAuth";
import { prisma } from "@/lib/prisma";
import { requestDataStorage } from "@/lib/requestData";
import { NextResponse, type NextRequest } from "next/server";

export const POST = apiAuth(async (request: NextRequest) => {
    const requestData = requestDataStorage.getStore();
    if (!requestData?.email || !requestData.id || !requestData.role) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { name, slug, description, startDate, endDate } = await request.json();
    if (!name || !slug || !description || !startDate || !endDate) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    if (/^[a-z0-9-]+$/.test(slug) === false) return NextResponse.json({ error: "Invalid slug format" }, { status: 400 });
    const mainslug = slug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const existingEvent = await prisma.event.findUnique({
        where: {
            slug: mainslug
        }
    });
    if (existingEvent) {
        return NextResponse.json({ error: "Event already exists" }, { status: 400 });
    }
    const utcStartDate = new Date(startDate).toUTCString();
    const utcEndDate = new Date(endDate).toUTCString();
    const event = await prisma.event.create({
        data: {
            eventName: name,
            slug: mainslug,
            description,
            startDate: new Date(utcStartDate),
            endDate: new Date(utcEndDate),
            users: {
                create: {
                    user: {
                        connect: {
                            email: requestData.email
                        }
                    },
                    role: "LEADERSHIP"
                }
            }
        }
    })
    const eventId = event.id;
    return NextResponse.json({ message: "Event created successfully", eventId }, { status: 201 });
})