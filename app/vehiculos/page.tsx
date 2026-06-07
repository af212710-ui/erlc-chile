'use client';

import { useSession } from "next-auth/react";
import { useState } from "react";

const vehiculosERLC = [
  { id: 1, marca: "Toyota", modelo: "Hilux", precio: 45000000, categoria: "Pickup" },
  { id: 2, marca: "Chevrolet", modelo: "Silverado", precio: 52000000, categoria: "Pickup" },
  { id: 3, marca: "Ford", modelo: "Ranger", precio: 48000000, categoria: "Pickup" },
  { id: 4, marca: "Toyota", modelo: "Corolla", precio: 18500000, categoria: "Sedán" },
  { id: 5, marca: "Hyundai", modelo: "Accent", precio: 16500000, categoria: "Sedán" },
  { id: 6, marca: "Kia", modelo: "Rio", precio: 15800000, categoria: "Sedán" },
  { id: 7, marca: "Nissan", modelo: "Frontier", precio: 49500000, categoria: "Pickup" },
  { id: 8, marca: "Mitsubishi", modelo: "L200", precio: 47000000, categoria: "Pickup" },
  { id: 9, marca: "Volkswagen", modelo: "Amarok", precio: 51000000, categoria: "Pickup" },
  { id: 10, marca: "BMW", modelo: "X5", precio: 125000000, categoria: "SUV" },
  { id: 11, marca: "Mercedes", modelo: "G-Class", precio: 185000000, categoria: "SUV" },
  { id: 12, marca: "Audi", modelo: "Q7", precio: 98000000, categoria: "SUV" },
];

export default function Vehiculos() {
  const { data: session } = useSession();
  const [owned, setOwned] = useState<number[]>([]);
  const [message, setMessage] = useState("");

  if (!session) return <div className="min-h-screen flex items-center justify-center">Inicia sesión con Discord.</div>;

  const comprar = (v: any) => {
    if (owned.includes(v.id)) return;
    setOwned([...owned, v.id]);
    setMessage(`✅ Compraste ${v.marca} ${v.modelo} por $${v.precio.toLocaleString('es-CL')}`);
    setTimeout(() => setMessage(""), 4000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-6xl font-bold mb-2">🚗 Concesionario ERLC</h1>
          <p className="text-2xl text-slate-400">Vehículos oficiales del servidor • Precios IC</p>
        </div>

        {message && (
          <div className="max-w-md mx-auto mb-8 p-4 bg-green-950 border border-green-500 rounded-xl text-center">{message}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {vehiculosERLC.map(v => (
            <div key={v.id} className="rp-card p-6 rounded-3xl flex flex-col">
              <div className="text-6xl mb-4 text-center">🚙</div>
              <div>
                <h3 className="text-2xl font-bold">{v.marca} {v.modelo}</h3>
                <p className="text-sm text-slate-400 mb-4">{v.categoria}</p>
              </div>
              
              <div className="mt-auto">
                <div className="text-3xl font-mono mb-4 text-emerald-400">
                  ${v.precio.toLocaleString('es-CL')}
                </div>
                
                {owned.includes(v.id) ? (
                  <div className="text-center py-3 bg-green-600 rounded-2xl">✓ En tu garage</div>
                ) : (
                  <button 
                    onClick={() => comprar(v)}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl font-semibold transition-all"
                  >
                    Comprar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-10 text-xs text-slate-500">Precios IC realistas para Chile Roleplay. Vehículos disponibles en ERLC.</p>
      </div>
    </div>
  );
}
