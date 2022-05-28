import React, { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import SearchTrack from "./SearchTrack";
import SearchBody from "./SearchBody";
import SearchAlbums from "./SearchAlbums";
import SearchArtists from "./SearchArtists";
import SearchFilters from "./SearchFilters";

function Search() {
  const [check, setCheck] = useState(true);
  const [filter, setFilter] = useState("all");
  const [boton1, setBoton1] = useState(true);
  const [boton2, setBoton2] = useState(false);
  const [boton3, setBoton3] = useState(false);
  const [boton4, setBoton4] = useState(false);
  const bodyRef = useRef();
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
  };
  useEffect(() => {
    console.log(filter);
  }, [filter]);

  return (
    <Container>
      <div className="player__body">
        <Sidebar />
        <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
          <div className="body__avatar">
            <Avatar setFilter={setFilter} navBackground={navBackground} />
          </div>
          <SearchFilters
            ref={bodyRef}
            setFilter={setFilter}
            setCheck={setCheck}
            check={check}
            boton1={boton1}
            boton2={boton2}
            boton3={boton3}
            boton4={boton4}
            setBoton1={setBoton1}
            setBoton2={setBoton2}
            setBoton3={setBoton3}
            setBoton4={setBoton4}
          ></SearchFilters>
          <div className="body__contents">
            {filter === "all" ? (
              <SearchBody filter={filter} setFilter={setFilter} />
            ) : filter === "track" ? (
              <SearchTrack filter={filter} setFilter={setFilter} />
            ) : filter == "artist" ? (
              <SearchArtists filter={filter} setFilter={setFilter} />
            ) : (
              filter === "album" && (
                <SearchAlbums filter={filter} setFilter={setFilter} />
              )
            )}
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
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgb(32, 87, 100);
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
export default Search;
