import connectDB from "@/lib/mongodb";
import UserPage from "@/lib/models/UserPage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> },
) {
  try {
    const { username } = await params;

    await connectDB();

    const userPage = await UserPage.findOne({ username });

    if (!userPage) {
      return NextResponse.json(
        { error: "User page not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ userPage }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user page by username:", error);
    return NextResponse.json(
      { error: "Failed to fetch user page" },
      { status: 500 },
    );
  }
}
