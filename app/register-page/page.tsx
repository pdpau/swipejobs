"use client"

import { supabase } from '../../lib/supabaseClient';
import { useState } from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Router } from 'lucide-react';
import { useRouter } from 'next/navigation'
/* Main component */
export default function RegisterPage() {
  /* Variables */
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [tlf, setTlf] = useState("");
  const [userId, setUserId] = useState(null);
  const router = useRouter()

  //Variables funcionament SupaBase
  const [loading, setLoading] = useState(false)


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
    <main className={cn("h-screen w-screen my-10", "flex justify-center items-center")}>
      <div id="register-main-div" className={cn("w-1/3 h-2/3 rounded-3xl bg-[#f2f2f0]", "flex flex-col justify-center items-center space-y-5")}>
        {/* Title */}
        <div className="w-2/3 my-6 flex justify-center">
          <h1 className="font-bold text-2xl">Introduce tus datos</h1>
        </div>

        {/* Form */}
        <div className="w-2/3">
          <Input
            className="bg-[#c9c9c9] text-muted-foreground"
            type="text"
            name="name"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-2/3">
          <Input
            className="bg-[#c9c9c9] text-muted-foreground"
            type="text"
            name="surname"
            placeholder="Apellido"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
        <div className="w-2/3">
          <Input
            className="bg-[#c9c9c9] text-muted-foreground"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-2/3">
          <Input
            className="bg-[#c9c9c9] text-muted-foreground"
            type="tel"
            name="tlf"
            placeholder="Teléfono"
            value={tlf}
            onChange={(e) => setTlf(e.target.value)}
          />
        </div>

        {/* TODO: Aceptar condiciones */}

        {/* Submit button */}
        <div className="w-2/3 flex justify-center">
          {/* <Link href="/offers-page"> */}
            <Button type="submit" onClick={handleRegister} className="my-4 bg-[#ff6725] text-black">
              ¿Registrar datos?
            </Button>
          {/* </Link> */}
        </div>
      </div>
    </main>
  );
}



