"use client";

import { useState, useEffect } from "react";
import { X, User, Phone, Mail, Lock, History, ShieldCheck, MessageCircle } from "lucide-react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface PerfilModalProps {
  abierto: boolean;
  onCerrar: () => void;
  usuario: SupabaseUser | null;
  nombrePerfil: string;
  setNombrePerfil: (val: string) => void;
  telefonoPerfil: string;
  setTelefonoPerfil: (val: string) => void;
  mostrarNotificacion: (msg: string, tipo?: "exito" | "advertencia" | "error") => void;
  cerrarSesion: () => void;
}

interface CotizacionGuardada {
  id: string;
  codigo_cotizacion: string;
  fecha_evento: string;
  ciudad: string;
  total_estimado: number;
  detalles_paquete: string;
  created_at: string;
}

export default function PerfilModal({
  abierto,
  onCerrar,
  usuario,
  nombrePerfil,
  setNombrePerfil,
  telefonoPerfil,
  setTelefonoPerfil,
  mostrarNotificacion,
  cerrarSesion,
}: PerfilModalProps) {
  const [pestanaActiva, setPestanaActiva] = useState<"datos" | "cotizaciones" | "seguridad">("datos");
  const [listaCotizaciones, setListaCotizaciones] = useState<CotizacionGuardada[]>([]);
  const [cargandoCotizaciones, setCargandoCotizaciones] = useState<boolean>(false);

  // Seguridad / Cambio de contraseña
  const [cargandoPassword, setCargandoPassword] = useState<boolean>(false);

  useEffect(() => {
    if (abierto && usuario) {
      cargarCotizacionesGuardadas();
    }
  }, [abierto, usuario]);

  const cargarCotizacionesGuardadas = async () => {
    if (!usuario) return;
    setCargandoCotizaciones(true);
    
    // Consultamos la tabla de cotizaciones o pedidos guardados del usuario
    const { data, error } = await supabase
      .from("cotizaciones_guardadas") // O puedes cambiarlo a "pedidos" según tu base de datos
      .select("*")
      .eq("usuario_id", usuario.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setListaCotizaciones(data as CotizacionGuardada[]);
    }
    setCargandoCotizaciones(false);
  };

  const guardarCambiosPerfil = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuario) return;

    const { error } = await supabase.auth.updateUser({
      data: { full_name: nombrePerfil, telefono: telefonoPerfil },
    });

    if (error) {
      mostrarNotificacion(`Error al actualizar perfil: ${error.message}`, "error");
    } else {
      mostrarNotificacion("¡Datos de perfil actualizados con éxito!", "exito");
    }
  };

  const solicitarCambioPassword = async () => {
    if (!usuario?.email) return;
    setCargandoPassword(true);
    const { error } = await supabase.auth.resetPasswordForEmail(usuario.email, {
      redirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
    });
    setCargandoPassword(false);

    if (error) {
      mostrarNotificacion(`No se pudo enviar el correo: ${error.message}`, "error");
    } else {
      mostrarNotificacion("Se ha enviado un enlace de restablecimiento a tu correo electrónico.", "exito");
    }
  };

  if (!abierto) return null;

  return (
    <div onClick={onCerrar} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 cursor-pointer">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-800 text-white p-6 rounded-2xl shadow-2xl max-w-2xl w-full relative cursor-default max-h-[90vh] flex flex-col"
      >
        <button onClick={onCerrar} className="absolute top-4 right-4 text-slate-400 hover:text-white transition p-1">
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 pb-4 border-b border-slate-800 mb-6">
          <div className="w-12 h-12 bg-sky-500/20 text-sky-400 rounded-full flex items-center justify-center border border-sky-500/40">
            <User size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black uppercase text-white">Mi Cuenta DNF</h3>
            <span className="text-xs text-slate-400">{usuario?.email}</span>
          </div>
        </div>

        {/* Pestañas de Navegación */}
        <div className="grid grid-cols-3 gap-2 mb-6 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-bold">
          <button
            onClick={() => setPestanaActiva("datos")}
            className={`py-2.5 rounded-lg transition flex items-center justify-center gap-1.5 ${
              pestanaActiva === "datos" ? "bg-sky-500 text-slate-950 font-black shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            <User size={14} /> Mis Datos
          </button>
          <button
            onClick={() => setPestanaActiva("cotizaciones")}
            className={`py-2.5 rounded-lg transition flex items-center justify-center gap-1.5 ${
              pestanaActiva === "cotizaciones" ? "bg-sky-500 text-slate-950 font-black shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            <History size={14} /> Cotizaciones
          </button>
          <button
            onClick={() => setPestanaActiva("seguridad")}
            className={`py-2.5 rounded-lg transition flex items-center justify-center gap-1.5 ${
              pestanaActiva === "seguridad" ? "bg-sky-500 text-slate-950 font-black shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            <ShieldCheck size={14} /> Seguridad
          </button>
        </div>

        <div className="overflow-y-auto flex-grow pr-1 space-y-4">
          {/* SECCIÓN 1: MIS DATOS */}
          {pestanaActiva === "datos" && (
            <form onSubmit={guardarCambiosPerfil} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-extrabold text-slate-400 mb-1">Nombre Completo</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-3 text-slate-500" />
                  <input
                    type="text"
                    value={nombrePerfil}
                    onChange={(e) => setNombrePerfil(e.target.value)}
                    placeholder="Tu nombre completo"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-extrabold text-slate-400 mb-1">Teléfono de Contacto (WhatsApp)</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-3 text-slate-500" />
                  <input
                    type="text"
                    value={telefonoPerfil}
                    onChange={(e) => setTelefonoPerfil(e.target.value)}
                    placeholder="56 2678 4076"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-extrabold text-slate-400 mb-1">Correo Electrónico (No modificable)</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-3 text-slate-500" />
                  <input
                    type="email"
                    disabled
                    value={usuario?.email || ""}
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 text-slate-950 font-black py-3 rounded-xl uppercase text-xs shadow-lg transition mt-4"
              >
                Guardar Cambios
              </button>
            </form>
          )}

          {/* SECCIÓN 2: MIS COTIZACIONES GUARDADAS */}
          {pestanaActiva === "cotizaciones" && (
            <div className="space-y-3">
              {cargandoCotizaciones ? (
                <p className="text-center text-xs text-sky-400 py-8 animate-pulse">Cargando tus cotizaciones...</p>
              ) : listaCotizaciones.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs space-y-2">
                  <History size={32} className="mx-auto mb-2 opacity-40 text-sky-400" />
                  <p className="font-bold text-slate-400">No tienes cotizaciones guardadas todavía.</p>
                  <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                    Arma tu paquete de juegos gigantes o arcade en el catálogo y envíalo por WhatsApp para agendar tu evento.
                  </p>
                </div>
              ) : (
                listaCotizaciones.map((cot) => (
                  <div key={cot.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-black text-sky-400">{cot.codigo_cotizacion || "Cotización DNF"}</span>
                      <span className="text-[10px] text-slate-500">
                        {new Date(cot.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-slate-300">
                      <div>📅 Evento: <strong className="text-white">{cot.fecha_evento || "Por definir"}</strong></div>
                      <div>📍 Ubicación: <strong className="text-white">{cot.ciudad || "No especificada"}</strong></div>
                    </div>

                    <div className="pt-2 border-t border-slate-900 flex justify-between items-center">
                      <span className="text-slate-400 font-bold">Total Estimado: <strong className="text-emerald-400">${cot.total_estimado || 0} MXN</strong></span>
                      
                      <a
                        href={`https://wa.me/525626784076?text=Hola,%20quiero%20retomar%20mi%20cotizaci%C3%B3n%20guardada%20(${cot.codigo_cotizacion})`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-3 py-2 rounded-xl text-[11px] flex items-center gap-1.5 transition shadow-md"
                      >
                        <MessageCircle size={14} /> Reanudar en WhatsApp
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* SECCIÓN 3: SEGURIDAD */}
          {pestanaActiva === "seguridad" && (
            <div className="space-y-4 py-2">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <h4 className="font-black text-white uppercase text-xs flex items-center gap-2">
                  <Lock size={16} className="text-pink-500" /> Restablecer Contraseña
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Si deseas cambiar tu contraseña, te enviaremos un enlace seguro directamente a tu correo registrado.
                </p>
                <button
                  type="button"
                  onClick={solicitarCambioPassword}
                  disabled={cargandoPassword}
                  className="bg-pink-500 hover:bg-pink-400 text-white font-black px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition w-full shadow-lg"
                >
                  {cargandoPassword ? "Enviando..." : "Enviar Correo de Recuperación"}
                </button>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    onCerrar();
                    cerrarSesion();
                  }}
                  className="w-full bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/40 font-bold py-2.5 rounded-xl text-xs transition"
                >
                  Cerrar Sesión Actual
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}