import { db } from "@/lib/db";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });
    if (!verificationToken) {
      console.log(`No verification token found for email: ${email}`);
    } else {
      console.log("token1:", verificationToken);
    }
    return verificationToken;
  } catch (error) {
    console.error("Error fetching verification token by email:", error);
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });
    if (!verificationToken) {
      console.log(`No verification token found for token: ${token}`);
    }
    return verificationToken;
  } catch (error) {
    console.error("Error fetching verification token by token:", error);
    return null;
  }
};
