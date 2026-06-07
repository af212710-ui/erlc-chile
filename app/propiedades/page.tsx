'use client';

import { useSession } from "next-auth/react";
import { useState } from "react";

const propiedades = [
  { id: 1, nombre: "Departamento Centro Santiago", precio: 85000000, tipo: "Departamento", ubicacion: "Santiago Centro" },
  { id: 2, nombre: "Casa en Viña del Mar", precio: 120000000, tipo: "Casa", ubicacion: "Viña del Mar" },
  { id: 3, nombre: "Penthouse Las Condes", precio: 250000000, tipo: "Penthouse", ubicacion: "Las Condes" },
  { id: 4, nombre: "Terreno en Puerto Montt", precio: 45000000, tipo: "Terreno", ubicacion: "Puerto Montt" },
];

export default function Propiedades() {
  const { data: session } = useSession();
  const [owned, setOwned] = useState<number[]>([]);
  const [message, setMessage] = useState("");

  if (!session) return <div className="min-h-screen flex items-center justify-center">Inicia sesión con Discord.</div>;

  const comprar = (prop: any) => {
    if (owned.includes(prop.id)) return;
    setOwned([...owned, prop.id]);
    setMessage(`✅ Compraste: ${prop.nombre} por $${prop.precio.toLocaleString('es-CL')}`);
    setTimeout(() => setMessage(""), 4000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-2">🏠 Propiedades RP</h1>
        <p className="text-center text-slate-400 mb-10">Compra casas, departamentos y terrenos en Chile Roleplay</p>

        {message && <div className="max-w-md mx-auto mb-6 p-4 bg-green-950 border border-green-500 rounded-xl text-center">{message}</div>}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {propiedades.map(prop => (
            <div key={prop.id} className="rp-card p-6 rounded-3xl flex flex-col">
              <div className="text-5xl mb-4">🏡</div>
              <h3 className="text-2xl font-bold mb-1">{prop.nombre}</h3>
              <p className="text-emerald-400 mb-4">{prop.ubicacion}</p>
              
              <div className="mt-auto">
                <div className="text-3xl font-mono mb-4">${prop.precio.toLocaleString('es-CL')}</div>
                
                {owned.includes(prop.id) ? (
                  <div className="py-3 text-center bg-green-600 rounded-2xl font-semibold">✓ Propiedad tuya</div>
                ) : (
                  <button 
                    onClick={() => comprar(prop)}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl font-semibold"
                  >
                    Comprar Propiedad
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
