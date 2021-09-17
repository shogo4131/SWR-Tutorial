import React, { ReactNode } from 'react';
import type { NextPage, GetStaticProps } from 'next';
import useSWR, { SWRConfig } from 'swr';

const API = 'https://jsonplaceholder.typicode.com/posts';

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(API);
  const data = await res.json();

  return {
    props: {
      fallback: {
        [API]: data,
      },
    },
  };
};

const Home: NextPage = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <ChildComponent />
    </SWRConfig>
  );
};

const ChildComponent = () => {
  const { data, error } = useSWR(API);

  

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return <div>{data.length}</div>;
};

export default Home;
