import React, { useEffect, useRef, useState } from "react";
import { useDataLayerValue } from "../DataLayer";
import Sidebar from "./Sidebar";
import Avatar from "./Avatar";
import styled from "styled-components";
import axios from "axios";
import { GoVerified, GoUnverified } from "react-icons/go";
import { IconContext } from "react-icons";

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
  console.log(TopTracks, "Top Tracks");
  console.log(ArtistInfo, "Artist info");

  const playAlbum = async (id, name, artists, image, uri, track_number) => {
    console.log(uri);
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
  const playTrack = async (id, name, artists, image, uri, track_number) => {
    console.log(uri);
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

  const Image = ArtistInfo[0].images[0].url;
  const Name = ArtistInfo[0]?.name;
  const Followers = ArtistInfo[0].followers.total;
  return (
    <Container>
      <div className="all">
        <div className="player__body">
          <Sidebar />
          <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
            <div className="god">
              <div
                className="body__avatar"
                ref={bodyRef}
                onScroll={bodyScrolled}
              >
                <Avatar navBackground={navBackground} navbar={navbar} />
              </div>

              <div className="header" id="header">
                <img src={Image} alt="header"></img>
                {Followers > 250 ? (
                  <div>
                    <p className="description">
                      <GoVerified />
                      Verified Artist
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="description">
                      <GoUnverified />
                      Unverified Artist
                    </p>
                  </div>
                )}
                <h1 className="title">{Name}</h1>
                <p className="description2">{Followers} oyentes mensuales</p>
              </div>
            </div>
            <div className="songs">
              {TopTracks?.map((el) =>
                el.tracks.map((el2) => {
                  return (
                    <div>
                      <div>{el2.album?.name}</div>
                      <div>{el2.artists.map((el) => el.name)}</div>
                      <img src={el2.album?.images[2]?.url} alt="trackimage" />
                    </div>
                  );
                })
              )}
            </div>
            <div className="body__contents">
              Discography
              {setAlbumSearch?.map((el) =>
                el.items?.map(
                  (
                    {
                      id,
                      name,
                      artists,
                      images,
                      duration_ms,
                      album,
                      uri,
                      track_number,
                    },
                    index
                  ) => {
                    return (
                      images[1]?.url && (
                        <div
                          className="row"
                          key={id}
                          onClick={() =>
                            playAlbum(
                              id,
                              name,
                              artists,
                              images,
                              uri,
                              track_number
                            )
                          }
                        >
                          <div className="col detail">
                            <div className="card">
                              <div className="image">
                                <img src={images[1]?.url} alt="track" />
                              </div>
                              <span className="name">
                                {name?.length < 18
                                  ? name
                                  : name.substring(0, 18) + "..."}
                              </span>
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
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: auto;
  display: grid;
  grid-template-rows: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  .god {
    position: relative;
    display: inline-block;
    text-align: center;
  }
  .header {
    display: inline-block;
    vertical-align: top;
    position: relative;
    img {
      aspect-ratio: 3.2/1;
      object-fit: cover;
      object-position: 0.5% 23%;
      width: 82vw;
      box-shadow: 0 4px 60px rgb(0 0 0 / 50%);
      z-index: -1;
      opacity: 0.95;
      ${
        "" /* background-noise: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDMwMHYzMDBIMHoiLz48L3N2Zz4="); */
      }
    }
    h1 {
      position: absolute;
      bottom: 40px;
      left: 40px;
      padding: 0.08em 0px;
      color: white;
      font-size: 80px;
      line-height: 80px;
      font-weight: 900;
      letter-spacing: -0.04em;
      margin-block-start: 0.67em;
      margin-block-end: 0.67em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      opacity: 1;
      user-select: none;
      text-shadow: 0px 0px #120907;
    }
    .description2 {
      display: flex;
      flex-direction: row;
      position: absolute;
      bottom: 70px;
      left: 42px;
      align-items: center;
      font-size: 18px;
      font-weight: 600;
      color: white;
      gap: 10px;
      overflow: hidden;
      text-shadow: 0px 0px #120907;
    }
    .description {
      display: flex;
      flex-direction: row;
      position: absolute;
      bottom: 190px;
      left: 42px;
      align-items: center;
      font-size: 14px;
      font-weight: 600;
      color: rgb(255, 255, 255, 0.7);
      gap: 10px;
      overflow: hidden;
      svg {
        display: grid;
        color: #3d91f4;
        font-size: 30px;
        fill: #0c67d3;
        background-image: radial-gradient(white 40%, transparent 60%);
        background-position: center;
        background-size: cover;
        border-radius: 600px 600px 600px 600px;
        height: 24px;
        width: 24px;
        align-self: center;
      }
    }
  }
  &::-webkit-scrollbar {
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.6) !important;
  }
  &::-webkit-scrollbar-track {
    opacity: 0.1 !important;
  }

  .player__body {
    display: grid;
    grid-template-columns: 17.62vw 82.8vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(100, 0, 0, 1));
    background-color: transparent;
    .body {
      z-index: 0;
      height: 100%;
      width: 100%;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0.7rem;
        &-thumb {
          background-color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
  .body__avatar {
    position: sticky;
    align-self: flex-start;
    z-index: 10;
    top: 0;
  }
  .footer {
    height: 91px;
    width: 100%;
    position: sticky;
    align-self: flex-start;
    bottom: 0;
    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
  }
`;
export default ArtistPlaylist;
