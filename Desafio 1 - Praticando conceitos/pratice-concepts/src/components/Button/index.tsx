import { ButtonHTMLAttributes, ReactNode } from "react";

import { overrideTailwindClasses } from "tailwind-override";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({
  children,
  className = "",
  ...rest
}: IButtonProps) {
  return (
    <button
      className={overrideTailwindClasses(`btn ${className}`)}
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
}
