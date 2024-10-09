"use client";


/* Imports */

import { OfferType } from "../types";

/* Props */
type Props = {
    offer: OfferType;
};

/* Main component */
export function JobOffer({ offer }: Props) {

    

    return (
        <div>
            <h1>JobOffer</h1>
            <h2>{offer.companyName}</h2>
            <p>{offer.title}</p>
            <p>{offer.description}</p>
            <p>{offer.location}</p>
            <p>{offer.salary}</p>
            <p>{offer.requirements}</p>
        </div>
    );
};