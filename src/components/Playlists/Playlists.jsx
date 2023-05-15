import styles from "./playlists.module.css";
import { useDispatch, useSelector } from "react-redux";
import { SET_PLAYLIST, getSongs } from "../../Redux/musicSlice";

const Playlists = () => {
  const {
    getPlaylistsLoading,
    getPlaylistsError,
    playlists,
    selectedPlaylist,
  } = useSelector((state) => {
    return state;
  });

  const dispatch = useDispatch();

  const handlePlaylistClick = (playlist) => {
    dispatch(SET_PLAYLIST(playlist));
    dispatch(getSongs(playlist.id));
  };

  if (getPlaylistsLoading) return "Loading";
  if (getPlaylistsError) return "Error";

  return (
    <ul className={styles.playlist}>
      {playlists.map((playlist) => (
        <li
          className={`${styles.playlist_item} ${
            selectedPlaylist.id === playlist.id ? styles.selected : ""
          }`}
          key={playlist?.id}
          onClick={() => handlePlaylistClick(playlist)}
        >
          {playlist?.name}
        </li>
      ))}
    </ul>
  );
};

export default Playlists;
