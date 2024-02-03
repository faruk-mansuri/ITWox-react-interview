'use client';
import { useUser } from '@/hooks/useUser';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import toast from 'react-hot-toast';
import { Button } from 'tamagui';

const Hero = () => {
  const { currentUser, removeUser } = useUser();

  const signOut = async () => {
    try {
      await axios.get('/api/auth/logout');
      removeUser();
      toast.success('Logged Out');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='h-screen p-2'>
      <nav className='h-12 px-2 flex items-center justify-end gap-2'>
        <Link href={currentUser ? '/dashboard' : 'signin'}>
          <Button variant='outlined'>
            {currentUser ? 'Dashboard' : 'Get Started'}
          </Button>
        </Link>

        {currentUser && <Button onClick={signOut}>Signout</Button>}
      </nav>

      <div className='h-[calc(100%-3rem)] flex flex-col justify-center items-center'>
        <h1 className='text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500'>
          ITWox
        </h1>
        <p className='text-xl'>
          Take my visionary ideas and make them a reality
        </p>
      </div>
    </div>
  );
};

export default Hero;
