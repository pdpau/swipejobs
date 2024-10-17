import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SwipeJobs",
  description: "Swipe until you find your dream job!",
};


/* TODO: Color lila per la web == #d406cb */
/* TODO: Color verd per la web == #ccfe3e */

export default function RootLayout({ children, }: Readonly<{children: React.ReactNode;}>) {

  return (
    <html lang="en">
      <body className="relative min-h-screen">

        {/* Renderizar el contenido de cada página */}
        <div className="relative">
          {children}
        </div>

        {/* Estilo de la ola */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 20 150 28" preserveAspectRatio="none" shape-rendering="auto">
            <defs>
              {/* <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" /> */} {/* viewBox 0 24 150 28 */}
              <path id="gentle-wave" d="M-160 44c30 0 58-20 88-20s 58 20 88 20 58-20 88-20 58 20 88 20 v60h-352z" /> {/* viewBox 0 24 150 40 */}
              {/* <path id="gentle-wave" d="M-160 44c30 0 58-40 88-40s 58 40 88 40 58-40 88-40 58 40 88 40 v80h-352z" /> */} {/* viewBox 0 24 150 80 */}
            </defs>
            <g className="parallax">
              <use href="#gentle-wave" x="48" y="0" fill="rgba(212,9,199,0.7)" />
              <use href="#gentle-wave" x="48" y="3" fill="rgba(212,9,199,0.5)" />
              <use href="#gentle-wave" x="48" y="5" fill="rgba(212,9,199,0.3)" />
              <use href="#gentle-wave" x="48" y="7" fill="rgba(212,9,199)" />
            </g>
          </svg>
        </div>
      </body>
    </html>
  );
};
