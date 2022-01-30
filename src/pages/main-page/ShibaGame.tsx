import { GamemodeType } from "./MainPage";
import React, { useState, useEffect } from "react";
import LeadSignal from "./LeadSignal";
import { GameWrapper, Score, Rules, RulesTitle, RulesContent, RulesWrapper, CheckboxForLater, RulesButton, Countdown, TryAgain, TryAgainwrapper, HighScore } from "./ShibaGame.styled";
import UserPanel from "./UserPanel";
import Lives from "./Lives";

interface IMemoryGame {
    goToGame: boolean;
    gameMode: GamemodeType;
    toggleButtons: () => any;
}

export const ShibaGame: React.FC<IMemoryGame> = ({ goToGame, gameMode, toggleButtons }) => {
    const [gameIsGoing, setGameIsGoing] = useState<boolean>(false);
    const [activeShiba, setActiveShiba] = useState<number>(1);
    const [score, setScore] = useState<number>(0);
    const [gotIt, setGotIt] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [showRules, setShowRules] = useState<boolean>(false);
    const [checked, setChecked] = useState<boolean>(false);
    const [startCountdown, setStartCountdown] = useState<boolean>(false);
    const [countdownTimer, setCountdownTimer] = useState<number>(3)
    const [timer, setTimer] = useState<number>(0);
    const [tryAgain, setTryAgain] = useState<boolean>(false);
    const [tryAgainLabel, setTryAgainLabel] = useState<string>("");
    const [highScore, setHighScore] = useState<number>(0);
    const [lives, setLives] = useState<number>(3);
    const [switchingInterval, setSwitchingInterval] = useState<number>(2500);
    const [selectedOption, setSelectedOption] = useState<any>({
        lookFor: 0,
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: ""
    });
    function randomIntFromInterval(min: number, max: number) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const holdKeys = ["Shift", "Control"]
    let WrapperClasses: string = (error ? "error" : "") + (gameMode === "mutant" ? " mutant" : "");
    let countdownTimerI = countdownTimer;
    const tryAgainOptions = ['"Want to try again?"', '"Now i got it"', '"Now I really got it"', '"This was a bug!!"', '"Ok, last one"', '"Last last one"', '"Next one will be my best one"', '"High score?"'];
    const rulesText = {
        speed: "Welcome to the Mutant Shiba Club game, if you want to win whatever happens in the little box you have to copy it in the bigger box. <br />For example if in the little box there is the WAGMI shiba, you have to click it in the bigger box, you only have 3 lives to work with!<br />But be careful there could be something more if you want to try the mutant mode!<br>And remember that if you're struggling beating the game imagine the struggle I went through coding it :).",
        mutant: "You think you got the hang of the game, watch and click, watch and click, thst's easy right? <br>Mutant mode is something different, i won't tell you anything so you can experience yourself every new feature!<br>I bet I can surprise you, ping me later on Discord to let me know if I won the bet."
    }

    useEffect(() => {
        if (goToGame) {
            if (localStorage.getItem("askAgain") === "no") {
                startCountdownTimer();
            } else {
                setShowRules(true);
            }
        }
        if (localStorage.getItem("highScore")) {
            //@ts-ignore
            setHighScore(parseInt(localStorage.getItem("highScore")))
        }
    }, [goToGame])

    useEffect(() => {
        if (tryAgain) {
            setTryAgainLabel(tryAgainOptions[randomIntFromInterval(0, tryAgainOptions.length - 1)])
        }
    }, [tryAgain])

    useEffect(() => {
        setShowRules(true);
        setTryAgain(false);
        setScore(0);
        if (gameMode === "mutant") {
             setSwitchingInterval(3000);
         } else {
             setSwitchingInterval(2500);
        }
    }, [gameMode])

    const startCountdownTimer = () => {
        toggleButtons();
        setShowRules(false);
        if (checked) {
            localStorage.setItem("askAgain", "no")
        }
        setStartCountdown(true);
        setTimeout(() => {
            setCountdownTimer(--countdownTimerI);
            setTimeout(() => {
                setCountdownTimer(--countdownTimerI);
                setTimeout(() => {
                    setStartCountdown(false);
                    setCountdownTimer(3);
                    setGotIt(true);
                    setGameIsGoing(true);
                    switchShiba();
                }, 1000);
            }, 1000);
        }, 1000);
    }

    const checkErrors = () => {
        if (gotIt === false) {
            onError();
        }
    }

    const speedCicle = (isSame = false, fromSwitch = false) => {
        if (!isSame) {
            setSelectedOption({ ...selectedOption, lookFor: 1 });
            let randomNumber = randomIntFromInterval(1, 9);
            if (randomNumber === activeShiba) {
                if (randomNumber === 9) {
                    setActiveShiba(9 - randomIntFromInterval(1, 8));
                }
                if (randomNumber === 1) {
                    setActiveShiba(1 + randomIntFromInterval(1, 8));
                }
                if (randomNumber !== 1 && randomNumber !== 9) {
                    setActiveShiba(randomNumber + 1);
                }
            } else {
                setActiveShiba(randomNumber);
            }
            if (switchingInterval > 500 && !fromSwitch) {
                if (((score / 100) % 5) === 0) {
                    setSwitchingInterval(switchingInterval - 120)
                }
            }
        }
        switchShiba();
    }

    const mutantCicle = () => {
        if (score < 400) {
            speedCicle();
        } else {
            let randomNumber = randomIntFromInterval(1, 7);
            console.log(selectedOption.lookFor, randomNumber);
            if (randomNumber === selectedOption.lookFor) {
                speedCicle(false, true);
            } else if (randomNumber === 7 && selectedOption.lookFor === 6) {
                speedCicle(false, true);
            } else {
                switch (randomNumber) {
                    case 1:
                        speedCicle(false, true);
                        break;
                    case 2:
                        pressAKey();
                        break;
                    case 3:
                        holdAndPress();
                        break;
                    case 4:
                        clickOnTheScreen();
                        break;
                    case 5:
                        scroll();
                        break;
                    case 6:
                        doNothing();
                        break;
                    case 7:
                        sameAsBefore();
                        break;
                    default: speedCicle(false, true);
                }
            }
        }
        if (switchingInterval > 500) {
            if (((score / 100) % 5) === 0) {
                console.log("interval", switchingInterval);
                setSwitchingInterval(switchingInterval - 100)
            }
        }
    }

    useEffect(() => {
        switch (selectedOption.lookFor) {
            case 2:
                document.addEventListener("keydown", pressAKeyHandler);
                break;
            case 3:
                document.addEventListener("keydown", pressAndHoldHandler);
                break;
            case 4:
                document.addEventListener("click", clickHandler);
                break;
            case 5:
                document.addEventListener("wheel", scrollHandler);
                break;
            case 6:
                document.removeEventListener("click", doNothingClickHandler);
                document.removeEventListener("scroll", doNothingScrollHandler);
                document.removeEventListener("keydown", doNothingKeydownHandler);
                break;
        }
    }, [selectedOption]);

    useEffect(() => {
        switch (selectedOption[7]) {
            case 2:
                document.addEventListener("keydown", pressAKeyHandler);
                break;
            case 3:
                document.addEventListener("keydown", pressAndHoldHandler);
                break;
            case 4:
                document.addEventListener("click", clickHandler);
                break;
            case 5:
                document.addEventListener("wheel", scrollHandler);
                break;
            case 6:
                document.addEventListener("click", doNothingClickHandler);
                document.addEventListener("scroll", doNothingScrollHandler);
                document.addEventListener("keydown", doNothingKeydownHandler);
        }
    }, [selectedOption[7]]);

    const pressAKey = (isSame = false) => {
        if (!isSame) {
            let selectedKey = alphabet[randomIntFromInterval(0, 25)];
            setSelectedOption({ ...selectedOption, lookFor: 2, 2: selectedKey });
        }
        switchShiba();
    }
    const pressAKeyHandler = (event: any) => {
        if (event.key === selectedOption[2]) {
            onShibaSelection(true);
            document.removeEventListener("keydown", pressAKeyHandler);
        } else {
            onError();
            document.removeEventListener("keydown", pressAKeyHandler);
        }
    }

    const holdAndPress = (isSame = false) => {
        if (!isSame) {
            let selectedPair = [alphabet[randomIntFromInterval(0, 25)], holdKeys[randomIntFromInterval(0, 1)]];
            setSelectedOption({ ...selectedOption, lookFor: 3, 3: selectedPair });
            setTimeout(() => {
                switchShiba();
            }, 700)
        } else {
            switchShiba();
        }
    }

    const pressAndHoldHandler = (event: any) => {
        if (event.key !== "Shift" && event.key !== "Control") {
            switch (selectedOption[3][1]) {
                case "Shift":
                    if (event.key.toUpperCase() === selectedOption[3][0].toUpperCase() && event.shiftKey) {
                        onShibaSelection(true);
                        document.removeEventListener("keydown", pressAndHoldHandler);
                    } else {
                        onError();
                        document.removeEventListener("keydown", pressAndHoldHandler);
                    }
                    break;
                case "Control":
                    if (event.key.toUpperCase() === selectedOption[3][0].toUpperCase() && event.ctrlKey) {
                        onShibaSelection(true);
                        document.removeEventListener("keydown", pressAndHoldHandler);
                    } else {
                        onError();
                        document.removeEventListener("keydown", pressAndHoldHandler);
                    }
                    break;
            }
        } else {
            event.preventDefault();
        }
    }

    const clickOnTheScreen = (isSame = false) => {
        if (!isSame) {
            setSelectedOption({ ...selectedOption, lookFor: 4 });
        }
        switchShiba();
    }

    const clickHandler = () => {
        onShibaSelection(true);
        document.removeEventListener("click", clickHandler);
    }

    const scroll = (isSame = false) => {
        if (!isSame) {
            setSelectedOption({ ...selectedOption, lookFor: 5 });
        }
        switchShiba();
    }

    const scrollHandler = (event: any) => {
        onShibaSelection(true);
        document.removeEventListener("wheel", scrollHandler);
    }

    const doNothing = (isSame = false) => {
        if (!isSame) {
            setSelectedOption({ ...selectedOption, lookFor: 6 });
        }
        switchShiba();
        onShibaSelection(true);
        setScore(score + 100);
        if (score >= highScore) {
            setHighScore(score + 100);
        }
    }
    const doNothingClickHandler = (event: any) => {
        console.log("nothing handler");
        onError();
        document.removeEventListener("click", doNothingClickHandler);
        document.removeEventListener("scroll", doNothingScrollHandler);
        document.removeEventListener("keydown", doNothingKeydownHandler);
    }
    const doNothingScrollHandler = (event: any) => {
        console.log("nothing handler");
        onError();
        document.removeEventListener("click", doNothingClickHandler);
        document.removeEventListener("scroll", doNothingScrollHandler);
        document.removeEventListener("keydown", doNothingKeydownHandler);
    }

    const doNothingKeydownHandler = (event: any) => {
        console.log("nothing handler");
        onError();
        document.removeEventListener("click", doNothingClickHandler);
        document.removeEventListener("scroll", doNothingScrollHandler);
        document.removeEventListener("keydown", doNothingKeydownHandler);
    }

    const sameAsBefore = () => {
        let previous = selectedOption.lookFor;
        setSelectedOption({ ...selectedOption, lookFor: 7, 7: previous });
        switch (previous) {
            case 1:
                speedCicle(true);
                break;
            case 2:
                pressAKey(true);
                break;
            case 3:
                holdAndPress(true);
                break;
            case 4:
                clickOnTheScreen(true);
                break;
            case 5:
                scroll(true);
                break;
            case 6:
                doNothing(true);
                break;
            default: speedCicle(true);
        }
    }

    useEffect(() => {
        if (gameIsGoing && gameMode === "speed") {
            checkErrors();
            setGotIt(false);
            speedCicle();
        }
        if (gameIsGoing && gameMode === "mutant") {
            if (selectedOption.lookFor !== 6) {
                checkErrors();
                setGotIt(false);
            }
            mutantCicle();
        }
    }, [timer, gameIsGoing])

    const switchShiba = () => {
        if (gameIsGoing) {
            setTimeout(() => {
                setTimer(timer + 1);
            }, switchingInterval)
        }
        document.removeEventListener("keydown", pressAKeyHandler);
        document.removeEventListener("keyup", pressAndHoldHandler);
        document.removeEventListener("click", doNothingClickHandler);
        document.removeEventListener("scroll", doNothingScrollHandler);
        document.removeEventListener("keydown", doNothingKeydownHandler);
    }

    const onShibaSelection = (isCorrectShiba: boolean, error = false) => {
        if (isCorrectShiba) {
            if (!gotIt && gameIsGoing) {
                if (!error) {
                    setScore(score + 100);
                    if (score >= highScore) {
                        setHighScore(score + 100);
                    }
                }
                setGotIt(true);
            }
        } else {
            if (gameIsGoing) {
                onError();
            }
        }
    }

    useEffect(() => {
        if (lives < 0) {
            let prevHighScore = localStorage.getItem('highScore');
            if (!prevHighScore || highScore > parseInt(prevHighScore)) {
                localStorage.setItem("highScore", highScore.toString());
            }
            setSwitchingInterval(2000);
            setError(true);
            setGameIsGoing(false);
            setTimeout(() => {
                setError(false);
            }, 1000);
            setTryAgain(true);
            toggleButtons();
            setLives(3);
        }
    }, [lives])

    const onError = () => {
        setLives(lives - 1);
        onShibaSelection(true, true);
    }

    const onTryAgain = () => {
        setTryAgain(false);
        setScore(0);
        startCountdownTimer();
    }

    return (
        <GameWrapper className={WrapperClasses} style={goToGame ? { left: "0" } : {}}>
            {showRules && <Rules>
                <RulesWrapper>
                    <RulesTitle>
                        Rules
                    </RulesTitle>
                    <RulesContent dangerouslySetInnerHTML={gameMode === "speed" ? { __html: rulesText.speed } : { __html: rulesText.mutant }}>
                    </RulesContent>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <CheckboxForLater color={checked ? "green" : "transparent"} onClick={() => { setChecked(checked ? false : true) }} />
                        {localStorage.getItem("askAgain") !== "no" && <RulesContent style={{ fontSize: "15px", marginBottom: "8px", marginLeft: "10px", color: "#5e5e5e" }}>Check this if you don't want to see the rules next time (today, if you try tomorrow probably you'll see them again)</RulesContent>}
                    </div>
                    <RulesButton onClick={startCountdownTimer}>
                        I THINK I'M READY! {gameMode === "mutant" && "(you're not)"}
                    </RulesButton>
                </RulesWrapper>
            </Rules>}
            {startCountdown && <Countdown>
                {countdownTimer}
            </Countdown>}
            <TryAgainwrapper style={tryAgain ? { transform: "scale(1)", visibility: "visible" } : {}}>
                <TryAgain onClick={onTryAgain}>
                    {tryAgainLabel}
                </TryAgain>
            </TryAgainwrapper>
            <Lives lives={lives} />
            <Score style={gameMode === "mutant" ? { color: "#b80000" } : {}}>
                Score: {score}
                <HighScore>
                    High Score: {highScore}
                </HighScore>
            </Score>
            <LeadSignal gameIsGoing
                activeShiba={activeShiba}
                selectedOption={selectedOption}
                score={score}
            />
            <UserPanel activeShiba={activeShiba} onShibaClick={onShibaSelection} />
        </GameWrapper>
    );
};

export default ShibaGame;