import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { useDataLayerValue } from "../DataLayer";
import axios from "axios";

function Searchbar() {
  const [{ token }, dispatch] = useDataLayerValue();
  const [input, setInput] = useState("");
  const searchItem = async (e) => {
    setInput(e.target.value);
    const artist = await axios
      .get(
        `https://api.spotify.com/v1/search?q=${input}&type=artist&include_external=audio`,
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => data.data);
    const album = await axios
      .get(
        `https://api.spotify.com/v1/search?q=${input}&type=album&include_external=audio`,
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => data.data);
    const track = await axios
      .get(
        `https://api.spotify.com/v1/search?q=${input}&type=track&include_external=audio`,
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => data.data);
    // console.log(track);
    // const playlists__id=
    // const playlist = await axios
    //   .get(`https://api.spotify.com/v1/playlists/${playlists__id}/tracks`, {
    //     headers: {
    //       Accept: "application/json",
    //       Authorization: "Bearer " + token,
    //       "Content-Type": "application/json",
    //     },
    //   })
    //   .then((data) => data.data);
    // console.log(playlist);
    // let tracksearchResult = {
    //   href: track.tracks.href,
    //   items: track.tracks.items,
    //   limit: track.tracks.limit,
    //   next: track.tracks.next,
    //   offset: track.tracks.offset,
    //   previous: track.tracks.previous,
    //   total: track.tracks.total,
    // };
    // // console.log(tracksearchResult);
    // // console.log(album);
    // let albumsearchResult = {
    //   href: album.albums.href,
    //   items: album.albums.items,
    //   limit: album.albums.limit,
    //   next: album.albums.next,
    //   offset: album.albums.offset,
    //   previous: album.albums.previous,
    //   total: album.albums.total,
    // };
    // // console.log(albumsearchResult);
    // let artistsearchResult = {
    //   href: artist.artists.href,
    //   items: artist.artists.items,
    //   limit: artist.artists.limit,
    //   next: artist.artists.next,
    //   offset: artist.artists.offset,
    //   previous: artist.artists.previous,
    //   total: artist.artists.total,
    // };
    // console.log(artistsearchResult);
    // let playlistsearchResult = {
    //   href: playlist.artists.href,
    //   items: playlist.artists.items,
    //   limit: playlist.artists.limit,
    //   next: playlist.artists.next,
    //   offset: playlist.artists.offset,
    //   previous: playlist.artists.previous,
    //   total: playlist.artists.total,
    // };
    let absoluteResults = [];
    absoluteResults.push(track, album, artist);
    // let searchResults = [];
    // searchResults.push(
    //   artistsearchResult,
    //   albumsearchResult,
    //   tracksearchResult
    //   // playlistsearchResult
    // );
    // console.log(absoluteResults);
    // console.log(playlistsearchResult);
    dispatch({ type: "SEARCH_RESULTS", searchResults: absoluteResults });
  };
  return (
    <Container>
      <div className="search__bar">
        <SearchIcon />
        <input
          type="text"
          value={input}
          placeholder="Artists, songs or podcast"
          onChange={(e) => searchItem(e)}
        />
      </div>
    </Container>
  );
}
const Container = styled.div`
  .search__bar {
    background-color: white;
    width: 100%;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    svg {
      transform: scale(1.4);
    }
    input {
      height: 1.65rem;
      border: none;
      width: 18.7rem;
      &:focus {
        outline: none;
      }
    }
  }
`;
export default Searchbar;
