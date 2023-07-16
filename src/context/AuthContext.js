import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

// initial state for authentication
const initialState = {
  user: null,
  isAuthenticated: false,
};

// create the context
const AuthContext = createContext(initialState);

/* 
const FAKE_USER = {
  name: "Casanova",
  email: "casanova@example.com",
  password: "@Wheat",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
*/

// create the reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

// create the provider
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (user) => {
    // check if the user exists in the database
    if (
      user.email === FAKE_USER.email &&
      user.password === FAKE_USER.password
    ) {
      dispatch({
        type: "LOGIN",
        payload: user,
      });
    } else {
      throw new Error("Invalid login credentials");
    }
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider value={{
        login,
        logout,
    }}>
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
  if (AuthContext === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return AuthContext;
};

export { AuthProvider, useAuth };
