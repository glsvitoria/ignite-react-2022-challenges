import { MapPin } from "@phosphor-icons/react";
import logo from "../../assets/logo.svg";
import Cart from "../Cart";
import styles from "./styles.module.scss";
import { useCoffee } from "../../hooks/coffeesSelected";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { coffeeSelected } = useCoffee();
  const navigate = useNavigate();

  return (
    <header className={styles.container}>
      <img
        src={logo}
        alt="Logo do Coffee Delivery"
        onClick={() => {
          navigate("/");
        }}
      />

      <div className={styles.rightMenu}>
        <div className={styles.location}>
          <MapPin size={24} weight="fill" />
          <p>Salvador, BA</p>
        </div>
        <Cart
          numberOfProducts={coffeeSelected.length}
          onClick={() => {
            if (coffeeSelected.length > 0) {
              navigate("/carrinho");
            } else {
              navigate("/");
            }
          }}
        />
      </div>
    </header>
  );
}
