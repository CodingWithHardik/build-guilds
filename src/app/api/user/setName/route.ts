import { apiAuth } from "@/lib/apiAuth";
import { prisma } from "@/lib/prisma";
import { requestDataStorage } from "@/lib/requestData";
import { NextResponse, type NextRequest } from "next/server";

export const POST = apiAuth(async (request: NextRequest) => {
    const requestData = requestDataStorage.getStore();
    if (!requestData?.email || !requestData.id || !requestData.role) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { name } = await request.json();
    if (!name || typeof name !== "string" || name.length > 50) return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    requestData.name = name;
    try {
        await prisma.user.update({
            where: {
                email: requestData.email
            },
            data: {
                name
            }
        })
        return NextResponse.json({ success: true, name });
    } catch (e) {
        return NextResponse.json({ error: "Failed to update name" }, { status: 400 });
    }
})