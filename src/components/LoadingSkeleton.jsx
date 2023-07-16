// make a loading skeleton component
import styles from "./LoadingSkeleton.module.css";

// create the skeleton component
function LoadingSkeleton() {
  return (
    <div className={styles.container}>
      <div className={`${styles.center} ${styles.loop}`}></div>
      <div className={`${styles.center} ${styles.bikeWrapper}`}>
        <div className={`${styles.center} ${styles.bike}`}></div>
      </div>
    </div>
  );
}

export default LoadingSkeleton;
