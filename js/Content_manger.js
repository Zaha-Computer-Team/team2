// content-connector.js
// This file connects your HTML to Google Sheets data using the same technique as your Webpack script

// Google Apps Script URL - USE YOUR EXISTING SCRIPT URL
const APP_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxi4Mz7h8Pp_WoVYByRVxl7H9pjBX_lrGFscs3zR6rM2GOnIjs8TyDWbpnV1E0fGVWxBQ/exec';

let sheetData = null;

// Default data structure for Programming Team page
const getDefaultData = () => ({
    // Navigation
    'menu_home': 'Home',
    'menu_description': 'Description', 
    'menu_coach': 'Coach',
    'menu_blog': 'Blog',
    'menu_gallery': 'Gallery',
    
    // Home Section
    'team_name': 'Programming Team',
    
    // Description Section
    'description_title': 'What we do',
    'description_paragraph_1': 'The Programming Team creates the digital magic behind the screens. From building responsive websites to complex algorithms, we ensure everything runs smoothly. We focus on clean code, modern frameworks like React and Angular, and creating seamless user experiences.',
    'description_paragraph_2': 'Join us to learn logic, problem-solving, and the art of turning coffee into code.',
    
    // Coach Section
    'coach_name': 'Jane Doe',
    'coach_title': 'Lead Programming Mentor',
    'coach_image': 'https://placehold.co/150x150/2C5AA0/ffffff?text=Coach',
    'coach_linkedin': '#',
    
    // Blog Section
    'blog_title': 'Latest Updates',
    'blog_post1_title': 'Hackathon 2024',
    'blog_post1_subtitle': '1st Place Victory',
    'blog_post1_image': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'blog_post2_title': 'New Gear',
    'blog_post2_subtitle': 'Lab Upgrades',
    'blog_post2_image': 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'blog_post3_title': 'Python Workshop',
    'blog_post3_subtitle': 'Learning Basics',
    'blog_post3_image': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'blog_post4_title': 'Site Launch',
    'blog_post4_subtitle': 'Project Live',
    'blog_post4_image': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    
    // Gallery Section
    'gallery_title': 'Gallery',
    'gallery_image1': 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'gallery_image2': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'gallery_image3': 'https://images.unsplash.com/photo-1516321497487-e288fb197135?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    
    // Back button
    'back_button': 'Back >'
});

// Fetch data from Google Apps Script
const fetchSheetData = async () => {
    try {
        console.log('📡 Fetching data from Google Sheets...');
        const response = await fetch(APP_SCRIPT_URL);
        const data = await response.json();

        const fetchedData = {};

        if (data.values && Array.isArray(data.values)) {
            data.values.forEach((row, index) => {
                if (row.length >= 2) {
                    const key = row[0] ? row[0].toString().trim() : '';
                    const value = row[1] ? row[1].toString() : '';

                    if (key && !key.includes('ADMIN')) {
                        fetchedData[key] = value;
                    }
                }
            });
        }

        console.log('✅ Data fetched from Apps Script:', fetchedData);
        return fetchedData;

    } catch (error) {
        console.error('❌ Error fetching data from Apps Script:', error);
        return getDefaultData();
    }
};

// Get text from sheet data or default data
const getText = (key) => {
    const currentData = sheetData || getDefaultData();
    return currentData[key] || getDefaultData()[key] || key;
};

// Update DOM with current data
const updateDOM = () => {
    console.log('🔄 Updating DOM with current data...');
    
    // Update navigation
    updateNavigation();
    
    // Update home section
    updateHomeSection();
    
    // Update description section
    updateDescriptionSection();
    
    // Update coach section
    updateCoachSection();
    
    // Update blog section
    updateBlogSection();
    
    // Update gallery section
    updateGallerySection();
    
    // Update back button
    updateBackButton();
};

// Update navigation
const updateNavigation = () => {
    const navItems = document.querySelectorAll('.nav-item');
    const mobileNavItems = document.querySelectorAll('.mobile-menu-list span');
    
    // Desktop navigation
    if (navItems.length >= 5) {
        navItems[0].textContent = getText('menu_home');
        navItems[1].textContent = getText('menu_description');
        navItems[2].textContent = getText('menu_coach');
        navItems[3].textContent = getText('menu_blog');
        navItems[4].textContent = getText('menu_gallery');
    }
    
    // Mobile navigation
    if (mobileNavItems.length >= 5) {
        mobileNavItems[0].textContent = getText('menu_home');
        mobileNavItems[1].textContent = getText('menu_description');
        mobileNavItems[2].textContent = getText('menu_coach');
        mobileNavItems[3].textContent = getText('menu_blog');
        mobileNavItems[4].textContent = getText('menu_gallery');
    }
};

// Update home section
const updateHomeSection = () => {
    const teamTitle = document.querySelector('.intro-title h1');
    if (teamTitle) {
        teamTitle.innerHTML = getText('team_name').replace(' ', '<br>');
    }
};

