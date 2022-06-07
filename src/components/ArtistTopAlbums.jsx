import React, { useEffect, useRef, useState } from "react";
import { useDataLayerValue } from "../DataLayer";
import Sidebar from "./Sidebar";
import Avatar from "./Avatar";
import styled from "styled-components";
import axios from "axios";
import { GoVerified, GoUnverified } from "react-icons/go";
import { IconContext } from "react-icons";
import ArtistTopTracks from "./ArtistTopTracks";

function ArtistPlaylist() {
  const [{ token, user, setAlbumSearch, TopTracks, ArtistInfo }, dispatch] =
    useDataLayerValue();
  const bodyRef = useRef();
  const [navbar, setNavbar] = useState(false);
  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);
  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30
      ? setNavBackground(true)
      : setNavBackground(false);
    bodyRef.current.scrollTop >= 268
      ? setNavBackground(true)
      : setNavBackground(false);
    bodyRef.current.scrollTop >= 30
      ? setHeaderBackground(true)
      : setHeaderBackground(false);
    bodyRef.current.scrollTop >= 268
      ? setHeaderBackground(true)
      : setHeaderBackground(false);
    bodyRef.current.scrollTop >= 30 ? setNavbar(true) : setNavbar(false);
    bodyRef.current.scrollTop >= 268 ? setNavbar(true) : setNavbar(false);
  };
  useEffect(() => {
    localStorage.getItem("spotify.access_token", token);
    localStorage.getItem("spotify.user", JSON.stringify(user));
  }, [token, user]);
  //   console.log(setAlbumSearch);
  //   console.log(TopTracks, "Top Tracks");
  //   console.log(ArtistInfo, "Artist info");

  const playAlbum = async (
    id,
    name,
    artists,
    image,
    duration_ms,
    uri,
    track_number
  ) => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri: uri,
        offset: {
          position: 0,
        },
        position_ms: 0,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 204) {
      const currentlyPlaying = {
        id,
        name,
        artists,
        image,
      };
      dispatch({ type: "SET_PLAYING", currentlyPlaying });
      dispatch({ type: "SET_PLAYER_STATE", playerState: true });
    } else dispatch({ type: "SET_PLAYER_STATE", playerState: true });
  };

  //   console.log(TopTracks, "Toptracks");
  let LimitedAlbumSearch = [];
  for (let i = 0; i < 5; i++) {
    LimitedAlbumSearch.push(setAlbumSearch[0].items[i]);
  }
  //   console.log(LimitedAlbumSearch, "LimitedAlbumSearch");
  return (
    <Container>
      <div className="tracklist2">
        {LimitedAlbumSearch?.map(
          (
            { id, name, artists, images, duration_ms, uri, track_number },
            index
          ) => {
            return (
              images[1]?.url && (
                <div
                  className="row2"
                  key={id}
                  onClick={() =>
                    playAlbum(
                      id,
                      name,
                      artists,
                      images,
                      duration_ms,
                      uri,
                      track_number
                    )
                  }
                >
                  <div className="col2 detail">
                    <div className="card">
                      <div className="image">
                        <img src={images[1]?.url} alt="track" />
                      </div>
                      <span className="name">
                        {name?.length < 28
                          ? name
                          : name.substring(0, 28) + "..."}
                      </span>
                      <div className="col2"></div>
                      <div className="info">
                        <span className="artists">
                          <span>Artista </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            );
          }
        )}
      </div>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  overflow-x: hidden;
  margin: 1rem;
  .tracklist2 {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .row2 {
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);
    display: grid;
    padding: 0.5rem 1rem;
    margin-left: 0.4rem;
    cursor: pointer;
    font-weight: 600;
    &:hover {
      background-color: rgba(0, 0, 0, 0.65);
      transition: 0.3s ease-in-out;
    }
  }
  .col2 {
    display: flex;
    align-items: center;
    color: #dddcdc;
    font-size: 1rem;
    .play {
      &:hover {
        display: block;
      }
    }
  }

  gap: 10px;
  .detail {
    img {
      height: 170px;
    }
    display: flex;
    gap: 1rem;
    .info {
      display: flex;
      flex-direction: column;
      font-weight: 600;
      font-size: 1rem;
      line-height: 1.6rem;
      text-transform: none;
      letter-spacing: normal;
      .artists {
        font-size: 0.85rem;
        color: #a9a9a9;
      }
    }
  }
`;
export default ArtistPlaylist;
