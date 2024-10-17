"use client";

/* Imports */
import { useState } from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/* Import logos */
import Vibez from "../public/vibez.svg";
import VibezFestival from "../public/vibez_festival.svg";


/* Main component */
export default function ThankYouPage() {
  return (
    <main 
      className={cn(
        "h-screen w-screen", 
        "flex justify-center items-center", 
        "bg-slate-100", 
        "overflow-auto no-scrollbar"
      )}
    >
      {/* TODO: ¿¿ Posar Vibez o VibezFestival ?? */}
      <Vibez 
        className={cn(
          "absolute top-20 left-1/2 transform -translate-x-1/2", 
          "h-28 w-28",
          "max-h-logo-main-first:top-10 max-h-logo-main-second:hidden"
        )}
      />
      <div className={cn("h-full w-5/6", "flex flex-col justify-center items-center", "space-y-6")}>
        <h1 className="text-center text-4xl font-extrabold text-slate-950">
          GRÀCIES PER PARTICIPAR!
        </h1>
        <p className="text-center text-xl text-slate-800">
          T'enviarem el recull d'ofertes que has escollit juntament amb el link per unir-te al nostre <strong>pool de talent</strong>
        </p>
        <div className="text-center mt-6"> {/* TODO: Button styles */}
          <Link href="/">
            <button className="text-lg font-semibold text-slate-900 rounded-lg px-4 py-2 shadow-md bg-vibezgreen-400 hover:bg-vibezgreen-600">
              Tornar a la pàgina principal
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};
