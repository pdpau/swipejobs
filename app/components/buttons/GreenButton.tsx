"use client";

import { OwnButton } from "./OwnButton";

export function GreenButton({ text }: { text: string }) {
    return (
        <OwnButton 
            text={text}
            fromColor="from-vibezgreen-500"
            viaColor="via-vibezgreen-300"
            toColor="to-vibezgreen-500"
            textColor="text-slate-800"
        />
    );
};
