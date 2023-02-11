import { useState } from "react";
import CartProvider from "./store/CartProvider";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

function App() {
  const [isShown, setIsShown] = useState(false);

  const onCartClick = () =>{
    setIsShown((preveState) => {
      return !preveState;
    })
  }

  return (
    <CartProvider>
      {isShown && <Cart onCartClick={onCartClick}/>}
      <Header onCartClick={onCartClick} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
