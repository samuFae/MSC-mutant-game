import React, { useEffect, useState } from "react";
import { GlobalWrapper, HeadingWrapper, Title, Subtitle, StartButton, ButtonWrapper, ModeSwitcherWrapper, ToMutant, ToSpeed } from "./MainPage.styled";
import ShibaGame from "./ShibaGame";

export type GamemodeType = "mutant" | "speed"

export const MainPage: React.FC = () => {
  const [goToGame, setGoToGame] = useState<boolean>(false);
  const [gameMode, setGameMode] = useState<GamemodeType>("speed");
  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false);
  const [notAllowed, setNotAllowed] = useState<boolean>(true);
  const switchButtonLabels = ["You're losing on ", "Try the "]

  useEffect(() => {
    //@ts-ignore
    if (localStorage.getItem("highScore") !== null && parseInt(localStorage.getItem("highScore")) > 1400) {
      setNotAllowed(false);
    }
  }, [buttonsDisabled])

  const goToSpeedGame = () => {
    setGoToGame(true);
    window.scrollTo({
      top: 300,
      left: 0,
      behavior: 'smooth'
    })
  }

  const goToMutantGame = () => {
    setGameMode("mutant");
    setGoToGame(true);
    window.scrollTo({
      top: 300,
      left: 0,
      behavior: 'smooth'
    })
  }

  const toggleButtons = () => {
    setButtonsDisabled(buttonsDisabled ? false : true);
  }

  return (
    <GlobalWrapper>
      <HeadingWrapper>
        <Subtitle>
          Welcome to the Mutant Shiba Club game
        </Subtitle>
      </HeadingWrapper>
      <div style={{ position: "relative", minHeight: "850px" }}>
        <ButtonWrapper>
          <StartButton style={goToGame ? { left: "4000px" } : {}} onClick={goToSpeedGame}>
            <div style={{ height: "fit-content" }}>GO TO THE SPEED MODE</div>
          </StartButton>
        </ButtonWrapper>
        <ButtonWrapper>
          <StartButton className={notAllowed ? " disabled" : ""} style={goToGame ? { left: "4000px" } : {}} onClick={goToMutantGame}>
            <div style={{ height: "fit-content" }}>GO TO THE MUTANT MODE</div>
            {notAllowed && <span style={{ fontSize: "18px" }}>You need to reach at least 1500 score to unlock the mutant mode. Trust me it's worth</span>}
          </StartButton>
        </ButtonWrapper>
        <ShibaGame goToGame={goToGame} gameMode={gameMode} toggleButtons={toggleButtons} />
      </div>
      <ModeSwitcherWrapper style={goToGame ? { left: "0px" } : {}}>
        <ToMutant onClick={() => { setGameMode("mutant") }}
          className={(buttonsDisabled ? " disabled" : "") + (notAllowed ? " disabled" : "")}>
          {(gameMode === "speed" ? switchButtonLabels[1] : switchButtonLabels[0]) + "Mutant mode!"}
        </ToMutant>
        <ToSpeed onClick={() => { setGameMode("speed") }}
          className={(buttonsDisabled ? " disabled" : "")}>
          {(gameMode === "speed" ? switchButtonLabels[0] : switchButtonLabels[1]) + "Speed mode!"}
        </ToSpeed>
      </ModeSwitcherWrapper>
    </GlobalWrapper>
  );
};
