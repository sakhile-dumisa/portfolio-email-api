"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmationEmail = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_email_1 = require("react-email");
const ConfirmationEmail = ({ userName = "there", sentMessage }) => {
    return ((0, jsx_runtime_1.jsxs)(react_email_1.Html, { lang: "en", dir: "ltr", children: [(0, jsx_runtime_1.jsx)(react_email_1.Head, { children: (0, jsx_runtime_1.jsx)(react_email_1.Font, { fontFamily: "Space Grotesk", fallbackFontFamily: "Arial", webFont: {
                        url: "https://mail.sakhiledumisa.com/space-grotesk.woff2",
                        format: "woff2",
                    }, fontWeight: 400, fontStyle: "normal" }) }), (0, jsx_runtime_1.jsx)(react_email_1.Preview, { children: "Thanks for your message\u2014I'll respond shortly." }), (0, jsx_runtime_1.jsx)(react_email_1.Tailwind, { config: {
                    theme: {
                        extend: {
                            fontFamily: {
                                sans: ["'Space Grotesk'", "sans-serif"],
                            },
                        },
                    },
                }, children: (0, jsx_runtime_1.jsx)(react_email_1.Body, { className: "bg-white my-auto mx-auto font-sans", children: (0, jsx_runtime_1.jsxs)(react_email_1.Container, { className: "max-w-[600px] mx-auto p-[40px_20px]", children: [(0, jsx_runtime_1.jsx)(react_email_1.Section, { className: "mb-[32px] text-center", children: (0, jsx_runtime_1.jsx)(react_email_1.Link, { href: "https://sakhiledumisa.com", children: (0, jsx_runtime_1.jsx)(react_email_1.Img, { src: "https://mail.sakhiledumisa.com/logo.png", width: "52", height: "52", alt: "Logo", className: "rounded-lg inline-block" }) }) }), (0, jsx_runtime_1.jsxs)(react_email_1.Section, { children: [(0, jsx_runtime_1.jsxs)(react_email_1.Heading, { className: "text-black text-sm font-semibold leading-tight mb-4 text-left", children: ["Thank you for your email, ", userName, ". I will get back to you as soon as I can."] }), (0, jsx_runtime_1.jsx)(react_email_1.Section, { className: "bg-[#f9f9f9] rounded p-4 mb-4 border border-solid border-[#eeeeee]", children: (0, jsx_runtime_1.jsx)(react_email_1.Text, { className: "text-[#444] text-sm leading-relaxed m-0 text-left font-normal italic-none", children: sentMessage }) }), (0, jsx_runtime_1.jsxs)(react_email_1.Text, { className: "text-[#868686] text-sm leading-relaxed m-0 text-left", children: ["You can reply to this email if your matter is immediate. Feel free to", " ", (0, jsx_runtime_1.jsx)(react_email_1.Link, { href: "https://www.sakhiledumisa.com", className: "text-[#0670DB]", children: "visit" }), " ", "again!"] })] })] }) }) })] }));
};
exports.ConfirmationEmail = ConfirmationEmail;
exports.default = exports.ConfirmationEmail;
