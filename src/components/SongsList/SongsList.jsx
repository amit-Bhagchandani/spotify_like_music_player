import styles from "./songslist.module.css";
import { useDispatch, useSelector } from "react-redux";
import SongsListItem from "../SongsListItem/SongsListItem";
import {
  SELECT_SONG,
  SET_PLAYING_PLAYLIST_SONGS,
} from "../../Redux/musicSlice";
import { calculateFormatedDuration } from "../../utils/calculateFormatedDuration";

const SongsList = () => {
  const { getSongsLoading, getSongsError, selectedPlayListSongs } = useSelector(
    (state) => state
  );

  const dispatch = useDispatch();

  if (getSongsLoading) return "Loading";
  if (getSongsError) return "Error";

  return (
    <ul className={styles.songs_list}>
      {selectedPlayListSongs.map((songInfo) => (
        <SongsListItem
          key={songInfo.id}
          dispatch={dispatch}
          SELECT_SONG={SELECT_SONG}
          SET_PLAYING_PLAYLIST_SONGS={SET_PLAYING_PLAYLIST_SONGS}
          songInfo={songInfo}
          calculateFormatedDuration={calculateFormatedDuration}
        />
      ))}
    </ul>
  );
};

export default SongsList;
