import { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.scss";
import { overrideTailwindClasses } from "tailwind-override";
import { Trash } from "@phosphor-icons/react";
import { useCoffee } from "../../../hooks/coffeesSelected";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  code: string;
}

export default function ButtonSmall({
  className = "",
  isLoading = false,
  code,
  ...rest
}: IButtonProps) {
  const { setCoffeeSelected } = useCoffee();

  const handleRemoveCoffee = () => {
    setCoffeeSelected((prev) => prev.filter((coffee) => coffee.code !== code));
  };

  return (
    <button
      className={overrideTailwindClasses(`${className} ${styles.button}`)}
      type="button"
      onClick={handleRemoveCoffee}
      {...rest}
    >
      {/* {isLoading && <Lottie options={defaultOptions} height={64} width={40} />} */}
      <Trash size={16} />
      Remover
    </button>
  );
}
