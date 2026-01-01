import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  console.log(request.nextUrl.searchParams);

  const filePath = path.join(process.cwd(), "_themes", "colors.json");

  try {
    const data = fs.readFileSync(filePath, "utf8");
    const themes = JSON.parse(data);

    return NextResponse.json({
      themes,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Unexpected error occurred",
      },
      { status: 500 }
    );
  }
};
