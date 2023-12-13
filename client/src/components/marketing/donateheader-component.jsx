import React from 'react';
import styled from "styled-components";
import donatelogo from './img/donatelogo.png';



export const BoxContainerA = styled.div`
    width: 600px;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
    position: relative;
    margin-top: 10 px;
    overflow: hidden;
    z-index: 1;
    padding-top: 250px;
`;
export const BoxContainerB = styled.div`
    width: 1500px;
    min-height: 300px;
    border-radius: 19px;
    box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
    position: relative;
    overflow: hidden;
    z-index: 1;
`;
const MenuContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: right;
    justify-content: right;
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

export const FormContainer = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    `;
 
export function DonateHeader() {

        return(
            <div>
                
            <AppContainer>
                <BoxContainerA>
                <img alt="donate" src={donatelogo} />
                </BoxContainerA>
                
            </AppContainer>
     


            </div>
        )

    }