"use client";

/* Imports */

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { GreenButton } from "../components/buttons/GreenButton";

/* Import logos */
import Vibez from "../../public/vibez.svg";
//import VibezFestival from "../public/vibez_festival.svg";


/* Main component */
export default function ThankYouPage() {
  const router = useRouter();
  if (typeof window !== "undefined") {
    localStorage.setItem('userId', "");
  }

  const handleGoBack = async () => {
    if (typeof window !== "undefined") {
      localStorage.setItem('userId', "");
    }
    router.push('/');
  };

  const [showAxel, setShowAxel] = useState(false);
  const handleGoBackAxel = async () => {
    setShowAxel(true);
    setTimeout(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem('userId', "");
      }
      router.push('/');
      setShowAxel(false); // necessari??
    }, 1000);
  };

  return (
    <main 
      className={cn(
        "h-screen w-screen", 
        "flex justify-center items-center", 
        "bg-slate-100", 
        "overflow-auto no-scrollbar"
      )}
    >
      {/* Sticker Axel */}
      <div onClick={handleGoBackAxel} className="absolute top-20 left-6 h-1 w-1 cursor-pointer bg-transparent" style={{ zIndex: 1000 }} />
      {showAxel && (
        <Image
          src="/axel.jpg"
          alt="fotoaxel"
          width={screen.width}
          height={screen.height}
          className="absolute top-0 left-0 z-50"
        />
      )}
      {/* Logo Vibez */}
      <Vibez 
        className={cn(
          "absolute top-20 left-1/2 transform -translate-x-1/2", 
          "h-28 w-28",
          "max-h-logo-main-first:top-10 max-h-logo-main-second:hidden"
        )}
      />
      {/* Main */}
      <div className={cn("h-full w-5/6", "flex flex-col justify-center items-center", "space-y-6")}>
        <h1 className="text-center text-4xl font-extrabold text-slate-950">
          GRÀCIES PER PARTICIPAR!
        </h1>
        <p className="text-center text-xl text-slate-800">
          T&apos;enviarem el recull d&apos;ofertes que has escollit juntament amb el link per unir-te al nostre <strong>pool de talent</strong>
        </p>
        <div className="text-center mt-6">
            <GreenButton text="Tornar a la pàgina principal" type="button" 
            onClickFunction={handleGoBack}/>
        </div>
      </div>
    </main>
  );
};
