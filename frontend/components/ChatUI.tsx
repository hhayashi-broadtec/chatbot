import React, { useState } from 'react';

const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { user: 'You', text: input }]);
      setInput('');
    }
  };

  return (
    <div>
      <div>
        <h2>Chat</h2>
        <div>
          {messages.map((message, index) => (
            <div key={index}>
              <strong>{message.user}:</strong> {message.text}
            </div>
          ))}
        </div>
      </div>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatUI;
