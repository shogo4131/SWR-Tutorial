import type { NextPage } from 'next';
import useSWR from 'swr';

const fetcher = async (input: RequestInfo, init?: RequestInit) => {
  const res = await fetch(input, init);
  return res.json();
};

const Home: NextPage = () => {
  const { data, error } = useSWR(
    'https://jsonplaceholder.typicode.com/posts',
    fetcher
  );

  console.log(data, error);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return <>Index</>;
};

export default Home;
