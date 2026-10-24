'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { 
  Building2, Lock, ArrowRight, CheckCircle2, LogOut, FileCheck, 
  ShieldCheck, RefreshCw, Mail, X, BarChart3, DownloadCloud, 
  Settings, HelpCircle, AlertTriangle, Image as ImageIcon, Key, Save, Upload
} from 'lucide-react';

export default function AccesoSeguroPage() {
  const { user, isB2B, loginB2B, logout, profile, updateProfile, updatePassword, loading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [activeTab, setActiveTab] = useState<'dashboard' | 'perfil' | 'guia' | 'soporte'>('dashboard');
  const [statsFilter, setStatsFilter] = useState<'dia' | 'semana' | 'mes' | 'anio'>('mes');

  // Perfil states
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [profileMsg, setProfileMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Password states
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passMsg, setPassMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (profile) {
      setCompanyName(profile.company_name || '');
      setAddress(profile.address || '');
      setCountry(profile.country || 'República Dominicana');
      setPhone(profile.phone || '');
      setLogoUrl(profile.logo_url || '');
    }
  }, [profile]);

  const [forceReady, setForceReady] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setForceReady(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactoForm, setContactoForm] = useState({ nombre: '', contacto: '', mensaje: '' });
  const [enviadoContacto, setEnviadoContacto] = useState(false);
  const [enviandoMensaje, setEnviandoMensaje] = useState(false);

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState('');

  const generateCaptcha = useCallback(() => {
    setNum1(Math.floor(Math.random() * 9) + 1);
    setNum2(Math.floor(Math.random() * 9) + 1);
    setCaptchaAnswer('');
  }, []);

  useEffect(() => {
    generateCaptcha();
  }, [generateCaptcha]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (parseInt(captchaAnswer, 10) !== num1 + num2) {
      setErrorMsg('Respuesta de verificación incorrecta.');
      generateCaptcha();
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await loginB2B(email, password);
      if (result && result.error) {
        setErrorMsg(result.error.includes('Invalid login credentials') ? 'Correo o contraseña incorrectos.' : result.error);
        generateCaptcha();
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Error al procesar el inicio de sesión.');
      generateCaptcha();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setProfileMsg({ type: 'error', text: 'El archivo supera el límite estricto de 2MB.' });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoUrl(reader.result as string);
      setProfileMsg({ type: 'success', text: 'Logotipo cargado correctamente en memoria. Haz clic en guardar.' });
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMsg(null);
    const res = await updateProfile({
      company_name: companyName,
      address,
      country,
      phone,
      logo_url: logoUrl
    });
    if (res.error) {
      setProfileMsg({ type: 'error', text: res.error });
    } else {
      setProfileMsg({ type: 'success', text: '¡Perfil de empresa actualizado con éxito!' });
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassMsg(null);
    if (newPass.length < 6) {
      setPassMsg({ type: 'error', text: 'La nueva contraseña debe tener al menos 6 caracteres.' });
      return;
    }
    const res = await updatePassword(currentPass, newPass);
    if (res.error) {
      setPassMsg({ type: 'error', text: res.error });
    } else {
      setPassMsg({ type: 'success', text: '¡Contraseña actualizada con éxito!' });
      setCurrentPass('');
      setNewPass('');
    }
  };

  const handleContactoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviandoMensaje(true);
    try {
      const response = await fetch('/api/contacto-global', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: contactoForm.nombre,
          contacto: contactoForm.contacto,
          mensaje: contactoForm.mensaje,
          tipo: 'Soporte / Reporte B2B'
        }),
      });
      const resultado = await response.json();
      if (response.ok && resultado.success) {
        setEnviadoContacto(true);
      } else {
        alert('Hubo un error al enviar el mensaje.');
      }
    } catch {
      alert('Error de conexión.');
    } finally {
      setEnviandoMensaje(false);
    }
  };

  if (loading && !forceReady) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center font-poppins select-none">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10 font-poppins space-y-8 select-none">
      
      {user && isB2B ? (
        <div className="w-full space-y-8 animate-fadeIn">
          
          {/* PERFIL SUPERIOR AMPLIO Y ELEGANTE */}
          <div className="w-full bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 bg-linear-to-r from-white via-white to-gray-50">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gray-900 text-amber-400 flex items-center justify-center font-black text-4xl shadow-lg shrink-0 overflow-hidden border-2 border-gray-800">
                {profile?.logo_url ? (
                  <img src={profile.logo_url} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <Building2 className="w-12 h-12" />
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold bg-gray-900 text-amber-400 px-3.5 py-1 rounded-full uppercase tracking-wider">
                    Portal Enterprise B2B
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Tarifa Plana Ilimitada
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                  {profile?.company_name || 'Mi Centro B2B'}
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 font-medium select-text">
                  {user.email} • {profile?.address || 'Dirección no configurada'} • {profile?.country || 'República Dominicana'}
                </p>
              </div>
            </div>

            <button
              onClick={logout}
              className="py-3 px-6 bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 font-bold text-xs rounded-2xl transition-all flex items-center gap-2 cursor-pointer shadow-sm border border-gray-200"
            >
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </button>
          </div>

          {/* MENÚ DE CONFIGURACIÓN SUPERIOR */}
          <div className="w-full bg-white p-2.5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex-1 min-w-40 py-3 px-4 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-2 ${activeTab === 'dashboard' ? 'bg-gray-900 text-amber-400 shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <BarChart3 className="w-4 h-4" /> Resumen y Estadísticas
            </button>
            <button
              onClick={() => setActiveTab('perfil')}
              className={`flex-1 min-w-40 py-3 px-4 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-2 ${activeTab === 'perfil' ? 'bg-gray-900 text-amber-400 shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Settings className="w-4 h-4" /> Perfil y Logo
            </button>
            <button
              onClick={() => setActiveTab('guia')}
              className={`flex-1 min-w-40 py-3 px-4 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-2 ${activeTab === 'guia' ? 'bg-gray-900 text-amber-400 shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <HelpCircle className="w-4 h-4" /> Guía del Operador
            </button>
            <button
              onClick={() => setActiveTab('soporte')}
              className={`flex-1 min-w-40 py-3 px-4 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-2 ${activeTab === 'soporte' ? 'bg-gray-900 text-amber-400 shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <AlertTriangle className="w-4 h-4" /> Soporte Técnico
            </button>
          </div>

          {/* DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="w-full space-y-8 animate-fadeIn">
              
              <div className="w-full bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black text-gray-900">Métricas de Actividad Operativa</h3>
                    <p className="text-xs text-gray-500">Conteo real de currículums emitidos desde este mostrador.</p>
                  </div>
                  
                  <div className="flex items-center bg-gray-100 p-1.5 rounded-2xl gap-1">
                    {(['día', 'semana', 'mes', 'año'] as const).map((filter) => {
                      const internalValue = filter === 'día' ? 'dia' : filter === 'año' ? 'anio' : filter;
                      return (
                        <button 
                          key={internalValue}
                          onClick={() => setStatsFilter(internalValue)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer uppercase ${statsFilter === internalValue ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                          {filter}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-2">
                    <div className="flex items-center justify-between text-gray-400">
                      <span className="text-xs font-bold uppercase text-gray-500">Descargas Reales</span>
                      <DownloadCloud className="w-5 h-5 text-amber-500" />
                    </div>
                    <p className="text-4xl font-black text-gray-900">
                      {profile?.downloads_count || 0}
                    </p>
                    <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Sincronizado en tiempo real
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-2">
                    <div className="flex items-center justify-between text-gray-400">
                      <span className="text-xs font-bold uppercase text-gray-500">Estado de Membresía</span>
                      <BarChart3 className="w-5 h-5 text-emerald-500" />
                    </div>
                    <p className="text-4xl font-black text-emerald-600">Activo</p>
                    <p className="text-[11px] text-gray-500 font-medium">Acceso corporativo ilimitado</p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-2">
                    <div className="flex items-center justify-between text-gray-400">
                      <span className="text-xs font-bold uppercase text-gray-500">Plantillas HD Disponibles</span>
                      <FileCheck className="w-5 h-5 text-blue-500" />
                    </div>
                    <p className="text-4xl font-black text-gray-900">50+</p>
                    <p className="text-[11px] text-blue-600 font-semibold">100% libres de marcas de agua</p>
                  </div>
                </div>
              </div>

              {/* MÓDULO DE ACCESO AL EDITOR (ALTA GAMA) */}
              <div className="w-full bg-linear-to-r from-gray-950 via-gray-900 to-gray-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-gray-800 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="space-y-4 max-w-2xl z-10 text-center lg:text-left">
                  <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                    Constructor de Currículums
                  </h2>
                  <p className="text-sm text-gray-300 leading-relaxed font-normal">
                    Accede al panel de edición profesional. Tu cuenta de agencia está autorizada para emitir documentos corporativos en alta resolución vectorial <strong className="text-amber-400">sin ningún tipo de restricción ni pasarela de pago</strong>.
                  </p>
                </div>

                <Link
                  href="/builder"
                  className="shrink-0 px-10 py-6 bg-amber-400 hover:bg-amber-300 text-gray-950 font-black text-sm rounded-2xl shadow-xl transition-all transform hover:scale-105 flex items-center gap-3 cursor-pointer active:scale-95 z-10"
                >
                  <FileCheck className="w-6 h-6" />
                  <span>Abrir Editor y Descargar CV</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

            </div>
          )}

          {/* PERFIL */}
          {activeTab === 'perfil' && (
            <div className="w-full space-y-8 animate-fadeIn">
              
              <div className="w-full bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-sm space-y-8">
                <div>
                  <h3 className="text-2xl font-black text-gray-900">Identidad Corporativa y Logotipo</h3>
                  <p className="text-xs text-gray-500 mt-1">Configura la información fiscal o comercial de tu establecimiento.</p>
                </div>

                {profileMsg && (
                  <div className={`p-4 rounded-2xl text-xs font-semibold ${profileMsg.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                    {profileMsg.text}
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className="space-y-6">
                  
                  <div className="p-6 bg-gray-50 border border-gray-200 rounded-3xl flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-24 h-24 rounded-2xl bg-white border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                      {logoUrl ? (
                        <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    
                    <div className="space-y-2 text-center sm:text-left flex-1">
                      <h4 className="font-black text-gray-900 text-sm">Logotipo de la Agencia</h4>
                      <p className="text-xs text-gray-600">
                        Formatos: <strong className="text-gray-900">JPG, PNG, GIF</strong>. Tamaño máximo: <strong className="text-red-600">2MB</strong>. Recomendado proporción <strong className="text-amber-600">1:1</strong>.
                      </p>
                      <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-amber-400 hover:text-gray-950 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-sm">
                        <Upload className="w-4 h-4" />
                        <span>Subir Logotipo (Máx 2MB)</span>
                        <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-700 uppercase">Nombre de la Empresa</label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs text-gray-900 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-700 uppercase">Teléfono de Contacto</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs text-gray-900 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-700 uppercase">Dirección Física</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs text-gray-900 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-700 uppercase">País</label>
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs text-gray-900 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="py-4 px-8 bg-gray-900 hover:bg-amber-400 hover:text-gray-950 text-white font-black text-xs rounded-2xl transition shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" /> Guardar Perfil Corporativo
                  </button>
                </form>
              </div>

              {/* SEGURIDAD */}
              <div className="w-full bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-sm space-y-6">
                <div>
                  <h3 className="text-xl font-black text-gray-900">Seguridad y Credenciales</h3>
                  <p className="text-xs text-gray-500">Por seguridad, debes ingresar tu contraseña actual para establecer una nueva.</p>
                </div>

                {passMsg && (
                  <div className={`p-4 rounded-2xl text-xs font-semibold ${passMsg.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                    {passMsg.text}
                  </div>
                )}

                <form onSubmit={handleChangePassword} className="space-y-4 max-w-xl">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 uppercase">Contraseña Actual</label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        value={currentPass}
                        onChange={(e) => setCurrentPass(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs text-gray-900 focus:outline-none focus:border-amber-400"
                      />
                      <Lock className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 uppercase">Nueva Contraseña</label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        placeholder="Mínimo 6 caracteres"
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs text-gray-900 focus:outline-none focus:border-amber-400"
                      />
                      <Key className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="py-4 px-8 bg-amber-500 hover:bg-amber-600 text-gray-950 font-black text-xs rounded-2xl transition shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    <Lock className="w-4 h-4" /> Actualizar Contraseña Segura
                  </button>
                </form>
              </div>

            </div>
          )}

          {/* GUÍA */}
          {activeTab === 'guia' && (
            <div className="w-full bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-sm space-y-8 animate-fadeIn">
              <div>
                <h3 className="text-2xl font-black text-gray-900">Guía Operativa para Centros</h3>
                <p className="text-xs text-gray-500 mt-1">Instrucciones estándar para la emisión de documentos en mostrador.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-gray-900 text-amber-400 font-black flex items-center justify-center text-base shadow-sm">1</div>
                  <h4 className="font-black text-gray-900 text-sm">Entrar al Editor</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Haz clic en el módulo de producción. El sistema detecta tu sesión y anula automáticamente cualquier cobro.
                  </p>
                </div>

                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-gray-900 text-amber-400 font-black flex items-center justify-center text-base shadow-sm">2</div>
                  <h4 className="font-black text-gray-900 text-sm">Completar Datos</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Rellena la información del cliente utilizando cualquiera de nuestras más de 50 plantillas profesionales.
                  </p>
                </div>

                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-gray-900 text-amber-400 font-black flex items-center justify-center text-base shadow-sm">3</div>
                  <h4 className="font-black text-gray-900 text-sm">Descarga y Registro</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Genera el PDF en alta definición. El contador de uso sumará automáticamente +1 unidad de forma transparente.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SOPORTE */}
          {activeTab === 'soporte' && (
            <div className="w-full bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-sm space-y-6 max-w-3xl mx-auto animate-fadeIn">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-black text-gray-900">Soporte Técnico Enterprise</h3>
                <p className="text-xs text-gray-500">¿Presentas algún inconveniente con la red o licencias? Escríbenos.</p>
              </div>

              {enviadoContacto ? (
                <div className="text-center py-10 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                  <h3 className="text-lg font-black text-gray-900">¡Reporte Enviado Correctamente!</h3>
                  <button onClick={() => setEnviadoContacto(false)} className="mt-4 px-6 py-2.5 bg-gray-900 text-white text-xs font-bold rounded-xl cursor-pointer">
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactoSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase">Nombre del Centro</label>
                    <input
                      type="text"
                      required
                      value={contactoForm.nombre}
                      onChange={(e) => setContactoForm({ ...contactoForm, nombre: e.target.value })}
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs text-gray-900 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase">Contacto (Correo o Teléfono)</label>
                    <input
                      type="text"
                      required
                      value={contactoForm.contacto}
                      onChange={(e) => setContactoForm({ ...contactoForm, contacto: e.target.value })}
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs text-gray-900 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase">Descripción de la Incidencia</label>
                    <textarea
                      rows={4}
                      required
                      value={contactoForm.mensaje}
                      onChange={(e) => setContactoForm({ ...contactoForm, mensaje: e.target.value })}
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs text-gray-900 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <button type="submit" disabled={enviandoMensaje} className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-gray-950 font-black text-xs rounded-2xl transition shadow-lg cursor-pointer">
                    {enviandoMensaje ? 'Enviando...' : 'Enviar Reporte al Servidor'}
                  </button>
                </form>
              )}
            </div>
          )}

        </div>
      ) : (
        /* VISTA DE LOGIN */
        <div className="w-full max-w-5xl mx-auto space-y-10 py-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
              Acceso Seguro Empresarial
            </h1>
            <p className="text-sm text-gray-600 leading-relaxed font-normal">
              Plataforma exclusiva para agencias y centros de internet con tarifa plana ilimitada.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-6 bg-gray-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col justify-between space-y-8 border border-gray-800">
              <div className="space-y-6">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  BENEFICIOS EXCLUSIVOS
                </span>
                <h2 className="text-2xl sm:text-3xl font-black leading-tight">
                  Emisión de CVs a escala profesional
                </h2>
                <ul className="space-y-4 text-sm text-gray-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Cero pagos ni marcas de agua</strong> en exportaciones PDF HD.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Más de 50 plantillas profesionales</strong> disponibles.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-sm flex flex-col justify-center space-y-6">
              <div>
                <h2 className="text-2xl font-black text-gray-900">Iniciar Sesión</h2>
                <p className="text-xs text-gray-500 mt-1">Ingresa con tu correo corporativo autorizado.</p>
              </div>

              {errorMsg && (
                <div className="p-3.5 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    placeholder="empresa@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs text-gray-900 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase">Contraseña</label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs text-gray-900 focus:outline-none focus:border-amber-400"
                    />
                    <Lock className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="p-3.5 bg-amber-50/50 border border-amber-200/80 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-amber-600" /> Verificación Anti-Robot
                    </span>
                    <button type="button" onClick={generateCaptcha} className="text-gray-400 hover:text-amber-600 cursor-pointer">
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-gray-900 bg-white border border-gray-200 px-3 py-2 rounded-xl">
                      ¿Cuánto es {num1} + {num2}?
                    </span>
                    <input
                      type="number"
                      required
                      placeholder="Resultado"
                      value={captchaAnswer}
                      onChange={(e) => setCaptchaAnswer(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-gray-900 hover:bg-amber-400 hover:text-gray-950 text-white font-bold text-xs rounded-2xl transition shadow-lg cursor-pointer">
                  {isSubmitting ? 'Verificando...' : 'Entrar al Portal'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}