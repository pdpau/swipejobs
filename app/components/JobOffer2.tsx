"use client";

/* Imports */
import { useEffect, useState } from "react";

import TinderCard from "react-tinder-card";

import { OfferType } from "../types";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

import { ListItem } from "./ListItem";

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
export function JobOffer2({ dbOffer, onSwipe }: Props) {
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
        /* TODO: Acabar styles i fer responsive per mòbil */
        /* TODO: ¿¿Fer els div com funcriones y requisitos?? */
        /* TODO: Canviar paleta de colors (fer variables dels colors) */
        /* TODO: Escollir tipus de lletra pel projecte */

        /* TODO: Ajustar els max-w i max-h del TinderCard per optimitzar a tots els dispositius */

        <TinderCard
            className={cn(
                "flex justify-center items-center", 
                "w-5/6 h-2/3 max-w-[400px] max-h-[900px]", 
                "bg-slate-800 rounded-3xl shadow-xl",
                ""
            )}
            key={offer.id}
            onSwipe={onSwipe}
            preventSwipe={["up", "down"]}
        >
            <div className="w-full h-full max-w-[400px] max-h-[900px] flex flex-col justify-between text-white"> {/* TODO: Ajustar mida de la lletra segons hi capiga al div */}
                {/* Logo o nombre de la empresa */}
                <div className="h-[15%] px-6 py-4 flex justify-between items-center bg-slate-600 rounded-t-3xl">
                    <h2 className="text-3xl font-bold text-white max-w-[60%]">{offer.companyName}</h2>
                    <div className="w-[2px] h-8 bg-pink-400"></div> {/* Separador vertical grueso */}
                    <span className="text-lg font-bold text-gray-400 max-w-[40%]">{offer.title}</span>
                </div>

                <Separator className="bg-pink-500"/>

                {/* Detalles de la oferta */} {/* TODO: Revisar iconos */}
                <div className="h-[10%] px-4 pt-2 space-x-1 flex justify-around items-center text-base">
                    <div className="flex items-center">
                        {/* <p><strong><u>Ubicació</u></strong></p> */}
                        <i className="mr-1"><TiLocation /></i>
                        <span className="text-gray-300">{offer.location}</span>
                    </div>
                    <div className="w-[2px] h-6 bg-pink-400"></div> {/* Separador vertical grueso */}
                    <div className="flex items-center">
                        {/* <p><strong>Contracte</strong></p> */}
                        <i className="mr-1"><FaFileContract /></i>
                        <span className="text-gray-300">{offer.contractType}</span>
                    </div>
                    <div className="w-[2px] h-6 bg-pink-400"></div> {/* Separador vertical grueso */}
                    <div className="flex items-center">
                        {/* <p><strong>Horari:</strong></p> */}
                        <i className="mr-1"><BsFillClockFill /></i>
                        <span className="text-gray-300">{offer.schedule}</span>
                    </div>
                </div>

                {/* Descripción de la empresa y la oferta */}
                <div className="h-[40%] px-6 py-2 mb-3 flex flex-col">
                    <h3 className=" text-pink-400 text-xl font-bold mb-1">Descripció</h3>
                    <Separator className="bg-pink-500 mb-1"/>
                    <p className="text-sm leading-relaxed text-gray-200 overflow-auto">
                        {offer.description}
                    </p>
                    {/* <div className="overflow-auto no-scrollbar max-h-[75%]"></div> */}
                    {/* <div className="w-full px-4 bg-slate-600 rounded-xl"></div> */}
                </div>

                {/* Funciones y Requisitos */}
                <div className="h-[35%] px-6 py-4 mb-3 flex justify-between space-x-4">
                    <div className="w-1/2 pr-1">
                        <h3 className=" text-pink-400 text-xl font-bold mb-1">Funcions</h3>
                        <Separator className="bg-pink-500 mb-1"/>
                        <div className="overflow-auto max-h-[75%]">
                            <ul className="text-sm text-gray-200">
                                {offer.functions.map((func, index) => (
                                    <li key={index}>{func}</li>
                                ))}
                                {/* <ListItem2 key={index} item={func} /> */}
                            </ul>
                        </div>
                    </div>
                    <div className="w-1/2 pl-1">
                        <h3 className=" text-pink-400 text-xl font-bold mb-1">Requisits</h3>
                        <Separator className="bg-pink-500 mb-1"/>
                        <div className="overflow-auto max-h-[75%]">
                            <ul className="list-disc pl-5 text-sm text-gray-200">
                                {offer.requirements.map((req, index) => (
                                    <li key={index}>{req}</li>
                                ))}
                                {/* <ListItem2 key={index} item={req} /> */}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Indicadores "like" o "pass" */}
                {/* TODO: Canviar els botons per algo guapo */}
                {/* <div className="h-[5%]">
                    <div className="flex justify-between mt-4">
                        <button className="bg-pink-400 text-white px-4 py-2 rounded-lg">Pass</button>
                        <button className="bg-pink-400 text-white px-4 py-2 rounded-lg">Like</button>
                    </div>
                </div> */}
            </div>
        </TinderCard>
    );
};