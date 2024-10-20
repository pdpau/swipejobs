"use client";

/* Imports */
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

import { supabase } from '../../lib/supabaseClient';

import { cn } from '@/lib/utils';

import { JobOffer } from '../components/JobOffer';
import { JobOffer2 } from '../components/JobOffer2';
import { JobOffer3 } from '../components/JobOffer3';
import { PaginationDots } from '../components/PaginationDots';

import { OfferType } from "../types";
import { listOfOffersExample } from "../consts";

import { TiTick, TiTimes } from 'react-icons/ti';

/* Import logos */
import LogoZ from "../public/logo_z.svg";


/* Main component */
export default function OffersPage() {
  const router = useRouter();

  /* Variables  */
  const [offers, setOffers] = useState<OfferType[]>(listOfOffersExample);
  const [offersBD, setOffersBD] = useState<any>(); // Aquí se guardarán las ofertas
  const [userId, setUserId] = useState<number | null>(null); // userId as number or null
  const [loading, setLoading] = useState(true); // Estado para mostrar un loader si es necesario
  const [currentIndex, setCurrentIndex] = useState(0); // Index de la oferta actual

  /* Swipeable */
  const [isSwiping, setIsSwiping] = useState(false);
  const [lastSwipe, setLastSwipe] = useState<string | null>(null);
  const handleSwipeStart = (direction: string) => {
    setIsSwiping(true);
    setLastSwipe(direction);
  };
  const handleSwipeEnd = () => {
    setIsSwiping(false);
    setLastSwipe(null);
  };
  /* End of swipeable */

  /* Functions */
  const fetchOffers = async () => {
    const { data, error } = await supabase
      .from('Offers') // Asegúrate de que este sea el nombre exacto de tu tabla
      .select(); // Selecciona todas las columnas
    if (error) {
      console.error("Error fetching offers:", error.message);
    } else {
      setOffersBD(data); // Guarda las ofertas en el estado
      console.log(data);
    }
    setLoading(false); // Oculta el loader una vez que los datos han sido cargados
  };

  useEffect(() => {
    // Recuperar el ID del usuario desde localStorage y convertir a número
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(parseInt(storedUserId)); // Convert to number
    }
    /* Pillar les ofertes de la DB */
    fetchOffers();
  }, []);


  const onSwipe = (direction: string) => {
    if (currentIndex !== null && currentIndex >= 0) {
      const currentOffer = offers[currentIndex];

      if (direction === "right") {
          console.log(`Liked: ${currentOffer.title}`);
      } else if (direction === "left") {
          console.log(`Passed on: ${currentOffer.title}`);
      }

      /* TODO: Guardar ofertes amb like o pass a la DB */
      

      /* Actualitzem index i si no hi ha mes ofertes -> anar a thankyou-page */
      const nextIndex = currentIndex + 1;
      setTimeout(() => {
        if (nextIndex > offersBD.length - 1) { // Si no hay más ofertas
          console.log("No more offers");
          router.push("/thankyou-page");
        } else {
          setCurrentIndex(nextIndex);
        }
      }, 500);
    }
  }

  return (
    <main className="h-screen w-screen bg-slate-950 flex justify-center items-center">
      <LogoZ 
        className={cn(
          "absolute top-16 left-1/2 transform -translate-x-1/2", 
          "h-16 w-16",
          "max-h-logo-register-first:top-10 max-h-logo-register-second:hidden"
        )}
      />

      {loading ? (
        <p className="text-slate-100 text-xl font-bold">Carregant ofertes...</p>
      ) : (
        currentIndex !== null && currentIndex >= 0 && (
          <div className="w-screen h-screen flex flex-col justify-center items-center">
            {/* <JobOffer dbOffer={offersBD[currentIndex]} onSwipe={onSwipe} /> */}
            {/* <JobOffer2 dbOffer={offersBD[currentIndex]} onSwipe={onSwipe} /> */}
            <JobOffer3 
              dbOffer={offersBD[currentIndex]}
              onSwipe={onSwipe}
              onSwipeStart={handleSwipeStart}
              onSwipeEnd={handleSwipeEnd}
              isSwiping={isSwiping}
              lastSwipe={lastSwipe}
            />
            <PaginationDots totalOffers={offersBD.length} currentIndex={currentIndex} />
          </div>
        )
      )}

      {/* Icono de like */}
      <div
        className={`absolute right-[3%] top-[81%] transform -translate-y-1/2 transition-transform duration-500 ease-in-out ${
          isSwiping && lastSwipe === 'right' ? '-translate-x-[40vw] -translate-y-[40vh] scale-300' : 'scale-100'
        }`}
      >
        <TiTick className="text-green-500" size={60} />
      </div>
      {/* Icono de dislike */}
      <div
        className={`absolute left-[3%] top-[81%] transform -translate-y-1/2 transition-transform duration-500 ease-in-out ${
          isSwiping && lastSwipe === 'left' ? 'translate-x-[40vw] -translate-y-[40vh] scale-300' : 'scale-100'
        }`}
      >
        <TiTimes className="text-red-500" size={60} />
      </div>

    </main>
  );
};
