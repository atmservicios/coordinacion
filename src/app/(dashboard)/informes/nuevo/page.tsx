import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import FormularioInforme from '@/components/FormularioInforme';

export const metadata = {
  title: 'Nuevo Informe OT | ATM Servicios',
  description: 'Crear un nuevo informe de orden de trabajo',
};

export default function NuevoPage() {
  return (
    <main className="min-h-screen dot-grid">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #7cc124 0%, transparent 70%)' }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] glass">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/informes"
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 text-slate-400" />
            </Link>
            <div className="flex items-center gap-3">
              <img src="/Imagen1.jpg" alt="ATM Servicios Logo" className="h-8 object-contain" />
              <div className="border-l border-white/10 pl-3">
                <p className="text-[10px] text-slate-500 leading-none mb-0.5">Módulo de Informes</p>
                <h1 className="text-xs font-semibold text-slate-300 leading-none">
                  Nuevo Informe OT
                </h1>
              </div>
            </div>
          </div>
          <span className="text-xs text-slate-600 hidden sm:block">
            Completa todos los campos requeridos (*)
          </span>
        </div>
      </header>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        <FormularioInforme />
      </div>
    </main>
  );
}
