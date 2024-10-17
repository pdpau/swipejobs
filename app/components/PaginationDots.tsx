"use client";

/* Imports */


/* Props */
type Props = {
    totalOffers: number;
    currentIndex: number;
};

/* Main component */
export function PaginationDots({ totalOffers, currentIndex }: Props) {
    return (
        <div className="flex justify-center items-center space-x-2 mt-4">
            {Array.from({ length: totalOffers }, (_, index) => (
                <div 
                    key={index}
                    className={`w-8 h-8 flex justify-center items-center rounded-full ${
                        index === currentIndex ? "bg-pink-400 text-white" : "bg-gray-400"
                    }`}
                >
                    {index === currentIndex ? (
                        <span className="text-sm font-bold">{`${index+1}/${totalOffers}`}</span>
                    ) : (
                        <span className="w-4 h-4 bg-gray-400 rounded-full block"></span>
                    )}
                </div>
            ))}
        </div>
    )
};