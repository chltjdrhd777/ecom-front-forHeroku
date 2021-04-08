import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Home from "./routes/Home";
import CartPage from "routes/CartPage";
import { categoryLoading, getAllCategories } from "./redux/categorySlice";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import ProductList from "routes/ProductList";
import { login } from "redux/userSlice";
import ProductDetail from "routes/ProductDetail";
import { refreshCart } from "redux/cartSlice";
import Checkout from "routes/Checkout";
import { getCookiesValue } from "util/cookie";
import { getProductBySlug } from "redux/productslice";

function App() {
  const dispatch = useDispatch();
  const loggedUserData = localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")?.toString()!);
  const cartData = localStorage.getItem("cart") && JSON.parse(localStorage.getItem("cart")!);
  const cookieValue = getCookiesValue("authorized_user");

  //! your cookie control
  useEffect(() => {
    if (!cookieValue) localStorage.removeItem("userInfo");
  });

  //! cart data fetch
  useEffect(() => {
    cartData && dispatch(refreshCart(cartData));
  }, []);

  //! get product data

  useEffect(() => {
    dispatch(getProductBySlug("Samsung"));
  }, []);

  //! category patch
  useEffect(() => {
    dispatch(categoryLoading("pending"));
    dispatch(getAllCategories());
    dispatch(categoryLoading("finished"));
  }, []);

  //! login information patch
  useEffect(() => {
    if (loggedUserData) {
      dispatch(login(loggedUserData));
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home} />
        <Switch>
          <Route path="/cart" component={CartPage} />
          <Route path="/checkout/:test" component={Checkout} />
          <Route path="/:productSlug/:productId" component={ProductDetail} />
          <Route path="/:slug" component={ProductList} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
