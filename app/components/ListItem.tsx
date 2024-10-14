"use client";

/* Imports */
import { cn } from "@/lib/utils";


type Props = {
    item: string;
};

export function ListItem({ item }: Props) {
    /* TODO: Style each item */
    return (
        <div className={cn("", "")}>
            {item}
        </div>
    )
};