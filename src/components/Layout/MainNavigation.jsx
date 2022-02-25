import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import Search from "./Search";

export default function MainNavigation() {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const authState = useSelector((state) => state.auth);
  const totalQuantity = cartState.cartItems
    .map((item) => item.quantity)
    .reduce((a, b) => a + b, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Jordan
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            {authState.isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  Cart{" "}
                  <span class="badge rounded-pill bg-info text-dark">
                    {totalQuantity}
                  </span>
                </Link>
              </li>
            )}
            {!authState.isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/Login">
                  Login
                </Link>
              </li>
            )}
            {authState.isLoggedIn && (
              <li className="nav-item">
                <Link
                  onClick={() => dispatch(authActions.logout())}
                  className="nav-link"
                  to="/Login"
                >
                  Logout
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/link">
                Link
              </Link>
            </li>
          </ul>
          <Search />
        </div>
      </div>
    </nav>
  );
}
