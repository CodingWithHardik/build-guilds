import { apiAuth } from "@/lib/apiAuth";
import { prisma } from "@/lib/prisma";
import { requestDataStorage } from "@/lib/requestData";
import { NextResponse, type NextRequest } from "next/server";

export const POST = apiAuth(async (request: NextRequest) => {
    const requestData = requestDataStorage.getStore();
    if (!requestData?.email || !requestData.id || !requestData.role) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const formData = await request.formData();
    const file = formData.get(`file`)as File;
    if (!file || !(file.type === "image/jpeg" || file.type === "image/png") || file.size > 3 * 1024 * 1024) {
        return NextResponse.json({ error: "Invalid file. Only JPEG and PNG images under 3MB are allowed." }, { status: 400 });
    }
    const cdnForm = new FormData();
    cdnForm.append(`file`, file, `${requestData.email}_${Date.now()}`);
    const res = await fetch("https://cdn.hackclub.com/api/v4/upload", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.CDN_KEY}`
        },
        body: cdnForm,
    })
    if (!res.ok) return NextResponse.json({ error: "Failed to upload avatar. Please try again later." }, { status: 400 });
    const data = await res.json();
    if (res.status === 400) return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    if (res.status === 401) return NextResponse.json({ error: "Invalid or missing API key" }, { status: 400 });
    if (res.status === 402) return NextResponse.json({ error: "Storage quota exceeded" }, { status: 400 });
    if (res.status === 404) return NextResponse.json({ error: "Resource not found" }, { status: 400 });
    if (res.status === 422) return NextResponse.json({ error: "Validation failed" }, { status: 400 });
    try {
        await prisma.user.update({
            where: {
                email: requestData.email },
            data: {
                avatar: data.url
            }
        })
        return NextResponse.json({ avatarUrl: data.url });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update user avatar." }, { status: 400 });
    }
})