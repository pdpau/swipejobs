"use client";

import { OwnButton } from "./OwnButton";

type Props = {
    text: string;
    type?: "button" | "submit";
    onClickFunction?: () => void;
};

export function PinkButton({ text, type, onClickFunction }: Props) {
    return (
        <OwnButton 
            text={text}
            type={type}
            fromColor="from-vibezpink-700"
            viaColor="via-vibezpink-500"
            toColor="to-vibezpink-700"
            textColor="text-slate-100"
            onClickFunction={onClickFunction}
        />
    );
};
