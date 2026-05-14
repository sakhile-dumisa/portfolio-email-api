import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Body, Container, Head, Heading, Html, Img, Link, Preview, Section, Text, Font, Tailwind, } from "react-email";
export const VerificationEmail = ({ code = "000000" }) => {
    return (_jsxs(Html, { lang: "en", dir: "ltr", children: [_jsx(Head, { children: _jsx(Font, { fontFamily: "Space Grotesk", fallbackFontFamily: "Arial", webFont: {
                        url: "https://mail.sakhiledumisa.com/space-grotesk.woff2",
                        format: "woff2",
                    }, fontWeight: 400, fontStyle: "normal" }) }), _jsx(Preview, { children: "Your one-time passcode is ready to verify your email" }), _jsx(Tailwind, { config: {
                    theme: {
                        extend: {
                            fontFamily: {
                                sans: ["'Space Grotesk'", "sans-serif"],
                            },
                        },
                    },
                }, children: _jsx(Body, { className: "bg-white my-auto mx-auto font-sans", children: _jsxs(Container, { className: "max-w-[600px] mx-auto p-[40px_20px]", children: [_jsx(Section, { className: "mb-[32px] text-center", children: _jsx(Link, { href: "https://sakhiledumisa.com", children: _jsx(Img, { src: "https://mail.sakhiledumisa.com/logo.png", width: "56", height: "56", alt: "Logo", className: "rounded-lg inline-block" }) }) }), _jsxs(Section, { className: "text-center", children: [_jsx(Text, { className: "text-black text-sm leading-relaxed m-0 mb-2", children: "Here is your one-time passcode:" }), _jsx(Heading, { className: "text-black text-[22px] font-bold leading-tight my-4", children: code }), _jsx(Text, { className: "text-[#868686] text-sm leading-relaxed m-0 mb-4", children: "This code will expire in 10 minutes." }), _jsx(Text, { className: "text-[#868686] text-sm leading-relaxed m-0", children: "If you did not initiate this activity, please ignore this email." })] })] }) }) })] }));
};
export default VerificationEmail;
