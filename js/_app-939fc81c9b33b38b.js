(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [888],
    {
        1118: function (e, s, n) {
            (window.__NEXT_P = window.__NEXT_P || []).push([
                "/_app",
                function () {
                    return n(570);
                },
            ]);
        },

        570: function (e, s, n) {
            "use strict";
            n.r(s);
            n.d(s, { default: function () { return App; } });

            var l = n(5893); // JSX runtime
            var r = n(7294); // React
            var i = n(9008); // Next.js Head

            // Preloader
            let Preloader = () =>
                (0, l.jsx)("div", {
                    id: "preloader",
                    className: "preloaded",
                    children: (0, l.jsx)("div", { className: "line" }),
                });
// Settings Component - Fixed Version
let Settings = () => {
    let [isDarkMode, setIsDarkMode] = (0, r.useState)(false);
    let [language, setLanguage] = (0, r.useState)("en");
    let [isOpen, setIsOpen] = (0, r.useState)(false);

    // Load saved preferences
    (0, r.useEffect)(() => {
        const savedDark = localStorage.getItem("darkMode") === "true";
        const savedLang = localStorage.getItem("language") || "en";
        setIsDarkMode(savedDark);
        setLanguage(savedLang);
    }, []);

    // Apply preferences
    (0, r.useEffect)(() => {
        document.body.classList.toggle("dark-mode", isDarkMode);
        document.documentElement.lang = language;
       

        localStorage.setItem("darkMode", isDarkMode);
        localStorage.setItem("language", language);
    }, [isDarkMode, language]);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
    };

    const toggleLanguage = () => {
        const newLang = language === "en" ? "ar" : "en";
        setLanguage(newLang);
        
        // Simple page switch - change this based on your routing
        if (newLang === 'ar') {
            window.location.href = '/Ar.html';  // Goes to Arabic page
        } else {
            window.location.href = '/index.html';    // Goes to English page
        }
    };

    const toggleSettings = () => {
        setIsOpen(!isOpen);
    };

    return (0, l.jsxs)("div", {
        className: `settings ${isOpen ? "open" : "close"}`,
        children: [
            (0, l.jsxs)("div", {
                className: "settings-panel",
                children: [
                    (0, l.jsx)("h4", {
                        children: language === "ar" ? "الإعدادات" : "Settings",
                    }),
                    (0, l.jsxs)("div", {
                        className: "setting-item",
                        children: [
                            (0, l.jsx)("span", {
                                children: language === "ar" ? "الوضع الداكن" : "Dark Mode",
                            }),
                            (0, l.jsx)("button", {
                                onClick: toggleDarkMode,
                                children: isDarkMode
                                    ? (language === "ar" ? "إيقاف" : "Disable")
                                    : (language === "ar" ? "تفعيل" : "Enable"),
                            }),
                        ],
                    }),
                    (0, l.jsxs)("div", {
                        className: "setting-item",
                        children: [
                            (0, l.jsx)("span", {
                                children: language === "ar" ? "اللغة" : "Language",
                            }),
                            (0, l.jsx)("button", {
                                onClick: toggleLanguage,
                                children: language === "en" ? "العربية" : "English",
                            }),
                        ],
                    }),
                    (0, l.jsx)("div", {
                        id: "hideSettings",
                        onClick: () => setIsOpen(false),
                        children: "×",
                    }),
                ],
            }),
            (0, l.jsx)("div", {
                id: "showSettings",
                className: `settings-toggle ${isOpen ? "close" : "open"}`,
                onClick: toggleSettings,
                children: (0, l.jsx)("i", { className: "fa fa-cog" }),
            }),
        ],
    });
};
            // Head
            let Head = () =>
                (0, l.jsxs)(i, {
                    children: [
                        (0, l.jsx)("title", { children: "Zaha's Teams Program" }),
                        (0, l.jsx)("meta", { charSet: "utf-8" }),
                        (0, l.jsx)("meta", {
                            name: "viewport",
                            content: "width=device-width, initial-scale=1.0",
                        }),
                        (0, l.jsx)("link", {
                            rel: "preconnect",
                            href: "https://fonts.googleapis.com",
                        }),
                        (0, l.jsx)("link", {
                            rel: "preconnect",
                            href: "https://fonts.gstatic.com",
                            crossOrigin: "",
                        }),
                        (0, l.jsx)("link", {
                            href: "https://fonts.googleapis.com/css2?family=Livvic:wght@100;200;300;400;500;600;700&family=Oswald:wght@400;500;600;700&display=swap",
                            rel: "stylesheet",
                        }),
                        (0, l.jsx)("link", { rel: "stylesheet", href: "css/devicon.min.css" }),
                        (0, l.jsx)("link", { rel: "stylesheet", href: "css/all.min.css" }),
                        (0, l.jsx)("link", { rel: "stylesheet", href: "css/bootstrap.min.css" }),
                        (0, l.jsx)("link", { rel: "stylesheet", href: "css/swiper-bundle.min.css" }),
                        (0, l.jsx)("link", { rel: "stylesheet", href: "css/animate.min.css" }),
                        (0, l.jsx)("link", {
                            rel: "stylesheet",
                            href: "css/jquery.mCustomScrollbar.min.css",
                        }),
                        (0, l.jsx)("link", { rel: "stylesheet", href: "css/style.css" }),
                    ],
                });

            // App
            let App = (props) => {
                let { Component, pageProps } = props;

                return (0, l.jsxs)(r.Fragment, {
                    children: [
                        (0, l.jsx)(Head, {}),
                        (0, l.jsx)(Settings, {}),
                        (0, l.jsx)(Preloader, {}),
                        (0, l.jsx)(Component, { ...pageProps }),
                    ],
                });
            };

            var m = App;
        },

        4744: function () {},

        9008: function (e, s, n) {
            e.exports = n(3121);
        },
    },

    function (e) {
        var s = function (s) {
            return e((e.s = s));
        };
        e.O(0, [774, 179], function () {
            return s(1118), s(880);
        });
        _N_E = e.O();
    },
]);


