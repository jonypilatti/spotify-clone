import React from "react";
import styled from "styled-components";

function SearchFilters({ setFilter, filter }) {
  // console.log(filter);

  return (
    <Container>
      <div className="buttons">
        <div
          className="button"
          role="checkbox"
          aria-checked="false"
          id="all"
          onClick={() => setFilter("all")}
        >
          All
        </div>
        <div
          className="button"
          role="checkbox"
          aria-checked="false"
          tabindex="-1"
          id="track"
          onClick={() => setFilter("track")}
        >
          Track
        </div>
        <div
          className="button"
          role="checkbox"
          tabindex="-1"
          aria-checked="false"
          id="artist"
          onClick={() => setFilter("artist")}
        >
          Artists
        </div>
        <div
          className="button"
          role="checkbox"
          aria-checked="false"
          tabindex="-1"
          id="album"
          onClick={() => setFilter("album")}
        >
          Album
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
  .buttons {
    display: inline-flex;
    flex-direction: row;
    gap: 1rem;
    margin-left: 1rem;
    color: white;
    justify-content: start;
    .button {
      background-color: hsla(0, 0%, 100%, 0.1);
      align-self: flex-start;
      box-sizing: border-box;
      font-family: var(--font-family, spotify-circular), Helvetica, Arial,
        sans-serif;
      -webkit-tap-highlight-color: transparent;
      border-radius: 32px;
      color: var(--text-base, #99999);
      transition: background-color 0.2s ease 0s, color 0.2s ease 0s;
      min-inline-size: 0px;
      padding-block: 8px;
      padding-inline: 12px;
      text-decoration: none;
      decoration: none;
      user-select: none;
      &:hover {
        background-color: hsla(0, 0%, 100%, 0.3);
      }
    }
  }
`;

export default SearchFilters;
