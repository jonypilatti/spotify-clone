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

function DevicesHandler() {
  const [{ token, availableDevices, playerState, playbackState }, dispatch] =
    useDataLayerValue();
  const [selectedId, setSelectedId] = useState(availableDevices[0]?.id);
  useEffect(() => {
    axios.put(
      "https://api.spotify.com/v1/me/player",
      { device_ids: [selectedId], play: false },
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("me ejecuto");
    let arrayNumbers = [];
    for (
      var i = 0;
      i < document.getElementsByClassName("device__info")?.length;
      i++
    ) {
      arrayNumbers.push(
        document.getElementsByClassName("device__info")?.item(i)?.id
      );
    }
    arrayNumbers.map((el) =>
      el !== selectedId
        ? (document.getElementById(el).style.color = "white")
        : (document.getElementById(el).style.color = "#1db954")
    );

    dispatch({ type: "SET_PLAYER_STATE", playerState: false });
  }, [selectedId]);

  console.log(selectedId);
  console.log(availableDevices);
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
        <div className="connectHeader">
          <img src={DevicesImg} alt="devices"></img>
        </div>
        <div className="devices">
          {availableDevices?.map((device) => (
            <tr key={device.id}>
              <td>
                <button
                  onClick={() => setSelectedId(device.id)}
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
                    {device.id == selectedId
                      ? "Escuchando en"
                      : !device.name.includes("Web Player") &&
                        device.type == "Computer"
                      ? "Este ordenador"
                      : device.name}
                    <div>
                      {device.id ===
                        availableDevices.find((el) => el.id == selectedId).id &&
                      device.type == "Computer" &&
                      !device.name.includes("Web Player") ? (
                        <p className="device__status">
                          <VolumeUpIcon />
                          Este ordenador
                        </p>
                      ) : selectedId !== device.id ? (
                        <p className="device__status">
                          <VolumeUpIcon />
                          Spotify Connect
                        </p>
                      ) : (
                        selectedId == device.id && (
                          <p className="device__status">
                            <VolumeUpIcon />
                            {device.name}
                          </p>
                        )
                      )}
                    </div>
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
    gap:1rem;
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
        gap: 0.2rem;
        align-items: center;
        svg {
          font-size: 10px;
        }
      }
    }
  }
`;

export default DevicesHandler;
