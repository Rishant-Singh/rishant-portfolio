"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageSquare, FiX, FiSend, FiCpu } from "react-icons/fi";

const ChatMessage = ({ msg }: { msg: { role: string; content: string } }) => {
  const isUser = msg.role === "user";
  return (
    <div className={`flex gap-3 mb-4 ${isUser ? "flex-row-reverse" : ""}`}>
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${isUser ? "bg-primary-600 text-white" : "bg-dark-700 text-primary-400"}`}>
        {isUser ? "U" : <FiCpu />}
      </div>
      <div className={`px-4 py-2.5 rounded-2xl max-w-[80%] text-sm ${isUser ? "bg-primary-600 text-white rounded-tr-none" : "bg-dark-700 text-gray-200 rounded-tl-none border border-white/5"}`}>
        {msg.content}
      </div>
    </div>
  );
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", content: "Hi! I'm Cyber, your AI assistant. Ask me anything about this developer's skills, projects, or background." }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", content: input };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newHistory }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages([...newHistory, { role: "assistant", content: data.reply }]);
      } else {
        setMessages([...newHistory, { role: "assistant", content: "Sorry, I encountered an error. Please try again." }]);
      }
    } catch {
      setMessages([...newHistory, { role: "assistant", content: "Network error. Please try again later." }]);
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-[340px] h-[480px] bg-dark-900 rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-dark-800 border-b border-white/5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-primary-600/20 text-primary-400 flex items-center justify-center">
                  <FiCpu size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Cyber</h3>
                  <div className="flex items-center gap-1.5 text-xs text-green-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Online
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition">
                <FiX />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-dark-900 scroll-smooth">
              {messages.map((msg, i) => <ChatMessage key={i} msg={msg} />)}
              {loading && (
                <div className="flex gap-3 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-dark-700 text-primary-400 flex items-center justify-center"><FiCpu /></div>
                  <div className="px-4 py-3 rounded-2xl bg-dark-700 border border-white/5 rounded-tl-none flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-4 bg-dark-800 border-t border-white/5 shrink-0 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary-500 transition-colors"
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-11 h-11 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 disabled:hover:bg-primary-600 flex items-center justify-center rounded-xl text-white transition-colors shrink-0"
              >
                <FiSend size={16} className="-ml-1 mt-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary-600 rounded-full shadow-glow-lg flex items-center justify-center text-white"
        aria-label="Toggle AI Chat"
      >
        {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
      </motion.button>
    </div>
  );
}
