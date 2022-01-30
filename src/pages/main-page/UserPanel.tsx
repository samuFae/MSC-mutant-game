import React from "react";
import { UserBox, ShibasList, ShibaItem } from "./ShibaGame.styled";

interface IUserPanel {
    activeShiba: number;
    onShibaClick: (isCorrectShiba: boolean) => any;
}

export const UserPanel: React.FC<IUserPanel> = ({ activeShiba, onShibaClick }) => {
    const availableShibas = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const shibaClicked = (shiba: number) => {
        if (shiba === activeShiba) {
            onShibaClick(true);
        } else {
            onShibaClick(false);
        }
    }
    return (
        <UserBox>
            <ShibasList>
                {availableShibas.map((shiba) => {
                    return <ShibaItem key={shiba} onClick={() => { shibaClicked(shiba) }} shiba={shiba}>
                    </ShibaItem>
                })}
            </ShibasList>
        </UserBox>
    );
};

export default UserPanel;