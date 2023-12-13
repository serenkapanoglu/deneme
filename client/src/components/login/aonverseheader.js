import styled from "styled-components";
import logo from "~/assets/aonversLogo.png";

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  z-index: 50;
`;

export const UniversHeader = () => {
  return (
    <HeaderContainer>
      <img style={{ width: "95%", marginLeft: 20 }} alt="logo" src={logo} />
    </HeaderContainer>
  );
};
