import {FC} from 'react';
import Head from 'next/head';
import ProjectsLayout from 'features/project/components/ProjectsLayout';

const HomePage: FC = () => {
  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>
      <ProjectsLayout />
    </>
  );
};

export default HomePage;
