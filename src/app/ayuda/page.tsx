'use client';

import Link from 'next/link';
import { Mail, MessageCircle, ArrowLeft, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function AyudaPage() {
  // Estado para las preguntas desplegables (FAQ)
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { id: 1, question: "¿Cómo descargo mi PDF?", answer: "Una vez completado y desbloqueado tu currículum, haz clic en el botón de descarga en la parte superior del editor para obtener tu archivo vectorial HD en formato Carta." },
    { id: 2, question: "¿Dónde encuentro mi factura?", answer: "Tu factura es procesada de forma segura a través de PayPal al momento de confirmar el pago. Puedes verificarla directamente en el correo electrónico asociado a tu cuenta de PayPal." },
    { id: 3, question: "Tengo un problema con mi pedido", answer: "Escríbenos inmediatamente a través de nuestro botón de WhatsApp (+1 829.460.8316) o por correo electrónico y te daremos asistencia personalizada de inmediato." }
  ];

  return (
    <div className="min-h-screen bg-[#faf9f5] py-16 px-4 sm:px-6 lg:px-8 font-poppins text-gray-900 flex flex-col justify-between">
      <div className="max-w-3xl mx-auto w-full space-y-12">
        
        {/* HEADER / ENCABEZADO */}
        <div className="text-center space-y-3">
          <p className="text-xs font-extrabold text-[#e06b2f] uppercase tracking-widest">
            CENTRO DE SOPORTE
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
            Estamos aquí para ayudarte
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-lg mx-auto">
            Resuelve tus dudas sobre pedidos, facturación y descarga de tus archivos.
          </p>
        </div>

        {/* TARJETAS DE CONTACTO (CORREO Y WHATSAPP) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Correo Electrónico */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-gray-900">Correo electrónico</h2>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Cuéntanos qué necesitas y te responderemos lo antes posible.
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 mb-3">nubellstore@gmail.com</p>
              <a
                href="mailto:nubellstore@gmail.com"
                className="w-full py-3 bg-[#f26a2c] hover:bg-[#e05b1f] text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Enviar un correo</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Atención por WhatsApp */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-gray-900">Atención por WhatsApp</h2>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Habla directamente con nuestro equipo de soporte.
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-emerald-600 mb-3">+1 829.460.8316</p>
              <a
                href="https://wa.me/18294608316"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#00a859] hover:bg-[#00964f] text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Iniciar conversación</span>
                <span>→</span>
              </a>
            </div>
          </div>

        </div>

        {/* SECCIÓN DE PREGUNTAS FRECUENTES (ACORDEONES) */}
        <div className="space-y-4 pt-4">
          <h2 className="text-xl font-black text-gray-900 text-center">
            ¿Necesitas otra cosa?
          </h2>

          <div className="space-y-3">
            {faqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-xs transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-xs sm:text-sm text-gray-900 cursor-pointer hover:bg-gray-50 transition"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-4 text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTÓN VOLVER AL INICIO */}
        <div className="pt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0f172a] hover:bg-gray-800 text-white font-bold text-xs rounded-full transition shadow-md active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al inicio</span>
          </Link>
        </div>

      </div>
    </div>
  );
}