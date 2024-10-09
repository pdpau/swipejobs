"use client";

/* Imports */
import { useState } from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { JobOffer } from "../components/JobOffer";

import { OfferType } from "../types";
import { list } from "postcss";

/* Mock offers */
const listOfOffersExample = [
  {
    id: 1,
    companyName: "Google",
    title: "Frontend Developer",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec purus nec elit luctus pharetra. Aenean auctor, metus eget tincidunt feugiat, justo odio ultricies nunc, nec ultricies nunc odio nec libero. Nullam nec nunc nec libero.",
    location: "Remote",
    salary: "100k",
    requirements: ["React", "TypeScript", "CSS"]
  },
  {
    id: 2,
    companyName: "Facebook",
    title: "Backend Developer",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec purus nec elit luctus pharetra. Aenean auctor, metus eget tincidunt feugiat, justo odio ultricies nunc, nec ultricies nunc odio nec libero. Nullam nec nunc nec libero.",
    location: "Remote",
    salary: "100k",
    requirements: ["NodeJS", "MongoDB", "Express"]
  },
  {
    id: 3,
    companyName: "Amazon",
    title: "Fullstack Developer",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec purus nec elit luctus pharetra. Aenean auctor, metus eget tincidunt feugiat, justo odio ultricies nunc, nec ultricies nunc odio nec libero. Nullam nec nunc nec libero.",
    location: "Remote",
    salary: "100k",
    requirements: ["React", "NodeJS", "MongoDB"]
  },
  {
    id: 4,
    companyName: "Apple",
    title: "Mobile Developer",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec purus nec elit luctus pharetra. Aenean auctor, metus eget tincidunt feugiat, justo odio ultricies nunc, nec ultricies nunc odio nec libero. Nullam nec nunc nec libero.",
    location: "Remote",
    salary: "100k",
    requirements: ["Swift", "Objective-C", "XCode"]
  },
  {
    id: 5,
    companyName: "Microsoft",
    title: "DevOps Engineer",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec purus nec elit luctus pharetra. Aenean auctor, metus eget tincidunt feugiat, justo odio ultricies nunc, nec ultricies nunc odio nec libero. Nullam nec nunc nec libero.",
    location: "Remote",
    salary: "100k",
    requirements: ["Docker", "Kubernetes", "CI/CD"]
  }
];

/* Main component */
export default function OffersPage() {
  /* Variables  */
  const [offers, setOffers] = useState<OfferType[]>(listOfOffersExample);
  //setOffers(listOfOffersExample); /* Despres les ofertes s'agafen de la DB */

  /* Functions */

  return (
    <main>
      <p>Offers page</p>

      {/* TODO: Background styles */}


      {/* TODO: List all JobOffers (map) */}
      <JobOffer offer={listOfOffersExample[0]} />
    </main>
  );
};
/* {offers.map((offer) => (
  <JobOffer key={offer.id} offer={offer} />
))} */