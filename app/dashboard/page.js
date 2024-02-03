'use client';
import SinglePost from '@/components/SinglePost';
import axios from 'axios';
import { Button, Spinner } from 'tamagui';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '@/components/AppContext';

const DashBoardPage = () => {
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState([]);
  const { setUser } = useGlobalContext();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );
      return data;
    },
  });

  const pages = data?.length / 10;
  const postData = Array.from({ length: pages || 0 }, (_, index) =>
    data?.slice(index * pages, index * pages + 10)
  );

  const handlePage = (action) => {
    if (action === 'next') {
      setPage((prevPage) => {
        if (prevPage === pages - 1) {
          return 0;
        }
        return prevPage + 1;
      });
    } else {
      setPage((prevPage) => {
        if (prevPage === 0) {
          return pages - 1;
        }
        return prevPage - 1;
      });
    }
  };

  const signOut = async () => {
    try {
      await axios.get('/api/auth/logout');
      setUser(() => null);
      toast.success('Logged Out');
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      setPosts(postData[page]);
    }
  }, [page, data]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <nav className='p-3 flex justify-between m-auto w-full max-w-7xl'>
        <h2 className='font-bold from-neutral-600 text-4xl'>DashBoard</h2>
        <Button variant='outlined' onClick={signOut}>
          SignOut
        </Button>
      </nav>
      <div className='mt-8 w-full max-w-6xl m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-3 pb-10'>
        {posts.map((post) => {
          return <SinglePost key={post.id} post={post} />;
        })}
      </div>
      {/* BTN CONTAINER */}
      <div className='flex justify-end px-10 pb-10 w-full max-w-6xl m-auto'>
        <Button onClick={() => handlePage('prev')}>Prev</Button>
        <div className='flex gap-2 items-center'>
          {postData?.map((_, index) => {
            return (
              <p
                onClick={() => setPage(index)}
                key={index}
                className={`cursor-pointer p-2 rounded-lg hover:bg-gray-400 hover:text-white ${
                  index === page && 'bg-gray-400 text-white'
                }`}
              >
                {index + 1}
              </p>
            );
          })}
        </div>
        <Button onClick={() => handlePage('next')}>next</Button>
      </div>
    </div>
  );
};

export default DashBoardPage;
