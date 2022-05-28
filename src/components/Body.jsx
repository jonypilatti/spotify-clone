import React, { useEffect, useState } from "react";
import { useDataLayerValue } from "../DataLayer";
import axios from "axios";
import styled from "styled-components";
import { AiFillClockCircle } from "react-icons/ai";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { PlayCircleFilled } from "@mui/icons-material";
import { IconContext } from "react-icons";

function Body({ headerBackground }) {
  const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch] =
    useDataLayerValue();
  const [playButton, setPlayButton] = useState(-1);
  const [animation, setAnimation] = useState(true);

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

  const playTrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri: context_uri,
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

  return (
    <Container headerBackground={headerBackground}>
      {selectedPlaylist && (
        <>
          <div className="playlist">
            <div className="image">
              <img src={selectedPlaylist.image} alt="selectedPlaylist" />
            </div>
            <div className="details">
              <span className="type">PLAYLIST</span>
              <h1 className="title">{selectedPlaylist.name}</h1>
              <p className="description">{selectedPlaylist.description}</p>
            </div>
          </div>
          <div className="list">
            <div className="header__row">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>TITLE</span>
              </div>
              <div className="col">
                <span>ALBUM</span>
              </div>
              <div className="col">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
            <div className="tracks">
              {selectedPlaylist?.tracks?.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                  },
                  index
                ) => {
                  return (
                    <div
                      className="row"
                      key={id}
                      onClick={() =>
                        playTrack(
                          id,
                          name,
                          artists,
                          image,
                          context_uri,
                          track_number
                        )
                      }
                    >
                      <div className="col">
                        <span
                          className="index"
                          onMouseEnter={() => setPlayButton(1)}
                        >
                          {index + 1}
                        </span>
                      </div>
                      <div className="col detail">
                        <div className="image">
                          <img src={image} alt="track" />
                        </div>
                        <div className="info">
                          <span className="name">
                            {name.length < 29
                              ? name
                              : name.substring(0, 29) + "..."}
                          </span>
                          <span className="artists">
                            {artists.join(" ").substring(0, 18).length < 18
                              ? artists.join(" ")
                              : artists.join(" ").substring(0, 25) + "..."}
                          </span>
                        </div>
                      </div>
                      <div className="col">
                        <span>{album}</span>
                      </div>
                      <div className="col">
                        <span>{msToMinutesAndSeconds(duration)}</span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </Container>
  );
}
const Container = styled.div`
max-height:90vh;
max-width:90vw;
  .playlist {
    padding-top:2rem;
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
        letter-spacing:-0.04em;
        cursor: pointer;
      }
    }
  }
  .list {
    .header__row {
      display: grid;
      grid-template-columns: 0.175fr 2.3fr 2.5fr 0.09fr;
      color: #dddcdc;
      margin: 1rem 0 0 0rem;
      position: sticky;
      top:9vh;
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
          }
        }
        .col {
          display: flex;
          align-items: center;
          color: #dddcdc;
          font-size: 1rem;
          margin-left: 0.5rem;
            .play{
              &:hover{
              display:block;}
            }
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
@media (min-width: 1400px) {
  .list {
    .header__row {
      display: grid;
      grid-template-columns: 0.175fr 2.3fr 2.5fr 0.09fr;
      color: #dddcdc;
      margin: 1rem 0 0 0rem;
      position: sticky;
      top:5vh;
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
          .index{
            svg{display:block}
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
export default Body;
