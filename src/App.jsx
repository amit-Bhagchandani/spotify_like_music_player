import "./styles/App.css";
import Navigation from "./components/Navigation";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import Palette from "react-palette";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

function App() {
  const [showMobileSongsMenu, setShowMobileSongsMenu] = useState(false);
  const appRef = useRef();
  const selectedSong = useSelector((state) => state.selectedSong);

  const changeGradient = (palette) => {
    if (appRef.current) {
      appRef.current.style.setProperty("--dominant", `${palette.data.muted}`);
      appRef.current.style.setProperty(
        "--darker-dominant",
        `${palette.data.darkMuted}`
      );
    }
  };

  return (
    <div className="App" ref={appRef}>
      <Palette src={selectedSong && selectedSong.image}>
        {changeGradient}
      </Palette>

      <button
        className="mobile_menu_btn"
        onClick={() => {
          setShowMobileSongsMenu(!showMobileSongsMenu);
        }}
      >
        <img
          src={
            showMobileSongsMenu
              ? "assets/Icons/closeIcon.svg"
              : "assets/Icons/menuIcon.svg"
          }
          alt="open close playlists menu button"
        />
      </button>
      <div className="container">
        <div
          className={`nav_sidebar_container ${
            showMobileSongsMenu ? "open" : ""
          }`}
        >
          <Navigation />
          <Sidebar />
        </div>

        <Player />
      </div>
    </div>
  );
}

export default App;
