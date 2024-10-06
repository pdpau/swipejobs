import Image from "next/image";
import Link from "next/link";


import { Button } from "@/components/ui/button";



export default function Home() {
  return (
    <>
      {/* TODO: Styles of the main page */}
      <main className="h-screen overflow-auto no-scrollbar flex justify-center items-center">
        {/* App title */}
        <h1>Hello Axel !!</h1>

        {/* Loading image */}
        <img src="" alt="" />

        {/* Button to enter registration page */}
        <Link href="/register-page">
          <Button>Register</Button>
        </Link>
      </main>
    </>
  );
}
