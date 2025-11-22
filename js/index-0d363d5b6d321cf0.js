(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [405],
    {
        5557: function (s, e, a) {
            (window.__NEXT_P = window.__NEXT_P || []).push([
                "/",
                function () {
                    return a(7190);
                },
            ]);
        },

        7190: function (s, e, a) {
            "use strict";
            a.r(e), a.d(e, { default: function () { return I; } });

            var i = a(5893);
            var k = a(7294);

            // Google Apps Script URL - REPLACE WITH YOUR DEPLOYED APP SCRIPT URL
            const APP_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxuxbnNS_hne0Ws7m3oFgLwlODu_EKC0MH9jLCu2xLqOgxVh2dqtxmHIhSver9EiOJM7Q/exec';

            let sheetData = null;

            const getDefaultData = () => ({
                'header_email': 'info@zaha.gov.jo',
                    'menu_home': 'Home',
                    'menu_about': 'About',
                    'menu_teams': 'Teams',
                    'menu_contact': 'Contact',
                    'menu_blog': 'Blog',
                    
                    // About Section
                    'about_title_1': "Zhaha's Culture",
                    'about_title_2': "Center",
                    'about_founded': '27 Years Ago',
                    'about_nationality': 'Jordan',
                    'about_open_hours': '9 AM - 8 PM',
                    'about_founder': 'Zaha Jardaneh Mango',
                    'about_address': 'Amman',
                    'about_phone': '06 55 31 577',
                    'about_email': 'info@zaha.gov.jo',
                    'about_name': 'مركز زها',
                    
                    // Teams
                    'teams_title': 'Teams',
                    'team_programming': 'Programming Team',
                    'team_taekwondo': 'Taekwondo',
                    'team_theater': 'Theater',
                    'team_photography': 'Photography',
                    'team_guitar': 'Guitar',
                    'team_chess': 'Chess',
                    'team_ballet': 'Ballet',
                    'team_zumba': 'Zumba',
                    'team_dabke': 'Dabke',
                    'team_orchestra': 'Orchestra',
                    'team_piano': 'Piano',
                    'team_caricature': 'Caricature Drawing',
                    'team_booking': 'Booking',
                    'team_animation': 'Animation',
                    'team_flags': 'Flags',
                    'team_drums': 'Drums',
                    'team_violin_oud': 'Violin and Oud',
                    'team_melodica': 'Melodica',
                    
                    // Poping Teams
                    'poping_teams_title': 'Our Poping Teams',
                    'poping_team_programming': 'Programming Team',
                    'poping_team_ballet': 'Ballet',
                    'poping_team_dabke': 'Dabke',
                    'poping_team_drums': 'Drums',
                    'poping_team_taekwondo': 'Taekwando',
                    
                    // Team durations and coaches
                    'programming_duration': '2021 - Now',
                    'programming_coach': 'Coach : Mays Alkhlil',
                    'ballet_duration': '2018 - Now',
                    'ballet_coach': 'Coach : Nanse Atyeat',
                    'dabke_duration': '2009 - Now',
                    'dabke_coach': 'Coach : Rsan Daees',
                    'drums_duration': '2014 - Now',
                    'drums_coach': 'Coach : Bshar khrees',
                    'taekwondo_duration': '2014 - Now',
                    'taekwondo_coach': 'Coach : -------',
                    
                    // Blog
                    'blog_title': 'Latest Posts',
                    'post1_title': 'The Executive Director of the Zaha Cultural Center, Raneh Sabih, received the General Manager of the King Abdullah II Development Fund',
                    'post1_date': '27 October 2025',
                    'post1_comments': '124 comments',
                    'post2_title': 'A remarkable achievement achieved by our students from the team of the Zaha Cultural Center, Deir Olaa, by obtaining the first place in the Jerusalem and Palestine Football Championship',
                    'post2_date': '22 October 2025',
                    'post2_comments': '34 comments',
                    'post3_title': 'Zaha Cultural Centers launch Zaha Knights teams from the youth As part of its ongoing quest to empower young people and develop their leadership and social skills',
                    'post3_date': '19 October 2025',
                    'post3_comments': '45 comments',
                    
                    // Contact
                    'contact_title': 'Get in touch',
                    'contact_phone': '065 53 15 77',
                    'contact_address': 'Amman, Jordan',
                    'contact_email': 'info@zaha.gov.jo',
                    'contact_follow': 'follow Us',
                    
                    // Copyright
                    'copyright_text': 'مركز زها',
                    'copyright_designed': 'Designed By',
                    'copyright_designer': 'Team Programming',
                    
                    // Facts
                    'facts_experience': '23',
                    'facts_experience_text': 'years of',
                    'facts_experience_span': 'experience',
                    'facts_teams': '25',
                    'facts_teams_text': 'Teams',
                    'facts_students': '1000 <',
                    'facts_students_text': 'Students',
                    'facts_students_span': 'taught',
                    'facts_awards': '13 <',
                    'facts_awards_text': 'awards',
                    'facts_awards_span': 'won',
                    'facts_skills': '679 <',
                    'facts_skills_text': 'learned',
                    'facts_skills_span': 'New Skills',
                    
                    // Home
                    'home_title_1': "Zaha's",
                    'home_title_2': "Teams",
                    'home_title_3': "Program",
                    
                    // Portfolio
                    'portfolio_title': 'Recent Events',
                    'portfolio_zumba_title': 'فريق الزومبا',
                    'portfolio_zumba_event': 'مشاركة فريق الزومبا في مهرجان جرش الثقافي',
                    'portfolio_zumba_team': 'Zumba',
                    'portfolio_zumba_time': '2 months Ago',
                    'portfolio_zumba_location': 'Jarash',
                    'portfolio_dabke_title': 'فريق الدبكة',
                    'portfolio_dabke_event': 'مشاركة فريق الدبكة مركز زها الثقافي في مهرجان جرش',
                    'portfolio_dabke_team': 'Dabkeh',
                    'portfolio_dabke_time': '2 months Ago',
                    'portfolio_dabke_location': 'Jarash',
                    'portfolio_guitar_title': 'فريق جيتار',
                    'portfolio_guitar_event': 'مشاركة فريق جيتار مركز زها الثقافي في مهرجان جرش للثقافة والفنون',
                    'portfolio_guitar_team': 'فريق جيتار',
                    'portfolio_guitar_time': '2 Years Ago',
                    'portfolio_guitar_location': 'Jarash',
                    'portfolio_drums_title': ' فريق درم',
                    'portfolio_drums_event': 'مشاركة فريق زها درم جام في فعاليات مهرجان جرش',
                    'portfolio_drums_team': 'فريق درم',
                    'portfolio_drums_time': '2 Years Ago',
                    'portfolio_drums_location': 'Jarash',
                    'portfolio_preview': 'preview',
                    
                    // Testimonials
                    'testimonial1_quote': '"Being part of the programming team at Zaha Culture Center has been an amazing experience! I\'ve learned how to think logically, solve problems creatively, and work with others to build real projects. The mentors here are super supportive, and every session feels like a step forward in my journey as a future developer."',
                    'testimonial1_person': 'Khalid Alnemat',
                    'testimonial1_team': 'Programming Team',
                    'testimonial2_quote': '"Joining the piano team at Zaha Culture Center has really helped me grow as a musician. I\'ve learned not only how to play better but also how to express myself through music. The teachers are so patient and inspiring, and practicing with other students motivates me to keep improving every week!"',
                    'testimonial2_person': 'Asl Alkhalel',
                    'testimonial2_team': 'Piano Team'
                
            });

            // Fetch data from Google Apps Script
            const fetchSheetData = async () => {
                try {
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

                    console.log('Data fetched from Apps Script:', fetchedData);
                    return fetchedData;

                } catch (error) {
                    console.error('Error fetching data from Apps Script:', error);
                    return getDefaultData();
                }
            };

            const getText = (key) => {
                const currentData = sheetData || getDefaultData();
                return currentData[key] || getDefaultData()[key] || key;
            };


let n = () => (0, i.jsxs)("header", {
    children: [
        (0, i.jsxs)("div", {
            className: "header-inner hide-mobile",
            children: [
                (0, i.jsx)("div", {
                    className: "menu",
                    children: (0, i.jsx)("nav", {
                        children: (0, i.jsxs)("ul", {
                            children: [
                                (0, i.jsx)("li", { children: (0, i.jsx)("span", { className: "active", id: "home-link", children: getText('menu_home') }) }),
                                (0, i.jsx)("li", { children: (0, i.jsx)("span", { id: "about-link", children: getText('menu_about') }) }),
                                (0, i.jsx)("li", { children: (0, i.jsx)("span", { id: "Teams-link", children: getText('menu_teams') }) }),
                                (0, i.jsx)("li", { children: (0, i.jsx)("span", { id: "contact-link", children: getText('menu_contact') }) }),
                                (0, i.jsx)("li", { children: (0, i.jsx)("span", { id: "blog-link", children: getText('menu_blog') }) }),
                            ],
                        }),
                    }),
                }),


(0, i.jsx)("button", {
    className: "profile-photo-btn",
    onClick: () => window.location.href = "https://www.zaha.gov.jo/",
    children: (0, i.jsx)("img", {
        src: "/images/Zaha.jpg",
        alt: "Profile", 
        className: "nav-photo"
    }),
})
            ],
        }),
        
        // Mobile Menu Toggle Button
        (0, i.jsx)("div", {
            id: "menuToggle",
            className: "hide-desktop",
            children: (0, i.jsxs)("div", {
                className: "menu-toggle-inner",
                children: [
                    (0, i.jsx)("span", {}),
                    (0, i.jsx)("span", {}),
                    (0, i.jsx)("span", {}),
                ],
            }),
        }),

        // Mobile Menu Overlay - FIXED POSITIONING
        (0, i.jsxs)("div", {
            className: "mobile-menu",
            children: [
                (0, i.jsx)("div", { 
                    className: "mobile-menu-close",
                    onClick: () => handleMobileMenuClose(),
                    children: "✕" 
                }),
                (0, i.jsxs)("ul", {
                    className: "list-unstyled mobile-menu-list",
                    children: [
                        (0, i.jsx)("li", { 
                            children: (0, i.jsx)("span", { 
                                onClick: () => handleMobileMenuClick('home'),
                                children: getText('menu_home') 
                            }) 
                        }),
                        (0, i.jsx)("li", { 
                            children: (0, i.jsx)("span", { 
                                onClick: () => handleMobileMenuClick('about'),
                                children: getText('menu_about') 
                            }) 
                        }),
                        (0, i.jsx)("li", { 
                            children: (0, i.jsx)("span", { 
                                onClick: () => handleMobileMenuClick('Teams'),
                                children: getText('menu_teams') 
                            }) 
                        }),
                        (0, i.jsx)("li", { 
                            children: (0, i.jsx)("span", { 
                                onClick: () => handleMobileMenuClick('contact'),
                                children: getText('menu_contact') 
                            }) 
                        }),
                        (0, i.jsx)("li", { 
                            children: (0, i.jsx)("span", { 
                                onClick: () => handleMobileMenuClick('blog'),
                                children: getText('menu_blog') 
                            }) 
                        }),
                    ],
                }),
                (0, i.jsx)("div", {
                    className: "mobile-menu-mail",
                    children: (0, i.jsxs)("p", {
                        children: [
                            "Email: ",
                            (0, i.jsx)("span", { children: getText('header_email') }),
                        ],
                    }),
                }),
            ],
        }),
    ],
});

            let l = () => (0, i.jsxs)("div", {
                className: "scroll-progress hide-mobile",
                children: [
                    (0, i.jsx)("div", { className: "progress-line", children: (0, i.jsx)("div", { className: "progress-fill", style: { width: "100%" } }) }),
          
                ],
            });

            let r = () => (0, i.jsxs)("section", {
                className: "about main-section flex-column-mobile",
                id: "about",
                children: [
                    (0, i.jsxs)("div", {
                        className: "info flex-column-mobile",
                        children: [
                            (0, i.jsx)("div", {
                                className: "img-container animated-layer image-animation my-photo-container fadeInUp wow",
                                "data-wow-offset": 200,
                                id: "my-photo",
                                children: (0, i.jsx)("div", {
                                    children: (0, i.jsx)("div", {
                                        children: (0, i.jsx)("img", { className: "my-photo", src: "images/logo.png", alt: "" }),
                                    }),
                                }),
                            }),
                            (0, i.jsxs)("div", {
                                children: [
                                    (0, i.jsxs)("h2", {
                                        children: [
                                            (0, i.jsx)("span", {
                                                children: (0, i.jsx)("span", {
                                                    className: "animated-layer fade-in-up-animation fadeInUp wow",
                                                    children: getText('about_title_1'),
                                                }),
                                            }),
                                            (0, i.jsx)("span", {
                                                children: (0, i.jsx)("span", {
                                                    className: "animated-layer fade-in-up-animation fadeInUp wow",
                                                    children: getText('about_title_2'),
                                                }),
                                            }),
                                        ],
                                    }),

                                    (0, i.jsxs)("div", {
                                        className: "infos",
                                        children: [
                                            (0, i.jsxs)("ul", {
                                                children: [
                                                    (0, i.jsx)("li", {
                                                        children: (0, i.jsx)("span", {
                                                            children: (0, i.jsxs)("span", {
                                                                className: "animated-layer fade-in-up-animation fadeInUp wow",
                                                                children: [
                                                                    (0, i.jsx)("span", { children: "Founded :" }),
                                                                    (0, i.jsx)("span", { children: getText('about_founded') }),
                                                                ],
                                                            }),
                                                        }),
                                                    }),
                                                    (0, i.jsx)("li", {
                                                        children: (0, i.jsx)("span", {
                                                            children: (0, i.jsxs)("span", {
                                                                className: "animated-layer fade-in-up-animation fadeInUp wow",
                                                                children: [
                                                                    (0, i.jsx)("span", { children: "Nationality :" }),
                                                                    (0, i.jsx)("span", { children: getText('about_nationality') }),
                                                                ],
                                                            }),
                                                        }),
                                                    }),
                                                    (0, i.jsx)("li", {
                                                        children: (0, i.jsx)("span", {
                                                            children: (0, i.jsxs)("span", {
                                                                className: "animated-layer fade-in-up-animation fadeInUp wow",
                                                                children: [
                                                                    (0, i.jsx)("span", { children: "Open Hours :" }),
                                                                    (0, i.jsx)("span", { children: getText('about_open_hours') }),
                                                                ],
                                                            }),
                                                        }),
                                                    }),
                                                    (0, i.jsx)("li", {
                                                        children: (0, i.jsx)("span", {
                                                            children: (0, i.jsxs)("span", {
                                                                className: "animated-layer fade-in-up-animation fadeInUp wow",
                                                                children: [
                                                                    (0, i.jsx)("span", { children: "Founder :" }),
                                                                    (0, i.jsx)("span", { children: getText('about_founder') }),
                                                                ],
                                                            }),
                                                        }),
                                                    }),
                                                ],
                                            }),

                                            (0, i.jsxs)("ul", {
                                                children: [
                                                    (0, i.jsx)("li", {
                                                        children: (0, i.jsx)("span", {
                                                            children: (0, i.jsxs)("span", {
                                                                className: "animated-layer fade-in-up-animation fadeInUp wow",
                                                                children: [
                                                                    (0, i.jsx)("span", { children: "Address :" }),
                                                                    (0, i.jsx)("span", { children: getText('about_address') }),
                                                                ],
                                                            }),
                                                        }),
                                                    }),
                                                    (0, i.jsx)("li", {
                                                        children: (0, i.jsx)("span", {
                                                            children: (0, i.jsxs)("span", {
                                                                className: "animated-layer fade-in-up-animation fadeInUp wow",
                                                                children: [
                                                                    (0, i.jsx)("span", { children: "Phone :" }),
                                                                    (0, i.jsx)("span", { children: getText('about_phone') }),
                                                                ],
                                                            }),
                                                        }),
                                                    }),
                                                    (0, i.jsx)("li", {
                                                        children: (0, i.jsx)("span", {
                                                            children: (0, i.jsxs)("span", {
                                                                className: "animated-layer fade-in-up-animation fadeInUp wow",
                                                                children: [
                                                                    (0, i.jsx)("span", { children: "Email :" }),
                                                                    (0, i.jsx)("span", { children: getText('about_email') }),
                                                                ],
                                                            }),
                                                        }),
                                                    }),
                                                    (0, i.jsx)("li", {
                                                        children: (0, i.jsx)("span", {
                                                            children: (0, i.jsxs)("span", {
                                                                className: "animated-layer fade-in-up-animation fadeInUp wow",
                                                                children: [
                                                                    (0, i.jsx)("span", { children: "Name :" }),
                                                                    (0, i.jsx)("span", { children: getText('about_name') }),
                                                                ],
                                                            }),
                                                        }),
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),

                    (0, i.jsxs)("div", {
                        className: "skills flex-column-mobile",
                        id: "Teams",
                        children: [
                            (0, i.jsx)("div", {
                                className: "custom-title",
                                children: (0, i.jsx)("h3", {
                                    children: (0, i.jsx)("span", {
                                        children: (0, i.jsx)("span", {
                                            className: "animated-layer fade-in-left-animation fadeInUp wow",
                                            children: getText('teams_title'),
                                        }),
                                    }),
                                }),
                            }),

                            (0, i.jsxs)("div", {
                                className: "skills-content",
                                children: [
                                    (0, i.jsxs)("div", {
                                        children: [
                                            (0, i.jsxs)("div", {
                                                className: "animated-layer fade-in-down-animation fadeInLeft wow",
                                                onClick: () => sendTeamMessage("Programming"),
                                                style: { cursor: "pointer" },
                                                children: [
                                                    (0, i.jsx)("span", { children: (0, i.jsx)("i", { className: "fa-solid fa-computer" }) }),
                                                    (0, i.jsx)("h4", { children: getText('team_programming') }),
                                                ],
                                            }),

                                            (0, i.jsxs)("div", {
                                                className: "animated-layer fade-in-up-animation fadeInRight wow",
                                                onClick: () => sendTeamMessage("Taekwondo"),
                                                style: { cursor: "pointer" },
                                                children: [
                                                    (0, i.jsx)("span", { children: (0, i.jsx)("i", { className: "fas fa-fist-raised" }) }),
                                                    (0, i.jsx)("h4", { children: getText('team_taekwondo') }),
                                                ],
                                            }),
                                        ],
                                    }),

                                    (0, i.jsxs)("div", {
                                        children: [
                                            (0, i.jsxs)("div", {
                                                className: "animated-layer fade-in-down-animation fadeInLeft wow",
                                                onClick: () => sendTeamMessage("Theater"),
                                                style: { cursor: "pointer" },
                                                children: [
                                                    (0, i.jsx)("span", { children: (0, i.jsx)("i", { className: "fa-solid fa-masks-theater" }) }),
                                                    (0, i.jsx)("h4", { children: getText('team_theater') }),
                                                ],
                                            }),

                                            (0, i.jsxs)("div", {
                                                className: "animated-layer fade-in-up-animation fadeInRight wow",
                                                onClick: () => sendTeamMessage("Photography"),
                                                style: { cursor: "pointer" },
                                                children: [
                                                    (0, i.jsx)("span", { children: (0, i.jsx)("i", { className: "fa-solid fa-record-vinyl" }) }),
                                                    (0, i.jsx)("h4", { children: getText('team_photography') }),
                                                ],
                                            }),
                                        ],
                                    }),

                                    (0, i.jsxs)("div", {
                                        children: [
                                            (0, i.jsxs)("div", {
                                                className: "animated-layer fade-in-down-animation fadeInLeft wow",
                                                onClick: () => sendTeamMessage("Guitar"),
                                                style: { cursor: "pointer" },
                                                children: [
                                                    (0, i.jsx)("span", { children: (0, i.jsx)("i", { className: "fa-solid fa-guitar" }) }),
                                                    (0, i.jsx)("h4", { children: getText('team_guitar') }),
                                                ],
                                            }),

                                            (0, i.jsxs)("div", {
                                                className: "animated-layer fade-in-up-animation fadeInRight wow",
                                                onClick: () => sendTeamMessage("Chess"),
                                                style: { cursor: "pointer" },
                                                children: [
                                                    (0, i.jsx)("span", { children: (0, i.jsx)("i", { className: "fa-solid fa-chess" }) }),
                                                    (0, i.jsx)("h4", { children: getText('team_chess') }),
                                                ],
                                            }),
                                        ],
                                    }),

                                    (0, i.jsxs)("div", {
                                        children: [
                                            (0, i.jsxs)("div", {
                                                className: "animated-layer fade-in-down-animation fadeInLeft wow",
                                                onClick: () => sendTeamMessage("Ballet"),
                                                style: { cursor: "pointer" },
                                                children: [
                                                    (0, i.jsx)("span", { children: (0, i.jsx)("i", { className: "fa-solid fa-person-dress" }) }),
                                                    (0, i.jsx)("h4", { children: getText('team_ballet') }),
                                                ],
                                            }),

                                            (0, i.jsxs)("div", {
                                                className: "animated-layer fade-in-up-animation fadeInRight wow",
                                                onClick: () => sendTeamMessage("Zumba"),
                                                style: { cursor: "pointer" },
                                                children: [
                                                    (0, i.jsx)("span", { children: (0, i.jsx)("i", { className: "fa-solid fa-person-dress" }) }),
                                                    (0, i.jsx)("h4", { children: getText('team_zumba') }),
                                                ],
                                            }),
                                        ],
                                    }),

                                    (0, i.jsxs)("div", {
                                        children: [
                                            (0, i.jsxs)("div", {
                                                className: "animated-layer fade-in-down-animation fadeInLeft wow",
                                                onClick: () => sendTeamMessage("Dabke"),
                                                style: { cursor: "pointer" },
                                                children: [
                                                    (0, i.jsx)("span", { children: (0, i.jsx)("i", { className: "fa-solid fa-person" }) }),
                                                    (0, i.jsx)("h4", { children: getText('team_dabke') }),
                                                ],
                                            }),

                                            (0, i.jsxs)("div", {
                                                className: "animated-layer fade-in-up-animation fadeInRight wow",
                                                onClick: () => sendTeamMessage("Orchestra"),
                                                style: { cursor: "pointer" },
                                                children: [
                                                    (0, i.jsx)("span", { children: (0, i.jsx)("i", { className: "fa-solid fa-microphone-lines" }) }),
                                                    (0, i.jsx)("h4", { children: getText('team_orchestra') }),
                                                ],
                                            }),
                                        ],
                                    }),

                                    (0, i.jsxs)("div", {
                                        children: [
                                            (0, i.jsxs)("div", {
                                                className: "animated-layer fade-in-down-animation fadeInLeft wow",
                                                onClick: () => sendTeamMessage("Piano"),
                                                style: { cursor: "pointer" },
                                                children: [
                                                    (0, i.jsx)("span", { children: (0, i.jsx)("i", { className: "fa-solid fa-music" }) }),
                                                    (0, i.jsx)("h4", { children: getText('team_piano') }),
                                                ],
                                            }),

                                            (0, i.jsxs)("div", {
                                                className: "animated-layer fade-in-up-animation fadeInRight wow",
                                                onClick: () => sendTeamMessage("Caricature Drawing"),
                                                style: { cursor: "pointer" },
                                                children: [
                                                    (0, i.jsx)("span", { children: (0, i.jsx)("i", { className: "fa-solid fa-pencil" }) }),
                                                    (0, i.jsx)("h4", { children: getText('team_caricature') }),
                                                ],
                                            }),
                                        ],
                                    }),

                                    (0, i.jsxs)("div", {
                                        children: [
                                            (0, i.jsxs)("div", {
                                                className: "animated-layer fade-in-down-animation fadeInLeft wow",
                                                onClick: () => sendTeamMessage("Booking"),
                                                style: { cursor: "pointer" },
                                                children: [
                                                    (0, i.jsx)("span", { children: (0, i.jsx)("i", { className: "fa-solid fa-book" }) }),
                                                    (0, i.jsx)("h4", { children: getText('team_booking') }),
                                                ],
                                            }),

                                            (0, i.jsxs)("div", {
                                                className: "animated-layer fade-in-up-animation fadeInRight wow",
                                                onClick: () => sendTeamMessage("Animation"),
                                                style: { cursor: "pointer" },
                                                children: [
                                                    (0, i.jsx)("span", { children: (0, i.jsx)("i", { className: "fa-solid fa-dragon" }) }),
                                                    (0, i.jsx)("h4", { children: getText('team_animation') }),
                                                ],
                                            }),
                                        ],
                                    }),

                                    (0, i.jsxs)("div", {
                                        children: [
                                            (0, i.jsxs)("div", {
                                                className: "animated-layer fade-in-down-animation fadeInLeft wow",
                                                onClick: () => sendTeamMessage("Flags"),
                                                style: { cursor: "pointer" },
                                                children: [
                                                    (0, i.jsx)("span", { children: (0, i.jsx)("i", { className: "fa-solid fa-flag" }) }),
                                                    (0, i.jsx)("h4", { children: getText('team_flags') }),
                                                ],
                                            }),

                                            (0, i.jsxs)("div", {
                                                className: "animated-layer fade-in-up-animation fadeInRight wow",
                                                onClick: () => sendTeamMessage("Drums"),
                                                style: { cursor: "pointer" },
                                                children: [
                                                    (0, i.jsx)("span", { children: (0, i.jsx)("i", { className: "fa-solid fa-drum" }) }),
                                                    (0, i.jsx)("h4", { children: getText('team_drums') }),
                                                ],
                                            }),
                                        ],
                                    }),

                                    (0, i.jsxs)("div", {
                                        children: [
                                            (0, i.jsxs)("div", {
                                                className: "animated-layer fade-in-down-animation fadeInLeft wow",
                                                onClick: () => sendTeamMessage("Violin and Oud"),
                                                style: { cursor: "pointer" },
                                                children: [
                                                    (0, i.jsx)("span", { children: (0, i.jsx)("i", { className: "fa-solid fa-guitar" }) }),
                                                    (0, i.jsx)("h4", { children: getText('team_violin_oud') }),
                                                ],
                                            }),

                                            (0, i.jsxs)("div", {
                                                className: "animated-layer fade-in-up-animation fadeInRight wow",
                                                onClick: () => sendTeamMessage("Melodica"),
                                                style: { cursor: "pointer" },
                                                children: [
                                                    (0, i.jsx)("span", { children: (0, i.jsx)("i", { className: "fa-solid fa-ruler" }) }),
                                                    (0, i.jsx)("h4", { children: getText('team_melodica') }),
                                                ],
                                            }),
                                        ],
                                    }),
                                ],
                            }),






                        ],
                    }),

                    (0, i.jsxs)("div", {
                        className: "resume flex-column-mobile",
                        children: [
                            (0, i.jsx)("div", {
                                className: "custom-title fadeInUp wow",
                                children: (0, i.jsx)("h3", {
                                    children: (0, i.jsx)("span", {
                                        children: (0, i.jsx)("span", {
                                            className: "animated-layer fade-in-left-animation",
                                            children: getText('poping_teams_title'),
                                        }),
                                    }),
                                }),
                            }),

                            (0, i.jsx)("div", {
                                className: "timeline",
                                children: (0, i.jsxs)("ol", {
                                    className: "animated-layer fade-in-animation",
                                    children: [
                                        (0, i.jsx)("li", {
                                            children: (0, i.jsx)("div", {
                                                className: "animated-layer fade-in-down-animation fadeInUp wow",
                                                onClick: () => sendTeamMessage("Programming Team"),
                                                style: { cursor: "pointer" },
                                                children: (0, i.jsxs)("div", {
                                                    className: "",
                                                    children: [
                                                        (0, i.jsx)("h4", { children: getText('poping_team_programming') }),
                                                        (0, i.jsxs)("p", {
                                                            children: [(0, i.jsx)("i", { className: "fa-regular fa-clock" }), (0, i.jsx)("span", { children: getText('programming_duration') })],
                                                        }),
                                                        (0, i.jsxs)("p", {
                                                            children: [(0, i.jsx)("i", { className: "fa-solid fa-head-side-cough" }), (0, i.jsx)("span", { children: getText('programming_coach') })],
                                                        }),
                                                    ],
                                                }),
                                            }),
                                        }),

                                        (0, i.jsx)("li", {
                                            children: (0, i.jsx)("div", {
                                                className: "animated-layer fade-in-up-animation fadeInUp wow",
                                                onClick: () => sendTeamMessage("Ballet"),
                                                style: { cursor: "pointer" },
                                                children: (0, i.jsxs)("div", {
                                                    className: "",
                                                    children: [
                                                        (0, i.jsx)("h4", { children: getText('poping_team_ballet') }),
                                                        (0, i.jsxs)("p", {
                                                            children: [(0, i.jsx)("i", { className: "fa-regular fa-clock" }), (0, i.jsx)("span", { children: getText('ballet_duration') })],
                                                        }),
                                                        (0, i.jsxs)("p", {
                                                            children: [(0, i.jsx)("i", { className: "fa-solid fa-head-side-cough" }), (0, i.jsx)("span", { children: getText('ballet_coach') })],
                                                        }),
                                                    ],
                                                }),
                                            }),
                                        }),

                                        (0, i.jsx)("li", {
                                            children: (0, i.jsx)("div", {
                                                className: "animated-layer fade-in-down-animation fadeInUp wow",
                                                onClick: () => sendTeamMessage("Dabke"),
                                                style: { cursor: "pointer" },
                                                children: (0, i.jsxs)("div", {
                                                    className: "",
                                                    children: [
                                                        (0, i.jsx)("h4", { children: getText('poping_team_dabke') }),
                                                        (0, i.jsxs)("p", {
                                                            children: [(0, i.jsx)("i", { className: "fa-regular fa-clock" }), (0, i.jsx)("span", { children: getText('dabke_duration') })],
                                                        }),
                                                        (0, i.jsxs)("p", {
                                                            children: [(0, i.jsx)("i", { className: "fa-solid fa-head-side-cough" }), (0, i.jsx)("span", { children: getText('dabke_coach') })],
                                                        }),
                                                    ],
                                                }),
                                            }),
                                        }),

                                        (0, i.jsx)("li", {
                                            children: (0, i.jsx)("div", {
                                                className: "animated-layer fade-in-up-animation fadeInUp wow",
                                                onClick: () => sendTeamMessage("Drums"),
                                                style: { cursor: "pointer" },
                                                children: (0, i.jsxs)("div", {
                                                    className: "",
                                                    children: [
                                                        (0, i.jsx)("h4", { children: getText('poping_team_drums') }),
                                                        (0, i.jsxs)("p", {
                                                            children: [(0, i.jsx)("i", { className: "fa-regular fa-clock" }), (0, i.jsx)("span", { children: getText('drums_duration') })],
                                                        }),
                                                        (0, i.jsxs)("p", {
                                                            children: [(0, i.jsx)("i", { className: "fa-solid fa-head-side-cough" }), (0, i.jsx)("span", { children: getText('drums_coach') })],
                                                        }),
                                                    ],
                                                }),
                                            }),
                                        }),

                                        (0, i.jsx)("li", {
                                            children: (0, i.jsx)("div", {
                                                className: "animated-layer fade-in-down-animation fadeInUp wow",
                                                onClick: () => sendTeamMessage("Taekwando"),
                                                style: { cursor: "pointer" },
                                                children: (0, i.jsxs)("div", {
                                                    className: "",
                                                    children: [
                                                        (0, i.jsx)("h4", { children: getText('poping_team_taekwondo') }),
                                                        (0, i.jsxs)("p", {
                                                            children: [(0, i.jsx)("i", { className: "fa-regular fa-clock" }), (0, i.jsx)("span", { children: getText('taekwondo_duration') })],
                                                        }),
                                                        (0, i.jsxs)("p", {
                                                            children: [(0, i.jsx)("i", { className: "fa-solid fa-head-side-cough" }), (0, i.jsx)("span", { children: getText('taekwondo_coach') })],
                                                        }),
                                                    ],
                                                }),
                                            }),
                                        }),

                                        (0, i.jsx)("li", {}),
                                    ],
                                }),
                            }),
                        ],
                    }),

                    (0, i.jsx)("img", { alt: "", className: "separator hide-mobile", src: "assets/separator.png" }),
                ],
            });

            var d = a(1664),
                c = a.n(d);

            let t = () => (0, i.jsxs)("section", {
                className: "blog main-section flex-column-mobile",
                id: "blog",
                children: [
                    (0, i.jsx)("div", {
                        className: "custom-title",
                        children: (0, i.jsx)("h3", {
                            children: (0, i.jsx)("span", {
                                children: (0, i.jsx)("span", {
                                    className: "animated-layer fade-in-left-animation fadeInUp wow",
                                    children: getText('blog_title'),
                                }),
                            }),
                        }),
                    }),

                    (0, i.jsxs)("div", {
                        className: "latestposts flex-column-mobile",
                        children: [
                            (0, i.jsx)("div", {
                                className: "animated-layer fade-in-right-animation fadeInUp wow",
                                children: (0, i.jsx)(c(), {
                                    href: "https://www.facebook.com/zahaculturalcenter/posts/pfbid03J8QfRpgkJ8HNG22GZzCKsezQNbMjVqeuFyq8KDL77izmLCiwH96sC2KcujwmHMVl",
                                    legacyBehavior: !0,
                                    children: (0, i.jsxs)("a", {
                                        children: [
                                            (0, i.jsx)("span", {
                                                className: "img-holder",
                                                children: (0, i.jsx)("img", { src: "images/1post.jpg", alt: "" }),
                                            }),
                                            (0, i.jsxs)("div", {
                                                className: "content",
                                                children: [
                                                    (0, i.jsx)("span", { className: "category", children: "" }),
                                                    (0, i.jsx)("span", { className: "title", children: getText('post1_title') }),
                                                    (0, i.jsx)("p", { children: "" }),
                                                    (0, i.jsxs)("div", {
                                                        className: "meta d-flex align-items-center",
                                                        children: [
                                                            (0, i.jsxs)("div", {
                                                                className: "d-flex align-items-center",
                                                                children: [(0, i.jsx)("i", { className: "fa-regular fa-calendar" }), (0, i.jsx)("span", { children: getText('post1_date') })],
                                                            }),
                                                            (0, i.jsxs)("div", {
                                                                className: "d-flex align-items-center",
                                                                children: [(0, i.jsx)("i", { className: "fa-regular fa-comments" }), (0, i.jsx)("span", { children: getText('post1_comments') })],
                                                            }),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                }),
                            }),

                            (0, i.jsx)("div", {
                                className: "animated-layer fade-in-right-animation fadeInUp wow",
                                children: (0, i.jsx)(c(), {
                                    href: "https://www.facebook.com/zahaculturalcenter/posts/pfbid0pneMDtDg9u5LzxHyPH2yrZzsXdMa7qsmj7e2oxDL62PXrDJTX6eeecsLniaikkeVl",
                                    legacyBehavior: !0,
                                    children: (0, i.jsxs)("a", {
                                        children: [
                                            (0, i.jsx)("span", {
                                                className: "img-holder",
                                                children: (0, i.jsx)("img", { src: "images/post2.jpg", alt: "" }),
                                            }),
                                            (0, i.jsxs)("div", {
                                                className: "content",
                                                children: [
                                                    (0, i.jsx)("span", { className: "category", children: "" }),
                                                    (0, i.jsx)("span", { className: "title", children: getText('post2_title') }),
                                                    (0, i.jsx)("p", { children: "" }),
                                                    (0, i.jsxs)("div", {
                                                        className: "meta d-flex align-items-center",
                                                        children: [
                                                            (0, i.jsxs)("div", {
                                                                className: "d-flex align-items-center",
                                                                children: [(0, i.jsx)("i", { className: "fa-regular fa-calendar" }), (0, i.jsx)("span", { children: getText('post2_date') })],
                                                            }),
                                                            (0, i.jsxs)("div", {
                                                                className: "d-flex align-items-center",
                                                                children: [(0, i.jsx)("i", { className: "fa-regular fa-comments" }), (0, i.jsx)("span", { children: getText('post2_comments') })],
                                                            }),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                }),
                            }),


                            (0, i.jsx)("div", {
                                className: "animated-layer fade-in-right-animation fadeInUp wow",
                                children: (0, i.jsx)(c(), {
                                    href: "https://www.facebook.com/zahaculturalcenter/posts/pfbid0pvHk253u98tn5vCfJEdekkbG12yqGHCYvUQ44cYSiBb3aKfxmkwPSjDNcC1oK68Tl",
                                    legacyBehavior: !0,
                                    children: (0, i.jsxs)("a", {
                                        children: [
                                            (0, i.jsx)("span", {
                                                className: "img-holder",
                                                children: (0, i.jsx)("img", { src: "images/post3.jpg", alt: "" }),
                                            }),
                                            (0, i.jsxs)("div", {
                                                className: "content",
                                                children: [
                                                    (0, i.jsx)("span", { className: "category", children: "" }),
                                                    (0, i.jsx)("span", { className: "title", children: getText('post3_title') }),
                                                    (0, i.jsx)("p", { children: "" }),
                                                    (0, i.jsxs)("div", {
                                                        className: "meta d-flex align-items-center",
                                                        children: [
                                                            (0, i.jsxs)("div", {
                                                                className: "d-flex align-items-center",
                                                                children: [(0, i.jsx)("i", { className: "fa-regular fa-calendar" }), (0, i.jsx)("span", { children: getText('post3_date') })],
                                                            }),
                                                            (0, i.jsxs)("div", {
                                                                className: "d-flex align-items-center",
                                                                children: [(0, i.jsx)("i", { className: "fa-regular fa-comments" }), (0, i.jsx)("span", { children: getText('post3_comments') })],
                                                            }),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                }),
                            }),
                        ],
                    }),
                ],
            });

            var o = a(9360);
            o.ZP.use([o.Gk, o.tl, o.W_, o.xW, o.pt, o.rj, o.gI, o.oM]);

            let h = {
                portfolio: {
                    loop: !0,
                    navigation: { nextEl: ".next-item", prevEl: ".prev-item" },
                    breakpoints: {
                        320: { slidesPerView: 1.2, spaceBetween: 30, navigation: !1 },
                        768: { slidesPerView: "auto", spaceBetween: 0 },
                        1025: { direction: "vertical" },
                    },
                },

                portfolioItems: {
                    slidesPerView: 1,
                    loop: !0,
                    pagination: { el: ".swiper-pagination", clickable: !0, type: "bullets" },
                },

                Teams: {},

                TeamsItem: {
                    slidesPerView: 1,
                    loop: !0,
                    pagination: { el: ".swiper-pagination", clickable: !0, type: "bullets" },
                },
            };

            var m = a(2546);



            let j = () => (0, i.jsxs)("section", {
                className: "contact main-section flex-column-mobile",
                id: "contact",
                children: [
                    (0, i.jsx)("div", {
                        className: "custom-title",
                        children: (0, i.jsx)("h3", {
                            children: (0, i.jsx)("span", {
                                children: (0, i.jsx)("span", {
                                    className: "animated-layer fade-in-left-animation fadeInUp wow",
                                    children: getText('contact_title'),
                                }),
                            }),
                        }),
                    }),

                    (0, i.jsxs)("div", {
                        className: "boxes",
                        children: [
                            (0, i.jsxs)("div", {
                                children: [
                                    (0, i.jsxs)("div", {
                                        className: "animated-layer fade-in-down-animation fadeInUp wow",
                                        children: [(0, i.jsx)("i", { className: "fa fa-phone" }), (0, i.jsxs)("p", { children: [(0, i.jsx)("span", { className: "small-text", children: "phone" }), getText('contact_phone')] })],
                                    }),
                                    (0, i.jsxs)("div", {
                                        className: "animated-layer fade-in-up-animation fadeInUp wow",
                                        children: [(0, i.jsx)("i", { className: "fa fa-location-dot" }), (0, i.jsxs)("p", { children: [(0, i.jsx)("span", { className: "small-text", children: "address" }), getText('contact_address')] })],
                                    }),
                                ],
                            }),

                            (0, i.jsxs)("div", {
                                children: [
                                    (0, i.jsxs)("div", {
                                        className: "animated-layer fade-in-down-animation fadeInUp wow",
                                        children: [(0, i.jsx)("i", { className: "fa fa-envelope" }), (0, i.jsxs)("p", { children: [(0, i.jsx)("span", { className: "small-text", children: "email" }), getText('contact_email')] })],
                                    }),

                                    (0, i.jsxs)("div", {
                                        className: "animated-layer fade-in-up-animation fadeInUp wow",
                                        children: [
                                            (0, i.jsx)("i", { className: "fa fa-share-nodes" }),
                                            (0, i.jsx)("span", { className: "small-text", children: getText('contact_follow') }),
                                            (0, i.jsxs)("ul", {
                                                className: "social",
                                                children: [
                                                    (0, i.jsx)("li", { children: (0, i.jsx)("a", { href: "https://www.instagram.com/zahaculturalcenter/", children: (0, i.jsx)("i", { className: "fa-brands fa-instagram" }) }) }),
                                                    (0, i.jsx)("li", { children: (0, i.jsx)("a", { href: "https://x.com/ZahaCulturalJo", children: (0, i.jsx)("i", { className: "fa-brands fa-twitter" }) }) }),
                                                    (0, i.jsx)("li", { children: (0, i.jsx)("a", { href: "https://www.youtube.com/@zahaculturalcenter", children: (0, i.jsx)("i", { className: "fa-brands fa-youtube" }) }) }),
                                                    (0, i.jsx)("li", { children: (0, i.jsx)("a", { href: "https://www.facebook.com/zahaculturalcenter/", children: (0, i.jsx)("i", { className: "fa-brands fa-facebook" }) }) }),
                                                ],
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),

                    (0, i.jsx)("img", { alt: "", className: "separator hide-mobile", src: "assets/separator.png" }),
                ],
            });

            let p = () => (0, i.jsxs)("section", {
                className: "copyright",
                children: [
                    (0, i.jsx)("img", { alt: "", className: "z-1 hide-mobile", src: "assets/separator-copyright.png" }),
                    (0, i.jsxs)("div", {
                        children: [
                            (0, i.jsxs)("span", { children: ["\xa9 ", new Date().getFullYear(), getText('copyright_text')] }),
                            (0, i.jsxs)("span", { children: [getText('copyright_designed'), " ", (0, i.jsx)("a", { target: "_blank", href: "", children: getText('copyright_designer') })] }),
                            (0, i.jsxs)("ul", {
                                children: [
                                    (0, i.jsx)("li", { children: (0, i.jsx)("a", { href: "https://www.instagram.com/zahaculturalcenter/", children: (0, i.jsx)("i", { className: "fa-brands fa-instagram" }) }) }),
                                    (0, i.jsx)("li", { children: (0, i.jsx)("a", { href: "https://x.com/ZahaCulturalJo", children: (0, i.jsx)("i", { className: "fa-brands fa-twitter" }) }) }),
                                    (0, i.jsx)("li", { children: (0, i.jsx)("a", { href: "https://www.youtube.com/@zahaculturalcenter", children: (0, i.jsx)("i", { className: "fa-brands fa-youtube" }) }) }),
                                    (0, i.jsx)("li", { children: (0, i.jsx)("a", { href: "https://www.facebook.com/zahaculturalcenter/", children: (0, i.jsx)("i", { className: "fa-brands fa-facebook" }) }) }),
                                ],
                            }),
                        ],
                    }),
                ],
            });

            let f = () => (
                (0, i.jsxs)("section", {
                    className: "facts",
                    children: [
                        (0, i.jsxs)("div", {
                            className: "facts-scroll",
                            children: [
                                (0, i.jsx)("div", {
                                    className: "animated-layer fade-in-right-animation fadeInLeft wow",
                                    "data-wow-offset": 200,
                                    children: (0, i.jsx)("div", {
                                        children: (0, i.jsxs)("div", {
                                            children: [
                                                (0, i.jsx)("h3", { children: getText('facts_experience') }),
                                                (0, i.jsxs)("p", { children: [getText('facts_experience_text'), (0, i.jsx)("span", { children: getText('facts_experience_span') })] }),
                                            ],
                                        }),
                                    }),
                                }),
                                (0, i.jsx)("div", {
                                    className: "animated-layer fade-in-right-animation fadeInRight wow",
                                    "data-wow-offset": 200,
                                    children: (0, i.jsx)("div", {
                                        children: (0, i.jsxs)("div", {
                                            children: [
                                                (0, i.jsx)("h3", { children: getText('facts_teams') }),
                                                (0, i.jsxs)("p", { children: [getText('facts_teams_text'), (0, i.jsx)("span", { children: "" })] }),
                                            ],
                                        }),
                                    }),
                                }),
                                (0, i.jsx)("div", {
                                    className: "animated-layer fade-in-right-animation fadeInLeft wow",
                                    "data-wow-offset": 200,
                                    children: (0, i.jsx)("div", {
                                        children: (0, i.jsxs)("div", {
                                            children: [
                                                (0, i.jsx)("h3", { children: getText('facts_students') }),
                                                (0, i.jsxs)("p", { children: [getText('facts_students_text'), (0, i.jsx)("span", { children: getText('facts_students_span') })] }),
                                            ],
                                        }),
                                    }),
                                }),
                                (0, i.jsx)("div", {
                                    className: "animated-layer fade-in-right-animation fadeInRight wow",
                                    "data-wow-offset": 200,
                                    children: (0, i.jsx)("div", {
                                        children: (0, i.jsxs)("div", {
                                            children: [
                                                (0, i.jsx)("h3", { children: getText('facts_awards') }),
                                                (0, i.jsxs)("p", { children: [getText('facts_awards_text'), (0, i.jsx)("span", { children: getText('facts_awards_span') })] }),
                                            ],
                                        }),
                                    }),
                                }),
                                (0, i.jsx)("div", {
                                    className: "animated-layer fade-in-right-animation fadeInLeft wow",
                                    "data-wow-offset": 200,
                                    children: (0, i.jsx)("div", {
                                        children: (0, i.jsxs)("div", {
                                            children: [
                                                (0, i.jsx)("h3", { children: getText('facts_skills') }),
                                                (0, i.jsxs)("p", { children: [getText('facts_skills_text'), (0, i.jsx)("span", { children: getText('facts_skills_span') })] }),
                                            ],
                                        }),
                                    }),
                                }),
                            ],
                        }),
                        (0, i.jsx)("img", {
                            alt: "",
                            className: "z-1 hide-mobile opposite-separator",
                            src: "assets/separator-opposite.png",
                        }),
                    ],
                })
            );


            let g = () => (0, i.jsxs)("section", {
                className: "home image",
                id: "home",
                children: [
                    (0, i.jsx)("div", {
                        children: (0, i.jsx)("div", {
                            className: "position-relative",
                            children: (0, i.jsxs)("h1", {
                                children: [
                                    (0, i.jsx)("span", {
                                        children: (0, i.jsxs)("span", {
                                            className: "animated-layer",
                                            children: [getText('home_title_1'), (0, i.jsx)("span", { children: "." })],
                                        }),
                                    }),
                                    (0, i.jsxs)("span", {
                                        className: "position-relative",
                                        children: [
                                            (0, i.jsx)("span", { className: "animated-layer", children: getText('home_title_2') }),
                                            (0, i.jsx)("span", { className: "intro animated-layer", children: "" }),
                                        ],
                                    }),
                                    (0, i.jsx)("span", { children: (0, i.jsx)("span", { className: "animated-layer", children: getText('home_title_3') }) }),
                                ],
                            }),
                        }),
                    }),

                    (0, i.jsx)("span", { className: "animated-layer animated-btn cta", id: "cta", children: (0, i.jsx)("span", {}) }),
                ],
            });

            let u = () => (0, i.jsxs)("section", {
                className: "portfolio main-section flex-column-mobile",
                id: "portfolio",
                children: [
                    (0, i.jsx)("div", {
                        className: "custom-title",
                        children: (0, i.jsx)("h3", {
                            children: (0, i.jsx)("span", {
                                children: (0, i.jsx)("span", { className: "animated-layer fade-in-left-animation fadeInUp wow", children: getText('portfolio_title') }),
                            }),
                        }),
                    }),

                    (0, i.jsxs)(m.tq, {
                        ...h.portfolio,
                        className: "swiper swiper-portfolio animated-layer fade-in-right-animation fadeInUp wow",
                        "data-wow-offset": 200,
                        children: [
                            (0, i.jsxs)(m.o5, {
                                className: "single-item swiper-slide",
                                children: [
                                    (0, i.jsx)("div", { className: "main-content", children: (0, i.jsx)("div", { className: "videocontainer", children: (0, i.jsx)("iframe", { className: "youtube-video", src: "https://www.youtube.com/embed/LXNbwvKZAhs?enablejsapi=1&version=3&playerapiid=ytplayer", allowFullScreen: "" }) }) }),
                                    (0, i.jsxs)("div", {
                                        className: "details",
                                        children: [
                                            (0, i.jsx)("h4", { children: getText('portfolio_zumba_title') }),
                                            (0, i.jsx)("div", {
                                                children: (0, i.jsxs)("ul", {
                                                    children: [
                                                        (0, i.jsxs)("li", { children: [(0, i.jsxs)("span", { children: [(0, i.jsx)("i", { className: "fa-regular fa-file-lines" }), " Event :"] }), (0, i.jsx)("span", { children: getText('portfolio_zumba_event') })] }),
                                                        (0, i.jsxs)("li", { children: [(0, i.jsxs)("span", { children: [(0, i.jsx)("i", { className: "fa-regular fa-user" }), " Team :"] }), (0, i.jsx)("span", { children: getText('portfolio_zumba_team') })] }),
                                                        (0, i.jsxs)("li", { children: [(0, i.jsxs)("span", { children: [(0, i.jsx)("i", { className: "fa-regular fa-hourglass" }), " Time :"] }), (0, i.jsx)("span", { children: getText('portfolio_zumba_time') })] }),
                                                        (0, i.jsxs)("li", { children: [(0, i.jsxs)("span", { children: [(0, i.jsx)("i", { className: "fa-solid fa-code-branch" }), " Preformed In :"] }), (0, i.jsx)("span", { children: getText('portfolio_zumba_location') })] }),
                                                    ],
                                                }),
                                            }),
                                            (0, i.jsx)("a", { href: "#", target: "_blank", className: "custom-btn", children: (0, i.jsxs)("span", { children: [getText('portfolio_preview'), " ", (0, i.jsx)("i", { className: "fa-solid fa-arrow-up-right-from-square" })] }) }),
                                        ],
                                    }),
                                ],
                            }),

                            (0, i.jsxs)(m.o5, {
                                className: "single-item swiper-slide",
                                children: [
                                    (0, i.jsx)("div", { className: "main-content", children: (0, i.jsx)("div", { className: "videocontainer", children: (0, i.jsx)("iframe", { className: "youtube-video", src: "https://www.youtube.com/embed/OV6R4L2c4RI?enablejsapi=1&version=3&playerapiid=ytplayer", allowFullScreen: "" }) }) }),
                                    (0, i.jsxs)("div", {
                                        className: "details",
                                        children: [
                                            (0, i.jsx)("h4", { children: getText('portfolio_dabke_title') }),
                                            (0, i.jsx)("div", {
                                                children: (0, i.jsxs)("ul", {
                                                    children: [
                                                        (0, i.jsxs)("li", { children: [(0, i.jsxs)("span", { children: [(0, i.jsx)("i", { className: "fa-regular fa-file-lines" }), " Project :"] }), (0, i.jsx)("span", { children: getText('portfolio_dabke_event') })] }),
                                                        (0, i.jsxs)("li", { children: [(0, i.jsxs)("span", { children: [(0, i.jsx)("i", { className: "fa-regular fa-user" }), " Team :"] }), (0, i.jsx)("span", { children: getText('portfolio_dabke_team') })] }),
                                                        (0, i.jsxs)("li", { children: [(0, i.jsxs)("span", { children: [(0, i.jsx)("i", { className: "fa-regular fa-hourglass" }), " Duration :"] }), (0, i.jsx)("span", { children: getText('portfolio_dabke_time') })] }),
                                                        (0, i.jsxs)("li", { children: [(0, i.jsxs)("span", { children: [(0, i.jsx)("i", { className: "fa-solid fa-code-branch" }), " Preformed In :"] }), (0, i.jsx)("span", { children: getText('portfolio_dabke_location') })] }),
                                                    ],
                                                }),
                                            }),
                                            (0, i.jsx)("a", { href: "#", target: "_blank", className: "custom-btn", children: (0, i.jsxs)("span", { children: [getText('portfolio_preview'), " ", (0, i.jsx)("i", { className: "fa-solid fa-arrow-up-right-from-square" })] }) }),
                                        ],
                                    }),
                                ],
                            }),

                            (0, i.jsxs)(m.o5, {
                                className: "single-item swiper-slide",
                                children: [
                                    (0, i.jsx)("div", { className: "main-content", children: (0, i.jsx)("div", { className: "videocontainer", children: (0, i.jsx)("iframe", { className: "youtube-video", src: "https://www.youtube.com/embed/NeJQ0dyYC5M?enablejsapi=1&version=3&playerapiid=ytplayer", allowFullScreen: "" }) }) }),
                                    (0, i.jsxs)("div", {
                                        className: "details",
                                        children: [
                                            (0, i.jsx)("h4", { children: getText('portfolio_guitar_title') }),
                                            (0, i.jsx)("div", {
                                                children: (0, i.jsxs)("ul", {
                                                    children: [
                                                        (0, i.jsxs)("li", { children: [(0, i.jsxs)("span", { children: [(0, i.jsx)("i", { className: "fa-regular fa-file-lines" }), " Project :"] }), (0, i.jsx)("span", { children: getText('portfolio_guitar_event') })] }),
                                                        (0, i.jsxs)("li", { children: [(0, i.jsxs)("span", { children: [(0, i.jsx)("i", { className: "fa-regular fa-user" }), " Team :"] }), (0, i.jsx)("span", { children: getText('portfolio_guitar_team') })] }),
                                                        (0, i.jsxs)("li", { children: [(0, i.jsxs)("span", { children: [(0, i.jsx)("i", { className: "fa-regular fa-hourglass" }), " Time :"] }), (0, i.jsx)("span", { children: getText('portfolio_guitar_time') })] }),
                                                        (0, i.jsxs)("li", { children: [(0, i.jsxs)("span", { children: [(0, i.jsx)("i", { className: "fa-solid fa-code-branch" }), " Preformed In :"] }), (0, i.jsx)("span", { children: getText('portfolio_guitar_location') })] }),
                                                    ],
                                                }),
                                            }),
                                            (0, i.jsx)("a", { href: "#", target: "_blank", className: "custom-btn", children: (0, i.jsxs)("span", { children: [getText('portfolio_preview'), " ", (0, i.jsx)("i", { className: "fa-solid fa-arrow-up-right-from-square" })] }) }),
                                        ],
                                    }),
                                ],
                            }),

                            (0, i.jsxs)(m.o5, {
                                className: "single-item swiper-slide",
                                children: [
                                    (0, i.jsx)("div", {
                                        className: "main-content",
                                        children: (0, i.jsx)("div", { className: "videocontainer", children: (0, i.jsx)("iframe", { className: "youtube-video", src: "https://www.youtube.com/embed/9fMMR3x-MNU?enablejsapi=1&version=3&playerapiid=ytplayer", allowFullScreen: "" }) }),
                                    }),

                                    (0, i.jsxs)("div", {
                                        className: "details",
                                        children: [
                                            (0, i.jsx)("h4", { children: getText('portfolio_drums_title') }),
                                            (0, i.jsx)("div", {
                                                children: (0, i.jsxs)("ul", {
                                                    children: [
                                                        (0, i.jsxs)("li", { children: [(0, i.jsxs)("span", { children: [(0, i.jsx)("i", { className: "fa-regular fa-file-lines" }), " Project :"] }), (0, i.jsx)("span", { children: getText('portfolio_drums_event') })] }),
                                                        (0, i.jsxs)("li", { children: [(0, i.jsxs)("span", { children: [(0, i.jsx)("i", { className: "fa-regular fa-user" }), " Team :"] }), (0, i.jsx)("span", { children: getText('portfolio_drums_team') })] }),
                                                        (0, i.jsxs)("li", { children: [(0, i.jsxs)("span", { children: [(0, i.jsx)("i", { className: "fa-regular fa-hourglass" }), " Time :"] }), (0, i.jsx)("span", { children: getText('portfolio_drums_time') })] }),
                                                        (0, i.jsxs)("li", { children: [(0, i.jsxs)("span", { children: [(0, i.jsx)("i", { className: "fa-solid fa-code-branch" }), " Preformed In :"] }), (0, i.jsx)("span", { children: getText('portfolio_drums_location') })] }),
                                                    ],
                                                }),
                                            }),
                                            (0, i.jsx)("a", { href: "#", target: "_blank", className: "custom-btn", children: (0, i.jsxs)("span", { children: [getText('portfolio_preview'), " ", (0, i.jsx)("i", { className: "fa-solid fa-arrow-up-right-from-square" })] }) }),
                                        ],
                                    }),
                                ],
                            }),

                            (0, i.jsx)("div", { className: "nav-item next-item animated-btn", children: (0, i.jsx)("span", {}) }),
                            (0, i.jsx)("div", { className: "nav-item prev-item animated-btn", children: (0, i.jsx)("span", {}) }),
                        ],
                    }),

                    (0, i.jsx)("img", { alt: "", className: "separator hide-mobile", src: "assets/separator.png" }),
                ],


            });

            let w = () => (0, i.jsxs)("section", {
                className: "testimonials",
                children: [
                    (0, i.jsxs)("div", {
                        className: "testimonials-container flex-column-mobile",
                        children: [
                            (0, i.jsx)("div", {
                                className: "quote-container animated-layer fade-in-right-animation fadeInUp wow",
                                children: (0, i.jsxs)("div", {
                                    children: [
                                        (0, i.jsxs)("p", {
                                            children: [
                                                (0, i.jsx)("span", {
                                                    className: "quote",
                                                    children: getText('testimonial1_quote'),
                                                }),
                                                (0, i.jsx)("span", { className: "person", children: getText('testimonial1_person') }),
                                                (0, i.jsx)("span", { className: "Team", children: getText('testimonial1_team') }),
                                            ],
                                        }),
                                        (0, i.jsx)("img", { src: "images/Arabic.jpeg", alt: "" }),
                                    ],
                                }),
                            }),

                            (0, i.jsx)("div", {
                                className: "quote-container animated-layer fade-in-right-animation fadeInUp wow",
                                children: (0, i.jsxs)("div", {
                                    children: [
                                        (0, i.jsxs)("p", {
                                            children: [
                                                (0, i.jsx)("span", {
                                                    className: "quote",
                                                    children: getText('testimonial2_quote'),
                                                }),
                                                (0, i.jsx)("span", { className: "person", children: getText('testimonial2_person') }),
                                                (0, i.jsx)("span", { className: "Team", children: getText('testimonial2_team') }),
                                            ],
                                        }),
                                        (0, i.jsx)("img", { src: "images/Asl.jpg", alt: "" }),
                                    ],
                                }),
                            }),
                        ],
                    }),

                    (0, i.jsx)("img", { alt: "", className: "z-1 hide-mobile opposite-separator", src: "assets/separator-opposite.png" }),
                ],
            });

            let N = s => {
                let { type: e } = s;
                return (0, i.jsx)("img", { alt: "", className: "separator-mobile-up hide-desktop z-1", src: "assets/separator-mobile-up.png" });
            };

            var v = a(9755),
                b = a.n(v);

            a(450), a(1232);

            let y = () => {
                b()(window).on("load", function () {
                    var s = b()("#preloader");
                    setTimeout(function () { s.addClass("preloaded"); }, 800);

                    b()(window).width() > 1024
                        ? (setTimeout(function () { b()(".header-inner").addClass("animated fadeInDown"); }, 1500),
                            setTimeout(function () { b()(".home>div>div h1 span span").addClass("animated fadeInUp"), b()(".home>div>div .intro").addClass("animated fadeInUp"), b()(".home .cta").addClass("animated fadeInUp"); }, 2200))
                        : (setTimeout(function () { b()(".header-inner").addClass("animated fadeInDown"); }, 1100),
                            setTimeout(function () { b()(".home>div>div h1 span span").addClass("animated fadeInUp"), b()(".home>div>div .intro").addClass("animated fadeInUp"), b()(".home .cta").addClass("animated fadeInUp"); }, 1800));

                    var e = b()(".home").width() - 10,
                        i = e + b()(".about").width() + b()(".facts").width() - 10,
                        n = i + b()(".portfolio").width() + b()(".clients").width() - 10,
                        l = n + b()(".contact").width() + b()(".testimonials").width() - 10,
                        r = l + b()(".blog").width() + b()(".copyright").width() - 10;

                    b()("#wrapper").length && (b()(window).width() > 1024
                        ? b()("#wrapper").mCustomScrollbar({
                            axis: "x",
                            theme: "dark-3",
                            keyboard: { enable: !0, scrollType: "stepless" },
                            advanced: { autoExpandHorizontalScroll: !0 },
                            mouseWheel: { scrollAmount: 400 },
                            callbacks: {
                                whileScrolling: function () {
                                    var s;
                                    s = b()("#wrapper").width() - b()(window).width() / 2 + 270;
                                    b()(".animated-layer").each(function () {
                                        var e = b()(this);
                                        b()(this).offset().left < s &&
                                            (e.hasClass("image-animation")
                                                ? e.addClass("animated")
                                                : e.hasClass("fade-in-up-animation")
                                                    ? e.addClass("animated fadeInUp")
                                                    : e.hasClass("fade-in-animation")
                                                        ? e.addClass("animated fadeIn")
                                                        : e.hasClass("fade-in-down-animation")
                                                            ? e.addClass("animated fadeInDown")
                                                            : e.hasClass("fade-in-right-animation")
                                                                ? e.addClass("animated fadeInRight")
                                                                : e.hasClass("fade-in-left-animation") && e.addClass("animated fadeInLeft"));
                                    });

                                    var left = Math.abs(parseInt(b()(".mCSB_container").css("left")));

                                    left > e && left < i
                                        ? (b()(".menu ul li span").removeClass("active"), b()("#about-link").addClass("active"))
                                        : left > i && left < n
                                            ? (b()(".menu ul li span").removeClass("active"), b()("#Teams-link").addClass("active"))
                                            : left > n && left < l
                                                ? (b()(".menu ul li span").removeClass("active"), b()("#contact-link").addClass("active"))
                                                : left > l && left < r
                                                    ? (b()(".menu ul li span").removeClass("active"), b()("#blog-link").addClass("active"))
                                                    : (b()(".menu ul li span").removeClass("active"), b()("#home-link").addClass("active"));
                                },
                            },
                        })
                        : (window.WOW = a(5541), new WOW.WOW().init()));
                });

                b()(document).ready(function () {
                    /^((?!chrome|android).)*safari/i.test(navigator.userAgent) && b()("body").addClass("body-safari");
                    b()("a[href='#']").on("click", function (s) { s.preventDefault(); });

                    b()("#menu li a").on("click", function (s) {
                        setTimeout(() => {
                            history.replaceState("", document.title, window.location.origin + window.location.pathname + window.location.search);
                        }, 5);
                    });

                    b()(window).width() > 1024 && (b()(".fadeIn").removeClass("fadeIn"), b()(".fadeInUp").removeClass("fadeInUp"), b()(".fadeInDown").removeClass("fadeInDown"), b()(".fadeInRight").removeClass("fadeInRight"), b()(".fadeInLeft").removeClass("fadeInLeft"));

                    b()(".menu ul li span").on("click", function () { setTimeout(function () { b()(this).toggleClass("active"); }, 1600); });

                    b()("#home-link").on("click", function () { b()("#wrapper").mCustomScrollbar("scrollTo", "#home", { scrollInertia: 1500 }); });
                    b()("#about-link").on("click", function () { b()("#wrapper").mCustomScrollbar("scrollTo", "#about", { scrollInertia: 1500 }); });
                    b()("#Teams-link").on("click", function () { b()("#wrapper").mCustomScrollbar("scrollTo", "#Teams", { scrollInertia: 1500 }); });
                    b()("#contact-link").on("click", function () { b()("#wrapper").mCustomScrollbar("scrollTo", "#contact", { scrollInertia: 1500 }); });
                    b()("#blog-link").on("click", function () { b()("#wrapper").mCustomScrollbar("scrollTo", "#blog", { scrollInertia: 1500 }); });

                    b()("#menu li a").on("click", function () { b()("#checkboxmenu").trigger("click"), b()("body").toggleClass("overflow-hidden"); });
                    b()("#menuToggle").on("click", function () { b()("body").toggleClass("overflow-hidden"); });

                    b()("#cta").on("click", function () {
                        b()(window).width() > 1024 ? b()("#wrapper").mCustomScrollbar("scrollTo", "#about", { scrollInertia: 1500 }) : b()("html, body").animate({ scrollTop: b()("#my-photo").offset().top });
                    });
                });
            };

            var k = a(7294);
            let I = () => {
    const [dataVersion, setDataVersion] = (0, k.useState)(0);

    const handleMobileMenuClick = (sectionId) => {
    // Close mobile menu
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Scroll to section
    if (typeof window !== 'undefined' && window.jQuery) {
        const $ = window.jQuery;
        if ($(window).width() > 1024) {
            $("#wrapper").mCustomScrollbar("scrollTo", `#${sectionId}`, { scrollInertia: 1500 });
        } else {
            $("html, body").animate({ scrollTop: $(`#${sectionId}`).offset().top }, 800);
        }
    }
};

// Update your useEffect to include mobile menu functionality
(0, k.useEffect)(() => {
    // Your existing initialization code
    if (typeof y !== 'undefined') y();

    // Fetch data from Apps Script
    fetchSheetData().then(fetchedData => {
        sheetData = fetchedData;
        if (Object.keys(fetchedData).length > 0) {
            setDataVersion(v => v + 1);
        }
    });

    // =========================================================
    // 🎯 MOBILE MENU FUNCTIONALITY
    // =========================================================
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    
    if (menuToggle && mobileMenu) {
        // Toggle mobile menu
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Close mobile menu
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // Close menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('span');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Small delay to show the click effect
                setTimeout(() => {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }, 300);
            });
        });
        
        // Close menu when clicking outside
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
        // =========================================================
        // END OF MOBILE MENU CODE
        // =========================================================

    }, []);


                return (0, i.jsx)(k.Fragment, {
                    children: (0, i.jsxs)("div", {
                        className: "page-content",
                        children: [
                            (0, i.jsx)(n, {}),
                            (0, i.jsx)("div", {
                                id: "wrapper",
                                children: (0, i.jsxs)("main", {
                                    className: "flex-column-mobile",
                                    children: [
                                        (0, i.jsx)(g, {}),
                                        (0, i.jsx)(r, {}),
                                        (0, i.jsx)(N, { type: "down" }),
                                        (0, i.jsx)(f, {}),
                                        (0, i.jsx)(N, { type: "up" }),
                                        (0, i.jsx)(u, {}),
                                        (0, i.jsx)(N, { type: "down" }),
                                        (0, i.jsx)(w, {}),
                                        (0, i.jsx)(N, { type: "up" }),
                                        (0, i.jsx)(j, {}),
                                        (0, i.jsx)(N, { type: "down" }),
                                        (0, i.jsx)(N, { type: "up" }),
                                        (0, i.jsx)(t, {}),
                                        (0, i.jsx)(N, { type: "down" }),
                                        (0, i.jsx)(p, {}),
                                    ],
                                }),
                            }),
                            (0, i.jsx)(l, {}),
                        ],
                    }),
                });
            };

            var C = I;
        },
    },
    function (s) {
        s.O(0, [571, 574, 774, 888, 179], function () { return s(s.s = 5557); }), _N_E = s.O();
    },
]);