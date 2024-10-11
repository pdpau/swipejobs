import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    /* TODO: Responsive */
    /* TODO: Escollir tipus de lletra pel projecte */

    <>
      <main className="flex flex-col items-center h-screen overflow-auto no-scrollbar">
        <div
          className={cn(
            "h-screen w-1/2 p-4", 
            "flex flex-col justify-center", 
            "bg-white"
          )}
        >
          <h1 className="text-center text-6xl font-bold">
            #SwipeTalentYouz
          </h1>

          <img src="" alt="" /> {/* TODO: Imatge del estil del logo */}

          <div className="text-center mt-6"> {/* TODO: Button styles */}
            <Link href="/register-page">
              <Button className="">
                ¿Registra't o Començar?
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
