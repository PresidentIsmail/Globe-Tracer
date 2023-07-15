import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import styles from "./MainApplication.module.css";

const MainApplication = () => {
  const navigate = useNavigate();

  // when the component mounts navigate to the cities page
  useEffect(() => {
    navigate("/app/cities");
  }, [navigate]);

  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
};

export default MainApplication;
