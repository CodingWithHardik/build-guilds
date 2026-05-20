import { NextRequest, NextResponse } from "next/server";
import { prisma } from "./prisma";
import { verifyToken } from "../../lib/auth";
import { safeEqualString } from "../../lib/secureCompare";
import { requestDataStorage } from "./requestData";

export function apiAuth(
    handler: (request: NextRequest) => Promise<NextResponse>
) {
    return async (request: NextRequest) => {
        const headerToken = request.headers.get("Authorization")?.replace("Bearer ", "");
        const cookieToken = request.cookies.get("token")?.value;
        if (!headerToken && !cookieToken) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        if (headerToken && cookieToken && !safeEqualString(headerToken, cookieToken)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const token = headerToken || cookieToken || "";
        const headers = new Headers(request.headers);
        const csrfToken = headers.get("x-csrf-token") || "";
        const tokendata = verifyToken(String(token), true, csrfToken)
        if (!tokendata.success) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        if (!tokendata.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const user = await prisma.user.findUnique({
            where: {
                email: tokendata.email
            }
        })
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        return requestDataStorage.run(user, async() => handler(request));
    }
}