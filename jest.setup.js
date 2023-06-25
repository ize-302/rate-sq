import next from 'next'
next({})

export default async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
};