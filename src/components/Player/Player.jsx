import styles from "./player.module.css";
import Spinner from "../Spinner";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NEXT_SONG, PREVIOUS_SONG } from "../../Redux/musicSlice";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFirstRun, setIsFirstRun] = useState(true);

  const audioPlayer = useRef();
  const progressBar = useRef();
  const progressBarContainer = useRef();

  const song = useSelector((state) => state.selectedSong);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isFirstRun) {
      return;
    }

    if (song) {
      audioPlayer.current.load();
      progressBar.current.max = audioPlayer.current.duration;
      audioPlayer.current.play();
      setIsPlaying(true);
    }
  }, [song]);

  const togglePlayPause = () => {
    if (isFirstRun) {
      setIsFirstRun(false);
    }

    const itWasPlaying = isPlaying;
    setIsPlaying(!itWasPlaying);

    if (itWasPlaying) {
      audioPlayer.current.pause();
    } else {
      audioPlayer.current.play();
    }
  };

  const handleNext = () => {
    dispatch(NEXT_SONG());
  };

  const handlePrevious = () => {
    dispatch(PREVIOUS_SONG());
  };

  const handleProgressBarClick = (e) => {
    const width = progressBarContainer.current.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const duration = audioPlayer.current.duration;
    audioPlayer.current.currentTime = (clickX / width) * duration;
  };

  const updateProgressBar = () => {
    const { duration, currentTime } = audioPlayer.current;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.current.style.width = `${progressPercent}%`;
  };

  if (!song) return <Spinner />;

  return (
    <div className={styles.player}>
      <audio
        ref={audioPlayer}
        src={song.url}
        preload="metadata"
        onEnded={() => {
          dispatch(NEXT_SONG());
        }}
        onTimeUpdate={updateProgressBar}
      ></audio>
      <div className={styles.title_wrapper}>
        <h2 className={styles.song_title}>{song.title}</h2>
        <p className={styles.artist}>{song.artist}</p>
      </div>

      <div className={styles.cover_image_container}>
        <img
          className={styles.cover_image}
          src={song.image}
          alt="song cover"
        ></img>
      </div>

      <div className={styles.audio_controls}>
        <div
          className={styles.progress_bar_container}
          ref={progressBarContainer}
          onClick={handleProgressBarClick}
        >
          <div className={styles.progress_bar} ref={progressBar}></div>
        </div>
        <div className={styles.playback_controls}>
          <button
            className={styles.playback_options}
            name="playback options button"
          >
            <img
              src="assets/Icons/optionsIcon.svg"
              alt="playback options icon"
            ></img>
          </button>
          <div className={styles.playback_control_buttons_container}>
            <button
              className={styles.prev_song_btn}
              onClick={handlePrevious}
              name="previous song"
            >
              <img src="assets/Icons/prevBtnIcon.svg" alt="previous icon"></img>
            </button>
            <button
              onClick={togglePlayPause}
              className={styles.play_pause_btn}
              name="play pause button"
            >
              <img
                src={
                  isPlaying
                    ? "assets/Icons/pauseBtnIcon.svg"
                    : "assets/Icons/playBtnIcon.svg"
                }
                alt="play pause icon"
              ></img>
            </button>
            <button
              className={styles.next_song_btn}
              onClick={handleNext}
              name="next song"
            >
              <img src="assets/Icons/nextBtnIcon.svg" alt="next icon"></img>
            </button>
          </div>
          <button className={styles.volume} name="mute button">
            <img src="assets/Icons/VolumeIcon.svg" alt="mute unmute icon"></img>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;
