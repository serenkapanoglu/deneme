import { BoxContainer, FormContainer, Input } from "./common";
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { UniversHeader } from './aonverseheader';
import styled from 'styled-components';

const myStyle={
    backgroundImage: "url(/img/aonversLogo.png)",
    height:'100vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%'
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
    email:'',
}

export const ForgotPass = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email } = formFields;

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        navigate('/updatePass');
    };

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value })
    };

    return (
        <div style={myStyle}>
            <AppContainer>
                <BoxContainerA>
                    <BtnContainer>
                    <BoxContainer>
                    <UniversHeader />
                        <FormContainer onSubmit={handleSubmit}>
                            <Input 
                                type="email"
                                value={email}
                                name="email"
                                onChange={handleChange}
                                className="btn btn-outline-light"
                                placeholder="Email"
                                />
                            <Link style={{ margin: 20 }} className="btn btn-outline-light" type="submit" to='/updatePass'>SEND RECOVERY EMAIL</Link>
                        </FormContainer>
                    </BoxContainer>
                    </BtnContainer>
                </BoxContainerA>
            </AppContainer>
        </div>
    );
};