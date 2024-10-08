import React, { useState, useEffect, useRef } from 'react';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');
  const socketRef = useRef<WebSocket | null>(null);

  const sendMessage = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      console.log('Sending message:', input); // Debug log

      // Update sender's UI immediately
      setMessages((prev) => [...prev, `You: ${input}`]);

      socketRef.current.send(input);
      setInput('');
    } else {
      console.error('WebSocket is not open');
    }
  };

  useEffect(() => {
    if (!socketRef.current) {
      const ws = new WebSocket('ws://localhost:5000');
      socketRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket connection established');
      };

      ws.onmessage = (event) => {
        if (event.data instanceof Blob) {
          const reader = new FileReader();
          reader.onload = () => {
            setMessages((prev) => [...prev, `Others: ${reader.result as string}`]);
          };
          reader.readAsText(event.data);
        } else {
          setMessages((prev) => [...prev, `Others: ${event.data}`]);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setTimeout(() => {
          socketRef.current = null;
          // connectWebSocket();
        }, 5000);
      };

      ws.onclose = (event) => {
        if (!event.wasClean) {
          setTimeout(() => {
            socketRef.current = null;
            // connectWebSocket();
          }, 5000);
        }
      };
    }
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="mb-2 h-40 overflow-y-auto bg-gray-700 p-2 rounded">
        {messages.map((msg, index) => (
          <div key={index} className="text-white">{msg}</div>
        ))}
      </div>
      <div className='grid grid-cols-3 gap-2'>
        <div className='col-span-2'> 
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full g p-2 bg-gray-700 text-white rounded"
          />
        </div>
        <button
          onClick={sendMessage}
          className="w-full p-2 text-white rounded bg-gradient-to-r from-pink-500 to-orange-500 hover:opacity-90"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;