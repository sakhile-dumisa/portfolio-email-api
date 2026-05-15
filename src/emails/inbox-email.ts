import { jsx as _jsx, jsxs as _jsxs } from './react-runtime.js'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Font,
  Tailwind,
} from 'react-email'

interface InboxEmailProps {
  userName: string
  message: string
}

export const InboxEmail = ({ userName, message }: InboxEmailProps) => {
  const timeSent = new Intl.DateTimeFormat('en-ZA', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Africa/Johannesburg',
  }).format(new Date())

  return _jsxs(Html, {
    lang: 'en',
    dir: 'ltr',
    children: [
      _jsx(Head, {
        children: _jsx(Font, {
          fontFamily: 'Space Grotesk',
          fallbackFontFamily: 'Arial',
          webFont: {
            url: 'https://mail.sakhiledumisa.com/space-grotesk.woff2',
            format: 'woff2',
          },
          fontWeight: 400,
          fontStyle: 'normal',
        }),
      }),
      _jsxs(Preview, { children: ['New message from ', userName] }),
      _jsx(Tailwind, {
        config: {
          theme: {
            extend: {
              fontFamily: {
                sans: ["'Space Grotesk'", 'sans-serif'],
              },
            },
          },
        },
        children: _jsx(Body, {
          className: 'bg-white my-auto mx-auto font-sans',
          children: _jsxs(Container, {
            className: 'max-w-[600px] mx-auto p-[40px_20px]',
            children: [
              _jsx(Section, {
                className: 'mb-[32px] text-left',
                children: _jsx(Link, {
                  href: 'https://sakhiledumisa.com',
                  children: _jsx(Img, {
                    src: 'https://mail.sakhiledumisa.com/logo.png',
                    width: '40',
                    height: '40',
                    alt: 'Logo',
                    className: 'rounded-lg inline-block',
                  }),
                }),
              }),
              _jsxs(Section, {
                children: [
                  _jsxs(Heading, {
                    className: 'text-black text-sm font-semibold leading-tight mb-1 text-left',
                    children: [userName, ' sent a message'],
                  }),
                  _jsxs(Text, {
                    className: 'text-[#868686] text-[12px] mb-6',
                    children: [timeSent, ' SAST'],
                  }),
                  _jsx(Section, {
                    className: 'bg-[#f9f9f9] rounded p-4 border border-solid border-[#eeeeee]',
                    children: _jsx(Text, {
                      className: 'text-[#111] text-sm leading-relaxed m-0 whitespace-pre-wrap',
                      children: message,
                    }),
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
    ],
  })
}

export default InboxEmail