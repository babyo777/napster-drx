import { savedPlaylist, songs } from "@/Interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Player {
  playlistUrl: string;
  playingPlaylistUrl: string;
  playlist: songs[];
  isPlaying: boolean;
  currentIndex: number;
  music: Howl | null;
  search: string;
  progress: number | "--:--";
  duration: number | "--:--";
  isLoading: boolean;
  isLoop: boolean;
  savedPlaylist: savedPlaylist[];
}

const initialState: Player = {
  playingPlaylistUrl: "",
  progress: "--:--",
  duration: "--:--",
  isLoop: false,
  playlistUrl: "",
  isLoading: false,
  playlist: [],
  isPlaying: false,
  currentIndex: 0,
  music: null,
  search: "",
  savedPlaylist: [],
};

const MusicPlayer = createSlice({
  name: "Music",
  initialState,
  reducers: {
    play: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    isLoop: (state, action: PayloadAction<boolean>) => {
      state.isLoop = action.payload;
    },
    removePlaylist: (state, action: PayloadAction<string>) => {
      const n = state.savedPlaylist.filter((p) => p.$id !== action.payload);
      state.savedPlaylist = n;
    },
    setPlayingPlaylistUrl: (state, action: PayloadAction<string>) => {
      state.playingPlaylistUrl = action.payload;
    },
    setProgress: (state, action: PayloadAction<number | "--:--">) => {
      state.progress = action.payload;
    },
    setDuration: (state, action: PayloadAction<number | "--:--">) => {
      state.duration = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setPlayer: (state, action: PayloadAction<Howl>) => {
      state.music = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setPlaylistUrl: (state, action: PayloadAction<string>) => {
      state.playlistUrl = action.payload;
    },
    setPlaylist: (state, action: PayloadAction<songs[]>) => {
      state.playlist = action.payload;
    },
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
    setSavedPlaylist: (state, action: PayloadAction<savedPlaylist[]>) => {
      state.savedPlaylist = action.payload;
    },
  },
});

export const {
  play,
  setPlaylist,
  setCurrentIndex,
  setPlayer,
  setSearch,
  removePlaylist,
  setPlaylistUrl,
  setSavedPlaylist,
  setIsLoading,
  isLoop,
  setProgress,
  setDuration,
  setPlayingPlaylistUrl,
} = MusicPlayer.actions;
export default MusicPlayer.reducer;
