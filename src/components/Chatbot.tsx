import React, { useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);

  const [botMessage, setBotMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const botResponses = [
    "Halo! Ada yang bisa kami bantu?",
    "Selamat datang di layanan informasi Kelurahan Cakung Barat",
    "Anda bisa bertanya tentang pelayanan administrasi, kependudukan, atau informasi terkini"
  ];

  const displayTypingMessage = (message: string) => {
    setIsTyping(true);
    setBotMessage('');
    let currentText = '';
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < message.length) {
        currentText += message.charAt(i);
        setBotMessage(currentText);
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 30);
  };

  const openChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        displayTypingMessage(botResponses[messageIndex]);
        setMessageIndex((prevIndex) => (prevIndex + 1) % botResponses.length);
      }, 300);
    }
  };

  return (
    <div className="relative">
      {/* Chat icon dengan animasi */}
      <motion.img
        src="/cakung-barat/chat-icon.png"
        alt="Chat"
        id="chat-toggle"
        className="w-14 h-14 fixed bottom-6 right-6 cursor-pointer z-999 rounded-full bg-white shadow-lg"
        onClick={openChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={isPulsing ? {
          scale: [1, 1.1, 1],
          rotate: [0, 2, -2, 0]
        } : {}}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="%231E90FF"/><path d="M8 12h8M12 8v8" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>';
        }}
        transition={{
          scale: { duration: 2, repeat: Infinity, repeatType: "reverse" },
          rotate: { duration: 3, repeat: Infinity, repeatType: "reverse" }
        }}
        onAnimationComplete={() => isPulsing && setIsPulsing(true)}
      />

      {/* Chat window dengan animasi */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-window"
            id="chat-window"
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'fixed',
              bottom: '90px',
              right: '25px',
              width: '320px',
              background: '#fff',
              borderRadius: '10px',
              boxShadow: '0 0 10px rgba(0,0,0,.2)',
              overflow: 'hidden',
              zIndex: '999'
            }}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            <div
              className="chat-header"
              style={{
                background: 'var(--primary)',
                color: '#fff',
                padding: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <h4 className="m-0">Chatbot Cakung Barat</h4>
              <button
                id="chat-close"
                className="text-white bg-none border-none text-xl cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                &times;
              </button>
            </div>
            <div
              className="chat-body"
              id="chat-body"
              style={{
                height: '300px',
                overflowY: 'auto',
                padding: '10px'
              }}
            >
              <div
                className="bot-message"
                style={{
                  background: '#e5e5e5',
                  marginBottom: '10px',
                  padding: '8px 10px',
                  borderRadius: '8px',
                  maxWidth: '80%',
                  whiteSpace: 'pre-wrap'
                }}
              >
                {botMessage}
                {isTyping && <span className="blinking-cursor">|</span>}
              </div>
            </div>
            <div
              className="chat-input"
              style={{
                display: 'flex',
                borderTop: '1px solid #ddd'
              }}
            >
              <input
                type="text"
                id="chat-input"
                placeholder="Ketik pesan..."
                className="flex-1 p-2.5 border-none outline-none"
              />
              <button
                id="send-btn"
                className="bg-primary text-white border-none p-2.5 cursor-pointer"
              >
                Kirim
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menambahkan styling untuk cursor */}
      <style>{`
        .blinking-cursor {
          animation: blink 1s infinite;
          margin-left: 4px;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Chatbot;