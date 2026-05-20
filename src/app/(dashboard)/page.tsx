import Link from 'next/link';
import { Calendar, FileText, ArrowRight, Server, ShieldCheck } from 'lucide-react';

export default function PortalHubPage() {
  return (
    <main className="flex-1 flex flex-col justify-center items-center px-6 py-12 dot-grid min-h-screen">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #7cc124 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #4d7c0f 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 text-center max-w-3xl w-full mb-12">
        <img src="/Imagen1.jpg" alt="ATM Servicios Logo" className="h-16 object-contain mx-auto mb-6" />
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Panel de Control <span className="gradient-text">ATM Servicios</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Bienvenido al portal central de operaciones. Selecciona el módulo con el que deseas trabajar el día de hoy.
        </p>
      </div>

      {/* Grid de Módulos */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {/* Módulo de Coordinación */}
        <div className="group glass-card overflow-hidden hover:border-brand-500/30 transition-all duration-300 flex flex-col justify-between p-8 min-h-[320px]">
          <div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-brand-500/10 border border-brand-500/20 text-brand-500 mb-6 group-hover:scale-110 transition-transform duration-300">
              <Calendar className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-brand-500 transition-colors">
              Coordinación de Servicios ATM
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Planifica visitas, consulta el listado completo de programación técnica y registra nuevas solicitudes de mantenimiento preventivo y correctivo.
            </p>
          </div>
          
          <div className="flex items-center justify-between border-t border-white/[0.06] pt-4">
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-500/70" />
              Requiere Credenciales
            </span>
            <Link 
              href="/coordinacion" 
              className="btn-primary py-2 px-5 text-xs flex items-center gap-1"
            >
              Entrar Módulo
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Módulo de Informes */}
        <div className="group glass-card overflow-hidden hover:border-brand-500/30 transition-all duration-300 flex flex-col justify-between p-8 min-h-[320px]">
          <div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-brand-500/10 border border-brand-500/20 text-brand-500 mb-6 group-hover:scale-110 transition-transform duration-300">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-brand-500 transition-colors">
              Generador de Informes OT
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Rellena los datos de la orden de trabajo, carga las fotografías de la visita inspectiva y exporta directamente plantillas profesionales a Word (.docx).
            </p>
          </div>
          
          <div className="flex items-center justify-between border-t border-white/[0.06] pt-4">
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
              <Server className="w-3.5 h-3.5 text-brand-500/70" />
              Acceso Libre / Nube
            </span>
            <Link 
              href="/informes" 
              className="btn-primary py-2 px-5 text-xs flex items-center gap-1"
            >
              Entrar Módulo
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
