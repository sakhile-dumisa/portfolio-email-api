"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationEmail = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_email_1 = require("react-email");
const VerificationEmail = ({ code = "000000" }) => {
    return ((0, jsx_runtime_1.jsxs)(react_email_1.Html, { lang: "en", dir: "ltr", children: [(0, jsx_runtime_1.jsx)(react_email_1.Head, { children: (0, jsx_runtime_1.jsx)(react_email_1.Font, { fontFamily: "Space Grotesk", fallbackFontFamily: "Arial", webFont: {
                        url: "https://mail.sakhiledumisa.com/space-grotesk.woff2",
                        format: "woff2",
                    }, fontWeight: 400, fontStyle: "normal" }) }), (0, jsx_runtime_1.jsx)(react_email_1.Preview, { children: "Your one-time passcode is ready to verify your email" }), (0, jsx_runtime_1.jsx)(react_email_1.Tailwind, { config: {
                    theme: {
                        extend: {
                            fontFamily: {
                                sans: ["'Space Grotesk'", "sans-serif"],
                            },
                        },
                    },
                }, children: (0, jsx_runtime_1.jsx)(react_email_1.Body, { className: "bg-white my-auto mx-auto font-sans", children: (0, jsx_runtime_1.jsxs)(react_email_1.Container, { className: "max-w-[600px] mx-auto p-[40px_20px]", children: [(0, jsx_runtime_1.jsx)(react_email_1.Section, { className: "mb-[32px] text-center", children: (0, jsx_runtime_1.jsx)(react_email_1.Link, { href: "https://sakhiledumisa.com", children: (0, jsx_runtime_1.jsx)(react_email_1.Img, { src: "https://mail.sakhiledumisa.com/logo.png", width: "56", height: "56", alt: "Logo", className: "rounded-lg inline-block" }) }) }), (0, jsx_runtime_1.jsxs)(react_email_1.Section, { className: "text-center", children: [(0, jsx_runtime_1.jsx)(react_email_1.Text, { className: "text-black text-sm leading-relaxed m-0 mb-2", children: "Here is your one-time passcode:" }), (0, jsx_runtime_1.jsx)(react_email_1.Heading, { className: "text-black text-[22px] font-bold leading-tight my-4", children: code }), (0, jsx_runtime_1.jsx)(react_email_1.Text, { className: "text-[#868686] text-sm leading-relaxed m-0 mb-4", children: "This code will expire in 10 minutes." }), (0, jsx_runtime_1.jsx)(react_email_1.Text, { className: "text-[#868686] text-sm leading-relaxed m-0", children: "If you did not initiate this activity, please ignore this email." })] })] }) }) })] }));
};
exports.VerificationEmail = VerificationEmail;
exports.default = exports.VerificationEmail;
