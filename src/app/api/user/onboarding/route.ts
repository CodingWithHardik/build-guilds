import { apiAuth } from "@/lib/apiAuth";
import { sanitizeInput } from "@/lib/functions/sanitization";
import { prisma } from "@/lib/prisma";
import { requestDataStorage } from "@/lib/requestData";
import { NextResponse, type NextRequest } from "next/server";

export const POST = apiAuth(async (request: NextRequest) => {
  const requestData = requestDataStorage.getStore();
  if (!requestData?.email || !requestData.id || !requestData.role)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const isNew = !requestData.name;
  if (!isNew)
    return NextResponse.json(
      { error: "User already onboarded" },
      { status: 400 },
    );
  const { name } = await request.json();
  const nameFilter = sanitizeInput(name);
  if (!nameFilter || typeof nameFilter !== "string" || nameFilter.length < 3)
    return NextResponse.json(
      { error: "Name must be at least 3 characters long" },
      { status: 400 },
    );
  try {
    await prisma.user.update({
      where: {
        email: requestData.email,
      },
      data: {
        name: nameFilter,
      },
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
  return NextResponse.json({
    email: requestData.email,
    name: nameFilter,
    isNew,
  });
});
