import PropTypes from "prop-types";
import styles from "./Message.module.css";

function Message({ children }) {
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {children}
    </p>
  );
}

Message.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Message;
