// js/chatbot.js

class TeamTooltip {
  constructor() {
    this.tooltip = null;
    this.isVisible = false;
    this.init();
  }

  init() {
    console.log('Initializing team tooltip...');
    
    // Create tooltip element
    this.tooltip = document.createElement('div');
    this.tooltip.className = 'team-tooltip';
    this.tooltip.textContent = 'Ask Zaha\'s Assistant';
    document.body.appendChild(this.tooltip);

    // Wait a bit then bind events
    setTimeout(() => this.bindTeamButtons(), 100);
  }

// In the bindTeamButtons function, add timeline binding
bindTeamButtons() {
  console.log('Looking for team buttons...');
  
  // Your existing button binding code...
  const selectors = [
    '.skills-content div > div', // Your main container
    '.animated-layer', // Your animation class
    '[class*="skill"]', // Anything with "skill" in class
    '.about div > div > div' // Generic structure
  ];

  let buttons = [];
  
  for (let selector of selectors) {
    const found = document.querySelectorAll(selector);
    console.log(`Selector "${selector}" found: ${found.length} elements`);
    
    if (found.length > 0) {
      buttons = found;
      break;
    }
  }

  console.log(`Total buttons to bind: ${buttons.length}`);

  buttons.forEach((button, index) => {
    console.log(`Binding button ${index + 1}:`, button);
    
    // Your existing button binding logic...
    button.style.cursor = 'pointer';
    
    // Remove any existing listeners
    button.removeEventListener('mouseenter', this.showTooltip);
    button.removeEventListener('mousemove', this.moveTooltip);
    button.removeEventListener('mouseleave', this.hideTooltip);
    
    // Add new listeners
    button.addEventListener('mouseenter', (e) => {
      console.log('Mouse entered button');
      this.showTooltip(e);
    });
    
    button.addEventListener('mousemove', (e) => {
      this.moveTooltip(e);
    });
    
    button.addEventListener('mouseleave', () => {
      console.log('Mouse left button');
      this.hideTooltip();
    });
  });

  // ADD THIS: Bind timeline items
  this.bindTimelineItems();

  // Your existing fallback code...
  if (buttons.length === 0) {
    console.log('No buttons found with selectors, trying manual approach...');
    this.tryManualBinding();
  }
}

// ADD THIS NEW FUNCTION: Bind timeline items to tooltips
bindTimelineItems() {
  const timelineItems = document.querySelectorAll('.about .timeline ol li > div');
  console.log(`Found ${timelineItems.length} timeline items for tooltips`);
  
  timelineItems.forEach((item, index) => {
    if (item.querySelector('h4')) {
      console.log(`Binding timeline item ${index + 1}:`, item);
      
      item.style.cursor = 'pointer';
      
      // Remove any existing listeners
      item.removeEventListener('mouseenter', this.showTooltip);
      item.removeEventListener('mousemove', this.moveTooltip);
      item.removeEventListener('mouseleave', this.hideTooltip);
      
      // Add tooltip listeners
      item.addEventListener('mouseenter', (e) => {
        console.log('Mouse entered timeline item');
        this.showTooltip(e);
      });
      
      item.addEventListener('mousemove', (e) => {
        this.moveTooltip(e);
      });
      
      item.addEventListener('mouseleave', () => {
        console.log('Mouse left timeline item');
        this.hideTooltip();
      });

      // Add click handler for timeline items
      if (!item.onclick) {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          const teamName = item.querySelector('h4')?.textContent || 'this team';
          console.log(`Timeline item clicked: ${teamName}`);
          window.sendTeamMessage(teamName);
        });
      }
    }
  });

    // If still no buttons, try manual binding
    if (buttons.length === 0) {
      console.log('No buttons found with selectors, trying manual approach...');
      this.tryManualBinding();
    }
  }

  tryManualBinding() {
    // Look for elements that might be team buttons
    const allDivs = document.querySelectorAll('div');
    let potentialButtons = [];
    
    allDivs.forEach(div => {
      // Check if div contains an icon and text (like team buttons would)
      const hasIcon = div.querySelector('i, span[class*="fa-"]');
      const hasText = div.textContent && div.textContent.trim().length > 0;
      const isClickable = div.style.cursor === 'pointer' || div.onclick;
      
      if ((hasIcon && hasText) || isClickable) {
        potentialButtons.push(div);
      }
    });
    
    console.log(`Found ${potentialButtons.length} potential buttons manually`);
    this.bindToElements(potentialButtons);
  }

  bindToElements(elements) {
    elements.forEach(element => {
      element.style.cursor = 'pointer';
      
      element.addEventListener('mouseenter', (e) => {
        console.log('Mouse entered potential button');
        this.showTooltip(e);
      });
      
      element.addEventListener('mousemove', (e) => {
        this.moveTooltip(e);
      });
      
      element.addEventListener('mouseleave', () => {
        this.hideTooltip();
      });
    });
  }

  showTooltip(event) {
    if (!this.tooltip) return;
    
    console.log('Showing tooltip');
    this.isVisible = true;
    this.tooltip.style.display = 'block';
    this.tooltip.classList.add('show');
    
    // Position it
    this.moveTooltip(event);
  }

  moveTooltip(event) {
    if (!this.isVisible || !this.tooltip) return;

    const x = event.clientX + 15;
    const y = event.clientY + 15;

    // Basic boundary checking
    const tooltipRect = this.tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let finalX = x;
    let finalY = y;

    if (x + tooltipRect.width > viewportWidth - 10) {
      finalX = event.clientX - tooltipRect.width - 15;
    }

    if (y + tooltipRect.height > viewportHeight - 10) {
      finalY = event.clientY - tooltipRect.height - 15;
    }

    this.tooltip.style.left = finalX + 'px';
    this.tooltip.style.top = finalY + 'px';
  }

  hideTooltip() {
    if (!this.tooltip) return;
    
    console.log('Hiding tooltip');
    this.isVisible = false;
    this.tooltip.classList.remove('show');
    
    // Small delay before hiding completely
    setTimeout(() => {
      if (!this.isVisible) {
        this.tooltip.style.display = 'none';
      }
    }, 150);
  }
}

// Chatbot class (your existing one)
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

    this.addMessage(message, 'user');
    this.input.value = '';
    this.adjustTextareaHeight();
    this.sendBtn.disabled = true;

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
    const requestBody = {
      messages: [{ content: message, role: "user" }],
      chatbotId: this.chatId,
      stream: false,
      temperature: 0.7
    };

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.text;

    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }

  sendTeamMessage(teamName) {
    const message = `Tell me everything about ${teamName} Team`;
    
    if (!this.isOpen) {
      this.toggleChat();
    }
    
    setTimeout(() => {
      this.input.value = message;
      this.adjustTextareaHeight();
      this.sendMessage();
    }, 300);
  }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
  console.log('=== INITIALIZING ZAHA ASSISTANT ===');
  
  // Initialize chatbot
  window.chatbot = new Chatbot();
  console.log('Chatbot initialized');
  
  // Initialize team tooltip
  window.teamTooltip = new TeamTooltip();
  console.log('Team tooltip initialized');
  
  // Global function for team buttons
  window.sendTeamMessage = (teamName) => {
    console.log(`Team message triggered: ${teamName}`);
    window.chatbot.sendTeamMessage(teamName);
  };
  
  console.log('=== ZAHA ASSISTANT READY ===');
});