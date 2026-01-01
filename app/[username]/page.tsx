"use client";

import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const { username } = useParams();
  console.log(username);

  return <div className="h-full">links</div>;
};

export default page;
