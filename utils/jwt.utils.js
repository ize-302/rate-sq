import jwt from "jsonwebtoken";
import { ACCESS_TOKEN } from "./constants";

const cleanupUserPayload = (user) => {
  delete user.password;
  delete user.salt
  return user;
};

export function generateToken(user, type) {
  try {
    return jwt.sign(
      cleanupUserPayload(user),
      `${process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET}`,
      {
        expiresIn: type === ACCESS_TOKEN ? "1d" : '90d',
      }
    );
  } catch (e) {
    console.log("e:", e);
    return null;
  }
}

export function verifyToken(jwtToken) {
  try {
    var token = "";
    if (jwtToken) {
      token = jwtToken.replace("Bearer ", "");
    }
    return jwt.verify(token, `${process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET}`);
  } catch (e) {
    return null;
  }
}
