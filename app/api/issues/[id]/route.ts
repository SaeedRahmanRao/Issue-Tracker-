import authOptions from "@/app/auth/AuthOptions";
import { patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const validation = patchIssueSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    const { assignedToUserId, title, description } = body;
    const issueId = parseInt(params.id, 10);

    if (isNaN(issueId)) {
      return NextResponse.json({ error: "Invalid issue ID" }, { status: 400 });
    }

    if (assignedToUserId) {
      const user = await prisma.user.findUnique({ where: { id: assignedToUserId } });
      if (!user) return NextResponse.json({ error: "Invalid user." }, { status: 400 });
    }

    const issue = await prisma.issue.findUnique({ where: { id: issueId } });
    if (!issue) return NextResponse.json({ error: "Issue not found" }, { status: 404 });

    const updatedIssue = await prisma.issue.update({
      where: { id: issue.id },
      data: { title, description, assignedToUserId }
    });

    return NextResponse.json(updatedIssue);
  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const issueId = parseInt(params.id, 10);

    if (isNaN(issueId)) {
      return NextResponse.json({ error: "Invalid issue ID" }, { status: 400 });
    }

    const issue = await prisma.issue.findUnique({ where: { id: issueId } });
    if (!issue) return NextResponse.json({ error: "Issue not found" }, { status: 404 });

    await prisma.issue.delete({ where: { id: issue.id } });

    return NextResponse.json({});
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
