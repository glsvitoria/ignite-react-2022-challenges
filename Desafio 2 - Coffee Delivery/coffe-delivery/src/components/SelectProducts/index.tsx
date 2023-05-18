import { ButtonHTMLAttributes } from "react";

import { overrideTailwindClasses } from "tailwind-override";

import styles from "./styles.module.scss";
import { Minus, Plus } from "@phosphor-icons/react";

interface ISelectProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  containerClassName?: string;
  numberOfProducts: number;
  setNumberOfProducts: React.Dispatch<React.SetStateAction<number>>;
}

export default function SelectProducts({
  containerClassName = "",
  className,
  numberOfProducts,
  setNumberOfProducts,
  ...rest
}: ISelectProps) {
  return (
    <div
      className={overrideTailwindClasses(
        `${styles.container} ${containerClassName}`,
      )}
    >
      <button
        className={styles.operations}
        title="remover 1 produto"
        onClick={() => {
          setNumberOfProducts((state: number) => {
            if (state > 0) {
              return state - 1;
            }

            return state;
          });
        }}
        type="button"
        {...rest}
      >
        <Minus size={14} weight="bold" />
      </button>
      <input
        value={numberOfProducts}
        className={overrideTailwindClasses(`
        ${className} ${styles.input}`)}
        disabled
      />

      <button
        className={styles.operations}
        title="adicionar 1 produto"
        onClick={() => {
          setNumberOfProducts((state: number) => state + 1);
        }}
        type="button"
        {...rest}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
