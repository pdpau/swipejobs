"use client"

/* Imports */
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
import toast, { Toaster } from 'react-hot-toast';

/* Import logos */
import LogoZ from "../public/logo_z.svg";


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
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (tlf: string) => {
    const phoneRegex = /^[0-9]{9}$/;
    return phoneRegex.test(tlf);
  };

  const handleRegister = async () => {
    // Validaciones
    if (!name || !surname || !email || !tlf) {
      toast.error('Todos los campos deben estar completos.');
      return;
    }
    if (!validateEmail(email)) {
      toast.error('El correo electrónico no es válido.');
      return;
    }
    if (!validatePhone(tlf)) {
      toast.error('El número de teléfono debe tener 9 dígitos.');
      return;
    }
    if (!conditionsAccepted) {
      toast.error('Debes aceptar los términos y condiciones.');
      return;
    }

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
      toast.error('Error al crear un usuario')
      // Maneja el error si el email ya está registrado o cualquier otro problema
    } else {
      const { data, error } = await supabase
        .from('users')
        .select()
        .eq('mail', email); // Filtrar por email
      if (error) {
        console.error('Error selecting user by email:', error.message);
      } else {
        toast.success('User Registered Succesfully!');
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
    <main className={cn("h-screen w-screen", "flex justify-center items-center", "bg-black")}>
      <div><Toaster /></div>

      <LogoZ
        className={cn(
          "absolute top-20 left-1/2 transform -translate-x-1/2", 
          "h-16 w-16",
          "max-h-logo-register-first:top-10 max-h-logo-register-second:hidden"
        )}
      />

      {/* Main container */}
      <div id="register-main-div" className={cn("w-full max-w-md h-3/4", "flex flex-col justify-center items-center space-y-8", "text-white")}>
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-white">
          #SwipeTalent<span className="text-vibezgreen-400">Youz</span> {/* TODO: Logo YOUZ */}
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
            className="w-5 h-5 mr-2 text-vibezgreen-400 bg-transparent border border-white"
          />
          <label htmlFor="accept-conditions" className="text-sm text-white">
            Accepto les condicions d'ús i la política de privacitat
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}> {/* TODO: ¿¿ Dialog background white or slate ?? */}
              <DialogTrigger asChild>
                <button className="underline text-vibezgreen-400">
                  Termes i Condicions d'Ús i Política de Privacitat
                </button>
              </DialogTrigger>
              <DialogContent className={cn("w-11/12 max-w-[450px]", "bg-slate-100", "rounded-2xl shadow-lg")}>
                <DialogHeader>
                  <DialogTitle className="text-slate-950">
                    Termes i Condicions d'Ús i Política de Privacitat
                  </DialogTitle>
                </DialogHeader>
                {/* Contenedor scrollable */}
                <div className="max-h-60 overflow-y-auto pr-4">
                  <DialogDescription className="text-slate-700">
                    <ul>
                    En acceptar aquests termes i condicions, vostè consenteix que Youz Talent processi i emmagatzemi les seves dades personals per als fins descrits a continuació. Aquests termes expliquen com recollim, utilitzem i protegim la seva informació personal, en compliment amb la normativa aplicable de protecció de dades.

                    </ul>
                    <ul className="list-disc pl-4 mt-4 space-y-2">
                      <li><strong>Dades Recollides:</strong> En registrar-se, recopilarem el nom complet, correu electrònic i número de telèfon per a l'enviament d'ofertes de treball i comunicacions rellevants.</li>
                      <li><strong>Propòsit del Tractament de Dades:</strong> Utilitzarem les dades per enviar ofertes de treball personalitzades i actualitzacions dels nostres serveis.</li> 
                      <li><strong>Newsletter:</strong> En acceptar aquests termes, vostè serà subscrit automàticament al nostre butlletí informatiu.</li>
                      <li><strong>Base Legal:</strong> El tractament es basa en el consentiment explícit de l'usuari.</li>
                      <li><strong>Conservació de Dades:</strong> Les dades es conservaran mentre mantingui el compte actiu o fins que sol·liciti la seva eliminació.</li>
                      <li><strong>Drets del Usuari:</strong> Accedir, rectificar o sol·licitar l'eliminació de les seves dades en qualsevol moment.</li>
                      <li><strong>Seguretat de Dades:</strong> Implementem mesures per garantir la seguretat de la seva informació.</li>
                      <li><strong>Modificacions:</strong> Youz Talent es reserva el dret de modificar aquests termes en qualsevol moment.</li>
                      <li><strong>Contacte:</strong> Per a qualsevol consulta, pot contactar amb nosaltres.</li>
                    </ul>
                  </DialogDescription>
                </div>

                <DialogFooter>
                  <Button
                    className="text-md font-bold text-slate-900 bg-vibezgreen-400 hover:bg-vibezgreen-600"
                    onClick={() => { setConditionsAccepted(true); setDialogOpen(false); }}
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
                "bg-vibezgreen-800 hover:bg-vibezgreen-600 active:bg-vibezgreen-400",
                "text-black font-bold text-lg",
                conditionsAccepted && name && surname && email && tlf ? "cursor-pointer" : "cursor-not-allowed opacity-50"
              )}
            /* disabled={!conditionsAccepted || !name || !surname || !email || !tlf} */
            >
              ¿Registrar datos?
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};
