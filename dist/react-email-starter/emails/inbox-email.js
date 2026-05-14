"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InboxEmail = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_email_1 = require("react-email");
const InboxEmail = ({ userName, message }) => {
    const timeSent = new Intl.DateTimeFormat("en-ZA", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Africa/Johannesburg",
    }).format(new Date());
    return ((0, jsx_runtime_1.jsxs)(react_email_1.Html, { lang: "en", dir: "ltr", children: [(0, jsx_runtime_1.jsx)(react_email_1.Head, { children: (0, jsx_runtime_1.jsx)(react_email_1.Font, { fontFamily: "Space Grotesk", fallbackFontFamily: "Arial", webFont: {
                        url: "https://mail.sakhiledumisa.com/space-grotesk.woff2",
                        format: "woff2",
                    }, fontWeight: 400, fontStyle: "normal" }) }), (0, jsx_runtime_1.jsxs)(react_email_1.Preview, { children: ["New message from ", userName] }), (0, jsx_runtime_1.jsx)(react_email_1.Tailwind, { config: {
                    theme: {
                        extend: {
                            fontFamily: {
                                sans: ["'Space Grotesk'", "sans-serif"],
                            },
                        },
                    },
                }, children: (0, jsx_runtime_1.jsx)(react_email_1.Body, { className: "bg-white my-auto mx-auto font-sans", children: (0, jsx_runtime_1.jsxs)(react_email_1.Container, { className: "max-w-[600px] mx-auto p-[40px_20px]", children: [(0, jsx_runtime_1.jsx)(react_email_1.Section, { className: "mb-[32px] text-left", children: (0, jsx_runtime_1.jsx)(react_email_1.Link, { href: "https://sakhiledumisa.com", children: (0, jsx_runtime_1.jsx)(react_email_1.Img, { src: "https://mail.sakhiledumisa.com/logo.png", width: "40", height: "40", alt: "Logo", className: "rounded-lg inline-block" }) }) }), (0, jsx_runtime_1.jsxs)(react_email_1.Section, { children: [(0, jsx_runtime_1.jsxs)(react_email_1.Heading, { className: "text-black text-sm font-semibold leading-tight mb-1 text-left", children: [userName, " sent a message"] }), (0, jsx_runtime_1.jsxs)(react_email_1.Text, { className: "text-[#868686] text-[12px] mb-6", children: [timeSent, " SAST"] }), (0, jsx_runtime_1.jsx)(react_email_1.Section, { className: "bg-[#f9f9f9] rounded p-4 border border-solid border-[#eeeeee]", children: (0, jsx_runtime_1.jsx)(react_email_1.Text, { className: "text-[#111] text-sm leading-relaxed m-0 whitespace-pre-wrap", children: message }) })] })] }) }) })] }));
};
exports.InboxEmail = InboxEmail;
exports.default = exports.InboxEmail;
