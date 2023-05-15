import Playlists from "../Playlists";
import styles from "./navigation.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPlaylists } from "../../Redux/musicSlice";

const Navigation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlaylists());
  }, []);

  return (
    <div className={styles.primary_navigation}>
      <div className={styles.nav_top}>
        <div className="logo">
          <img src="assets/Icons/logo.svg" alt="logo" />
        </div>
        <Playlists />
      </div>
    </div>
  );
};

export default Navigation;
