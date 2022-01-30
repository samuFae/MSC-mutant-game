import React, { useEffect, useState } from "react";
import { SignalBox } from "./ShibaGame.styled";

interface ILeadSignal {
    gameIsGoing: boolean;
    activeShiba: number;
    selectedOption: any;
    score: number;
}

export const LeadSignal: React.FC<ILeadSignal> = ({ gameIsGoing, activeShiba, selectedOption, score }) => {
    const [checkWhatToDo, setCheckWhatToDo] = useState<number>(0);
    function randomIntFromInterval(min: number, max: number) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    useEffect(() => {
        switch (true) {
            case score < 1000:
                setCheckWhatToDo(0);
                break;
            case score < 2000:
                setCheckWhatToDo(1);
                break;
            case score < 3000:
                setCheckWhatToDo(2);
                break;
            case score < 4000:
                setCheckWhatToDo(3);
                break;
            default:
                setCheckWhatToDo(randomIntFromInterval(1, 4) - 1);
                break;
        }
    }, [selectedOption])

    const twoArray = ["Tap the", "Rub the", "Smash the", "Destory the"];
    const threeArray = [["Hold", "and press"], ["Keep", "and touch"], ["sit on", "and kick"], ["Roll on", "and rub"]];
    const fourArray = ["anywhere but the Shibas", "where the Shibas are not", "where you want (don't disturb the Shibas)", "but care cause Shibas are sleeping"];
    const fifthArray = [["Spin", "The mouse wheel"], ["Move", "the mouse wheel"], ["Roll", "the mouse wheel on the table"], ["Spin", "the mouse wheel with a cheek"]];
    const sixArray = [["Do", "Nothing"], ["Stand", "up"], ["", "Jump"], ["Take a", "pencil"]];
    const sevenArray = [["Do the", "same", "thing you did before"], ["Do it", "again", ""], ["", "Remember", "what just happened"], ["Recall the", "previous", "action"]];


    switch (selectedOption.lookFor) {
        case 1: return (
            <SignalBox style={{
                backgroundImage: `url("shibas/SHIBA-${activeShiba}.png")`
            }}>
            </SignalBox>
        );
        case 2: return (
            <SignalBox>
                {twoArray[checkWhatToDo]}<span style={{ fontSize: "200px", fontWeight: "900" }}>{selectedOption[2].toUpperCase()}</span>key
            </SignalBox>
        );
        case 3:
            return (<SignalBox>
                {threeArray[checkWhatToDo][0]}<span style={{ fontSize: "150px", fontWeight: "900", lineHeight: "130px" }}>{selectedOption[3][1]}</span>{threeArray[checkWhatToDo][1]}<span style={{ fontSize: "150px", fontWeight: "900", lineHeight: "130px" }}>{selectedOption[3][0].toUpperCase()}</span>
            </SignalBox>);
        case 4:
            return (<SignalBox>
                <span style={{ fontSize: "150px", fontWeight: "900", lineHeight: "130px" }}>Click</span>{fourArray[checkWhatToDo]}
            </SignalBox>);
        case 5:
            return (<SignalBox>
                <span style={{ fontSize: '150px', fontWeight: '900', lineHeight: '130px' }}>{fifthArray[checkWhatToDo][0]}</span>{fifthArray[checkWhatToDo][1]}
            </SignalBox>);
        case 6:
            return (<SignalBox>
                {sixArray[checkWhatToDo][0]}<span style={{ fontSize: "150px", fontWeight: "900", lineHeight: "130px" }}>{sixArray[checkWhatToDo][1]}</span>
            </SignalBox>);
        case 7:
            return (<SignalBox>
                {sevenArray[checkWhatToDo][0]}<span style={{ fontSize: "110px", fontWeight: "900", lineHeight: "130px" }}>{sevenArray[checkWhatToDo][1]}</span>{sevenArray[checkWhatToDo][2]}
            </SignalBox>);

        default: return (
            <SignalBox style={{
                backgroundImage: `url("shibas/SHIBA-${activeShiba}.png")`
            }}>
            </SignalBox>
        );
    }
};

export default LeadSignal;