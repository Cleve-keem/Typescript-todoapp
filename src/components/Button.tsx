import type React from "react";

type Variant = "primary" | "danger";

interface ButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ children, variant, onClick }: ButtonProps) {
  const base = "rounded";

  const variants: Record<Variant, string> = {
    primary: base + " bg-green-400 text-white flex-1 p-1.5",
    danger: base + " text-red-500 text-xl",
  };
  return (
    <button className={variant ? variants[variant] : base} onClick={onClick}>
      {children}
    </button>
  );
}
