import "./styles/global.scss";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import Header from "./components/Header";
import CoffeeProvider from "./hooks/coffeesSelected";

function App() {
  return (
    <CoffeeProvider>
      <BrowserRouter>
        <Header />
        <Routes />
      </BrowserRouter>
    </CoffeeProvider>
  );
}

export default App;
