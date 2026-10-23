"use client";

import { useState } from "react";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface NavbarProps {
  usuario: SupabaseUser | null;
  cotizacionLength: number;
  onAbrirAuth: () => void;
  onAbrirPerfil: () => void;
  onAbrirCarrito: () => void;
}

export default function Navbar({ usuario, cotizacionLength, onAbrirAuth, onAbrirPerfil, onAbrirCarrito }: NavbarProps) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const nombreUsuario = usuario?.user_metadata?.full_name || usuario?.email?.split("@")[0] || "Mi Cuenta";

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* LOGO Y NOMBRE CON ACCIÓN DE SUBIR AL INICIO */}
        <div
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group"
          title="Ir al inicio"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-dnf. PNG"
            alt="Logo RETRO GAME DNF"
            className="h-11 sm:h-14 w-auto object-contain drop-shadow-[0_0_8px_rgba(56,189,248,0.5)] group-hover:scale-105 transition"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const fallback = document.getElementById("logo-fallback");
              if (fallback) fallback.style.display = "flex";
            }}
          />
          <div
            id="logo-fallback"
            className="hidden bg-sky-500 text-white p-2.5 rounded-xl font-black text-xl tracking-wider items-center justify-center"
          >
            DNF
          </div>
          <div>
            <span className="text-sm sm:text-xl font-black text-white block leading-none tracking-tight group-hover:text-sky-400 transition">
              RETRO GAME <span className="text-yellow-400">DNF</span>
            </span>
            <span className="text-[8px] sm:text-[10px] text-sky-400 font-bold uppercase tracking-wider block mt-1">
              Juegos Gigantes & Arcade
            </span>
          </div>
        </div>

        {/* MENÚ DE NAVEGACIÓN (ESCRITORIO) */}
        <nav className="hidden lg:flex items-center gap-8 font-bold text-slate-300">
          <a href="#home" className="hover:text-pink-500 transition">Inicio</a>
          <a href="#catalogo" className="hover:text-pink-500 transition">Catálogo</a>
          <a href="#paquetes" className="hover:text-pink-500 transition">Paquetes DNF</a>
          <a href="#redes" className="hover:text-pink-500 transition">Redes Sociales</a>
          <a href="#contacto" className="hover:text-pink-500 transition">Contacto</a>
        </nav>

        {/* BOTONES FIJOS (USUARIO Y CARRITO) + BOTÓN MENÚ MÓVIL */}
        <div className="flex items-center gap-2">
          
          {/* Botón de Cuenta */}
          <button
            onClick={usuario ? onAbrirPerfil : onAbrirAuth}
            className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 hover:border-sky-500 text-white font-bold px-2.5 sm:px-3 py-2 rounded-xl shadow-lg transition text-xs max-w-[110px] sm:max-w-[160px] truncate"
          >
            <User size={16} className="text-sky-400 shrink-0" />
            <span className="truncate">{usuario ? nombreUsuario : "Iniciar Sesión"}</span>
          </button>

          {/* Botón de Cotización */}
          <button
            onClick={onAbrirCarrito}
            className="relative flex items-center gap-1.5 bg-gradient-to-r from-pink-500 via-purple-600 to-sky-500 hover:from-pink-600 hover:to-sky-600 text-white font-extrabold px-3 sm:px-3.5 py-2 rounded-xl shadow-lg transition text-xs sm:text-sm"
          >
            <ShoppingBag size={18} />
            <span className="hidden sm:inline">Mi Cotización</span>
            {cotizacionLength > 0 && (
              <span className="bg-white text-slate-950 text-[10px] font-black rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center animate-bounce">
                {cotizacionLength}
              </span>
            )}
          </button>

          {/* BOTÓN HAMBURGUESA (MÓVIL / TABLETAS) */}
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="lg:hidden p-2 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white rounded-xl transition"
            aria-label="Abrir menú"
          >
            {menuAbierto ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>
      </div>

      {/* MENÚ DESPLEGABLE VERTICAL (MÓVIL / TABLETAS) */}
      {menuAbierto && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-6 py-5 space-y-4 animate-fadeIn shadow-2xl">
          <nav className="flex flex-col space-y-3 font-bold text-slate-300 text-sm">
            <a
              href="#home"
              onClick={() => setMenuAbierto(false)}
              className="hover:text-pink-500 transition py-1.5 border-b border-slate-900"
            >
              Inicio
            </a>
            <a
              href="#catalogo"
              onClick={() => setMenuAbierto(false)}
              className="hover:text-pink-500 transition py-1.5 border-b border-slate-900"
            >
              Catálogo
            </a>
            <a
              href="#paquetes"
              onClick={() => setMenuAbierto(false)}
              className="hover:text-pink-500 transition py-1.5 border-b border-slate-900"
            >
              Paquetes DNF
            </a>
            <a
              href="#redes"
              onClick={() => setMenuAbierto(false)}
              className="hover:text-pink-500 transition py-1.5 border-b border-slate-900"
            >
              Redes Sociales
            </a>
            <a
              href="#contacto"
              onClick={() => setMenuAbierto(false)}
              className="hover:text-pink-500 transition py-1.5"
            >
              Contacto
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}