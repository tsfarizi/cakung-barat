import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PdfAttachment {
  filename: string;
  data: string; // Base64 encoded PDF
  mimeType: string;
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  attachments?: PdfAttachment[];
}

interface ToolStepContent {
  type: string;
  text?: string;
  data?: string;
  mimeType?: string;
}

interface ToolStep {
  tool: string;
  success: boolean;
  output?: {
    content?: ToolStepContent[];
  };
}

interface ChatResponse {
  session_id: string;
  content: string;
  provider: string;
  model: string;
  tool_steps: ToolStep[];
}

const CHAT_URL = import.meta.env.VITE_CHAT_URL || 'https://c2p9p0rq-8080.asse.devtunnels.ms/chat';
const SESSION_KEY = 'chatbot_session_id';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  // Get or create session ID from sessionStorage
  const getSessionId = (): string | null => {
    return sessionStorage.getItem(SESSION_KEY);
  };

  const setSessionId = (sessionId: string) => {
    sessionStorage.setItem(SESSION_KEY, sessionId);
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  // Send message to API
  const sendMessage = async (prompt: string) => {
    if (!prompt.trim() || isLoading) return;

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: prompt
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const sessionId = getSessionId();

      // Build request body
      const requestBody: { prompt: string; agent: boolean; session_id?: string } = {
        prompt: prompt,
        agent: true
      };

      // Add session_id if we have one (not first message)
      if (sessionId) {
        requestBody.session_id = sessionId;
      }

      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ChatResponse = await response.json();

      // Save session_id for future requests
      if (data.session_id) {
        setSessionId(data.session_id);
      }

      // Extract PDF attachments from tool_steps
      const pdfAttachments: PdfAttachment[] = [];
      if (data.tool_steps && data.tool_steps.length > 0) {
        for (const step of data.tool_steps) {
          if (step.success && step.output?.content) {
            for (const contentItem of step.output.content) {
              if (contentItem.type === 'resource' && contentItem.data && contentItem.mimeType === 'application/pdf') {
                // Extract filename from text or generate one
                const filename = contentItem.text?.replace('Generated file: ', '') || `surat_${Date.now()}.pdf`;
                pdfAttachments.push({
                  filename,
                  data: contentItem.data,
                  mimeType: contentItem.mimeType
                });
              }
            }
          }
        }
      }

      // Add bot response to chat
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: data.content,
        attachments: pdfAttachments.length > 0 ? pdfAttachments : undefined
      };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Chat error:', error);
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: 'Maaf, terjadi kesalahan saat menghubungi server. Silakan coba lagi.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const openChat = () => {
    setIsOpen(!isOpen);
    setIsPulsing(false);
  };

  // Download PDF from base64 data
  const downloadPdf = (attachment: PdfAttachment) => {
    try {
      // Decode base64 to binary
      const binaryString = atob(attachment.data);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Create blob and trigger download
      const blob = new Blob([bytes], { type: attachment.mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = attachment.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download PDF:', error);
    }
  };

  return (
    <div className="relative">
      {/* Chat icon dengan animasi glassmorphism */}
      <motion.img
        src="/cakung-barat/chat-icon.png"
        alt="Chat"
        id="chat-toggle"
        className="w-14 h-14 fixed bottom-6 right-6 cursor-pointer z-[999] rounded-full bg-white shadow-lg p-2"
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

      {/* Chat window - Responsive: full screen on mobile, wider on desktop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-window glassmorphism fixed z-[999]
              inset-0 sm:inset-auto
              sm:bottom-[90px] sm:right-[25px]
              sm:w-[500px] md:w-[600px] lg:w-[700px]
              sm:h-[450px] md:h-[480px] lg:h-[500px]
              sm:rounded-2xl"
            id="chat-window"
            style={{
              display: 'flex',
              flexDirection: 'column',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              overflow: 'hidden'
            }}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{
              type: 'spring',
              damping: 20,
              stiffness: 300
            }}
          >
            {/* Header */}
            <div
              className="chat-header"
              style={{
                background: 'linear-gradient(135deg, rgba(30, 144, 255, 0.9), rgba(0, 100, 200, 0.9))',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                color: '#fff',
                padding: '16px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <h4 className="m-0 font-bold flex items-center gap-2 text-lg">
                <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></span>
                Chatbot Cakung Barat
              </h4>
              <motion.button
                id="chat-close"
                className="text-white bg-none border-none text-2xl cursor-pointer rounded-full w-10 h-10 flex items-center justify-center transition-all"
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

            {/* Chat Body */}
            <div
              ref={chatBodyRef}
              className="chat-body flex-1"
              id="chat-body"
              style={{
                overflowY: 'auto',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                backgroundColor: 'rgba(248, 250, 252, 0.5)'
              }}
            >
              {/* Welcome message when no messages */}
              {messages.length === 0 && !isLoading && (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-4">👋</div>
                  <p className="text-lg font-medium">Selamat datang!</p>
                  <p className="text-sm">Silakan ketik pertanyaan Anda tentang layanan Kelurahan Cakung Barat.</p>
                </div>
              )}

              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`message ${message.type === 'user' ? 'user-message' : 'bot-message'}`}
                  style={{
                    background: message.type === 'user'
                      ? 'linear-gradient(135deg, rgba(30, 144, 255, 0.9), rgba(0, 100, 200, 0.9))'
                      : 'rgba(255, 255, 255, 0.9)',
                    color: message.type === 'user' ? '#fff' : '#333',
                    padding: '14px 18px',
                    borderRadius: message.type === 'user'
                      ? '20px 20px 4px 20px'
                      : '20px 20px 20px 4px',
                    maxWidth: '85%',
                    alignSelf: message.type === 'user' ? 'flex-end' : 'flex-start',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    wordWrap: 'break-word'
                  }}
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
                >
                  {message.type === 'bot' ? (
                    <div className="prose prose-sm max-w-none prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: (props) => <p className="mb-2 last:mb-0" {...props} />,
                          h1: (props) => <h1 className="text-lg font-bold mb-2 mt-3" {...props} />,
                          h2: (props) => <h2 className="text-base font-bold mb-2 mt-3" {...props} />,
                          h3: (props) => <h3 className="text-sm font-bold mb-1 mt-2" {...props} />,
                          ul: (props) => <ul className="list-disc pl-4 mb-2" {...props} />,
                          ol: (props) => <ol className="list-decimal pl-4 mb-2" {...props} />,
                          li: (props) => <li className="mb-1" {...props} />,
                          strong: (props) => <strong className="font-semibold" {...props} />,
                          em: (props) => <em className="italic" {...props} />,
                          code: (props) => <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />,
                          pre: (props) => <pre className="bg-gray-100 p-3 rounded-lg my-2 overflow-x-auto text-sm" {...props} />,
                          a: (props) => <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                          blockquote: (props) => <blockquote className="border-l-4 border-blue-400 pl-3 italic my-2 text-gray-600" {...props} />,
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>

                      {/* PDF Attachments */}
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {message.attachments.map((attachment, index) => (
                            <motion.div
                              key={index}
                              className="flex items-center gap-3 p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200 cursor-pointer hover:shadow-md transition-all"
                              onClick={() => downloadPdf(attachment)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {/* PDF Icon */}
                              <div className="flex-shrink-0 w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                </svg>
                              </div>

                              {/* File Info */}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {attachment.filename}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Klik untuk download PDF
                                </p>
                              </div>

                              {/* Download Icon */}
                              <div className="flex-shrink-0">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    message.content
                  )}
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  className="bot-message"
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    color: '#333',
                    padding: '14px 18px',
                    borderRadius: '20px 20px 20px 4px',
                    maxWidth: '85%',
                    alignSelf: 'flex-start',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                    <span className="text-sm text-gray-500">Mengetik...</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSubmit}
              className="chat-input"
              style={{
                display: 'flex',
                borderTop: '1px solid rgba(0, 0, 0, 0.1)',
                padding: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                gap: '12px'
              }}
            >
              <input
                type="text"
                id="chat-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ketik pertanyaan Anda..."
                disabled={isLoading}
                className="flex-1 p-4 rounded-xl border border-gray-200 outline-none text-gray-800 placeholder-gray-400 text-base focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                style={{
                  backgroundColor: 'rgba(248, 250, 252, 1)'
                }}
              />
              <motion.button
                type="submit"
                id="send-btn"
                disabled={isLoading || !inputValue.trim()}
                className="px-6 py-4 rounded-xl text-white font-medium text-base disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, rgba(30, 144, 255, 1), rgba(0, 100, 200, 1))',
                  boxShadow: '0 4px 12px rgba(30, 144, 255, 0.3)'
                }}
                whileHover={!isLoading && inputValue.trim() ? {
                  scale: 1.02,
                  boxShadow: '0 6px 16px rgba(30, 144, 255, 0.4)'
                } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
              >
                Kirim
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Additional styles */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        .chat-body::-webkit-scrollbar {
          width: 6px;
        }

        .chat-body::-webkit-scrollbar-track {
          background: transparent;
        }

        .chat-body::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 3px;
        }

        .chat-body::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }

        /* Hide chat icon when chat is open on mobile */
        @media (max-width: 639px) {
          .chat-window.glassmorphism + #chat-toggle,
          #chat-toggle:has(+ .chat-window) {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Chatbot;