"use client"

import { supabase } from '../../lib/supabaseClient';
import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";


/* Main component */
export default function RegisterPage() {
  /* Variables */
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [tlf, setTlf] = useState("");
  const [conditionsAccepted, setConditionsAccepted] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const router = useRouter();


  /* Functions */
  const handleRegister = async () => {
    /* TODO: Add user to DB */
    //  /* TODO: Exception if email already registered */
    //  /* TODO: ... */
    console.log("Registering user...");
    console.log("Name:", name);
    console.log("Surname:", surname);
    console.log("Email:", email);
    console.log("Tlf:", tlf);

    const { error } = await supabase
      .from('users')
      .insert({ username: name, surname: surname, created_at: new Date(), mail: email, telephone: tlf, })

    if (error) {
      console.error('Error registering user:', error.message);
      // Maneja el error si el email ya está registrado o cualquier otro problema
    } else {
        const { data, error } = await supabase
        .from('users')
        .select()
        .eq('mail', email); // Filtrar por email
      if (error) {
        console.error('Error selecting user by email:', error.message);
      } else {
        const insertedUserId = data[0].id;
        setUserId(insertedUserId);
        // Guardar el ID en localStorage
          localStorage.setItem('userId', insertedUserId);
          console.log('Data Retrieved:', data);
          console.log('User registered with ID:', insertedUserId);
          router.push('/offers-page'); // Redirigir a /offers-page
      }
      console.log('User registered successfully:');
    }
  };

  return (
    /* TODO: Responsive */

    <main className={cn("h-screen w-screen", "flex justify-center items-center", "bg-black")}>
      <div id="register-main-div" className={cn("w-full max-w-md h-3/4", "flex flex-col justify-center items-center space-y-8", "text-white")}>
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-white"> {/* TODO: Youz style */}
          #SwipeTalent<span className="text-[#A4FF00]">Youz</span>
        </h1>

        {/* Form */}
        <div className="w-4/5 space-y-1">
          <Input 
            type="text"
            name="name"
            placeholder="NOM"
            value={name}
            autoComplete="off"
            className={cn(
              "bg-transparent text-white placeholder-white border-0", 
              "focus-visible:ring-offset-0 focus-visible:ring-0",
              ""
            )}
            onChange={(e) => setName(e.target.value)}
          />
          <Separator />
          <Input
            type="text"
            name="name"
            placeholder="COGNOMS"
            value={surname}
            autoComplete="off"
            className={cn(
              "bg-transparent text-white placeholder-white border-0", 
              "focus-visible:ring-offset-0 focus-visible:ring-0",
              ""
            )}
            onChange={(e) => setSurname(e.target.value)}
          />
          <Separator />
          <Input
            type="email"
            name="email"
            placeholder="EMAIL"
            value={email}
            autoComplete="off"
            className={cn(
              "bg-transparent text-white placeholder-white border-0", 
              "focus-visible:ring-offset-0 focus-visible:ring-0",
              ""
            )}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Separator />
          <Input
            type="tel"
            name="tlf"
            placeholder="TELÈFON"
            value={tlf}
            autoComplete="off"
            className={cn(
              "bg-transparent text-white placeholder-white border-0", 
              "focus-visible:ring-offset-0 focus-visible:ring-0",
              ""
            )}
            onChange={(e) => setTlf(e.target.value)}
          />
          <Separator />
        </div>

        {/* TODO: Aceptar condiciones */}
        <div className="w-4/5 flex items-start"> {/* TODO: Quadrar a dins del width del formulari */}
          <Checkbox 
            id="accept-conditions"
            checked={conditionsAccepted}
            onCheckedChange={() => setConditionsAccepted(!conditionsAccepted)}
            className="w-5 h-5 mr-2 text-[#A4FF00] bg-transparent border border-white"
          />
          <label htmlFor="accept-conditions" className="text-sm text-white">
            Accepto les condicions d'ús i la política de privacitat
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <button className="underline text-[#A4FF00]">
                  Termes i condicions
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Termes i condicions</DialogTitle>
                  <DialogDescription>
                    Aquests són els termes i condicions que has d'acceptar per poder continuar amb el registre.
                    <ul className="list-disc pl-4 mt-4">
                      <li>Termes i condició 1</li>
                      <li>Termes i condició 2</li>
                      <li>Termes i condició 3</li>
                    </ul>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button 
                    className="bg-[#A4FF00] text-black"
                    onClick={() => {setConditionsAccepted(true); setDialogOpen(false);}}
                  >
                    Acceptar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </label>
        </div>


        {/* Submit button */}
        <div className="w-4/5 flex justify-center">
          <Link href={conditionsAccepted && name && surname && email && tlf ? "/offers-page" : "#"}>
            <Button 
              type="submit" 
              onClick={handleRegister} 
              className={cn(
                "w-full py-3 rounded-full",
                "bg-[#A4FF00] hover:bg-[#8FE000] active:bg-[#6CC700]",
                "text-black font-bold text-lg",
                conditionsAccepted && name && surname && email && tlf ? "cursor-pointer" : "cursor-not-allowed opacity-50"
              )}
              /* disabled={!conditionsAccepted || !name || !surname || !email || !tlf} */
            >
              ¿Registrar datos?
            </Button>
          </Link>
        </div>

        {/* TODO: Footer (logo vibez) */}
        <div className="mt-10">
          {/* <p className="text-sm text-center text-white">© 2024 Nom de la empresa. Tots els drets reservats.</p> */}
        </div>
      </div>

      {/* TODO: Background waves */}
      {/* TODO: ¿¿¿Totes les pagines amb aquest background??? */}
      <div className="absolute top-0 left-0 w-full h-1/6 bg-gradient-to-t from-transparent to-pink-500">
        {/* Usar pseudo-elemento para la ola */}
        <div className="wave"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1/6 bg-gradient-to-b from-transparent to-pink-500">
        {/* Usar pseudo-elemento para la ola */}
        <div className="wave"></div>
      </div>
      <style jsx>
        {`
          .wave {
            /* TODO: Make it a waving wave */

          }
        `}
      </style>
    </main>
  );
}



