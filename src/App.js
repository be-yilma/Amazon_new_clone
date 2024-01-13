import "./App.css";
import Checkout from "./Components/Checkout/Checkout";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Subtotal from "./Components/Subtotal/Subtotal";
// import Payment from "./Components/Payment/Payment";
import { UserProvider } from "./Components/UserContext/UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { auth } from "./Components/Firebase/Firebase";
import { useEffect } from "react";
import { useStateValue } from "./StateProvider";
import Payment from "./Components/Payment/Payment";
import Orders from "./Components/Order/Orders";
// import { Payment } from "@mui/icons-material";
const promise = loadStripe(
  "pk_test_51NzQhBGzTAQq5kjN4Q0dnTWXzgvBkqzHqVX6mhmjApzNVV7pEH1CDxacvrUtqClxQevC1oFQMwaC7PuZnVPsHcI700WavuFr5R"
);
function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />

          {/* Login Page */}
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />

          {/* Payments Page with Header and Stripe */}
          <Route
            path="/payment"
            element={
              <>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </>
            }
          />
          {/* Orders page */}
          <Route
            path="/orders"
            element={
              <>
                <Header />
                <Orders />
              </>
            }
          ></Route>

          {/* Checkout Page */}
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
