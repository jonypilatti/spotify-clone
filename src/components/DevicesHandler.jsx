import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDataLayerValue } from "../DataLayer";
import DevicesImg from "../image/connect_header@1x.8f827808.png";
import ComputerIcon from "@mui/icons-material/Computer";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { FiSmartphone } from "react-icons/fi";
import { IosShare } from "@mui/icons-material";

function DevicesHandler(e, id) {
  const [
    { token, availableDevices, currentlyPlaying, playbackState },
    dispatch,
  ] = useDataLayerValue();
  const [selectedId, setSelectedId] = useState(availableDevices[0]?.id);
  const setDevice = async (id) => {
    await axios.put(
      "https://api.spotify.com/v1/me/player",
      { device_ids: [id], play: false },
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
  };
  useEffect(() => {}, [selectedId]);
  function colorSelected(id) {
    setSelectedId(id);
    var z = document.getElementsByClassName("device__info");
    let arrayNumbers = [];
    for (var i = 0; i < z.length; i++) {
      arrayNumbers.push(z.item(i).id);
    }
    arrayNumbers.map((el) =>
      el !== selectedId
        ? (document.getElementById(el).style.color = "white")
        : (document.getElementById(el).style.color = "green")
    );
  }

  return (
    <Container>
      <div className="icons">
        <div className="headerLine">
          <h3 className="header">Connect to a device</h3>
          <a
            href="https://www.spotify.com/connect/?utm_source=wp-picker&utm_medium=web"
            className="helpIcon"
          >
            <HelpOutlineIcon style={{ fontSize: "large" }} />
          </a>
        </div>
        <div classname="connectHeader">
          <img src={DevicesImg} alt="devices"></img>
        </div>
        <div className="devices">
          {availableDevices?.map((device) => (
            <tr key={device.id}>
              <td
                onClick={(e) => {
                  setDevice(e, device.id);
                }}
              >
                <button
                  onClick={() => colorSelected(device.id)}
                  className="device__info"
                  id={device.id}
                  style={{ width: "100" }}
                >
                  <p className="device__icon">
                    {device?.type == "Computer" ? (
                      <ComputerIcon style={{ fontSize: "28px" }} />
                    ) : (
                      device?.type == "Smartphone" && (
                        <FiSmartphone style={{ fontSize: "28px" }} />
                      )
                    )}
                  </p>
                  <p className="device__name">
                    {device?.name}
                    <p>
                      {playbackState == true ? (
                        <p className="device__status">
                          <VolumeUpIcon />
                          Este navegador web
                        </p>
                      ) : (
                        <p className="device__status">
                          <VolumeUpIcon />
                          Spotify connect
                        </p>
                      )}
                    </p>
                  </p>
                </button>
              </td>
            </tr>
          ))}
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: fixed;
  bottom: 5rem;
  right: 7.5rem;
  max-height: calc(100vh - 114px);
  color: white;
  font-size: 12px;
  padding: 5px;
  z-index: 25;
  width: 18rem;
  background-color: #181818;
  border: 0;
  box-shadow: 0 16px 24px rgb(0 0 0 / 30%), 0 6px 8px rgb(0 0 0 / 20%);
  .headerLine {
    display: flex;
    flex-direction: row;
    border: 0;
    .header {
      display: block;
      align-items: center;
      justify-content: center;
      align-self: center;
      text-align: center;
      font-size: 23px;
      font-weight: 700;
      padding: 14px 35px 10px 14px;
    }
    .helpIcon {
      right: 0.5rem;
      top: 1.3rem;
      position: absolute;
      color: white;
    }
  }
  .connectHeader {
    text-align: center;
  }
  img {
    width: 100%;
    padding: 2rem;
    color: transparent;
    background-color: transparent;
  }
  .device__info {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    touch-action: manipulation;
    align-items: center;
    text-align: left;
    padding: 10px 15 px;
    border: 0;
    color: white;
    position: relative;
    background-color: transparent;
    height: 3.5rem;
    width: 17.5rem;
    tr {
      width: 100%;
      position: relative;
    }
    &:hover {
      background-color: #282828;
    } 
    }
    a {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      touch-action: manipulation;
      position: relative;
      gap: 1rem;
      text-align: left;
      padding: 0.6rem;
      text-decoration: none;
      selected:none;
      user-select: none;
      &:visited{
        color:white;
        text-decoration:none;
      }
    }
    p {
      display: flex;
      flex-direction: column;
      vertical-align: middle;
      .device__status {
        flex-direction: row;
        font-size: 11px;
        gap: 0.1rem;
        align-items: center;
        svg {
          font-size: 10px;
        }
      }
    }
  }
`;

export default DevicesHandler;
