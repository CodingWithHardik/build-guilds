import { apiAuth } from "@/lib/apiAuth";
import { prisma } from "@/lib/prisma";
import { requestDataStorage } from "@/lib/requestData";
import { NextResponse, type NextRequest } from "next/server";

export const POST = apiAuth(async (request: NextRequest) => {
    const requestData = requestDataStorage.getStore();
    if (!requestData?.email || !requestData.id || !requestData.role) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { slug } = await request.json();
    if (!slug || typeof slug !== "string") return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    if (/^[a-z0-9-]+$/.test(slug) === false) return NextResponse.json({ error: "Invalid slug format" }, { status: 400 });
    const mainslug = slug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const data = await prisma.event.findUnique({
        where: {
            slug: mainslug
        }
    })
    if (!data) return NextResponse.json({ valid: true });
    return NextResponse.json({ valid: false });
})