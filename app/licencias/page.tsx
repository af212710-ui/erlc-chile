'use client';

import { useSession } from "next-auth/react";
import { useState } from "react";

function generateLicenseNumber(tipo: string): string {
  const prefix = tipo === 'conducir' ? 'LC' : 'LA';
  const number = Math.floor(10000000 + Math.random() * 90000000);
  return `${prefix}-${number}`;
}

export default function Licencias() {
  const { data: session } = useSession();
  const [licConducir, setLicConducir] = useState(false);
  const [licArmas, setLicArmas] = useState(false);
  const [licConducirNum, setLicConducirNum] = useState('');
  const [licArmasNum, setLicArmasNum] = useState('');
  const [loading, setLoading] = useState(false);

  const solicitarLicencia = async (tipo: 'conducir' | 'armas') => {
    setLoading(true);
    
    const newNum = generateLicenseNumber(tipo);
    
    if (tipo === 'conducir') {
      setLicConducir(true);
      setLicConducirNum(newNum);
    } else {
      setLicArmas(true);
      setLicArmasNum(newNum);
    }

    alert(`¡Licencia de ${tipo === 'conducir' ? 'Conducir' : 'Porte de Armas'} solicitada!\n\nNúmero: ${newNum}\n\n(En RP real esto pasaría por examen)`);
    setLoading(false);
  };

  if (!session) return <div className="min-h-screen flex items-center justify-center">Inicia sesión con Discord.</div>;

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-2">📜 Licencias Oficiales</h1>
        <p className="text-center text-slate-400 mb-10">Registro Civil y Carabineros de Chile - ER:LC</p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="rp-card p-8 rounded-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-6xl">🚗</div>
              <div>
                <h2 className="text-3xl font-bold">Licencia de Conducir</h2>
                <p className="text-emerald-400">Clase B - Vehículos Particulares</p>
              </div>
            </div>

            {licConducir ? (
              <div className="bg-green-950 border border-green-500 p-6 rounded-2xl">
                <p className="text-green-400 font-bold mb-2">✓ LICENCIA OTORGADA</p>
                <p className="font-mono text-2xl tracking-widest">{licConducirNum}</p>
                <p className="text-xs mt-4 text-green-300">Válida por 5 años • Registro Civil RP</p>
              </div>
            ) : (
              <button 
                onClick={() => solicitarLicencia('conducir')}
                disabled={loading}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-semibold text-lg"
              >
                Solicitar Licencia de Conducir
              </button>
            )}
          </div>

          <div className="rp-card p-8 rounded-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-6xl">🔫</div>
              <div>
                <h2 className="text-3xl font-bold">Licencia de Porte de Armas</h2>
                <p className="text-yellow-400">Clase A - Uso Deportivo / Defensa</p>
              </div>
            </div>

            {licArmas ? (
              <div className="bg-yellow-950 border border-yellow-500 p-6 rounded-2xl">
                <p className="text-yellow-400 font-bold mb-2">✓ LICENCIA OTORGADA</p>
                <p className="font-mono text-2xl tracking-widest">{licArmasNum}</p>
                <p className="text-xs mt-4 text-yellow-300">Requiere aprobación de Carabineros • Válida 3 años</p>
              </div>
            ) : (
              <button 
                onClick={() => solicitarLicencia('armas')}
                disabled={loading}
                className="w-full py-4 bg-yellow-600 hover:bg-yellow-700 rounded-2xl font-semibold text-lg"
              >
                Solicitar Licencia de Porte de Armas
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
