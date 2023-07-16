import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react"; // Don't forget to import useEffect
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import User from "../components/User";

import styles from "./MainApplication.module.css";
import { useAuth } from "../context/AuthContext";

const MainApplication = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
     // Remove trailing slash if present from the current pathname
     const trimmedPathname = location.pathname.replace(/\/$/, "");

     // Check if the current pathname is exactly "/app"
     if (trimmedPathname === "/app") {
       // Redirect to "/app/cities" if the current pathname is "/app"
       navigate("/app/cities");
     }
  }, [navigate, location]);
 
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      {isAuthenticated && <User />}
    </div>
  );
};

export default MainApplication;
