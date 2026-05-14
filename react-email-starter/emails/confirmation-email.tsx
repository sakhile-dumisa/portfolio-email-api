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
} from "react-email";

interface Props {
  userName: string;
  sentMessage: string;
}

export const ConfirmationEmail = ({ userName = "there", sentMessage }: Props) => {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <Font
          fontFamily="Space Grotesk"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://mail.sakhiledumisa.com/space-grotesk.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Thanks for your message—I'll respond shortly.</Preview>
      {/* The Tailwind component injects inline styles automatically during render */}
      <Tailwind
        config={{
          theme: {
            extend: {
              fontFamily: {
                sans: ["'Space Grotesk'", "sans-serif"],
              },
            },
          },
        }}
      >
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="max-w-[600px] mx-auto p-[40px_20px]">
            <Section className="mb-[32px] text-center">
              <Link href="https://sakhiledumisa.com">
                <Img
                  src="https://mail.sakhiledumisa.com/logo.png"
                  width="52"
                  height="52"
                  alt="Logo"
                  className="rounded-lg inline-block"
                />
              </Link>
            </Section>

            <Section>
              <Heading className="text-black text-sm font-semibold leading-tight mb-4 text-left">
                Thank you for your email, {userName}. I will get back to you as
                soon as I can.
              </Heading>

              <Section className="bg-[#f9f9f9] rounded p-4 mb-4 border border-solid border-[#eeeeee]">
                <Text className="text-[#444] text-sm leading-relaxed m-0 text-left font-normal italic-none">
                  {sentMessage}
                </Text>
              </Section>

              <Text className="text-[#868686] text-sm leading-relaxed m-0 text-left">
                You can reply to this email if your matter is immediate. Feel free
                to{" "}
                <Link href="https://www.sakhiledumisa.com" className="text-[#0670DB]">
                  visit
                </Link>{" "}
                again!
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ConfirmationEmail;