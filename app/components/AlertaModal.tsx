"use client";

import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";

interface AlertaProps {
  alerta: {
    mensaje: string;
    tipo: "exito" | "advertencia" | "error";
  } | null;
  onCerrar: () => void;
}

export default function AlertaModal({ alerta, onCerrar }: AlertaProps) {
  if (!alerta) return null;

  return (
    <div
      onClick={onCerrar}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-slate-900 border-2 text-white p-6 rounded-2xl max-w-sm w-full text-center relative flex flex-col items-center cursor-default transition-all ${
          alerta.tipo === "exito"
            ? "border-emerald-500/80 shadow-[0_0_50px_rgba(16,185,129,0.35)]"
            : alerta.tipo === "error"
            ? "border-rose-500/80 shadow-[0_0_50px_rgba(244,63,94,0.35)]"
            : "border-amber-500/80 shadow-[0_0_50px_rgba(245,158,11,0.35)]"
        }`}
      >
        <button
          onClick={onCerrar}
          className="absolute top-3 right-3 text-slate-400 hover:text-white transition p-1"
        >
          <X size={18} />
        </button>

        <div
          className={`p-3 rounded-full border mb-3 ${
            alerta.tipo === "exito"
              ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
              : alerta.tipo === "error"
              ? "bg-rose-500/20 text-rose-400 border-rose-500/40"
              : "bg-amber-500/20 text-amber-400 border-amber-500/40"
          }`}
        >
          {alerta.tipo === "exito" ? (
            <CheckCircle size={32} />
          ) : alerta.tipo === "error" ? (
            <XCircle size={32} />
          ) : (
            <AlertCircle size={32} />
          )}
        </div>

        <span
          className={`text-xs font-black uppercase tracking-widest block mb-1 ${
            alerta.tipo === "exito"
              ? "text-emerald-400"
              : alerta.tipo === "error"
              ? "text-rose-400"
              : "text-amber-400"
          }`}
        >
          {alerta.tipo === "exito" ? "¡Éxito!" : alerta.tipo === "error" ? "Error" : "Aviso RETRO GAME DNF"}
        </span>

        <p className="text-sm font-bold text-slate-100 mb-5 leading-relaxed">{alerta.mensaje}</p>

        <button
          onClick={onCerrar}
          className={`font-black px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider transition shadow-lg w-full ${
            alerta.tipo === "exito"
              ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950"
              : alerta.tipo === "error"
              ? "bg-rose-500 hover:bg-rose-400 text-white"
              : "bg-amber-500 hover:bg-amber-400 text-slate-950"
          }`}
        >
          Entendido
        </button>
      </div>
    </div>
  );
}