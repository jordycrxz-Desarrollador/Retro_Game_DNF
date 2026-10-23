"use client";

import { MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contacto" className="bg-slate-950 py-16 px-4 border-t border-slate-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <div>
          <span className="text-xl font-black text-white block mb-3">
            RETRO GAME <span className="text-yellow-400">DNF</span>
          </span>
          <p className="text-slate-400 text-xs leading-relaxed mb-4">
            Especialistas en renta de juegos inflables gigantes, consolas retro, máquinas arcade y atracciones de integración.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-black text-white uppercase tracking-wider mb-4">Atención y Cobertura</h4>
          <div className="space-y-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-sky-400 shrink-0" />
              <span>Tultepec, Pachuca, Estado de México, CDMX y Todo México.</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-black text-white uppercase tracking-wider mb-4">Horario de Atención</h4>
          <p className="text-xs text-slate-400 leading-relaxed mb-2">Lunes a Domingo: 8:00 AM - 10:00 PM</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-900 pt-6 text-center text-xs text-slate-500">
        © 2026 RETRO GAME DNF. Todos los derechos reservados.
      </div>
    </footer>
  );
}