/* istanbul ignore file */
import { ACCESS_TOKEN } from "./constants";
import * as jose from 'jose'

const cleanupUserPayload = (user) => {
  delete user.password;
  delete user.salt
  return user;
};

const secret = new TextEncoder().encode(
  `${process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET}`
)


export async function generateToken(user, type) {
  try {
    // return jwt.sign(
    //   cleanupUserPayload(user),
    //   `${process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET}`,
    //   {
    //     expiresIn: type === ACCESS_TOKEN ? "1d" : '90d',
    //   }
    // );

    const jwt = await new jose.SignJWT(cleanupUserPayload(user))
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setIssuer('urn:ostrating:issuer')
      .setAudience('urn:ostrating:audience')
      .setExpirationTime(type === ACCESS_TOKEN ? "1d" : '90d')
      .sign(secret)
    return jwt

  } catch (e) {
    console.log("e:", e);
    return null;
  }
}

export async function verifyToken(jwt) {
  try {
    var token = "";
    if (jwt) {
      token = jwt.replace("Bearer ", "");
    }
    // return jwt.verify(token, `${process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET}`);
    const { payload, protectedHeader } = await jose.jwtVerify(token, secret, {
      issuer: 'urn:ostrating:issuer',
      audience: 'urn:ostrating:audience',
    })
    return payload
  } catch (e) {
    return null;
  }
}


export const handleTokenVerification = (req, res) => {
  const { authorization } = req.headers;
  const isAuthorized = verifyToken(authorization)
  if (!isAuthorized) {
    return res
      .status(401)
      .send({ error: "You are not authorised" });
  }
  return isAuthorized
}