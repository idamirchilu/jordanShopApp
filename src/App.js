import "./App.css";
import Layout from "./components/Layout/Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sendCartData, fetchCartData } from "./store/cart-slice";
import { useEffect } from "react";
import ShareComponent from "./ShareComponent";

function App() {
  const cartState = useSelector((state) => state.cart);
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authState.isLoggedIn) {
      dispatch(sendCartData(cartState.cartItems, authState.email));
    }
  }, [cartState.cartItems, authState.email, dispatch, authState.isLoggedIn]);

  useEffect(() => {
    if (authState.isLoggedIn) {
      dispatch(fetchCartData(authState.email));
    }
  }, [dispatch, authState.email, authState.isLoggedIn]);

  return (
    <Layout>
      <Routes>
        <Route path="/" exact element={<Navigate to="/home" />} />
        <Route path="/home" element={<ShareComponent />} />
        {/*<Route path="/cart" element={<Cart />} />*/}
        {/*<Route path="/login" element={<Auth />} />*/}
        {/*<Route path="/link" element={<Link />} />*/}
      </Routes>
    </Layout>
  );
}

export default App;
