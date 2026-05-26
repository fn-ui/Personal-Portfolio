import { useEffect, useState } from "react";
import API from "../../api/axios";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // STATES
  const [search, setSearch] = useState("");
  const [activeReply, setActiveReply] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [readMessages, setReadMessages] = useState({});

  // FETCH MESSAGES
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await API.get("/messages");
      setMessages(res.data);
    } catch (error) {
      console.log("FETCH ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // DELETE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this message?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/messages/${id}`);
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
      alert("Message deleted successfully");
    } catch (error) {
      console.log("DELETE ERROR:", error);
    }
  };

  // MARK AS READ (frontend only)
  const markAsRead = (id) => {
    setReadMessages((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  // SEND REPLY (FIXED POSITION - OUTSIDE RETURN)
  const sendReply = async (id) => {
    try {
      console.log("SENDING REPLY...");

      const res = await API.post(`/messages/${id}/reply`, {
        message: replyText,
      });

      console.log("REPLY RESPONSE:", res.data);

      setReplyText("");
      setActiveReply(null);

      alert("Reply sent successfully");
    } catch (error) {
      console.log("REPLY ERROR:", error);
    }
  };

  // FILTER
  const filteredMessages = messages.filter((msg) =>
    msg.name.toLowerCase().includes(search.toLowerCase()) ||
    msg.email.toLowerCase().includes(search.toLowerCase()) ||
    msg.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Messages ({messages.length})
        </h1>

        <p className="mt-2 text-slate-500">
          Manage contact form messages.
        </p>

        <input
          type="text"
          placeholder="Search messages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-4 w-full rounded-xl border p-3"
        />
      </div>

      {/* LOADING */}
      {loading && (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-slate-500">Loading messages...</p>
        </div>
      )}

      {/* EMPTY */}
      {!loading && messages.length === 0 && (
        <div className="rounded-2xl bg-white p-6 shadow-sm text-center text-slate-500">
          📭 No messages yet.
        </div>
      )}

      {/* FILTER EMPTY */}
      {!loading && messages.length > 0 && filteredMessages.length === 0 && (
        <div className="rounded-2xl bg-white p-6 shadow-sm text-center text-slate-500">
          No matching messages found.
        </div>
      )}

      {/* MESSAGES */}
      <div className="grid gap-6">
        {filteredMessages.map((msg) => (
          <div
            key={msg._id}
            onClick={() => markAsRead(msg._id)}
            className="rounded-3xl border bg-white p-6 shadow-sm hover:shadow-md transition cursor-pointer"
          >
            {/* TOP */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">{msg.name}</h2>
                <p className="text-sm text-slate-500">{msg.email}</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  readMessages[msg._id]
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {readMessages[msg._id] ? "Read" : "Unread"}
              </span>
            </div>

            {/* MESSAGE */}
            <div className="mt-4 bg-slate-50 p-4 rounded-xl">
              {msg.message}
            </div>

            {/* DATE */}
            <p className="text-xs text-slate-400 mt-3">
              {new Date(msg.createdAt).toLocaleString()}
            </p>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveReply(
                    activeReply === msg._id ? null : msg._id
                  );
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Reply
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(msg._id);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>

            {/* REPLY BOX */}
            {activeReply === msg._id && (
              <div className="mt-4">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full border p-3 rounded-lg"
                  placeholder="Write reply..."
                />

                <button
                  onClick={() => sendReply(msg._id)}
                  className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Send Reply
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Messages;