//lib/firebase/auth/auth.action.ts
'use server';
import "server-only";
import { cookies } from "next/headers";
import { sessionConsts ,loginRoute,homeRoute} from "@/private.consts";
import {auth} from "../server-config";
import { redirect } from "next/navigation";
import {encrypt } from "@/lib/signSession";


export async function removeSession() {
    const cookiesStore =  await cookies();
    cookiesStore.delete(sessionConsts.cookiesName);
    redirect(loginRoute)
}

export async function tryToCreateSession(token:string) {

    const decodedToken = await auth.verifyIdToken(token,true);//decode token and check if it already revocked
    const userUID = decodedToken.uid;

    try{
        //check in whitlist with api
        const response = await fetch(process.env.NEXT_PUBLIC_DOMAIN+'/api/authorization', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${process.env.API_SECRET_CODE}`,
            },
            body: JSON.stringify({ token }),
        });
        if (!response.ok) {
            throw new Error('Not Good');
        }
        const data = await response.json();
        const userPerm = data.perm;
        //create session cookie
      
        const encryptedUID = await encrypt({uid:userUID,perm:userPerm});
        if (!encryptedUID){
            throw new Error('Not Good');
        }
        const cookiesStore =  await cookies();
        cookiesStore.set(sessionConsts.cookiesName,encryptedUID as string,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: sessionConsts.cookiesMaxAge,
            path: '/',
        });
    }
    catch{
        auth.revokeRefreshTokens(userUID)//revoke the tokens
        return
        
    }
    redirect(homeRoute)
}