"use client";

/* Imports */
import { useEffect, useState } from "react";


import { cn } from "@/lib/utils";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

import { ListItem } from "./ListItem";
import { GreenButton } from "./buttons/GreenButton";
import { PinkButton } from "./buttons/PinkButton";

/* Props */
type Props = {
    list: string[];
    title: string;
};

/* Main component */
export function FunctionsAndRequirements({ list, title }: Props) {
    /* Variables */
    const [dialogOpen, setDialogOpen] = useState(false);

    /* Condicionales de estilos (no se estan usando) */
    const isFunctions = title.toLowerCase() === "funcions";
    const dialogColor = isFunctions ? "bg-vibezpink-600 hover:bg-vibezpink-700" : "bg-vibezgreen-400 hover:bg-vibezgreen-500";
    const titleColor = isFunctions ? "text-vibezpink-600" : "text-vibezgreen-400";

    return (
        <main>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                    <PinkButton text={title} type="button" onClickFunction={() => setDialogOpen(true)} onTouchFunction={() => setDialogOpen(true)} />
                </DialogTrigger>
                <DialogContent className={cn("w-11/12 max-w-[450px]", "bg-slate-800 text-slate-200 rounded-2xl shadow-lg")}>
                    <DialogHeader>
                        <DialogTitle className={`text-3xl font-extrabold text-vibezpink-600`}> {/* ${titleColor} */}
                            {title}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="max-h-60 p-4 overflow-auto no-sscrollbar"> {/* Scrollable */}
                        <DialogDescription>
                            <ul className="list-none">
                                {list.map((item, index) => (
                                    <ListItem key={index} item={item} color="text-vibezpink-600" /> /* color={titleColor} */
                                ))}
                                {/* <li key={index}>{item}</li> */}
                            </ul>
                        </DialogDescription>
                    </div>
                    <DialogFooter>
                        <PinkButton text="Tancar" type="button" onClickFunction={() => setDialogOpen(false)} />
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </main>
    )
};
