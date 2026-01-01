import React from "react";

type Props = {
  accent?: string;
  background?: string;
  border?: string;
  card?: string;
  primary?: string;
  secondary?: string;
};

const Link = ({
  accent,
  background,
  border,
  card,
  primary,
  secondary,
}: Props) => {
  return (
    <div className={`bg-${accent} border-${border}`}>
      Lorem ipsum dolor sit amet
    </div>
  );
};

export default Link;

// {
//     "background"?: "slate-900",
//     "card"?: "slate-800",
//     "primary"?: "slate-50",
//     "secondary"?: "slate-400",
//     "accent"?: "sky-400",
//     "border"?: "slate-700"
// }
