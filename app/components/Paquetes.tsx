"use client";

import { Package, CheckCircle, Plus } from "lucide-react";

export const PAQUETES_DESTACADOS = [
  {
    id: "paq-fiesta-total",
    nombre: "Paquete Fiesta Total",
    precio: 4250,
    descripcion: "Precio especial por evento - 4 horas de servicio incluido.",
    incluyeFijo: ["1 Tablero Arcade", "1 Futbolito", "1 PinPon", "1 Hockey", "1 Billar"],
    requiereSeleccion: [
      { etiqueta: "1 Juegos Gigantes Premium", tipoCategoria: "juegos-premium" as const, cantidadRequerida: 1 }
    ]
  },
  {
    id: "paq-fiesta-total-plus",
    nombre: "Paquete Fiesta Total Plus",
    precio: 4860,
    descripcion: "Precio especial del paquete ampliado - 4 horas de servicio.",
    incluyeFijo: ["2 Tableros Arcade", "2 Futbolitos", "1 Hockey", "1 Billar"],
    requiereSeleccion: []
  },
  {
    id: "paq-teenzone",
    nombre: "Paquete Teenzone",
    precio: 3350,
    descripcion: "Diversión retro ideal para eventos y reuniones juveniles.",
    incluyeFijo: ["1 Tablero Arcade", "1 Futbolito", "1 Hockey"],
    requiereSeleccion: [
      { etiqueta: "1 Juegos Gigantes", tipoCategoria: "juegos-gigantes" as const, cantidadRequerida: 1 },
      { etiqueta: "1 Juegos Gigantes Premium", tipoCategoria: "juegos-premium" as const, cantidadRequerida: 1 }
    ]
  },
  {
    id: "paq-teenzone-plus",
    nombre: "Paquete Teenzone Plus",
    precio: 3780,
    descripcion: "Diversión retro ilimitada para tu evento con soporte profesional.",
    incluyeFijo: ["1 Tablero Arcade (Panel doble clásico)", "1 Futbolito (Estándar)", "1 Hockey (Air hockey LED)", "1 Billar (Con tacos y bolas)"],
    requiereSeleccion: [
      { etiqueta: "1 Juegos Gigantes Premium", tipoCategoria: "juegos-premium" as const, cantidadRequerida: 1 }
    ]
  },
  {
    id: "paq-fiesta-premium",
    nombre: "Paquete Fiesta Premium",
    precio: 5800,
    descripcion: "Experiencia de máxima velocidad y entretenimiento.",
    incluyeFijo: ["1 Simulador de Carreras", "1 Tablero Arcade", "1 Futbolito", "1 Hockey"],
    requiereSeleccion: []
  },
  {
    id: "paq-minikids",
    nombre: "Paquete Minikids",
    precio: 2250,
    descripcion: "Especial para los más pequeños con sorpresas incluidas.",
    incluyeFijo: ["10 Regalitos"],
    requiereSeleccion: [
      { etiqueta: "3 Juegos Gigantes", tipoCategoria: "juegos-gigantes" as const, cantidadRequerida: 3 },
      { etiqueta: "3 Juegos Gigantes Premium", tipoCategoria: "juegos-premium" as const, cantidadRequerida: 3 }
    ]
  },
  {
    id: "paq-minikids-plus",
    nombre: "Paquete Minikids Plus",
    precio: 2350,
    descripcion: "Paquete infantil ampliado con juegos y dinámicas.",
    incluyeFijo: ["1 Futbolito", "1 PinPon", "10 Regalitos"],
    requiereSeleccion: [
      { etiqueta: "1 Juegos Gigantes", tipoCategoria: "juegos-gigantes" as const, cantidadRequerida: 1 },
      { etiqueta: "2 Juegos Gigantes Premium", tipoCategoria: "juegos-premium" as const, cantidadRequerida: 2 }
    ]
  },
  {
    id: "paq-recreo-divertido",
    nombre: "Paquete Recreo Divertido",
    precio: 2400,
    descripcion: "Dinámica y entretenimiento garantizado.",
    incluyeFijo: ["1 Futbolito", "1 Hockey"],
    requiereSeleccion: [
      { etiqueta: "1 Juegos Gigantes", tipoCategoria: "juegos-gigantes" as const, cantidadRequerida: 1 },
      { etiqueta: "1 Juegos Gigantes Premium", tipoCategoria: "juegos-premium" as const, cantidadRequerida: 1 }
    ]
  },
  {
    id: "paq-recreo-divertido-plus",
    nombre: "Paquete Recreo Divertido Plus",
    precio: 2800,
    descripcion: "Recreación superior para eventos especiales.",
    incluyeFijo: ["1 Futbolito", "1 Hockey"],
    requiereSeleccion: [
      { etiqueta: "1 Juegos Gigantes", tipoCategoria: "juegos-gigantes" as const, cantidadRequerida: 1 },
      { etiqueta: "1 Juegos Gigantes Premium", tipoCategoria: "juegos-premium" as const, cantidadRequerida: 1 }
    ]
  },
];

interface PaquetesProps {
  onAgregarPaquete: (paq: typeof PAQUETES_DESTACADOS[0]) => void;
}

export default function Paquetes({ onAgregarPaquete }: PaquetesProps) {
  return (
    <section id="paquetes" className="bg-slate-900/60 border-y border-slate-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-pink-400 font-extrabold uppercase text-xs tracking-widest block mb-2">
            Kits Promocionales
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
            Paquetes <span className="text-yellow-400">DNF</span>
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Selecciona tu paquete favorito. Los paquetes con juegos a elegir te permitirán personalizar tu selección en el carrito.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PAQUETES_DESTACADOS.map((paq) => (
            <div
              key={paq.id}
              className="bg-slate-950 border border-slate-800 hover:border-pink-500/50 rounded-2xl p-6 flex flex-col justify-between shadow-2xl transition"
            >
              <div>
                <div className="w-12 h-12 bg-pink-500/10 text-pink-400 rounded-xl flex items-center justify-center border border-pink-500/30 mb-4">
                  <Package size={24} />
                </div>
                <h3 className="text-xl font-black text-white mb-2">{paq.nombre}</h3>
                <p className="text-slate-400 text-xs mb-6 leading-relaxed">{paq.descripcion}</p>

                <div className="space-y-2 mb-8">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Incluye:</span>
                  {paq.incluyeFijo.map((inc, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle size={14} className="text-emerald-400 shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                  {paq.requiereSeleccion?.map((req, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-pink-400 font-bold">
                      <Plus size={14} className="shrink-0" />
                      <span>{req.etiqueta} (A elegir)</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-900 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Precio Kit</span>
                  <span className="text-2xl font-black text-yellow-400">
                    ${paq.precio} <span className="text-xs text-slate-400">MXN</span>
                  </span>
                </div>

                <button
                  onClick={() => onAgregarPaquete(paq)}
                  className="bg-pink-500 hover:bg-pink-400 text-white font-black px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition"
                >
                  Elegir Paquete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}