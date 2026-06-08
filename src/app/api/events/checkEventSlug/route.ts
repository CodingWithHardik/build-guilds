import { apiAuth } from "@/lib/apiAuth";
import { sanitizeInput } from "@/lib/functions/sanitization";
import { prisma } from "@/lib/prisma";
import { requestDataStorage } from "@/lib/requestData";
import { NextResponse, type NextRequest } from "next/server";

export const POST = apiAuth(async (request: NextRequest) => {
    const requestData = requestDataStorage.getStore();
    if (!requestData?.email || !requestData.id || !requestData.role) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { slug } = await request.json();
    const slugfilter = slug.toLowerCase().replace(/\s+/g, '-');
    const mainslug = sanitizeInput(slugfilter);
    if (!mainslug || typeof mainslug !== "string") return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    if (/^[a-z0-9-]+$/.test(mainslug) === false) return NextResponse.json({ error: "Invalid slug format" }, { status: 400 });
    const slugfiltered = mainslug.replace(/[^a-z0-9-]/g, '');
    const mainslugfinal = sanitizeInput(slugfiltered);
    const data = await prisma.event.findUnique({
        where: {
            slug: mainslugfinal
        }
    })
    if (!data) return NextResponse.json({ valid: true });
    return NextResponse.json({ valid: false });
})