const mainApi = import.meta.env.VITE_API_URL;
const isIPhone = /iPhone/i.test(navigator.userAgent);

const STREAM = [
  "https://exotic-cloe-babyo77.koyeb.app/?url=",
  "https://unconscious-elianora-babyo7.koyeb.app/?url=",
  "https://occasional-clara-babyo777.koyeb.app/?url=",
];
const DOWNLOAD = [
  "https://exotic-cloe-babyo77.koyeb.app/download?url=",
  "https://unconscious-elianora-babyo7.koyeb.app/download?url=",
  "https://occasional-clara-babyo777.koyeb.app/download?url=",
];

const streamApi = isIPhone
  ? STREAM[Math.floor(Math.random() * STREAM.length)]
  : "https://alone-dorothee-wolfey.koyeb.app?url=";
const downloadApi = DOWNLOAD[Math.floor(Math.random() * STREAM.length)];

const isPlaylist = `${mainApi}/is/p?l=`;

const SuggestionSearchApi = `${mainApi}/ss/`;

const SearchApi = `${mainApi}/s/`;

const GetPlaylistSongsApi = `${mainApi}/ps/`;

const GetPlaylistHundredSongsApi = `${mainApi}/psh/`;

const getArtistsDetailsByName = `${mainApi}/gabyname/`;

const SearchPlaylistApi = `${mainApi}/p/`;

const getPlaylistDetails = `${mainApi}/gpd/`;

const SearchArtist = `${mainApi}/a/`;

const GetArtistDetails = `${mainApi}/ga/`;

const SearchAlbum = `${mainApi}/al/`;

const GetAlbumSongs = `${mainApi}/gas/`;

const GetLyrics = `${mainApi}/lrc/`;

const GetImage = `${mainApi}/image/?img=`;

const TransferFromSpotifyApi = `${mainApi}/get/?id=`;

const SearchOneTrackApi = `${mainApi}/one/?t=`;

export {
  SearchOneTrackApi,
  TransferFromSpotifyApi,
  GetImage,
  GetLyrics,
  streamApi,
  getArtistsDetailsByName,
  isPlaylist,
  SuggestionSearchApi,
  SearchApi,
  GetPlaylistSongsApi,
  GetPlaylistHundredSongsApi,
  SearchPlaylistApi,
  SearchArtist,
  GetArtistDetails,
  SearchAlbum,
  downloadApi,
  getPlaylistDetails,
  GetAlbumSongs,
};
