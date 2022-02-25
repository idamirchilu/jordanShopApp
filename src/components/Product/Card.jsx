import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";

export default function Card(props) {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  return (
    <div className="card col" style={{ width: "18rem" }}>
      <img src={props.image} className="card-img-top" alt={props.title} />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.info}</p>
        <button
          onClick={() => {
            if (!authState.isLoggedIn) {
              alert("frist login");
            } else {
              dispatch(
                cartActions.addToCart({
                  ...props,
                  quantity: 1,
                })
              );
            }
          }}
          className="btn btn-primary"
        >
          Add To Cart
        </button>
        <span>${props.price}</span>
      </div>
    </div>
  );
}
