import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Body, Container, Head, Heading, Html, Img, Link, Preview, Section, Text, Font, Tailwind, } from "react-email";
export const ConfirmationEmail = ({ userName = "there", sentMessage }) => {
    return (_jsxs(Html, { lang: "en", dir: "ltr", children: [_jsx(Head, { children: _jsx(Font, { fontFamily: "Space Grotesk", fallbackFontFamily: "Arial", webFont: {
                        url: "https://mail.sakhiledumisa.com/space-grotesk.woff2",
                        format: "woff2",
                    }, fontWeight: 400, fontStyle: "normal" }) }), _jsx(Preview, { children: "Thanks for your message\u2014I'll respond shortly." }), _jsx(Tailwind, { config: {
                    theme: {
                        extend: {
                            fontFamily: {
                                sans: ["'Space Grotesk'", "sans-serif"],
                            },
                        },
                    },
                }, children: _jsx(Body, { className: "bg-white my-auto mx-auto font-sans", children: _jsxs(Container, { className: "max-w-[600px] mx-auto p-[40px_20px]", children: [_jsx(Section, { className: "mb-[32px] text-center", children: _jsx(Link, { href: "https://sakhiledumisa.com", children: _jsx(Img, { src: "https://mail.sakhiledumisa.com/logo.png", width: "52", height: "52", alt: "Logo", className: "rounded-lg inline-block" }) }) }), _jsxs(Section, { children: [_jsxs(Heading, { className: "text-black text-sm font-semibold leading-tight mb-4 text-left", children: ["Thank you for your email, ", userName, ". I will get back to you as soon as I can."] }), _jsx(Section, { className: "bg-[#f9f9f9] rounded p-4 mb-4 border border-solid border-[#eeeeee]", children: _jsx(Text, { className: "text-[#444] text-sm leading-relaxed m-0 text-left font-normal italic-none", children: sentMessage }) }), _jsxs(Text, { className: "text-[#868686] text-sm leading-relaxed m-0 text-left", children: ["You can reply to this email if your matter is immediate. Feel free to ", " ", _jsx(Link, { href: "https://www.sakhiledumisa.com", className: "text-[#0670DB]", children: "visit" }), " ", "again!"] })] })] }) }) })] }));
};
export default ConfirmationEmail;
