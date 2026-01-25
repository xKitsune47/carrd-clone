import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import UserPage, { getNextUserId } from "@/lib/models/UserPage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const userPage = await UserPage.findOne({ email: session.user.email });

    if (!userPage) {
      return NextResponse.json({ userPage: null }, { status: 200 });
    }

    return NextResponse.json({ userPage }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user page:", error);
    return NextResponse.json(
      { error: "Failed to fetch user page" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const body = await req.json();
    const { username, description, image, links, theme, font } = body;

    const existingPage = await UserPage.findOne({ username });
    if (existingPage && existingPage.email !== session.user.email) {
      return NextResponse.json(
        { error: "Username already taken" },
        { status: 400 },
      );
    }

    const currentUserPage = await UserPage.findOne({
      email: session.user.email,
    });

    let userPage;
    if (currentUserPage) {
      userPage = await UserPage.findOneAndUpdate(
        { email: session.user.email },
        {
          username,
          description,
          image: image || session.user.image,
          links: links || [],
          theme: theme || "soft-neutral",
          font: font || "Manrope",
        },
        { new: true },
      );
    } else {
      const nextUserId = await getNextUserId();
      userPage = await UserPage.create({
        userId: nextUserId,
        email: session.user.email,
        username,
        description,
        image: image || session.user.image,
        links: links || [],
        theme: theme || "soft-neutral",
        font: font || "Manrope",
      });
    }

    return NextResponse.json({ userPage }, { status: 200 });
  } catch (error) {
    console.error("Error saving user page:", error);
    return NextResponse.json(
      { error: "Failed to save user page" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    await UserPage.findOneAndDelete({ email: session.user.email });

    return NextResponse.json({ message: "User page deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user page:", error);
    return NextResponse.json(
      { error: "Failed to delete user page" },
      { status: 500 },
    );
  }
}
