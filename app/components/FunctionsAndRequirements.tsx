"use client";

/* Imports */
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

import { ListItem } from "./ListItem";
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

    return (
        <main>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                    <PinkButton text={title} type="button" onTouchFunction={() => setDialogOpen(true)} />
                </DialogTrigger>
                <DialogContent className={cn("w-11/12 max-w-[450px]", "bg-slate-800 text-slate-200 rounded-2xl shadow-lg")}>
                    <DialogHeader>
                        <DialogTitle className={`text-3xl font-extrabold text-vibezpink-600`}>
                            {title}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="max-h-60 px-4 overflow-y-auto no-scrollbar"> {/* Scrollable */}
                        <DialogDescription>
                            <ul className="list-none">
                                {list.map((item, index) => (
                                    <ListItem key={index} item={item} color="text-vibezpink-600" />
                                ))}
                            </ul>
                        </DialogDescription>
                    </div>
                    <DialogFooter>
                        <PinkButton text="Tancar" type="button" onTouchFunction={() => setDialogOpen(false)} />
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </main>
    );
};
