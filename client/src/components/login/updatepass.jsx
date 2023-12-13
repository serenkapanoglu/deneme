import { BoxContainer, FormContainer, Input } from "./common";
import { useNavigate, Link } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "~/contexts/user.context";
import styled from "styled-components";
import { UniversHeader } from "./aonverseheader";

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 10;
  color: white;
  margin-top: 30px;
  margin-bottom: 45px;
`;

const myStyle = {
  backgroundImage: "url(/img/aonversLogo.png)",
  height: "100vh",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  width: "100%",
};

export const BoxContainerA = styled.div`
  width: 600px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
  z-index: 1;
`;
export const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  padding-bottom: 150px;
  column-gap: 40px;
  z-index: 10;
`;
const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const defaultFormFields = {
  password: "",
  confirmPassword: "",
};

export const UpdatePass = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { password, confirmPassword } = formFields;

  const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }
    resetFormFields();

    navigate("/userprofile");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div style={myStyle}>
      <AppContainer>
        <BoxContainerA>
          <BtnContainer>
            <BoxContainer>
              <UniversHeader />
              <FormContainer onSubmit={handleSubmit}>
                <HeaderContainer>
                  <h3>TIME TO CHANGE YOUR PASSWORD?</h3>
                </HeaderContainer>
                <Input
                  type="password"
                  className="btn btn-outline-light"
                  placeholder="Password"
                  required
                  onChange={handleChange}
                  name="password"
                  value={password}
                />
                <Input
                  type="password"
                  className="btn btn-outline-light"
                  placeholder="Confirm Password"
                  required
                  onChange={handleChange}
                  name="confirmPassword"
                  value={confirmPassword}
                />
                <Link
                  style={{ margin: 20 }}
                  className="btn btn-outline-light"
                  type="submit"
                  to="/userprofile"
                >
                  UPDATE PASSWORD
                </Link>
              </FormContainer>
            </BoxContainer>
          </BtnContainer>
        </BoxContainerA>
      </AppContainer>
    </div>
  );
};
