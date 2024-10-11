/* File for defining the global types of the app */
export type OfferType = {
    /* Pillar les dades de Google Forms */
    id: number;
    companyName: string;
    title: string;
    location: string;
    schedule: string;
    contractType: string;
    description: string;
    functions: string[];
    requirements: string[];

    /* MIGHT ADD: CompanyLogo, image for the offer, weekly hours, etc... */

};