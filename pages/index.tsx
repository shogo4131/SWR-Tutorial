import React from 'react';
import type { NextPage } from 'next';
import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';

const Home: NextPage = () => {
  /* immutableを使用することでリクエストが初回だけに設定できる */
  const { data, error } = useSWRImmutable(
    'https://jsonplaceholder.typicode.com/posts'
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return <>index</>;
};

export default Home;
