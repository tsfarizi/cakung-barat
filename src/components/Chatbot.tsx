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
      {/* Chat icon dengan animasi glassmorphism */}
      <motion.img
        src="/cakung-barat/chat-icon.png"
        alt="Chat"
        id="chat-toggle"
        className="w-14 h-14 fixed bottom-6 right-6 cursor-pointer z-999 rounded-full bg-white shadow-lg p-2"
        style={{
          background: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
        }}
        onClick={openChat}
        whileHover={{
          scale: 1.1,
          boxShadow: '0 0 20px rgba(30, 144, 255, 0.5)'
        }}
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

      {/* Chat window dengan animasi dan glassmorphism */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-window glassmorphism"
            id="chat-window"
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'fixed',
              bottom: '90px',
              right: '25px',
              width: '320px',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              overflow: 'hidden',
              zIndex: '999'
            }}
            initial={{ opacity: 0, y: 20, scale: 0.8, rotateX: 90 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.8, rotateX: 90 }}
            transition={{
              type: 'spring',
              damping: 20,
              stiffness: 300,
              rotateX: { duration: 0.3 }
            }}
          >
            <div
              className="chat-header glassmorphism-header"
              style={{
                background: 'rgba(30, 144, 255, 0.4)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                color: '#fff',
                padding: '12px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <h4 className="m-0 font-bold flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></span>
                Chatbot Cakung Barat
              </h4>
              <motion.button
                id="chat-close"
                className="text-white bg-none border-none text-xl cursor-pointer rounded-full w-8 h-8 flex items-center justify-center transition-all"
                onClick={() => setIsOpen(false)}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  rotate: 90
                }}
                whileTap={{ scale: 0.9 }}
              >
                &times;
              </motion.button>
            </div>
            <div
              className="chat-body"
              id="chat-body"
              style={{
                height: '300px',
                overflowY: 'auto',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <motion.div
                className="bot-message glassmorphism-message"
                style={{
                  background: 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                  color: '#333',
                  padding: '12px 16px',
                  borderRadius: '18px 18px 18px 4px',
                  maxWidth: '85%',
                  alignSelf: 'flex-start',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                }}
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
              >
                {botMessage}
                {isTyping && <span className="blinking-cursor">|</span>}
              </motion.div>
            </div>
            <div
              className="chat-input glassmorphism-input"
              style={{
                display: 'flex',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '12px'
              }}
            >
              <input
                type="text"
                id="chat-input"
                placeholder="Ketik pesan..."
                className="flex-1 bg-white/30 backdrop-blur-sm p-3 rounded-l-lg border-none outline-none text-gray-800 placeholder-gray-600"
                style={{
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0
                }}
              />
              <motion.button
                id="send-btn"
                className="bg-primary text-white border-none p-3 cursor-pointer rounded-r-lg transition-colors"
                style={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  background: 'rgba(30, 144, 255, 0.7)',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
                whileHover={{
                  scale: 1.05,
                  background: 'rgba(30, 144, 255, 0.9)',
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                Kirim
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menambahkan styling untuk glassmorphism dan animasi tambahan */}
      <style>{`
        .blinking-cursor {
          animation: blink 1s infinite;
          margin-left: 4px;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .glassmorphism {
          transition: all 0.3s ease;
        }

        .glassmorphism:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.45);
        }

        .glassmorphism-header {
          transition: all 0.3s ease;
        }

        .glassmorphism-message {
          transition: all 0.3s ease;
        }

        .glassmorphism-message:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        }

        .glassmorphism-input {
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default Chatbot;