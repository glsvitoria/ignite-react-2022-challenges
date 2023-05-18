import { createContext, useContext, useState } from "react";
import { TCoffee } from "../pages/Home";

export interface ICoffeeSelected extends TCoffee {
  quantity: number;
}

interface ICoffeeContextData {
  coffeeSelected: ICoffeeSelected[];
  setCoffeeSelected: React.Dispatch<React.SetStateAction<ICoffeeSelected[]>>;
}

const CoffeeContext = createContext<ICoffeeContextData>(
  {} as ICoffeeContextData,
);

export default function CoffeeProvider({ children }: any) {
  const [coffeeSelected, setCoffeeSelected] = useState<ICoffeeSelected[]>([]);

  return (
    <CoffeeContext.Provider value={{ coffeeSelected, setCoffeeSelected }}>
      {children}
    </CoffeeContext.Provider>
  );
}

function useCoffee(): ICoffeeContextData {
  const context = useContext(CoffeeContext);

  if (!context) {
    throw new Error("useCoffee must be used within an CoffeeProvider");
  }

  return context;
}

export { CoffeeProvider, useCoffee };
