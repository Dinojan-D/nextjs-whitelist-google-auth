// components/StopContinueWithGoogle.tsx
'use client';
import React from 'react';
import { removeSession } from '@/lib/firebase/auth/auth.actions';
import { signOutWithGoogle } from '@/lib/firebase/auth/GooleAuth';

const StopContinueWithGoogle: React.FC = () => {
  const handleClick = ()=>{
    signOutWithGoogle();
    removeSession();
  }
  return (
    <button  className='px-2 py-1 bg-[#0a95f2] border-none' onClick={handleClick} >
      Stop Continue with Google
    </button>
  );
};

export default StopContinueWithGoogle;
