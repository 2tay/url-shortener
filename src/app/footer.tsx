"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black py-2 fixed bottom-0 w-full"> 
    <div className="container mx-auto px-4 max-w-9xl">
      <div className="flex justify-between items-center w-full">
        {/* Déplacer "© Orange 2025" un peu vers la droite */}
        <span className="text-sm text-white pl-18 ml-18">© Orange 2025</span>
  
        {/* Déplacer "Accessibility statement Contact" un peu vers la gauche */}
        <div className="flex space-x-7 mr-18">
          <Link href="/accessibility" className="text-sm text-white hover:text-orange-500">
            Accessibility statement
          </Link>
          <Link href="/contact" className="text-sm text-white hover:text-orange-500">
            Contact
          </Link>
        </div>
      </div>
    </div>
  </footer>
  
  );
}
