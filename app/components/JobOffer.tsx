"use client";

/* Imports */
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

import { cn } from "@/lib/utils";

import { OfferType } from "../types";
import { FunctionsAndRequirements } from "./FunctionsAndRequirements";

/* Icons */
import { TiLocation } from "react-icons/ti";
import { FaFileContract } from "react-icons/fa6";
import { BsFillClockFill } from "react-icons/bs";


/* Helper function */
const transformDataToOfferType = (dbData: OfferType): OfferType | null => {
    if (!dbData) return null;
    // console.log("DB Data:", dbData);
    return {
        id: dbData.id || 0,
        companyName: dbData.companyName || "Unknown Company", 
        title: dbData.title || "No title provided",
        location: dbData.location || "No location provided",
        schedule: dbData.schedule || "No schedule provided",
        contractType: dbData.contractType || "Unknown contract type",
        description: dbData.description || "No description available",
        
        // Accedemos directamente a los arrays
        functions: dbData.functions || ["No functions provided"],
        requirements: dbData.requirements || ["No requirements provided"]
    };
};

/* Props */
type Props = {
    dbOffer: OfferType;
    onSwipe: (direction: string) => void;
    onSwipeStart: (direction: string) => void;
    onSwipeEnd: () => void;
    isSwiping: boolean;
    lastSwipe: string | null;
};

/* Main component */
export function JobOffer({ dbOffer, onSwipe, onSwipeStart, onSwipeEnd, isSwiping, lastSwipe }: Props) {
    /* --- Variables --- */
    const [offer, setOffer] = useState<OfferType | null>(null);
    

    /* --- Functions --- */
    useEffect(() => {
        const mappedOffer = transformDataToOfferType(dbOffer);
        setOffer(mappedOffer);
        // console.log("Offer:", mappedOffer);
    }, [dbOffer]);

    /* Swipeable */
    const handlers = useSwipeable({
        onSwipedLeft: () => {
            onSwipeStart("left");
            onSwipe("left");
            setTimeout(() => {
                onSwipeEnd();
            }, 500);
        },
        onSwipedRight: () => {
            onSwipeStart("right");
            onSwipe("right");
            setTimeout(() => {
                onSwipeEnd();
            }, 500);
        },
        //preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });
    /* End of swipeable */


    if (!offer) return <div className="text-slate-100 text-xl font-bold">Carregant oferta...</div>;
    return (
        <div
            {...handlers}
            className={cn(
                { 'swipe-left': isSwiping && lastSwipe === 'left', 'swipe-right': isSwiping && lastSwipe === 'right' },
                "",
                "flex justify-center items-center", 
                "w-5/6 h-3/5 max-w-[350px] max-h-[600px]", 
                "bg-slate-800 rounded-3xl shadow-xl",
                "cursor-grab",
                ""
            )}
            key={offer.id}
        >
            <div className={cn("w-full h-full max-w-[350px] max-h-[600px]", "flex flex-col justify-between", "text-slate-100")}> {/* TODO: Ajustar mida de la lletra segons hi capiga al div */}
                {/* Logo o nombre de la empresa */}
                <div className={cn("h-[15%] px-6 py-1", "flex justify-between items-center", "bg-slate-600 rounded-t-3xl")}>
                    <h2 className={cn("text-start text-xl font-extrabold line-clamp-2 text-ellipsis", "w-[60%] max-w-[60%]", "text-slate-50")}>{offer.companyName}</h2> {/* [clamp(1rem, 5vw, 3rem)] */}
                    <span className={cn("text-end text-lg font-bold line-clamp-2 text-ellipsis", "w-[40%] max-w-[40%]", "text-slate-400")}>{offer.title}</span>
                </div>

                {/* Detalles de la oferta */}
                <div className={cn("h-[15%] px-4 pt-2 space-x-2", "flex justify-between items-stretch", "text-md font-medium")}>
                    <div className="flex items-center w-1/3">
                        <i className="mr-1"><TiLocation /></i>
                        <span className="text-slate-400">{offer.location}</span>
                    </div>
                    <div className="flex items-center w-1/3">
                        <i className="mr-1"><FaFileContract /></i>
                        <span className="text-slate-400">{offer.contractType}</span>
                    </div>
                    <div className="flex items-center w-1/3">
                        <i className="mr-1"><BsFillClockFill /></i>
                        <span className="text-slate-400">{offer.schedule}</span>
                    </div>
                </div>

                {/* Descripción de la empresa y la oferta */}
                <div className={cn("h-[55%] px-6 py-2 mb-2", "flex flex-col", "text-justify whitespace-pre-line")}>
                    <h3 className="text-slate-50 text-xl font-bold mb-1">Descripció</h3>
                    <p className="text-md font-medium leading-relaxed text-slate-300 overflow-y-auto no-scrollbar">
                        {offer.description}
                    </p>
                </div>

                {/* Funciones y Requisitos */}
                <div className={cn("h-[15%] px-4 space-x-6", "flex justify-evenly")}>
                    {/* Funcions */}
                    <div>
                        <FunctionsAndRequirements list={offer.functions} title="Funcions" />
                    </div>
                    {/* Requisits */}
                    <div>
                        <FunctionsAndRequirements list={offer.requirements} title="Requisits" />
                    </div>
                </div>
            </div>
        </div>
    );
};
