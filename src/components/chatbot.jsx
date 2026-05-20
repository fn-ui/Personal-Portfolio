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

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  const messagesEndRef = useRef(null);

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

  /* Messages State */
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("portfolio-chat");

    return saved ? JSON.parse(saved) : initialMessages;
  });

  /* Save Messages */
  useEffect(() => {
    localStorage.setItem(
      "portfolio-chat",
      JSON.stringify(messages)
    );
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

  /* Random Reply */
  const getRandomReply = (responses) => {
    return responses[
      Math.floor(Math.random() * responses.length)
    ];
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
        if (
          item.keywords.some((keyword) =>
            text.includes(keyword)
          )
        ) {
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

  /* Clear Chat */
  const clearChat = () => {
    localStorage.removeItem("portfolio-chat");

    setMessages(initialMessages);
  };

  return (
    <>
      {/* Welcome Popup */}
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

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setOpen(!open);
          setMinimized(false);
        }}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-[0_0_35px_rgba(59,130,246,0.35)]"
      >
        {open ? (
          <FaTimes size={18} />
        ) : (
          <FaRobot size={20} />
        )}
      </motion.button>

      {/* Minimized Bar */}
      <AnimatePresence>
        {open && minimized && (
          <motion.button
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            onClick={() => setMinimized(false)}
            className="fixed bottom-24 right-4 z-50 flex items-center gap-3 rounded-full border border-white/10 bg-[#0b1120]/95 px-4 py-3 text-white shadow-xl backdrop-blur-xl"
          >
            <FaRobot />

            <span className="text-sm font-medium">
              Portfolio Assistant
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
     <AnimatePresence>
  {open && !minimized && (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: 40,
        scale: 0.95,
      }}
      transition={{ duration: 0.3 }}
      className="
        
        fixed bottom-20 right-4 z-[9999]
        flex flex-col overflow-hidden

        h-[360px] w-[260px]
        sm:h-[380px] sm:w-[280px]
        max-w-[90vw] max-h-[70vh]

        rounded-2xl
        border border-white/10
        bg-[#0b1120]/95
        shadow-2xl shadow-black/50
        backdrop-blur-2xl
        "
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

                  <p className="text-xs text-green-400">
                    Online
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-400">
                <button
                  onClick={() => setMinimized(true)}
                  className="transition hover:text-white"
                >
                  <FaMinus />
                </button>

                <button
                  onClick={clearChat}
                  className="transition hover:text-red-400"
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {/* Suggestions */}
              <div className="flex flex-wrap gap-2">
                {[
                  "Skills",
                  "Projects",
                  "Contact",
                  "Services",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => setInput(item)}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-slate-300 transition hover:bg-white/10"
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Messages */}
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className={`flex items-end gap-2 ${
                    msg.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      <FaRobot size={12} />
                    </div>
                  )}

                  <div>
                    <div
                      className={`max-w-[180px] rounded-2xl px-4 py-3 text-[11px] leading-snug ${
                        msg.sender === "user"
                          ? "rounded-br-md bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                          : "rounded-bl-md border border-white/10 bg-white/10 text-slate-200"
                      }`}
                    >
                      {msg.text}
                    </div>

                    <p
                      className={`mt-1 text-[10px] text-slate-500 ${
                        msg.sender === "user"
                          ? "text-right"
                          : "text-left"
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>

                  {msg.sender === "user" && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white">
                      <FaUserCircle size={16} />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing */}
              {typing && (
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    <FaRobot size={12} />
                  </div>

                  <div className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white"></span>

                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white [animation-delay:0.2s]"></span>

                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-white/10 bg-white/[0.03] p-3">
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2">
                <input
                  type="text"
                  placeholder="Ask something..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleSend()
                  }
                  className="flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-slate-500"
                />

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                >
                  <FaPaperPlane size={14} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ChatBot;