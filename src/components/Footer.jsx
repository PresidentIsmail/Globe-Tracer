import styles from "./Sidebar.module.css";


const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; {new Date().getFullYear()} - All rights reserved - Globe Tracer
      </p>
    </footer>
  );
};


export default Footer;