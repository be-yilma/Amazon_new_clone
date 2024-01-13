import React from "react";
import "./CheckProduct.css";
import { useStateValue } from "../../StateProvider";
const CheckProduc = ({ id, image, title, price, rating, hideButton }) => {
  const [{ basket }, dispatch] = useStateValue();
  const RmoveFromBasket = () =>
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  return (
    <div className="checkproduct">
      <img className="checkprodcut__image" src={image} />
      <div className="checkprodcut__info">
        <p className="checkproduc__title">{title}</p>
        <p>
          <small>$</small>
          <strong className="checkproduct__price">{price}</strong>
        </p>
        <div className="checkProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
        {!hideButton && (
          <button onClick={RmoveFromBasket}>Remove From Basket</button>
        )}
      </div>
    </div>
  );
};

export default CheckProduc;
