'use client';

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function StaffPanel() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<'money' | 'vehicle' | 'fine' | 'players'>('money');

  const [targetRun, setTargetRun] = useState("");
  const [amount, setAmount] = useState(0);
  const [vehicleModel, setVehicleModel] = useState("Toyota Hilux");
  const [fineAmount, setFineAmount] = useState(50000);
  const [fineReason, setFineReason] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const userRole = ((session?.user as any)?.role || '').toLowerCase();
  const isStaff = ['admin', 'staff', 'fundador', 'moderador'].includes(userRole);
  const isPolice = userRole.includes('carabineros') || userRole.includes('policia') || userRole.includes('pd');

  if (!session) return <div className="min-h-screen flex items-center justify-center">Inicia sesión.</div>;

  if (!isStaff) {
    return <div className="min-h-screen flex items-center justify-center text-center"><div><div className="text-6xl mb-4">🚫</div><h1 className="text-3xl font-bold">Acceso Denegado</h1><p className="text-slate-400">Necesitas rol de Staff</p></div></div>;
  }

  const doAction = (type: string) => {
    setLoading(true);
    setMessage("");

    setTimeout(() => {
      let msg = "";
      if (type === 'money_add') msg = `✅ +$${amount.toLocaleString('es-CL')} al RUN ${targetRun}`;
      if (type === 'money_remove') msg = `✅ -$${amount.toLocaleString('es-CL')} del RUN ${targetRun}`;
      if (type === 'give_vehicle') msg = `✅ Vehículo "${vehicleModel}" entregado al RUN ${targetRun}`;
      if (type === 'fine') msg = `✅ Multa de $${fineAmount.toLocaleString('es-CL')} aplicada a ${targetRun} por: ${fineReason}`;
      
      setMessage(msg);
      setLoading(false);
      setTargetRun("");
      setAmount(0);
      setFineReason("");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="text-6xl">🛡️</div>
          <div>
            <h1 className="text-5xl font-bold">Panel de Staff ER:LC</h1>
            <p className="text-xl text-slate-400">Gestión completa del servidor • Chile Roleplay</p>
          </div>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          {['money', 'vehicle', 'players'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-3 rounded-xl font-medium ${activeTab === tab ? 'bg-red-600' : 'bg-zinc-800 hover:bg-zinc-700'}`}
            >
              {tab === 'money' && '💰 Dinero'}
              {tab === 'vehicle' && '🚗 Vehículos'}
              {tab === 'players' && '👥 Jugadores'}
            </button>
          ))}
          {isPolice && (
            <button 
              onClick={() => setActiveTab('fine')}
              className={`px-6 py-3 rounded-xl font-medium ${activeTab === 'fine' ? 'bg-red-600' : 'bg-zinc-800 hover:bg-zinc-700'}`}
            >
              ⚠️ Multas (Carabineros)
            </button>
          )}
        </div>

        <div className="rp-card p-8 rounded-3xl">
          {activeTab === 'money' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Gestión de Dinero</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label>RUN del jugador</label>
                  <input value={targetRun} onChange={e => setTargetRun(e.target.value.toUpperCase())} placeholder="12345678-9" className="w-full p-4 bg-zinc-900 rounded-xl mt-2 font-mono" />
                </div>
                <div>
                  <label>Monto</label>
                  <input type="number" value={amount} onChange={e => setAmount(parseInt(e.target.value)||0)} className="w-full p-4 bg-zinc-900 rounded-xl mt-2" />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button onClick={() => doAction('money_add')} disabled={loading} className="flex-1 py-4 bg-emerald-600 rounded-2xl text-xl font-semibold">➕ Agregar Dinero</button>
                <button onClick={() => doAction('money_remove')} disabled={loading} className="flex-1 py-4 bg-red-600 rounded-2xl text-xl font-semibold">➖ Quitar Dinero</button>
              </div>
            </div>
          )}

          {activeTab === 'vehicle' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Entregar Vehículo</h2>
              <div className="space-y-4">
                <div>
                  <label>RUN del jugador</label>
                  <input value={targetRun} onChange={e => setTargetRun(e.target.value.toUpperCase())} className="w-full p-4 bg-zinc-900 rounded-xl mt-2" />
                </div>
                <div>
                  <label>Modelo del vehículo</label>
                  <input value={vehicleModel} onChange={e => setVehicleModel(e.target.value)} className="w-full p-4 bg-zinc-900 rounded-xl mt-2" />
                </div>
                <button onClick={() => doAction('give_vehicle')} className="w-full py-4 bg-blue-600 rounded-2xl text-xl font-semibold mt-4">🚗 Entregar Vehículo</button>
              </div>
            </div>
          )}

          {activeTab === 'fine' && isPolice && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Aplicar Multa</h2>
              <div className="space-y-4">
                <div><label>RUN</label><input value={targetRun} onChange={e => setTargetRun(e.target.value.toUpperCase())} className="w-full p-4 bg-zinc-900 rounded-xl" /></div>
                <div><label>Monto de la multa</label><input type="number" value={fineAmount} onChange={e => setFineAmount(parseInt(e.target.value)||0)} className="w-full p-4 bg-zinc-900 rounded-xl" /></div>
                <div><label>Motivo</label><input value={fineReason} onChange={e => setFineReason(e.target.value)} placeholder="Exceso de velocidad" className="w-full p-4 bg-zinc-900 rounded-xl" /></div>
                <button onClick={() => doAction('fine')} className="w-full py-4 bg-orange-600 rounded-2xl text-xl font-semibold">⚠️ Aplicar Multa</button>
              </div>
            </div>
          )}

          {activeTab === 'players' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Jugadores Online (Simulado)</h2>
              <div className="space-y-3">
                {['12345678-9 - Juan Pérez', '23456789-K - María López', '34567890-1 - Pedro Gómez'].map((p, i) => (
                  <div key={i} className="p-4 bg-zinc-900 rounded-xl flex justify-between items-center">
                    <span>{p}</span>
                    <button onClick={() => { setTargetRun(p.split(' - ')[0]); setActiveTab('money'); }} className="text-sm px-4 py-1 bg-zinc-700 rounded">Gestionar</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {message && <div className="mt-6 p-4 bg-green-950 border border-green-500 rounded-xl text-center">{message}</div>}
        </div>
      </div>
    </div>
  );
}
