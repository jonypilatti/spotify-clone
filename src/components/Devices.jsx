import axios from "axios";
import React, { useState } from "react";
import { useDataLayerValue } from "../DataLayer";
import DevicesIcon from "@mui/icons-material/Devices";
import styled from "styled-components";
import DevicesHandler from "./DevicesHandler";

function Devices({ isOpen, setIsOpen }) {
  const [{ token, availableDevices }, dispatch] = useDataLayerValue();
  const handleDevices = async () => {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/devices",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    const item = response.data;
    const availableDevices = item.devices?.map((item) => ({
      id: item.id,
      is_active: item.is_active,
      is_private_session: item.is_private_session,
      is_restricted: item.is_restricted,
      name: item.name,
      type: item.type,
      volume_percent: item.volume_percent,
    }));
    // console.log(availableDevices);
    dispatch({ type: "GET_DEVICES", availableDevices });
    isOpen == true ? setIsOpen(false) : setIsOpen(true);
  };

  return (
    <Container>
      <DevicesIcon onClick={() => handleDevices()} />
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  color: white;
  svg {
    background-size: 1px;
  }
`;

export default Devices;
