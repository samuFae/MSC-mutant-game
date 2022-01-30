import React from "react";
import { Life, LivesWrapper } from "./ShibaGame.styled";

interface ILives {
    lives: number;
}

export const Lives: React.FC<ILives> = ({lives}) => {

    return <LivesWrapper>
        {lives > 0 && [...Array(lives)].map((e,i) => {
            return <Life key={i}></Life>
        })}
        {lives <3 && [...Array(3-lives)].map((e, i) => {
            return <Life key={i} className="broken"></Life>
        })}
    </LivesWrapper>;
};

export default Lives;