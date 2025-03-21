import Image from 'next/image';
import { useState } from 'react';
import { RegisterForm } from "@/components/auth/register-form";

type HeaderProps = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Header({ setShowForm }: HeaderProps) {
  const handleClick = () => {
    setShowForm(true); // Afficher le formulaire
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-black p-2 z-20">
      <div className="container mx-auto flex justify-between items-center space-x-0">
        <div className="flex items-center space-x-2">
          <div>
            <Image src="/Orangelogo.png" alt="Orange logo" className="w-9 h-9" width={36} height={36} />
          </div>
          <div className="text-white">
            <div className="font-bold font-inter text-orange-400">Orange</div>
            <div className="font-bold font-inter">Digital Center Maroc</div>
          </div>
        </div>
        <button
          onClick={handleClick}
          className="border border-white text-white px-3 py-1 text-xs hover:bg-white hover:text-black transition-colors font-inter"
        >
          login 
        </button>
      </div>
    </header>
  );
}
