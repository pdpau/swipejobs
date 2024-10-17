"use client";

/* Imports */
import { cn } from "@/lib/utils";


type Props = {
    item: string;
};

export function ListItem({ item }: Props) {
    /* TODO: Style each item */
    return (
        <li className={cn("my-1 p-2", "bg-gray-100 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 transition-all duration-300")}>
            {item}
        </li>
    )
};