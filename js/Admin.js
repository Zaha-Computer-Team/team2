 class AdminSystem {
    constructor() {
        this.isAdmin = localStorage.getItem('isAdmin') === 'true';
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        this.apiBaseUrl = window.location.origin;
        this.init();
    }

    init() {
        this.injectStyles();
        this.createAdminButton();
        this.createAdminPanel();
        this.setupEventListeners();
        this.checkAdminStatus();
        console.log('✅ Admin System Initialized');
    }

    // ==================== STYLES ====================
    injectStyles() {
        const styles = `
            /* Admin System Styles - Glassy Blue Theme */
            :root {
                --primary-blue: #1e40af;
                --secondary-blue: #3b82f6;
                --accent-blue: #60a5fa;
                --glass-bg: rgba(255, 255, 255, 0.1);
                --glass-border: rgba(255, 255, 255, 0.2);
                --glass-shadow: rgba(0, 0, 0, 0.1);
                --text-dark: #1f2937;
                --text-light: #f8fafc;
                --success: #10b981;
                --warning: #f59e0b;
                --danger: #ef4444;
            }

#adminPanelToggle {
        position: fixed;
        bottom: 20px;
        right: 900px;
        z-index: 10000;
        padding: 8px 12px;
        background: rgba(30, 64, 175, 0.1);
        color: #6b7280;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
        font-family: 'Livvic', sans-serif;
        backdrop-filter: blur(20px);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 6px;
        opacity: 0.3;
    }

    #adminPanelToggle:hover {
        opacity: 1;
        background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
        color: var(--text-light);
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
    }

            #adminPanelToggle.admin-visible {
                opacity: 0.7;
                background: rgba(30, 64, 175, 0.2);
                color: var(--primary-blue);
            }

            #adminPanelToggle.admin-logged-in {
                opacity: 0.9;
                background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
                color: var(--text-light);
                animation: pulse 2s infinite;
            }

            /* Secret activation area */
            .secret-admin-activator {
                position: fixed;
                top: 0;
                left: 0;
                width: 20px;
                height: 20px;
                z-index: 10001;
                cursor: pointer;
                background: transparent;
            }

            .admin-overlay {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(10px);
                z-index: 9998;
                animation: fadeIn 0.3s ease;
            }

            .admin-panel {
                display: none;
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 90%;
                max-width: 1000px;
                max-height: 90vh;
                background: var(--glass-bg);
                backdrop-filter: blur(20px);
                border: 1px solid var(--glass-border);
                border-radius: 20px;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
                z-index: 9999;
                overflow: hidden;
                animation: slideDown 0.4s ease;
            }

            .admin-header {
                background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
                color: var(--text-light);
                padding: 25px 30px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid var(--glass-border);
            }

            .admin-header h3 {
                margin: 0;
                font-size: 1.6rem;
                font-weight: 600;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            }

            .close-admin {
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: var(--text-light);
                font-size: 20px;
                cursor: pointer;
                padding: 8px;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
            }

            .close-admin:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: rotate(90deg);
            }

            .admin-content {
                padding: 30px;
                max-height: calc(90vh - 100px);
                overflow-y: auto;
                background: rgba(255, 255, 255, 0.05);
            }

            /* Login Section */
            .login-section {
                text-align: center;
                padding: 20px;
            }

            .login-section h4 {
                color: var(--text-light);
                margin-bottom: 25px;
                font-size: 1.4rem;
                font-weight: 600;
            }

            .form-group {
                margin-bottom: 20px;
                text-align: left;
            }

            .form-group label {
                display: block;
                margin-bottom: 8px;
                color: var(--text-light);
                font-weight: 500;
                font-size: 0.95rem;
            }

            .form-control {
                width: 100%;
                padding: 14px 16px;
                background: rgba(255, 255, 255, 0.9);
                border: 2px solid var(--glass-border);
                border-radius: 10px;
                color: var(--text-dark);
                font-size: 15px;
                transition: all 0.3s ease;
                font-family: 'Livvic', sans-serif;
                backdrop-filter: blur(10px);
            }

            .form-control:focus {
                outline: none;
                background: white;
                border-color: var(--accent-blue);
                box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.3);
                transform: translateY(-2px);
            }

            .btn {
                padding: 14px 28px;
                border: none;
                border-radius: 10px;
                font-size: 15px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                font-family: 'Livvic', sans-serif;
                display: inline-flex;
                align-items: center;
                gap: 10px;
                backdrop-filter: blur(10px);
                border: 1px solid var(--glass-border);
            }

            .btn-primary {
                background: linear-gradient(135deg, var(--secondary-blue), var(--primary-blue));
                color: var(--text-light);
                box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
            }

            .btn-primary:hover {
                transform: translateY(-3px);
                box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
            }

            .btn-success {
                background: linear-gradient(135deg, var(--success), #059669);
                color: var(--text-light);
                box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
            }

            .btn-info {
                background: linear-gradient(135deg, var(--accent-blue), var(--secondary-blue));
                color: var(--text-light);
                box-shadow: 0 4px 15px rgba(96, 165, 250, 0.3);
            }

            .btn-danger {
                background: linear-gradient(135deg, var(--danger), #dc2626);
                color: var(--text-light);
                box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
            }

            .btn-secondary {
                background: rgba(255, 255, 255, 0.1);
                color: var(--text-light);
                border: 1px solid var(--glass-border);
            }

            .btn-secondary:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: translateY(-2px);
            }

            /* Admin Content */
            .admin-welcome {
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
                padding: 25px;
                border-radius: 15px;
                margin-bottom: 30px;
                text-align: center;
                border: 1px solid var(--glass-border);
                backdrop-filter: blur(10px);
            }

            .admin-welcome h4 {
                color: var(--text-light);
                margin: 0 0 10px 0;
                font-size: 1.3rem;
            }

            .admin-welcome p {
                color: rgba(255, 255, 255, 0.8);
                margin: 0;
            }

            .admin-actions {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin-bottom: 30px;
            }

            .admin-section {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 15px;
                padding: 25px;
                margin-bottom: 25px;
                border: 1px solid var(--glass-border);
                backdrop-filter: blur(10px);
                border-left: 4px solid var(--accent-blue);
            }

            .admin-section h4 {
                color: var(--text-light);
                margin-bottom: 20px;
                font-size: 1.3rem;
                font-weight: 600;
            }

            /* Stats Grid */
            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }

            .stat-card {
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
                border-radius: 15px;
                padding: 25px;
                text-align: center;
                border: 1px solid var(--glass-border);
                backdrop-filter: blur(10px);
                transition: all 0.3s ease;
            }

            .stat-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            }

            .stat-number {
                font-size: 2.5rem;
                font-weight: 700;
                color: var(--accent-blue);
                margin-bottom: 8px;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            }

            .stat-label {
                color: rgba(255, 255, 255, 0.8);
                font-size: 0.95rem;
                font-weight: 500;
            }

            /* Registrations List */
            .registrations-list {
                max-height: 400px;
                overflow-y: auto;
            }

            .registration-item {
                background: rgba(255, 255, 255, 0.9);
                border: 1px solid var(--glass-border);
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 15px;
                transition: all 0.3s ease;
                border-left: 4px solid var(--secondary-blue);
            }

            .registration-item:hover {
                transform: translateX(8px);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            }

            .registration-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 12px;
            }

            .registration-name {
                font-weight: 600;
                color: var(--primary-blue);
                font-size: 1.1rem;
            }

            .registration-date {
                color: #6c757d;
                font-size: 0.9rem;
            }

            .registration-details {
                color: #555;
                line-height: 1.6;
            }

            .registration-details span {
                display: block;
                margin-bottom: 6px;
            }

            /* Content Editor */
            .content-editor {
                display: grid;
                gap: 20px;
            }

            .editor-group {
                background: rgba(255, 255, 255, 0.9);
                border: 1px solid var(--glass-border);
                border-radius: 12px;
                padding: 20px;
            }

            .editor-group label {
                display: block;
                margin-bottom: 10px;
                color: var(--text-dark);
                font-weight: 600;
            }

            .editor-group textarea {
                min-height: 120px;
                resize: vertical;
            }

            .editor-actions {
                display: flex;
                gap: 12px;
                justify-content: flex-end;
                margin-top: 25px;
            }

            /* Loading & Messages */
            .loading {
                display: inline-block;
                width: 20px;
                height: 20px;
                border: 3px solid rgba(255, 255, 255, 0.3);
                border-top: 3px solid var(--accent-blue);
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }

            .loading-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.95);
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 15px;
                z-index: 10;
            }

            .loading-text {
                display: flex;
                align-items: center;
                gap: 12px;
                font-weight: 600;
                color: var(--primary-blue);
            }

            .message {
                padding: 14px 18px;
                border-radius: 10px;
                margin: 12px 0;
                font-weight: 500;
                border: 1px solid;
                backdrop-filter: blur(10px);
            }

            .message-success {
                background: rgba(16, 185, 129, 0.1);
                color: var(--success);
                border-color: rgba(16, 185, 129, 0.3);
            }

            .message-error {
                background: rgba(239, 68, 68, 0.1);
                color: var(--danger);
                border-color: rgba(239, 68, 68, 0.3);
            }

            .message-warning {
                background: rgba(245, 158, 11, 0.1);
                color: var(--warning);
                border-color: rgba(245, 158, 11, 0.3);
            }

            /* Animations */
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes slideDown {
                from { 
                    opacity: 0;
                    transform: translate(-50%, -55%);
                }
                to { 
                    opacity: 1;
                    transform: translate(-50%, -50%);
                }
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }

            /* Scrollbar Styling */
            .admin-content::-webkit-scrollbar,
            .registrations-list::-webkit-scrollbar {
                width: 8px;
            }

            .admin-content::-webkit-scrollbar-track,
            .registrations-list::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 4px;
            }

            .admin-content::-webkit-scrollbar-thumb,
            .registrations-list::-webkit-scrollbar-thumb {
                background: var(--accent-blue);
                border-radius: 4px;
            }

            .admin-content::-webkit-scrollbar-thumb:hover,
            .registrations-list::-webkit-scrollbar-thumb:hover {
                background: var(--secondary-blue);
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                #adminPanelToggle {
                    bottom: 10px;
                    right: 10px;
                    padding: 6px 10px;
                    font-size: 11px;
                }

                .secret-admin-activator {
                    width: 40px;
                    height: 40px;
                }

                .admin-panel {
                    width: 95%;
                    max-height: 95vh;
                }

                .admin-content {
                    padding: 20px;
                }

                .admin-actions {
                    grid-template-columns: 1fr;
                }

                .stats-grid {
                    grid-template-columns: repeat(2, 1fr);
                }

                .admin-header {
                    padding: 20px;
                }

                .admin-header h3 {
                    font-size: 1.3rem;
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    // ==================== DOM ELEMENTS ====================
    createAdminButton() {
        if (document.getElementById('adminPanelToggle')) return;

        // Create secret activation area (top-right corner)
        const secretActivator = document.createElement('div');
        secretActivator.className = 'secret-admin-activator';
        secretActivator.id = 'secretAdminActivator';
        secretActivator.title = 'Secret admin area';
        document.body.appendChild(secretActivator);

        // Create admin button (hidden by default)
        const adminBtn = document.createElement('button');
        adminBtn.id = 'adminPanelToggle';
        adminBtn.innerHTML = `
            <i class="fas fa-cog"></i>
            Admin
        `;
        adminBtn.style.display = 'none'; // Start hidden
        document.body.appendChild(adminBtn);

        // Setup secret activation
        this.setupSecretActivation();
    }

    setupSecretActivation() {
        const activator = document.getElementById('secretAdminActivator');
        const adminBtn = document.getElementById('adminPanelToggle');
        
        let clickCount = 0;
        let lastClickTime = 0;

        activator.addEventListener('click', (e) => {
            const currentTime = new Date().getTime();
            
            // Double click detection (within 500ms)
            if (currentTime - lastClickTime < 500) {
                clickCount++;
                
                if (clickCount >= 2) { // Triple click to show admin button
                    this.showAdminButtonTemporarily();
                    clickCount = 0;
                }
            } else {
                clickCount = 1;
            }
            
            lastClickTime = currentTime;
        });

        // Right-click on activator to toggle admin button
        activator.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.toggleAdminButtonVisibility();
        });

        // Keyboard shortcut: Ctrl+Alt+A
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.altKey && e.key === 'a') {
                e.preventDefault();
                this.toggleAdminButtonVisibility();
            }
        });
    }

    showAdminButtonTemporarily() {
        const adminBtn = document.getElementById('adminPanelToggle');
        
        // Show the button
        adminBtn.style.display = 'flex';
        adminBtn.classList.add('admin-visible');
        
        // Hide after 5 seconds
        setTimeout(() => {
            if (!this.isAdmin) { // Don't hide if admin is logged in
                adminBtn.style.display = 'none';
                adminBtn.classList.remove('admin-visible');
            }
        }, 5000);
    }

    toggleAdminButtonVisibility() {
        const adminBtn = document.getElementById('adminPanelToggle');
        
        if (adminBtn.style.display === 'none' || adminBtn.style.display === '') {
            adminBtn.style.display = 'flex';
            adminBtn.classList.add('admin-visible');
        } else {
            adminBtn.style.display = 'none';
            adminBtn.classList.remove('admin-visible');
        }
    }

    updateAdminButtonState() {
        const adminBtn = document.getElementById('adminPanelToggle');
        
        if (this.isAdmin) {
            adminBtn.style.display = 'flex';
            adminBtn.classList.add('admin-logged-in');
            adminBtn.classList.remove('admin-visible');
        } else {
            adminBtn.classList.remove('admin-logged-in');
        }
    }

    createAdminPanel() {
        if (document.getElementById('adminPanel')) return;

        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'admin-overlay';
        overlay.id = 'adminOverlay';
        document.body.appendChild(overlay);

        // Create panel
        const panel = document.createElement('div');
        panel.className = 'admin-panel';
        panel.id = 'adminPanel';
        panel.innerHTML = this.getAdminPanelHTML();
        document.body.appendChild(panel);
    }

    getAdminPanelHTML() {
        return `
            <div class="admin-header">
                <h3><i class="fas fa-shield-alt"></i> Zaha Admin Dashboard</h3>
                <button class="close-admin" onclick="adminSystem.closeAdminPanel()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="admin-content">
                <div id="loginSection" class="login-section">
                    <h4><i class="fas fa-lock"></i> Admin Authentication</h4>
                    <div class="form-group">
                        <label for="adminUsername"><i class="fas fa-user"></i> Username</label>
                        <input type="text" id="adminUsername" class="form-control" placeholder="Enter admin username">
                    </div>
                    <div class="form-group">
                        <label for="adminPassword"><i class="fas fa-key"></i> Password</label>
                        <input type="password" id="adminPassword" class="form-control" placeholder="Enter admin password">
                    </div>
                    <button class="btn btn-primary" onclick="adminSystem.handleAdminLogin()">
                        <i class="fas fa-sign-in-alt"></i> Login to Dashboard
                    </button>
                    <div id="loginMessage"></div>
                </div>

                <div id="adminContent" style="display: none;">
                    <div class="admin-welcome">
                        <h4><i class="fas fa-user-shield"></i> Welcome, <span id="adminUserName"></span>!</h4>
                        <p>You have full administrative access to manage Zaha Culture Center</p>
                    </div>

                    <div class="stats-grid" id="adminStats">
                        <div class="stat-card">
                            <div class="stat-number">25</div>
                            <div class="stat-label">Active Teams</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">1000+</div>
                            <div class="stat-label">Students</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">23</div>
                            <div class="stat-label">Years Experience</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">50+</div>
                            <div class="stat-label">Events</div>
                        </div>
                    </div>

                    <div class="admin-actions">
                        <button class="btn btn-success" onclick="adminSystem.loadRegistrations()">
                            <i class="fas fa-users"></i> View Registrations
                        </button>
                        <button class="btn btn-info" onclick="window.location.href = 'js/Admin.html';">
                            <i class="fas fa-edit"></i> Edit Website Content
                        </button>
                        <button class="btn btn-secondary" onclick="adminSystem.loadStats()">
                            <i class="fas fa-sync"></i> Refresh Stats
                        </button>
                        <button class="btn btn-danger" onclick="adminSystem.handleLogout()">
                            <i class="fas fa-sign-out-alt"></i> Logout
                        </button>
                    </div>

                    <div id="registrationsSection" class="admin-section" style="display: none;">
                        <h4><i class="fas fa-list-alt"></i> Team Registration Management</h4>
                        <div id="registrationsList" class="registrations-list"></div>
                    </div>

                    <div id="contentSection" class="admin-section" style="display: none;">
                        <h4><i class="fas fa-edit"></i> Website Content Editor</h4>
                        <div id="contentEditor" class="content-editor">
                            <div class="editor-group">
                                <label for="welcomeTitle"><i class="fas fa-heading"></i> Welcome Title</label>
                                <input type="text" id="welcomeTitle" class="form-control" value="Zaha's Culture Center">
                            </div>
                            
                            <div class="editor-group">
                                <label for="aboutText"><i class="fas fa-file-text"></i> About Text</label>
                                <textarea id="aboutText" class="form-control" rows="4">Zaha Culture Center has been providing exceptional educational and cultural programs for over 23 years. We offer 25+ teams and have taught thousands of students.</textarea>
                            </div>
                            
                            <div class="editor-group">
                                <label for="contactInfo"><i class="fas fa-address-book"></i> Contact Information</label>
                                <textarea id="contactInfo" class="form-control" rows="3">Phone: 06 55 31 577 | Email: info@zaha.gov.jo | Address: Amman, Jordan</textarea>
                            </div>
                            
                            <div class="editor-actions">
                                <button class="btn btn-secondary" onclick="adminSystem.loadContentEditor()">
                                    <i class="fas fa-sync"></i> Reload Content
                                </button>
                                <button class="btn btn-primary" onclick="adminSystem.updateContent()">
                                    <i class="fas fa-save"></i> Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // ==================== EVENT HANDLERS ====================
    setupEventListeners() {
        // Admin button click
        document.getElementById('adminPanelToggle').addEventListener('click', () => this.toggleAdminPanel());

        // Overlay click to close
        document.getElementById('adminOverlay').addEventListener('click', () => this.closeAdminPanel());

        // Enter key in login form
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && document.getElementById('adminPanel').style.display === 'block') {
                if (document.getElementById('loginSection').style.display !== 'none') {
                    this.handleAdminLogin();
                }
            }
        });
    }

    // ==================== ADMIN PANEL FUNCTIONS ====================
    toggleAdminPanel() {
        const panel = document.getElementById('adminPanel');
        const overlay = document.getElementById('adminOverlay');
        
        if (panel.style.display === 'block') {
            this.closeAdminPanel();
        } else {
            panel.style.display = 'block';
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    closeAdminPanel() {
        const panel = document.getElementById('adminPanel');
        const overlay = document.getElementById('adminOverlay');
        
        panel.style.display = 'none';
        overlay.style.display = 'none';
        document.body.style.overflow = '';
        
        // Hide sections
        document.getElementById('registrationsSection').style.display = 'none';
        document.getElementById('contentSection').style.display = 'none';
    }


    
    // ==================== AUTHENTICATION ====================
    async handleAdminLogin() {
    const username = document.getElementById('adminUsername').value.trim();
    const password = document.getElementById('adminPassword').value.trim();
    const messageDiv = document.getElementById('loginMessage');

    if (!username || !password) {
        this.showMessage('Please enter both username and password', 'error', messageDiv);
        return;
    }

    this.showLoading(messageDiv, 'Authenticating...');

    try {
        // Use Google Sheets JSON endpoint (gviz)
        const sheetId = '1_Y3ETDpkkBX_LOBSawAR5WYA3UHFxf8hOm_NQPZfghc';
        const gid = 0; // first sheet
        const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=${gid}`;

        const response = await fetch(url);
        const text = await response.text();

        // Strip the Google callback wrapper
        const json = JSON.parse(text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1));

        const rows = json.table.rows.map(row => ({
            username: row.c[0]?.v,
            password: row.c[1]?.v
        }));

        const adminUser = rows.find(r => r.username === username && r.password === password);

        if (adminUser) {
            this.isAdmin = true;
            this.currentUser = { username: adminUser.username };
            localStorage.setItem('isAdmin', 'true');
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.showAdminContent();
            this.showMessage('Login successful!', 'success', messageDiv);
            this.loadStats();
        } else {
            this.showMessage('Invalid credentials', 'error', messageDiv);
        }

    } catch (error) {
        console.error(error);
        this.showMessage('Failed to connect to Google Sheets', 'error', messageDiv);
    }
}

    handleLogout() {
        this.isAdmin = false;
        this.currentUser = null;
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('adminToken');
        
        document.getElementById('loginSection').style.display = 'block';
        document.getElementById('adminContent').style.display = 'none';
        document.getElementById('adminUsername').value = '';
        document.getElementById('adminPassword').value = '';
        document.getElementById('loginMessage').innerHTML = '';
        
        this.showMessage('Logged out successfully', 'success', document.getElementById('loginMessage'));
        this.closeAdminPanel();
    }

    showAdminContent() {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('adminContent').style.display = 'block';
        document.getElementById('adminUserName').textContent = this.currentUser.username;
    }

    checkAdminStatus() {
        if (this.isAdmin && this.currentUser) {
            this.showAdminContent();
        }
    }


    // ==================== REGISTRATION FUNCTIONS ====================
    async handleRegistration(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const registrationData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            team: formData.get('team')
        };

        const messageDiv = document.getElementById('registrationMessage');
        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = '<div class="loading"></div> Processing...';
        submitBtn.disabled = true;

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData)
            });

            const result = await response.json();
            
            if (result.success) {
                this.showMessage('✅ ' + result.message, 'success', messageDiv);
                event.target.reset();
                
                // Refresh stats if admin is logged in
                if (this.isAdmin) {
                    this.loadStats();
                }
            } else {
                this.showMessage('❌ ' + result.message, 'error', messageDiv);
            }
        } catch (error) {
            this.showMessage('❌ Error submitting registration. Please try again.', 'error', messageDiv);
        } finally {
            // Restore button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    // ==================== CONTENT MANAGEMENT ====================


    // ==================== REGISTRATIONS MANAGEMENT ====================
    async loadRegistrations() {
        const registrationsSection = document.getElementById('registrationsSection');
        const registrationsList = document.getElementById('registrationsList');
        
        this.showLoading(registrationsList, 'Loading registrations...');

        try {
            const response = await fetch('/api/registrations', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('adminToken')
                }
            });
            
            const result = await response.json();
            
            if (result.success) {
                if (result.data && result.data.length > 0) {
                    registrationsList.innerHTML = this.getRegistrationsHTML(result.data);
                } else {
                    registrationsList.innerHTML = '<div class="message message-warning">No registrations found.</div>';
                }
            } else {
                registrationsList.innerHTML = '<div class="message message-error">Error loading registrations</div>';
            }

            registrationsSection.style.display = 'block';
            document.getElementById('contentSection').style.display = 'none';
        } catch (error) {
            registrationsList.innerHTML = '<div class="message message-error">Error loading registrations</div>';
        }
    }

    getRegistrationsHTML(registrations) {
        return registrations.map(reg => `
            <div class="registration-item">
                <div class="registration-header">
                    <span class="registration-name">${reg.name}</span>
                    <span class="registration-date">${new Date(reg.date).toLocaleDateString()}</span>
                </div>
                <div class="registration-details">
                    <span><i class="fas fa-envelope"></i> ${reg.email}</span>
                    <span><i class="fas fa-phone"></i> ${reg.phone}</span>
                    <span><i class="fas fa-users"></i> ${this.formatTeamName(reg.team)}</span>
                    <span><i class="fas fa-circle" style="color: ${reg.status === 'approved' ? '#28a745' : reg.status === 'rejected' ? '#dc3545' : '#ffc107'}"></i> 
                    Status: ${reg.status}</span>
                </div>
            </div>
        `).join('');
    }

    formatTeamName(team) {
        const teamNames = {
            'programming': 'Programming Team',
            'taekwondo': 'Taekwondo',
            'theater': 'Theater',
            'photography': 'Photography',
            'guitar': 'Guitar',
            'chess': 'Chess',
            'ballet': 'Ballet',
            'zumba': 'Zumba',
            'dabke': 'Dabke'
        };
        return teamNames[team] || team;
    }

    // ==================== STATISTICS ====================
    async loadStats() {
        const statsContainer = document.getElementById('adminStats');
        
        try {
            const response = await fetch('/api/admin/stats', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('adminToken')
                }
            });
            
            const result = await response.json();
            
            if (result.success) {
                statsContainer.innerHTML = this.getStatsHTML(result.data);
            } else {
                statsContainer.innerHTML = '<div class="message message-error">Error loading statistics</div>';
            }
        } catch (error) {
            statsContainer.innerHTML = '<div class="message message-error">Error loading statistics</div>';
        }
    }

    getStatsHTML(stats) {
        return `
            <div class="stat-card">
                <div class="stat-number">${stats.totalRegistrations || 0}</div>
                <div class="stat-label">Total Registrations</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${stats.pendingRegistrations || 0}</div>
                <div class="stat-label">Pending</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${stats.approvedRegistrations || 0}</div>
                <div class="stat-label">Approved</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${stats.totalTeams || 0}</div>
                <div class="stat-label">Active Teams</div>
            </div>
        `;
    }

    // ==================== UTILITY FUNCTIONS ====================
    showMessage(message, type, container) {
        container.innerHTML = `<div class="message message-${type}">${message}</div>`;
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                if (container.innerHTML.includes(message)) {
                    container.innerHTML = '';
                }
            }, 5000);
        }
    }

    showLoading(container, text = 'Loading...') {
        container.innerHTML = `
            <div class="loading-overlay">
                <div class="loading-text">
                    <div class="loading"></div>
                    ${text}
                </div>
            </div>
        `;
    }

    // ==================== INITIALIZATION ====================
    static initialize() {
        if (window.adminSystem) {
            console.warn('Admin System already initialized');
            return window.adminSystem;
        }
        
        window.adminSystem = new AdminSystem();
        return window.adminSystem;
    }
}

// Auto-initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => AdminSystem.initialize());
} else {
    AdminSystem.initialize();
}

// Make it available globally
window.AdminSystem = AdminSystem;


