import { useCallback } from "react";

import styles from "./styles.module.scss";
import formatNumber from "../../../utils/formatNumber";
import ButtonSmall from "../../Buttons/ButtonSmall";
import { ICoffeeSelected, useCoffee } from "../../../hooks/coffeesSelected";
import SelectProductsInCart from "../../SelectProductsInCart";

interface ICardInCartProps {
  coffee: ICoffeeSelected;
}

export default function CardInCart({ coffee }: ICardInCartProps) {
  const { setCoffeeSelected } = useCoffee();

  const addCoffee = useCallback(() => {
    setCoffeeSelected(state => {
      return state.map(coffeeItem => {
        if (coffeeItem.code === coffee.code) {
          return {
            ...coffeeItem,
            quantity: coffeeItem.quantity + 1,
          };
        }

        return {} as ICoffeeSelected;
      });
    });
  }, [coffee.code, setCoffeeSelected]);

  const removeCoffee = useCallback(() => {
    setCoffeeSelected(state => {
      return state.map(coffeeItem => {
        if (coffeeItem.code === coffee.code) {
          if (coffeeItem.quantity > 0) {
            return {
              ...coffeeItem,
              quantity: coffeeItem.quantity - 1,
            };
          }
        }
        return coffeeItem;
      });
    });
  }, [coffee.code, setCoffeeSelected]);
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <img src={coffee.image} alt={coffee.title} />

        <div className={styles.infoContainer}>
          <p className={styles.title}>{coffee.title}</p>

          <div className={styles.buttonContainer}>
            <SelectProductsInCart
              addProduct={addCoffee}
              removeProduct={removeCoffee}
              numberOfProducts={coffee.quantity}
            />
            <ButtonSmall code={coffee.code} />
          </div>
        </div>
      </div>
      <span className={styles.valueOfProduct}>
        {formatNumber({ data: coffee.value / 100, type: "currency" })}
      </span>
    </div>
  );
}
