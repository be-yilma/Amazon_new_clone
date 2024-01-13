import React from "react";
import "./Checkout.css";
import CheckProduc from "../CheckProduct/CheckProduc";
import { useStateValue } from "../../StateProvider";
import Subtotal from "../Subtotal/Subtotal";

const Checkout = () => {
  const [{ basket }, dispatch] = useStateValue();
  // console.log(basket)
  return (
    <div className="checkout">
      {/* left side */}
      <div className="checkout__left">
        <img
          className="checkout__image"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        <h3>Hello</h3>
        <h2 className="checkout__title">Your shopping Basket</h2>
        {basket.map((item) =>(
        <CheckProduc
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
        />
     
      ))}
       </div>
      {/* right side */}
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
