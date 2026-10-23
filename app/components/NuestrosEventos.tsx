"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const eventosData = [
  {
    id: 1,
    categoria: "Mesas de Juego",
    imagen: "/Eventos/Evento11.jpeg",
    titulo: "Diversión sin límites bajo la sombra",
    descripcion: "Diseñamos espacios de entretenimiento ideales para cualquier rincón de tu evento. ¡Emoción y dinamismo asegurados!"
  },
  {
    id: 2,
    categoria: "Arcades",
    imagen: "/Eventos/Evento9.jpeg",
    titulo: "Zona Gamer y Arcades Clásicos",
    descripcion: "Revive la nostalgia y emociona a tus invitados con nuestras estaciones de videojuegos retro y simuladores de última generación."
  },
  {
    id: 3,
    categoria: "Juegos Gigantes",
    imagen: "/Eventos/Evento8.jpeg",
    titulo: "Entretenimiento Total en Espacios Modernos",
    descripcion: "Integramos experiencias de alta definición y juegos interactivos que cautivan a chicos y grandes por igual en cualquier lugar."
  },
  {
    id: 4,
    categoria: "Juegos Gigantes",
    imagen: "/Eventos/Evento7.jpeg",
    titulo: "Llenando tus Jardines de Diversión a lo GRANDE",
    descripcion: "Aprovecha al máximo tus áreas verdes con juegos gigantes y mesas de destreza que garantizan risas y sana competencia al aire libre."
  },
  {
    id: 5,
    categoria: "Mesas de Juego",
    imagen: "/Eventos/Evento6.jpeg",
    titulo: "Experiencias Dinámicas y Torneos Inolvidables",
    descripcion: "Montajes profesionales de billar, futbolito y juegos de precisión que convierten cualquier reunión social en una competencia llena de emoción."
  },
  {
    id: 6,
    categoria: "Juegos Gigantes",
    imagen: "/Eventos/Evento5.jpeg",
    titulo: "Salones y Espacios Interiores Listos para la Acción",
    descripcion: "Adaptamos cualquier salón de fiestas o espacio techado con atracciones interactivas y coloridas que fascinan a todos los invitados."
  },
  {
    id: 7,
    categoria: "Mesas de Juego",
    imagen: "/Eventos/Evento4.jpeg",
    titulo: "Zonas de Juego Elegantes y Modernas",
    descripcion: "Diseños sofisticados y modernos que combinan perfectamente con espacios exclusivos, ofreciendo billar, hockey y futbolito de alto nivel."
  },
  {
    id: 8,
    categoria: "Mesas de Juego",
    imagen: "/Eventos/Evento1.jpeg",
    titulo: "Diversión Pura y Risas Contagiosas",
    descripcion: "Momentos de sana competencia y diversión enérgica que mantienen a los niños entretenidos y felices durante todo el evento."
  },
  {
    id: 9,
    categoria: "Arcades",
    imagen: "/Eventos/Evento2.jpeg",
    titulo: "Experiencias Completas para Toda la Familia",
    descripcion: "Una combinación perfecta de zona arcade, mesas de juego y atracciones interactivas diseñadas para entretener a todas las edades en tu celebración."
  },
  {
    id: 10,
    categoria: "Juegos Gigantes",
    imagen: "/Eventos/Evento3.jpeg",
    titulo: "Montajes Profesionales en Jardines y Áreas Verdes",
    descripcion: "Instalamos carpas, juegos de destreza y atracciones gigantes al aire libre para que tu evento luzca espectacular y todos se diviertan al máximo."
  }
];

