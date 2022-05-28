export const initialState = {
  user: null,
  playlists: [],
  top_artists: null,
  item: null,
  selectedPlaylistId: "37i9dQZEVXcEA9IsyFaHNY",
  selectedPlaylist: null,
  currentlyPlaying: null,
  playerState: "false",
  availableDevices: [],
  currentDevice: null,
  playbackState: null,
  repeatState: "off",
  shuffleState: "false",
  searchResults: null,
  tracksResults: null,
  albumResults: null,
  artistsResults: null,
  setAlbumSearch: null,
  TopTracks: null,
  ArtistInfo: null,
};

const reducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    case "SET_PLAYING":
      return {
        ...state,
        playing: action.playing,
      };
    case "SET_USER":
      return { ...state, user: action.user };

    case "SET_ITEM":
      return {
        ...state,
        item: action.item,
      };

    case "SET_TOP_ARTISTS":
      return {
        ...state,
        top_artists: action.top_artists,
      };

    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };

    case "SET_PLAYLIST":
      return {
        ...state,
        selectedPlaylist: action.selectedPlaylist,
      };
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    case "GET_DEVICES":
      return {
        ...state,
        availableDevices: action.availableDevices,
      };
    case "SET_DEVICES":
      return {
        ...state,
        currentDevice: action.currentDevice,
      };
    case "CURRENTLY_PLAYING":
      return {
        ...state,
        currentlyPlaying: action.currentlyPlaying,
      };
    case "GET_PLAYBACK":
      return {
        ...state,
        playbackState: action.playbackState,
      };
    case "SET_PLAYER_STATE":
      return { ...state, playerState: action.playerState };
    case "SET_PLAYLIST_ID":
      return { ...state, selectedPlaylistId: action.selectedPlaylistId };
    case "SET_REPEAT":
      return { ...state, repeatState: action.repeatState };
    case "SET_SHUFFLE":
      return { ...state, shuffleState: action.shuffleState };
    case "SEARCH_RESULTS":
      return { ...state, searchResults: action.searchResults };
    case "SEARCH_TRACKS":
      return {
        ...state,
        tracksResults: action.tracksResults,
      };
    case "SEARCH_ARTISTS":
      return {
        ...state,
        artistsResults: action.artistsResults,
      };
    case "SEARCH_ALBUMS":
      return { ...state, albumResults: action.albumResults };
    case "SET_ALBUM_SEARCH":
      return { ...state, setAlbumSearch: action.setAlbumSearch };
    case "SET_ARTISTS_TOP_TRACKS":
      return { ...state, TopTracks: action.TopTracks };
    case "GET_ARTIST":
      return { ...state, ArtistInfo: action.ArtistInfo };
    default:
      return state;
  }
};

export default reducer;
