import { useState, useEffect } from "react";

import formatNumber from "../../../utils/formatNumber";
import SelectProducts from "../../SelectProducts";
import styles from "./styles.module.scss";
import IconButton from "../../Buttons/IconButton";
import { TCoffee } from "../../../pages/Home";
import { useCoffee } from "../../../hooks/coffeesSelected";

interface ICardProps {
  coffee: TCoffee;
  quantity?: number;
}

export default function Card({ coffee, quantity }: ICardProps) {
  const { setCoffeeSelected } = useCoffee();
  const [isLoading, setIsLoading] = useState(false);

  const [numberOfProducts, setNumberOfProducts] = useState(quantity || 0);

  const handleAddProduct = () => {
    setIsLoading(true);
    setCoffeeSelected(state => {
      const existsThisCoffee = state.find(
        coffeeItem => coffeeItem.code === coffee.code,
      );
      if (existsThisCoffee) {
        return state;
      }

      return [
        ...state,
        {
          ...coffee,
          quantity: numberOfProducts,
        },
      ];
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 3500);
  };

  useEffect(() => {
    if (numberOfProducts === 0) {
      setCoffeeSelected(state => {
        const filterState = state.filter(
          coffeeItem => coffeeItem.code !== coffee.code,
        );

        return filterState;
      });
    }
  }, [coffee.code, numberOfProducts, setCoffeeSelected]);
  return (
    <div className={styles.container}>
      <img src={coffee.image} alt={coffee.title} />
      <strong className={styles.coffeeType}>{coffee.type}</strong>
      <h2 className={styles.title}>{coffee.title}</h2>
      <p className={styles.description}>{coffee.description}</p>

      <div className={styles.footer}>
        <p className={styles.value}>
          <span>R$</span>
          {formatNumber({
            data: coffee.value / 100,
            type: "currencyWithoutRS",
          })}
        </p>

        <div className={styles.shop}>
          <SelectProducts
            numberOfProducts={numberOfProducts}
            setNumberOfProducts={setNumberOfProducts}
          />
          <IconButton onClick={handleAddProduct} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
