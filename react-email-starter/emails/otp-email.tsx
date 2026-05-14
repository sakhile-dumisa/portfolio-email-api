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
  code: string;
}

export const VerificationEmail = ({ code = "000000" }: Props) => {
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
      <Preview>Your one-time passcode is ready to verify your email</Preview>
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
                  width="56"
                  height="56"
                  alt="Logo"
                  className="rounded-lg inline-block"
                />
              </Link>
            </Section>

            <Section className="text-center">
              <Text className="text-black text-sm leading-relaxed m-0 mb-2">
                Here is your one-time passcode:
              </Text>
              
              <Heading className="text-black text-[22px] font-bold leading-tight my-4">
                {code}
              </Heading>

              <Text className="text-[#868686] text-sm leading-relaxed m-0 mb-4">
                This code will expire in 10 minutes.
              </Text>

              <Text className="text-[#868686] text-sm leading-relaxed m-0">
                If you did not initiate this activity, please ignore this email.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerificationEmail;