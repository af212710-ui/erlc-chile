'use client';

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Banco() {
  const { data: session } = useSession();
  const [saldo, setSaldo] = useState(5000);
  const [monto, setMonto] = useState(1000);
  const [historial, setHistorial] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!session) return;
      try {
        const res = await fetch('/api/cedula');
        if (res.ok) {
          const data = await res.json();
          if (data.user?.saldo) {
            setSaldo(parseFloat(data.user.saldo));
          }
        }
      } catch (e) {}
      setLoading(false);
    };
    loadData();
  }, [session]);

  const realizarTransaccion = async (tipo: 'deposito' | 'retiro') => {
    if (!monto || monto <= 0) {
      return alert('Monto inválido');
    }

    if (tipo === 'retiro' && monto > saldo) {
      return alert('Saldo insuficiente');
    }

    if (monto > 5000000000) {
      return alert('Monto demasiado alto. Contacta a staff.');
    }

    if (monto < 1) {
      return alert('El monto mínimo es $1');
    }

    const nuevoSaldo = tipo === 'deposito' ? saldo + monto : saldo - monto;

    if (nuevoSaldo < 0 || isNaN(nuevoSaldo)) {
      return alert('Error en la transacción');
    }

    setSaldo(nuevoSaldo);

    const transaccion = {
      tipo,
      monto,
      fecha: new Date().toLocaleString('es-CL'),
      saldo: nuevoSaldo
    };

    setHistorial([transaccion, ...historial]);
    setMonto(1000);

    console.log(`[BANCO-LOG] Usuario ${session?.user?.id} realizó ${tipo} de $${monto}`);

    alert(`${tipo === 'deposito' ? 'Depósito' : 'Retiro'} de $${monto.toLocaleString('es-CL')} realizado.`);
  };

  if (!session) return <div className="min-h-screen flex items-center justify-center">Inicia sesión con Discord.</div>;

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8">🏦 Banco Estado RP</h1>

        <div className="rp-card p-8 rounded-3xl mb-8">
          <div className="text-center mb-8">
            <p className="text-sm text-slate-400">Saldo Actual</p>
            <p className="text-7xl font-mono font-bold text-emerald-400">
              ${saldo.toLocaleString('es-CL')}
            </p>
            <p className="text-xs text-slate-500 mt-1">CLP • Cuenta RP #{session.user?.id?.slice(0,8)}</p>
          </div>

          <div className="flex gap-4 mb-6">
            <input 
              type="number" 
              value={monto} 
              onChange={(e) => setMonto(Math.max(0, parseInt(e.target.value) || 0))} 
              className="flex-1 p-4 bg-zinc-900 border border-slate-700 rounded-xl text-xl" 
            />
            <button 
              onClick={() => realizarTransaccion('deposito')}
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-semibold"
            >
              Depositar
            </button>
            <button 
              onClick={() => realizarTransaccion('retiro')}
              className="px-8 py-4 bg-red-600 hover:bg-red-700 rounded-xl font-semibold"
            >
              Retirar
            </button>
          </div>
        </div>

        {historial.length > 0 && (
          <div className="rp-card p-6 rounded-2xl">
            <h3 className="font-semibold mb-4">Historial de Transacciones</h3>
            <div className="space-y-3">
              {historial.map((t, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-zinc-900 rounded-lg">
                  <div>
                    <span className={t.tipo === 'deposito' ? 'text-emerald-400' : 'text-red-400'}>
                      {t.tipo === 'deposito' ? '↑ Depósito' : '↓ Retiro'}
                    </span>
                    <span className="ml-3 text-sm text-slate-400">{t.fecha}</span>
                  </div>
                  <div className="text-right">
                    <div className={t.tipo === 'deposito' ? 'text-emerald-400' : 'text-red-400'}>
                      {t.tipo === 'deposito' ? '+' : '-'}$ {t.monto.toLocaleString('es-CL')}
                    </div>
                    <div className="text-xs text-slate-500">Saldo: ${t.saldo.toLocaleString('es-CL')}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
