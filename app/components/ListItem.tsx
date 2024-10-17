"use client";

/* Imports */
import { cn } from "@/lib/utils";

/* Import icons */
import { FaCheckCircle } from "react-icons/fa";

type Props = {
    item: string;
    color: string;
};

export function ListItem({ item, color }: Props) {
    return (
        <li className="flex items-center space-x-2 py-1">
            <FaCheckCircle className={color} /> {/* TODO: Cambiar icono antes del texto */}
            <span className="text-gray-200 text-lg font-medium">{item}</span>
        </li>
    )
};