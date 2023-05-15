import React from "react";
import styles from "./SongsListItem.module.css";
import { useSelector } from "react-redux";

const SongsListItem = ({
  songInfo,
  dispatch,
  calculateFormatedDuration,
  SELECT_SONG,
  SET_PLAYING_PLAYLIST_SONGS,
}) => {
  const { selectedPlayListSongs, selectedSong } = useSelector((state) => state);

  if (selectedSong)
    return (
      <li
        className={`${styles.song} ${
          selectedSong && selectedSong.id === songInfo.id ? styles.selected : ""
        }`}
        onClick={() => {
          dispatch(SELECT_SONG(songInfo));
          dispatch(SET_PLAYING_PLAYLIST_SONGS(selectedPlayListSongs));
        }}
      >
        <div className={styles.song_left}>
          <div className={styles.song_img_container}>
            <img
              className={styles.song_img}
              src={songInfo.image}
              alt="song cover"
            />
          </div>
          <div className={styles.song_info}>
            <h3 className={styles.song_title}>{songInfo.title}</h3>
            <p className={styles.artist}>{songInfo.artist}</p>
          </div>
        </div>

        <p className={styles.duration}>
          {calculateFormatedDuration(songInfo.duration)}
        </p>
      </li>
    );
};

export default SongsListItem;
