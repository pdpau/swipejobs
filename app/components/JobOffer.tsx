"use client";


/* Imports */
import TinderCard from "react-tinder-card";

import { OfferType } from "../types";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

/* Props */
type Props = {
    offer: OfferType;
    onSwipe: (direction: string) => void;
};

/* Main component */
export function JobOffer({ offer, onSwipe }: Props) {

    /* Functions */
    

    return (
        /* TODO: Acabar styles i fer responsive per mòbil */
        /* TODO: ¿¿Fer els div com funcriones y requisitos?? */
        /* TODO: Canviar paleta de colors (fer variables dels colors) */
        /* TODO: Escollir tipus de lletra pel projecte */

        <TinderCard
            className={cn(
                "flex justify-center items-center", 
                "w-2/3 h-4/5", 
                "bg-slate-950 rounded-3xl shadow-xl",
                ""
            )}
            key={offer.id}
            onSwipe={onSwipe}
            preventSwipe={["up", "down"]}
        >
            <div className="h-full p-6 flex flex-col justify-between text-white">
                {/* Logo o nombre de la empresa */}
                <div className="h-[15%] flex flex-col items-center">
                    <h2 className="text-6xl font-bold">{offer.companyName}</h2>
                    <p className="text-2xl text-pink-400 my-3">{offer.title}</p>
                </div>

                <Separator className="bg-pink-500"/>

                {/* Detalles de la oferta */}
                <div className="h-[5%] flex justify-around items-center text-lg my-2">
                    <div className="flex flex-col items-center">
                        <p><strong><u>Ubicació</u></strong></p>
                        <p>{offer.location}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p><strong>Horari:</strong></p>
                        <p>{offer.schedule}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p><strong>Tipus de contracte</strong></p>
                        <p>{offer.contractType}</p>
                    </div>
                </div>

                <Separator className="bg-pink-500"/>

                {/* Descripción de la empresa y la oferta */}
                <div className="h-[40%] mb-4 px-4">
                    <h3 className="text-pink-400 text-2xl my-2">Descripció</h3>
                    <p className="text-lg">{offer.description}</p>
                </div>

                <Separator className="bg-pink-500"/>

                {/* Funciones y Requisitos */}
                <div className="h-[35%] flex justify-between">
                    <div className="w-1/2 mr-2 my-2 px-4 bg-slate-800 rounded-2xl">
                        <h3 className="text-pink-400 text-2xl my-2">Funcions</h3>
                        <ul className="list-disc pl-5 text-lg">
                            {offer.functions.map((func, index) => (
                                <li key={index}>{func}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-1/2 ml-2 my-2 px-4 bg-slate-700 rounded-2xl">
                        <h3 className="text-pink-400 text-2xl my-2">Requisits</h3>
                        <ul className="list-disc pl-5 text-lg">
                            {offer.requirements.map((req, index) => (
                                <li key={index}>{req}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <Separator className="bg-pink-500"/>

                {/* Indicadores "like" o "pass" */}
                <div className="h-[5%]"> {/* TODO: Canviar els botons per algo guapo */}
                    <div className="flex justify-between mt-4">
                        <button className="bg-pink-400 text-white px-4 py-2 rounded-lg">Pass</button>
                        <button className="bg-pink-400 text-white px-4 py-2 rounded-lg">Like</button>
                    </div>
                </div>
            </div>
        </TinderCard>
    );
};