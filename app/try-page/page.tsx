"use client";

/* Imports */
import { GreenButton } from "../components/buttons/GreenButton";
import { PinkButton } from "../components/buttons/PinkButton";


/* Main component */
export default function TryPage() {
    return (
        <main className="h-screen w-screen flex justify-center items-center bg-slate-100">
            <GreenButton text="Funcions" />
            <PinkButton text="Requisits" />
        </main>
    );
};
