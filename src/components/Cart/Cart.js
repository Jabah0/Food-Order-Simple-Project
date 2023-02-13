import { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const addItemtHandler = (item) => {ctx.addItem({...item, amount: 1})};
  const removeItemHandler = (id) => {ctx.removeItem(id)};
  const ctx = useContext(CartContext);
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => (
        <li>
          {
            <CartItem
              key={item.id}
              name={item.name}
              amount={item.amount}
              price={item.price || 0}
              onAdd={addItemtHandler.bind(null, item)}
              onRemove={removeItemHandler.bind(null, item.id)}
            />
          }
        </li>
      ))}
    </ul>
  );

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const isEmpty = ctx.items.length === 0;

  return (
    <Modal onClick={props.onCartClick}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCartClick}>
          Close
        </button>
        {!isEmpty && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
