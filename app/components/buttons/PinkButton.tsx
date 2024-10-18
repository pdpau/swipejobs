"use client";

import { OwnButton } from "./OwnButton";

export function PinkButton({ text }: { text: string }) {
    return (
        <OwnButton 
            text={text}
            fromColor="from-vibezpink-700"
            viaColor="via-vibezpink-500"
            toColor="to-vibezpink-700"
            textColor="text-slate-100"
        />
    );
};
