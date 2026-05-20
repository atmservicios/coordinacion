'use client';

import { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';

interface Servicio {
  id: string;
  fecha: string | null;
  hora_inicio: string | null;
  hora_termino: string | null;
  tipo_trabajo: string | null;
  local: string | null;
  direccion: string | null;
  atm: string | null;
  comuna: string | null;
  asignado_a: string | null;
  nombre_solicitante: string | null;
  solicitado_por: string | null;
  banco_empresa: string | null;
  informe: string | null;
  ot: string | null;
}

interface TablaServiciosProps {
  servicios: Servicio[];
}

export default function TablaServicios({ servicios }: TablaServiciosProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterComuna, setFilterComuna] = useState('');
  const [filterAsignado, setFilterAsignado] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Filtrar servicios
  const filteredServicios = useMemo(() => {
    return servicios.filter((s) => {
      const matchSearch = 
        (s.local?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (s.atm?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (s.ot?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (s.tipo_trabajo?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (s.direccion?.toLowerCase() || '').includes(searchTerm.toLowerCase());

      const matchComuna = filterComuna === '' || s.comuna === filterComuna;
      const matchAsignado = filterAsignado === '' || s.asignado_a === filterAsignado;

      return matchSearch && matchComuna && matchAsignado;
    });
  }, [servicios, searchTerm, filterComuna, filterAsignado]);

  // Listas únicas para filtros selectores
  const comunas = useMemo(() => {
    const set = new Set(servicios.map((s) => s.comuna).filter(Boolean));
    return Array.from(set).sort();
  }, [servicios]);

  const asignados = useMemo(() => {
    const set = new Set(servicios.map((s) => s.asignado_a).filter(Boolean));
    return Array.from(set).sort();
  }, [servicios]);

  // Paginación
  const totalPages = Math.ceil(filteredServicios.length / itemsPerPage) || 1;
  const paginatedServicios = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredServicios.slice(start, start + itemsPerPage);
  }, [filteredServicios, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-4">
      {/* Controles de Búsqueda y Filtros */}
      <div className="glass-card p-5 border border-white/5 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Barra de búsqueda */}
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Buscar por ATM, local, OT, dirección, trabajo..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="input-field pl-10 h-11"
            />
          </div>

          {/* Indicador de cantidad */}
          <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider shrink-0 bg-slate-900/40 border border-white/5 py-2 px-3 rounded-lg flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
            Mostrando {filteredServicios.length} de {servicios.length} registros
          </div>
        </div>

        {/* Filtros avanzados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/[0.05] pt-4">
          <div className="space-y-1">
            <label className="label">Filtrar por Comuna</label>
            <select
              value={filterComuna}
              onChange={(e) => {
                setFilterComuna(e.target.value);
                setCurrentPage(1);
              }}
              className="input-field h-11 bg-slate-950"
            >
              <option value="">Todas las comunas</option>
              {comunas.map((comuna) => (
                <option key={comuna} value={comuna || ''}>
                  {comuna}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="label">Filtrar por Técnico Asignado</label>
            <select
              value={filterAsignado}
              onChange={(e) => {
                setFilterAsignado(e.target.value);
                setCurrentPage(1);
              }}
              className="input-field h-11 bg-slate-950"
            >
              <option value="">Todos los técnicos</option>
              {asignados.map((nombre) => (
                <option key={nombre} value={nombre || ''}>
                  {nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tabla con scroll horizontal */}
      <div className="glass-card border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 text-slate-400 font-bold border-b border-white/[0.06] text-[10px] uppercase tracking-wider">
                <th className="p-4 whitespace-nowrap">Fecha</th>
                <th className="p-4 whitespace-nowrap">Hora Inicio</th>
                <th className="p-4 whitespace-nowrap">Hora Término</th>
                <th className="p-4 whitespace-nowrap">Tipo Trabajo</th>
                <th className="p-4 whitespace-nowrap">Local</th>
                <th className="p-4 whitespace-nowrap">Dirección</th>
                <th className="p-4 whitespace-nowrap">ATM</th>
                <th className="p-4 whitespace-nowrap">Comuna</th>
                <th className="p-4 whitespace-nowrap">Asignado A</th>
                <th className="p-4 whitespace-nowrap">Nombre Solicitante</th>
                <th className="p-4 whitespace-nowrap">Solicitado Por</th>
                <th className="p-4 whitespace-nowrap">Banco/Empresa</th>
                <th className="p-4 whitespace-nowrap">Informe</th>
                <th className="p-4 whitespace-nowrap">OT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {paginatedServicios.length > 0 ? (
                paginatedServicios.map((s, idx) => (
                  <tr key={s.id || idx} className="hover:bg-white/[0.02] text-slate-300 transition-colors">
                    <td className="p-4 font-medium whitespace-nowrap">{s.fecha || '-'}</td>
                    <td className="p-4 whitespace-nowrap">{s.hora_inicio || '-'}</td>
                    <td className="p-4 whitespace-nowrap">{s.hora_termino || '-'}</td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-semibold">
                        {s.tipo_trabajo || '-'}
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap">{s.local || '-'}</td>
                    <td className="p-4 max-w-[200px] truncate" title={s.direccion || ''}>{s.direccion || '-'}</td>
                    <td className="p-4 font-mono font-bold text-slate-400 whitespace-nowrap">{s.atm || '-'}</td>
                    <td className="p-4 whitespace-nowrap">{s.comuna || '-'}</td>
                    <td className="p-4 font-medium whitespace-nowrap">{s.asignado_a || '-'}</td>
                    <td className="p-4 whitespace-nowrap">{s.nombre_solicitante || '-'}</td>
                    <td className="p-4 whitespace-nowrap">{s.solicitado_por || '-'}</td>
                    <td className="p-4 whitespace-nowrap">{s.banco_empresa || '-'}</td>
                    <td className="p-4 max-w-[150px] truncate" title={s.informe || ''}>{s.informe || '-'}</td>
                    <td className="p-4 font-mono text-slate-400 whitespace-nowrap">{s.ot || '-'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={14} className="p-8 text-center text-slate-500 text-sm">
                    No se encontraron servicios que coincidan con los filtros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 bg-slate-950/40 border-t border-white/[0.05] text-xs">
            <span className="text-slate-500">
              Página {currentPage} de {totalPages}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1.5 rounded bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed text-slate-400 hover:text-slate-200 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed text-slate-400 hover:text-slate-200 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
