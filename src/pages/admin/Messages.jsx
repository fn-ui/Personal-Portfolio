import { useEffect, useRef, useState } from "react";
import API from "../../api/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { formatDateTime, formatStatus } from "../../utils/formatters";

import {
  Mail,
  Trash2,
  Search,
  RefreshCcw,
  User,
  Send,
  X,
  AlertCircle,
  CheckCircle2,
  Clock,
  MessageCircle,
  Loader2,
  Sparkles,
} from "lucide-react";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [stats, setStats] = useState({ New: 0, Replied: 0, Closed: 0, total: 0 });

  // Reply Modal States
  const [replyOpen, setReplyOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replySubject, setReplySubject] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [replySending, setReplySending] = useState(false);

  // Delete Confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  const socketRef = useRef(null);

  // =========================
  // FETCH MESSAGES
  // =========================
  const fetchMessages = async () => {
    try {
      setLoading(true);

      const res = await API.get("/messages");
      const msgData = Array.isArray(res.data) ? res.data : res.data?.data || [];

      setMessages(msgData);

      // Calculate stats
      const newStats = {
        total: msgData.length,
        New: msgData.filter((m) => m.status === "New").length,
        Replied: msgData.filter((m) => m.status === "Replied").length,
        Closed: msgData.filter((m) => m.status === "Closed").length,
      };
      setStats(newStats);
    } catch (err) {
      if (
        err.response?.status === 503 ||
        err.code === "ECONNABORTED"
      ) {
        setMessages([]);
        setStats({ New: 0, Replied: 0, Closed: 0, total: 0 });
        return;
      }

      console.error(err);
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // SOCKET SETUP
  // =========================
  useEffect(() => {
    fetchMessages();

    socketRef.current = io(
      import.meta.env.VITE_SOCKET_URL || "http://localhost:5000"
    );

    socketRef.current.on("new_message", (data) => {
      setMessages((prev) => [data, ...prev]);
    });

    socketRef.current.on("delete_message", (id) => {
      setMessages((prev) => prev.filter((m) => m._id !== id));
    });

    socketRef.current.on("message_updated", (updated) => {
      setMessages((prev) =>
        prev.map((m) => (m._id === updated._id ? updated : m))
      );
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  // =========================
  // DELETE MESSAGE
  // =========================
  const handleDelete = async () => {
    if (!messageToDelete) return;

    try {
      await API.delete(`/messages/${messageToDelete}`);
      setMessages((prev) => prev.filter((m) => m._id !== messageToDelete));
      setShowDeleteConfirm(false);
      setMessageToDelete(null);
      toast.success("Message deleted");
    } catch (err) {
      toast.error("Failed to delete message");
    }
  };

  // =========================
  // SEND REPLY
  // =========================
  const handleSendReply = async () => {
    if (!replySubject.trim() || !replyMessage.trim()) {
      return toast.error("Subject and message are required");
    }

    try {
      setReplySending(true);

      await API.post(`/messages/${selectedMessage._id}/reply`, {
        subject: replySubject,
        message: replyMessage,
      });

      toast.success("Reply sent successfully!");

      setReplyOpen(false);
      setSelectedMessage(null);
      setReplySubject("");
      setReplyMessage("");

      // Refresh messages
      fetchMessages();
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to send reply";
      toast.error(msg);
    } finally {
      setReplySending(false);
    }
  };

  // =========================
  // UPDATE STATUS
  // =========================
  const updateStatus = async (id, newStatus) => {
    try {
      await API.patch(`/messages/${id}/status`, { status: newStatus });
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, status: newStatus } : m))
      );
      toast.success(`Status updated to ${newStatus}`);
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  // =========================
  // FILTER + SEARCH
  // =========================
  const filteredMessages = messages.filter((msg) => {
    const q = search.toLowerCase();

    const matchesSearch =
      msg.name?.toLowerCase().includes(q) ||
      msg.email?.toLowerCase().includes(q) ||
      msg.message?.toLowerCase().includes(q);

    const matchesFilter =
      filter === "All" ? true : msg.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#5b233f] to-[#7a2e53] rounded-2xl p-8 md:p-12 text-white">
        <div className="absolute top-0 right-0 opacity-10">
          <Sparkles size={200} />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl">
              <Mail size={28} />
            </div>
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm backdrop-blur-md">
              Message Management
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Messages & Inquiries
          </h1>

          <p className="text-white/75 mb-6 max-w-2xl">
            Manage and respond to visitor messages. Track response status and build relationships.
          </p>

          <button
            onClick={fetchMessages}
            className="inline-flex items-center gap-2 bg-white text-[#7a2e53] hover:shadow-2xl px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
          >
            <RefreshCcw size={20} />
            Refresh Messages
          </button>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-950 rounded-xl p-6 border border-[#eadccf] dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#6d5b53] dark:text-[#7c6a61] text-sm">Total Messages</p>
              <p className="text-3xl font-bold text-[#241423] dark:text-white mt-2">
                {stats.total}
              </p>
            </div>
            <MessageCircle className="text-[#7c6a61]" size={32} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-950 rounded-xl p-6 border border-[#eadccf] dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#6d5b53] dark:text-[#7c6a61] text-sm">New</p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">
                {stats.New}
              </p>
            </div>
            <AlertCircle className="text-red-400" size={32} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-950 rounded-xl p-6 border border-[#eadccf] dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#6d5b53] dark:text-[#7c6a61] text-sm">Replied</p>
              <p className="text-3xl font-bold text-[#c65f4a] dark:text-[#f4a391] mt-2">
                {stats.Replied}
              </p>
            </div>
            <CheckCircle2 className="text-[#f4a391]" size={32} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-950 rounded-xl p-6 border border-[#eadccf] dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#6d5b53] dark:text-[#7c6a61] text-sm">Closed</p>
              <p className="text-3xl font-bold text-[#6d5b53] dark:text-[#7c6a61] mt-2">
                {stats.Closed}
              </p>
            </div>
            <Clock className="text-[#7c6a61]" size={32} />
          </div>
        </div>
      </div>

      {/* SEARCH & FILTER */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7c6a61]" size={20} />
          <input
            type="text"
            placeholder="Search by name, email, or message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#eadccf] dark:border-slate-700 dark:bg-slate-900 dark:text-white focus:border-[#c65f4a] focus:ring-2 focus:ring-[#f3c8bb]/60 dark:focus:ring-[#c65f4a]/20 transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          {["All", "New", "Replied", "Closed"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === status
                  ? "bg-[#c65f4a] text-white"
                  : "bg-[#fff8ef] dark:bg-slate-900 text-[#5f4d55] dark:text-slate-300 hover:bg-[#fbe3dc] dark:hover:bg-slate-800"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* MESSAGES LIST */}
      {loading ? (
        <div className="text-center py-12">
          <Loader2 className="animate-spin mx-auto mb-4 text-[#c65f4a]" size={32} />
          <p className="text-[#6d5b53] dark:text-[#7c6a61]">Loading messages...</p>
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-950 rounded-xl border border-[#eadccf] dark:border-slate-700">
          <Mail className="mx-auto mb-4 text-[#7c6a61]" size={48} />
          <p className="text-[#6d5b53] dark:text-[#7c6a61]">
            {messages.length === 0 ? "No messages yet" : "No messages match your search"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((msg) => {
            const statusInfo = formatStatus(msg.status);
            return (
              <div
                key={msg._id}
                className="bg-white dark:bg-slate-950 rounded-xl p-6 border border-[#eadccf] dark:border-slate-700 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#fbe3dc] dark:bg-slate-900 flex items-center justify-center">
                        <User size={20} className="text-[#6d5b53] dark:text-[#7c6a61]" />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-bold text-[#241423] dark:text-white">
                          {msg.name}
                        </h3>
                        <p className="text-sm text-[#7c6a61] dark:text-[#7c6a61]">{msg.email}</p>
                      </div>

                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                        {statusInfo.label}
                      </div>
                    </div>

                    <p className="text-[#5f4d55] dark:text-slate-300 my-3">{msg.message}</p>

                    <p className="text-xs text-[#7c6a61] dark:text-[#7c6a61]">
                      {formatDateTime(msg.createdAt)}
                    </p>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex-shrink-0 flex gap-2">
                    {msg.status !== "Replied" && (
                      <button
                        onClick={() => {
                          setSelectedMessage(msg);
                          setReplySubject(`Re: Message from ${msg.name}`);
                          setReplyOpen(true);
                        }}
                        className="p-2 hover:bg-[#fbe3dc] dark:hover:bg-[#c65f4a]/10 text-[#c65f4a] dark:text-[#f4a391] rounded-lg transition-all"
                        title="Reply"
                      >
                        <Send size={18} />
                      </button>
                    )}

                    {msg.status !== "Closed" && (
                      <button
                        onClick={() => updateStatus(msg._id, "Closed")}
                        className="p-2 hover:bg-[#fff8ef] dark:hover:bg-slate-800 text-[#6d5b53] dark:text-[#7c6a61] rounded-lg transition-all"
                        title="Mark as Closed"
                      >
                        <Clock size={18} />
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setMessageToDelete(msg._id);
                        setShowDeleteConfirm(true);
                      }}
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg transition-all"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* REPLIES */}
                {msg.replies?.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-[#eadccf] dark:border-slate-700 space-y-2">
                    <p className="text-xs font-semibold text-[#6d5b53] dark:text-[#7c6a61]">
                      Replies ({msg.replies.length})
                    </p>
                    {msg.replies.map((reply, idx) => (
                      <div
                        key={idx}
                        className="bg-[#fff8ef] dark:bg-slate-950 p-3 rounded-lg text-sm"
                      >
                        <p className="font-medium text-[#5f4d55] dark:text-slate-300">
                          {reply.subject}
                        </p>
                        <p className="text-[#6d5b53] dark:text-[#7c6a61] text-xs">
                          {reply.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* REPLY MODAL */}
      {replyOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-950 rounded-2xl max-w-xl w-full border border-[#eadccf] dark:border-slate-700">
            {/* HEADER */}
            <div className="flex items-center justify-between p-6 border-b border-[#eadccf] dark:border-slate-700">
              <div>
                <h3 className="text-xl font-bold text-[#241423] dark:text-white">
                  Reply to Message
                </h3>
                <p className="text-sm text-[#6d5b53] dark:text-[#7c6a61] mt-1">
                  From: {selectedMessage?.name}
                </p>
              </div>
              <button
                onClick={() => setReplyOpen(false)}
                className="text-[#7c6a61] hover:text-[#5f4d55] dark:hover:text-slate-200"
              >
                <X size={24} />
              </button>
            </div>

            {/* CONTENT */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#5f4d55] dark:text-slate-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={replySubject}
                  onChange={(e) => setReplySubject(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-[#eadccf] dark:border-slate-700 dark:bg-slate-900 dark:text-white focus:border-[#c65f4a] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#5f4d55] dark:text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows="6"
                  className="w-full px-4 py-2 rounded-lg border border-[#eadccf] dark:border-slate-700 dark:bg-slate-900 dark:text-white focus:border-[#c65f4a] outline-none resize-none"
                />
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex gap-3 p-6 border-t border-[#eadccf] dark:border-slate-700">
              <button
                onClick={() => setReplyOpen(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-[#eadccf] dark:border-slate-700 hover:bg-[#fff8ef] dark:hover:bg-slate-800 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSendReply}
                disabled={replySending}
                className="flex-1 px-4 py-2 rounded-lg bg-[#c65f4a] hover:bg-[#ad503e] disabled:bg-[#d88f7a] text-white font-medium transition-all flex items-center justify-center gap-2"
              >
                {replySending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Reply
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-950 rounded-2xl p-6 max-w-sm border border-[#eadccf] dark:border-slate-700">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 mx-auto mb-4">
              <AlertCircle className="text-red-600 dark:text-red-400" size={24} />
            </div>

            <h3 className="text-lg font-bold text-center text-[#241423] dark:text-white mb-2">
              Delete Message?
            </h3>

            <p className="text-[#6d5b53] dark:text-[#7c6a61] text-center text-sm mb-6">
              This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-[#eadccf] dark:border-slate-700 hover:bg-[#fff8ef] dark:hover:bg-slate-800 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Messages;


