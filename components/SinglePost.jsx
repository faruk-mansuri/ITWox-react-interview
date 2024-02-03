import Link from 'next/link';

const SinglePost = ({ post }) => {
  return (
    <Link href={`/dashboard/post/${post.id}`}>
      <div className='bg-slate-100 border-2 border-gray-300 rounded-md cursor-pointer shadow-md hover:shadow-lg hover:scale-105 transition px-3 py-4 flex flex-col space-y-4'>
        <p>{post.id}</p>
        <p className='text-xl'>{post.title}</p>
        <p className=' text-zinc-600'>{post.body}</p>
      </div>
    </Link>
  );
};

export default SinglePost;
