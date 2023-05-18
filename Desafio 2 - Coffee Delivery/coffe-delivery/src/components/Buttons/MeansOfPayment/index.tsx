import { useEffect, useRef, useState } from "react";

import { useField } from "@unform/core";

import styles from "./styles.module.scss";
import { Bank, CreditCard, Money } from "@phosphor-icons/react";

type TSelectItem = "creditCard" | "debitCard" | "money";

export default function MeansOfPayment({ ...rest }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, registerField } = useField("meansOfPayment");

  const [isSelected, setIsSelected] = useState<TSelectItem>("creditCard");

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      setValue(_ref, value: TSelectItem) {
        setIsSelected(value);
      },
      getValue() {
        return isSelected;
      },
    });
  }, [registerField, fieldName, isSelected]);
  return (
    <div className={styles.container}>
      <button
        className={`${styles.btnContainer} ${
          isSelected === "creditCard" && styles.selected
        }`}
        onClick={() => {
          setIsSelected("creditCard");
        }}
        {...rest}
      >
        <CreditCard size={16} weight="regular" />
        Cartão de Crédito
      </button>
      <button
        className={`${styles.btnContainer} ${
          isSelected === "debitCard" && styles.selected
        }`}
        onClick={() => {
          setIsSelected("debitCard");
        }}
        {...rest}
      >
        <Bank size={16} weight="regular" />
        Cartão de Débito
      </button>
      <button
        className={`${styles.btnContainer} ${
          isSelected === "money" && styles.selected
        }`}
        onClick={() => {
          setIsSelected("money");
        }}
        {...rest}
      >
        <Money size={16} weight="regular" />
        Dinheiro
      </button>
    </div>
  );
}
