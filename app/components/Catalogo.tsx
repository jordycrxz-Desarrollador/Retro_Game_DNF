"use client";

import { Plus, Gamepad2 } from "lucide-react";

interface Producto {
  id: string;
  numero: string;
  nombre: string;
  categoria: "mesas-simuladores" | "juegos-premium" | "juegos-gigantes";
  precio: number;
  stock: number;
  imagen: string;
  descripcion: string;
}

interface CatalogoProps {
  catalogo: Producto[];
  cargando: boolean;
  categoriaSel: string;
  onCambiarCategoria: (cat: string) => void;
  onAgregarProducto: (prod: Producto) => void;
  getCantidadEnCotizacion: (id: string) => number;
}

export default function Catalogo({
  catalogo,
  cargando,
  categoriaSel,
  onCambiarCategoria,
  onAgregarProducto,
  getCantidadEnCotizacion,
}: CatalogoProps) {
  const productosFiltrados =
    categoriaSel === "todos"
      ? catalogo
      : catalogo.filter((p) => p.categoria === categoriaSel);

  return (
    <section id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-black uppercase text-white tracking-tight">
            Catálogo de <span className="text-sky-400">Juegos Disponibles</span>
          </h2>
          <p className="text-slate-400 mt-2">Explora nuestros equipos listos para animar tu próxima fiesta.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { id: "todos", label: "Todos los Juegos" },
            { id: "mesas-simuladores", label: "Mesas & Simuladores" },
            { id: "juegos-premium", label: "Juegos Gigantes Premium" },
            { id: "juegos-gigantes", label: "Juegos Gigantes" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCambiarCategoria(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-extrabold transition ${
                categoriaSel === cat.id
                  ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md border border-sky-400/50"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {cargando ? (
        <div className="text-center py-20 text-sky-400 font-extrabold animate-pulse">
          Cargando catálogo de juegos disponibles...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productosFiltrados.map((prod) => {
            const cantAgregada = getCantidadEnCotizacion(prod.id);
            const stockAgotado = prod.stock === 0 || cantAgregada >= prod.stock;

            return (
              <div
                key={prod.id}
                className="bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 bg-slate-950 overflow-hidden flex items-center justify-center p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={prod.imagen}
                      alt={prod.nombre}
                      className={`w-full h-full object-contain ${
                        stockAgotado ? "opacity-40 grayscale" : "opacity-100"
                      }`}
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600";
                      }}
                    />

                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center pointer-events-none">
                      <span className="bg-slate-950/90 text-sky-400 border border-sky-500/40 text-xs font-black px-3 py-1 rounded-lg backdrop-blur-sm">
                        #{prod.numero}
                      </span>
                      <span
                        className={`text-[11px] font-black px-2.5 py-1 rounded-lg border backdrop-blur-sm ${
                          prod.stock > 0
                            ? "bg-emerald-950/90 text-emerald-400 border-emerald-500/40"
                            : "bg-rose-950/90 text-rose-400 border-rose-500/40"
                        }`}
                      >
                        {prod.stock > 0 ? `${prod.stock} en bodega` : "Agotado"}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-black text-white mb-2">{prod.nombre}</h3>
                    <p className="text-slate-400 text-sm">{prod.descripcion}</p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-slate-900 mt-4">
                  <div className="pt-4">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Precio por Evento</span>
                    <span className="text-2xl font-black text-yellow-400">
                      ${prod.precio} <span className="text-xs text-slate-400">MXN</span>
                    </span>
                  </div>

                  <button
                    onClick={() => onAgregarProducto(prod)}
                    className={`font-black px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 text-xs uppercase tracking-wider mt-4 ${
                      stockAgotado
                        ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                        : "bg-sky-500 hover:bg-sky-400 text-slate-950"
                    }`}
                  >
                    <Plus size={14} className="stroke-[3]" /> Agregar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}