import {
  Button,
  Html,
  Head,
  Body,
  Preview,
  Tailwind,
  Section,
  Heading,
  Img,
  Container,
  Text,
  Column,
  Link,
  Row,
} from "@react-email/components";

export default function VerificationOTP(otp: string = "ABO2C3") {
  if (!otp.length || otp?.length !== 6) otp = "ABO2C3";
  const otpChars = otp.split("");
  return (
    <Html>
      <Head>
        <title>Build Guilds OTP</title>
      </Head>
      <Preview>Build Guild Organizers portal login OTP</Preview>
      <Tailwind>
        <Body
          className="
          bg-[#071d35]
          bg-[linear-gradient(rgba(255,255,255,0.05)_2px,transparent_2px),linear-gradient(90deg,rgba(255,255,255,0.05)_2px,transparent_2px)]
          bg-size-[40px_40px]
          m-0
          p-0
          min-h-screen
        "
        >
          <Section>
            <Heading className="pt-4 text-center m-8">
              <Img
                src="https://github.com/CodingWithHardik/assets/blob/main/build-guilds/main_banner.png?raw=true"
                alt="Build Guilds Logo"
                width={380}
                className="mx-auto max-w-full"
              />
            </Heading>
          </Section>
          <Section className="px-16 text-white font-sans">
            Hi 👋,
            <br />
            <br />
            Use the following OTP to login to the Build Guilds Organizers Studio:
            <br />
            <br />
            <span className="font-bold text-2xl pb-4 text-center">
              <span className="flex flex-wrap gap-8 justify-center content-center">
                <span className="flex gap-4">
                  <span className="bg-[#071930] px-4 py-2 rounded-md border-2 border-amber-400 text-amber-400 inline-block min-w-4 text-center">
                    {otpChars[0]}
                  </span>
                  <span className="bg-[#071930] px-4 py-2 rounded-md border-2 border-amber-400 text-amber-400 inline-block min-w-4 text-center">
                    {otpChars[1]}
                  </span>
                  <span className="bg-[#071930] px-4 py-2 rounded-md border-2 border-amber-400 text-amber-400 inline-block min-w-4 text-center">
                    {otpChars[2]}
                  </span>
                </span>
                <span className="flex gap-4">
                  <span className="bg-[#071930] px-4 py-2 rounded-md border-2 border-amber-400 text-amber-400 inline-block min-w-4 text-center">
                    {otpChars[3]}
                  </span>
                  <span className="bg-[#071930] px-4 py-2 rounded-md border-2 border-amber-400 text-amber-400 inline-block min-w-4 text-center">
                    {otpChars[4]}
                  </span>
                  <span className="bg-[#071930] px-4 py-2 rounded-md border-2 border-amber-400 text-amber-400 inline-block min-w-4 text-center">
                    {otpChars[5]}
                  </span>
                </span>
              </span>
            </span>
            <br/>This OTP is valid for 10 minutes. If you did not request this,
            please ignore this email.
          </Section>
          <Section className="w-full p-4 pt-12">
            <Section className="bg-amber-200 rounded-2xl px-4 font-sans border-4 border-amber-500">
              <Text className="text-amber-700 text-[16px]">⚠️ Note:</Text>
              <Text className="text-amber-700 text-sm">
                This mail is not official from hackclub or blueprint.
              </Text>
            </Section>
          </Section>
          <Section className="text-center pt-8">
            <table className="w-full bg-[#071930] pt-4">
              <tr className="w-full">
                <td align="center">
                  <Img
                    alt="React Email logo"
                    height="42"
                    src="https://github.com/CodingWithHardik/assets/blob/main/build-guilds/logo.png?raw=true"

                  />
                </td>
              </tr>
              <tr className="w-full">
                <td align="center">
                  <Text className="my-2 font-semibold text-[16px] text-white leading-6 font-sans">
                    Build Guild Organizers Studio
                  </Text>
                  <Text className="mt-2 mb-0 text-[16px] text-gray-200 leading-6 font-sans">
                    Contact Us
                  </Text>
                </td>
              </tr>
              <tr>
                <td align="center" className="pb-4">
                  <Text className="mt-1 mb-0 font-[2px] text-[16px] text-gray-200 leading-6 font-sans">
                    hardikgupta002@gmail.com
                  </Text>
                </td>
              </tr>
            </table>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
}
