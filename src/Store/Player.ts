import { savedPlaylist, playlistSongs, suggestedArtists } from "@/Interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Player {
  playlistUrl: string;
  playingPlaylistUrl: string;
  playlist: playlistSongs[];
  isPlaying: boolean;
  currentIndex: number;
  isIphone: boolean;
  queue: playlistSongs | null;
  music: HTMLAudioElement | null;
  search: string;
  currentSongId: string;
  currentToggle: string;
  PlaylistOrAlbum: string;
  progress: number | "--:--";
  duration: number | "--:--";
  isLoading: boolean;
  isLoop: boolean;
  uid: string | null;
  isLikedSong: boolean;
  currentArtistId: string;
  savedPlaylist: savedPlaylist[];
  savedAlbums: savedPlaylist[];
  savedArtists: suggestedArtists[];
}

const initialState: Player = {
  isLikedSong: false,
  uid: localStorage.getItem("uid"),
  currentArtistId: "",
  isIphone: false,
  PlaylistOrAlbum: "",
  playingPlaylistUrl: "",
  progress: "--:--",
  duration: "--:--",
  isLoop: false,
  currentToggle: "Playlists",
  playlistUrl: "",
  isLoading: false,
  queue: null,
  playlist: [],
  isPlaying: false,
  currentIndex: 0,
  music: null,
  currentSongId: "",
  search: "",
  savedPlaylist: [],
  savedAlbums: [],
  savedArtists: [],
};

const MusicPlayer = createSlice({
  name: "Music",
  initialState,
  reducers: {
    play: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    shuffle: (state, action: PayloadAction<playlistSongs[]>) => {
      const s = [...action.payload];
      for (let i = s.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [s[i], s[j]] = [s[j], s[i]];
      }

      state.playlist = s;
    },
    SetPlaylistOrAlbum: (state, action: PayloadAction<string>) => {
      state.PlaylistOrAlbum = action.payload;
    },
    SetQueue: (state, action: PayloadAction<playlistSongs>) => {
      state.queue = action.payload;
    },
    SetCurrentSongId: (state, action: PayloadAction<string>) => {
      state.currentSongId = action.payload;
    },
    isLoop: (state, action: PayloadAction<boolean>) => {
      state.isLoop = action.payload;
    },
    setIsLikedSong: (state, action: PayloadAction<boolean>) => {
      state.isLikedSong = action.payload;
    },
    setCurrentToggle: (state, action: PayloadAction<string>) => {
      state.currentToggle = action.payload;
    },
    setPlayingPlaylistUrl: (state, action: PayloadAction<string>) => {
      state.playingPlaylistUrl = action.payload;
    },
    setIsIphone: (state, action: PayloadAction<boolean>) => {
      state.isIphone = action.payload;
    },
    setCurrentArtistId: (state, action: PayloadAction<string>) => {
      state.currentArtistId = action.payload;
    },
    setProgressLyrics: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    setDuration: (state, action: PayloadAction<number | "--:--">) => {
      state.duration = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setPlayer: (state, action: PayloadAction<HTMLAudioElement | null>) => {
      //@ts-expect-error:fix
      state.music = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setPlaylistUrl: (state, action: PayloadAction<string>) => {
      state.playlistUrl = action.payload;
    },
    setPlaylist: (state, action: PayloadAction<playlistSongs[]>) => {
      state.playlist = action.payload;
    },
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
    setSavedPlaylist: (state, action: PayloadAction<savedPlaylist[]>) => {
      state.savedPlaylist = action.payload;
    },
    setSavedAlbums: (state, action: PayloadAction<savedPlaylist[]>) => {
      state.savedAlbums = action.payload;
    },
    setSavedArtists: (state, action: PayloadAction<suggestedArtists[]>) => {
      state.savedArtists = action.payload;
    },
  },
});

export const {
  shuffle,
  play,
  setSavedArtists,
  setSavedAlbums,
  setCurrentToggle,
  SetPlaylistOrAlbum,
  setPlaylist,
  setCurrentIndex,
  SetQueue,
  setPlayer,
  setSearch,
  setPlaylistUrl,
  setSavedPlaylist,
  setIsLikedSong,
  setIsLoading,
  isLoop,
  SetCurrentSongId,
  setProgressLyrics,
  setIsIphone,
  setCurrentArtistId,
  setDuration,
  setPlayingPlaylistUrl,
} = MusicPlayer.actions;
export default MusicPlayer.reducer;
