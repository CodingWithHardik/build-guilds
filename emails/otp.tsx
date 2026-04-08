import { Body, Head, Html, Img, Preview, Tailwind, Text } from "@react-email/components";

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
                        p-0
                        m-0
                    "
                    style={{
                        backgroundColor: "#071d35",
                        backgroundImage: "url('https://github.com/CodingWithHardik/assets/blob/main/build-guilds/email/rectangle.svg?raw=true')",
                        backgroundRepeat: "repeat",
                        backgroundSize: "40px 40px",
                    }}
                >
                    <table width="100%" role="presentation" cellPadding="0" cellSpacing="0">
                        <tr>
                            <td align="center">
                                <table width="600" role="presentation" cellPadding="0" cellSpacing="0" className="p-4 w-full max-w-150 font-sans">
                                    <tr>
                                        <td align="center" className="py-4">
                                            <Img
                                                src="https://github.com/CodingWithHardik/assets/blob/main/build-guilds/main_banner.png?raw=true"
                                                alt="Build Guilds Logo"
                                                width="320"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-white text-[16px] py-1" >
                                            Hi 👋,
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-white text-[16px] py-1" >
                                            Use the following OTP to login to the Build Guilds Organizers Studio:
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" className="py-5">
                                            <table role="presentation" cellPadding="0" cellSpacing="8">
                                                <tr>
                                                    <td
                                                        align="center"
                                                        valign="middle"
                                                        className="
                                                            bg-[#071930]
                                                            border-2 border-amber-400
                                                            text-amber-400
                                                            rounded-md
                                                            font-bold
                                                            text-[18px]
                                                        "
                                                        style={{ 
                                                            width: "42px",
                                                            height: "42px",
                                                        }}
                                                    >
                                                        {otpChars[0]}
                                                    </td>
                                                    <td
                                                        align="center"
                                                        valign="middle"
                                                        className="
                                                            bg-[#071930]
                                                            border-2 border-amber-400
                                                            text-amber-400
                                                            rounded-md
                                                            font-bold
                                                            text-[18px]
                                                        "
                                                        style={{ 
                                                            width: "42px",
                                                            height: "42px",
                                                        }}
                                                    >
                                                        {otpChars[1]}
                                                    </td>
                                                    <td
                                                        align="center"
                                                        valign="middle"
                                                        className="
                                                            bg-[#071930]
                                                            border-2 border-amber-400
                                                            text-amber-400
                                                            rounded-md
                                                            font-bold
                                                            text-[18px]
                                                        "
                                                        style={{ 
                                                            width: "42px",
                                                            height: "42px"
                                                        }}
                                                    >
                                                        {otpChars[2]}
                                                    </td>
                                                    <td style={{ width: "8px" }}/>
                                                    <td
                                                        align="center"
                                                        valign="middle"
                                                        className="
                                                            bg-[#071930]
                                                            border-2 border-amber-400
                                                            text-amber-400
                                                            rounded-md
                                                            font-bold
                                                            text-[18px]
                                                        "
                                                        style={{ 
                                                            width: "42px",
                                                            height: "42px"
                                                        }}
                                                    >
                                                        {otpChars[3]}
                                                    </td>
                                                    <td
                                                        align="center"
                                                        valign="middle"
                                                        className="
                                                            bg-[#071930]
                                                            border-2 border-amber-400
                                                            text-amber-400
                                                            rounded-md
                                                            font-bold
                                                            text-[18px]
                                                        "
                                                        style={{ 
                                                            width: "42px",
                                                            height: "42px"
                                                        }}
                                                    >
                                                        {otpChars[4]}
                                                    </td>
                                                    <td
                                                        align="center"
                                                        valign="middle"
                                                        className="
                                                            bg-[#071930]
                                                            border-2 border-amber-400
                                                            text-amber-400
                                                            rounded-md
                                                            font-bold
                                                            text-[18px]
                                                        "
                                                        style={{ 
                                                            width: "42px",
                                                            height: "42px"
                                                        }}
                                                    >
                                                        {otpChars[5]}
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            className="
                                                text-gray-300
                                                text-[14px]
                                                py-2
                                            "
                                        >
                                            This OTP is valid for 10 minutes. If you did not request this, please ignore this email.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-6">
                                            <table
                                                role="presentation"
                                                width="100%"
                                                className="
                                                    bg-amber-100
                                                    border-2
                                                    border-amber-400
                                                    rounded-xl
                                                "
                                            >
                                                <tr>
                                                    <td className="p-3">
                                                        <Text className="text-amber-800 font-bold m-0">
                                                            ⚠️ Note:
                                                        </Text>
                                                        <Text className="text-amber-800 text-[14px] m-0">
                                                            This mail is not official from hackclub or blueprint.
                                                        </Text>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                <table width="100%" role="presentation" cellPadding="0" cellSpacing="0">
                                    <tr>
                                        <td align="center" className="bg-[#071930] py-6 font-sans">
                                            <Img
                                                src="https://github.com/CodingWithHardik/assets/blob/main/build-guilds/logo.png?raw=true"
                                                alt="Build Guilds Logo"
                                                height="42"
                                            />
                                            <Text className="text-white font-semibold mt-2">
                                                Build Guilds Organizers Studio
                                            </Text>
                                            <Text className="text-gray-300 text-[14px] mt-1">
                                                Contact Us
                                            </Text>
                                            <Text className="text-gray-300 text-[14px]">
                                                buildguilds@gmail.com
                                            </Text>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </Body>
            </Tailwind>
        </Html>
    )
}