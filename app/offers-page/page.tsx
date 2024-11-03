"use client";

/* Imports */
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

import { supabase } from '../../lib/supabaseClient';

import { cn } from '@/lib/utils';

import { JobOffer } from '../components/JobOffer';
import { PaginationDots } from '../components/PaginationDots';
import { GreenButton } from "../components/buttons/GreenButton";


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
  const [storedUserId, setstoredUserId] = useState<number | null>(null);
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
  const handleChangePage = async () => {
    localStorage.setItem('userId', "");
    router.push('/register-page'); // Redirigir a /offers-page
  }

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
    const userIDString = localStorage.getItem('userId');

    // Verificar si el valor no es nulo o cadena vacía antes de intentar convertirlo
    if (userIDString && userIDString !== "") {
      const parsedUserId = parseInt(userIDString, 10); // Convertir a número de manera segura

      if (!isNaN(parsedUserId)) {
        setUserId(parsedUserId); // Guardar el userId en el estado si es un número válido
        setstoredUserId(parsedUserId); // Guardar en storedUserId también
      } else {
        console.log("userId no es un número válido");
      }
    } else {
      console.log("No se encontró userId en localStorage o está vacío");
    }

    // Verifica si existe un índice guardado en globalOfferIndex
    const savedIndex = localStorage.getItem('globalOfferIndex');
    if (savedIndex && !isNaN(Number(savedIndex))) {
      setCurrentIndex(Number(savedIndex)); // Establece el índice inicial desde globalOfferIndex
      console.log('Index actual: ' + currentIndex)
    }

    /* Pillar les ofertes de la DB */
    fetchOffers();
  }, []);


  const onSwipe = async (direction: string) => {
    if (currentIndex !== null && currentIndex >= 0) {
      const actualGlobalOffer = localStorage.getItem('globalOfferIndex');
      console.log('Actual Global Offer: '+ actualGlobalOffer);
      const currentOffer = offers[currentIndex];

      if (direction === "right") {
        if (userId) {
          const { data, error } = await supabase
            .from('users_offers') // Nombre de tu tabla
            .insert([
              { idUser: userId, idOffer: currentOffer.id } // Inserción de datos
            ]);

          if (error) {
            console.error("Error inserting into user_offers:", error.message);
          } else {
            console.log("Like registrado correctamente:", data);
          }
        } else {
          console.error("No se ha encontrado un userId válido.");
        }
      } else if (direction === "left") {
        console.log(`Passed on: ${currentOffer.title}`);
      }

      /* Actualitzem index i si no hi ha mes ofertes -> anar a thankyou-page */
      const nextIndex = currentIndex + 1;
    localStorage.setItem('globalOfferIndex', nextIndex.toString()); // Guarda el nuevo índice en globalOfferIndex
      setTimeout(() => {
        if (nextIndex > offersBD.length - 1) { // Si no hay más ofertas
          console.log("No more offers");
          localStorage.setItem('globalOfferIndex', '0');
          router.push("/thankyou-page");
        } else {
          setCurrentIndex(nextIndex);
        }
      }, 500);
    }
  }

  /* TODO: Si es refresca la pagina torna a la primera oferta (arreglar sobreescribint ofertes o continuant des d'on s'ha quedat) */
  if (localStorage.getItem('userId') === "" || localStorage.getItem('userId') === null) { /* ¿¿¿¿ || localStorage === undefined  ???? */
    return (
      <main className="h-screen w-screen bg-slate-100 flex justify-center items-center">
        <LogoZ
          className={cn(
            "absolute top-16 left-1/2 transform -translate-x-1/2",
            "h-16 w-16",
            "max-h-logo-register-first:top-10 max-h-logo-register-second:hidden"
          )}
        />
        <div className={cn("h-full w-5/6", "flex flex-col justify-center items-center", "space-y-6")}>
          <h3 className="text-center text-4xl font-extrabold text-slate-950">
            REGISTRA'T PER VEURE LES OFERTES
          </h3>
          <div className="text-center mt-6">
            <GreenButton text="Registrar-se" type="button" onClickFunction={handleChangePage} />
          </div>
        </div>
      </main>
    );
  } else {
    console.log("userId:", userId); /* TODO: Borrar el log */
    return (
      <main className="h-screen w-screen bg-slate-950 flex justify-center items-center">
        <LogoZ
          className={cn(
            "absolute top-[8%] left-1/2 transform -translate-x-1/2",
            "h-16 w-16",
            "max-h-logo-register-first:top-[5%] max-h-logo-register-second:hidden max-h-logo-register-big:top-[23%]"
          )}
        />

        {loading ? (
          <p className="text-slate-100 text-xl font-bold">Carregant ofertes...</p>
        ) : (
          currentIndex !== null && currentIndex >= 0 && (
            <div className="w-screen h-screen flex flex-col justify-center items-center">
              <JobOffer
                dbOffer={offersBD[currentIndex]}
                onSwipe={onSwipe}
                onSwipeStart={handleSwipeStart}
                onSwipeEnd={handleSwipeEnd}
                isSwiping={isSwiping}
                lastSwipe={lastSwipe}
              />
              <PaginationDots totalOffers={offersBD.length} currentIndex={currentIndex} />

              {/* Icono de like */}
              <div
                className={`absolute right-[3%] top-[81%] transform -translate-y-1/2 transition-transform duration-500 ease-in-out
                  ${ isSwiping && lastSwipe === 'right' ? '-translate-x-[40vw] -translate-y-[40vh] scale-300' : 'scale-100' }
                `}
              >
                <TiTick className="text-green-500" size={60} />
              </div>
              {/* Icono de dislike */}
              <div
                className={`absolute left-[3%] top-[81%] transform -translate-y-1/2 transition-transform duration-500 ease-in-out
                  ${isSwiping && lastSwipe === 'left' ? 'translate-x-[40vw] -translate-y-[40vh] scale-300' : 'scale-100' }
                `}
              >
                <TiTimes className="text-red-500" size={60} />
              </div>
            </div>
          )
        )}
      </main>
    );
  };
};
