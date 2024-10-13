'use server';

import * as z from 'zod';
import { SettingsSchema } from '../schemas';
import { db } from '@/lib/db';
import { getUserByEmail, getUserById } from '@/data/user';
import { curentUser } from '@/lib/auth';
import bcrypt from "bcryptjs";
import { getAccountByUserId } from '@/data/account';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerifacationEmail } from '@/lib/mail';

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
    const user =  await curentUser();
    const account = await getAccountByUserId(user?.id as string);
    if(!user) return {error: "Unauthorized"};
    const dbUser = await getUserById(user.id as string);
    if(!dbUser) return {error: "Unauthorized"};
    if(user.isOAuth){
        values.email = undefined;
        values.password = undefined;
        values.newPassword = undefined;
        values.isTwoFactorEnabled = undefined;
    }
    if(values.email && values.email !== user.email){
        const existingEmail = await getUserByEmail(values.email);
        if(existingEmail && existingEmail.id !== user.id) return {error: "Email already in use"};  
        
        const verificationToken = await generateVerificationToken(values.email);
        await sendVerifacationEmail(verificationToken.email, verificationToken.token);
        return {success: "Verification email sent"};
    }
    if(values.password && values.newPassword && dbUser.password){
        const passwordMatch = await bcrypt.compare(values.password, dbUser.password);
        if(!passwordMatch) return {error: "Incorrect password"};
        const hashedPassword = await bcrypt.hash(values.newPassword, 10);
        values.password = hashedPassword;
        values.newPassword = undefined;
    }
        
    await db.user.update({
        where: {id: dbUser.id},
        data: {
            ...values
        }
    })
    return {success: "Settings updated"};
}