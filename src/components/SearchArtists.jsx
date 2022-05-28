import axios from "axios";
import React, { useEffect } from "react";
import { useDataLayerValue } from "../DataLayer";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function SearchArtists({ filter, setFilter }) {
  const [
    { token, searchResults, artistsResults, TopTracks, ArtistInfo },
    dispatch,
  ] = useDataLayerValue();
  const navigate = useNavigate();
  useEffect(() => {
    const searchResultsId = searchResults?.map((el) =>
      el.artists?.items?.map((el) => el.id)
    );
    // console.log(searchResults);
    // console.log(searchResultsId);
    console.log(artistsResults);
    const getArtistInfo = async (id) => {
      const response = await axios
        .get(`https://api.spotify.com/v1/artists/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((response) => response.data);
      console.log(response);
      dispatch({ type: "GET_ARTIST", ArtistInfo: [response] });
    };
    getArtistInfo();
    const searchTrackResults = async () => {
      const response = await axios
        .get(`https://api.spotify.com/v1/artists?ids=${searchResultsId[2]}`, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((response) => response.data);
      //   console.log(response);
      dispatch({ type: "SEARCH_ARTISTS", artistsResults: [response] });
    };
    searchTrackResults();
  }, [searchResults, TopTracks]);
  const ArtistsHandler = async (id) => {
    console.log(id, "ID");
    const getArtistInfo = async (id) => {
      const response = await axios
        .get(`https://api.spotify.com/v1/artists/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((response) => response.data);
      console.log(response);
      dispatch({ type: "GET_ARTIST", ArtistInfo: [response] });
    };
    getArtistInfo(id);
    const response = await axios
      .get(`https://api.spotify.com/v1/artists/${id}/albums`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data);
    const Artistdispatch = {
      href: response.href,
      items: response.items,
      limit: response.limit,
      next: response.next,
      offset: response.offset,
      previous: response.previous,
      total: response.total,
    };
    dispatch({ type: "SET_ALBUM_SEARCH", setAlbumSearch: [Artistdispatch] });
    const TopTracks = async () => {
      console.log(id);
      const response = await axios
        .get(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=ES`, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((response) => response.data);
      console.log(response);

      dispatch({ type: "SET_ARTISTS_TOP_TRACKS", TopTracks: [response] });
    };
    await TopTracks();
    navigate(`/search/${id}`);
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
        {artistsResults?.map((el) =>
          el.artists?.map(
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
                    onClick={() => ArtistsHandler(id)}
                  >
                    <div className="col detail">
                      <div className="card">
                        <div className="image">
                          <img src={images[0]?.url} alt="track" />
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
    </Container>
  );
}
const Container = styled.div`
  max-height:90vh;
box-sizing: border-box;
max-width:90vw;
.buttons{
display:inline-flex;
flex-direction: row;
gap:1rem;
margin-left:1rem;
color:white;
justify-content:start;
.button{
    align-self:flex-start;
    background-color:hsla(0,0%,100%,0.09);
box-sizing: border-box;
    font-family: var(--font-family,spotify-circular),Helvetica,Arial,sans-serif;
    -webkit-tap-highlight-color: transparent;
    border-radius: 32px;
    color: var(--text-base,#99999);
    transition: background-color 0.2s ease 0s, color 0.2s ease 0s;
    min-inline-size: 0px;
    padding-block: 8px;
    padding-inline: 12px;
    text-decoration:none;
    decoration: none;
    user-select: none;
    &:hover{
        background-color:hsla(0,0%,100%,0.2);

    }

}

}
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
                justify-content: flex-start;
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

export default SearchArtists;
