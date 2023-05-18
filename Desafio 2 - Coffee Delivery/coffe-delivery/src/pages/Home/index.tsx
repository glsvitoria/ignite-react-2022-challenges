import About from "./components/About";
import styles from "./styles.module.scss";

import arabe from "../../assets/coffees/arabe.svg";
import cafeComLeite from "../../assets/coffees/cafe-com-leite.svg";
import capuccino from "../../assets/coffees/capuccino.svg";
import chocolateQuente from "../../assets/coffees/chocolate-quente.svg";
import cubano from "../../assets/coffees/cubano.svg";
import expressoAmericano from "../../assets/coffees/expresso-americano.svg";
import expressoCremoso from "../../assets/coffees/expresso-cremoso.svg";
import expressoGelado from "../../assets/coffees/expresso-gelado.svg";
import expresso from "../../assets/coffees/expresso.svg";
// import havaiano from "../../assets/coffees/havaiano.svg";
import irlandes from "../../assets/coffees/irlandes.svg";
import latte from "../../assets/coffees/latte.svg";
import macchiato from "../../assets/coffees/macchiato.svg";
import mocaccino from "../../assets/coffees/mocaccino.svg";
import Card from "../../components/Cards/Card";
import { useCoffee } from "../../hooks/coffeesSelected";

export type TCoffee = {
  image: string;
  type: Array<
    "tradicional" | "gelado" | "com-leite" | "alcoólico" | "especial"
  >;
  title: string;
  description: string;
  value: number;
  code: string;
};

export default function Home() {
  const { coffeeSelected } = useCoffee();
  localStorage.removeItem("@coffee-delivery:order");
  return (
    <main className={styles.container}>
      <About />
      <section className={styles.coffees}>
        <h2 className={styles.coffeesTitle}>Nossos cafés</h2>
        <div className={styles.coffeesContainer}>
          {coffeeOptions.map(coffee => {
            if (coffeeSelected.find(item => coffee.code === item.code)) {
              const coffeeYetSelected = coffeeSelected.find(
                item => coffee.code === item.code,
              );
              return (
                <Card
                  coffee={coffee}
                  key={coffee.code}
                  quantity={coffeeYetSelected?.quantity}
                />
              );
            } else {
              return <Card coffee={coffee} key={coffee.code} />;
            }
          })}
        </div>
      </section>
    </main>
  );
}

const coffeeOptions: TCoffee[] = [
  {
    image: expresso,
    title: "Expresso Tradicional",
    description: "O tradicional café feito com água quente e grãos moídos",
    type: ["tradicional"],
    value: 990,
    code: "expresso",
  },
  {
    image: expressoAmericano,
    title: "Expresso Americano",
    description: "Expresso diluído, menos intenso que o tradicional",
    type: ["tradicional"],
    value: 990,
    code: "expresso-americano",
  },
  {
    image: expressoCremoso,
    title: "Expresso Cremoso",
    description: "Expresso diluído, menos intenso que o tradicional",
    type: ["tradicional"],
    value: 990,
    code: "expresso-cremoso",
  },
  {
    image: expressoGelado,
    title: "Expresso Gelado",
    description: "Expresso diluído, menos intenso que o tradicional",
    type: ["tradicional", "gelado"],
    value: 990,
    code: "expresso-gelado",
  },
  {
    image: cafeComLeite,
    title: "Café com Leite",
    description: "Expresso diluído, menos intenso que o tradicional",
    type: ["tradicional", "com-leite"],
    value: 990,
    code: "cafe-com-leite",
  },
  {
    image: latte,
    title: "Latte",
    description: "Expresso diluído, menos intenso que o tradicional",
    type: ["tradicional", "com-leite"],
    value: 990,
    code: "latte",
  },
  {
    image: capuccino,
    title: "Capuccino",
    description: "Expresso diluído, menos intenso que o tradicional",
    type: ["tradicional", "com-leite"],
    value: 990,
    code: "capuccino",
  },
  {
    image: macchiato,
    title: "Macchiato",
    description: "Expresso diluído, menos intenso que o tradicional",
    type: ["tradicional", "com-leite"],
    value: 990,
    code: "macchiato",
  },
  {
    image: mocaccino,
    title: "Mocaccino",
    description: "Expresso diluído, menos intenso que o tradicional",
    type: ["tradicional", "com-leite"],
    value: 990,
    code: "mocaccino",
  },
  {
    image: chocolateQuente,
    title: "Chocolate Quente",
    description: "Expresso diluído, menos intenso que o tradicional",
    type: ["especial", "com-leite"],
    value: 990,
    code: "chocolate-quente",
  },
  {
    image: cubano,
    title: "Cubano",
    description: "Expresso diluído, menos intenso que o tradicional",
    type: ["especial", "alcoólico", "gelado"],
    value: 990,
    code: "cubano",
  },
  {
    image: arabe,
    title: "Árabe",
    description: "Expresso diluído, menos intenso que o tradicional",
    type: ["especial"],
    value: 990,
    code: "arabe",
  },
  {
    image: irlandes,
    title: "Irlandês",
    description: "Expresso diluído, menos intenso que o tradicional",
    type: ["especial", "alcoólico"],
    value: 990,
    code: "irlandes",
  },
];
