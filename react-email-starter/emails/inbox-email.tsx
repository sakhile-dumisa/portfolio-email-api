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
  message: string;
}

export const InboxEmail = ({ userName, message }: Props) => {
  const timeSent = new Intl.DateTimeFormat("en-ZA", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Johannesburg",
  }).format(new Date());

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
      <Preview>New message from {userName}</Preview>
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
            <Section className="mb-[32px] text-left">
              <Link href="https://sakhiledumisa.com">
                <Img
                  src="https://mail.sakhiledumisa.com/logo.png"
                  width="40"
                  height="40"
                  alt="Logo"
                  className="rounded-lg inline-block"
                />
              </Link>
            </Section>

            <Section>
              <Heading className="text-black text-sm font-semibold leading-tight mb-1 text-left">
                {userName} sent a message
              </Heading>
              <Text className="text-[#868686] text-[12px] mb-6">
                {timeSent} SAST
              </Text>

              <Section className="bg-[#f9f9f9] rounded p-4 border border-solid border-[#eeeeee]">
                <Text className="text-[#111] text-sm leading-relaxed m-0 whitespace-pre-wrap">
                  {message}
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default InboxEmail;