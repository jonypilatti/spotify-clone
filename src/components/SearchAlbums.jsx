import axios from "axios";
import React, { useEffect } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import { useDataLayerValue } from "../DataLayer";
import styled from "styled-components";

function SearchAlbums({ filter, setFilter }) {
  const [{ token, searchResults, albumResults }, dispatch] =
    useDataLayerValue();
  useEffect(() => {
    const searchResultsId = searchResults?.map((el) =>
      el.albums?.items?.map((el) => el.id)
    );
    // console.log(searchResultsId);
    console.log(albumResults);
    const searchTrackResults = async () => {
      const response = await axios
        .get(`https://api.spotify.com/v1/albums?ids=${searchResultsId[1]}`, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((response) => response.data);
      console.log(response);
      dispatch({ type: "SEARCH_ALBUMS", albumResults: [response] });
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

  //FILTRAR POR TIPOS (ARTIST, ALBUMS, TRACK) Y TAMBIEN POR TODOS.
  //BUSCAR FORMA DE DISPLAY. EL HREF INICIAL NO SIRVE
  return (
    <Container>
      <div className="tracks">
        {albumResults?.map((el) =>
          el.albums?.map(
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
                <div
                  className="row"
                  key={id}
                  onClick={() =>
                    playTrack(id, name, artists, images, uri, track_number)
                  }
                >
                  <div className="col detail">
                    <div className="card">
                      <div className="image">
                        <img src={images[0]?.url} alt="track" />
                      </div>
                      <span className="name">
                        {name.length < 18
                          ? name
                          : name.substring(0, 18) + "..."}
                      </span>
                      <div className="info">
                        <span className="artists">
                          {artists?.map((el) => (
                            <span>{el.name} </span>
                          ))}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          )
        )}
      </div>
    </Container>
  );
}
const Container = styled.div`
  max-height:90vh;
box-sizing: border-box;
max-width:90vw;
    .tracks {
        display: grid;
        grid-template-columns:repeat(var(--column-count),minmax(0,1fr));
       margin: 1rem 1rem;
       --column-width:190px;
      --column-count:5;
      grid-gap:var(--grid-gap);
       --grid-gap:24px;
      .row {
          width:100%;
          height:100%;
          border-radius:10px;
        padding: 1rem 1rem 1rem 1rem;
        transition:background-color .3s ease;
        background-color: rgba(0, 0, 0, 0.2);
        cursor:pointer;
        &:hover {
            background-color:rgba(135, 136, 136, 0.4)
        }
        .col {
        gap:1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #dddcdc;
          font-size: 1rem;
         
          }
        .detail {
          font-size:1rem;
          line-height:1.5rem;
          font-weight:800px;
          text-transform:none;
          letter-spacing:normal;
          padding-block-end:4px;
            color:white;
            .card{
                display:flex;
                flex-direction: column;
                align-items: flex-start;
            }
          img {
            height: 150px;
            width:150px;
            border-radius:20px;
          }
          .name{
            font-size:1rem;
          line-height:1.5rem;
          font-weight:700;
          text-transform:none;
          letter-spacing:normal;
            color:white;
          }
          .info {
            display: flex;
            flex-direction: column;
            font-weight: 600; 
            font-size: 1rem;
            line-height: 1.5rem;
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
  }
`;

export default SearchAlbums;
