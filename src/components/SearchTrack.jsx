import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import styled from "styled-components";
import { useDataLayerValue } from "../DataLayer";

function SearchTrack({ filter, setFilter }) {
  const [{ token, searchResults, tracksResults }, dispatch] =
    useDataLayerValue();
  //   console.log(tracksResults);
  useEffect(() => {
    const searchResultsId = searchResults?.map((el) =>
      el.tracks?.items?.map((el) => el.id)
    );
    // console.log(searchResultsId.join(""));
    const searchTrackResults = async () => {
      const response = await axios
        .get(`https://api.spotify.com/v1/tracks?ids=${searchResultsId[0]}`, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((response) => response.data);
      //   console.log(response);
      dispatch({ type: "SEARCH_TRACKS", tracksResults: [response] });
    };
    searchTrackResults();
  }, [searchResults]);
  const msToMinutesAndSeconds = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };
  const playTrack = async (id, name, artists, image, uri, track_number) => {
    console.log(uri);
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri: uri,
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

  //FILTRAR POR TIPOS (ARTIST, ALBUMS, TRACK) Y TAMBIEN POR TODOS.
  //BUSCAR FORMA DE DISPLAY. EL HREF INICIAL NO SIRVE
  return (
    <Container>
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
          {tracksResults?.map((el) =>
            el.tracks?.map(
              (
                {
                  id,
                  name,
                  artists,
                  image,
                  duration_ms,
                  album,
                  uri,
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
                        album.uri,
                        track_number
                      )
                    }
                  >
                    <div className="col">
                      <span className="index">{index + 1}</span>
                    </div>
                    <div className="col detail">
                      <div className="image">
                        <img src={album?.images[1]?.url} alt="track" />
                      </div>
                      <div className="info">
                        <span className="name">{name}</span>
                        <span className="artists">
                          {artists?.map((el) => (
                            <span>{el.name} </span>
                          ))}
                        </span>
                      </div>
                    </div>
                    <div className="col">
                      <span>{album?.name}</span>
                    </div>
                    <div className="col">
                      <span>{msToMinutesAndSeconds(duration_ms)}</span>
                    </div>
                  </div>
                );
              }
            )
          )}
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
  max-height:90vh;
max-width:90vw;
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
          .index{
            .svg{display:block}
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

export default SearchTrack;
