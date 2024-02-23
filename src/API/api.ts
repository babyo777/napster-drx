const mainApi = import.meta.env.VITE_API_URL;
const streamApi = "https://unconscious-elianora-babyo7.koyeb.app/?url=";

const isPlaylist = `${mainApi}/is/p?l=`;

const SuggestionSearchApi = `${mainApi}/ss/p?l=`;

const SearchApi = `${mainApi}/s/`;

const GetPlaylistSongsApi = `${mainApi}/ps/`;

const getArtistsDetailsByName = `${mainApi}/gabyname/`;

const SearchPlaylistApi = `${mainApi}/p/`;

const SearchArtist = `${mainApi}/a/`;

const GetArtistDetails = `${mainApi}/ga/`;

const SearchAlbum = `${mainApi}/al/`;

const GetAlbumSongs = `${mainApi}/gas/`;

export {
  streamApi,
  getArtistsDetailsByName,
  isPlaylist,
  SuggestionSearchApi,
  SearchApi,
  GetPlaylistSongsApi,
  SearchPlaylistApi,
  SearchArtist,
  GetArtistDetails,
  SearchAlbum,
  GetAlbumSongs,
};