export default function NuestrosEventos() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [indiceActual, setIndiceActual] = useState(0);

  const eventosFiltrados = categoriaSeleccionada === "Todos"
    ? eventosData
    : eventosData.filter(e => e.categoria === categoriaSeleccionada);

  const siguienteSlide = () => {
    setIndiceActual((prev) => (prev + 1) % eventosFiltrados.length);
  };

  const anteriorSlide = () => {
    setIndiceActual((prev) => (prev - 1 + eventosFiltrados.length) % eventosFiltrados.length);
  };

  const eventoActual = eventosFiltrados[indiceActual] || eventosFiltrados[0];
  const eventoAnterior = eventosFiltrados[(indiceActual - 1 + eventosFiltrados.length) % eventosFiltrados.length];
  const eventoSiguiente = eventosFiltrados[(indiceActual + 1) % eventosFiltrados.length];

  return (
    <section className="py-24 px-4 bg-slate-950 border-b border-slate-900 relative overflow-hidden">
      
      {/* Fondo ambiental */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-3">
          Nuestros <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">Eventos</span>
        </h2>
        <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mb-10">
          Así es como transformamos cada fiesta y reunión en una experiencia inolvidable con nuestros juegos gigantes y arcade.
        </p>

        {/* Categorías */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-14">
          {["Todos", "Arcades", "Juegos Gigantes", "Mesas de Juego"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategoriaSeleccionada(cat);
                setIndiceActual(0);
              }}
              className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 border ${
                categoriaSeleccionada === cat
                  ? "bg-cyan-500/20 text-cyan-400 border-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.4)] scale-105"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-600 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Carrusel */}
        <div className="relative max-w-5xl mx-auto flex items-center justify-center">
          
          {/* Botón Izquierda */}
          <button
            onClick={anteriorSlide}
            className="absolute -left-2 md:-left-8 z-20 bg-slate-900/90 hover:bg-cyan-500 text-white hover:text-slate-950 p-3.5 rounded-full border border-slate-800 transition-all duration-300 shadow-xl backdrop-blur-md group"
            aria-label="Anterior"
          >
            <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition" />
          </button>

          {/* Contenedor de Tarjetas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full items-center">
            
            {/* Foto Izquierda */}
            <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-800/60 opacity-30 scale-95 h-64 transition-all duration-700 ease-out shadow-lg">
              <img
                key={eventoAnterior?.id}
                src={eventoAnterior?.imagen}
                alt="Anterior"
                className="w-full h-full object-cover filter grayscale-[30%] transition-opacity duration-700"
              />
            </div>

            {/* Foto Central Principal con Animación de desvanecimiento suave */}
            <div 
              key={eventoActual?.id} 
              className="relative overflow-hidden rounded-3xl border-2 border-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.3)] h-80 md:h-96 bg-slate-900 transition-all duration-700 ease-out group animate-[fadeIn_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards]"
            >
              <img
                src={eventoActual?.imagen}
                alt={eventoActual?.titulo}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6 text-left">
                <span className="text-cyan-400 text-[11px] font-extrabold uppercase tracking-widest mb-1.5 drop-shadow">
                  {eventoActual?.categoria}
                </span>
                <h3 className="text-white font-black text-lg md:text-xl leading-tight mb-2">
                  {eventoActual?.titulo}
                </h3>
                <p className="text-slate-300 text-xs md:text-sm line-clamp-2 font-medium opacity-90">
                  {eventoActual?.descripcion}
                </p>
              </div>
            </div>

            {/* Foto Derecha */}
            <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-800/60 opacity-30 scale-95 h-64 transition-all duration-700 ease-out shadow-lg">
              <img
                key={eventoSiguiente?.id}
                src={eventoSiguiente?.imagen}
                alt="Siguiente"
                className="w-full h-full object-cover filter grayscale-[30%] transition-opacity duration-700"
              />
            </div>

          </div>

          {/* Botón Derecha */}
          <button
            onClick={siguienteSlide}
            className="absolute -right-2 md:-right-8 z-20 bg-slate-900/90 hover:bg-cyan-500 text-white hover:text-slate-950 p-3.5 rounded-full border border-slate-800 transition-all duration-300 shadow-xl backdrop-blur-md group"
            aria-label="Siguiente"
          >
            <ChevronRight size={24} className="group-hover:translate-x-0.5 transition" />
          </button>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center items-center gap-2 mt-10">
          {eventosFiltrados.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setIndiceActual(idx)}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                indiceActual === idx 
                  ? "w-10 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]" 
                  : "w-2.5 bg-slate-800 hover:bg-slate-700"
              }`}
              aria-label={`Ir a diapositiva ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}