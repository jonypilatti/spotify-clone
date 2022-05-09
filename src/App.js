import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "./DataLayer";
import Player from "./components/Player";
import { getTokenFromURL } from "./spotify";
import "./App.css";
import Login from "./components/Login";

const spotify = new SpotifyWebApi();
function App() {
  const [{ token, user }, dispatch] = useDataLayerValue();

  useEffect(() => {
    // Set token
    const hash = getTokenFromURL();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      spotify.setAccessToken(_token);
      console.log(spotify.getMe());
      spotify.getMe().then((user) => console.log(user));

      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.getPlaylist("37i9dQZEVXcJZyENOWUFo7").then((response) =>
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      );

      spotify.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );

      // dispatch({
      //   type: "SET_SPOTIFY",
      //   spotify: spotify,
      // });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        });
      });
    }
  }, [token, dispatch]);

  return (
    <div className="app">
      {!token && <Login />}
      {token && <Player spotify={spotify} />}
    </div>
  );
}

export default App;
