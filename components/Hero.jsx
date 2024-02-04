'use client';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import toast from 'react-hot-toast';
import { Button } from 'tamagui';
import { useGlobalContext } from './AppContext';

const Hero = () => {
  const { user, setUser } = useGlobalContext();
  console.log(user);

  const signOut = async () => {
    try {
      await axios.get('/api/auth/logout');
      setUser(() => null);
      toast.success('Logged Out');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='h-screen p-2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 via-cyan-500 to-blue-600'>
      <nav className='h-12 px-2 flex items-center justify-end gap-2'>
        <Link href={user ? '/dashboard' : 'signin'}>
          <Button variant='outlined'>
            {user ? 'Dashboard' : 'Get Started'}
          </Button>
        </Link>

        {user && <Button onClick={signOut}>Signout</Button>}
      </nav>

      <div className='h-[calc(100%-3rem)] flex flex-col justify-center items-center'>
        <h1 className='text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-red-500'>
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
