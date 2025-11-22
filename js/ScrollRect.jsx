import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// Custom hook for team tooltips
const useTeamTooltips = () => {
  useEffect(() => {
    const bindTooltipsToElements = () => {
      // Create tooltip element
      const tooltip = document.createElement('div');
      tooltip.className = 'team-tooltip';
      tooltip.textContent = 'Ask Zaha\'s Assistant about this team';
      tooltip.style.cssText = `
        position: fixed;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        z-index: 10000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.15s ease;
        max-width: 200px;
        text-align: center;
        display: none;
      `;
      document.body.appendChild(tooltip);

      let isVisible = false;

      const showTooltip = (event) => {
        if (!tooltip) return;
        isVisible = true;
        tooltip.style.display = 'block';
        tooltip.style.opacity = '1';
        moveTooltip(event);
      };

      const moveTooltip = (event) => {
        if (!isVisible || !tooltip) return;
        const x = event.clientX + 15;
        const y = event.clientY + 15;
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
      };

      const hideTooltip = () => {
        if (!tooltip) return;
        isVisible = false;
        tooltip.style.opacity = '0';
        setTimeout(() => {
          if (!isVisible) {
            tooltip.style.display = 'none';
          }
        }, 150);
      };

      // Bind to timeline items
      const timelineItems = document.querySelectorAll('.about .timeline ol li > div');
      timelineItems.forEach((item) => {
        if (item.querySelector('h4')) {
          item.style.cursor = 'pointer';
          
          item.addEventListener('mouseenter', showTooltip);
          item.addEventListener('mousemove', moveTooltip);
          item.addEventListener('mouseleave', hideTooltip);
          
          if (!item.onclick) {
            item.addEventListener('click', (e) => {
              e.preventDefault();
              const teamName = item.querySelector('h4')?.textContent || 'this team';
              window.sendTeamMessage(teamName);
            });
          }
        }
      });

      // Bind to skill items
      const skillItems = document.querySelectorAll('.skills-content div > div, .animated-layer, [class*="skill"]');
      skillItems.forEach((item) => {
        item.style.cursor = 'pointer';
        item.addEventListener('mouseenter', showTooltip);
        item.addEventListener('mousemove', moveTooltip);
        item.addEventListener('mouseleave', hideTooltip);
      });

      return () => {
        tooltip.remove();
        timelineItems.forEach(item => {
          item.removeEventListener('mouseenter', showTooltip);
          item.removeEventListener('mousemove', moveTooltip);
          item.removeEventListener('mouseleave', hideTooltip);
        });
        skillItems.forEach(item => {
          item.removeEventListener('mouseenter', showTooltip);
          item.removeEventListener('mousemove', moveTooltip);
          item.removeEventListener('mouseleave', hideTooltip);
        });
      };
    };

    // Wait for DOM to be ready
    const timeoutId = setTimeout(bindTooltipsToElements, 500);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
};

// Main Chatbot Component
const ZahaAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGeminiReady, setIsGeminiReady] = useState(false);
  
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const genAIRef = useRef(null);
  const modelRef = useRef(null);
  const historyRef = useRef([]);

  // Initialize Gemini
  useEffect(() => {
    const initializeGemini = async () => {
      try {
        const apiKey = "AIzaSyA5B0YlFV8dDfHJLjUwU2nTvCStcw-mij8";
        const modelName = "gemini-1.5-pro";
        
        genAIRef.current = new GoogleGenerativeAI(apiKey);
        modelRef.current = genAIRef.current.getGenerativeModel({
          model: modelName,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1000,
          },
        });
        
        setIsGeminiReady(true);
        console.log('Gemini AI Initialized successfully');
      } catch (error) {
        console.error('Failed to initialize Gemini AI:', error);
        addMessage('عذراً، خدمة الذكاء الاصطناعي غير متاحة حالياً. يرجى المحاولة لاحقاً.', 'assistant');
      }
    };

    initializeGemini();
  }, []);

  // Use the tooltip hook
  useTeamTooltips();

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Adjust textarea height
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  // Add message to chat
  const addMessage = (content, role) => {
    const newMessage = {
      id: Date.now() + Math.random(),
      content,
      role,
      time: new Date().toLocaleTimeString('ar-EG', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setMessages(prev => [...prev, newMessage]);
  };

  // Send message to Gemini
  const sendMessage = async (messageText = inputValue) => {
    const message = messageText.trim();
    if (!message || !modelRef.current) return;

    // Add user message
    addMessage(message, 'user');
    setInputValue('');
    setIsLoading(true);

    // Add to history
    historyRef.current.push({ role: "user", parts: [{ text: message }] });

    try {
      const result = await modelRef.current.generateContent(message);
      const response = await result.response;
      const reply = response.text();
      
      addMessage(reply, 'assistant');
      historyRef.current.push({ role: "model", parts: [{ text: reply }] });
    } catch (error) {
      console.error('Gemini API Error:', error);
      let errorMessage = 'عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.';
      if (error.message.includes('API_KEY') || error.message.includes('401')) {
        errorMessage = 'مفتاح API غير صالح. يرجى التحقق من الإعدادات.';
      } else if (error.message.includes('QUOTA')) {
        errorMessage = 'تم تجاوز الحد المسموح به. يرجى المحاولة لاحقًا.';
      }
      addMessage(errorMessage, 'assistant');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle team message from external calls
  const sendTeamMessage = useCallback((teamName) => {
    const message = `Tell me everything about ${teamName} Team`;
    if (!isOpen) {
      setIsOpen(true);
    }
    setTimeout(() => {
      sendMessage(message);
    }, 500);
  }, [isOpen, sendMessage]);

  // Expose function to window for external calls
  useEffect(() => {
    window.sendTeamMessage = sendTeamMessage;
    return () => {
      delete window.sendTeamMessage;
    };
  }, [sendTeamMessage]);

  // Handle input key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Get current time
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('ar-EG', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      {/* Toggle Button */}
      <button 
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          color: 'white',
          fontSize: '24px',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          zIndex: 1000,
          transition: 'all 0.3s ease'
        }}
      >
        💬
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="chatbot-window"
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            width: '350px',
            height: '500px',
            background: 'white',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
            overflow: 'hidden',
            fontFamily: 'Arial, sans-serif'
          }}
        >
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px' }}>Zaha's Assistant</h3>
              <span style={{ fontSize: '12px', opacity: 0.8 }}>{getCurrentTime()}</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '18px',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </div>

          {/* Messages Container */}
          <div 
            style={{
              flex: 1,
              padding: '15px',
              overflowY: 'auto',
              background: '#f8f9fa'
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: message.role === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: '15px'
                }}
              >
                <div
                  style={{
                    background: message.role === 'user' ? '#667eea' : '#e9ecef',
                    color: message.role === 'user' ? 'white' : '#333',
                    padding: '10px 15px',
                    borderRadius: '18px',
                    maxWidth: '80%',
                    fontSize: '14px',
                    lineHeight: '1.4'
                  }}
                >
                  {message.content}
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    color: '#666',
                    marginTop: '5px',
                    marginLeft: message.role === 'user' ? '0' : '15px',
                    marginRight: message.role === 'user' ? '15px' : '0'
                  }}
                >
                  {message.time}
                </span>
              </div>
            ))}
            {isLoading && (
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: '15px'
              }}>
                <div style={{
                  background: '#e9ecef',
                  color: '#333',
                  padding: '10px 15px',
                  borderRadius: '18px',
                  fontSize: '14px'
                }}>
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{
            padding: '15px',
            borderTop: '1px solid #eee',
            background: 'white'
          }}>
            <div style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-end'
            }}>
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                style={{
                  flex: 1,
                  border: '1px solid #ddd',
                  borderRadius: '20px',
                  padding: '10px 15px',
                  fontSize: '14px',
                  resize: 'none',
                  minHeight: '40px',
                  maxHeight: '120px',
                  fontFamily: 'inherit',
                  outline: 'none',
                  background: isLoading ? '#f8f9fa' : 'white'
                }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={isLoading || !inputValue.trim()}
                style={{
                  background: isLoading || !inputValue.trim() ? '#ccc' : '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  cursor: isLoading || !inputValue.trim() ? 'not-allowed' : 'pointer',
                  fontSize: '16px'
                }}
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .typing-indicator {
          display: flex;
          align-items: center;
          height: 17px;
        }
        .typing-indicator span {
          height: 8px;
          width: 8px;
          background: #666;
          border-radius: 50%;
          display: inline-block;
          margin: 0 2px;
          animation: typing 1s infinite ease-in-out;
        }
        .typing-indicator span:nth-child(1) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(2) { animation-delay: 0.4s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.6s; }
        @keyframes typing {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </>
  );
};

export default ZahaAssistant;