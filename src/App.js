import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import { getTokenFromURL } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./components/Player";
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  const [{ user, token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromURL();
    window.location.hash = ""; //ESTO LIMPIA LA URL
    const _token = hash.access_token;

    if (_token) {
      dispatch({ type: "SET_TOKEN", token: _token });

      spotify.setAccessToken(_token); //aca le setea el token a spotify
      spotify.getMe().then((user) => {
        console.log(":person", user);
        dispatch({ type: "SET_USER", user });
      }); //aca obtiene la cuenta del usuario y
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("XD", token);

  return (
    <>
      <div className="app">
        {token ? <Player spotify={spotify} /> : <Login />}
      </div>
    </>
  );
}
export default App;
