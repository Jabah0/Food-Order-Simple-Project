import { useRef } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = props => {
  const inputRef = useRef();

  const onSubmitHandler = e => {
    e.preventDefault();
    const enteredAmount = +inputRef.current.value;
    props.onAdd(enteredAmount)
  }


  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <Input
        ref={inputRef}
        label="Amount"
        input={{
          id: props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;