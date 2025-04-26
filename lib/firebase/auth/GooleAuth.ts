//lib/firebase/auth/GoogleAuth.ts
import {GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../client-config';


export async function signInWithGoogle():Promise<string> {
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);

        if (!result || !result.user) {
            throw new Error('Google sign-in failed: No user returned');
        }

        const token = await result.user.getIdToken();
        console.log('Successfully signed');
        return token
       
    }
    catch (error) {
        console.error('Error signing in with Google:', error);
    }
    return ""
}


export async function signOutWithGoogle() {
    try {
        await firebaseSignOut(auth);
        console.log('Successfully signed out');
    } catch (error) {
        console.error('Error signing out with Google:', error);
    }
}
