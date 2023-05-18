import boxIcon from "../../../../assets/box.svg";
import cartIcon from "../../../../assets/cart.svg";
import clockIcon from "../../../../assets/clock.svg";
import coffeeIcon from "../../../../assets/coffee.svg";
import coffeeDeliveryHome from "../../../../assets/coffee-delivery-home.png";
import styles from "./styles.module.scss";

export default function About() {
  return (
    <section className={styles.about}>
      <div className={styles.blur}></div>
      <div className={styles.left}>
        <div className={styles.title}>
          <h1>Encontre o café perfeito para qualquer hora do dia</h1>
          <h2>
            Com o Coffee Delivery você recebe seu café onde estiver, a qualquer
            hora
          </h2>
        </div>

        <ul>
          <li>
            <img src={cartIcon} alt="Ícone de carrinho" />
            <p>Compra simples e segura</p>
          </li>
          <li>
            <img src={boxIcon} alt="Ícone de caixa" />
            <p>Embalagem mantém o café intacto</p>
          </li>
          <li>
            <img src={clockIcon} alt="Ícone de relógio" />
            <p>Entrega rápida e rastreada</p>
          </li>

          <li>
            <img src={coffeeIcon} alt="Ícone de café" />
            <p>O café chega fresquinho até você</p>
          </li>
        </ul>
      </div>
      <img
        src={coffeeDeliveryHome}
        alt="Copo de café da Coffee Delivery e grãos de café"
      />
    </section>
  );
}
