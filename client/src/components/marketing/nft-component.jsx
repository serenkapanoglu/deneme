import styled from "styled-components";
import nftlogo from './img/nftmarketplace.png';
import nfttext from './img/marketplacetext.png';
import nftsample1 from './img/nftsample1.png';
import nftsample2 from './img/nftsample2.png';
import nftsample3 from './img/nftsample3.png';
import nftsample4 from './img/nftsample4.png';
import { textBox } from './textBox-component';


export const BoxContainerA = styled.div`
    width: 1200px;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    border-radius: 19px;
    box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
    position: relative;
    overflow: hidden;
    z-index: 1;
`;

export const BoxContainerC = styled.div`
    width: 1200px;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    border-radius: 19px;
    box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
    position: relative;
    overflow: hidden;
    z-index: 1;
`;

const WelcomeContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: auto;
    margin-bottom: 50px;
    z-index: 10;
`;
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: auto;
    margin-bottom: 50px;
    z-index: 10;
`;

const NftContainer = styled.div`
    width: 100%;
    height: 40%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: auto;
    margin-bottom: 50px;
    z-index: 10;
`;

const Nftitem = styled.div`
    width: 100%;
    display: flex;
    margin-top: auto;
    margin-left: 25px;
    z-index: 1;
`;

const BtnContainer = styled.div`
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

export const FormContainer = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    `;

export function NftMarketplace() {

        return(
            <AppContainer>
                <BoxContainerA>
                    <WelcomeContainer>
                    <textBox />
                    <div>
                        <img alt="nftlogo" src={nftlogo} />
                    </div>
                    </WelcomeContainer>
                    <TextContainer>
                    <div>
                        <img alt="nfttext" src={nfttext} />
                    </div>
                    </TextContainer>
                    <NftContainer>
                    <Nftitem>
                    <div>
                        <img alt="nftsample1" src={nftsample1} />
                        </div>
                    </Nftitem>
                    <Nftitem>
                        <div>
                        <img alt="nftsample2" src={nftsample2} />
                    </div>
                    </Nftitem>
                    <Nftitem>
                        <div>
                        <img alt="nftsample3" src={nftsample3} />
                    </div>
                    </Nftitem>
                    <Nftitem>
                        <div>
                        <img alt="nftsample4" src={nftsample4} />
                    </div>
                    </Nftitem>
                    </NftContainer>
                </BoxContainerA>
            </AppContainer>
        )

    }