// Update description section
const updateDescriptionSection = () => {
    const descTitle = document.querySelector('.intro-desc h2');
    const descParagraphs = document.querySelectorAll('.intro-desc p');
    
    if (descTitle) {
        descTitle.textContent = getText('description_title');
    }
    
    if (descParagraphs.length >= 2) {
        descParagraphs[0].textContent = getText('description_paragraph_1');
        descParagraphs[1].textContent = getText('description_paragraph_2');
    }
};

// Update coach section
const updateCoachSection = () => {
    const coachImg = document.querySelector('.coach-profile img');
    const coachName = document.querySelector('.coach-profile h3');
    const coachTitle = document.querySelector('.coach-profile p');
    const coachLink = document.querySelector('.coach-profile .connect-btn');
    
    if (coachImg) {
        coachImg.src = getText('coach_image');
        coachImg.alt = getText('coach_name');
    }
    if (coachName) coachName.textContent = getText('coach_name');
    if (coachTitle) coachTitle.textContent = getText('coach_title');
    if (coachLink) coachLink.href = getText('coach_linkedin');
};

// Update blog section
const updateBlogSection = () => {
    const blogTitle = document.querySelector('.section-blog .section-header');
    const blogCards = document.querySelectorAll('.blog-card');
    
    if (blogTitle) {
        blogTitle.textContent = getText('blog_title');
    }
    
    // Update blog posts
    if (blogCards.length >= 4) {
        // Post 1
        const card1 = blogCards[0];
        const img1 = card1.querySelector('img');
        const title1 = card1.querySelector('.blog-title');
        const subtitle1 = card1.querySelector('.blog-card-overlay span');
        
        if (img1) img1.src = getText('blog_post1_image');
        if (img1) img1.alt = getText('blog_post1_title');
        if (title1) title1.textContent = getText('blog_post1_title');
        if (subtitle1) subtitle1.textContent = getText('blog_post1_subtitle');
        
        // Post 2
        const card2 = blogCards[1];
        const img2 = card2.querySelector('img');
        const title2 = card2.querySelector('.blog-title');
        const subtitle2 = card2.querySelector('.blog-card-overlay span');
        
        if (img2) img2.src = getText('blog_post2_image');
        if (img2) img2.alt = getText('blog_post2_title');
        if (title2) title2.textContent = getText('blog_post2_title');
        if (subtitle2) subtitle2.textContent = getText('blog_post2_subtitle');
        
        // Post 3
        const card3 = blogCards[2];
        const img3 = card3.querySelector('img');
        const title3 = card3.querySelector('.blog-title');
        const subtitle3 = card3.querySelector('.blog-card-overlay span');
        
        if (img3) img3.src = getText('blog_post3_image');
        if (img3) img3.alt = getText('blog_post3_title');
        if (title3) title3.textContent = getText('blog_post3_title');
        if (subtitle3) subtitle3.textContent = getText('blog_post3_subtitle');
        
        // Post 4
        const card4 = blogCards[3];
        const img4 = card4.querySelector('img');
        const title4 = card4.querySelector('.blog-title');
        const subtitle4 = card4.querySelector('.blog-card-overlay span');
        
        if (img4) img4.src = getText('blog_post4_image');
        if (img4) img4.alt = getText('blog_post4_title');
        if (title4) title4.textContent = getText('blog_post4_title');
        if (subtitle4) subtitle4.textContent = getText('blog_post4_subtitle');
    }
};

// Update gallery section
const updateGallerySection = () => {
    const galleryTitle = document.querySelector('.section-photos .section-header');
    const galleryImages = document.querySelectorAll('.photo-item img');
    
    if (galleryTitle) {
        galleryTitle.textContent = getText('gallery_title');
    }
    
    if (galleryImages.length >= 3) {
        galleryImages[0].src = getText('gallery_image1');
        galleryImages[1].src = getText('gallery_image2');
        galleryImages[2].src = getText('gallery_image3');
    }
};

// Update back button
const updateBackButton = () => {
    const backButton = document.querySelector('.back-link-container a');
    if (backButton) {
        backButton.textContent = getText('back_button');
    }
};

// Initialize the content connector
const initializeContentConnector = async () => {
    console.log('🚀 Initializing Content Connector...');
    
    try {
        // Fetch data from Google Sheets
        sheetData = await fetchSheetData();
        
        // Update DOM with fetched data
        updateDOM();
        
        console.log('✅ Content Connector initialized successfully!');
        
        // Make functions globally available
        window.getSheetText = getText;
        window.refreshContent = async () => {
            sheetData = await fetchSheetData();
            updateDOM();
        };
        
    } catch (error) {
        console.error('❌ Error initializing Content Connector:', error);
        // Use default data as fallback
        updateDOM();
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeContentConnector);
} else {
    initializeContentConnector();
}

// Export for global access
window.ContentConnector = {
    getText,
    refreshContent: async () => {
        sheetData = await fetchSheetData();
        updateDOM();
    },
    updateDOM,
    getCurrentData: () => sheetData || getDefaultData()
};

console.log('📝 Content Connector loaded. Use:');
console.log('- ContentConnector.getText("key")');
console.log('- ContentConnector.refreshContent()');
console.log('- ContentConnector.updateDOM()');