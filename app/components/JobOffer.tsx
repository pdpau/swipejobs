"use client";

/* Imports */
import { useEffect, useState } from "react";

import TinderCard from "react-tinder-card";

import { OfferType } from "../types";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

import { ListItem } from "./ListItem";

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
        /* TODO: Acabar styles i fer responsive per mòbil */
        /* TODO: ¿¿Fer els div com funcriones y requisitos?? */
        /* TODO: Canviar paleta de colors (fer variables dels colors) */
        /* TODO: Escollir tipus de lletra pel projecte */

        /* TODO: Ajustar els max-w i max-h del TinderCard per optimitzar a tots els dispositius */

        <TinderCard
            className={cn(
                "flex justify-center items-center", 
                "w-5/6 h-2/3 max-w-[400px] max-h-[900px]", 
                "bg-slate-400 rounded-3xl shadow-xl",
                ""
            )}
            key={offer.id}
            onSwipe={onSwipe}
            preventSwipe={["up", "down"]}
        >
            <div className="h-full px-4 py-2 flex flex-col justify-between text-white"> {/* TODO: Escollir padding */}
                {/* Logo o nombre de la empresa */}
                <div className="h-[12%] mb-2 flex flex-col items-center">
                    <h2 className="text-3xl font-bold my-auto">{offer.companyName}</h2>
                    <p className="text-lg font-bold text-pink-400 my-auto">{offer.title}</p>
                </div>

                {/* Detalles de la oferta */}
                <div className="h-[8%] mb-2 flex justify-around items-center text-sm">
                    <div className="w-1/3 h-full mr-1 flex items-center justify-center bg-slate-800 rounded-xl overflow-auto no-scrollbar">
                        <div className="flex flex-col items-center">
                            <p><strong><u>Ubicació</u></strong></p>
                            <p>{offer.location}</p>
                        </div>
                    </div>
                    <div className="w-1/3 h-full mx-1 flex items-center justify-center bg-slate-700 rounded-xl overflow-auto no-scrollbar">
                        <div className="flex flex-col items-center">
                            <p><strong>Contracte</strong></p>
                            <p>{offer.contractType}</p>
                        </div>
                    </div>
                    <div className="w-1/3 h-full ml-1 flex items-center justify-center bg-slate-800 rounded-xl overflow-auto no-scrollbar">
                        <div className="flex flex-col items-center">
                            <p><strong>Horari:</strong></p>
                            <p>{offer.schedule}</p>
                        </div>
                    </div>
                </div>

                {/* Descripción de la empresa y la oferta */}
                <div className="h-[45%] mb-2 flex">
                    <div className="w-full px-4 bg-slate-600 rounded-xl">
                        <h3 className="text-center text-pink-400 text-lg font-bold my-1">Descripció</h3>
                        <div className="overflow-auto no-scrollbar max-h-[75%]"> {/* REVIEW: ¿¿¿¿¿ 75% ????? */}
                            <p className="text-xs ">{offer.description}</p>
                        </div>
                    </div>
                </div>

                {/* Funciones y Requisitos */} {/* TODO: Crear component listItem i donar estils a la llista */}
                <div className="h-[35%] mb-2 flex justify-between">
                    <div className="w-1/2 mr-1 px-3 bg-slate-800 rounded-xl">
                        <h3 className="text-center text-pink-400 text-lg font-bold my-2">Funcions</h3>
                        <div className="overflow-auto no-scrollbar max-h-[75%]">
                            <ul className="text-xs">
                                {offer.functions.map((func, index) => (
                                    <ListItem key={index} item={func} />
                                ))}
                                {/* <li key={index}>{func}</li> */}
                            </ul>
                        </div>
                    </div>
                    <div className="w-1/2 ml-1 px-3 bg-slate-700 rounded-xl">
                        <h3 className="text-center text-pink-400 text-lg font-bold my-2">Requisits</h3>
                        <div className="overflow-auto no-scrollbar max-h-[75%]">
                            <ul className="text-xs">
                                {offer.requirements.map((req, index) => (
                                    <ListItem key={index} item={req} />
                                ))}
                                {/* <li key={index}>{req}</li> */}
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