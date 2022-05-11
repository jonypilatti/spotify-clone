import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "./DataLayer";
import Player from "./components/Player";
import { getTokenFromURL } from "./spotify";
import Login from "./components/Login";
import { Container } from "@mui/material";

var spotify = new SpotifyWebApi();
function App() {
  const [{ token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    // Set token
    const hash = getTokenFromURL();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      spotify.setAccessToken(_token);
      spotify.getMe().then((user) => dispatch({ type: "SET_USER", user }));
      spotify
        .getMyDevices()
        .then((dev) => dispatch({ type: "SET_DEVICES", device: dev }));

      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });
    }
  }, [token, dispatch]);

  return <div>{token ? <Player spotify={spotify} /> : <Login />}</div>;
}

export default App;
