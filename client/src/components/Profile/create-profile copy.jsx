import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import adult from "~/assets/adult.png";
import travel from "~/assets/travel.png";
import film from "~/assets/film.png";
import photography from "~/assets/photography.png";
import scifi from "~/assets/scifi.png";
import anime from "~/assets/anime.png";
import art from "~/assets/art.png";
import memes from "~/assets/memes.png";
import videogames from "~/assets/video games.png";
import comics from "~/assets/comics.png";
import { UserContext } from "~/contexts/user.context";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 10;
  color: white;
  margin-top: 20px;
`;
const BodyContainer = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-evenly;
  align-items: center;
  margin: auto;
`;
const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 10;
  color: white;
  margin-top: 75px;
`;
const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 10;
  color: white;
  margin-top: 30px;
  column-gap: 40px;
`;
const BoxContainerA = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
  z-index: 1;
`;

const myStyle = {
  backgroundImage: "url(/img/univers.png)",
  height: "100vh",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  width: "100%",
};

export const CreateProfile = () => {
  const [checked, setChecked] = useState(false);
  const [style, setStyle] = useState("cont");
  const { currentUser } = useContext(UserContext);

  const changeStyle = () => {
    console.log("you just clicked");

    setStyle("cont2");
  };

  const handleChange = () => {
    setChecked(!checked);
    console.log(checked);
  };

  return (
    <div style={myStyle}>
      <AppContainer>
        <BoxContainerA>
          <HeaderContainer>
            <p>WHAT ARE YOUR INTERESTS? PICK YOUR POISON.</p>
          </HeaderContainer>
          <BodyContainer>
            <div className={style}>
              <Link onClick={changeStyle}>
                <img
                  style={{ height: 110, width: "auto", display: "flex" }}
                  alt="adult"
                  src={adult}
                />
                <label
                  style={{
                    color: "white",
                    paddingLeft: 35,
                    display: "flex",
                    paddingTop: 5,
                  }}
                >
                  Adult
                </label>
              </Link>
              <Link onClick={changeStyle}>
                <img
                  style={{
                    paddingLeft: 120,
                    marginTop: -149,
                    height: 110,
                    width: "auto",
                    display: "flex",
                  }}
                  alt="film"
                  src={film}
                />
                <label
                  style={{
                    color: "white",
                    display: "flex",
                    paddingLeft: 175,
                    paddingTop: 5,
                  }}
                >
                  Film
                </label>
              </Link>
              <Link onClick={changeStyle}>
                <img
                  style={{
                    paddingLeft: 270,
                    marginTop: -172,
                    height: 160,
                    width: "auto",
                    paddingBottom: 10,
                    display: "flex",
                  }}
                  alt="photography"
                  src={photography}
                />
                <label
                  style={{
                    color: "white",
                    paddingLeft: 283,
                    marginTop: -20,
                    display: "flex",
                  }}
                >
                  Photography
                </label>
              </Link>
              <Link onClick={changeStyle}>
                <img
                  style={{ paddingLeft: 10 }}
                  alt="videogames"
                  src={videogames}
                />
                <label style={{ color: "white", paddingLeft: 10 }}>
                  Video Games
                </label>
              </Link>
              <Link onClick={changeStyle}>
                <img style={{ paddingLeft: 10 }} alt="anime" src={anime} />
                <label style={{ color: "white", paddingLeft: 10 }}>Anime</label>
              </Link>
              <Link onClick={changeStyle}>
                <img alt="memes" src={memes} />
                <label style={{ color: "white" }}>Memes</label>
              </Link>
              <Link onClick={changeStyle}>
                <img alt="travel" src={travel} />
                <label style={{ color: "white" }}>Travel</label>
              </Link>
              <Link onClick={changeStyle}>
                <img alt="art" src={art} />
                <label style={{ color: "white" }}>Art</label>
              </Link>
              <Link onClick={changeStyle}>
                <img alt="scifi" src={scifi} />
                <label style={{ color: "white" }}>Scifi</label>
              </Link>
              <Link onClick={changeStyle}>
                <img alt="comics" src={comics} />
                <label style={{ color: "white" }}>Comics</label>
              </Link>
            </div>
          </BodyContainer>
          <BottomContainer>
            <input type="checkbox" checked={checked} onChange={handleChange} />I
            WOULD NOT LIKE FOR NSFW CONTENT TO BE INCLUDED IN MY FEED.
          </BottomContainer>
          <BtnContainer>
            <Link
              type="button"
              to="/signup"
              className="btn btn-outline-light btn-lg"
            >
              Back
            </Link>
            <Link
              type="button"
              to={`/userprofile/${currentUser?.uid}`}
              className="btn btn-outline-light btn-lg"
            >
              Continue
            </Link>
          </BtnContainer>
        </BoxContainerA>
      </AppContainer>
    </div>
  );
};
