import styled from "styled-components";
import React, { useState } from "react";

function SidebarOption({ option, Icon }) {
  return (
    <Container>
      {Icon && <Icon></Icon>}
      {Icon ? <h4>{option}</h4> : <p>{option}</p>}
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 1.2rem;
  font-size: 19px;
  font-weight: 600;
`;

export default SidebarOption;
