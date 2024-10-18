"use client";

/* Imports */
import { cn } from "@/lib/utils";


/* Props */
type Props = {
    totalOffers: number;
    currentIndex: number;
};

/* Main component */
export function PaginationDots({ totalOffers, currentIndex }: Props) {
    /* Variables */
    const maxVisibleDots = 5;
    let start = Math.max(currentIndex - 2, 0);
    let end = Math.min(currentIndex + 2, totalOffers - 1);

    if (currentIndex <= 2) {
        end = Math.min(4, totalOffers - 1);
    } else if (currentIndex >= totalOffers - 3) {
        start = Math.max(totalOffers - 5, 0);
    }

    const visibleOffers = Array.from({ length: end - start + 1 }, (_, i) => i + start);

    return (
        <div className="flex justify-center items-center space-x-2 mt-4">
            {start > 0 && <div className={cn("w-[10px] h-[10px]", "bg-vibezgreen-400 rounded-full")}></div>}

            {visibleOffers.map((index) => (
                <div key={index} className="flex justify-center items-center">
                    {index === currentIndex ? (
                        // El punto actual con número y borde
                        <div 
                            className={cn(
                                "w-[48px] h-[32px]", 
                                "flex justify-center items-center", 
                                "bg-vibezgreen-400", 
                                "border-2 border-vibezgreen-500 rounded-lg", 
                                "transition-all duration-300 ease-in-out transform"
                            )}
                        >
                            <span className="text-md font-bold text-slate-800">{`${index+1} / ${totalOffers}`}</span>
                        </div>
                    ) : (
                        // Puntos vacíos
                        <div 
                            className={cn(
                                "w-[18px] h-[18px]", 
                                "text-slate-100 bg-vibezgreen-400", 
                                "border-2 border-vibezgreen-500 rounded-full", 
                                "transition-all duration-300 ease-in-out transform"
                            )}
                        ></div>
                    )}
                </div>
            ))}

            {end < totalOffers - 1 && <div className={cn("w-[10px] h-[10px]", "bg-vibezgreen-400 rounded-full")}></div>}
        </div>
    );
};
