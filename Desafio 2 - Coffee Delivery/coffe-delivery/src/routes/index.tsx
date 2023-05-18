import { Routes as ReactDOMRoutes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Checkout from "../pages/Checkout";
import ConfirmedOrder from "../pages/ConfirmedOrder";

export default function Routes() {
  return (
    <ReactDOMRoutes>
      <Route path="/" element={<Home />} />
      <Route path="carrinho" element={<Checkout />} />
      <Route path="pedido-confirmado" element={<ConfirmedOrder />} />
    </ReactDOMRoutes>
  );
}
