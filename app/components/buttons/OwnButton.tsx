"use client";

/* Imports */

import { cn } from "@/lib/utils";

type Props = {
    text: string;
    fromColor: string; // Clases de Tailwind para 'from'
    viaColor?: string;  // Clases de Tailwind para 'via' (opcional)
    toColor: string;    // Clases de Tailwind para 'to'
    textColor: string;  // Clases de Tailwind para el color de texto
};

/* Main component */
export function OwnButton({ text, fromColor, viaColor, toColor, textColor }: Props) {
    return (
        <button
            className={`
                mt-2 px-[18px] py-[9px] text-center
                transition-all duration-500 ease-in-out
                bg-[length:200%_auto] bg-left
                font-bold rounded-lg shadow-md
                hover:bg-right active:scale-95
                ${textColor}
                ${viaColor 
                    ? `bg-gradient-to-r ${fromColor} ${viaColor} ${toColor}`
                    : `bg-gradient-to-r ${fromColor} ${toColor}`}
            `}
        >
            {text}
        </button>
    );
};
