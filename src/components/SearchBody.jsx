import axios from "axios";
import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDataLayerValue } from "../DataLayer";

function SearchBody({ filter, setFilter }) {
  const [{token,searchTopArtists,searchTopTracks,Categories},dispatch]=useDataLayerValue()
  const navigate=useNavigate()
  useEffect(()=>{
    const GetTopTracks=async ()=>{
        const response=await axios('https://api.spotify.com/v1/me/top/tracks',{
            headers:{
              Authorization: 'Bearer ' + token,
                'content-type': 'application/json',
            }
        }).then(response=>response.data.items).then(response=>dispatch({type:'SEARCH_TOP_TRACKS',searchTopTracks:response}))
        return response;
    }
const GetTopArtists=async ()=>{
  const response=await axios('https://api.spotify.com/v1/me/top/artists',{
      headers:{
        Authorization: 'Bearer ' + token,
          'content-type': 'application/json',
      }
  }).then(response=>response.data.items).then(response=>dispatch({type:'SEARCH_TOP_ARTISTS',searchTopArtists:response}))
  return response
}

const BrowseCategories= async()=>{
const response=await axios('https://api.spotify.com/v1/browse/categories',{
  headers:{
    Authorization: 'Bearer ' + token,
    'Content-Type': 'application/json',
  }
}).then(response=>response.data.categories.items).then(response=>dispatch({type:'SEARCH_CATEGORIES',Categories:response}))
return response
}
GetTopTracks()
GetTopArtists()
BrowseCategories()
},[])
const Top5TopTracks= searchTopTracks?.slice(0,5)
const Top5TopArtists=searchTopArtists?.slice(0,5)
// console.log(Top5TopArtists)
// console.log(searchTopTracks,"toptracks")
// console.log(searchTopArtists,"topartists")
// console.log(Categories)


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

console.log(Top5TopArtists)
  return (
  <Container>
  <h3 className="TopTracksHeader">Géneros Recomendados</h3>
  <div className="Recommended">
    {Categories?.map(el=>
      <div className="carrousel__component__recommended">
      <div className="info__position__recommended">
        <p className="infoRecommended">{el.name}</p>
      </div>
        <img className="image" src={el.icons[0].url} alt="IconGenre"/>
    </div>)}
  </div>
  <div className="sectionContainer">
  <h3 className="TopTracksHeader">Canciones Recomendadas</h3>
  <div className="carrousel">
  {Top5TopTracks?.map(el=>
  <div className="carrousel__component" onClick={()=>playTrack(el.id,el.name,el.artists[0].id,el.image,el.album.uri,el.track_number)}>
  <div className="info__position">
      <p className="info">{el.name}</p>
      <p className="info">{el.artists[0].name}</p>
      </div>
      {/* <p className="info">{el.uri}</p> */}
      {/* <p className="info">{el.id}</p> */}
      {/* <p className="info">{el.href}</p> */}
      {/* <p className="info">{el.artists[0].id}</p>
      <p className="info">{el.artists[0].uri}</p> */}
      <img className="image" src={el.album.images[1]?.url} alt="AlbumImage"/>
      </div>
        )}
        </div>
        </div>
        <div className="sectionContainer">
        <h3 className="TopTracksHeader">Artistas Recomendados</h3>
        <div className="carrousel">
  {Top5TopArtists?.map(el=>
    <div className="carrousel__component"   onClick={()=>ArtistsHandler(el.id)}>
  <div className="info__position">
      <p className="info">{el.name}</p>
      <p className="infoFollowers">Followers:{Intl.NumberFormat('EN-US',Number(el.followers?.total)).format(el.followers?.total)}</p>
      </div>
      {/* <p className="info">{el.uri}</p> */}
      {/* <p className="info">{el.id}</p> */}
      {/* <p className="info">{el.href}</p> */}
      {/* <p className="info">{el.artists[0].id}</p>
      <p className="info">{el.artists[0].uri}</p> */}
      <img className="image" src={el.images[1]?.url} alt="ImageTrack"/>
      </div>)}
      </div>
      </div>
  </Container>)
}
const Container = styled.div`
margin:1rem;
  overflow:hidden;
  .sectionContainer{
    gap:3rem;
  }
  .Recommended{
  display:grid;
  grid-template-columns:repeat(5,minmax(0,1fr));
  position: relative;
  width:100%;
  gap:0.5rem;
  margin:0.5rem;
  cursor:pointer;
  }
.carrousel{
  display:grid;
  grid-template-columns:repeat(5,minmax(0,1fr));
  position: relative;
  width:100%;
  margin:0.5rem;
  }
  .TopTracksHeader{
color:#fff;
margin:0.5rem;
overflow-wrap: break-word;
letter-spacing: -.04em;
font-weight:700;
line-height: 1.3em;
  }
  .carrousel__component__recommended{
    display:flex;
  flex-direction:column;
  justify-content:flex-end;
  align-items:center;
  align-text:center;
  width:13rem;
  height:13rem;
  position:relative;
  overflow:hidden;
    &:hover{
      opacity:1;
transition:0.2s ease-in;
    filter:brightness(1.35);
      overflow:hidden;
      underline:visible;
      .infoRecommended{
        color:#fff;
      display:flex;
      font-size:16px;
      overflow-wrap: break-word;
      letter-spacing: -.04em;
      font-weight:700;
      line-height: 1.3em;
      padding:10px;
      max-width: 14rem;
      overflow:hidden;
      }
      }
      .info__position__recommended{
    display:flex;
    flex-direction:column;
    max-width: 100%;
    transition:0.3s ease-in;
    position:absolute;
    overflow:hidden;
      }
  .infoRecommended{
        overflow:hidden;
        max-width: 100%;
    display:none;
  }
  .image{
    width:13rem;
    overflow:hidden;
  }
  }
.carrousel__component{
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  align-text:center;
  width:13rem;
  cursor:pointer;
  height:13rem;
  overflow:hidden;
    &:hover{
      opacity:1;
      overflow:hidden;
      underline:visible;
      transition:0.2s ease-in;
    filter:brightness(1.05);
      .info{
        color:#fff;
      display:flex;
      font-size:16px;
      overflow-wrap: break-word;
      letter-spacing: -.04em;
      font-weight:700;
      line-height: 1.3em;
      max-width: 14rem;
      overflow:hidden;
      }
      .infoRecommended{
        color:#fff;
      display:flex;
      font-size:16px;
      overflow-wrap: break-word;
      letter-spacing: -.04em;
      font-weight:700;
      line-height: 1.3em;
      padding:10px;
      max-width: 14rem;
      overflow:hidden;
      user-select:none;
      }
      .infoFollowers{
        display:flex;
        flex-direction: column;
        align-self:flex-end;
        vertical-align:flex-end;
      }
      }
      .info__position{
    display:flex;
    max-width: 100%;
    top:50;
    transition:0.3s ease-in;
    position:absolute;
    flex-direction:column;
    vertical-align:middle;
    align-text:center;
    overflow:hidden;
      }
      .info__position__recommended{
    display:flex;
    flex-direction:column;
    max-width: 100%;
    transition:0.3s ease-in;
    position:fixed;
    overflow:hidden;
    text-align:flex-end
      }
  .info{
        overflow:hidden;
        user-select:none;
        max-width: 100%;
    display:none;
  }
  .infoFollowers{
    color:#e0dede;
    display:none;
  }
  .infoRecommended{
        overflow:hidden;
        max-width: 100%;
    display:none;
  }
  .image{
    width:13rem;
    overflow:hidden;
  }
  }
`;
export default SearchBody;
