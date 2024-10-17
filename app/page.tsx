import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import Vibez from "./public/vibez.svg";
import VibezFestival from "./public/vibez_festival.svg";
import LogoZ from "./public/logo_z.svg";
//import Youz from "./public/youz.svg";

/* Colors of the event logo */
// Green: #90FF23 / rgba(144,255,35,255) / vibezgreen-400
// Pink: #FF01FC / rgba(255,1,252,255) / vibezpink-600

export default function Home() {
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
        <VibezFestival className="absolute top-20 left-1/2 transform -translate-x-1/2 h-28 w-28" />
        {/* <Vibez className="absolute top-20 left-1/2 transform -translate-x-1/2 h-24 w-24" /> */}
        {/* <LogoZ className="absolute top-20 left-1/2 transform -translate-x-1/2 h-24 w-24" /> */}
        <div className={cn("h-full w-5/6", "flex flex-col justify-center items-center", "space-y-6")}>
          <h3 className="text-center text-4xl font-extrabold text-slate-900">
            FES MATCH AMB OFERTES DE TREBALL
          </h3>
          <p className="text-center text-xl text-slate-700">
            Després del registre veuràs una sèrie d'ofertes de treball, tria les que més t'agradin i t'enviarem el recull.
          </p>
          <div className="text-center mt-6"> {/* TODO: Button styles */}
            <Link href="/register-page">
              <button className="text-lg font-semibold text-slate-900 rounded-lg px-4 py-2 shadow-md bg-vibezgreen-400 hover:bg-vibezgreen-600">
                Començar
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};
