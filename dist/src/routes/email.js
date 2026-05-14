import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import sanitizeHtml from 'sanitize-html';
import { Body, Container, Font, Head, Heading, Html, Img, Link, Preview, Section, Tailwind, Text, } from 'react-email';
import { sendEmailSchema, sendOtpSchema, verifyOtpSchema } from '../schemas/email.schema.js';
const email = new Hono();
const titleCase = (str) => str.trim().toLowerCase().replace(/(^|\s|-)\S/g, l => l.toUpperCase());
const VerificationEmail = ({ code = '000000' }) => (_jsxs(Html, { lang: "en", dir: "ltr", children: [_jsx(Head, { children: _jsx(Font, { fontFamily: "Space Grotesk", fallbackFontFamily: "Arial", webFont: {
                    url: 'https://mail.sakhiledumisa.com/space-grotesk.woff2',
                    format: 'woff2',
                }, fontWeight: 400, fontStyle: "normal" }) }), _jsx(Preview, { children: "Your one-time passcode is ready to verify your email" }), _jsx(Tailwind, { config: {
                theme: {
                    extend: {
                        fontFamily: {
                            sans: ["'Space Grotesk'", 'sans-serif'],
                        },
                    },
                },
            }, children: _jsx(Body, { className: "bg-white my-auto mx-auto font-sans", children: _jsxs(Container, { className: "max-w-[600px] mx-auto p-[40px_20px]", children: [_jsx(Section, { className: "mb-[32px] text-center", children: _jsx(Link, { href: "https://sakhiledumisa.com", children: _jsx(Img, { src: "https://mail.sakhiledumisa.com/logo.png", width: "56", height: "56", alt: "Logo", className: "rounded-lg inline-block" }) }) }), _jsxs(Section, { className: "text-center", children: [_jsx(Text, { className: "text-black text-sm leading-relaxed m-0 mb-2", children: "Here is your one-time passcode:" }), _jsx(Heading, { className: "text-black text-[22px] font-bold leading-tight my-4", children: code }), _jsx(Text, { className: "text-[#868686] text-sm leading-relaxed m-0 mb-4", children: "This code will expire in 10 minutes." }), _jsx(Text, { className: "text-[#868686] text-sm leading-relaxed m-0", children: "If you did not initiate this activity, please ignore this email." })] })] }) }) })] }));
const InboxEmail = ({ userName, message }) => {
    const timeSent = new Intl.DateTimeFormat('en-ZA', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Africa/Johannesburg',
    }).format(new Date());
    return (_jsxs(Html, { lang: "en", dir: "ltr", children: [_jsx(Head, { children: _jsx(Font, { fontFamily: "Space Grotesk", fallbackFontFamily: "Arial", webFont: {
                        url: 'https://mail.sakhiledumisa.com/space-grotesk.woff2',
                        format: 'woff2',
                    }, fontWeight: 400, fontStyle: "normal" }) }), _jsxs(Preview, { children: ["New message from ", userName] }), _jsx(Tailwind, { config: {
                    theme: {
                        extend: {
                            fontFamily: {
                                sans: ["'Space Grotesk'", 'sans-serif'],
                            },
                        },
                    },
                }, children: _jsx(Body, { className: "bg-white my-auto mx-auto font-sans", children: _jsxs(Container, { className: "max-w-[600px] mx-auto p-[40px_20px]", children: [_jsx(Section, { className: "mb-[32px] text-left", children: _jsx(Link, { href: "https://sakhiledumisa.com", children: _jsx(Img, { src: "https://mail.sakhiledumisa.com/logo.png", width: "40", height: "40", alt: "Logo", className: "rounded-lg inline-block" }) }) }), _jsxs(Section, { children: [_jsxs(Heading, { className: "text-black text-sm font-semibold leading-tight mb-1 text-left", children: [userName, " sent a message"] }), _jsxs(Text, { className: "text-[#868686] text-[12px] mb-6", children: [timeSent, " SAST"] }), _jsx(Section, { className: "bg-[#f9f9f9] rounded p-4 border border-solid border-[#eeeeee]", children: _jsx(Text, { className: "text-[#111] text-sm leading-relaxed m-0 whitespace-pre-wrap", children: message }) })] })] }) }) })] }));
};
const ConfirmationEmail = ({ userName = 'there', sentMessage }) => (_jsxs(Html, { lang: "en", dir: "ltr", children: [_jsx(Head, { children: _jsx(Font, { fontFamily: "Space Grotesk", fallbackFontFamily: "Arial", webFont: {
                    url: 'https://mail.sakhiledumisa.com/space-grotesk.woff2',
                    format: 'woff2',
                }, fontWeight: 400, fontStyle: "normal" }) }), _jsx(Preview, { children: "Thanks for your message\u2014I'll respond shortly." }), _jsx(Tailwind, { config: {
                theme: {
                    extend: {
                        fontFamily: {
                            sans: ["'Space Grotesk'", 'sans-serif'],
                        },
                    },
                },
            }, children: _jsx(Body, { className: "bg-white my-auto mx-auto font-sans", children: _jsxs(Container, { className: "max-w-[600px] mx-auto p-[40px_20px]", children: [_jsx(Section, { className: "mb-[32px] text-center", children: _jsx(Link, { href: "https://sakhiledumisa.com", children: _jsx(Img, { src: "https://mail.sakhiledumisa.com/logo.png", width: "52", height: "52", alt: "Logo", className: "rounded-lg inline-block" }) }) }), _jsxs(Section, { children: [_jsxs(Heading, { className: "text-black text-sm font-semibold leading-tight mb-4 text-left", children: ["Thank you for your email, ", userName, ". I will get back to you as soon as I can."] }), _jsx(Section, { className: "bg-[#f9f9f9] rounded p-4 mb-4 border border-solid border-[#eeeeee]", children: _jsx(Text, { className: "text-[#444] text-sm leading-relaxed m-0 text-left font-normal italic-none", children: sentMessage }) }), _jsxs(Text, { className: "text-[#868686] text-sm leading-relaxed m-0 text-left", children: ["You can reply to this email if your matter is immediate. Feel free to", ' ', _jsx(Link, { href: "https://www.sakhiledumisa.com", className: "text-[#0670DB]", children: "visit" }), ' ', "again!"] })] })] }) }) })] }));
