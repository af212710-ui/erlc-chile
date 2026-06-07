'use client';

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Cedula() {
  const { data: session } = useSession();
  const [run, setRun] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [apellidoP, setApellidoP] = useState("");
  const [apellidoM, setApellidoM] = useState("");
  const [edad, setEdad] = useState(25);
  const [genero, setGenero] = useState("Masculino");
  const [direccion, setDireccion] = useState("");
  const [saving, setSaving] = useState(false);
  const [existingCedula, setExistingCedula] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCedula = async () => {
      if (!session) return;
      try {
        const res = await fetch('/api/cedula');
        if (res.ok) {
          const data = await res.json();
          if (data.user?.run) {
            setExistingCedula(data.user);
            setRun(data.user.run);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadCedula();
  }, [session]);

  const createCedula = async () => {
    if (!session || !name || !apellidoP) return;
    setSaving(true);
    
    try {
      const res = await fetch('/api/cedula', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: name,
          apellidoPaterno: apellidoP,
          apellidoMaterno: apellidoM,
          edad,
          genero,
          direccion,
        })
      });

      const data = await res.json();
      
      if (data.success) {
        setRun(data.run);
        setExistingCedula({
          run: data.run,
          fullName: name,
          apellidoPaterno: apellidoP,
          apellidoMaterno: apellidoM,
          edad,
          genero,
          direccion
        });
        alert(`¡Cédula creada exitosamente!\n\nRUN: ${data.run}`);
      } else {
        alert('Error: ' + (data.error || 'No se pudo crear la cédula'));
      }
    } catch (error) {
      alert('Error de conexión');
    } finally {
      setSaving(false);
    }
  };

  if (!session) return <div className="min-h-screen flex items-center justify-center">Debes iniciar sesión con Discord.</div>;
  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-2xl mx-auto rp-card p-10 rounded-3xl">
        <h1 className="text-5xl font-bold text-center mb-8">🪪 Cédula de Identidad</h1>
        
        {existingCedula || run ? (
          <div className="bg-green-950 border border-green-500 p-8 rounded-2xl text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-3xl font-bold mb-4">Cédula Oficial Registrada</h2>
            <div className="text-5xl font-mono tracking-widest mb-6 text-green-400">
              {existingCedula?.run || run}
            </div>
            
            <div className="text-left bg-black/30 p-6 rounded-xl mb-6">
              <p><strong>Nombre:</strong> {existingCedula?.fullName || name}</p>
              <p><strong>RUN:</strong> {existingCedula?.run || run}</p>
              <p><strong>Edad:</strong> {existingCedula?.edad || edad} años</p>
              <p><strong>Género:</strong> {existingCedula?.genero || genero}</p>
              {existingCedula?.direccion && <p><strong>Dirección:</strong> {existingCedula.direccion}</p>}
            </div>
            
            <p className="text-green-400 text-sm">Este RUN es único y oficial para ER:LC</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-sm mb-2">Nombre</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="w-full p-4 bg-zinc-900 border border-slate-700 rounded-xl" 
                placeholder="Juan" 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>Apellido Paterno</label>
                <input type="text" value={apellidoP} onChange={(e) => setApellidoP(e.target.value)} className="w-full p-4 bg-zinc-900 border border-slate-700 rounded-xl" placeholder="Pérez" />
              </div>
              <div>
                <label>Apellido Materno</label>
                <input type="text" value={apellidoM} onChange={(e) => setApellidoM(e.target.value)} className="w-full p-4 bg-zinc-900 border border-slate-700 rounded-xl" placeholder="González" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>Edad</label>
                <input type="number" value={edad} onChange={(e) => setEdad(parseInt(e.target.value))} className="w-full p-4 bg-zinc-900 border border-slate-700 rounded-xl" />
              </div>
              <div>
                <label>Género</label>
                <select value={genero} onChange={(e) => setGenero(e.target.value)} className="w-full p-4 bg-zinc-900 border border-slate-700 rounded-xl">
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
            </div>

            <div>
              <label>Dirección (opcional)</label>
              <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} className="w-full p-4 bg-zinc-900 border border-slate-700 rounded-xl" placeholder="Av. Principal 1234, Santiago" />
            </div>

            <button 
              onClick={createCedula}
              disabled={saving || !name || !apellidoP}
              className="w-full py-5 bg-red-600 hover:bg-red-700 text-xl font-semibold rounded-2xl disabled:opacity-50 transition-all"
            >
              {saving ? "Generando RUN oficial..." : "Generar y Registrar Cédula Oficial"}
            </button>

            <p className="text-center text-xs text-slate-500">El RUN es asignado automáticamente por el sistema y es único e irrepetible.</p>
          </div>
        )}
      </div>
    </div>
  );
}
