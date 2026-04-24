import { NextRequest, NextResponse } from "next/server";
import { prisma } from "./prisma";
import { verifyToken } from "../../lib/auth";
import { requestDataStorage } from "./requestData";

export function apiAuth(
    handler: (request: NextRequest) => Promise<NextResponse>
) {
    return async (request: NextRequest) => {
        const token = request.headers.get("Authorization")?.replace("Bearer ", "");
        const tokensecond = request.cookies.get("token")?.value;
        if (!token && !tokensecond) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        if (token !== tokensecond) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const tokenvalidation = verifyToken(String(token))
        const tokendata = (tokenvalidation as { code: number, success: boolean, email: string })
        if (!tokendata.success) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        if (!tokendata.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const user = await prisma.user.findUnique({
            where: {
                email: tokendata.email
            }
        })
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        return requestDataStorage.run(user, async() => handler(request))
    }
}