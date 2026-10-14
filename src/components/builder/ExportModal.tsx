'use client';

import React, { useState } from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { TEMPLATES_LIST } from '../../lib/templatesData';
import { ShieldCheck, AlertTriangle, Download, X, CheckCircle2, Lock } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTemplateId: string;
  isB2B: boolean;
  hasPaid: boolean;
  onPaymentSuccess: (details: any) => void;
  onGeneratePDF: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  activeTemplateId,
  isB2B,
  hasPaid,
  onPaymentSuccess,
  onGeneratePDF,
}) => {
  const [step, setStep] = useState<'review' | 'checkout'>(hasPaid || isB2B ? 'checkout' : 'review');
  const [isDataVerified, setIsDataVerified] = useState(false);

  if (!isOpen) return null;

  const currentTemplate = TEMPLATES_LIST.find((t) => t.id === activeTemplateId) || TEMPLATES_LIST[0];
  const priceAmount = currentTemplate?.category === 'premium' ? '5.00' : '2.00';
  const isFreeToExport = isB2B || hasPaid;

  // Obtenemos la llave pública desde el entorno del navegador
  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/80 backdrop-blur-sm p-4 font-poppins">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-gray-200 shadow-2xl relative space-y-6">
        
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* HEADER MODAL */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-gray-950 flex items-center justify-center font-black shadow-md shadow-amber-400/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-gray-900">Exportar CV en Alta Definición</h3>
            <p className="text-xs text-gray-500 font-medium">
              Plantilla: <span className="font-bold text-gray-800">{currentTemplate.name}</span>
            </p>
          </div>
        </div>

        {/* PASO 1: REVISIÓN OBLIGATORIA DE DATOS ANTES DE PAGAR */}
        {step === 'review' && !isFreeToExport && (
          <div className="space-y-5">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-black text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>¿Todo está correctamente bien?</span>
              </div>
              <p className="text-xs text-amber-800/90 leading-relaxed font-medium">
                Por favor, revisa que tu ortografía, teléfono y datos profesionales estén correctos en la vista previa antes de proceder con el pago y descarga de tu currículum.
              </p>
            </div>

            <label className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors">
              <input
                type="checkbox"
                checked={isDataVerified}
                onChange={(e) => setIsDataVerified(e.target.checked)}
                className="mt-1 rounded border-gray-300 text-amber-500 focus:ring-amber-400 w-4 h-4 cursor-pointer"
              />
              <span className="text-xs text-gray-700 font-medium">
                Confirmo que he revisado minuciosamente mis datos y estoy listo para proceder con el pago.
              </span>
            </label>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Volver a revisar
              </button>
              <button
                disabled={!isDataVerified}
                onClick={() => setStep('checkout')}
                className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                  isDataVerified
                    ? 'bg-gray-900 text-white hover:bg-amber-400 hover:text-gray-950 cursor-pointer'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <span>Sí, continuar</span>
              </button>
            </div>
          </div>
        )}

        {/* PASO 2: PASARELA DE PAGO / DESCARGA DESBLOQUEADA */}
        {(step === 'checkout' || isFreeToExport) && (
          <div className="space-y-5">
            {isFreeToExport ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-3 text-center animate-in fade-in duration-200">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-black text-emerald-950 uppercase tracking-wider">
                  {isB2B ? 'Licencia B2B Empresarial Activa' : '¡Pago Confirmado con Éxito!'}
                </h4>
                <p className="text-xs text-emerald-800 font-medium leading-relaxed">
                  Tu currículum está listo, optimizado para filtros ATS y sin marcas de agua. ¡Mucho éxito en tu búsqueda!
                </p>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => {
                      onGeneratePDF();
                      onClose();
                    }}
                    className="w-full py-3.5 bg-gray-900 hover:bg-amber-400 hover:text-gray-950 text-white font-black text-xs rounded-xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-amber-400" />
                    <span>Descargar PDF Listo para Imprimir</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition cursor-pointer"
                  >
                    Volver al editor
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-700 pb-2 border-b border-gray-200">
                    <span>Plan Seleccionado ({currentTemplate.name})</span>
                    <span className="text-amber-600 font-mono text-sm font-black">USD ${priceAmount}</span>
                  </div>

                  <div className="pt-2 space-y-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider justify-center pb-1">
                      <Lock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Pago Seguro Procesado por PayPal</span>
                    </div>

                    <PayPalScriptProvider options={{ clientId: paypalClientId, currency: "USD", intent: "capture" }}>
                      <PayPalButtons
                        style={{ layout: "vertical", shape: "rect", label: "pay" }}
                        createOrder={async (data, actions) => {
                          const response = await fetch('/api/paypal/create-order', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              templateId: activeTemplateId,
                              price: priceAmount
                            })
                          });

                          const orderData = await response.json();
                          if (orderData.error) {
                            throw new Error(orderData.error);
                          }
                          return orderData.id;
                        }}
                        onApprove={async (data, actions) => {
                          if (actions.order) {
                            const details = await actions.order.capture();
                            onPaymentSuccess(details);
                          }
                        }}
                      />
                    </PayPalScriptProvider>
                  </div>
                </div>

                <button
                  onClick={() => setStep('review')}
                  className="w-full text-xs text-gray-400 hover:text-gray-600 font-semibold cursor-pointer text-center"
                >
                  Volver a la revisión de datos
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};