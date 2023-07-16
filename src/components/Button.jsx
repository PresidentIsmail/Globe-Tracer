import PropTypes from "prop-types";
import styles from "./Button.module.css";

const Button = ({ type, onClick, children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.btn} ${styles[type]}`}
    >
      {children}
    </button>
  );
};

// validate the props passed to the component
Button.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.string.isRequired,
};

export default Button;
