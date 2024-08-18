import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const createIssueSchema = z.object({
  title: z.string().min(1).max(225),
  description: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Log incoming data
  console.log("Incoming data:", body);

  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) {
    // Log validation errors
    console.error("Validation errors:", validation.error.errors);
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
