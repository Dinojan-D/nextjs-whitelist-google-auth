//lib/firebase/auth/auth.action.ts
'use server';
import "server-only";
import { cookies } from "next/headers";
import { sessionConsts ,loginRoute,homeRoute} from "@/private.consts";
import {auth} from "@/lib/firebase/server-config";
import { redirect } from "next/navigation";

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
        const response = await fetch('http://localhost:3000//api/auhtorization', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        });

        if (!response.ok) {
            throw new Error('Not Good');
        }

        //create session cookie
        const cookiesStore =  await cookies();
        cookiesStore.set(sessionConsts.cookiesName,userUID,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: sessionConsts.cookiesMaxAge,
            path: '/',
        });
        console.log(token);
       
    
    }
    catch{
        auth.revokeRefreshTokens(userUID)//revoke the tokens
        return
        
    }
    redirect(homeRoute)
}