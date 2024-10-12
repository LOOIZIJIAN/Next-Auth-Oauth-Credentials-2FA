'use server';

import * as z from 'zod';
import { SettingsSchema } from '../schemas';
import { db } from '@/lib/db';
import { getUserById } from '@/data/user';
import { curentUser } from '@/lib/auth';
import { getAccountByUserId } from '@/data/account';

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
    const user =  await curentUser();
    const account = await getAccountByUserId(user?.id as string);
    console.log("User: " + JSON.stringify(user));
    console.log("Account: " + account);
    if(!user) return {error: "Unauthorized"};
    const dbUser = await getUserById(user.id as string);
    if(!dbUser) return {error: "Unauthorized"};
    if(user.isOAuth){
        values.email = undefined;
        values.password = undefined;
        values.newPassword = undefined;
        values.isTwoFactorEnabled = undefined;
    }
    await db.user.update({
        where: {id: dbUser.id},
        data: {
            ...values
        }
    })
    return {success: "Settings updated"};
}