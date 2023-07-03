import React, { useEffect, useState } from "react";
import { useDataLayerValue } from "../DataLayer";
import axios from "axios";
import styled from "styled-components";
import { AiFillClockCircle } from "react-icons/ai";
import { PlayCircleFilled } from "@mui/icons-material";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from "react-icons/bs";
const ArtistTopTracks = ({ headerBackground }) => {
  const [
    { token, selectedPlaylistId, selectedPlaylist, TopTracks, ArtistInfo },
    dispatch,
  ] = useDataLayerValue();
  const [playButton, setPlayButton] = useState(true);
  const [animation, setAnimation] = useState(true);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response);
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a")
          ? ""
          : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };
      dispatch({ type: "SET_PLAYLIST", selectedPlaylist });
    };
    getInitialPlaylist();
  }, [token, dispatch, selectedPlaylistId]);

  const msToMinutesAndSeconds = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const playTrack = async (id, name, artists, image, album, track_number) => {
    // console.log(album.uri, "EL URI");
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri: album.uri,
        offset: {
          position: track_number - 1,
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
  const PlayButtonHandler = (
    index,
    id,
    name,
    artists,
    image,
    album,
    track_number
  ) => {
    setSelected(index);
    if (playButton == 1) {
      setPlayButton(-1);
      playTrack(id, name, artists, image, album, track_number, album);
    } else if (playButton != 1) {
      setPlayButton(1);
      playTrack(id, name, artists, image, album, track_number, album);
    }
  };
  const PlayHandler = (index) => {
    if (selected == index && playButton == 1) return <PlayCircleFilled />;
    else if (selected == index && playButton == -1)
    return <BsFillPauseCircleFill />;
    else return index + 1;
  };
  // console.log(TopTracks, "tracks");
  return (
    <Container headerBackground={headerBackground}>
      <div className="list">
        <h2 className="header-title">Populares</h2>
        <div className="tracks">
          {TopTracks[0]?.tracks.map(
            (
              {
                id,
                album,
                name,
                artists,
                image,
                duration_ms,
                uri,
                track_number,
              },
              index
            ) => {
              return (
                <div
                  className="row"
                  key={index}
                  id={id}
                  onClick={() =>
                    PlayButtonHandler(
                      index,
                      id,
                      name,
                      artists,
                      image,
                      album,
                      track_number
                    )
                  }
                  onMouseOver={() => setSelected(index)}
                  onMouseOut={() => setSelected("")}
                >
                  <div className="col">
                    <span className="index">{PlayHandler(index)}</span>
                  </div>
                  <div className="col detail">
                    <div className="image">
                      <img src={album.images[2].url} alt="track" />
                    </div>
                    <div className="info">
                      <span className="name">
                        {name.length < 28
                          ? name + " "
                          : name.substring(0, 28) +"..." }
                      </span>
                      <span className="artists">
                        {artists.length<3 ? artists.map(el=>el.name).join(", ") : artists.map(el=>el.name.length <15 && el.name).join(", ")}
                      </span>
                    </div>
                  </div>
                  <br></br>
                  <div className="col">
                    <span>{msToMinutesAndSeconds(duration_ms)}</span>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </Container>
  );
};
const Container = styled.div`
  max-height: 90vh;
  max-width: 90vw;
  display: flex;
  position: relative;
  .header-title {
    margin-left: 1rem;
    color: white;
    font-size: 1.5rem;
    letter-spacing: -0.04em;
    text-transform: none;
    line-height: 1.75rem;
    margin: 1rem;
  }
  .playlist {
    padding-top: 2rem;
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    box-sizing: border-box;
    .type {
      font-weight: 700;
      font-size: 12px;
      color: white;
    }
    .image {
      img {
        height: 14.5rem;
        box-shadow: 0 4px 60px rgb(0 0 0 / 50%);
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      color: #e0dede;
      .title {
        padding: 0.08em 0px;
        color: white;
        font-size: 80px;
        line-height: 80px;
        font-weight: 900;
        letter-spacing: -0.04em;
        cursor: pointer;
      }
    }
  }
  .list {
    .header__row {
      display: grid;
      color: #dddcdc;
      margin: 1rem 0 0 0rem;
      position: sticky;
      top: 9vh;
      padding: 1rem 3rem;
      font-size: 1rem;
      transition: 0.3s ease-in-out;
      border-bottom: 1px solid transparent;
      background-color: ${({ headerBackground }) =>
        headerBackground ? "#1f1e1e" : "none"};
    }
    .tracks {
      margin: 0 1rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row {
        border-radius: 5px;
        padding: 0.2rem 1rem;
        display: grid;
        grid-template-columns: 0.1fr 1fr 2fr 0.5fr;

        &:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }
      }
      .col {
        display: flex;
        align-items: center;
        color: #dddcdc;
        font-size: 1rem;
        margin-left: 0.5rem;
        .play {
          &:hover {
            display: block;
          }
        }
      }
    }
    .detail {
      img {
        height: 40px;
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
  }
  @media (min-width: 1400px) {
    .list {
      .header__row {
        display: grid;
        grid-template-columns: 0.175fr 2.3fr 2.5fr 0.09fr;
        color: #dddcdc;
        margin: 1rem 0 0 0rem;
        position: sticky;
        top: 5vh;
        padding: 1rem 3rem;
        font-size: 1rem;
        transition: 0.3s ease-in-out;
        border-bottom: 1px solid transparent;
        background-color: ${({ headerBackground }) =>
          headerBackground ? "#1f1e1e" : "none"};
      }
      .tracks {
        margin: 0 1.5rem;
        display: flex;
        flex-direction: column;
        margin-bottom: 5rem;
        .row {
          padding: 0.5rem 1rem;
          display: grid;
          grid-template-columns: 0.19fr 2.8fr 3fr 0.1fr;
          &:hover {
            background-color: rgba(0, 0, 0, 0.7);
            .index {
              svg {
                display: block;
              }
            }
          }
          .col {
            display: flex;
            align-items: center;
            color: #dddcdc;
            font-size: 1rem;
            margin-left: 0.5rem;
          }
        }
        .detail {
          img {
            height: 50px;
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
      }
    }
  }
`;
export default ArtistTopTracks;
