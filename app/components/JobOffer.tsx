"use client";

/* Imports */
import { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";

import { OfferType } from "../types";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

import { FunctionsAndRequirements } from "./FunctionsAndRequirements";

/* Icons */
import { TiLocation } from "react-icons/ti";
import { FaFileContract } from "react-icons/fa6";
import { BsFillClockFill } from "react-icons/bs";

/* Props */
type Props = {
    dbOffer: any;
    onSwipe: (direction: string) => void;
};

const transformDataToOfferType = (dbData: any): OfferType | null => {
    if (!dbData) return null;
    console.log("DB Data:", dbData);
    return {
        id: dbData.id || 0,
        companyName: dbData.companyName || "Unknown Company", 
        title: dbData.title || "No title provided",
        location: dbData.location || "No location provided",
        schedule: dbData.schedule || "No schedule provided",
        contractType: dbData.contractType || "Unknown contract type",
        description: dbData.description || "No description available",
        
        // Accedemos directamente a los arrays
        functions: dbData.functions.functions || ["No functions provided"],
        requirements: dbData.requirements.requirements || ["No requirements provided"]
    };
}


/* Main component */
export function JobOffer({ dbOffer, onSwipe }: Props) {
    /* Variables */
    const [offer, setOffer] = useState<OfferType | null>(null);

    /* Functions */
    useEffect(() => {
        const mappedOffer = transformDataToOfferType(dbOffer);
        setOffer(mappedOffer);
        console.log("Offer:", mappedOffer);
    }, [dbOffer]);

    if (!offer) return <div>Loading...</div>;
    return (
        /* TODO: SMOOTH TRANSITIONS i fer responsive per mòbil */

        <TinderCard
            className={cn(
                "flex justify-center items-center", 
                "w-5/6 h-3/5 max-w-[350px] max-h-[600px]", 
                "bg-slate-800 rounded-3xl shadow-xl",
                ""
            )}
            key={offer.id}
            onSwipe={onSwipe}
            preventSwipe={["up", "down"]}
        >
            <div className={cn("w-full h-full max-w-[350px] max-h-[600px]", "flex flex-col justify-between", "text-white")}> {/* TODO: Ajustar mida de la lletra segons hi capiga al div */}
                {/* Logo o nombre de la empresa */}
                <div className={cn("h-[18%] px-6 py-4 space-x-4", "flex justify-between items-center", "bg-slate-600 rounded-t-3xl")}>
                    <h2 className={cn("text-2xl font-extrabold line-clamp-2", "w-1/2 max-w-[60%]", "text-white")}>{offer.companyName}</h2> {/* [clamp(1rem, 5vw, 3rem)] */}
                    <div className="w-[4px] h-8 bg-black"></div> {/* Separador vertical grueso */}
                    <span className={cn("text-end text-xl font-bold line-clamp-2", "w-1/2 max-w-[40%]", "text-gray-400")}>{offer.title}</span>
                </div>

                {/* Detalles de la oferta */} {/* TODO: Revisar iconos */}
                <div className={cn("h-[12%] px-4 pt-2 space-x-1", "flex justify-around items-center", "text-md font-medium")}>
                    <div className="flex items-center">
                        <i className="mr-1"><TiLocation /></i>
                        <span className="text-gray-400">{offer.location}</span>
                    </div>
                    <div className="w-[2px] h-6 bg-black"></div> {/* Separador vertical grueso */}
                    <div className="flex items-center">
                        <i className="mr-1"><FaFileContract /></i>
                        <span className="text-gray-400">{offer.contractType}</span>
                    </div>
                    <div className="w-[2px] h-6 bg-black"></div> {/* Separador vertical grueso */}
                    <div className="flex items-center">
                        <i className="mr-1"><BsFillClockFill /></i>
                        <span className="text-gray-400">{offer.schedule}</span>
                    </div>
                </div>

                {/* Descripción de la empresa y la oferta */}
                <div className={cn("h-[50%] px-6 py-2 mb-2", "flex flex-col")}>
                    <h3 className="text-gray-100 text-xl font-bold mb-1">Descripció</h3>
                    <Separator className="bg-black mb-1"/>
                    <p className="text-md font-medium leading-relaxed text-gray-300 overflow-auto no-scrollbar">
                        {offer.description}
                    </p>
                </div>

                {/* Funciones y Requisitos */}
                <div className={cn("h-[20%] px-6 py-4 space-x-6", "flex justify-evenly")}>
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
        </TinderCard>
    );
};
