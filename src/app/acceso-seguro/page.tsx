'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { Building2, Lock, ArrowRight, CheckCircle2, LogOut, FileCheck, ShieldCheck, RefreshCw, Mail, X } from 'lucide-react';

export default function AccesoSeguroPage() {
  const { user, isB2B, loginB2B, logout, loading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados para el modal de contacto rápido B2B
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactoForm, setContactoForm] = useState({ nombre: '', contacto: '', mensaje: '' });
  const [enviadoContacto, setEnviadoContacto] = useState(false);
  const [enviandoMensaje, setEnviandoMensaje] = useState(false);

  // --- Timeout de seguridad para evitar bucle infinito de carga visual ---
  const [forceReady, setForceReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setForceReady(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // --- Detección Anti-Robot (Captcha Matemático) ---
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState('');

  const generateCaptcha = useCallback(() => {
    setNum1(Math.floor(Math.random() * 9) + 1);
    setNum2(Math.floor(Math.random() * 9) + 1);
    setCaptchaAnswer('');
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      generateCaptcha();
    }, 0);
    return () => clearTimeout(timer);
  }, [generateCaptcha]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // 1. Validar Anti-Robot
    if (parseInt(captchaAnswer, 10) !== num1 + num2) {
      setErrorMsg('Respuesta Anti-Robot incorrecta. Por favor intenta de nuevo.');
      generateCaptcha();
      return;
    }

    setIsSubmitting(true);

    try {
      // 2. Ejecutar autenticación con timeout de seguridad
      const loginPromise = loginB2B(email, password);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Tiempo de espera agotado. Verifica tu conexión.')), 10000)
      );

      const result = (await Promise.race([loginPromise, timeoutPromise])) as { error?: unknown };

      if (result?.error) {
        setErrorMsg('Credenciales inválidas o la cuenta no está registrada con permisos B2B.');
        generateCaptcha();
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Ocurrió un error al procesar el inicio de sesión.';
      setErrorMsg(errorMessage);
      generateCaptcha();
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función para enviar el mensaje de contacto B2B a la API global
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
          tipo: 'Solicitud Alianza / Registro B2B (Acceso Seguro)'
        }),
      });

      const resultado = await response.json();

      if (response.ok && resultado.success) {
        setEnviadoContacto(true);
      } else {
        alert('Hubo un error al enviar el mensaje. Intenta de nuevo.');
      }
    } catch (err) {
      console.error('Error de red:', err);
      alert('Error de conexión con el servidor.');
    } finally {
      setEnviandoMensaje(false);
    }
  };

  if (loading && !forceReady) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center font-poppins select-none">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-amber-400"></div>
      </div>
    );
  }

  return (
    <div 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-poppins space-y-12 select-none"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      
      {/* Encabezado Principal */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
          Acceso Seguro Empresarial
        </h1>
        <p className="text-base text-gray-600 leading-relaxed font-normal">
          Plataforma exclusiva para agencias, centros de internet y aliados corporativos con tarifa plana ilimitada.
        </p>
      </div>

      {/* Si el usuario ya está autenticado como B2B */}
      {user && isB2B ? (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 border border-amber-400/80 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-gray-950 flex items-center justify-center font-black text-xl shadow-md">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-extrabold text-gray-900 text-lg">Sesión B2B Activa</h2>
                <p className="text-xs text-gray-500 select-text">{user.email}</p>
              </div>
            </div>
            <span className="bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Ilimitado
            </span>
          </div>

          <div className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-200/80 text-xs text-gray-700">
            <div className="flex items-center gap-2 font-bold text-gray-900">
              <FileCheck className="w-4 h-4 text-amber-500" /> Permisos Corporativos Habilitados:
            </div>
            <ul className="space-y-2 pl-6 list-disc text-gray-600 font-medium">
              <li>Generación de PDF vectorial sin marca de agua.</li>
              <li>Bypass automático de la pasarela de pago.</li>
              <li>Acceso prioritario a las 25 plantillas estándar y premium.</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              href="/builder"
              className="flex-1 py-3.5 bg-gray-900 hover:bg-amber-400 hover:text-gray-950 text-white font-bold text-xs rounded-full text-center transition-all duration-300 shadow-md flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <span>Ir al Editor Corporativo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={logout}
              className="py-3.5 px-6 bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 font-bold text-xs rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      ) : (
        /* Formulario de Login B2B */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch max-w-5xl mx-auto">
          
          {/* Beneficios Corporativos */}
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
                  <span><strong>Sin marcas de agua</strong> en exportaciones PDF HD.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Facturación mensual consolidada</strong> para tu negocio.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Descargas instantáneas</strong> sin ingresar tarjetas cliente por cliente.</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-gray-800 text-xs text-gray-400 space-y-1">
              <p>¿Deseas registrar tu centro de internet o agencia?</p>
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="text-amber-400 font-bold underline select-text inline-block cursor-pointer hover:text-amber-300 transition"
              >
                Contáctanos vía correo
              </button>
            </div>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 border border-gray-200/90 shadow-sm flex flex-col justify-center space-y-6">
            <div>
              <h2 className="text-2xl font-black text-gray-900">Iniciar Sesión</h2>
              <p className="text-xs text-gray-500 mt-1">
                Ingresa con tu correo corporativo autorizado.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-xs font-semibold">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  placeholder="empresa@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs text-gray-900 focus:outline-none focus:border-amber-400 focus:bg-white transition-all select-text"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Contraseña</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs text-gray-900 focus:outline-none focus:border-amber-400 focus:bg-white transition-all select-none"
                  />
                  <Lock className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Módulo Anti-Robot */}
              <div className="p-3.5 bg-amber-50/50 border border-amber-200/80 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-amber-600" /> Verificación Anti-Robot
                  </span>
                  <button 
                    type="button" 
                    onClick={generateCaptcha}
                    className="text-gray-400 hover:text-amber-600 transition"
                    title="Cambiar operación"
                  >
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gray-900 hover:bg-amber-400 hover:text-gray-950 text-white font-bold text-xs rounded-full transition-all duration-300 shadow-md flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Verificando...</span>
                ) : (
                  <>
                    <span>Entrar al Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      )}

      {/* MODAL DE CONTACTO RÁPIDO B2B */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 relative border border-gray-100">
            <button
              onClick={() => setIsContactModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {enviadoContacto ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className="text-lg font-black text-gray-900">¡Mensaje Enviado con Éxito!</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Hemos recibido tu solicitud de alianza. Nos pondremos en contacto contigo a la brevedad posible.
                </p>
                <button
                  onClick={() => {
                    setEnviadoContacto(false);
                    setIsContactModalOpen(false);
                  }}
                  className="mt-4 px-6 py-2.5 bg-gray-900 text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactoSubmit} className="space-y-4">
                <div className="flex items-center gap-3 border-b pb-3">
                  <div className="p-2.5 bg-amber-100 rounded-xl text-amber-800">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 text-sm">Registro de Agencia / Centro</h3>
                    <p className="text-[11px] text-gray-500">Solicita tu acceso corporativo B2B</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-700 uppercase">Nombre o Negocio</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Centro Digital Santiago"
                    value={contactoForm.nombre}
                    onChange={(e) => setContactoForm({ ...contactoForm, nombre: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-amber-400 select-text"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-700 uppercase">Correo o WhatsApp</label>
                  <input
                    type="text"
                    required
                    placeholder="tucorreo@ejemplo.com o teléfono"
                    value={contactoForm.contacto}
                    onChange={(e) => setContactoForm({ ...contactoForm, contacto: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-amber-400 select-text"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-700 uppercase">Mensaje (Opcional)</label>
                  <textarea
                    rows={3}
                    placeholder="Cuéntanos cuántos CVs imprimes al mes o tus necesidades..."
                    value={contactoForm.mensaje}
                    onChange={(e) => setContactoForm({ ...contactoForm, mensaje: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-amber-400 select-text"
                  />
                </div>

                <button
                  type="submit"
                  disabled={enviandoMensaje}
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-gray-950 font-black text-xs rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {enviandoMensaje ? 'Enviando solicitud...' : 'Enviar Solicitud a Soporte'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}