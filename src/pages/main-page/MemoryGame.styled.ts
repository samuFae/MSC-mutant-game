import styled from "styled-components"

export const GameWrapper = styled.div`
    position: absolute;
    left: -4000px;
    height: 600px;
    top: 0;
    transition: all 0.5s ease-in-out;
    display: flex;
    width: 100vw;
    justify-content: space-between;
    margin-top: 10rem;

    :after{
        content: "";
        visibility: hidden;
        width: 150vw;
        height: 20000vh;
        top: -100vh;
        position: absolute;
        background-color: rgb(255, 48, 48);
        opacity: 60%;
        z-index: 99999;
        transition: opacity 1s ease-in-out;
    }

    :before{
        content: "";
        visibility: hidden;
        width: 150vw;
        height: 20000vh;
        top: -100vh;
        position: absolute;
        background-color: #00ff26;
        opacity: 0%;
        z-index: 0;
        transition: opacity 1s ease-in-out;
        animation: 1s mutantPulse infinite alternate;
    }

    &.error {
        :after{
            visibility: visible;
            opacity: 0%;
        }
    }

    &.mutant {
        :before{
            visibility: visible;
        }
    }

    @keyframes mutantPulse {
        from {
            opacity: 10%;
        }

        to {
            opacity: 40%;
        }
    }
`;

export const SignalBox = styled.div`
    width: 600px;
    transform: scale(0.7);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 20px;
    background-color: #e3e3e3;
    font-size: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    :after {
        content: "";
        background-image: url("red-arrow.png");
        width: 400px;
        height: 400px;
        z-index: 200;
        position: absolute;
        background-size: contain;
        background-repeat: no-repeat;
        transform: scale(-0.7, 0.7) rotate(18deg);
        bottom: -300px;
        right: 0;
    }
`;

export const UserBox = styled.div`
    width: 600px;
    background-color: transparent;
    margin-right: 5rem;
`;

export const RedArrow = styled.img`
    transform: scale(-0.3, 0.3) rotate(45deg);
`

export const ShibasList = styled.ul`
    list-style: none;
    display: flex;
    width: 101%;
    height: 100%;
    padding: 0;
    margin: 0;
    flex-direction: row;
    flex-wrap: wrap;
`;

export const ShibaItem = styled.li<{shiba:number}>`
    background-image: url("shibas/SHIBA-${props => props.shiba}.png");
    flex: 33% 0 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border: 3px solid black;
    border-radius: 6px;
    transition: all 0.2s ease-in-out;
    transform: scale(1);
    z-index: 200;
    cursor: pointer;

    :hover {
        transform: scale(1.15);
        z-index: 2000;
    }
`;

export const Score = styled.div`
    color: #c0ffba;
    font-size: 60px;
    position: absolute;
    width: 100%;
    font-weight: 900;
    top: -6rem;
`;

export const HighScore = styled.div`
    font-size: 20px;
    margin-top: -5px;
`;

export const Rules = styled.div`
    position: absolute;
    z-index: 99999;
    display: flex;
    justify-content: center;
    top: 100px;
    color: black;
    font-weight: bold;
    width:100%;
`;

export const RulesWrapper = styled.div`
    width: 80%;
    background-color: #faaf46;
    padding: 2rem 1rem;
    border-radius: 10px;
    box-shadow: 5px 5px 20px black;
`;

export const RulesTitle = styled.h3`
    font-size: 30px;
    margin-top: 0;
`;

export const RulesContent = styled.p`
    font-size: 20px;
    margin-bottom: 0;
    line-height: 30px;
`;

export const CheckboxForLater = styled.div<{color: string}>`
    appearance: none;
    border: 3px solid #5e5e5e;
    width: 20px;
    height: 20px;
    background-color: ${props => props.color};
`;

export const RulesButton = styled.div`
    display: inline-block;
    padding: 1.5rem 4rem;
    margin-top: 2rem;
    background-color: black;
    color: white;
    border-radius: 35px;
    box-shadow: 2px 2px 15px white;
    font-size: 25px;
    cursor: pointer;
`;

export const Countdown = styled.div`
    position: absolute;
    width: 100%;
    color: red;
    font-size: 600px;
    z-index: 99999;
    top: calc(50% - 300px);
    font-weight: 900;
`;

export const TryAgainwrapper = styled.div`
    position: absolute;
    width: 100%;
    z-index: 99999;
    top: calc(50% - 36px);
    transition: all 0.5s ease-in-out;
    transform: scale(0.01);
    visibility: hidden;
`;

export const TryAgain = styled.div`
    color: #b80000;
    font-size: 40px;
    font-weight: bold;
    background-color: #faaf46;
    padding: 1rem 3rem;
    border-radius: 40px;
    box-shadow: 5px 5px 20px black;
    width: fit-content;
    margin: auto;
    cursor: pointer;
`;

export const Life = styled.div`
width: 120px;
    height: 120px;
    background-image: url("Life.png");
    background-size: contain;
    background-repeat: no-repeat;
    
    &.broken {
        background-image: url("brokenLife.png");
    }
`;

export const LivesWrapper = styled.div`
    display: flex;
    position: absolute;
    width: 40%;
    top: -100px;
    justify-content: space-around;
`;


