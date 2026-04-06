import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_KEY

export const generateToken = (email: string): object => {
    if (!secretKey) return { code: 404 }
    if (!email.endsWith("@blueprint.hackclub.com")) return { code: 200, message: "Invalid email" }
    return {
        code: 202,
        token: jwt.sign({ email, slug: email.split("@")[0], timestamp: Date.now() }, secretKey!, { expiresIn: "2d" }),
    }
}

export const verifyToken = (token: string): object => {
    if (!secretKey) return { code: 404, success: false }
    try {
        const decoded = jwt.verify(token, secretKey);
        return { code: 202, slug: (decoded as any).slug, success: true }
    } catch (err) {
        return { code: 200, message: "Invalid token", success: false }
    }
}