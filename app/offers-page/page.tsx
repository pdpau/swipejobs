"use client";

/* Imports */
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

import { supabase } from '../../lib/supabaseClient';

import { cn } from '@/lib/utils';

import { JobOffer } from '../components/JobOffer';
import { PaginationDots } from '../components/PaginationDots';
import { GreenButton } from "../components/buttons/GreenButton";

import toast from 'react-hot-toast';

import { TiTick, TiTimes } from 'react-icons/ti';

/* Import logos */
import LogoZ from "../../public/logo_z.svg";
import { OfferType } from '../types';


/* Main component */
export default function OffersPage() {
  const router = useRouter();

  /* Variables  */
  //const [offers, setOffers] = useState<OfferType[]>(listOfOffersExample);
  const [offersBD, setOffersBD] = useState<OfferType[] | undefined>(); // Aquí se guardarán las ofertas
  const [userId, setUserId] = useState<number | null>(null); // userId as number or null
  const [loading, setLoading] = useState(true); // Estado para mostrar un loader si es necesario
  const [currentIndex, setCurrentIndex] = useState(0); // Index de la oferta actual
  const [isTransitioning, setIsTransitioning] = useState(false); // Estado para controlar la transición

  /* Swipeable */
  const [isSwiping, setIsSwiping] = useState(false);
  const [lastSwipe, setLastSwipe] = useState<string | null>(null);
  // const [storedUserId, setstoredUserId] = useState<number | null>(null);
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
    if (typeof window !== "undefined") {
      localStorage.setItem('userId', "");
    }
    router.push('/register-page'); // Redirigir a /offers-page
  }

  const fetchOffers = async () => {
    setLoading(true); // Muestra el loader antes de la consulta
    const { data, error } = await supabase
      .from('Offers') // Asegúrate de que este sea el nombre exacto de tu tabla
      .select(); // Selecciona todas las columnas (considera especificar columnas si es posible)
  
    if (error) {
      console.error("Error fetching offers:", error.message);
      toast.error('Error al cargar las ofertas. Intenta nuevamente.'); // Muestra un mensaje al usuario
    } else {
      setOffersBD(data); // Guarda las ofertas en el estado
      // console.log(data);
    }
    
    setLoading(false); // Oculta el loader una vez que los datos han sido cargados
  };

  useEffect(() => {
    if (typeof window !== "undefined") { // ESPEREM A QUE EL CONTIGUT ESTIGUI CARREGAT A LA PART DEL CLIENT
      // Recuperar el ID del usuario desde localStorage y convertir a número
      const userIDString = localStorage.getItem('userId');
  
      // Verificar si el valor no es nulo o cadena vacía antes de intentar convertirlo
      if (userIDString && userIDString !== "") {
        const parsedUserId = parseInt(userIDString, 10); // Convertir a número de manera segura
  
        if (!isNaN(parsedUserId)) {
          setUserId(parsedUserId); // Guardar el userId en el estado si es un número válido
          // setstoredUserId(parsedUserId); // Guardar en storedUserId también
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
        // console.log('Index actual: ' + currentIndex)
      }
  
      /* Pillar les ofertes de la DB */
      fetchOffers();
    }
  }, []);


  const onSwipe = async (direction: string) => {
    if (currentIndex !== null && currentIndex >= 0 && offersBD) { // Comprovem que offersBD no sigui undefined
      // const actualGlobalOffer = localStorage.getItem('globalOfferIndex');

      setIsTransitioning(true); // Start transition

      const currentOffer = offersBD[currentIndex];
  
      if (!currentOffer) {
        console.error("No se encontró la oferta actual.");
        return;
      }
  
      if (direction === "right") {
        if (userId) {
          const { data, error } = await supabase
            .from('users_offers') // Nombre de tu tabla
            .insert([{ idUser: userId, idOffer: currentOffer.id }]);
  
          if (error) {
            console.error("Error inserting into user_offers:", error.message);
            toast.error('Error al registrar el like.'); // Muestra un mensaje al usuario
            return; // Salir si hay error
          } else {
            console.log("Like registrado correctamente:", data);
            toast.success('Oferta guardada correctamente!'); // Mensaje de éxito
          }
        } else {
          console.error("No se ha encontrado un userId válido.");
          toast.error('Necesitas iniciar sesión para guardar la oferta.'); // Mensaje para el usuario
          return;
        }
      } else if (direction === "left") {
        // Aquí puedes agregar lógica para manejar el "swipe" hacia la izquierda si es necesario
        console.log(`Passed on: ${currentOffer.title}`);
      }

      // Esperar un tiempo antes de proceder
      setTimeout(() => {
        // Actualiza el índice y verifica si hay más ofertas
        const nextIndex = currentIndex + 1;
        if (typeof window !== "undefined") {
          localStorage.setItem('globalOfferIndex', nextIndex.toString());
        }
        // Si no hay más ofertas, redirige a la thank-you page
        if (nextIndex > offersBD.length - 1) {
          console.log("No more offers");
          if (typeof window !== "undefined") {
            localStorage.setItem('globalOfferIndex', '0');
          }
          router.push("/thankyou-page");
        } else {
          setCurrentIndex(nextIndex);
          setIsTransitioning(false); // End transition
        }
      }, 500);
    }
  };

  if (typeof window !== "undefined") { // ESPEREM A QUE EL CONTIGUT ESTIGUI CARREGAT A LA PART DEL CLIENT
    if (localStorage.getItem('userId') === "" || localStorage.getItem('userId') === null) {
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
              REGISTRA&apos;T PER VEURE LES OFERTES
            </h3>
            <div className="text-center mt-6">
              <GreenButton text="Registrar-se" type="button" onClickFunction={handleChangePage} />
            </div>
          </div>
        </main>
      );
    } else {
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
            currentIndex !== null && currentIndex >= 0 && offersBD && ( // Comprovem que offersBD no sigui undefined
              <div className={`w-screen h-screen flex flex-col justify-center items-center transform transition-all duration-500 ease-in-out ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
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
};
