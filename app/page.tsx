"use client"

/* Imports */
import { cn } from "@/lib/utils";

import { GreenButton } from "./components/buttons/GreenButton";

/* Import logos */
import VibezFestival from "../public/vibez_festival.svg";
import Link from "next/link";


export default function Home() {
  // console.log("ID Guardat: " + localStorage.getItem('userId')); // TODO: Revisar per que dona error
  const handleChangePage = async () => {
    localStorage.setItem('userId', "");
    // router.push('/register-page'); // Redirigir a /offers-page
  };

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
            Després del registre veuràs una sèrie d&apos;ofertes de treball, tria les que més t&apos;agradin i t&apos;enviarem el recull.
          </p>
          <div className="text-center mt-6">
            <Link href="/register-page">
              <GreenButton text="Registrar-se" type="button" onClickFunction={handleChangePage} />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};
