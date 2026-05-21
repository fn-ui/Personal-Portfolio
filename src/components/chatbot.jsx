import { useEffect, useRef, useState } from "react";
import {
  FaRobot,
  FaTimes,
  FaPaperPlane,
  FaUserCircle,
  FaMinus,
  FaTrash,
} from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";

/* Time Formatter */
const getTime = () => {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/* Initial Messages */
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

/* FAQ System */
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
      "Reach out using the contact form below or via GitHub and LinkedIn.",
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

  /* Safe localStorage (Vercel fix) */
  const [messages, setMessages] = useState(() => {
    if (typeof window === "undefined") return initialMessages;

    const saved = localStorage.getItem("portfolio-chat");
    return saved ? JSON.parse(saved) : initialMessages;
  });

  /* Save Messages */
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-chat", JSON.stringify(messages));
    }
  }, [messages]);

  /* Auto Scroll */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

  /* Hide Popup */
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const getRandomReply = (responses) => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  /* Handle Send */
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
    }, 1000);
  };

  const clearChat = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("portfolio-chat");
    }
    setMessages(initialMessages);
  };

  return (
    <>
      {/* Popup */}
      <AnimatePresence>
        {showPopup && !open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-24 right-4 z-50 rounded-2xl border border-white/10 bg-[#0b1120]/90 px-4 py-3 text-sm text-white shadow-xl backdrop-blur-xl"
          >
            👋 Need help? Chat with me!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setOpen(!open);
          setMinimized(false);
        }}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-[0_0_35px_rgba(59,130,246,0.35)]"
      >
        {open ? <FaTimes size={18} /> : <FaRobot size={20} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && !minimized && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            className="fixed bottom-20 right-4 z-[9999] flex flex-col overflow-hidden h-[360px] w-[260px] sm:h-[380px] sm:w-[280px] max-w-[90vw] max-h-[70vh] rounded-2xl border border-white/10 bg-[#0b1120]/95 shadow-2xl shadow-black/50 backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-3 py-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <FaRobot size={16} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Portfolio Assistant
                  </h3>
                  <p className="text-xs text-green-400">Online</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-400">
                <button onClick={() => setMinimized(true)}>
                  <FaMinus />
                </button>
                <button onClick={clearChat}>
                  <FaTrash />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className="flex items-end gap-2">
                  <div
                    className={`max-w-[180px] rounded-2xl px-4 py-3 text-[11px] ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white ml-auto"
                        : "bg-white/10 text-slate-200"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-white/10 p-3">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1 bg-transparent text-white outline-none"
                  placeholder="Ask something..."
                />

                <button onClick={handleSend}>
                  <FaPaperPlane />
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