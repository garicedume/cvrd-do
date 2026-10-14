'use personal'; // O 'use client' según tu estándar de componentes
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

interface PayPalCheckoutProps {
  amount: string; // Ejemplo: "3.00", "5.00" o "10.00"
  planName: string;
  onSuccess: (details: any) => void;
}

export default function PayPalCheckout({ amount, planName, onSuccess }: PayPalCheckoutProps) {
  const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test',
    currency: 'USD',
    intent: 'capture',
    // Habilita carteras digitales automáticas (Apple Pay / Google Pay si el navegador y el país lo soportan)
    components: 'buttons,funding-eligibility',
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-3xl border border-gray-200 shadow-sm font-poppins">
      <div className="mb-4 text-center">
        <h3 className="font-black text-gray-900 text-lg">Pago Único - {planName}</h3>
        <p className="text-xs text-gray-500">Transacción segura procesada por PayPal</p>
      </div>

      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            layout: 'vertical',
            shape: 'pill',
            color: 'gold',
            label: 'pay',
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              intent: 'CAPTURE',
              purchase_units: [
                {
                  amount: {
                    currency_code: 'USD',
                    value: amount,
                  },
                  description: `Acceso a plan ${planName} en CVRD.DO`,
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            if (actions.order) {
              const details = await actions.order.capture();
              onSuccess(details);
            }
          }}
          onError={(err) => {
            console.error('Error en la pasarela de pagos de PayPal:', err);
            alert('Ocurrió un error al procesar el pago. Inténtalo de nuevo.');
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}