// components/ContinueWithGoogle.tsx
'use client';
import React from 'react';
import { signInWithGoogle } from '@/lib/firebase/auth/GooleAuth';
import { tryToCreateSession } from '@/lib/firebase/auth/auth.actions';


const ContinueWithGoogle: React.FC = () => {

  const  handleClick  = async ()=> {
    const token = await signInWithGoogle();
    if (token.trim() !== ""){
      tryToCreateSession(token)
    }
  }

  return (
    <button  className='px-2 py-1 bg-[#0a95f2] border-none' onClick={handleClick}  >
      Continue with Google
    </button>
  );
};

export default ContinueWithGoogle;
