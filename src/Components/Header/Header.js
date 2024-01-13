import React from "react";
import { Link } from "react-router-dom"; // Add this line
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useStateValue } from "../../StateProvider";
import { auth } from "../Firebase/Firebase";

const Header = () => {
  const [{ basket, user }] = useStateValue();
  console.log(user);
  const handleAutication = () => {
    if (user) {
      auth.signOut();
    }
  };
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header_logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="amazon-logo"
        />
      </Link>
      <div className="header_search">
        <input className="header_input" type="text" />
        <SearchIcon className="search_icon" />
      </div>

      <div className="header_nav">
        <div onClick={handleAutication} className="header_option">
          <span className="lineOne">Hello {!user ? "Guest" : user.email}</span>
          <Link to={!user && "/login"}>
            <span className="lineTwo">{user ? "Sign Out" : "Sign In"}</span>
          </Link>
        </div>
        <Link to="/orders">
          <div className="header_option">
            <span className="lineOne">Returns</span>
            <span className="lineTwo">& Orders</span>
          </div>
        </Link>

        <div className="header_option">
          <span className="lineOne">Your</span>
          <span className="lineTwo">Prime</span>
        </div>
        <Link to="/checkout">
          {" "}
          {/* Fix the typo here */}
          <div className="header_optionBasket">
            <ShoppingCartIcon />
            <span className="header_basketCount">{basket.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
