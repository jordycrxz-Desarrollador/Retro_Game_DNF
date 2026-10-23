"use client";

import { useState } from "react";
import { X, User, Mail, KeyRound, Lock, LogOut, MailCheck, RefreshCw, ArrowLeft } from "lucide-react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface AuthModalProps {
  abierto: boolean;
  onCerrar: () => void;
  usuario: SupabaseUser | null;
  nombrePedido: string;
  setNombrePedido: (val: string) => void;
  emailAuth: string;
  setEmailAuth: (val: string) => void;
  passwordAuth: string;
  setPasswordAuth: (val: string) => void;
  esRegistro: boolean;
  setEsRegistro: (val: boolean) => void;
  cargandoAuth: boolean;
  esperandoVerificacion: boolean;
  cargandoVerificacion: boolean;
  manejarAutenticacion: (e: React.FormEvent) => void;
  comprobarVerificacion: () => void;
  reenviarCorreo: () => void;
  cerrarSesion: () => void;
  setEsperandoVerificacion: (val: boolean) => void;
  mostrarNotificacion: (msg: string, tipo?: "exito" | "advertencia" | "error") => void;
}

export default function AuthModal({
  abierto,
  onCerrar,
  usuario,
  nombrePedido,
  setNombrePedido,
  emailAuth,
  setEmailAuth,
  passwordAuth,
  setPasswordAuth,
  esRegistro,
  setEsRegistro,
  cargandoAuth,
  esperandoVerificacion,
  cargandoVerificacion,
  manejarAutenticacion,
  comprobarVerificacion,
  reenviarCorreo,
  cerrarSesion,
  setEsperandoVerificacion,
  mostrarNotificacion,
}: AuthModalProps) {
  const [olvidoPassword, setOlvidoPassword] = useState<boolean>(false);
  const [cargandoOlvido, setCargandoOlvido] = useState<boolean>(false);

  if (!abierto) return null;

  const enviarRecuperacion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailAuth) {
      mostrarNotificacion("Por favor ingresa tu correo electrónico.", "advertencia");
      return;
    }
    setCargandoOlvido(true);
    const { error } = await supabase.auth.resetPasswordForEmail(emailAuth, {
      redirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
    });
    setCargandoOlvido(false);

    if (error) {
      mostrarNotificacion(`No se pudo enviar el correo: ${error.message}`, "error");
    } else {
      mostrarNotificacion("¡Correo de recuperación enviado! Revisa tu bandeja de entrada o SPAM.", "exito");
      setOlvidoPassword(false);
    }
  };

  return (
    <div
      onClick={onCerrar}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-800 text-white p-6 rounded-2xl shadow-2xl max-w-md w-full relative cursor-default"
      >
        <button onClick={onCerrar} className="absolute top-4 right-4 text-slate-400 hover:text-white transition p-1">
          <X size={20} />
        </button>

        {olvidoPassword ? (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-pink-500/20 text-pink-400 rounded-full flex items-center justify-center mx-auto border border-pink-500/40">
                <KeyRound size={22} />
              </div>
              <h4 className="text-lg font-black text-white uppercase pt-1">Recuperar Contraseña</h4>
              <p className="text-slate-400 text-xs">Te enviaremos un enlace para restablecer tu acceso.</p>
            </div>

            <form onSubmit={enviarRecuperacion} className="space-y-3 pt-2">
              <div>
                <label className="block text-[10px] font-extrabold uppercase text-slate-400 mb-1">Correo Electrónico *</label>
                <input
                  type="email"
                  required
                  value={emailAuth}
                  onChange={(e) => setEmailAuth(e.target.value)}
                  placeholder="correo@ejemplo.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <button
                type="submit"
                disabled={cargandoOlvido}
                className="w-full bg-pink-500 hover:bg-pink-400 text-white font-black py-3 rounded-xl uppercase text-xs shadow-lg transition"
              >
                {cargandoOlvido ? "Enviando..." : "Enviar Enlace"}
              </button>
            </form>

            <button
              onClick={() => setOlvidoPassword(false)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 mx-auto pt-2"
            >
              <ArrowLeft size={14} /> Volver al Inicio de Sesión
            </button>
          </div>
        ) : esperandoVerificacion ? (
          <div className="space-y-4 text-center">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40 animate-pulse">
              <MailCheck size={28} />
            </div>
            <h4 className="text-lg font-black text-white uppercase">Verifica tu Correo Electrónico</h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              Enviamos un enlace de confirmación a <strong className="text-emerald-400">{emailAuth}</strong>.
            </p>
            <div className="space-y-2 pt-2">
              <button
                onClick={comprobarVerificacion}
                disabled={cargandoVerificacion}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 rounded-xl uppercase text-xs shadow-lg transition flex items-center justify-center gap-2"
              >
                <RefreshCw size={14} className={cargandoVerificacion ? "animate-spin" : ""} />
                {cargandoVerificacion ? "Comprobando..." : "Ya lo verifiqué"}
              </button>
              <button
                onClick={reenviarCorreo}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2.5 rounded-xl text-xs transition"
              >
                Reenviar Correo
              </button>
              <button
                onClick={() => setEsperandoVerificacion(false)}
                className="text-xs text-slate-500 hover:text-slate-300 underline pt-1 block mx-auto"
              >
                Regresar
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-sky-500/20 text-sky-400 rounded-full flex items-center justify-center mx-auto border border-sky-500/40">
                <Lock size={22} />
              </div>
              <h4 className="text-lg font-black text-white uppercase pt-1">
                {esRegistro ? "Crear una Cuenta" : "Iniciar Sesión"}
              </h4>
            </div>

            <form onSubmit={manejarAutenticacion} className="space-y-3 pt-2">
              {esRegistro && (
                <div>
                  <label className="block text-[10px] font-extrabold uppercase text-slate-400 mb-1">Nombre Completo *</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-2.5 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={nombrePedido}
                      onChange={(e) => setNombrePedido(e.target.value)}
                      placeholder="Ej. Carlos Mendoza"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-extrabold uppercase text-slate-400 mb-1">Correo Electrónico *</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={emailAuth}
                    onChange={(e) => setEmailAuth(e.target.value)}
                    placeholder="correo@ejemplo.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase text-slate-400 mb-1">Contraseña *</label>
                <div className="relative">
                  <KeyRound size={16} className="absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="password"
                    required
                    value={passwordAuth}
                    onChange={(e) => setPasswordAuth(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white"
                  />
                </div>
                {!esRegistro && (
                  <div className="text-right mt-1">
                    <button
                      type="button"
                      onClick={() => setOlvidoPassword(true)}
                      className="text-[11px] text-sky-400 hover:text-sky-300 underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={cargandoAuth}
                className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 text-slate-950 font-black py-3 rounded-xl uppercase text-xs shadow-lg transition mt-2"
              >
                {cargandoAuth ? "Procesando..." : esRegistro ? "Registrarme" : "Iniciar Sesión"}
              </button>
            </form>

            <div className="text-center pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setEsRegistro(!esRegistro)}
                className="text-xs text-pink-400 hover:text-pink-300 font-bold underline transition"
              >
                {esRegistro ? "¿Ya tienes una cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}