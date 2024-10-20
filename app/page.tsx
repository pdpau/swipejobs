"use client"

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";


import { GreenButton } from "./components/buttons/GreenButton";
import { PinkButton } from "./components/buttons/PinkButton";

/* Import logos */
import Vibez from "./public/vibez.svg";
import VibezFestival from "./public/vibez_festival.svg";
import LogoZ from "./public/logo_z.svg";
//import Youz from "./public/youz.svg";


export default function Home() {
  const router = useRouter();
  console.log("ID Guardat: " + localStorage.getItem('userId'))
  const handleChangePage = async () => {
    localStorage.setItem('userId', "");
    router.push('/register-page'); // Redirigir a /offers-page
  }

  return (
    <>
      <main 
        className={cn(
          "h-screen w-screen", 
          "flex justify-center items-center", 
          "bg-slate-100", 
          "overflow-auto no-scrollbar"
        )}
      >
        {/* <Vibez className="absolute top-20 left-1/2 transform -translate-x-1/2 h-24 w-24" /> */}
        {/* <LogoZ className="absolute top-20 left-1/2 transform -translate-x-1/2 h-24 w-24" /> */}
        <VibezFestival 
          className={cn(
            "absolute top-20 left-1/2 transform -translate-x-1/2", 
            "h-28 w-28",
            "max-h-logo-main-first:top-10 max-h-logo-main-second:hidden"
          )}
        />
        <div className={cn("h-full w-5/6", "flex flex-col justify-center items-center", "space-y-6")}>
          <h3 className="text-center text-4xl font-extrabold text-slate-950">
            FES MATCH AMB OFERTES DE TREBALL
          </h3>
          <p className="text-center text-xl text-slate-800">
            Després del registre veuràs una sèrie d'ofertes de treball, tria les que més t'agradin i t'enviarem el recull.
          </p>
          <div className="text-center mt-6">
              <GreenButton text="Començar" type="button" 
              onClickFunction={handleChangePage}
              />
          </div>
        </div>
      </main>
    </>
  );
};
