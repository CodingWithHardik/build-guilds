import { apiAuth } from "@/lib/apiAuth";
import { sanitizeInput } from "@/lib/functions/sanitization";
import { prisma } from "@/lib/prisma";
import { requestDataStorage } from "@/lib/requestData";
import { NextResponse, type NextRequest } from "next/server";

export const POST = apiAuth(async (request: NextRequest) => {
    const requestData = requestDataStorage.getStore();
    if (!requestData?.email || !requestData.id || !requestData.role) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { name } = await request.json();
    const namefiltered = sanitizeInput(name);
    if (!namefiltered || typeof namefiltered !== "string" || namefiltered.length > 50) return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    requestData.name = namefiltered;
    try {
        await prisma.user.update({
            where: {
                email: requestData.email
            },
            data: {
                name: namefiltered
            }
        })
        return NextResponse.json({ success: true, namefiltered });
    } catch (e) {
        return NextResponse.json({ error: "Failed to update name" }, { status: 400 });
    }
})