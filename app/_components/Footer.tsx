"use client";

import React from "react";
import ThemeWrapper from "./ThemeWrapper";

const baseStyles =
  "w-full h-16 font-semibold fixed bottom-0 flex flex-row gap-2 items-center justify-center backdrop-blur-sm";

const Footer = () => {
  return (
    <ThemeWrapper style={baseStyles}>
      Created by
      <a
        href="https://kitsune-dev.me"
        target="_blank"
        className="text-orange-600 font-bold hover:scale-102 duration-300">
        kitsune-dev.me
      </a>
    </ThemeWrapper>
  );
};

export default Footer;
