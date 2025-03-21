"use client"; // Indique que ce composant est côté client

import { Footer } from "./footer";
import { Header } from "./header";
import Image from 'next/image';
import { useState } from 'react';
import Link from "next/link";
import { UrlShortenerForm } from '../components/urls/url-shortener-form';
import { RegisterForm } from "@/components/auth/register-form";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [showFormlien, setShowFormlien] = useState(false);

  const handleClick = () => {
    setShowForm(!showForm); // Basculer l'affichage du formulaire
  };
  const handleClicke = () => {
    setShowFormlien(!showFormlien); // Basculer l'affichage du formulaire
  };

  return (
    <div className="flex flex-1 flex-col min-h-screen relative">
      {/* Image de fond */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background-pattern.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-5"
          priority
        />
      </div>

      <main className="flex-1 flex flex-col items-center justify-start px-6 py-12 max-w-7xl mx-auto w-full relative z-10 mt-12">
        {/* Section principale - Titre et description */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Header setShowForm={setShowForm} /> {/* Passer la fonction setShowForm */}

          {/* Affichage conditionnel du formulaire */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className={`flex-1 ${showForm ? 'md:w-1/2' : 'w-full'}`}>
              {!showForm && (
                <>
                  <div className="bg-orange-50 text-orange-500 px-4 py-2 rounded-full inline-flex items-center mb-6">
                    <span className="bg-orange-500 w-3 h-3 rounded-full mr-2"></span>
                    <span className="font-medium">Simplifiez vos liens, amplifiez votre impact</span>
                  </div>

                  <h1 className="text-gray-900 text-4xl md:text-6xl font-bold tracking-tight mb-8">
                    Rendez vos liens <span className="text-orange-500">simples et élégants</span>
                  </h1>

                  <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                    Transformez des URLs longues et complexes en liens courts et faciles à partager en quelques secondes.
                    Notre plateforme offre une manière simple et efficace de créer des liens courts pour tous vos besoins.
                  </p>

                  <div className="flex flex-wrap gap-4 justify-center mb-16">
                    <button
                      onClick={handleClicke}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-medium flex items-center transition-colors duration-300"
                    >
                      Essayez maintenant
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>

                    <Link href="/about" className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg font-medium transition-colors duration-300">
                      En savoir plus
                    </Link>
                  </div>

                  {/* Trois avantages en colonnes */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                      <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-orange-500">Liens courts</h3>
                      <p className="text-gray-600">Transformez vos URLs longues en liens courts et mémorables</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                      <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-orange-500">Statistiques détaillées</h3>
                      <p className="text-gray-600">Suivez les performances de vos liens avec des analyses précises</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                      <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-orange-500">Sécurité optimale</h3>
                      <p className="text-gray-600">Protégez vos liens avec des options de sécurité avancées</p>
                    </div>
                  </div>
                </>
              )}
            </div>
            {showForm && (
  <div className="w-screen h-full bg-gradient-to-r from-orange-400 to-white rounded-lg shadow-lg flex-grow">
    <RegisterForm /> {/* Afficher le formulaire dans un div stylisé */}
  </div>
)}


            {/* Formulaire à droite */}
            {showFormlien && (
              <div className="max-w-screen max-h-screen mx-auto  p-6 bg-white">
                <UrlShortenerForm  /> {/* Afficher le formulaire dans un div stylisé */}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}