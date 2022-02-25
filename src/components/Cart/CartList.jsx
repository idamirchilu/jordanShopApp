//import { useEffect } from "react";
import { useSelector } from "react-redux";
//import { cartActions } from "../../store/cart-slice";
import CartItems from "./CartItems";

export default function CartList() {
  const cartState = useSelector((state) => state.cart);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await fetch(
  //         "https://fir-project-1b826-default-rtdb.firebaseio.com/cart.json"
  //       );
  //       const data = await response.json();
  //       if (data) {
  //         dispatch(cartActions.replace(data));
  //       }
  //     } catch (err) {
  //       alert(err.message);
  //     }
  //   })();
  // }, [dispatch]);

  return (
    <div className="container">
      <div className="row row-cols-5 justify-content-center">
        {cartState.cartItems.map((item) => {
          return <CartItems key={item.id} {...item} />;
        })}
      </div>
    </div>
  );
}
