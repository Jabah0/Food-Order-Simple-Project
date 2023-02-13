import { useContext, useState, useEffect } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [isHightlighted, setIsHightlighted] = useState(false);

  const ctx = useContext(CartContext);
  const numberOfItems = ctx.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  const buttonClasses = `${classes.button} ${isHightlighted && classes.bump}`

  useEffect(()=> {
    if(ctx.items.length === 0){
      return;
    }
    setIsHightlighted(true);
    const timer = setTimeout(()=>{
      setIsHightlighted(false);
    }, 300)
    return ()=> {clearTimeout(timer)}
  }, [ctx.items])

  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
