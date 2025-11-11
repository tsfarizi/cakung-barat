import React, { useState } from 'react';
import chatIcon from '../assets/img/chat-icon.png';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <img 
        src={chatIcon} 
        alt="Chat" 
        id="chat-toggle" 
        className="w-15 h-15 fixed bottom-6 right-6 cursor-pointer z-[999]"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="chat-window" id="chat-window" style={{ display: 'flex', flexDirection: 'column', position: 'fixed', bottom: '90px', right: '25px', width: '320px', background: '#fff', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,.2)', overflow: 'hidden', zIndex: '999' }}>
          <div className="chat-header" style={{ background: 'var(--primary)', color: '#fff', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 className="m-0">Chatbot Cakung Barat</h4>
            <button 
              id="chat-close" 
              className="text-white bg-none border-none text-xl cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
          </div>
          <div className="chat-body" id="chat-body" style={{ height: '300px', overflowY: 'auto', padding: '10px' }}>
            <div className="bot-message" style={{ background: '#e5e5e5', marginBottom: '10px', padding: '8px 10px', borderRadius: '8px', maxWidth: '80%' }}>Halo! Ada yang bisa kami bantu?</div>
          </div>
          <div className="chat-input" style={{ display: 'flex', borderTop: '1px solid #ddd' }}>
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
        </div>
      )}
    </div>
  );
};

export default Chatbot;
