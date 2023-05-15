const fetchUrl = "data/db.json";

export const getPlaylists = async () => {
  const data = await fetch(fetchUrl).then((res) => res.json());
  return data?.playlists;
};

export const getSongs = async (playlistID) => {
  const data = await fetch(fetchUrl).then((res) => res.json());
  const songs = data?.songs;

  return songs.filter((song) => song.playlist_id == playlistID);
};
