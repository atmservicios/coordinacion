'use client';

import { useState } from 'react';
import { supabaseCoordinacion } from '@/lib/supabaseCoordinacion';
import { Save, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface FormularioServicioProps {
  onSuccess: () => void;
}

const emptyForm = () => ({
  fecha: '',
  hora_inicio: '',
  hora_termino: '',
  tipo_trabajo: '',
  local: '',
  direccion: '',
  atm: '',
  comuna: '',
  asignado_a: '',
  nombre_solicitante: '',
  solicitado_por: '',
  banco_empresa: '',
  informe: '',
  ot: '',
});

export default function FormularioServicio({ onSuccess }: FormularioServicioProps) {
  const [form, setForm] = useState(emptyForm());
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    // Preparar payload convirtiendo strings vacíos en null
    const payload = Object.fromEntries(
      Object.entries(form).map(([key, val]) => [key, val.trim() === '' ? null : val])
    );

    try {
      const { error } = await supabaseCoordinacion.from('servicios').insert([payload]);

      if (error) {
        setStatus({ type: 'error', message: `Error de Supabase: ${error.message}` });
      } else {
        setStatus({ type: 'success', message: 'Servicio guardado exitosamente.' });
        setForm(emptyForm());
        onSuccess();
      }
    } catch (err: unknown) {
      console.error(err);
      setStatus({ type: 'error', message: 'Ocurrió un error inesperado al guardar.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-6 border border-white/5 relative">
      <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400 mb-6 flex items-center gap-2">
        <span className="w-1.5 h-3 rounded bg-indigo-500"></span>
        Registrar Nuevo Servicio
      </h3>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Fila 1 */}
        <div className="space-y-1">
          <label className="label">Fecha</label>
          <input
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="space-y-1">
          <label className="label">Hora Inicio</label>
          <input
            type="time"
            name="hora_inicio"
            value={form.hora_inicio}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="space-y-1">
          <label className="label">Hora Término</label>
          <input
            type="time"
            name="hora_termino"
            value={form.hora_termino}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="space-y-1">
          <label className="label">Tipo Trabajo</label>
          <input
            type="text"
            name="tipo_trabajo"
            placeholder="Ej: Anclaje, Retiro"
            value={form.tipo_trabajo}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        {/* Fila 2 */}
        <div className="space-y-1">
          <label className="label">Local</label>
          <input
            type="text"
            name="local"
            placeholder="Ej: Sucursal Centro"
            value={form.local}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="space-y-1">
          <label className="label">Dirección</label>
          <input
            type="text"
            name="direccion"
            placeholder="Dirección del local"
            value={form.direccion}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="space-y-1">
          <label className="label">ATM</label>
          <input
            type="text"
            name="atm"
            placeholder="Nº de ATM"
            value={form.atm}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="space-y-1">
          <label className="label">Comuna</label>
          <input
            type="text"
            name="comuna"
            placeholder="Ej: Providencia"
            value={form.comuna}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        {/* Fila 3 */}
        <div className="space-y-1">
          <label className="label">Asignado A</label>
          <input
            type="text"
            name="asignado_a"
            placeholder="Nombre técnico"
            value={form.asignado_a}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="space-y-1">
          <label className="label">Nombre Solicitante</label>
          <input
            type="text"
            name="nombre_solicitante"
            placeholder="Ej: Carol"
            value={form.nombre_solicitante}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="space-y-1">
          <label className="label">Solicitado Por</label>
          <input
            type="text"
            name="solicitado_por"
            placeholder="Ej: Banco, NCR"
            value={form.solicitado_por}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="space-y-1">
          <label className="label">Banco/Empresa</label>
          <input
            type="text"
            name="banco_empresa"
            placeholder="Ej: Santander"
            value={form.banco_empresa}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        {/* Fila 4 */}
        <div className="space-y-1 md:col-span-2">
          <label className="label">Informe</label>
          <input
            type="text"
            name="informe"
            placeholder="Detalle o estado del informe"
            value={form.informe}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="label">OT</label>
          <input
            type="text"
            name="ot"
            placeholder="Número de OT"
            value={form.ot}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        {/* Acciones & Status */}
        <div className="md:col-span-4 flex items-center justify-between gap-4 pt-2">
          <div className="flex-1">
            {status.type === 'success' && (
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{status.message}</span>
              </div>
            )}
            {status.type === 'error' && (
              <div className="flex items-center gap-2 text-xs text-red-400 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{status.message}</span>
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary py-2.5 px-6 flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:shadow-indigo-500/25 shrink-0"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Guardar Servicio
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
