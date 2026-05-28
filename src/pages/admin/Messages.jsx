import { useEffect, useRef, useState } from "react";
import API from "../../api/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

import {
  Mail,
  Trash2,
  Search,
  RefreshCcw,
  User,
  MessageSquare,
  Send,
  X,
} from "lucide-react";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [replyOpen, setReplyOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replySubject, setReplySubject] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [sending, setSending] = useState(false);

  const socketRef = useRef(null);

  // =========================
  // FETCH MESSAGES
  // =========================
  const fetchMessages = async () => {
    try {
      setLoading(true);

      const res = await API.get("/messages");

      // ✅ FIXED: backend returns array directly
      setMessages(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
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

    socketRef.current = io("http://localhost:5000");

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
      socketRef.current.disconnect();
    };
  }, []);

  // =========================
  // DELETE MESSAGE
  // =========================
  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      await API.delete(`/messages/${id}`);
      toast.success("Message deleted");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // =========================
  // OPEN REPLY
  // =========================
  const openReply = (msg) => {
    setSelectedMessage(msg);
    setReplySubject(`Re: ${msg.name}`);
    setReplyMessage("");
    setReplyOpen(true);
  };

  // =========================
  // SEND REPLY
  // =========================
  const sendReply = async () => {
    if (!replySubject || !replyMessage) {
      return toast.error("Subject and message required");
    }

    try {
      setSending(true);

      await API.post(`/messages/reply/${selectedMessage._id}`, {
        subject: replySubject,
        message: replyMessage,
      });

      toast.success("Reply sent");

      setReplyOpen(false);
      setSelectedMessage(null);
      setReplySubject("");
      setReplyMessage("");
    } catch (err) {
      toast.error("Failed to send reply");
    } finally {
      setSending(false);
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

  // =========================
  // UI
  // =========================
  return (
    <div className="p-6 text-white">

      {/* HEADER */}
      <div className="flex justify-between mb-6">

        <div className="flex items-center gap-2">
          <Mail className="text-blue-400" />
          <h1 className="text-2xl font-bold">Messages</h1>
        </div>

        <div className="flex gap-2">

          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 bg-gray-900 border border-gray-700 rounded"
              placeholder="Search..."
            />
          </div>

          <button
            onClick={fetchMessages}
            className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded"
          >
            <RefreshCcw className="w-4 h-4" />
            Refresh
          </button>

        </div>
      </div>

      {/* FILTERS */}
      <div className="flex gap-2 mb-4">
        {["All", "New", "Replied", "Closed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded ${
              filter === f ? "bg-blue-600" : "bg-gray-800"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : filteredMessages.length === 0 ? (
        <p className="text-gray-500">No messages found</p>
      ) : (
        <div className="grid gap-4">

          {filteredMessages.map((msg) => (
            <div
              key={msg._id}
              className="bg-gray-900 p-4 rounded border border-gray-800"
            >

              <div className="flex justify-between">

                <div>
                  <div className="flex items-center gap-2">
                    <User className="text-blue-400 w-4 h-4" />
                    <h2>{msg.name}</h2>
                  </div>
                  <p className="text-gray-400 text-sm">{msg.email}</p>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => openReply(msg)}>
                    <Send className="text-green-400" />
                  </button>

                  <button onClick={() => deleteMessage(msg._id)}>
                    <Trash2 className="text-red-400" />
                  </button>
                </div>

              </div>

              <p className="mt-3 text-sm text-gray-300">
                {msg.message}
              </p>

              <span className="text-xs text-blue-400">
                {msg.status || "New"}
              </span>

            </div>
          ))}

        </div>
      )}

      {/* MODAL */}
      {replyOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">

          <div className="bg-gray-900 p-5 rounded w-[400px]">

            <div className="flex justify-between mb-3">
              <h2>Reply</h2>
              <button onClick={() => setReplyOpen(false)}>
                <X />
              </button>
            </div>

            <input
              value={replySubject}
              onChange={(e) => setReplySubject(e.target.value)}
              className="w-full mb-2 p-2 bg-gray-800 rounded"
              placeholder="Subject"
            />

            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              className="w-full p-2 bg-gray-800 rounded"
              rows={5}
              placeholder="Message"
            />

            <button
              onClick={sendReply}
              disabled={sending}
              className="w-full mt-3 bg-green-600 p-2 rounded"
            >
              {sending ? "Sending..." : "Send"}
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Messages;