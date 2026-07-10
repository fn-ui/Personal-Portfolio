import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaMagic, FaMinus, FaPaperPlane, FaRobot, FaTimes, FaTrash } from "react-icons/fa";

const getTime = () =>
  new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

const initialMessages = [
  {
    sender: "bot",
    text: "Hi, I'm Faith's portfolio assistant.",
    time: getTime(),
  },
  {
    sender: "bot",
    text: "Ask me about skills, projects, services, or availability.",
    time: getTime(),
  },
];

const faq = [
  {
    keywords: ["skills", "tech", "stack"],
    responses: [
      "Faith works with React, Tailwind CSS, JavaScript, Node.js, Express, and MongoDB.",
      "Faith focuses on responsive interfaces, clean React structure, API integration, and admin dashboards.",
    ],
  },
  {
    keywords: ["projects", "portfolio", "work"],
    responses: [
      "Featured work includes this portfolio system, admin dashboard workflows, and responsive business websites.",
      "Faith builds polished project showcases, dashboards, and mobile-friendly web experiences.",
    ],
  },
  {
    keywords: ["contact", "email", "github", "linkedin"],
    responses: [
      "You can contact Faith through the contact form or by email at fn0740839@gmail.com.",
      "Use the contact section for project inquiries, collaborations, or role opportunities.",
    ],
  },
  {
    keywords: ["services", "hire", "freelance"],
    responses: [
      "Faith offers frontend development, admin dashboards, UI polish, and responsive builds.",
      "Faith can help with professional websites, portfolios, landing pages, and connected web apps.",
    ],
  },
  {
    keywords: ["internship", "available", "availability"],
    responses: [
      "Faith is open to selected projects, internships, and collaboration opportunities.",
      "Faith is available for frontend and full-stack web opportunities.",
    ],
  },
  {
    keywords: ["hello", "hi", "hey"],
    responses: [
      "Hello. Nice to meet you.",
      "Hi there. Feel free to ask anything about the portfolio.",
    ],
  },
];

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const getRandomReply = (responses) =>
    responses[Math.floor(Math.random() * responses.length)];

  const handleSend = () => {
    if (!input.trim()) return;

    const text = input.toLowerCase();
    const userMessage = {
      sender: "user",
      text: input.trim(),
      time: getTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      let botReply =
        "I am not sure how to answer that yet. Try asking about skills, projects, services, or contact information.";

      for (const item of faq) {
        if (item.keywords.some((keyword) => text.includes(keyword))) {
          botReply = getRandomReply(item.responses);
          break;
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: botReply,
          time: getTime(),
        },
      ]);
      setTyping(false);
    }, 700);
  };

  const clearChat = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("portfolio-chat");
    }

    setMessages(initialMessages);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setOpen(!open);
          setMinimized(false);
        }}
        aria-label={open ? "Close portfolio assistant" : "Open portfolio assistant"}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#c65f4a] text-white shadow-lg shadow-[#c65f4a]/30 hover:bg-[#ad503e]"
      >
        {open ? <FaTimes size={18} /> : <FaRobot size={20} />}
      </motion.button>

      <AnimatePresence>
        {open && !minimized && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            className="fixed bottom-24 right-5 z-[9999] flex h-[500px] w-[340px] max-w-[92vw] flex-col overflow-hidden rounded-2xl border border-[#eadccf] bg-white shadow-2xl"
          >
            <div className="border-b border-[#eadccf] bg-[#241423] p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c65f4a]">
                    <FaRobot size={17} />
                  </div>
                  <div>
                    <h3 className="font-bold">Portfolio Assistant</h3>
                    <p className="text-xs text-[#d7c7ba]">Online</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-[#d7c7ba]">
                  <button aria-label="Minimize chat" onClick={() => setMinimized(true)}>
                    <FaMinus />
                  </button>
                  <button aria-label="Clear chat" onClick={clearChat}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto bg-[#fff8ef] px-4 py-5">
              {messages.map((msg, index) => (
                <div
                  key={`${msg.time}-${index}`}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-4 py-3 text-sm shadow-sm ${
                      msg.sender === "user"
                        ? "bg-[#7a2e53] text-white"
                        : "border border-[#eadccf] bg-white text-[#5f4d55]"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="mt-2 block text-[10px] opacity-60">
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-xl border border-[#eadccf] bg-white px-4 py-3 text-sm text-[#6d5b53] shadow-sm">
                    <FaMagic className="text-[#c65f4a]" />
                    Typing...
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-[#eadccf] bg-white p-4">
              <div className="flex items-center gap-3 rounded-xl border border-[#eadccf] bg-[#fffaf3] px-4 py-3">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && handleSend()}
                  className="flex-1 bg-transparent text-sm outline-none"
                  placeholder="Ask something..."
                />
                <button
                  onClick={handleSend}
                  aria-label="Send message"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#c65f4a] text-white hover:bg-[#ad503e]"
                >
                  <FaPaperPlane size={12} />
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
