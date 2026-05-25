import { useEffect, useRef, useState } from "react";

import {
  FaRobot,
  FaTimes,
  FaPaperPlane,
  FaMinus,
  FaTrash,
  FaMagic, // ✅ FIX: replaced FaSparkles
} from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";

/* TIME FORMAT */
const getTime = () => {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/* INITIAL MESSAGES */
const initialMessages = [
  {
    sender: "bot",
    text: "Hi 👋 I'm Faith's portfolio assistant.",
    time: getTime(),
  },
  {
    sender: "bot",
    text: "Ask me about skills, projects, services, or internships.",
    time: getTime(),
  },
];

/* FAQ */
const faq = [
  {
    keywords: ["skills", "tech", "stack"],
    responses: [
      "Faith specializes in React, Tailwind CSS, JavaScript, HTML, Python, and responsive frontend development.",
      "Faith works with React, Tailwind CSS, JavaScript, HTML, and modern UI technologies.",
    ],
  },
  {
    keywords: ["projects", "portfolio", "work"],
    responses: [
      "Faith has built a personal portfolio website and the Bellebliss fashion website.",
      "Featured projects include a responsive portfolio and an e-commerce clothing website.",
    ],
  },
  {
    keywords: ["contact", "email", "github", "linkedin"],
    responses: [
      "You can contact Faith through the contact section or social links.",
      "Reach out using the contact form or via GitHub and LinkedIn.",
    ],
  },
  {
    keywords: ["services", "hire", "freelance"],
    responses: [
      "Faith offers frontend web development and responsive UI design services.",
      "Faith works on modern websites, portfolios, and responsive web applications.",
    ],
  },
  {
    keywords: ["internship", "available"],
    responses: [
      "Faith is currently available for internships and collaborations.",
      "Faith is open to internship opportunities and frontend projects.",
    ],
  },
  {
    keywords: ["hello", "hi", "hey"],
    responses: [
      "Hello 👋 Nice to meet you!",
      "Hi there 👋 Feel free to ask anything about the portfolio.",
    ],
  },
];

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState(() => {
    if (typeof window === "undefined") return initialMessages;

    const saved = localStorage.getItem("portfolio-chat");
    return saved ? JSON.parse(saved) : initialMessages;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-chat", JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const getRandomReply = (responses) => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const text = input.toLowerCase();

    const userMessage = {
      sender: "user",
      text: input,
      time: getTime(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setTyping(true);

    setTimeout(() => {
      let botReply =
        "I'm not sure how to answer that yet. Try asking about skills, projects, or contact information.";

      for (const item of faq) {
        if (item.keywords.some((keyword) => text.includes(keyword))) {
          botReply = getRandomReply(item.responses);
          break;
        }
      }

      const botMessage = {
        sender: "bot",
        text: botReply,
        time: getTime(),
      };

      setMessages((prev) => [...prev, botMessage]);

      setTyping(false);
    }, 900);
  };

  const clearChat = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("portfolio-chat");
    }

    setMessages(initialMessages);
  };

  return (
    <>
      <AnimatePresence>
        {showPopup && !open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-24 right-5 z-50 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-2xl"
          >
            👋 Need help? Chat with me!
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setOpen(!open);
          setMinimized(false);
        }}
        className="fixed bottom-5 right-5 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-[0_15px_40px_rgba(37,99,235,0.35)]"
      >
        {open ? <FaTimes size={20} /> : <FaRobot size={22} />}
      </motion.button>

      <AnimatePresence>
        {open && !minimized && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            className="fixed bottom-24 right-5 z-[9999] flex h-[500px] w-[340px] max-w-[92vw] flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl"
          >
            {/* HEADER */}
            <div className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-r from-blue-600 to-sky-500 p-5 text-white">
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">
                    <FaRobot size={18} />
                  </div>

                  <div>
                    <h3 className="font-bold">Portfolio Assistant</h3>
                    <div className="flex items-center gap-2 text-sm text-blue-100">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-green-300" />
                      Online
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-blue-100">
                  <button onClick={() => setMinimized(true)}>
                    <FaMinus />
                  </button>

                  <button onClick={clearChat}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 space-y-5 overflow-y-auto bg-slate-50 px-4 py-5">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm shadow-sm ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white"
                        : "border border-slate-200 bg-white text-slate-700"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="mt-2 block text-[10px] opacity-60">
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {/* TYPING */}
              {typing && (
                <div className="flex justify-start">
                  <div className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm flex items-center gap-2">
                    <FaMagic className="text-blue-500" /> {/* ✅ FIX HERE */}
                    Typing...
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* INPUT */}
            <div className="border-t border-slate-200 bg-white p-4">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1 bg-transparent text-sm outline-none"
                  placeholder="Ask something..."
                />

                <button
                  onClick={handleSend}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white"
                >
                  <FaPaperPlane size={13} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ChatBot;