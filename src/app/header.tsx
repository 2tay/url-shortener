import Image from 'next/image';
import Link from 'next/link';

type HeaderProps = {
  setShowForm?: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Header({ setShowForm }: HeaderProps) {
  // Cette fonction sera utilisée uniquement si setShowForm est passé en props
  const handleShowForm = () => {
    if (setShowForm) {
      setShowForm(true);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-black p-2 z-20">
    <div className="container mx-auto flex justify-between items-center">
      {/* Logo + Texte aligné et déplacé vers la droite */}
      <div className="flex items-center space-x-2 pl-[130px]">
        <div>
          <Image src="/Orangelogo.png" alt="Orange logo" className="w-9 h-9" width={36} height={36} />
        </div>
        <div className="text-white">
          <div className="font-bold font-inter text-orange-400">Orange</div>
          <div className="font-bold font-inter">Digital Center Maroc</div>
        </div>
      </div>
      
      {/* Boutons déplacés vers la gauche */}
      <div className="flex space-x-2 mr-[100px]">
        <Link href="/login">
          <button className="border border-white text-white px-3 py-1 text-xs hover:bg-white hover:text-black transition-colors font-inter">
            se connecter
          </button>
        </Link>
        
        <Link href="/register">
          <button className="border border-white text-white px-3 py-1 text-xs hover:bg-white hover:text-black transition-colors font-inter">
            s'inscrire
          </button>
        </Link>
      </div>
    </div>
  </header>
  
  );
}