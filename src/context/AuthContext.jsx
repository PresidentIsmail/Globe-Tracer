import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

// initial state for authentication
const initialState = {
  email: "",
  password: "",
  isAuthenticated: false,
};

// create the context
const AuthContext = createContext();

// fake user for authentication
const FAKE_USER = {
  name: "Casanova",
  email: "casanova@example.com",
  password: "@Wheat",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

// create the reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        ...state,
        email: "",
        password: "",
        isAuthenticated: false,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// create the provider
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // login function
  const login = (email, password) => {
    // if email and password match the fake user, dispatch the login action
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({
        type: "LOGIN",
        payload: {
          email,
          password,
        },
      });
    } else {
      alert("Invalid credentials");
    }
  };

  // logout function
  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isAuthenticated: state.isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// validate props
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// create custom hooks for the context
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
