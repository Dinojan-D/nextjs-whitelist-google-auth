//api/authorization (route.ts)
import "server-only";
import {db,auth} from "@/lib/firebase/server-config";
import { NextResponse ,type NextRequest } from 'next/server';




export async function POST(request: NextRequest) {
    try {
        //Token
        const {token} = await request.json();//get the token from the request body
        const decodedToken = await auth.verifyIdToken(token,true);//decode token and check if it already revocked
        
        //User infos
        const userEmail = decodedToken.email;
        const userDoc = await db.collection('authorization').doc(userEmail as string).get();

        //Check up
        if (!userDoc.exists){
            return NextResponse.json({ message: 'User not found' }, { status: 403 })
        }
        //all good
        return NextResponse.json({ message: 'User authorized' }, { status: 200 })
    }
    catch{
        return NextResponse.json({ message: 'Authentication failed'}, { status: 500 });
    }
}