"use client";

/* Imports */
import { useEffect, useState } from 'react';

import { useRouter } from "next/navigation";

import { supabase } from '../../lib/supabaseClient';

import { JobOffer } from "../components/JobOffer";

import { OfferType } from "../types";

/* Mock offers */
const listOfOffersExample = [
  {
    id: 1,
    companyName: "Google",
    title: "Frontend Developer",
    location: "Barcelona",
    schedule: "Full-time",
    contractType: "Indefinite",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nisl nec sem aliquam ultricies. Nulla facilisi. Proin auctor, libero et ultricies aliquet, nunc libero tincidunt libero, nec ultricies libero nunc nec libero.",
    functions: [
      "Desenvolupament de la interfície d'usuari",
      "Optimització de la velocitat de càrrega",
      "Implementació de noves funcionalitats"
    ],
    requirements: [
      "Experiència prèvia en desenvolupament web",
      "Coneixements de ReactJS",
      "Coneixements de HTML, CSS i JavaScript"
    ]
  },
  {
    id: 2,
    companyName: "Amazon",
    title: "Backend Developer",
    location: "Madrid",
    schedule: "Full-time",
    contractType: "Indefinite",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nisl nec sem aliquam ultricies. Nulla facilisi. Proin auctor, libero et ultricies aliquet, nunc libero tincidunt libero, nec ultricies libero nunc nec libero.",
    functions: [
      "Desenvolupament de la interfície d'usuari",
      "Optimització de la velocitat de càrrega",
      "Implementació de noves funcionalitats"
    ],
    requirements: [
      "Experiència prèvia en desenvolupament web",
      "Coneixements de ReactJS",
      "Coneixements de HTML, CSS i JavaScript"
    ]
  },
  {
    id: 3,
    companyName: "Apple",
    title: "Fullstack Developer",
    location: "Barcelona",
    schedule: "Full-time",
    contractType: "Indefinite",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nisl nec sem aliquam ultricies. Nulla facilisi. Proin auctor, libero et ultricies aliquet, nunc libero tincidunt libero, nec ultricies libero nunc nec libero.",
    functions: [
      "Desenvolupament de la interfície d'usuari",
      "Optimització de la velocitat de càrrega",
      "Implementació de noves funcionalitats"
    ],
    requirements: [
      "Experiència prèvia en desenvolupament web",
      "Coneixements de ReactJS",
      "Coneixements de HTML, CSS i JavaScript"
    ]
  },
  {
    id: 4,
    companyName: "Microsoft",
    title: "DevOps Engineer",
    location: "Barcelona",
    schedule: "Full-time",
    contractType: "Indefinite",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nisl nec sem aliquam ultricies. Nulla facilisi. Proin auctor, libero et ultricies aliquet, nunc libero tincidunt libero, nec ultricies libero nunc nec libero.",
    functions: [
      "Desenvolupament de la interfície d'usuari",
      "Optimització de la velocitat de càrrega",
      "Implementació de noves funcionalitats"
    ],
    requirements: [
      "Experiència prèvia en desenvolupament web",
      "Coneixements de ReactJS",
      "Coneixements de HTML, CSS i JavaScript"
    ]
  },
  {
    id: 5,
    companyName: "Facebook",
    title: "Data Scientist",
    location: "Barcelona",
    schedule: "Full-time",
    contractType: "Indefinite",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nisl nec sem aliquam ultricies. Nulla facilisi. Proin auctor, libero et ultricies aliquet, nunc libero tincidunt libero, nec ultricies libero nunc nec libero.",
    functions: [
      "Desenvolupament de la interfície d'usuari",
      "Optimització de la velocitat de càrrega",
      "Implementació de noves funcionalitats"
    ],
    requirements: [
      "Experiència prèvia en desenvolupament web",
      "Coneixements de ReactJS",
      "Coneixements de HTML, CSS i JavaScript"
    ]
  }
];

/* Main component */
export default function OffersPage() {
  const router = useRouter();

  const [userId, setUserId] = useState<number | null>(null); // userId as number or null

  useEffect(() => {
    // Recuperar el ID del usuario desde localStorage y convertir a número
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(parseInt(storedUserId)); // Convert to number
    }
  }, []);

  const [offersBD, setOffersBD] = useState<OfferType[]>([]); // Aquí se guardarán las ofertas
  const [loading, setLoading] = useState(true); // Estado para mostrar un loader si es necesario

  useEffect(() => {
    const fetchOffers = async () => {
      const { data, error } = await supabase
        .from('Offers') // Asegúrate de que este sea el nombre exacto de tu tabla
        .select(); // Selecciona todas las columnas

      if (error) {
        console.error("Error fetching offers:", error.message);
      } else {
        setOffersBD(data); // Guarda las ofertas en el estado
        console.log(data)
      }

      setLoading(false); // Oculta el loader una vez que los datos han sido cargados
    };

    fetchOffers();
  }, []);



  /* Variables  */
  const [offers, setOffers] = useState<OfferType[]>(listOfOffersExample);
  //setOffers(listOfOffersExample); /* Despres les ofertes s'agafen de la DB */
  const [currentIndex, setCurrentIndex] = useState(offers.length - 1);

  /* Functions */

  /* Swipe functions */
  const onSwipe = (direction: string) => {
    if (direction === "right") {
        console.log(`Liked: ${offers[currentIndex].title}`);
    } else if (direction === "left") {
        console.log(`Passed on: ${offers[currentIndex].title}`);
    }

    /* TODO: Guardar ofertes amb like o pass a la DB */
    

    const nextIndex = currentIndex - 1;
    setTimeout(() => {
      if (nextIndex < 0) {
        console.log("No more offers");
        router.push("/thankyou-page");
      } else {
        setCurrentIndex(nextIndex);
      }
    }, 500);
  };

  return (
    <main className="h-screen w-screen bg-blue-400 flex justify-center items-center">
      {/* <p>Offers page</p> */}

      {/* TODO: Background styles */}


      {/* <JobOffer offer={listOfOffersExample[0]} /> */}
      {/* TODO: List all JobOffers (map) */}
      {currentIndex >= 0 && (
        <JobOffer offer={offers[currentIndex]} onSwipe={onSwipe} />
      )}
      <div>
      <h1>Página de ejemplo</h1>
      {userId !== null ? <p>ID del usuario: {userId}</p> : <p>Cargando...</p>}
      </div>
    </main>
  );
};
/* {offers.map((offer) => (
  <JobOffer key={offer.id} offer={offer} onSwipe={onSwipe}/>
))} */