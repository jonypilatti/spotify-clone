import React from "react";
import { loginURL } from "../spotify";
import styled from "styled-components";

function Login() {
  const handleClick = () => {
    window.location.href = loginURL;
  };
  return (
    <Container>
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
        alt="spotify logo"
      />
      <button onClick={handleClick}>LOG IN WITH SPOTIFY</button>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #1db954;
  gap: 5rem;
  img {
    height: 20vh;
  }
  button {
    padding: 1rem 5rem;
    border-radius: 5rem;
    border: none;
    background-color: black;
    color: #49f585;
    font-size: 1.4rem;
    cursor: pointer;
  }
  button:hover {
    transition: 0.2s ease-in-out;
    transform: scale(1.1);
  }
`;

export default Login;
