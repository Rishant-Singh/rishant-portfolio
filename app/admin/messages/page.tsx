"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { FiMail, FiTrash2, FiCheck } from "react-icons/fi";

interface Message { _id: string; name: string; email: string; subject: string; message: string; read: boolean; createdAt: string; }

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);

  const load = () => { fetch("/api/contact").then(r => r.json()).then(d => { setMessages(d.data || []); setLoading(false); }); };
  useEffect(() => { load(); }, []);

  const markRead = async (msg: Message) => {
    if (msg.read) {
      setSelected(msg);
      return;
    }
    await fetch(`/api/contact?id=${msg._id}`, { method: "PUT", body: JSON.stringify({ read: true }) });
    setMessages(msgs => msgs.map(m => m._id === msg._id ? { ...m, read: true } : m));
    setSelected({ ...msg, read: true });
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Delete this message?")) return;
    try {
      const res = await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages(msgs => msgs.filter(m => m._id !== id));
        if (selected?._id === id) setSelected(null);
        toast.success("Message deleted successfully");
      } else {
        toast.error("Failed to delete message");
      }
    } catch {
      toast.error("Error deleting message");
    }
  };

  return (
    <div className="p-6 lg:p-8 flex h-screen gap-6 overflow-hidden">
      {/* Inbox List */}
      <div className="w-full lg:w-96 flex flex-col min-h-0 bg-dark-800 rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 shrink-0">
          <h1 className="text-xl font-bold text-white flex items-center gap-2"><FiMail /> Inbox</h1>
          <p className="text-gray-400 text-sm mt-1">{messages.filter(m => !m.read).length} unread messages</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-4 space-y-2">{[...Array(5)].map((_, i) => <div key={i} className="h-20 bg-dark-700 animate-pulse rounded-xl" />)}</div>
          ) : messages.length === 0 ? (
            <div className="p-8 text-center text-gray-500">Inbox is empty.</div>
          ) : (
            <div className="divide-y divide-white/5">
              {messages.map(msg => (
                <button
                  key={msg._id}
                  onClick={() => markRead(msg)}
                  className={`w-full text-left p-4 hover:bg-white/5 transition-colors flex flex-col gap-1 ${selected?._id === msg._id ? "bg-white/5" : ""}`}
                >
                  <div className="flex justify-between items-center gap-2">
                    <span className={`text-sm truncate ${msg.read ? "text-gray-400" : "text-white font-semibold"}`}>{msg.name}</span>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{format(new Date(msg.createdAt), "MMM d, h:mm a")}</span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <span className={`text-sm truncate ${msg.read ? "text-gray-500" : "text-primary-400 font-medium"}`}>{msg.subject}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      {!msg.read && <span className="w-2 h-2 bg-primary-500 rounded-full" />}
                      {msg.read && <FiCheck size={14} className="text-gray-600" />}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail View */}
      <div className="hidden lg:flex flex-1 flex-col min-h-0 bg-dark-800 rounded-2xl border border-white/5 overflow-hidden">
        {selected ? (
          <>
            <div className="p-8 border-b border-white/5 shrink-0">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{selected.subject}</h2>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-white">{selected.name}</span>
                    <span className="text-gray-500">&lt;{selected.email}&gt;</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  {format(new Date(selected.createdAt), "MMMM d, yyyy · h:mm a")}
                  <button onClick={(e) => handleDelete(selected._id, e)} className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-900/20 transition-all">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-8 flex-1 overflow-y-auto">
              <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">
                {selected.message}
              </div>
            </div>
            <div className="p-6 border-t border-white/5 shrink-0 bg-dark-900/50">
              <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="btn-primary py-2 px-4 text-sm">
                Reply via Email
              </a>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 text-gray-500">
            <FiMail size={48} className="mb-4 opacity-50" />
            <p>Select a message to read</p>
          </div>
        )}
      </div>
    </div>
  );
}
