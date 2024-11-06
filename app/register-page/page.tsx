"use client"

/* Imports */
import { supabase } from '../../lib/supabaseClient';

import { useState } from "react";
import { useRouter } from "next/navigation";

import { TermsAndConditions } from '../components/TermsAndConditions';

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

import toast, { Toaster } from 'react-hot-toast';

import { GreenButton } from "../components/buttons/GreenButton";

/* Import logos */
import LogoZ from "../../public/logo_z.svg";
import Youz from "../../public/youz.svg";


/* Main component */
export default function RegisterPage() {
  /* Variables */
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [tlf, setTlf] = useState("");
  const [conditionsAccepted, setConditionsAccepted] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  // const [userId, setUserId] = useState(null);
  const router = useRouter();

  if (typeof window !== "undefined") {
    localStorage.setItem('globalOfferIndex', '0');
  }

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
    // if(email != null){
    //   const { data, error2 } = await supabase
    //     .from('users')
    //     .select()
    //     .eq('mail', email); // Filtrar por email
    //   if (!error2) {
    //     console.log("SALTA ERROR MAIL Principi")
    //     toast.error('Aquest correu ja està registrat')
    //     return
    //   }
    // }
    if (!name || !surname || !email || !tlf) {
      toast.error('Cap camp pot estar buit');
      return;
    }
    if (!validateEmail(email)) {
      toast.error('El correu electrònic no és vàlid');
      return;
    }
    if (!validatePhone(tlf)) {
      toast.error('El número de telèfon ha de tenir 9 dígits');
      return;
    }
    if (!conditionsAccepted) {
      toast.error('Has de acceptar els termes i condicions');
      return;
    }

    /* TODO: Add user to DB */
    //  /* TODO: Exception if email already registered */
    //  /* TODO: ... */
    // console.log("Registering user...");
    // console.log("Name:", name);
    // console.log("Surname:", surname);
    // console.log("Email:", email);
    // console.log("Tlf:", tlf);

    const { error } = await supabase
      .from('users')
      .insert({ username: name, surname: surname, created_at: new Date(), mail: email, telephone: tlf, })
      .select();
    if (error) {
      if (error.code === '23505') { // Código de error de violación de unicidad en Postgres
        const { error: fetchError } = await supabase
          .from('users')
          .select()
          .eq('mail', email);
        
        if (fetchError) {
          toast.error('Error al verificar el correo');
          return;
        }
        toast.error('Aquest correu o numero de telefon ja està en ús');
        return;
      }
      toast.error('Error al crear un usuario');
      return;
    } else {
      const { data, error2 } = await supabase
        .from('users')
        .select()
        .eq('mail', email); // Filtrar por email
      if (error2) {
        // console.error('Error selecting user by email FINAL:', error.message);
        toast.error('Aquest correu ja està en ús dintre')
        return
      } else {
        toast.success('User Registered Succesfully!');
        const insertedUserId = data[0].id;
        // setUserId(insertedUserId);
        // Guardar el ID en localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem('userId', insertedUserId);
        }
        // console.log('Data Retrieved:', data);
        // console.log('User registered with ID:', insertedUserId);
        router.push('/offers-page'); // Redirigir a /offers-page
      }
      console.log('User registered successfully:');
    }
  };


  return (
    <main className={cn("h-screen w-screen", "flex justify-center items-center", "bg-slate-950")}>
      <div><Toaster /></div>

      <LogoZ
        className={cn(
          "absolute top-[8%] left-1/2 transform -translate-x-1/2",
          "h-16 w-16",
          "max-h-logo-register-first:top-[5%] max-h-logo-register-second:hidden max-h-logo-register-big:top-[23%]"
        )}
      />

      {/* Main container */}
      <div id="register-main-div" className={cn("w-full max-w-md h-3/4", "flex flex-col justify-center items-center space-y-8", "text-slate-100")}>
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-slate-100 flex justify-center items-center space-x-1.5">
          <p>#SwipeTalent</p>
          <Youz className="text-vibezgreen-400 h-24 w-24 pt-[20px]" />
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
              "bg-transparent text-slate-100 placeholder-slate-100 border-0",
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
              "bg-transparent text-slate-100 placeholder-slate-100 border-0",
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
              "bg-transparent text-slate-100 placeholder-slate-100 border-0",
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
              "bg-transparent text-slate-100 placeholder-slate-100 border-0",
              "focus-visible:ring-offset-0 focus-visible:ring-0",
              ""
            )}
            onChange={(e) => setTlf(e.target.value)}
          />
          <Separator />
        </div>

        {/* Aceptar condiciones */}
        <div className="w-4/5 flex items-start"> {/* TODO: Quadrar a dins del width del formulari */}
          <Checkbox
            id="accept-conditions"
            checked={conditionsAccepted}
            onCheckedChange={() => setConditionsAccepted(!conditionsAccepted)}
            className="w-5 h-5 mr-2 text-vibezgreen-400 bg-transparent border border-slate-100"
          />
          <label htmlFor="accept-conditions" className="text-sm text-slate-100">
            Accepto les condicions d&apos;ús i la política de privacitat
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}> {/* TODO: ¿¿ Dialog background white or slate ?? */}
              <DialogTrigger asChild>
                <button className="underline text-vibezgreen-400">
                  Termes i Condicions d&apos;Ús i Política de Privacitat
                </button>
              </DialogTrigger>
              <DialogContent className={cn("w-11/12 max-w-[450px]", "bg-slate-100", "rounded-2xl shadow-lg")}>
                <DialogHeader>
                  <DialogTitle className="text-slate-950">
                    Termes i Condicions d&apos;Ús i Política de Privacitat
                  </DialogTitle>
                </DialogHeader>
                {/* Contenedor scrollable */}
                <div className="max-h-60 overflow-y-auto pr-4">
                  <DialogDescription className="text-slate-700">
                    <TermsAndConditions />
                  </DialogDescription>
                </div>

                <DialogFooter>
                  <GreenButton
                    text="Acceptar"
                    type="button"
                    onClickFunction={() => { setConditionsAccepted(true); setDialogOpen(false); }}
                  />
                </DialogFooter>
              </DialogContent>
            </Dialog>

          </label>
        </div>


        {/* Submit button */}
        <div className="w-4/5 flex justify-center">
          <GreenButton
            text="Registrar Dades"
            type="submit"
            onClickFunction={handleRegister}
          /> {/* Working well !! */}
        </div>
      </div>
    </main>
  );
};
