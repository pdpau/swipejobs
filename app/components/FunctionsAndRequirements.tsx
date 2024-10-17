"use client";

/* Imports */
import { useEffect, useState } from "react";


import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";



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
                    {/* TODO: Estils botons + botons més grans */}
                    <Button className="bg-pink-400 text-lg text-white rounded-lg">
                        {title}
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                    <div className="max-h-60 overflow-auto p-4"> {/* Scrollable */}
                        <DialogDescription>
                            <ul className="list-disc pl-5 text-sm text-gray-200">
                                {list.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                                {/* <ListItem2 key={index} item={item} /> */}
                            </ul>
                        </DialogDescription>
                    </div>
                    <DialogFooter>
                        <Button 
                            className="bg-pink-400 text-white px-4 py-2 rounded-lg"
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