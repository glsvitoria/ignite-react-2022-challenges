/* eslint-disable no-param-reassign */
import { InputHTMLAttributes, useEffect, useRef } from "react";

import { useField } from "@unform/core";
import { overrideTailwindClasses } from "tailwind-override";

import styles from "./styles.module.scss";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  containerClassName?: string;
  containerStyle?: any;
}

export default function Input({
  label,
  name,
  containerClassName = "",
  className = "",
  ...rest
}: IInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { defaultValue, error, fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      setValue(ref, value) {
        if (rest.type === "checkbox") ref.checked = value;
        else ref.value = value;
      },
      path: rest.type === "checkbox" ? "checked" : "value",
    });
  }, [registerField, fieldName, rest.type]);

  return (
    <div
      className={overrideTailwindClasses(
        `${styles.container} ${containerClassName}`,
      )}
    >
      {label && <label htmlFor={fieldName}>{label}</label>}
      <div className={styles.inputWrapper}>
        <input
          id={fieldName}
          name={fieldName}
          type="text"
          defaultValue={defaultValue}
          defaultChecked={defaultValue}
          ref={inputRef}
          className={overrideTailwindClasses(`
        ${className} ${error ? styles.error : ""}`)}
          {...rest}
        />
      </div>

      {error && <span>{error}</span>}
    </div>
  );
}
