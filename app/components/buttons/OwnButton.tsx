"use client";

/* Imports */


type Props = {
    text: string;
    type?: "button" | "submit"; // Tipo de botón
    fromColor: string; // Clases de Tailwind para 'from'
    viaColor?: string;  // Clases de Tailwind para 'via' (opcional)
    toColor: string;    // Clases de Tailwind para 'to'
    textColor: string;  // Clases de Tailwind para el color de texto
    onClickFunction?: () => void; // Función a ejecutar al hacer click
    onTouchFunction?: () => void; // Función a ejecutar al tocar
};

/* Main component */
export function OwnButton({ text, type, fromColor, viaColor, toColor, textColor, onClickFunction, onTouchFunction }: Props) {
    return (
        <button
            type={type}
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
            onClick={onClickFunction}
            onTouchEnd={onTouchFunction}
        >
            {text}
        </button>
    );
};
