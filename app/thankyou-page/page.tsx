"use client";

/* Imports */
import { useState } from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/* Props */
type Props = {
  
};


/* Main component */
export default function ThankYouPage() {

  /* Variables */

  /* Functions */

  return (
    /* TODO: Responsive */
    /* TODO: Escollir tipus de lletra pel projecte */

    <main className="flex flex-col items-center">
      <div
        className={cn(
          "h-screen w-1/2 p-4", 
          "flex flex-col justify-center", 
          "bg-white"
        )}
      >
        <h1 className="text-center text-6xl font-bold">
          GRÀCIES PER PARTICIPAR!
        </h1>
        <h3 className="text-center text-2xl mt-6">
          T'enviarem el recull d'ofertes que has escollit juntament amb el link per unir-te al nostre <strong>pool de talent</strong>
        </h3>

        <div className="text-center mt-6"> {/* TODO: Button styles */}
          <Link href="/">
            <Button className="">
              Tornar a la pàgina principal
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};