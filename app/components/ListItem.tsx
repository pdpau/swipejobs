"use client";

/* Import icons */
import { SiListmonk } from "react-icons/si";

type Props = {
    item: string;
    color: string;
};

export function ListItem({ item, color }: Props) {
    return (
        <li className="flex justify-start items-center space-x-2 my-2 text-justify pr-2">
            <div>
                <SiListmonk className={color} size={10} />
            </div>
            <div>
                <span className="text-slate-300 text-md font-medium">{item}</span>
            </div>
        </li>
    );
};