// POST /email/api/send-email
email.post('/api/send-email', zValidator('json', sendEmailSchema, (result, c) => {
    if (!result.success) {
        return c.json({
            success: false,
            error: 'Validation error',
            issues: result.error.issues,
        }, 400);
    }
}), async (c) => {
    const { to, userName, sentBy, message, from } = c.req.valid('json');
    const resend = c.get('resend');
    const redis = c.get('redis');
    if (!resend)
        return c.json({ success: false, error: 'Email service unavailable' }, 503);
    if (redis) {
        const verified = await redis.get(`verified:${sentBy}`);
        if (!verified)
            return c.json({ success: false, error: 'Email not verified. Please verify first.' }, 403);
    }
    const titledName = titleCase(sanitizeHtml(userName));
    const cleanSentBy = sanitizeHtml(sentBy).trim();
    const cleanMessage = sanitizeHtml(message, { allowedTags: [], allowedAttributes: {} }).trim();
    try {
        const inboxRes = await resend.emails.send({
            from: `${titledName} <${from}>`,
            to,
            replyTo: cleanSentBy,
            subject: `New message from ${titledName}`,
            react: InboxEmail({ userName: titledName, message: cleanMessage }),
        });
        await resend.emails.send({
            from: `Sakhile Dumisa <${process.env.FROM_SENDER}>`,
            to: cleanSentBy,
            subject: `Thanks, ${titledName}!`,
            react: ConfirmationEmail({
                userName: titledName,
                sentMessage: cleanMessage,
            }),
        });
        return c.json({ success: true, data: inboxRes });
    }
    catch (err) {
        console.error('Send email failed:', err);
        return c.json({ success: false, error: err.message || 'Failed to send message' }, 500);
    }
});
// POST /email/api/send-otp
email.post('/api/send-otp', zValidator('json', sendOtpSchema), async (c) => {
    const { email: targetEmail } = c.req.valid('json');
    const resend = c.get('resend');
    const redis = c.get('redis');
    if (!resend)
        return c.json({ success: false, error: 'Email service unavailable' }, 503);
    if (redis) {
        const cooldown = await redis.get(`otp-cooldown:${targetEmail}`);
        if (cooldown)
            return c.json({ success: false, error: 'Wait before requesting another OTP' }, 429);
        await redis.set(`otp-cooldown:${targetEmail}`, '1', 'EX', Number(process.env.OTP_COOLDOWN_SECONDS) || 60);
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    if (redis) {
        await redis.set(`otp:${targetEmail}`, code, 'EX', Number(process.env.OTP_TTL_SECONDS) || 600);
        await redis.del(`otp-attempts:${targetEmail}`);
    }
    try {
        await resend.emails.send({
            from: `Verification <${process.env.FROM_VERIFY}>`,
            to: targetEmail,
            subject: 'Your Verification Code',
            react: VerificationEmail({ code }),
        });
        return c.json({ success: true, message: 'OTP sent' });
    }
    catch (err) {
        console.error('OTP send failed:', err);
        return c.json({ success: false, error: 'Failed to send OTP' }, 500);
    }
});
// POST /email/api/verify-otp
email.post('/api/verify-otp', zValidator('json', verifyOtpSchema), async (c) => {
    const { email: targetEmail, code } = c.req.valid('json');
    const redis = c.get('redis');
    if (!redis)
        return c.json({ success: false, error: 'Verification unavailable' }, 503);
    const stored = await redis.get(`otp:${targetEmail}`);
    if (!stored)
        return c.json({ success: false, error: 'Code expired or not found' }, 400);
    const attemptsKey = `otp-attempts:${targetEmail}`;
    const attempts = await redis.incr(attemptsKey);
    if (attempts === 1)
        await redis.expire(attemptsKey, Number(process.env.OTP_TTL_SECONDS) || 600);
    if (attempts > (Number(process.env.MAX_VERIFY_ATTEMPTS) || 5)) {
        return c.json({ success: false, error: 'Too many attempts. Try again later.' }, 429);
    }
    if (stored !== code)
        return c.json({ success: false, error: 'Incorrect code' }, 400);
    await redis.del(`otp:${targetEmail}`);
    await redis.del(attemptsKey);
    await redis.set(`verified:${targetEmail}`, '1', 'EX', 60 * 60 * 24 * 30);
    return c.json({ success: true, message: 'Email verified successfully' });
});
export default email;
