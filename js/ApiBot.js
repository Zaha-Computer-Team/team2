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
    this.tooltip.textContent = 'Ask Zaha\'s Assistant about this team';
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
class Chatbot {
  constructor(options = {}) {
    // UI / state
    this.isOpen = false;
    this.messages = [];

    // Backend (must run separately)
    this.backendUrl = options.backendUrl || "http://localhost:3000/api/gemini";
    this.modelName = options.modelName || "gemini-2.0-flash-exp";

    // Conversation state
    this.conversationHistory = [];
    this.isSending = false;

    // DOM references (initialized in initializeElements)
    this.toggleBtn = null;
    this.chatWindow = null;
    this.closeBtn = null;
    this.messagesContainer = null;
    this.input = null;
    this.sendBtn = null;
    this.currentTimeElement = null;

    // Init
    this.initializeElements();
    this.bindEvents();
    this.setCurrentTime();
    this.timeUpdateInterval = setInterval(() => this.setCurrentTime(), 60000);
  }

  /* ---------------- DOM initialization ---------------- */
  initializeElements() {
    // Attempt to find elements; if not present, create helpful console warnings
    this.toggleBtn = document.getElementById("chatbot-toggle");
    this.chatWindow = document.getElementById("chatbot-window");
    this.closeBtn = document.getElementById("close-chatbot");
    this.messagesContainer = document.getElementById("chatbot-messages");
    this.input = document.getElementById("chatbot-input");
    this.sendBtn = document.getElementById("send-button");
    this.currentTimeElement = document.getElementById("current-time");

    // If some required elements are missing, warn but do NOT throw
    if (!this.messagesContainer) {
      console.warn("Chatbot: #chatbot-messages not found. Messages will not be displayed.");
    }
    if (!this.input) {
      console.warn("Chatbot: #chatbot-input not found. Input will not function.");
    }
    if (!this.sendBtn) {
      console.warn("Chatbot: #send-button not found. Sending via button will not work.");
    }
    if (!this.toggleBtn) {
      console.info("Chatbot: #chatbot-toggle not found. Toggle button not available.");
    }
  }

  /* ---------------- Public helpers ---------------- */
  resetChat() {
    this.conversationHistory = [];
    if (this.messagesContainer) this.messagesContainer.innerHTML = "";
    if (this.input) this.input.value = "";
    this.isSending = false;
    if (this.sendBtn) this.sendBtn.disabled = false;
    this.adjustTextareaHeight();
    if (this.input) this.input.focus();
    console.log("Chat session reset.");
  }

  destroy() {
    clearInterval(this.timeUpdateInterval);
    // Remove listeners if you attached them to external objects (not needed here)
  }

