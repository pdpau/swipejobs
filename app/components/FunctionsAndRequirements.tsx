"use client";

/* Imports */
import { useEffect, useState } from "react";


import { cn } from "@/lib/utils";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { ListItem } from "./ListItem";


/* Props */
type Props = {
    list: string[];
    title: string;
};

/* Main component */
export function FunctionsAndRequirements({ list, title }: Props) {
    /* Variables */
    const [dialogOpen, setDialogOpen] = useState(false);

    /* TODO: Funcions will be pink and requisits will be green */
    /* Condicionales de estilos */
    const isFunctions = title.toLowerCase() === "funcions";
    const dialogColor = isFunctions ? "bg-vibezpink-600 hover:bg-vibezpink-700" : "bg-vibezgreen-400 hover:bg-vibezgreen-500";
    const titleColor = isFunctions ? "text-vibezpink-600" : "text-vibezgreen-400";

    return (
        <main>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                    {/* TODO: Estils botons + botons més grans */}
                    <Button className={`${dialogColor} text-lg font-semibold text-white rounded-lg px-4 py-2 shadow-md transition-colors`}>
                        {title}
                    </Button>
                </DialogTrigger>
                <DialogContent className={cn("w-11/12 max-w-[450px]", "bg-slate-800 text-gray-200 rounded-2xl shadow-lg")}>
                    <DialogHeader>
                        <DialogTitle className={`text-3xl font-extrabold ${titleColor}`}>
                            {title}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="max-h-60 p-4 overflow-auto no-sscrollbar"> {/* Scrollable */}
                        <DialogDescription>
                            <ul className="list-none">
                                {list.map((item, index) => (
                                    <ListItem key={index} item={item} color={titleColor} />
                                ))}
                                {/* <li key={index}>{item}</li> */}
                            </ul>
                        </DialogDescription>
                    </div>
                    <DialogFooter>
                        <Button 
                            className={`${dialogColor} text-lg font-semibold text-white px-4 py-2 rounded-lg shadow-md transition-colors`}
                            onClick={() => setDialogOpen(false)}
                        >
                            Tancar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </main>
    )
};
