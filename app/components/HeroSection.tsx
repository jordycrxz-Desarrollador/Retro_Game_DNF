"use client";

import { Gamepad2 } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative py-20 md:py-28 px-4 overflow-hidden border-b border-slate-900">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <span className="inline-flex items-center gap-2 bg-pink-500/10 text-pink-400 border border-pink-500/25 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
          <Gamepad2 size={16} /> Cobertura en Pachuca, CDMX y Estado de México
        </span>
        <h1 className="text-4xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
          Renta de <span className="text-yellow-400">Juegos Gigantes</span>, <br />
          <span className="bg-gradient-to-r from-sky-400 via-pink-500 to-yellow-400 text-transparent bg-clip-text">
            Mesas de Juego y Arcade
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
          Elige tu paquete promocional con selección de juegos personalizados y disponibilidad en tiempo real.
        </p>
      </div>
    </section>
  );
}