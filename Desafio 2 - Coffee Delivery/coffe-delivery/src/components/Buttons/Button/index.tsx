import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./styles.module.scss";

import { overrideTailwindClasses } from "tailwind-override";

// import loadingAnimation from "../../assets/loading.json";

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
      className={overrideTailwindClasses(`${className} ${styles.button}`)}
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
}
