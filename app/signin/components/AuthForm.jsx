'use client';
import { Button } from 'tamagui';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AuthForm = () => {
  const [variant, setVariant] = useState('LOGIN');
  const router = useRouter();

  const formSchema = z.object({
    name:
      variant === 'LOGIN'
        ? z.string()
        : z.string().min(3, { message: 'name must be at least 3 characters.' }),
    email: z.string().email('Invalid email'),
    password: z
      .string()
      .min(8, { message: 'password must be at least 8 characters.' }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const toggleVariant = () => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  };
  const onSubmit = async (values) => {
    let action = variant === 'LOGIN' ? 'signin' : 'signup';
    try {
      const response = await axios.post(`/api/auth/${action}`, values);
      toast.success('Logged in successfully.');
      router.push('/dashboard');
    } catch (error) {
      console.log(error);
      const errorMessage = error.response.data || 'Something went wrong.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className='bg-gary-100 h-screen flex flex-col justify-center items-center gap-4'>
      <div className='mt-6'>
        <div className='h-10 w-15 relative '>
          <Image
            fill
            alt='logo'
            src='/images/logo.png'
            className='object-contain opacity-75'
          />
        </div>
        <h2 className='text-2xl font-bold tracking-wider'>
          Sign in to your account
        </h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white w-[80%] sm:w-96 px-8 py-8  rounded-md shadow-md hover:shadow-lg transition'
      >
        <div className='space-y-3'>
          {/* NAME */}
          {variant === 'REGISTER' && (
            <div>
              <label
                htmlFor='name'
                class='block font-medium leading-6 text-gray-900'
              >
                Name
              </label>
              <input
                {...register('name')}
                className='w-full rounded-md border-solid border-2 border-gray-300  py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6'
                id='name'
              />
              {errors.name && (
                <p className='text-red-500'>{errors.name.message}</p>
              )}
            </div>
          )}

          {/* EMAIL */}
          <div>
            <label htmlFor='email'>Email</label>
            <input
              {...register('email')}
              className='w-full rounded-md border-solid border-2 border-gray-300  py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6'
              id='email'
            />
            {errors.email && (
              <p className='text-red-500'>{errors.email.message}</p>
            )}
          </div>
          {/* PASSWORD  */}
          <div>
            <label htmlFor='password'>Password</label>
            <input
              {...register('password')}
              className='w-full rounded-md border-solid border-2 border-gray-300  py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6'
              id='password'
              type='password'
            />

            {errors.password && (
              <p className='text-red-500'>{errors.password.message}</p>
            )}
          </div>
        </div>

        <div className='mt-8 flex items-center justify-center'>
          <Button disabled={isSubmitting}>
            {isSubmitting
              ? 'Loading...'
              : variant === 'LOGIN'
              ? 'sign in'
              : 'sign up'}
          </Button>
        </div>
        <div className='flex gap-2 justify-center text-sm mt-6'>
          <div>
            {variant === 'LOGIN'
              ? 'New to Messenger ?'
              : 'Already have an account ?'}
          </div>
          <div onClick={toggleVariant} className='underline cursor-pointer'>
            {variant === 'LOGIN' ? 'Create an account' : 'Sign up'}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
