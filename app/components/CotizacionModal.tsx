"use client";

import {
  ShoppingBag,
  Plus,
  Minus,
  CheckCircle,
  X,
  ArrowRight,
  ArrowLeft,
  Clock,
  MailCheck,
  Lock,
  ChevronDown,
  MessageCircle,
  Trash2,
  ShieldAlert,
} from "lucide-react";
import { User as SupabaseUser } from "@supabase/supabase-js";

const ESTADOS_MEXICO = [
  "Aguascalientes",
  "Baja California",
  "Baja California Sur",
  "Campeche",
  "Chiapas",
  "Chihuahua",
  "Ciudad de México",
  "Coahuila",
  "Colima",
  "Durango",
  "Estado de México",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "Michoacán",
  "Morelos",
  "Nayarit",
  "Nuevo León",
  "Oaxaca",
  "Puebla",
  "Querétaro",
  "Quintana Roo",
  "San Luis Potosí",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz",
  "Yucatán",
  "Zacatecas",
];

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

interface ItemCotizacion {
  idCotizacion: string;
  idProductoOriginal?: string;
  tipo: "producto" | "paquete";
  nombre: string;
  precio: number;
  cantidad: number;
  stockMax?: number;
  detalles?: string[];
  requiereSeleccion?: {
    tipoCategoria: "juegos-gigantes" | "juegos-premium" | "mesas-simuladores";
    cantidadRequerida: number;
    etiqueta: string;
  }[];
  juegosSeleccionados?: { [key: string]: string };
}

interface CotizacionModalProps {
  abierto: boolean;
  onCerrar: () => void;
  cotizacion: ItemCotizacion[];
  catalogo: Producto[];
  pasoCotizacion: 1 | 2 | 3;
  setPasoCotizacion: (paso: 1 | 2 | 3) => void;
  usuario: SupabaseUser | null;
  esperandoVerificacion: boolean;
  cargandoVerificacion: boolean;
  cargandoAuth: boolean;
  emailAuth: string;
  setEmailAuth: (val: string) => void;
  passwordAuth: string;
  setPasswordAuth: (val: string) => void;
  esRegistro: boolean;
  setEsRegistro: (val: boolean) => void;
  nombrePedido: string;
  setNombrePedido: (val: string) => void;
  telefonoCliente: string;
  setTelefonoCliente: (val: string) => void;
  fechaEvento: string;
  setFechaEvento: (val: string) => void;
  horarioEvento: string;
  setHorarioEvento: (val: string) => void;
  horasExtra: number;
  setHorasExtra: (val: number) => void;
  estadoUbicacion: string;
  cambiarEstadoUbicacion: (est: string) => void;
  ciudadUbicacion: string;
  setCiudadUbicacion: (val: string) => void;
  coloniaUbicacion: string;
  setColoniaUbicacion: (val: string) => void;
  calleNumero: string;
  setCalleNumero: (val: string) => void;
  referenciaUbicacion: string;
  setReferenciaUbicacion: (val: string) => void;
  fueraDeZona: boolean;
  costoEnvioExtra: number;
  cambiarCantidad: (id: string, delta: number) => void;
  eliminarItemCotizacion?: (idCotizacion: string) => void;
  seleccionarJuegoParaPaquete: (idCotiz: string, etiquetaReq: string, nombreJuego: string) => void;
  manejarAutenticacion: (e: React.FormEvent) => void;
  comprobarVerificacion: () => void;
  mostrarNotificacion: (msg: string, tipo?: "exito" | "advertencia" | "error") => void;
  enviarCotizacionWhatsApp: () => void; // <--- Añadido a las props
}

