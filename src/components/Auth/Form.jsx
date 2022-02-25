import { Fragment, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [haveAccount, setHaveAccount] = useState(true);
  const [loading, setLoading] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  let url;

  const submitHandler = (event) => {
    setLoading(false);
    event.preventDefault();
    if (haveAccount) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD_VLJSyIXCwl-2pWMRCZDE_1fHqJLYVf4";
      (async () => {
        try {
          setLoading(true);
          const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
              email: emailInputRef.current.value,
              password: passwordInputRef.current.value,
              returnSecureToken: true,
            }),
          });
          const data = await res.json();
          console.log(data);
          dispatch(
            authActions.login({ token: data.idToken, email: data.email })
          );
          if (!res.ok) {
            let errorMessage = "failed";
            if (data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          }
          setLoading(false);
          navigate("/cart");
        } catch (err) {
          setLoading(false);
          alert(err.message);
        }
      })();
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD_VLJSyIXCwl-2pWMRCZDE_1fHqJLYVf4";
      (async () => {
        try {
          setLoading(true);
          const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
              email: emailInputRef.current.value,
              password: passwordInputRef.current.value,
              returnSecureToken: true,
            }),
          });
          const data = await res.json();
          dispatch(
            authActions.login({ token: data.idToken, email: data.email })
          );
          if (!res.ok) {
            let errorMessage = "failed";
            if (data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          }
          setLoading(false);
          navigate("/cart");
        } catch (err) {
          setLoading(false);
          alert(err.message);
        }
      })();
    }
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
  };

  return (
    <Fragment>
      <form onSubmit={submitHandler}>
        <h2>{haveAccount ? "Sign in" : "Sign up"}</h2>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            ref={emailInputRef}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            ref={passwordInputRef}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            required
          />
        </div>
        <button type="submit" className="btn btn-outline-primary">
          {loading ? "Loading..." : "Submit"}
        </button>
        <button
          type="button"
          onClick={() => setHaveAccount((prev) => !prev)}
          className="btn btn-outline-secondary"
        >
          {haveAccount ? "Create new account" : "Login with existing account"}
        </button>
      </form>
    </Fragment>
  );
}
