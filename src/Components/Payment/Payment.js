import React, { useState } from "react";
import "./Payment.css";
import CheckProduc from "../CheckProduct/CheckProduc";
import { useStateValue } from "../../StateProvider";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { useEffect } from "react";
import axios from "../../axios";
import { db } from "../Firebase/Firebase";

const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const adder = (basket) =>
    basket.reduce((amount, item) => item.price + amount, 0); //500
  const Navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(null);
  const [clientSecret, setClientSecret] = useState(true);
  // getting clientsecret code from stripe
  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const response = await axios({
          method: "post",
          withCredentials: false,
          url: `/payments/create?total=${adder(basket) * 100}`,
        });
        console.log(response);
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };
    getClientSecret();
  }, [basket]);

  console.log("the secret is >>>", clientSecret);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    // sending clientsecrect and paymentmethod
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        console.log(paymentIntent);

        // database
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });
        // payment confirmation
        setSucceeded(true);
        setProcessing(false);
        setError(null);

        // make the basket empty
        dispatch({
          type: "EMPTY_BASKET",
        });

        Navigate("/orders");
      });
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout( <Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        {/* deliveryh address section */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>1234 React lane</p>
            <p>Baltimore, MD</p>
          </div>
        </div>

        {/* payment review section */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review itmes and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckProduc
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        {/* payment method section */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={adder(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={disabled || processing || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>

                {error && <div>{error}</div>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
