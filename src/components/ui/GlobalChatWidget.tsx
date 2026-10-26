'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Headphones, User, ArrowRight, Trash2 } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export const GlobalChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== 'undefined') {
      const savedMessages = localStorage.getItem('cvChatMessages');
      if (savedMessages) {
        try {
          return JSON.parse(savedMessages);
        } catch (e) {
          console.error("Error al cargar historial del chat", e);
        }
      }
    }
    return [
      { role: 'model', content: '¡Hola! Soy tu Asesora Virtual de CVRD.DO 🇩🇴. ¿Listo para conseguir empleo? Dime tu nombre completo y tu profesión para empezar a armar tu CV.' }
    ];
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cvChatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch('/api/chat-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });
      const data = await res.json();
      if (data.success) {
        setMessages([...newMessages, { role: 'model', content: data.reply }]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    const initialMsg: Message[] = [{ role: 'model', content: '¡Hola! Soy tu Asesora Virtual de CVRD.DO 🇩🇴. ¿Listo para conseguir empleo? Dime tu nombre completo y tu profesión para empezar a armar tu CV.' }];
    setMessages(initialMsg);
    localStorage.removeItem('cvChatMessages');
  };

  const handleTransferToEditor = () => {
    const summaryText = messages.filter((m: Message) => m.role === 'user').map((m: Message) => m.content).join(' ');
    const importedData = {
      contact: {
        fullName: "Candidato Asistido por Chat",
        professionalTitle: "Profesional Orientado a Resultados",
        phone: "+1 (809) 000-0000",
        email: "correo@dominio.do",
        city: "Santo Domingo",
        country: "República Dominicana"
      },
      summary: summaryText.length > 20 ? summaryText.slice(0, 200) : "Perfil profesional estructurado mediante asistencia virtual en CVRD.DO.",
      experiences: [
        { company: "Experiencia Reciente", position: "Especialista", startDate: "2022", endDate: "Presente", responsibilities: ["Gestión orientada a metas y servicio."] }
      ],
      education: [
        { degree: "Formación Académica", institution: "Institución Educativa", startDate: "2018", endDate: "2022" }
      ],
      skills: [
        { name: "Atención al cliente", category: "technical" },
        { name: "Trabajo en equipo", category: "technical" }
      ],
      languages: [
        { language: "Español", proficiency: "Nativo" }
      ]
    };

    localStorage.setItem('importedCVData', JSON.stringify(importedData));
    window.location.href = '/builder?imported=true';
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-poppins">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gray-950 hover:bg-gray-900 text-amber-400 p-4 rounded-full shadow-2xl border-2 border-amber-400/50 flex items-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Headphones className="w-6 h-6 text-amber-400" />
          <span className="text-sm font-bold pr-2 hidden sm:inline text-white">¿Te ayudo con tu CV?</span>
        </button>
      )}

      {isOpen && (
        <div className="bg-gray-950 border-2 border-amber-400/40 rounded-3xl shadow-2xl w-[90vw] sm:w-95 h-130 flex flex-col overflow-hidden text-white animate-in fade-in zoom-in duration-200">
          
          <div className="bg-gray-900 px-5 py-4 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-white">Asesora Virtual CVRD</h4>
                <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> En línea para ayudarte
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={handleClearChat}
                title="Reiniciar conversación"
                className="text-gray-400 hover:text-amber-400 p-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white p-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-950/80">
            {messages.map((msg: Message, idx: number) => (
              <div key={idx} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'model' && (
                  <div className="w-7 h-7 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0 text-amber-400 mt-1">
                    <Headphones className="w-3.5 h-3.5" />
                  </div>
                )}
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-amber-400 text-gray-950 font-medium rounded-br-xs' 
                    : 'bg-gray-900 text-gray-200 border border-gray-800 rounded-bl-xs'
                }`}>
                  {msg.content}
                </div>
                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center shrink-0 text-gray-300 mt-1">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 items-center text-gray-400 text-xs italic pl-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                <span>Pensando respuesta...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="px-4 py-2 bg-gray-900/50 border-t border-gray-900">
            <button
              onClick={handleTransferToEditor}
              className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-gray-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <span>Llevar mis datos al Editor de CV</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSend} className="p-3 bg-gray-900 border-t border-gray-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Escribe tu respuesta aquí..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-1 bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-gray-950 p-2.5 rounded-xl transition-all active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
};