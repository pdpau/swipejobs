"use client";

import { OwnButton } from "./OwnButton";

type Props = {
    text: string;
    type?: "button" | "submit";
    onClickFunction?: () => void;
    onTouchFunction?: () => void;
};

export function GreenButton({ text, type, onClickFunction, onTouchFunction }: Props) {
    return (
        <OwnButton 
            text={text}
            type={type}
            fromColor="from-vibezgreen-500"
            viaColor="via-vibezgreen-300"
            toColor="to-vibezgreen-500"
            textColor="text-slate-800"
            onClickFunction={onClickFunction}
            onTouchFunction={onTouchFunction}
        />
    );
};
