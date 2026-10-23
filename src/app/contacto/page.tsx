'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Estados para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [transaccion, setTransaccion] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Conexión con la API global de contacto
      const response = await fetch('/api/contacto-global', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          contacto: email,
          mensaje,
          transaccion: transaccion || 'N/A',
          tipo: 'Soporte Técnico / Reclamación'
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
      } else {
        alert('Hubo un error al enviar el mensaje. Inténtalo de nuevo.');
      }
    } catch (err) {
      console.error('Error de red:', err);
      alert('Error de conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-gray-50 text-gray-900 font-poppins py-12 px-4 sm:px-6 lg:px-8 select-none"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-gray-200/90 shadow-sm space-y-8">
        
        <div className="border-b border-gray-100 pb-6 space-y-2 text-center">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-950">Contacto & Soporte Técnico</h1>
          <p className="text-xs text-gray-500 font-medium">Respuesta garantizada en 24 a 48 horas laborables.</p>
        </div>

        {submitted ? (
          <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="font-black text-emerald-950 text-base">Mensaje Recibido</h3>
            <p className="text-xs text-emerald-800">Hemos registrado tu consulta. Te responderemos directamente a tu correo electrónico.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
            <div>
              <label className="font-bold text-gray-700">Nombre Completo</label>
              <input 
                type="text" 
                required 
                placeholder="Ej. Carlos Mendoza" 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="mt-1 w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-amber-400 select-text" 
              />
            </div>

            <div>
              <label className="font-bold text-gray-700">Correo Electrónico</label>
              <input 
                type="email" 
                required 
                placeholder="tu@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-amber-400 select-text" 
              />
            </div>

            <div>
              <label className="font-bold text-gray-700">ID de Transacción de PayPal (Si aplica)</label>
              <input 
                type="text" 
                placeholder="Ej. 9XX12345YY67890" 
                value={transaccion}
                onChange={(e) => setTransaccion(e.target.value)}
                className="mt-1 w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-amber-400 select-text" 
              />
            </div>

            <div>
              <label className="font-bold text-gray-700">Mensaje o Reclamación</label>
              <textarea 
                rows={4} 
                required 
                placeholder="Describe tu consulta o incidencia..." 
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                className="mt-1 w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-amber-400 select-text" 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3.5 bg-gray-900 hover:bg-amber-400 hover:text-gray-950 text-white font-black rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Enviando mensaje...' : 'Enviar Mensaje a Soporte'}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}