export default function CotizacionModal({
  abierto,
  onCerrar,
  cotizacion,
  catalogo,
  pasoCotizacion,
  setPasoCotizacion,
  usuario,
  esperandoVerificacion,
  cargandoVerificacion,
  cargandoAuth,
  emailAuth,
  setEmailAuth,
  passwordAuth,
  setPasswordAuth,
  esRegistro,
  setEsRegistro,
  nombrePedido,
  setNombrePedido,
  telefonoCliente,
  setTelefonoCliente,
  fechaEvento,
  setFechaEvento,
  horarioEvento,
  setHorarioEvento,
  horasExtra,
  setHorasExtra,
  estadoUbicacion,
  cambiarEstadoUbicacion,
  ciudadUbicacion,
  setCiudadUbicacion,
  coloniaUbicacion,
  setColoniaUbicacion,
  calleNumero,
  setCalleNumero,
  referenciaUbicacion,
  setReferenciaUbicacion,
  fueraDeZona,
  costoEnvioExtra,
  cambiarCantidad,
  eliminarItemCotizacion,
  seleccionarJuegoParaPaquete,
  manejarAutenticacion,
  comprobarVerificacion,
  mostrarNotificacion,
  enviarCotizacionWhatsApp, // <--- Recibido como propiedad
}: CotizacionModalProps) {
  if (!abierto) return null;

  const subtotalJuegos = cotizacion.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const costoHorasExtra = horasExtra * 100;
  const fleteAplicado = fueraDeZona ? costoEnvioExtra : 0;
  const totalGeneral = subtotalJuegos + costoHorasExtra + fleteAplicado;

  const abrirCalendario = (e: React.MouseEvent<HTMLElement>) => {
    const input = e.currentTarget.querySelector("input[type='date']") as HTMLInputElement | null;
    if (input && "showPicker" in input) {
      try {
        input.showPicker();
      } catch {}
    }
  };

  return (
    <div onClick={onCerrar} className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-md cursor-pointer">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border-l border-slate-800 w-full max-w-xl h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto cursor-default"
      >
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-pink-500" size={24} />
              <h3 className="text-xl font-black uppercase text-white">Tu Cotización</h3>
            </div>
            <button onClick={onCerrar} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400">
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-6 text-center text-xs font-bold">
            <div
              className={`p-2 rounded-xl border ${
                pasoCotizacion === 1
                  ? "bg-sky-500/20 text-sky-400 border-sky-500/50"
                  : "bg-slate-950 text-slate-500 border-slate-800"
              }`}
            >
              1. Equipos
            </div>
            <div
              className={`p-2 rounded-xl border ${
                pasoCotizacion === 2
                  ? "bg-sky-500/20 text-sky-400 border-sky-500/50"
                  : "bg-slate-950 text-slate-500 border-slate-800"
              }`}
            >
              2. Ubicación
            </div>
            <div
              className={`p-2 rounded-xl border ${
                pasoCotizacion === 3
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50"
                  : "bg-slate-950 text-slate-500 border-slate-800"
              }`}
            >
              3. Resumen y WhatsApp
            </div>
          </div>

          {/* PASO 1: EQUIPOS */}
          {pasoCotizacion === 1 && (
            <div className="space-y-4">
              {cotizacion.length === 0 ? (
                <p className="text-center text-slate-400 text-sm py-8">Tu cotización está vacía.</p>
              ) : (
                cotizacion.map((item) => (
                  <div key={item.idCotizacion} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-extrabold text-white text-sm">{item.nombre}</h4>
                        <span className="text-xs text-yellow-400">${item.precio} MXN</span>
                        {item.tipo === "paquete" && (
                          <span className="ml-2 bg-pink-500/20 text-pink-400 text-[10px] font-bold px-2 py-0.5 rounded border border-pink-500/30">
                            Paquete Único
                          </span>
                        )}
                      </div>
                      
                      <button
                        onClick={() => eliminarItemCotizacion && eliminarItemCotizacion(item.idCotizacion)}
                        className="text-slate-500 hover:text-pink-500 p-1.5 transition rounded-lg hover:bg-slate-900"
                        title="Quitar de la cotización"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-900">
                      <span className="text-[11px] text-slate-400 uppercase font-bold">Cantidad:</span>
                      <div className="flex items-center gap-2">
                        {item.tipo === "producto" && (
                          <button
                            onClick={() => cambiarCantidad(item.idCotizacion, -1)}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 transition text-white"
                          >
                            <Minus size={14} />
                          </button>
                        )}
                        <span className="font-black text-sm text-white px-2">{item.cantidad}</span>
                        {item.tipo === "producto" && (
                          <button
                            onClick={() => cambiarCantidad(item.idCotizacion, 1)}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 transition text-white"
                          >
                            <Plus size={14} />
                          </button>
                        )}
                      </div>
                    </div>

                    {item.tipo === "paquete" && item.detalles && (
                      <div className="pt-2 border-t border-slate-900 space-y-2 text-xs">
                        <span className="text-[10px] text-slate-400 uppercase font-extrabold block">Incluye:</span>
                        {item.detalles.map((det, idx) => (
                          <div key={idx} className="text-slate-300 flex items-center gap-2">
                            <CheckCircle size={12} className="text-emerald-400 shrink-0" />
                            <span>{det}</span>
                          </div>
                        ))}

                        {item.requiereSeleccion &&
                          item.requiereSeleccion.map((req, rIdx) => {
                            const juegosDisponiblesCat = catalogo.filter(
                              (p) => p.categoria === req.tipoCategoria && p.stock > 0
                            );

                            return (
                              <div
                                key={rIdx}
                                className="bg-slate-900/80 p-3 rounded-xl border border-pink-500/30 space-y-1.5 mt-2"
                              >
                                <label className="block text-[11px] font-bold text-pink-400">
                                  Elige tu {req.etiqueta}:
                                </label>
                                <div className="relative">
                                  <select
                                    value={item.juegosSeleccionados?.[req.etiqueta] || ""}
                                    onChange={(e) =>
                                      seleccionarJuegoParaPaquete(item.idCotizacion, req.etiqueta, e.target.value)
                                    }
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white appearance-none pr-8"
                                  >
                                    <option value="">-- Selecciona un juego disponible --</option>
                                    {juegosDisponiblesCat.map((juego) => (
                                      <option key={juego.id} value={juego.nombre}>
                                        {juego.nombre} (Stock: {juego.stock})
                                      </option>
                                    ))}
                                  </select>
                                  <ChevronDown
                                    size={14}
                                    className="absolute right-3 top-3 text-slate-400 pointer-events-none"
                                  />
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* PASO 2: UBICACIÓN Y DATOS */}
          {!usuario && pasoCotizacion === 2 && (
            <div className="bg-slate-950 p-6 rounded-2xl border border-sky-500/40 space-y-4">
              {esperandoVerificacion ? (
                <div className="space-y-4 text-center">
                  <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40 animate-pulse">
                    <MailCheck size={28} />
                  </div>
                  <h4 className="text-lg font-black text-white uppercase">Verifica tu Correo</h4>
                  <p className="text-slate-300 text-xs">Revisa la liga enviada a {emailAuth}.</p>
                  <button
                    onClick={comprobarVerificacion}
                    disabled={cargandoVerificacion}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 rounded-xl uppercase text-xs shadow-lg transition"
                  >
                    Comprobar Estado
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-center space-y-1">
                    <Lock className="mx-auto text-sky-400" size={24} />
                    <h4 className="text-lg font-black text-white uppercase pt-2">
                      {esRegistro ? "Crear una Cuenta" : "Iniciar Sesión"}
                    </h4>
                  </div>
                  <form onSubmit={manejarAutenticacion} className="space-y-3 pt-2">
                    {esRegistro && (
                      <div>
                        <label className="block text-[10px] uppercase text-slate-400 mb-1">Nombre Completo *</label>
                        <input
                          type="text"
                          required
                          value={nombrePedido}
                          onChange={(e) => setNombrePedido(e.target.value)}
                          placeholder="Carlos Mendoza"
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                    )}
                    <div>
                      <label className="block text-[10px] uppercase text-slate-400 mb-1">Correo Electrónico *</label>
                      <input
                        type="email"
                        required
                        value={emailAuth}
                        onChange={(e) => setEmailAuth(e.target.value)}
                        placeholder="correo@ejemplo.com"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-slate-400 mb-1">Contraseña *</label>
                      <input
                        type="password"
                        required
                        value={passwordAuth}
                        onChange={(e) => setPasswordAuth(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={cargandoAuth}
                      className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-black py-3 rounded-xl uppercase text-xs transition"
                    >
                      {cargandoAuth ? "Procesando..." : "Continuar"}
                    </button>
                  </form>
                </>
              )}
            </div>
          )}

          {usuario && pasoCotizacion === 2 && (
            <div className="space-y-3">
              <div className="bg-sky-500/10 border border-sky-500/30 p-2.5 rounded-xl flex items-center justify-between text-xs">
                <span className="text-sky-300 font-bold">Sesión:</span>
                <span className="text-white font-extrabold">{usuario.email}</span>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase text-slate-400 mb-1">
                  Nombre para la reserva *
                </label>
                <input
                  type="text"
                  value={nombrePedido}
                  onChange={(e) => setNombrePedido(e.target.value)}
                  placeholder="Carlos Mendoza"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase text-slate-400 mb-1">
                  Teléfono WhatsApp *
                </label>
                <input
                  type="text"
                  value={telefonoCliente}
                  onChange={(e) => setTelefonoCliente(e.target.value)}
                  placeholder="56 2678 4076"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="cursor-pointer" onClick={abrirCalendario}>
                  <label className="block text-[10px] font-extrabold uppercase text-slate-400 mb-1 pointer-events-none">
                    Fecha del Evento *
                  </label>
                  <input
                    type="date"
                    value={fechaEvento}
                    onChange={(e) => setFechaEvento(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white cursor-pointer [&::-webkit-calendar-picker-indicator]:invert"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase text-slate-400 mb-1">
                    Horario del Día *
                  </label>
                  <select
                    value={horarioEvento}
                    onChange={(e) => setHorarioEvento(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Matutino (9:00 AM - 1:00 PM)">Matutino (9:00 AM - 1:00 PM)</option>
                    <option value="Vespertino (3:00 PM - 7:00 PM)">Vespertino (3:00 PM - 7:00 PM)</option>
                    <option value="Nocturno (6:00 PM - 10:00 PM)">Nocturno (6:00 PM - 10:00 PM)</option>
                    <option value="Personalizado (A coordinar)">Personalizado (A coordinar)</option>
                  </select>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-pink-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-pink-400 font-bold">
                    <Clock size={16} />
                    <span>¿Deseas rentarlo por más tiempo?</span>
                  </div>
                  <span className="text-[10px] text-slate-400">(4 horas incluidas base)</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-300">Horas extra adicionales ($100 c/u):</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setHorasExtra(Math.max(0, horasExtra - 1))}
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-white"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-black text-sm text-yellow-400 px-2">{horasExtra} hr(s)</span>
                    <button
                      type="button"
                      onClick={() => setHorasExtra(horasExtra + 1)}
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-white"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase text-slate-400 mb-1">Estado *</label>
                  <select
                    value={estadoUbicacion}
                    onChange={(e) => cambiarEstadoUbicacion(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    {ESTADOS_MEXICO.map((est) => (
                      <option key={est} value={est}>
                        {est}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase text-slate-400 mb-1">Ciudad/Municipio *</label>
                  <input
                    type="text"
                    value={ciudadUbicacion}
                    onChange={(e) => setCiudadUbicacion(e.target.value)}
                    placeholder="Tultepec, Pachuca..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={coloniaUbicacion}
                  onChange={(e) => setColoniaUbicacion(e.target.value)}
                  placeholder="Colonia"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
                <input
                  type="text"
                  value={calleNumero}
                  onChange={(e) => setCalleNumero(e.target.value)}
                  placeholder="Calle y Número"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <textarea
                rows={2}
                value={referenciaUbicacion}
                onChange={(e) => setReferenciaUbicacion(e.target.value)}
                placeholder="Referencias de la ubicación"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white resize-none"
              ></textarea>
            </div>
          )}

          {/* PASO 3: RESUMEN Y ENVÍO POR WHATSAPP */}
          {pasoCotizacion === 3 && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 text-xs">
                <h4 className="font-black text-white text-sm uppercase mb-2 border-b border-slate-800 pb-2">
                  Resumen de tu Cotización
                </h4>
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal Equipos:</span>
                  <span className="font-bold text-white">${subtotalJuegos} MXN</span>
                </div>
                {horasExtra > 0 && (
                  <div className="flex justify-between text-slate-300">
                    <span>Horas Extra ({horasExtra}h x $100):</span>
                    <span className="font-bold text-pink-400">+${costoHorasExtra} MXN</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-300">
                  <span>Flete ({estadoUbicacion}):</span>
                  <span className={`font-bold ${fueraDeZona ? "text-amber-400" : "text-emerald-400"}`}>
                    {fueraDeZona ? `+$${costoEnvioExtra} MXN` : "¡GRATIS!"}
                  </span>
                </div>
                <div className="pt-3 border-t border-slate-800 flex justify-between text-base font-black">
                  <span className="text-white">Total Estimado:</span>
                  <span className="text-yellow-400">${totalGeneral} MXN</span>
                </div>
              </div>

              {/* AVISO DEL ANTICIPO */}
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl flex items-start gap-3 text-xs">
                <ShieldAlert className="text-amber-400 shrink-0 mt-0.5" size={20} />
                <div className="space-y-1">
                  <h5 className="font-bold text-amber-400 uppercase">Información de Apartado</h5>
                  <p className="text-slate-300 leading-relaxed">
                    Para asegurar y agendar tu fecha se requiere un <strong>porcentaje de anticipo</strong>. El monto exacto y las formas de pago te las indicaremos por WhatsApp al afinar los últimos detalles.
                  </p>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl text-center space-y-2">
                <MessageCircle size={28} className="text-emerald-400 mx-auto" />
                <h4 className="text-white font-black text-sm uppercase">¡Listo para enviar!</h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Al hacer clic en el botón de abajo, se abrirá WhatsApp con todos los detalles de tu cotización listos para enviarse al vendedor y confirmar tu fecha.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* BOTONES DE NAVEGACIÓN */}
        {cotizacion.length > 0 && pasoCotizacion <= 3 && (
          <div className="border-t border-slate-800 pt-4 mt-6 flex items-center justify-between gap-3">
            {pasoCotizacion > 1 && (
              <button
                onClick={() => setPasoCotizacion((pasoCotizacion - 1) as 1 | 2 | 3)}
                className="bg-slate-800 text-white font-bold px-4 py-3 rounded-xl text-xs flex items-center gap-1 hover:bg-slate-700 transition"
              >
                <ArrowLeft size={16} /> Atrás
              </button>
            )}

            {pasoCotizacion < 3 ? (
              <button
                onClick={() => {
                  if (pasoCotizacion === 1 && cotizacion.length === 0) {
                    mostrarNotificacion("Selecciona al menos un juego o paquete.", "advertencia");
                    return;
                  }
                  if (pasoCotizacion === 2) {
                    if (!usuario) {
                      mostrarNotificacion("Debes iniciar sesión para continuar.", "advertencia");
                      return;
                    }
                    if (!nombrePedido || !fechaEvento || !ciudadUbicacion) {
                      mostrarNotificacion("Por favor completa los datos obligatorios de la reserva.", "advertencia");
                      return;
                    }
                  }
                  setPasoCotizacion((pasoCotizacion + 1) as 1 | 2 | 3);
                }}
                className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-slate-950 font-black py-3.5 rounded-xl flex items-center justify-center gap-2 uppercase tracking-wider text-xs shadow-lg"
              >
                Siguiente <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={enviarCotizacionWhatsApp} // <--- Vinculado a nuestra función que guarda en Supabase
                className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-slate-950 font-black py-3.5 rounded-xl flex items-center justify-center gap-2 uppercase tracking-wider text-xs shadow-lg hover:brightness-110 transition"
              >
                <MessageCircle size={18} /> Enviar Cotización por WhatsApp
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}