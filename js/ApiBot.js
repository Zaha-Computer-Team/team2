// js/chatbot.js
class Chatbot {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.apiKey = '6297e19b-8854-4c7a-9584-e595087ea087';
    this.chatId = 'hftVYa96W-xMkYlO8vgIC';
    this.apiUrl = 'https://www.chatbase.co/api/v1/chat';
    
    this.initializeElements();
    this.bindEvents();
    this.setCurrentTime();
  }

  initializeElements() {
    this.toggleBtn = document.getElementById('chatbot-toggle');
    this.chatWindow = document.getElementById('chatbot-window');
    this.closeBtn = document.getElementById('close-chatbot');
    this.messagesContainer = document.getElementById('chatbot-messages');
    this.input = document.getElementById('chatbot-input');
    this.sendBtn = document.getElementById('send-button');
    this.currentTimeElement = document.getElementById('current-time');
  }

  bindEvents() {
    this.toggleBtn.addEventListener('click', () => this.toggleChat());
    this.closeBtn.addEventListener('click', () => this.closeChat());
    this.sendBtn.addEventListener('click', () => this.sendMessage());
    
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    this.input.addEventListener('input', () => {
      this.adjustTextareaHeight();
    });
  }

  setCurrentTime() {
    const now = new Date();
    if (this.currentTimeElement) {
      this.currentTimeElement.textContent = now.toLocaleTimeString('ar-EG', {
        hour: '2-digit', 
        minute: '2-digit'
      });
    }
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.chatWindow.classList.add('open');
      this.toggleBtn.classList.add('open');
      this.input.focus();
    } else {
      this.chatWindow.classList.remove('open');
      this.toggleBtn.classList.remove('open');
    }
  }

  closeChat() {
    this.isOpen = false;
    this.chatWindow.classList.remove('open');
    this.toggleBtn.classList.remove('open');
  }

  adjustTextareaHeight() {
    this.input.style.height = 'auto';
    this.input.style.height = Math.min(this.input.scrollHeight, 120) + 'px';
  }

  addMessage(content, role) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}-message`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = content;
    
    const messageTime = document.createElement('div');
    messageTime.className = 'message-time';
    messageTime.textContent = new Date().toLocaleTimeString('ar-EG', {
      hour: '2-digit',
      minute: '2-digit'
    });
    
    messageDiv.appendChild(messageContent);
    messageDiv.appendChild(messageTime);
    this.messagesContainer.appendChild(messageDiv);
    
    this.scrollToBottom();
  }

  showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message assistant-message';
    typingDiv.id = 'typing-indicator';
    
    const typingContent = document.createElement('div');
    typingContent.className = 'message-content typing-indicator';
    
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('span');
      typingContent.appendChild(dot);
    }
    
    typingDiv.appendChild(typingContent);
    this.messagesContainer.appendChild(typingDiv);
    this.scrollToBottom();
  }

  hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  scrollToBottom() {
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  async sendMessage() {
    const message = this.input.value.trim();
    if (!message) return;

    // Add user message
    this.addMessage(message, 'user');
    this.input.value = '';
    this.adjustTextareaHeight();
    this.sendBtn.disabled = true;

    // Show typing indicator
    this.showTypingIndicator();

    try {
      const response = await this.callChatbaseAPI(message);
      this.hideTypingIndicator();
      this.addMessage(response, 'assistant');
    } catch (error) {
      console.error('Chatbase API Error:', error);
      this.hideTypingIndicator();
      this.addMessage('عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.', 'assistant');
    } finally {
      this.sendBtn.disabled = false;
      this.input.focus();
    }
  }

  async callChatbaseAPI(message) {
    console.log('Sending request to Chatbase...');

    const requestBody = {
      messages: [
        {
          content: message,
          role: "user"
        }
      ],
      chatbotId: this.chatId,
      stream: false,
      temperature: 0.7
    };

    console.log('Request body:', JSON.stringify(requestBody));

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Success Response:', data);
      return data.text;

    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }

  // NEW METHOD: Handle team message clicks
  sendTeamMessage(teamName) {
    const message = `Tell me everything about ${teamName} Team`;
    
    // Open the chat if it's closed
    if (!this.isOpen) {
      this.toggleChat();
    }
    
    // Set a small timeout to ensure the chat is open before sending
    setTimeout(() => {
      this.input.value = message;
      this.adjustTextareaHeight();
      this.sendMessage();
    }, 300);
  }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing chatbot...');
  window.chatbot = new Chatbot();
  
  // Make sendTeamMessage globally accessible for the team buttons
  window.sendTeamMessage = (teamName) => {
    window.chatbot.sendTeamMessage(teamName);
  };
});