"use client";

/* Imports */
import { useEffect, useState } from "react";


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
    const dialogColor = isFunctions ? "bg-pink-500 hover:bg-pink-600" : "bg-green-500 hover:bg-green-600";
    const titleColor = isFunctions ? "text-pink-400" : "text-green-400";

    return (
        <main>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                    {/* TODO: Estils botons + botons més grans */}
                    <Button className={`${dialogColor} text-lg text-white rounded-lg px-4 py-2 shadow-md transition-colors`}>
                        {title}
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-11/12 max-w-[400px] bg-slate-800 text-gray-200 rounded-2xl shadow-lg">
                    <DialogHeader>
                        <DialogTitle className={`text-2xl font-bold ${titleColor}`}>
                            {title}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="max-h-60 overflow-auto p-4"> {/* Scrollable */}
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
                            className={`${dialogColor} text-white px-4 py-2 rounded-lg shadow-md transition-colors`}
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