"use client";

export default function RedesSociales() {
  return (
    <section id="redes" className="py-20 px-4 border-b border-slate-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-black uppercase text-white tracking-tight mb-4">
          Síguenos en <span className="text-pink-500">Nuestras Redes</span>
        </h2>
        <p className="text-slate-400 text-sm mb-10 max-w-xl mx-auto">
          Mira fotos reales de nuestras instalaciones en eventos, videos de cómo funcionan los juegos y promociones exclusivas.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Tarjeta de Instagram */}
          <a
            href="https://www.instagram.com/retrogamednf?srtk=ZW5sendkMDY5Z2tm"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-pink-500 p-6 rounded-2xl flex flex-col items-center gap-3 transition group"
          >
            <div className="w-12 h-12 bg-pink-500/10 text-pink-400 group-hover:scale-110 transition rounded-full flex items-center justify-center border border-pink-500/30">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
            <span className="font-extrabold text-white text-sm">Instagram</span>
            <span className="text-xs text-slate-500">@retrogamednf</span>
          </a>

          {/* Tarjeta de Facebook */}
          <a
            href="https://www.facebook.com/retrogamednf1"
            target="_blank"
            rel="noopener noreferrer"
            suppressHydrationWarning
            className="bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-sky-500 p-6 rounded-2xl flex flex-col items-center gap-3 transition group"
          >
            <div className="w-12 h-12 bg-sky-500/10 text-sky-400 group-hover:scale-110 transition rounded-full flex items-center justify-center border border-sky-500/30">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <span className="font-extrabold text-white text-sm">Facebook</span>
            <span className="text-xs text-slate-500">RETRO GAME DNF</span>
          </a>

          {/* Tarjeta de TikTok Actualizada */}
          <a
            href="https://www.tiktok.com/@retrogamerdnf?_r=1&_t=ZS-9AkfKvll8PE"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-purple-500 p-6 rounded-2xl flex flex-col items-center gap-3 transition group"
          >
            <div className="w-12 h-12 bg-purple-500/10 text-purple-400 group-hover:scale-110 transition rounded-full flex items-center justify-center border border-purple-500/30">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </div>
            <span className="font-extrabold text-white text-sm">TikTok</span>
            <span className="text-xs text-slate-500">@RETROGAMEDNF</span>
          </a>
        </div>
      </div>
    </section>
  );
}