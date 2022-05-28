import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "./DataLayer";
import Player from "./components/Player";
import { getTokenFromURL } from "./spotify";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Search from "./components/Search";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import styled from "styled-components";
import Body from "./components/Body";
import ArtistPlaylist from "./components/ArtistPlaylist";

var spotify = new SpotifyWebApi();
function App() {
  const [{ token, user }, dispatch] = useDataLayerValue();

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

    localStorage.getItem("spotify.access_token") !== null &&
      dispatch({
        type: "SET_TOKEN",
        token: localStorage.getItem("spotify.access_token"),
      });
    localStorage.getItem("spotify.user") !== null &&
      dispatch({
        type: "SET_USER",
        user: JSON.parse(localStorage.getItem("spotify.user")),
      });
  }, [token, dispatch]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <Routes>
        {token ? (
          <Route
            path="/"
            element={<Player isOpen={isOpen} setIsOpen={setIsOpen} />}
            spotify={spotify}
          />
        ) : (
          <Route path="/" element={<Login />} />
        )}
        <Route path="/search" element={<Search></Search>}></Route>
        <Route path="/search/:id" element={<ArtistPlaylist></ArtistPlaylist>} />
      </Routes>
      {token && (
        <div className="footer">
          <Footer isOpen={isOpen} setIsOpen={setIsOpen}></Footer>
        </div>
      )}
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  max-height: 100vh;
  max-width: 100vw;

  &::-webkit-scrollbar {
    width: 0.7rem;
    &-thumb {
      background-color: rgba(255, 255, 255, 0.6);
    }
  }
  .footer {
    overflow: hidden;
    position: relative;
    height: 91px;
    width: 100%;
    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
  }
`;

export default App;