  /* ---------------- Event binding ---------------- */
  bindEvents() {
    // Toggle
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener("click", () => this.toggleChat());
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.closeChat());
    }

    // Send button
    if (this.sendBtn) {
      this.sendBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.sendMessage();
      });
    }

    // Enter to send
    if (this.input) {
      this.input.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          this.sendMessage();
        }
      });

      // Resize textarea
      this.input.addEventListener("input", () => this.adjustTextareaHeight());
    }
  }

  setCurrentTime() {
    const now = new Date();
    if (this.currentTimeElement) {
      this.currentTimeElement.textContent = now.toLocaleTimeString("default", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.chatWindow) {
      this.chatWindow.classList.toggle("open", this.isOpen);
    }
    if (this.toggleBtn) {
      this.toggleBtn.classList.toggle("open", this.isOpen);
      if (this.isOpen && this.input) this.input.focus();
    }
  }

  closeChat() {
    this.isOpen = false;
    if (this.chatWindow) this.chatWindow.classList.remove("open");
    if (this.toggleBtn) this.toggleBtn.classList.remove("open");
  }

  adjustTextareaHeight() {
    if (!this.input) return;
    this.input.style.height = "auto";
    this.input.style.height = Math.min(this.input.scrollHeight, 120) + "px";
  }

  /* ---------------- UI message helpers ---------------- */
  addMessage(content, role = "assistant") {
    // role: 'user' | 'assistant' | 'system'
    if (!this.messagesContainer) {
      console.log(`[${role}] ${content}`);
      return;
    }

    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${role}-message`;

    const messageContent = document.createElement("div");
    messageContent.className = "message-content";
    // Use textContent to avoid XSS
    messageContent.textContent = content;

    const messageTime = document.createElement("div");
    messageTime.className = "message-time";
    messageTime.textContent = new Date().toLocaleTimeString("default", {
      hour: "2-digit",
      minute: "2-digit",
    });

    messageDiv.appendChild(messageContent);
    messageDiv.appendChild(messageTime);
    this.messagesContainer.appendChild(messageDiv);

    this.scrollToBottom();
  }

  showTypingIndicator() {
    this.hideTypingIndicator();
    if (!this.messagesContainer) return;
    const typingDiv = document.createElement("div");
    typingDiv.className = "message assistant-message";
    typingDiv.id = "typing-indicator";

    const typingContent = document.createElement("div");
    typingContent.className = "message-content typing-indicator";

    for (let i = 0; i < 3; i++) {
      typingContent.appendChild(document.createElement("span"));
    }

    typingDiv.appendChild(typingContent);
    this.messagesContainer.appendChild(typingDiv);
    this.scrollToBottom();
  }

  hideTypingIndicator() {
    const typingIndicator = document.getElementById("typing-indicator");
    if (typingIndicator) typingIndicator.remove();
  }

  scrollToBottom() {
    if (!this.messagesContainer) return;
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  /* ---------------- Convenience: send team message ---------------- */
  sendTeamMessage(teamName) {
    if (!teamName) return;
    const msg = `Tell me about the ${teamName} team.`;
    // add to input (if present) then send
    if (this.input) {
      this.input.value = msg;
      this.adjustTextareaHeight();
      this.sendMessage();
    } else {
      // If no input, just call the API directly
      this.sendMessageDirect(msg);
    }
  }

  /* ---------------- Public/simple direct send (skips input UI) ---------------- */
  async sendMessageDirect(messageText) {
    if (!messageText) return;
    try {
      const botReply = await this.callGeminiAPI(messageText);
      this.addMessage(botReply, "assistant");
    } catch (err) {
      console.error("sendMessageDirect error:", err);
      this.addMessage("Error: Could not connect to server.", "assistant");
    }
  }

  /* ---------------- Main sendMessage (from UI) ---------------- */
  async sendMessage() {
    if (!this.input) {
      console.warn("sendMessage called but no input element exists.");
      return;
    }

    const message = this.input.value.trim();
    if (!message) return;

    if (this.isSending) {
      console.warn("Already sending. Dropping duplicate send.");
      return;
    }

    this.isSending = true;
    this.addMessage(message, "user");
    this.input.value = "";
    this.adjustTextareaHeight();
    if (this.sendBtn) this.sendBtn.disabled = true;
    this.showTypingIndicator();

    try {
      const response = await this.callGeminiAPI(message);
      this.hideTypingIndicator();
      this.addMessage(response, "assistant");
    } catch (err) {
      console.error("Gemini API Error:", err);
      this.hideTypingIndicator();
      this.addMessage("Error: Could not connect to server.", "assistant");
    } finally {
      if (this.sendBtn) this.sendBtn.disabled = false;
      this.isSending = false;
      if (this.input) this.input.focus();
    }
  }

  /* ---------------- Core API call (talks to YOUR backend) ---------------- */
  async callGeminiAPI(message) {
    // Append to history in the format we expect
    this.conversationHistory.push({
      role: "user",
      parts: [{ text: message }],
    });

    // Prepare the request body forwarded to Google by your backend
const body = {
  contents: this.conversationHistory,
  generationConfig: { // <--- FIXED KEY
    temperature: 0.8,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 1024,
  },
  safetySettings: [ /* ... */ ],

      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      ],
    };

    // POST to your backend (which should forward to Google with the API key)
    let response;
    try {
      console.log("Posting to backend:", this.backendUrl, body);
      response = await fetch(this.backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (networkErr) {
      console.error("Network error when calling backend:", networkErr);
      throw networkErr;
    }

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error("Backend returned non-OK:", response.status, text);
      throw new Error(`Backend error ${response.status}`);
    }

    // Parse JSON
    let data;
    try {
      data = await response.json();
    } catch (parseErr) {
      console.error("Failed to parse backend JSON:", parseErr);
      throw parseErr;
    }

    // Extract text safely
    const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";

    // Save model reply in conversation history
    this.conversationHistory.push({
      role: "model",
      parts: [{ text: aiText }],
    });

    // Keep history limited
    if (this.conversationHistory.length > 20) {
      this.conversationHistory = this.conversationHistory.slice(-20);
    }

    return aiText;
  }

  /* ---------------- Debug helper: test backend connection from console ---------------- */
  async testConnection() {
    console.log("Chatbot.testConnection: sending a test message to backend...");
    try {
      const res = await fetch(this.backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: "ping" }] }] }),
      });
      console.log("Test connection raw response:", res);
      const json = await res.json().catch(() => null);
      console.log("Test connection parsed JSON:", json);
      return json;
    } catch (err) {
      console.error("Test connection failed:", err);
      throw err;
    }
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