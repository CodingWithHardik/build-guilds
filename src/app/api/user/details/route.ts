import { apiAuth } from "@/lib/apiAuth";
import { requestDataStorage } from "@/lib/requestData";
import { NextResponse, type NextRequest } from "next/server";

export const POST = apiAuth(async (request: NextRequest) => {
    const requestData = requestDataStorage.getStore();
    if (!requestData?.email || !requestData.id || !requestData.role) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const isNew = !requestData.name;
    return NextResponse.json({
        email: requestData.email,
        name: requestData.name,
        avatar: requestData.avatar,
        isNew
    })
})