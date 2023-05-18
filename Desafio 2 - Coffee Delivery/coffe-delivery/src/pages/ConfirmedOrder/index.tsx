import { useEffect } from "react";

import clockIcon from "../../assets/clock.svg";
import moneyIcon from "../../assets/money.svg";
import pinIcon from "../../assets/pin.svg";
import confirmedOrder from "../../assets/confirmed-order.svg";

import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { useCoffee } from "../../hooks/coffeesSelected";

export default function ConfirmedOrder() {
  const navigate = useNavigate();
  const { setCoffeeSelected } = useCoffee();
  const data = localStorage.getItem("@coffee-delivery:order");

  useEffect(() => {
    setCoffeeSelected([]);
  }, []);

  if (!data) {
    navigate("/");
    return null;
  }

  const { city, state, meansOfPayment, street, number, neighborhood } =
    JSON.parse(data);

  const renderMeansOfPayment = () => {
    switch (meansOfPayment) {
      case "money":
        return "Dinheiro";
      case "creditCard":
        return "Cartão de crédito";
      case "debitCard":
        return "Cartão de débito";
      default:
        return meansOfPayment;
    }
  };

  function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <section className={styles.container}>
      <div>
        <h1 className={styles.title}>Uhu! Pedido confirmado</h1>
        <h2 className={styles.subtitle}>
          Agora é só aguardar que logo o café chegará até você
        </h2>

        <ul className={styles.boxInfoOrder}>
          <li className={styles.itemInfo}>
            <img src={pinIcon} alt="Localização de entrega" />
            <div>
              <p>
                Entrega em{" "}
                <strong>
                  {street}, {number}
                </strong>
              </p>
              <p>
                {city} - {capitalize(neighborhood)}, {state.toUpperCase()}
              </p>
            </div>
          </li>
          <li className={styles.itemInfo}>
            <img src={clockIcon} alt="Tempo da entrega" />
            <div>
              <p>Previsão de entrega</p>
              <strong>20 min - 30 min </strong>
            </div>
          </li>
          <li className={styles.itemInfo}>
            <img src={moneyIcon} alt="Forma de pagamento" />
            <div>
              <p>Pagamento na entrega</p>
              <strong>{renderMeansOfPayment()}</strong>
            </div>
          </li>
        </ul>
      </div>
      <div className={styles.confirmedOrder}>
        <img src={confirmedOrder} alt="Ordem confirmada" />
      </div>
    </section>
  );
}
