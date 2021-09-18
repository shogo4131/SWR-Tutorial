import React from 'react';
import type { NextPage } from 'next';
import useSWR from 'swr';
import type { KeyedMutator } from 'swr/dist/types';

/* グローバルState */
const useSharedState = <T extends any>(key: string, fallbackData?: T) => {
  const { data, mutate } = useSWR(key, {
    fallbackData,
  });

  return [data, mutate] as [
    typeof fallbackData,
    KeyedMutator<typeof fallbackData>
  ];
};

/* 親コンポーネント */
const GlobalState: NextPage = () => {
  return (
    <>
      <ChildrenA />
      <ChildrenB />
    </>
  );
};

/* 子コンポーネント */
const ChildrenA = () => {
  const [count, setCount] = useSharedState('bar', 1);

  const increment = () => setCount(count * 2);

  return (
    <div style={{ backgroundColor: 'red' }}>
      {count}
      <button onClick={increment}>×</button>
    </div>
  );
};

/* 子コンポーネント */
const ChildrenB = () => {
  const [count, setCount] = useSharedState('foo', 0);

  const increment = () => setCount(count + 1);

  return (
    <>
      <div style={{ backgroundColor: 'blue' }}>
        {count}
        <button onClick={increment}>+</button>
      </div>
    </>
  );
};

export default GlobalState;
