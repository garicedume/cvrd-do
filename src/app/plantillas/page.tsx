'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { TEMPLATES_LIST, TemplateInfo } from '../../lib/templatesData';
import { TemplateThumbnail } from '../../components/TemplateThumbnail';
import { Search, ArrowRight, SlidersHorizontal } from 'lucide-react';
import PromoBanner from '../../components/ui/PromoBanner';
import AuthorizedLogosTicker from '../../components/ui/AuthorizedLogosTicker';

export default function PlantillasPage() {
  const [filtroCategoria, setFiltroCategoria] = useState<'todas' | 'standard' | 'premium' | 'master'>('todas');
  const [busqueda, setBusqueda] = useState('');

  const plantillasFiltradas = useMemo(() => {
    return TEMPLATES_LIST.filter((tpl: TemplateInfo) => {
      const cumpleCategoria =
        filtroCategoria === 'todas' ? true : tpl.category === filtroCategoria;
      const cumpleBusqueda =
        tpl.name.toLowerCase().includes(busqueda.toLowerCase()) ||
        tpl.industry.toLowerCase().includes(busqueda.toLowerCase()) ||
        tpl.description.toLowerCase().includes(busqueda.toLowerCase());

      return cumpleCategoria && cumpleBusqueda;
    });
  }, [filtroCategoria, busqueda]);

  const conteoEstandar = TEMPLATES_LIST.filter((t: TemplateInfo) => t.category === 'standard').length;
  const conteoPremium = TEMPLATES_LIST.filter((t: TemplateInfo) => t.category === 'premium').length;
  const conteoMaster = TEMPLATES_LIST.filter((t: TemplateInfo) => t.category === 'master').length;

  return (
    <div 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 font-poppins select-none"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      
      {/* Header del Catálogo */}
      <div className="text-center space-y-3 w-full">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
          Elige la plantilla perfecta para tu perfil
        </h1>
        <p className="text-base text-gray-600 leading-relaxed font-normal max-w-2xl mx-auto">
          Catálogo completo de 50 plantillas optimizadas para el mercado laboral dominicano y filtros ATS.
        </p>
      </div>

      {/* Franja Promocional 01 */}
      <div className="max-w-7xl mx-auto">
        <PromoBanner id="promocion_01" altText="Promoción Plantillas 1" />
      </div>

      {/* Barra de Filtros y Buscador */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/85 backdrop-blur-md p-4 rounded-3xl border border-gray-200/80 shadow-sm">
        
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-bold text-gray-400 flex items-center gap-1 mr-2">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filtrar:
          </span>
          <button
            onClick={() => setFiltroCategoria('todas')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
              filtroCategoria === 'todas' ? 'bg-gray-900 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Todas ({TEMPLATES_LIST.length})
          </button>

          <button
            onClick={() => setFiltroCategoria('standard')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
              filtroCategoria === 'standard' ? 'bg-gray-900 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Básico $3 ({conteoEstandar})
          </button>

          <button
            onClick={() => setFiltroCategoria('premium')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
              filtroCategoria === 'premium' ? 'bg-amber-400 text-gray-950 font-black shadow-md' : 'bg-amber-100/70 text-amber-900 hover:bg-amber-200/70'
            }`}
          >
            Premium $5 ({conteoPremium})
          </button>

          <button
            onClick={() => setFiltroCategoria('master')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
              filtroCategoria === 'master' ? 'bg-gray-950 text-amber-400 font-black shadow-md' : 'bg-gray-900/10 text-gray-800 hover:bg-gray-900/20'
            }`}
          >
            Master $10 ({conteoMaster})
          </button>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por puesto o estilo..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:bg-white transition-all select-text"
          />
        </div>

      </div>

      {/* Grid de Plantillas Filtradas */}
      {plantillasFiltradas.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {plantillasFiltradas.map((template: TemplateInfo) => (
            <div
              key={template.id}
              className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <TemplateThumbnail template={template} />

                <div className="mt-4 space-y-1.5 px-1">
                  <div className="flex justify-between items-center text-[10px] font-bold text-amber-600 uppercase tracking-wider">
                    <span>{template.industry}</span>
                    {template.isPopular && (
                      <span className="bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full font-black tracking-wide">
                        MÁS POPULAR
                      </span>
                    )}
                  </div>
                  <h3 className="font-extrabold text-gray-900 text-lg group-hover:text-amber-600 transition-colors">
                    {template.name}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-normal line-clamp-2">
                    {template.description}
                  </p>
                </div>
              </div>

              <Link
                href={`/builder?template=${template.id}`}
                className="mt-6 w-full py-3 bg-gray-900 hover:bg-amber-400 hover:text-gray-950 text-white font-bold text-xs rounded-full text-center transition-all duration-300 shadow-sm flex items-center justify-center gap-2 active:scale-95 group/btn cursor-pointer"
              >
                <span>Usar esta plantilla</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-gray-200/80">
          <p className="text-lg font-bold text-gray-800">
            No se encontraron plantillas con ese criterio de búsqueda.
          </p>
          <button
            onClick={() => {
              setFiltroCategoria('todas');
              setBusqueda('');
            }}
            className="px-6 py-2.5 bg-gray-900 text-white font-bold text-xs rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Limpiar filtros
          </button>
        </div>
      )}

      {/* Franja Promocional 02 */}
      <div className="max-w-7xl mx-auto py-6 scale-105 sm:scale-110 origin-center transition-transform">
        <PromoBanner id="promocion_02" altText="Promoción Plantillas 2" />
      </div>

      {/* Cuadro Informativo Inferior */}
      <div className="bg-amber-500 text-gray-950 rounded-3xl p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-black">¿Buscas una solución para tu negocio o agencia?</h2>
          <p className="text-xs sm:text-sm text-gray-900 font-medium">
            Con el plan <strong>Master ($10 USD)</strong> obtienes acceso total a las 50 plantillas sin restricciones para atender a todos tus clientes con calidad profesional.
          </p>
        </div>
        <Link
          href="/precios"
          className="shrink-0 flex items-center gap-2 text-xs font-black bg-gray-950 hover:bg-gray-900 text-white px-6 py-3.5 rounded-full transition-colors"
        >
          Ver planes de precios
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Franja Promocional 03 */}
      <div className="max-w-7xl mx-auto py-10 scale-110 sm:scale-125 origin-center transition-transform">
        <PromoBanner id="promocion_03" altText="Promoción Plantillas 3" />
      </div>

      {/* Ticker de Logos Animados */}
      <AuthorizedLogosTicker />

    </div>
  );
}