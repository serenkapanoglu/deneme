import React from 'react';
import styled from "styled-components";
import timelinelogo from './img/timelinelogo.png';



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

const TextContainer = styled.div`
width: 100%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
margin-top: 150px;
margin-left: 25px;
z-index: 10;
`;

const TextContainer1 = styled.div`
width: 100%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
margin-top: 150px;
margin-left: 250px;
padding-right: 50%;
padding-left: 30%;
z-index: 10;
overflow: hidden;
text-overflow: ellipsis;
`;

const TextContainer2 = styled.div`
width: 100%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
margin-left: 250px;
padding-right: 50%;
padding-left: 30%;
z-index: 10;
overflow: hidden;
text-overflow: ellipsis;
`;

export const FormContainer = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    `;
 
export function TimelineBody() {

        return(
            <div>
                
            <AppContainer>
                <div class="semicircle">
                <div>
                <TextContainer1>
                <div>
                <h1>STEP 1 : BUILDING</h1>    
                <br></br>
                <p>Curiously, the pursuance of project architecture instantaneously 
                differentiates the system concepts and The Innovation of Basic Rate 
                (Ezequiel Rendon in The Book of the Functional </p>       
                </div>
                </TextContainer1>       
                </div>    
                <div class="semicircle1">
                <div>
                <TextContainer1>
                <div>
                <h1>STEP 2 : ALPHA</h1>    
                <br></br>
                <p>Curiously, the pursuance of project architecture instantaneously 
                differentiates the system concepts and The Innovation of Basic Rate 
                (Ezequiel Rendon in The Book of the Functional </p>       
                </div>
                </TextContainer1>       
                </div>    
                <div class="semicircle2">
                <div>
                <TextContainer1>
                <div>
                <h1>STEP 3 : BETA</h1>    
                <br></br>
                <p>Curiously, the pursuance of project architecture instantaneously 
                differentiates the system concepts and The Innovation of Basic Rate 
                (Ezequiel Rendon in The Book of the Functional </p>       
                </div>
                </TextContainer1>       
                </div>
                <div class="semicircle3">
                <div class="semicircle4">
                <TextContainer>
                <div>
                <h1>STEP 4 : LAUNCH</h1>    
                <br></br>
                <p>Curiously, the pursuance of project architecture instantaneously 
                differentiates the system concepts and The Innovation of Basic Rate 
                (Ezequiel Rendon in The Book of the Functional </p>       
                </div>
                </TextContainer>       
                </div>
                 
                </div>
                <div>
                <TextContainer2>
                <div>
                <h1>STEP 6 : ICO</h1>    
                <br></br>
                <p>Curiously, the pursuance of project architecture instantaneously 
                differentiates the system concepts and The Innovation of Basic Rate 
                (Ezequiel Rendon in The Book of the Functional </p>       
                </div>
                </TextContainer2>       
                </div>
                
                </div>
                <div>
                <TextContainer2>
                <div>
                <h1>STEP 5 : HARD LAUNCH</h1>    
                <br></br>
                <p>Curiously, the pursuance of project architecture instantaneously 
                differentiates the system concepts and The Innovation of Basic Rate 
                (Ezequiel Rendon in The Book of the Functional </p>       
                </div>
                </TextContainer2>       
                </div>
                
                </div>
                <div>
                <TextContainer2>
                <div>
                <h1>STEP 4 : KICKSTARTER</h1>    
                <br></br>
                <p>Curiously, the pursuance of project architecture instantaneously 
                differentiates the system concepts and The Innovation of Basic Rate 
                (Ezequiel Rendon in The Book of the Functional </p>       
                </div>
                </TextContainer2>       
                </div>
                </div>
                


                

                
            </AppContainer>
     


            </div>
        )

    }