import SongsList from "../SongsList";
import Spinner from "../Spinner";
import styles from "./sidebar.module.css";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const selectedPlaylist = useSelector((state) => state.selectedPlaylist);

  if (!selectedPlaylist) return <Spinner />;
  return (
    <div className={styles.sidebar}>
      <>
        <h2 className={styles.playlist_title}>{selectedPlaylist.name}</h2>
        <SongsList />
      </>
    </div>
  );
};

export default Sidebar;
