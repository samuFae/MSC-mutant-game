import styled from "styled-components"

export const GlobalWrapper = styled.div`
    background-color: #2b2b2b;
    overflow: hidden;
    color: white:
`;

export const HeadingWrapper = styled.div`
    text-align: center;
    width: 100%;
    color: #16ab31;
    font-weight: bold;
    padding: 5rem 0;
    background-image: url("bannerBackground.png");
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-color: rgb(24,24,24);
    box-shadow: 0px 40px 50px rgb(24 24 24);
    width: 150%;
    position: relative;
    right: 25%;
`;
export const Title = styled.h1`
    font-size: 80px;
    padding-bottom: 1.5rem;
    margin: 0;
    text-shadow: 3px 3px 10px black;
`;
export const Subtitle = styled.h3`
    font-size: 30px;
    padding: 0;
    margin: 0;
    text-shadow: 2px 2px 5px #a3a305;
    position: relative;
    top: 55px;
`;

export const StartButton = styled.div`
    position: relative;
    top:0;
    left:0;
    width: fit-content;
    background-color: #7a0000;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    font-weight: 900;
    border-radius: 150px;
    box-shadow: 5px 10px 50px #888888;
    cursor: pointer;
    transform: scale(1);
    transition: all 0.2s ease-in-out, left 0.5s ease-in-out;
    padding: 3rem 5rem;
    display: flex;
    flex-direction: column;
    :hover {
        background-color: #067a00;
        transform: scale(1.3);
    }

    &.disabled {
        pointer-events: none;
        background-color: grey;
    }
`;

export const ButtonWrapper = styled.div`
    padding: 2rem 0;
    margin-top: 3rem;
`;

export const ModeSwitcherWrapper = styled.div`
    width: 100%;
    padding: 2rem;
    text-align: center;
    display: flex;
    position: relative;
    left: -4000px;
    transition: all 0.5s ease-in-out;
`;

export const ToMutant = styled.div`
    color: #faaf46;
    font-size: 20px;
    font-weight: bold;
    background-color: #b80000;
    padding: 1rem 3rem;
    border-radius: 40px;
    box-shadow: 5px 5px 20px black;
    width: fit-content;
    margin: auto;
    cursor: pointer;

    &.disabled {
        pointer-events: none;
        background-color: grey;
    }
`;

export const ToSpeed = styled.div`
    color: #faaf46;
    font-size: 20px;
    font-weight: bold;
    background-color: #b80000;
    padding: 1rem 3rem;
    border-radius: 40px;
    box-shadow: 5px 5px 20px black;
    width: fit-content;
    margin: auto;
    cursor: pointer;

    &.disabled {
        pointer-events: none;
        background-color: grey;
    }
`;