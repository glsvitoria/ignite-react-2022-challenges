import { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.scss";
import { ShoppingCartSimple } from "@phosphor-icons/react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  numberOfProducts?: number;
}

export default function Cart({
  isLoading = false,
  numberOfProducts = 0,
  ...rest
}: IButtonProps) {
  return (
    <button className={styles.button} {...rest}>
      {/* {isLoading && <Lottie options={defaultOptions} height={64} width={40} />} */}
      <ShoppingCartSimple size={24} weight="fill" />
      {numberOfProducts > 0 && (
        <span className={styles.numberOfProducts}>{numberOfProducts}</span>
      )}
    </button>
  );
}
