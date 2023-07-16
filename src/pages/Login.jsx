import { useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PageNav from "../components/PageNav";
import Button from "../components/Button";
import styles from "./Login.module.css";

import { useAuth } from "../context/AuthContext";

// implement useReduer instead of useState

const initialState = {
  email: "casanova@example.com", // pre-fill for dev purposes
  password: "@Wheat", // pre-fill for dev purposes
};

function reducer(state, action) {
  switch (action.type) {
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    default:
      throw new Error();
  }
}

export default function Login() {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { email, password } = state; // destructure state
  // get login() from context
  const { login, isAuthenticated } = useAuth();
  console.log(useAuth());

  // check if user is authenticated and navigate to /app in an effect
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app");
    }
  }, [isAuthenticated, navigate]);

  // handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    // call login() from context
    login(email, password);
  }

  // email input
  function handleEmailChange(e) {
    dispatch({ type: "email", payload: e.target.value });
  }

  // password input
  function handlePasswordChange(e) {
    dispatch({ type: "password", payload: e.target.value });
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={handleEmailChange}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={handlePasswordChange}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
