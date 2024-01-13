import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../../StateProvider";
import { useNavigate } from "react-router-dom"; // Correct hook

const Subtotal = () => {
  const navigate = useNavigate(); // Correct method
  const [{ basket }] = useStateValue();

  const adder = (basket) =>
    basket.reduce((amount, item) => item.price + amount, 0);

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <div>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal-gift">
              <input className="checkbox" type="checkbox" /> This contains a
              gift
            </small>
          </div>
        )}
        decimalScale={2}
        value={adder(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button onClick={(e) => navigate("/payment")}>Proceed to Checkout</button>
    </div>
  );
};

export default Subtotal;
