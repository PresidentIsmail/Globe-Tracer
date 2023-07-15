import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNavigation from "../components/AppNavigation";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

// make a Sidebar component
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNavigation />

      {/* The <Outlet /> component is a built-in component from the React Router library. It is used to render nested routes */}
      <Outlet />
      
      <Footer />
    </div>
  );
};

export default Sidebar;
