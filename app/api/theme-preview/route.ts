import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const query = request.nextUrl.searchParams.get("query");

  if (query === "colors") {
    const filePath = path.join(process.cwd(), "app", "_themes", "colors.json");

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
        { status: 500 },
      );
    }
  } else {
    const filePath = path.join(process.cwd(), "app", "_themes", "fonts.json");

    try {
      const data = fs.readFileSync(filePath, "utf8");
      const fonts = JSON.parse(data);

      return NextResponse.json({
        fonts,
      });
    } catch (err) {
      console.error(err);

      return NextResponse.json(
        {
          error: "Unexpected error occurred",
        },
        { status: 500 },
      );
    }
  }
};
