'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div className="flex items-center justify-center min-h-screen">Cargando...</div>;

  return (
    <div className="min-h-screen rp-dark text-white">
      {/* Header */}
      <header className="border-b border-slate-700 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="text-3xl font-bold text-red-500">🇨🇱 ER:LC</div>
            <div>
              <div className="text-xl font-semibold">Elite Chile Roleplay</div>
              <div className="text-xs text-slate-400">Comunidad Oficial ER:LC Roblox</div>
            </div>
          </div>

          <nav className="flex items-center gap-6">
            {session ? (
              <>
                <Link href="/dashboard" className="hover:text-red-400">Dashboard</Link>
                <Link href="/cedula" className="hover:text-red-400">Cédula</Link>
                <Link href="/banco" className="hover:text-red-400">Banco</Link>
                <Link href="/tarjeta" className="hover:text-red-400">Tarjeta</Link>
                <Link href="/licencias" className="hover:text-red-400">Licencias</Link>
                <Link href="/casino" className="hover:text-yellow-400">🎰 Casino</Link>
                <Link href="/propiedades" className="hover:text-red-400">🏠 Propiedades</Link>
                <Link href="/trabajos" className="hover:text-red-400">💼 Trabajos</Link>
                <Link href="/inversiones" className="hover:text-emerald-400">📈 Inversiones</Link>
                <Link href="/vehiculos" className="hover:text-red-400">🚗 Vehículos</Link>
                <Link href="/historia" className="hover:text-red-400">📖 Nuestra Historia</Link>
                {['carabineros', 'admin'].includes(session.user?.role || '') && (
                  <Link href="/policial" className="hover:text-red-400 text-yellow-400">🚔 Portal Carabineros</Link>
                )}
                {['pdi', 'investigaciones', 'admin'].includes(session.user?.role || '') && (
                  <Link href="/pdi" className="hover:text-blue-400">🕵️ Portal PDI</Link>
                )}
                <button onClick={() => signOut()} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded">Salir</button>
              </>
            ) : (
              <button 
                onClick={() => signIn('discord')}
                className="px-6 py-3 bg-[#5865F2] hover:bg-[#4752C4] rounded font-medium flex items-center gap-2"
              >
                <span>🔗 Iniciar con Discord</span>
              </button>
            )}
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-20 text-center">
        <div className="mb-12">
          <h1 className="text-7xl font-bold mb-6 tracking-tighter">
            Bienvenido a <span className="text-red-500">ER:LC</span>
          </h1>
          <p className="text-2xl text-slate-300 max-w-2xl mx-auto">
            Elite Chile Roleplay • La experiencia más realista de Chile dentro de ER:LC en Roblox
          </p>
          <p className="mt-4 text-lg text-slate-400 max-w-xl mx-auto">
            Donde cada acción tiene consecuencias y tu historia importa.
          </p>
        </div>

        {!session && (
          <div className="max-w-md mx-auto">
            <button 
              onClick={() => signIn('discord')}
              className="w-full py-6 text-2xl bg-[#5865F2] hover:bg-[#4752C4] rounded-xl font-semibold transition-all active:scale-95"
            >
              Ingresar con Discord
            </button>
            <p className="mt-6 text-slate-400">Obligatorio para crear tu personaje RP</p>
          </div>
        )}

        {session && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Link href="/cedula" className="rp-card p-8 rounded-2xl hover:border-red-500 transition-all group">
              <div className="text-5xl mb-4">🪪</div>
              <h3 className="text-2xl font-semibold mb-2">Cédula de Identidad</h3>
              <p className="text-slate-400">Crea tu RUN chileno oficial</p>
            </Link>
            
            <Link href="/banco" className="rp-card p-8 rounded-2xl hover:border-emerald-500 transition-all group">
              <div className="text-5xl mb-4">🏦</div>
              <h3 className="text-2xl font-semibold mb-2">Banco Estado RP</h3>
              <p className="text-slate-400">Gestiona tu economía</p>
            </Link>

            <Link href="/tarjeta" className="rp-card p-8 rounded-2xl hover:border-blue-500 transition-all group">
              <div className="text-5xl mb-4">💳</div>
              <h3 className="text-2xl font-semibold mb-2">Tarjeta Bancaria</h3>
              <p className="text-slate-400">Tu tarjeta de débito chilena</p>
            </Link>

            <Link href="/licencias" className="rp-card p-8 rounded-2xl hover:border-yellow-500 transition-all group">
              <div className="text-5xl mb-4">📜</div>
              <h3 className="text-2xl font-semibold mb-2">Licencias</h3>
              <p className="text-slate-400">Conducir y Porte de Armas</p>
            </Link>

            <Link href="/casino" className="rp-card p-8 rounded-2xl hover:border-yellow-500 transition-all group">
              <div className="text-5xl mb-4">🎰</div>
              <h3 className="text-2xl font-semibold mb-2">Casino RP</h3>
              <p className="text-slate-400">Ruleta, Slots y más</p>
            </Link>

            <Link href="/propiedades" className="rp-card p-8 rounded-2xl hover:border-blue-500 transition-all group">
              <div className="text-5xl mb-4">🏠</div>
              <h3 className="text-2xl font-semibold mb-2">Propiedades</h3>
              <p className="text-slate-400">Compra casas y departamentos</p>
            </Link>

            <Link href="/trabajos" className="rp-card p-8 rounded-2xl hover:border-emerald-500 transition-all group">
              <div className="text-5xl mb-4">💼</div>
              <h3 className="text-2xl font-semibold mb-2">Trabajos y Facciones</h3>
              <p className="text-slate-400">Encuentra tu rol</p>
            </Link>

            <Link href="/inversiones" className="rp-card p-8 rounded-2xl hover:border-purple-500 transition-all group">
              <div className="text-5xl mb-4">📈</div>
              <h3 className="text-2xl font-semibold mb-2">Inversiones</h3>
              <p className="text-slate-400">Haz crecer tu dinero</p>
            </Link>

            <Link href="/vehiculos" className="rp-card p-8 rounded-2xl hover:border-red-500 transition-all group">
              <div className="text-5xl mb-4">🚗</div>
              <h3 className="text-2xl font-semibold mb-2">Concesionario ERLC</h3>
              <p className="text-slate-400">Todos los vehículos del servidor</p>
            </Link>

            <Link href="/historia" className="rp-card p-8 rounded-2xl hover:border-red-500 transition-all group">
              <div className="text-5xl mb-4">📖</div>
              <h3 className="text-2xl font-semibold mb-2">Nuestra Historia</h3>
              <p className="text-slate-400">Cómo nació Elite Chile RP</p>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
