import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";

export default function CartItems(props) {
  const cartState = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (!!cartState.cartItems.length !== true) {
    return (
      <div className="container">
        <h1>There Is No Items</h1>
      </div>
    );
  }

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={props.image} className="card-img-top" alt={props.title} />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.info}</p>
        <button
          onClick={() => dispatch(cartActions.removeItemFromCart(props.id))}
          className="btn btn-primary"
        >
          Remove
        </button>
        <button
          onClick={() => dispatch(cartActions.addToCart({ id: props.id }))}
          type="button"
          className="btn btn-primary position-relative"
        >
          Quantity
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {props.quantity}+
            <span className="visually-hidden">unread messages</span>
          </span>
        </button>
        <span class="badge rounded-pill p-3 ml-5 bg-dark">
          ${props.price * props.quantity}
        </span>
      </div>
    </div>
  );
}
