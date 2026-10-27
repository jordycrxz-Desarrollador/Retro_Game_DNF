"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { User as SupabaseUser } from "@supabase/supabase-js";

// IMPORTANTE: Importamos Firestore y la conexión de tu lib/firebase.ts
import { dbFirestore } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

import Navbar from "@/app/components/Navbar";
import HeroSection from "@/app/components/HeroSection";
import NuestrosEventos from "./components/NuestrosEventos";
import Catalogo from "@/app/components/Catalogo";
import Paquetes, { PAQUETES_DESTACADOS } from "@/app/components/Paquetes";
import RedesSociales from "@/app/components/RedesSociales";
import Footer from "@/app/components/Footer";
import AlertaModal from "@/app/components/AlertaModal";
import AuthModal from "@/app/components/AuthModal";
import PerfilModal from "@/app/components/PerfilModal";
import CotizacionModal from "@/app/components/CotizacionModal";

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

interface AlertaEstado {
  mensaje: string;
  tipo: "exito" | "advertencia" | "error";
}

export default function Home() {
  const [catalogo, setCatalogo] = useState<Producto[]>([]);
  const [cargandoCatalogo, setCargandoCatalogo] = useState<boolean>(true);
  const [categoriaSel, setCategoriaSel] = useState<string>("todos");
  const [cotizacion, setCotizacion] = useState<ItemCotizacion[]>([]);
  const [carritoAbierto, setCarritoAbierto] = useState<boolean>(false);
  const [pasoCotizacion, setPasoCotizacion] = useState<1 | 2 | 3>(1);

  // USUARIO Y AUTENTICACIÓN
  const [usuario, setUsuario] = useState<SupabaseUser | null>(null);
  const [modalAuthAbierto, setModalAuthAbierto] = useState<boolean>(false);
  const [modalPerfilAbierto, setModalPerfilAbierto] = useState<boolean>(false);
  const [emailAuth, setEmailAuth] = useState<string>("");
  const [passwordAuth, setPasswordAuth] = useState<string>("");
  const [esRegistro, setEsRegistro] = useState<boolean>(false);
  const [cargandoAuth, setCargandoAuth] = useState<boolean>(false);
  const [esperandoVerificacion, setEsperandoVerificacion] = useState<boolean>(false);
  const [cargandoVerificacion, setCargandoVerificacion] = useState<boolean>(false);

  // DATOS DEL PEDIDO Y PERFIL
  const [nombrePedido, setNombrePedido] = useState<string>("");
  const [telefonoCliente, setTelefonoCliente] = useState<string>("");
  const [fechaEvento, setFechaEvento] = useState<string>("");
  const [horarioEvento, setHorarioEvento] = useState<string>("Matutino (9:00 AM - 1:00 PM)");
  const [horasExtra, setHorasExtra] = useState<number>(0);
  const [estadoUbicacion, setEstadoUbicacion] = useState<string>("Estado de México");
  const [ciudadUbicacion, setCiudadUbicacion] = useState<string>("Tultepec");
  const [coloniaUbicacion, setColoniaUbicacion] = useState<string>("");
  const [calleNumero, setCalleNumero] = useState<string>("");
  const [referenciaUbicacion, setReferenciaUbicacion] = useState<string>("");

  // FLETE
  const [fueraDeZona, setFueraDeZona] = useState<boolean>(false);
  const [costoEnvioExtra] = useState<number>(350);

  // ALERTA
  const [alerta, setAlerta] = useState<AlertaEstado | null>(null);

  const mostrarNotificacion = (mensaje: string, tipo: "exito" | "advertencia" | "error" = "advertencia") => {
    setAlerta({ mensaje, tipo });
  };

  const obtenerProductosSupabase = async () => {
    setCargandoCatalogo(true);
    const { data, error } = await supabase.from("productos").select("*").order("numero", { ascending: true });

    if (error) {
      console.error("Error al obtener productos:", error);
    } else if (data) {
      setCatalogo(data as Producto[]);
    }
    setCargandoCatalogo(false);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUsuario(session?.user ?? null);
      if (session?.user?.user_metadata?.full_name) {
        setNombrePedido(session.user.user_metadata.full_name);
      }
      if (session?.user?.user_metadata?.telefono) {
        setTelefonoCliente(session.user.user_metadata.telefono);
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null;
      setUsuario(user);

      if (user) {
        setEsperandoVerificacion(false);
        if (user.user_metadata?.full_name) {
          setNombrePedido(user.user_metadata.full_name);
        }
        if (user.user_metadata?.telefono) {
          setTelefonoCliente(user.user_metadata.telefono);
        }
      }
    });

    obtenerProductosSupabase();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const cambiarEstadoUbicacion = (nuevoEstado: string) => {
    setEstadoUbicacion(nuevoEstado);
    const est = nuevoEstado.toLowerCase().trim();
    const esGratis =
      est === "hidalgo" ||
      est === "estado de méxico" ||
      est === "ciudad de méxico" ||
      est === "cdmx";

    setFueraDeZona(!esGratis);
  };

  const manejarAutenticacion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailAuth || !passwordAuth) {
      mostrarNotificacion("Por favor ingresa tu correo y contraseña.", "advertencia");
      return;
    }

    setCargandoAuth(true);

    if (esRegistro) {
      const { data, error } = await supabase.auth.signUp({
        email: emailAuth,
        password: passwordAuth,
        options: {
          data: { full_name: nombrePedido || "Cliente DNF", telefono: telefonoCliente },
          emailRedirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
        },
      });

      setCargandoAuth(false);

      if (error) {
        if (error.message.toLowerCase().includes("already registered")) {
          mostrarNotificacion("El correo ya se encuentra registrado. Inicia sesión.", "advertencia");
        } else {
          mostrarNotificacion(`No se pudo crear la cuenta: ${error.message}`, "error");
        }
      } else if (data.user && !data.session) {
        setEsperandoVerificacion(true);
        mostrarNotificacion(`¡Cuenta registrada! Se envió verificación a ${emailAuth}.`, "exito");
      } else if (data.session) {
        setUsuario(data.session.user);
        setModalAuthAbierto(false);
        mostrarNotificacion("¡Cuenta creada y verificada con éxito!", "exito");
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailAuth,
        password: passwordAuth,
      });

      setCargandoAuth(false);

      if (error) {
        if (error.message.toLowerCase().includes("email not confirmed")) {
          setEsperandoVerificacion(true);
          mostrarNotificacion("Tu correo aún no ha sido verificado.", "advertencia");
        } else {
          mostrarNotificacion("Correo o contraseña incorrectos.", "error");
        }
      } else if (data.user) {
        setUsuario(data.user);
        setEsperandoVerificacion(false);
        setModalAuthAbierto(false);
        mostrarNotificacion("Has iniciado sesión con éxito.", "exito");
      }
    }
  };

  const comprobarVerificacion = async () => {
    setCargandoVerificacion(true);
    const { data: { session } } = await supabase.auth.getSession();

    if (session?.user) {
      setUsuario(session.user);
      setEsperandoVerificacion(false);
      setModalAuthAbierto(false);
      setCargandoVerificacion(false);
      mostrarNotificacion("¡Correo verificado con éxito!", "exito");
      return;
    }

    if (emailAuth && passwordAuth) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailAuth,
        password: passwordAuth,
      });

      setCargandoVerificacion(false);

      if (!error && data.user) {
        setUsuario(data.user);
        setEsperandoVerificacion(false);
        setModalAuthAbierto(false);
        mostrarNotificacion("¡Correo verificado con éxito!", "exito");
      } else {
        mostrarNotificacion("Aún no detectamos la confirmación en tu correo.", "advertencia");
      }
    } else {
      setCargandoVerificacion(false);
      mostrarNotificacion("Haz clic en el enlace enviado a tu correo.", "advertencia");
    }
  };

  const reenviarCorreo = async () => {
    if (!emailAuth) return;
    const { error } = await supabase.auth.resend({ type: "signup", email: emailAuth });
    if (error) mostrarNotificacion(`No se pudo reenviar: ${error.message}`, "error");
    else mostrarNotificacion(`Nuevo correo enviado a ${emailAuth}.`, "exito");
  };

  const cerrarSesion = async () => {
    await supabase.auth.signOut();
    setUsuario(null);
    setEsperandoVerificacion(false);
    setModalAuthAbierto(false);
    setModalPerfilAbierto(false);
    mostrarNotificacion("Has cerrado sesión correctamente.", "exito");
  };

  const getCantidadEnCotizacion = (idProducto: string) => {
    const item = cotizacion.find((i) => i.idProductoOriginal === idProducto);
    return item ? item.cantidad : 0;
  };

  const agregarProducto = (producto: Producto) => {
    if (producto.stock === 0) {
      mostrarNotificacion(`El juego "${producto.nombre}" está agotado.`, "advertencia");
      return;
    }

    const existe = cotizacion.find((item) => item.idProductoOriginal === producto.id);
    const cantidadActual = existe ? existe.cantidad : 0;

    if (cantidadActual >= producto.stock) {
      mostrarNotificacion(`Límite alcanzado: solo hay ${producto.stock} unidad(es).`, "advertencia");
      return;
    }

    setCotizacion((prev) => {
      if (existe) {
        return prev.map((item) =>
          item.idProductoOriginal === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [
        ...prev,
        {
          idCotizacion: `prod-${producto.id}`,
          idProductoOriginal: producto.id,
          tipo: "producto",
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: 1,
          stockMax: producto.stock,
        },
      ];
    });
    setCarritoAbierto(true);
    setPasoCotizacion(1);
  };

  const agregarPaquete = (paq: typeof PAQUETES_DESTACADOS[0]) => {
    const existe = cotizacion.find((item) => item.idCotizacion === paq.id);
    if (existe) {
      mostrarNotificacion(`El "${paq.nombre}" ya está agregado (máximo 1 por reserva).`, "advertencia");
      setCarritoAbierto(true);
      return;
    }

    const detallesCompletos = [...paq.incluyeFijo];
    if (paq.requiereSeleccion) {
      paq.requiereSeleccion.forEach((req) => {
        detallesCompletos.push(`[A elegir] ${req.etiqueta}`);
      });
    }

    setCotizacion((prev) => [
      ...prev,
      {
        idCotizacion: paq.id,
        tipo: "paquete",
        nombre: paq.nombre,
        precio: paq.precio,
        cantidad: 1,
        detalles: detallesCompletos,
        requiereSeleccion: paq.requiereSeleccion || [],
        juegosSeleccionados: {},
      },
    ]);
    setCarritoAbierto(true);
    setPasoCotizacion(1);
    mostrarNotificacion(`Se agregó el "${paq.nombre}" a tu cotización.`, "exito");
  };

  const seleccionarJuegoParaPaquete = (idCotiz: string, etiquetaReq: string, nombreJuego: string) => {
    setCotizacion((prev) =>
      prev.map((item) => {
        if (item.idCotizacion === idCotiz) {
          const actualizadas = { ...(item.juegosSeleccionados || {}), [etiquetaReq]: nombreJuego };
          return { ...item, juegosSeleccionados: actualizadas };
        }
        return item;
      })
    );
  };

  const cambiarCantidad = (idCotizacion: string, delta: number) => {
    const itemActual = cotizacion.find((i) => i.idCotizacion === idCotizacion);
    if (itemActual?.tipo === "paquete" && delta > 0) {
      mostrarNotificacion("Solo se permite 1 unidad por cada paquete seleccionado.", "advertencia");
      return;
    }

    setCotizacion((prev) =>
      prev
        .map((i) => {
          if (i.idCotizacion === idCotizacion) {
            const nueva = i.cantidad + delta;
            if (delta > 0 && i.stockMax !== undefined && nueva > i.stockMax) {
              mostrarNotificacion(`Disponibilidad máxima: ${i.stockMax}`, "advertencia");
              return i;
            }
            return nueva > 0 ? { ...i, cantidad: nueva } : null;
          }
          return i;
        })
        .filter(Boolean) as ItemCotizacion[]
    );
  };

  const eliminarItemCotizacion = (idCotizacion: string) => {
    setCotizacion((prev) => prev.filter((item) => item.idCotizacion !== idCotizacion));
    mostrarNotificacion("Elemento eliminado de la cotización.", "exito");
  };

  // FUNCIÓN PARA GUARDAR EL PEDIDO EN SUPABASE + FIREBASE Y ABRIR WHATSAPP
  const enviarCotizacionWhatsApp = async () => {
    if (!usuario) {
      mostrarNotificacion("Debes iniciar sesión para registrar tu cotización.", "advertencia");
      return;
    }

    const subtotalJuegos = cotizacion.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    const costoHorasExtra = horasExtra * 100;
    const fleteAplicado = fueraDeZona ? costoEnvioExtra : 0;
    const totalGeneral = subtotalJuegos + costoHorasExtra + fleteAplicado;

    // 1. Generar código único de pedido
    const codigoPedido = `DNF-${Math.floor(1000 + Math.random() * 9000)}`;

    // 2. Insertar en Supabase (como lo tienes actualmente)
    const { data: pedidoCreado, error: errorPedido } = await supabase
      .from('pedidos')
      .insert([
        {
          codigo_pedido: codigoPedido,
          nombre_pedido: nombrePedido,
          telefono: telefonoCliente,
          fecha_evento: fechaEvento,
          horario: horarioEvento,
          estado: estadoUbicacion,
          ciudad: ciudadUbicacion,
          colonia: coloniaUbicacion,
          calle_numero: calleNumero,
          referencias: referenciaUbicacion,
          fuera_de_zona: fueraDeZona,
          subtotal: subtotalJuegos,
          flete: fleteAplicado,
          total: totalGeneral,
          anticipo: totalGeneral * 0.5,
          estatus_pedido: 'enviada',
          metodo_pago: 'pendiente',
          usuario_id: usuario.id
        }
      ])
      .select()
      .single();

    if (errorPedido) {
      console.error("Error al guardar el pedido:", errorPedido.message);
      mostrarNotificacion("Error al registrar el pedido en el sistema.", "error");
      return;
    }

    // 3. Insertar items en Supabase
    const itemsParaInsertar = cotizacion.map((item) => ({
      pedido_id: pedidoCreado.id,
      tipo: item.tipo,
      nombre: item.nombre,
      precio_unitario: item.precio,
      cantidad: item.cantidad,
      detalles: item.detalles || null
    }));

    await supabase.from('items_pedido').insert(itemsParaInsertar);

    // 4. NUEVO: REPLICAR EN FIREBASE FIRESTORE (Para la App Android)
    let detalleItemsTexto = cotizacion.map(i => `• ${i.cantidad}x ${i.nombre} ($${i.precio * i.cantidad} MXN)`).join("\n");
    let ubicacionTexto = `${estadoUbicacion}, ${ciudadUbicacion}, ${coloniaUbicacion}, ${calleNumero}`;

    try {
      await addDoc(collection(dbFirestore, "cotizaciones_web"), {
        id: pedidoCreado.id.toString(),
        nombreCliente: nombrePedido,
        telefonoCliente: telefonoCliente,
        fechaEvento: fechaEvento || "Por definir",
        horarioEvento: horarioEvento,
        horasExtra: `${horasExtra} hrs`,
        ubicacion: ubicacionTexto,
        referencia: referenciaUbicacion || "Sin referencias",
        juegosDetalle: detalleItemsTexto,
        subtotal: subtotalJuegos,
        descuento: 0,
        flete: fleteAplicado,
        totalFinal: totalGeneral,
        anticipoMonto: 0,
        saldoPendiente: totalGeneral,
        estado: "PENDIENTE"
      });
    } catch (errorFirebase) {
      console.error("Error guardando en Firestore:", errorFirebase);
    }

    // 5. Abrir WhatsApp con el formato de mensaje
    const numeroWhatsApp = "525626784076";
    let mensaje = `¡Hola! Me interesa cotizar los siguientes juegos de RETRO GAME DNF para mi evento:\n\n` +
      `*Código de Pedido:* ${codigoPedido}\n` +
      `*Juegos/Paquetes Seleccionados:*\n${detalleItemsTexto}\n\n` +
      `*Nombre:* ${nombrePedido}\n` +
      `*Teléfono:* ${telefonoCliente}\n` +
      `*Fecha:* ${fechaEvento || "Por definir"}\n` +
      `*Horario:* ${horarioEvento}\n` +
      `*Horas Extra:* ${horasExtra} hrs (+$${costoHorasExtra} MXN)\n` +
      `*Ubicación:* ${ubicacionTexto}\n` +
      `*Referencia de la zona:* ${referenciaUbicacion}\n\n` +
      `*Total Estimado:* $${totalGeneral} MXN\n` +
      `_(Nota: Quedo a la espera de las indicaciones sobre el porcentaje de anticipo)_\n\n` +
      `¿Me pueden confirmar disponibilidad?`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
    
    mostrarNotificacion("¡Cotización enviada y registrada en tu historial!", "exito");
    setCotizacion([]);
    setCarritoAbierto(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative">
      <AlertaModal alerta={alerta} onCerrar={() => setAlerta(null)} />

      <Navbar
        usuario={usuario}
        cotizacionLength={cotizacion.length}
        onAbrirAuth={() => setModalAuthAbierto(true)}
        onAbrirPerfil={() => setModalPerfilAbierto(true)}
        onAbrirCarrito={() => setCarritoAbierto(true)}
      />

      <div id="home">
        <HeroSection />
      </div>

      <NuestrosEventos />

      <Catalogo
        catalogo={catalogo}
        cargando={cargandoCatalogo}
        categoriaSel={categoriaSel}
        onCambiarCategoria={setCategoriaSel}
        onAgregarProducto={agregarProducto}
        getCantidadEnCotizacion={getCantidadEnCotizacion}
      />

      <Paquetes onAgregarPaquete={agregarPaquete} />

      <RedesSociales />

      <Footer />

      <AuthModal
        abierto={modalAuthAbierto}
        onCerrar={() => setModalAuthAbierto(false)}
        usuario={usuario}
        nombrePedido={nombrePedido}
        setNombrePedido={setNombrePedido}
        emailAuth={emailAuth}
        setEmailAuth={setEmailAuth}
        passwordAuth={passwordAuth}
        setPasswordAuth={setPasswordAuth}
        esRegistro={esRegistro}
        setEsRegistro={setEsRegistro}
        cargandoAuth={cargandoAuth}
        esperandoVerificacion={esperandoVerificacion}
        cargandoVerificacion={cargandoVerificacion}
        manejarAutenticacion={manejarAutenticacion}
        comprobarVerificacion={comprobarVerificacion}
        reenviarCorreo={reenviarCorreo}
        cerrarSesion={cerrarSesion}
        setEsperandoVerificacion={setEsperandoVerificacion}
        mostrarNotificacion={mostrarNotificacion}
      />

      <PerfilModal
        abierto={modalPerfilAbierto}
        onCerrar={() => setModalPerfilAbierto(false)}
        usuario={usuario}
        nombrePerfil={nombrePedido}
        setNombrePerfil={setNombrePedido}
        telefonoPerfil={telefonoCliente}
        setTelefonoPerfil={setTelefonoCliente}
        mostrarNotificacion={mostrarNotificacion}
        cerrarSesion={cerrarSesion}
      />

      <CotizacionModal
        abierto={carritoAbierto}
        onCerrar={() => setCarritoAbierto(false)}
        cotizacion={cotizacion}
        catalogo={catalogo}
        pasoCotizacion={pasoCotizacion}
        setPasoCotizacion={setPasoCotizacion}
        usuario={usuario}
        esperandoVerificacion={esperandoVerificacion}
        cargandoVerificacion={cargandoVerificacion}
        cargandoAuth={cargandoAuth}
        emailAuth={emailAuth}
        setEmailAuth={setEmailAuth}
        passwordAuth={passwordAuth}
        setPasswordAuth={setPasswordAuth}
        esRegistro={esRegistro}
        setEsRegistro={setEsRegistro}
        nombrePedido={nombrePedido}
        setNombrePedido={setNombrePedido}
        telefonoCliente={telefonoCliente}
        setTelefonoCliente={setTelefonoCliente}
        fechaEvento={fechaEvento}
        setFechaEvento={setFechaEvento}
        horarioEvento={horarioEvento}
        setHorarioEvento={setHorarioEvento}
        horasExtra={horasExtra}
        setHorasExtra={setHorasExtra}
        estadoUbicacion={estadoUbicacion}
        cambiarEstadoUbicacion={cambiarEstadoUbicacion}
        ciudadUbicacion={ciudadUbicacion}
        setCiudadUbicacion={setCiudadUbicacion}
        coloniaUbicacion={coloniaUbicacion}
        setColoniaUbicacion={setColoniaUbicacion}
        calleNumero={calleNumero}
        setCalleNumero={setCalleNumero}
        referenciaUbicacion={referenciaUbicacion}
        setReferenciaUbicacion={setReferenciaUbicacion}
        fueraDeZona={fueraDeZona}
        costoEnvioExtra={costoEnvioExtra}
        cambiarCantidad={cambiarCantidad}
        eliminarItemCotizacion={eliminarItemCotizacion}
        seleccionarJuegoParaPaquete={seleccionarJuegoParaPaquete}
        manejarAutenticacion={manejarAutenticacion}
        comprobarVerificacion={comprobarVerificacion}
        mostrarNotificacion={mostrarNotificacion}
        // Pasamos nuestra función personalizada para que el botón de WhatsApp guarde en Supabase
        enviarCotizacionWhatsApp={enviarCotizacionWhatsApp} 
      />
    </div>
  );
}