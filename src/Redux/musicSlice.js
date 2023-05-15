import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPlaylists as getPlaylistsApi,
  getSongs as getSongsApi,
} from "../Api";

export const getPlaylists = createAsyncThunk(
  "music/setNotes",
  async (_, { dispatch, getState }) => {
    const data = await getPlaylistsApi();
    dispatch(SET_PLAYLIST(data[0]));
    await dispatch(getSongs(data[0].id));
    dispatch(SELECT_SONG(getState().selectedPlayListSongs[0]));
    dispatch(SET_PLAYING_PLAYLIST_SONGS(getState().selectedPlayListSongs));

    return data;
  }
);

export const getSongs = createAsyncThunk(
  "music/getSongs",
  async (playlistId, { dispatch }) => {
    const data = await getSongsApi(playlistId);
    return data;
  }
);

const initialState = {
  playlists: null,
  selectedPlaylist: null,
  selectedPlayListSongs: [],
  playingPlayListSongs: [],
  selectedSong: null,
  searchString: "",
  getPlaylistsLoading: true,
  getPlaylistsError: false,
  getSongsLoading: true,
  getSongsError: false,
};

export const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    NEXT_SONG: (state) => {
      const playlistLength = state.playingPlayListSongs.length;
      const selectedSongIndex = state.playingPlayListSongs.findIndex(
        (song) => song.id == state.selectedSong.id
      );

      if (selectedSongIndex === playlistLength - 1)
        state.selectedSong = state.playingPlayListSongs[0];
      else
        state.selectedSong = state.playingPlayListSongs[selectedSongIndex + 1];
    },
    PREVIOUS_SONG: (state) => {
      const playlistLength = state.playingPlayListSongs.length;
      const selectedSongIndex = state.playingPlayListSongs.findIndex(
        (song) => song.id == state.selectedSong.id
      );

      if (selectedSongIndex === 0)
        state.selectedSong = state.playingPlayListSongs[playlistLength - 1];
      else
        state.selectedSong = state.playingPlayListSongs[selectedSongIndex - 1];
    },
    SELECT_SONG: (state, action) => {
      state.selectedSong = action.payload;
    },
    SET_PLAYLIST: (state, action) => {
      state.selectedPlaylist = action.payload;
    },
    SET_PLAYING_PLAYLIST_SONGS: (state, action) => {
      state.playingPlayListSongs = action.payload;
    },
  },

  extraReducers: {
    [getPlaylists.pending]: (state) => {
      state.getPlaylistsLoading = true;
      state.getSongsLoading = true;
    },

    [getPlaylists.rejected]: (state) => {
      state.getPlaylistsError = true;
      state.getSongsError = true;
    },
    [getPlaylists.fulfilled]: (state, action) => {
      state.getPlaylistsLoading = false;
      state.getPlaylistsError = false;
      state.playlists = action.payload;
    },

    [getSongs.pending]: (state) => {
      state.getSongsLoading = true;
    },

    [getSongs.rejected]: (state) => {
      state.getSongsError = true;
    },
    [getSongs.fulfilled]: (state, action) => {
      state.getSongsLoading = false;
      state.getSongsError = false;
      state.selectedPlayListSongs = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  NEXT_SONG,
  PREVIOUS_SONG,
  SELECT_SONG,
  SET_PLAYLIST,
  SET_PLAYING_PLAYLIST_SONGS,
} = musicSlice.actions;

export default musicSlice.reducer;
