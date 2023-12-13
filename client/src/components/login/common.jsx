import styled from "styled-components";

export const BoxContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    z-index: 30;
`;

export const FormContainer = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    justify-content: center;
    align-items: center;
    `;

export const MutedLink = styled.a`
    font-size: 12px;
    color: rgba(200, 200, 200, 0.8);
    font-weight: 500;
    text-decoration: none;
    margin-top: 5px;
    align-items: center;
    `;

export const Question= styled.div`
    font-size: 12px;
    color: rgba(200, 200, 200, 0.8);
    font-weight: 500;
    text-decoration: none;
    margin-top: 5px;
    display: flex;
    width: 100%;
    justify-content: center;
    `;

export const BoldLink = styled.a`
    font-size: 12px;
    color: white;
    font-weight: 500;
    text-decoration: none;
    margin-left: 5px;
    display: flex;
    width: 100%;
    justify-content: center;
    `;

export const Input = styled.input`
    width: 100%;
    height: 42px;
    outline: none;
    border: 1px solid rgba(200, 200, 200, 0.0.3);
    padding: 0px 10px;
    border-bottom: 1px solid;

    &::placehodler {
        color: rgba(200, 200, 200, 1);
    }

    &:not(:last-of-type) {
        border-bottom: 1px solid rgba(200, 200, 200, 0.4);
    }

    &:focus {
        outline:none;
        border-bottom: 1.3px solid rgb(0,0,0);
    }
    `;

   export const SubmitButton = styled.button`
    width: 100%;
    padding: 11px 40%;
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    margin-top: 20px;
    border: none;
    border-radius: 100px 100px 100px 100px;
    cursor: pointer;
    transition: all, 240ms ease-in-out;
    background: rgb(0,0,0);
    background: linear-gradient(
        90deg, rgba(0,0,0,0.9724264705882353) 0%, rgba(88,88,88,1) 0%, rgba(18,18,18,1) 0%);

    &:hover {
        filter: brightness(1.50);
    }
    `;