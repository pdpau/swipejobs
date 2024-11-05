"use client";

/* Imports */

//import Image from "next/image";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import { GreenButton } from "../components/buttons/GreenButton";

/* Import logos */
import Vibez from "../public/vibez.svg";
//import VibezFestival from "../public/vibez_festival.svg";


/* Main component */
export default function ThankYouPage() {
  const router = useRouter();
  localStorage.setItem('userId', "");

  const handleGoBack = async () => {
    localStorage.setItem('userId', "");
    router.push('/');
  } 

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
      {/* <div className="absolute top-5 left-5 h-10 w-10">
        <img src="../public/prova.png" alt="foto axel" />
      </div> */}
      {/* <Image
        src="../public/prova.png"
        alt="foto axel"
        width={40}
        height={40}
        className="absolute top-5 left-5"
      /> */}
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
