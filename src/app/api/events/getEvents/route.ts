import { apiAuth } from "@/lib/apiAuth";
import { prisma } from "@/lib/prisma";
import { requestDataStorage } from "@/lib/requestData";
import { NextResponse, type NextRequest } from "next/server";

export const POST = apiAuth(async (request: NextRequest) => {
    const requestData = requestDataStorage.getStore();
    if (!requestData?.email || !requestData.id || !requestData.role) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const data = await prisma.event.findMany({
        where: {
            users: {
                some: {
                    user: {
                        email: requestData.email
                    }
                }
            }
        },
        select: {
            id: true,
            eventName: true,
            slug: true,
            description: true,
            startDate: true,
            endDate: true,
            logo: true
        }
    })
    if (!data) return NextResponse.json([], { status: 200 });
    return NextResponse.json(data)
})