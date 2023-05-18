import { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.scss";
import { overrideTailwindClasses } from "tailwind-override";
import { ShoppingCartSimple } from "@phosphor-icons/react";
import purchase from "../../../assets/purchase.json";
import Lottie from "react-lottie";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export default function IconButton({
  className = "",
  isLoading = false,
  ...rest
}: IButtonProps) {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: purchase,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <button
      className={overrideTailwindClasses(`${className} ${styles.button}`)}
      type="button"
      {...rest}
    >
      {isLoading ? (
        <Lottie options={defaultOptions} height={24} width={24} />
      ) : (
        <ShoppingCartSimple size={24} weight="fill" />
      )}
    </button>
  );
}
