'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button, Spinner } from 'tamagui';

const SinglePostPage = ({ params }) => {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ['post', params.postId],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${params.postId}/comments`
      );
      return data;
    },
  });

  if (isLoading) return <Spinner />;

  return (
    <div className='p-4'>
      <div className='w-full max-w-7xl m-auto'>
        <Button onClick={() => router.back()}>Back</Button>
        <h4 className='text-slate-600 text-2xl'>comments of the posts are</h4>

        <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4'>
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className='border-none  px-3 py-2 rounded-md shadow-md hover:shadow-lg space-y-1'
              >
                <div className='flex items-center justify-start gap-x-2'>
                  <span className='bg-sky-300 p-1 rounded-sm'>Name </span>{' '}
                  <p className='text-slate-500'>{item.name}</p>
                </div>
                <div className='flex items-center justify-start gap-x-2'>
                  <span className='bg-sky-300 p-1 rounded-sm'>Email </span>{' '}
                  <p className='text-slate-500'>{item.email}</p>
                </div>
                <div className='pt-4 px-0 tracking-normal'>{item.body}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
